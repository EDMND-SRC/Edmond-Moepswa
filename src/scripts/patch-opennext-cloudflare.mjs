import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const isPostbuild = process.argv.includes('--postbuild')
const pnpmDir = path.resolve('node_modules/.pnpm')

function requirePackageDir(prefix) {
  const packageDirName = readdirSync(pnpmDir).find((entry) => entry.startsWith(prefix))

  if (!packageDirName) {
    throw new Error(`Unable to locate ${prefix} in node_modules/.pnpm`)
  }

  return path.join(pnpmDir, packageDirName)
}

function patchOgLibrary() {
  const packageRoot = requirePackageDir('@opennextjs+cloudflare@')
  const patchFile = path.join(
    packageRoot,
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

  if (!nextSource.includes(routeGuard)) {
    const original = `const ast = parseFile(routeFilePath);
            const { edits } = patchVercelOgImport(ast);
            writeFileSync(routeFilePath, ast.commitEdits(edits));`

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
    writeFileSync(patchFile, nextSource)
  }

  return packageRoot
}

function normalizeWorkerSource(source) {
  const workerRoutingHelpersPattern =
    /const openNextFunctionMatchersPromise = import\("\.\/server-functions\/default\/open-next\.config\.mjs"\)[\s\S]*?export default \{/
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

  return source
    .replace(workerRoutingHelpersPattern, 'export default {')
    .replace(
      'const handler = await resolveHandler(reqOrResp.rawPath ?? url.pathname);\n' +
        '            return handler(reqOrResp, env, ctx, request.signal);',
      workerHandlerImport,
    )
    .replace(workerHandlerIndexImport, workerHandlerImport)
    .replace(removedWorkerCases, '')
}

function normalizeInitSource(source) {
  const runtimeHelpers = `function matchesWorkerHostname(url, workerName, workersDevSuffix) {
    if (!workerName) {
        return false;
    }
    return url.hostname === \`\${workerName}.internal\` || workersDevSuffix != null && url.hostname === \`\${workerName}.\${workersDevSuffix}\`;
}
function resolveFetchBinding(cloudflareContext, request) {
    const targetUrl = new URL(request.url);
    const env = cloudflareContext?.env ?? globalThis.__openNextCloudflareEnv ?? null;
    const activeRequestURL = cloudflareContext?.requestURL ?? globalThis.__openNextCloudflareRequestURL ?? null;
    const activeUrl = activeRequestURL ? new URL(activeRequestURL) : null;
    if (activeUrl && env?.WORKER_SELF_REFERENCE && targetUrl.origin === activeUrl.origin) {
        return env.WORKER_SELF_REFERENCE;
    }
    if (env?.PUBLIC_WORKER && matchesWorkerHostname(targetUrl, env.PUBLIC_WORKER_NAME, env.WORKERS_DEV_SUFFIX)) {
        return env.PUBLIC_WORKER;
    }
    return null;
}
function initRuntime() {\n`

  let nextSource = source.replace(
    '    return cloudflareContextALS.run({ env, ctx, cf: request.cf }, handler);\n',
    '    globalThis.__openNextCloudflareEnv = env;\n    globalThis.__openNextCloudflareRequestURL = request.url;\n    return cloudflareContextALS.run({ env, ctx, cf: request.cf, requestURL: request.url }, handler);\n',
  )

  const legacyRoutingBlockPattern =
    /const debugWorkerVariant = "public";[\s\S]*?function initRuntime\(\) \{\n/
  const runtimeHelpersPattern =
    /function matchesWorkerHostname\(url, workerName, workersDevSuffix\) \{[\s\S]*?function initRuntime\(\) \{\n/

  if (legacyRoutingBlockPattern.test(nextSource)) {
    nextSource = nextSource.replace(legacyRoutingBlockPattern, runtimeHelpers)
  } else if (runtimeHelpersPattern.test(nextSource)) {
    nextSource = nextSource.replace(runtimeHelpersPattern, runtimeHelpers)
  } else {
    nextSource = nextSource.replace('function initRuntime() {\n', runtimeHelpers)
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
        const binding = resolveFetchBinding(cloudflareContext, normalizedRequest);
        return binding ? binding.fetch(normalizedRequest) : __original_fetch(normalizedRequest);
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

function patchWorkerTemplates(packageRoot) {
  const workerTemplateFile = path.join(
    packageRoot,
    'node_modules/@opennextjs/cloudflare/dist/cli/templates/worker.js',
  )
  const initTemplateFile = path.join(
    packageRoot,
    'node_modules/@opennextjs/cloudflare/dist/cli/templates/init.js',
  )

  const workerTemplateSource = readFileSync(workerTemplateFile, 'utf8')
  const nextWorkerTemplateSource = normalizeWorkerSource(workerTemplateSource)

  if (nextWorkerTemplateSource !== workerTemplateSource) {
    writeFileSync(workerTemplateFile, nextWorkerTemplateSource)
  }

  const initTemplateSource = readFileSync(initTemplateFile, 'utf8')
  const nextInitTemplateSource = normalizeInitSource(initTemplateSource)

  if (nextInitTemplateSource !== initTemplateSource) {
    writeFileSync(initTemplateFile, nextInitTemplateSource)
  }
}

function patchPgCloudflarePackage() {
  const packageRoot = requirePackageDir('pg-cloudflare@')
  const packageFile = path.join(packageRoot, 'node_modules/pg-cloudflare/package.json')
  const packageSource = readFileSync(packageFile, 'utf8')
  const packageJSON = JSON.parse(packageSource)

  if (packageJSON.exports?.['.']?.default !== './dist/index.js') {
    packageJSON.exports['.'].default = './dist/index.js'
    writeFileSync(packageFile, `${JSON.stringify(packageJSON, null, 2)}\n`)
  }
}

function patchBuiltHandlers() {
  const openNextDir = path.resolve('.open-next')

  if (!existsSync(openNextDir)) {
    return
  }

  const serverFunctionsDir = path.join(openNextDir, 'server-functions')

  if (!existsSync(serverFunctionsDir)) {
    return
  }

  for (const functionName of readdirSync(serverFunctionsDir)) {
    const handlerFile = path.join(serverFunctionsDir, functionName, 'handler.mjs')

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

const opennextCloudflareRoot = patchOgLibrary()
patchWorkerTemplates(opennextCloudflareRoot)
patchPgCloudflarePackage()

if (isPostbuild) {
  patchBuiltHandlers()
}
