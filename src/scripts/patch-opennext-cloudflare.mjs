import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const isPostbuild = process.argv.includes('--postbuild')
const workerVariant = process.env.CLOUDFLARE_WORKER_VARIANT ?? 'unknown'

const pnpmDir = path.resolve('node_modules/.pnpm')
const packageDirName = readdirSync(pnpmDir).find((entry) =>
  entry.startsWith('@opennextjs+cloudflare@'),
)

if (!packageDirName) {
  throw new Error('Unable to locate @opennextjs/cloudflare in node_modules/.pnpm')
}

const patchFile = path.join(
  pnpmDir,
  packageDirName,
  'node_modules/@opennextjs/cloudflare/dist/cli/build/patches/ast/patch-vercel-og-library.js',
)

const source = readFileSync(patchFile, 'utf8')
const defaultRouteGuard = `const routeFilePathForDefault = traceInfoPath.replace(appBuildOutputPath, packagePath).replace(".nft.json", "");
        if (!existsSync(routeFilePathForDefault)) {
            continue;
        }
        useOg = true;`

const routeGuard = `if (!existsSync(routeFilePath)) {
                continue;
            }`

let nextSource = source

if (!nextSource.includes(defaultRouteGuard)) {
  const originalUseOg = `useOg = true;
        const outputDir = getOutputDir({ functionsPath, packagePath });`

  if (!nextSource.includes(originalUseOg)) {
    throw new Error('Unexpected @opennextjs/cloudflare useOg block contents')
  }

  nextSource = nextSource.replace(
    originalUseOg,
    `${defaultRouteGuard}
        const outputDir = getOutputDir({ functionsPath, packagePath });`,
  )
}

const original = `const ast = parseFile(routeFilePath);
            const { edits } = patchVercelOgImport(ast);
            writeFileSync(routeFilePath, ast.commitEdits(edits));`

if (!nextSource.includes(routeGuard)) {
  if (!nextSource.includes(original)) {
    throw new Error('Unexpected @opennextjs/cloudflare patch-vercel-og-library.js contents')
  }

  nextSource = nextSource.replace(
    original,
    `${routeGuard}
            const ast = parseFile(routeFilePath);
            const { edits } = patchVercelOgImport(ast);
            writeFileSync(routeFilePath, ast.commitEdits(edits));`,
  )
}

if (nextSource !== source) {
  if (!nextSource.includes(routeGuard) || !nextSource.includes(defaultRouteGuard)) {
    throw new Error('Unexpected @opennextjs/cloudflare patch-vercel-og-library.js contents')
  }

  writeFileSync(
    patchFile,
    nextSource,
  )
}

const workerTemplateFile = path.join(
  pnpmDir,
  packageDirName,
  'node_modules/@opennextjs/cloudflare/dist/cli/templates/worker.js',
)

const workerHandlerImport = `// @ts-expect-error: resolved by wrangler build
            const { handler } = await import("./server-functions/default/handler.mjs");
            return handler(reqOrResp, env, ctx, request.signal);`
const workerHandlerIndexImport = `// @ts-expect-error: resolved by wrangler build
            const { handler } = await import("./server-functions/default/index.mjs");
            return handler(reqOrResp, env, ctx, request.signal);`
const removedWorkerCases = `        case "publicApi":
            return (await import("./server-functions/publicApi/index.mjs")).handler;
        case "ogImage":
            return (await import("./server-functions/ogImage/index.mjs")).handler;
`
const workerRoutingHelpersPattern =
  /const openNextFunctionMatchersPromise = import\("\.\/server-functions\/default\/open-next\.config\.mjs"\)[\s\S]*?export default \{/

function normalizeWorkerSource(source) {
  let nextSource = source

  nextSource = nextSource.replace(workerRoutingHelpersPattern, 'export default {')

  nextSource = nextSource.replace(
    'const handler = await resolveHandler(reqOrResp.rawPath ?? url.pathname);\n' +
      '            return handler(reqOrResp, env, ctx, request.signal);',
    workerHandlerImport,
  )

  nextSource = nextSource.replace(workerHandlerIndexImport, workerHandlerImport)

  if (nextSource.includes(removedWorkerCases)) {
    nextSource = nextSource.replace(removedWorkerCases, '')
  }

  return nextSource
}

function normalizeInitSource(source) {
  let nextSource = source
  const internalFetchHelpers = `const debugWorkerVariant = ${JSON.stringify(workerVariant)};
function matchesWorkerHostname(url, workerName, workersDevSuffix) {
    if (!workerName) {
        return false;
    }
    return url.hostname === \`\${workerName}.internal\` || workersDevSuffix != null && url.hostname === \`\${workerName}.\${workersDevSuffix}\`;
}
function resolveNamedWorkerBinding(env, workerName, targetUrl) {
    if (!env || !matchesWorkerHostname(targetUrl, workerName, env.WORKERS_DEV_SUFFIX)) {
        return null;
    }
    if (workerName === env.PAYLOAD_WORKER_NAME) {
        return debugWorkerVariant === "payload"
            ? { binding: env.WORKER_SELF_REFERENCE ?? env.PAYLOAD_WORKER ?? null, decision: "self" }
            : { binding: env.PAYLOAD_WORKER ?? null, decision: "payload" };
    }
    if (workerName === env.PUBLIC_WORKER_NAME) {
        return debugWorkerVariant === "public"
            ? { binding: env.WORKER_SELF_REFERENCE ?? env.PUBLIC_WORKER ?? null, decision: "self" }
            : { binding: env.PUBLIC_WORKER ?? null, decision: "public" };
    }
    return null;
}
function resolveFetchRouting(cloudflareContext, request) {
    const targetUrl = new URL(request.url);
    const env = cloudflareContext?.env ?? globalThis.__openNextCloudflareEnv ?? null;
    const activeRequestURL = cloudflareContext?.requestURL ?? globalThis.__openNextCloudflareRequestURL ?? null;
    const activeUrl = activeRequestURL ? new URL(activeRequestURL) : null;
    if (activeUrl && env?.WORKER_SELF_REFERENCE && targetUrl.origin === activeUrl.origin) {
        return {
            activeUrl,
            binding: env.WORKER_SELF_REFERENCE,
            decision: "self",
            targetUrl
        };
    }
    const payloadBinding = resolveNamedWorkerBinding(env, env?.PAYLOAD_WORKER_NAME, targetUrl);
    if (payloadBinding) {
        return {
            activeUrl,
            binding: payloadBinding.binding,
            decision: payloadBinding.decision,
            targetUrl
        };
    }
    const publicBinding = resolveNamedWorkerBinding(env, env?.PUBLIC_WORKER_NAME, targetUrl);
    if (publicBinding) {
        return {
            activeUrl,
            binding: publicBinding.binding,
            decision: publicBinding.decision,
            targetUrl
        };
    }
    return {
        activeUrl,
        binding: null,
        decision: "edge",
        targetUrl
    };
}
function initRuntime() {\n`

  nextSource = nextSource.replace(
    '    return cloudflareContextALS.run({ env, ctx, cf: request.cf }, handler);\n',
    '    globalThis.__openNextCloudflareEnv = env;\n    globalThis.__openNextCloudflareRequestURL = request.url;\n    return cloudflareContextALS.run({ env, ctx, cf: request.cf, requestURL: request.url }, handler);\n',
  )

  nextSource = nextSource.replace(
    /(?:const debugWorkerVariant = [^\n]+\n)*function matchesWorkerHostname\(url, workerName, workersDevSuffix\) \{[\s\S]*?function initRuntime\(\) \{\n/g,
    internalFetchHelpers,
  )

  if (!nextSource.includes('function matchesWorkerHostname(url, workerName, workersDevSuffix) {')) {
    nextSource = nextSource.replace('function initRuntime() {\n', internalFetchHelpers)
  }

  nextSource = nextSource.replace(
    /    const __original_fetch = globalThis\.fetch;\n    globalThis\.fetch = \(input, init\) => \{\n[\s\S]*?    \};/,
    `    const __original_fetch = globalThis.fetch;
    globalThis.fetch = (input, init) => {
        if (init) {
            delete init.cache;
        }
        const cloudflareContext = cloudflareContextALS.getStore();
        const normalizedRequest = input instanceof Request && init === undefined ? input : new Request(input, init);
        const routing = resolveFetchRouting(cloudflareContext, normalizedRequest);
        return routing.binding ? routing.binding.fetch(normalizedRequest) : __original_fetch(normalizedRequest);
    };`,
  )

  return nextSource
}

function inlineMiddlewareManifest(source, openNextDir) {
  const middlewareManifestFile = path.join(
    openNextDir,
    'server-functions',
    'default',
    '.next',
    'server',
    'middleware-manifest.json',
  )

  if (!existsSync(middlewareManifestFile)) {
    return source
  }

  const middlewareManifest = JSON.parse(readFileSync(middlewareManifestFile, 'utf8'))

  return source.replace(
    /getMiddlewareManifest\(\)\{return this\.minimalMode\?null:require\(this\.middlewareManifestPath\)\}/g,
    `getMiddlewareManifest(){return this.minimalMode?null:${JSON.stringify(middlewareManifest)}}`,
  )
}

function injectNodeRequireShim(source) {
  const previousRequireShimImport = 'import { createRequire as __openNextCreateRequire } from "node:module"\n'
  const previousRequireShimBody =
    'const require = globalThis.require ?? __openNextCreateRequire(import.meta.url)\n'
  const requireShimImport = 'import process from "node:process"\n'
  const requireShimBody = `function __openNextBuiltinRequire(specifier) {
    const normalizedSpecifier = specifier.startsWith("node:") ? specifier.slice(5) : specifier
    const builtinModule =
        process.getBuiltinModule?.(specifier) ??
        process.getBuiltinModule?.(\`node:\${normalizedSpecifier}\`) ??
        process.getBuiltinModule?.(normalizedSpecifier)
    if (builtinModule) {
        return builtinModule
    }
    throw new Error(\`Dynamic require of "\${specifier}" is not supported\`)
}
const require = globalThis.require ?? __openNextBuiltinRequire
`

  if (source.includes(requireShimBody)) {
    return source
  }

  const nextSource = source
    .replace(previousRequireShimImport, '')
    .replace(previousRequireShimBody, '')

  if (nextSource.startsWith('import {setInterval, clearInterval, setTimeout, clearTimeout} from "node:timers"\n')) {
    return nextSource.replace(
      'import {setInterval, clearInterval, setTimeout, clearTimeout} from "node:timers"\n',
      `import {setInterval, clearInterval, setTimeout, clearTimeout} from "node:timers"\n${requireShimImport}${requireShimBody}`,
    )
  }

  return `${requireShimImport}${requireShimBody}${nextSource}`
}

function normalizeServerHandlerSource(source, openNextDir) {
  return inlineMiddlewareManifest(
    injectNodeRequireShim(
      source.replaceAll(
      /\(await Promise\.resolve\(\)\.then\(function\(\)\{var (?<errorName>[A-Za-z0-9_$]+)=Error\("Cannot find module 'cloudflare:sockets'"\);throw \k<errorName>\.code="MODULE_NOT_FOUND",\k<errorName>\}\)\)\.connect/g,
      '(await import("cloudflare:sockets")).connect',
    ),
    ),
    openNextDir,
  )
}

const workerTemplateSource = readFileSync(workerTemplateFile, 'utf8')
const nextWorkerTemplateSource = normalizeWorkerSource(workerTemplateSource)

if (nextWorkerTemplateSource !== workerTemplateSource) {
  writeFileSync(workerTemplateFile, nextWorkerTemplateSource)
}

const initTemplateFile = path.join(
  pnpmDir,
  packageDirName,
  'node_modules/@opennextjs/cloudflare/dist/cli/templates/init.js',
)

const initTemplateSource = readFileSync(initTemplateFile, 'utf8')
const nextInitTemplateSource = normalizeInitSource(initTemplateSource)

if (nextInitTemplateSource !== initTemplateSource) {
  writeFileSync(initTemplateFile, nextInitTemplateSource)
}

const pgCloudflareDirName = readdirSync(pnpmDir).find((entry) =>
  entry.startsWith('pg-cloudflare@'),
)

if (!pgCloudflareDirName) {
  throw new Error('Unable to locate pg-cloudflare in node_modules/.pnpm')
}

const pgCloudflarePackageFile = path.join(
  pnpmDir,
  pgCloudflareDirName,
  'node_modules/pg-cloudflare/package.json',
)

const pgCloudflarePackageSource = readFileSync(pgCloudflarePackageFile, 'utf8')
const pgCloudflarePackage = JSON.parse(pgCloudflarePackageSource)

if (pgCloudflarePackage.exports?.['.']?.default !== './dist/index.js') {
  pgCloudflarePackage.exports['.'].default = './dist/index.js'

  writeFileSync(
    pgCloudflarePackageFile,
    `${JSON.stringify(pgCloudflarePackage, null, 2)}\n`,
  )
}

const payloadNextDirNames = readdirSync(pnpmDir).filter((entry) =>
  entry.startsWith('@payloadcms+next@'),
)

for (const payloadNextDirName of payloadNextDirNames) {
  const payloadAdminBarFile = path.join(
    pnpmDir,
    payloadNextDirName,
    'node_modules/@payloadcms/next/dist/views/Document/Default/index.js',
  )

  if (!existsSync(payloadAdminBarFile)) {
    continue
  }

  const payloadAdminBarSource = readFileSync(payloadAdminBarFile, 'utf8')
  const payloadAdminBarImport = `import { AdminBar } from '@payloadcms/ui/elements/AdminBar';`
  const replacementAdminBarImport = `const AdminBar = () => null;`
  const viewVersionPredicate = `if (versionCount > 0) {`
  const safeViewVersionPredicate = `if (versionCount > 0 && !process.env.CLOUDFLARE_WORKER_VARIANT) {`

  let nextPayloadAdminBarSource = payloadAdminBarSource

  if (nextPayloadAdminBarSource.includes(payloadAdminBarImport)) {
    nextPayloadAdminBarSource = nextPayloadAdminBarSource.replace(
      payloadAdminBarImport,
      replacementAdminBarImport,
    )
  }

  if (nextPayloadAdminBarSource.includes(viewVersionPredicate)) {
    nextPayloadAdminBarSource = nextPayloadAdminBarSource.replace(
      viewVersionPredicate,
      safeViewVersionPredicate,
    )
  }

  if (nextPayloadAdminBarSource !== payloadAdminBarSource) {
    writeFileSync(payloadAdminBarFile, nextPayloadAdminBarSource)
  }
}

if (isPostbuild) {
  const openNextDir = path.resolve('.open-next')
  const serverFunctionDirs = readdirSync(path.join(openNextDir, 'server-functions'))

  for (const functionName of serverFunctionDirs) {
    const handlerFile = path.join(openNextDir, 'server-functions', functionName, 'handler.mjs')

    if (!existsSync(handlerFile)) {
      continue
    }

    const handlerSource = readFileSync(handlerFile, 'utf8')
    const nextHandlerSource = normalizeServerHandlerSource(handlerSource, openNextDir)

    if (nextHandlerSource !== handlerSource) {
      writeFileSync(handlerFile, nextHandlerSource)
    }
  }
}
