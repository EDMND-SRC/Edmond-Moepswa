import fs from 'node:fs'
import path from 'node:path'

import { cloudflarePaths, getTargetConfig, getWranglerArgs } from './config.mjs'
import { createWranglerEnv, runCommand, runCommandCapture } from './process.mjs'
import { writeRouteManifest } from './routes.mjs'

const buildNodeOptions = '--no-deprecation --max-old-space-size=8192'
const copyExclusions = new Set([
  '.git',
  '.next',
  '.open-next',
  '.wrangler',
  '.wrangler-bundle',
  'blob-report',
  'node_modules',
  'playwright-report',
  'scratch',
  'test-results',
  'test-outputs',
])

const variantPrunedPaths = {
  payload: [
    path.join('src', 'app', '(frontend)'),
    path.join('src', 'app', 'api'),
    path.join('src', 'app', '(payload)', 'api', 'graphql-playground'),
  ],
  public: [path.join('src', 'app', '(payload)')],
}

const workerExportMarker = 'export default {\n    async fetch(request, env, ctx) {'
const workerUrlMarker = '            const url = new URL(request.url);\n'
const middlewareBridgeMarker = `            // - \`Request\`s are handled by the Next server
            const reqOrResp = await middlewareHandler(request, env, ctx);
            if (reqOrResp instanceof Response) {
                return reqOrResp;
            }
            // @ts-expect-error: resolved by wrangler build
            const { handler } = await import("./server-functions/default/handler.mjs");
            return handler(reqOrResp, env, ctx, request.signal);`
const requestBridgeMarker = `            // Force the middleware wrapper to hand the rewritten Request
            // back to the worker instead of self-fetching the same workers.dev host.
            globalThis.__dangerous_ON_edge_converter_returns_request = true;
            // - \`Request\`s are handled by the Next server
            const reqOrResp = await middlewareHandler(request, env, ctx);
            if (reqOrResp instanceof Response) {
                return reqOrResp;
            }
            // @ts-expect-error: resolved by wrangler build
            const { handler } = await import("./server-functions/default/handler.mjs");
            return handler(reqOrResp, env, ctx, request.signal);`
const hostHeaderHelper = `function ensureHostHeader(request, url) {
    if (request.headers.get("host")) {
        return request;
    }
    const headers = new Headers(request.headers);
    headers.set("host", url.host);
    return new Request(url, {
        body: request.body,
        headers,
        method: request.method,
        redirect: request.redirect,
        signal: request.signal,
    });
}

`

function shouldCopySource(sourcePath) {
  const relativePath = path.relative(cloudflarePaths.rootDir, sourcePath)

  if (!relativePath || relativePath === '') {
    return true
  }

  return !relativePath
    .split(path.sep)
    .some((segment) => copyExclusions.has(segment))
}

function ensureCleanDirectory(dirPath) {
  fs.rmSync(dirPath, { force: true, maxRetries: 3, recursive: true, retryDelay: 200 })
  fs.mkdirSync(dirPath, { recursive: true })
}

function linkNodeModules(workspaceDir) {
  const workspaceNodeModules = path.join(workspaceDir, 'node_modules')

  fs.rmSync(workspaceNodeModules, { force: true, recursive: true })
  fs.symlinkSync(path.join(cloudflarePaths.rootDir, 'node_modules'), workspaceNodeModules, 'dir')
}

function pruneVariantRoutes(workspaceDir, variant) {
  for (const prunedRelativePath of variantPrunedPaths[variant]) {
    fs.rmSync(path.join(workspaceDir, prunedRelativePath), { force: true, recursive: true })
  }
}

function customizeWorkspacePackageJson(workspaceDir, variant) {
  if (variant !== 'public') {
    return
  }

  const packageJsonFile = path.join(workspaceDir, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'))

  packageJson.scripts.build =
    'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8192" next build --webpack'

  fs.writeFileSync(packageJsonFile, `${JSON.stringify(packageJson, null, 2)}\n`)
}

function copyBuildOutput(workspaceDir, variant) {
  const sourceOpenNextDir = path.join(workspaceDir, '.open-next')
  const targetOpenNextDir =
    variant === 'public' ? cloudflarePaths.publicOutputDir : cloudflarePaths.payloadOutputDir

  if (!fs.existsSync(sourceOpenNextDir)) {
    throw new Error(`Missing OpenNext output for ${variant}: ${sourceOpenNextDir}`)
  }

  fs.rmSync(targetOpenNextDir, { force: true, recursive: true })
  fs.mkdirSync(path.dirname(targetOpenNextDir), { recursive: true })
  fs.cpSync(sourceOpenNextDir, targetOpenNextDir, { recursive: true })
}

function syncPayloadAssetsIntoPublicWorker() {
  const payloadStaticAssetsDir = path.join(cloudflarePaths.payloadOutputDir, 'assets', '_next')
  const publicPayloadAssetDir = path.join(cloudflarePaths.publicOutputDir, 'assets', '_payload_next', '_next')

  if (!fs.existsSync(payloadStaticAssetsDir)) {
    throw new Error(`Missing payload static assets: ${payloadStaticAssetsDir}`)
  }

  fs.rmSync(publicPayloadAssetDir, { force: true, recursive: true })
  fs.mkdirSync(path.dirname(publicPayloadAssetDir), { recursive: true })
  fs.cpSync(payloadStaticAssetsDir, publicPayloadAssetDir, { recursive: true })
}

function patchPublicWorker(workerFile, routeManifest) {
  const workerSource = fs.readFileSync(workerFile, 'utf8')
  const publicExactRoutes = JSON.stringify(routeManifest.publicExactRoutes)
  const publicRouteMethods = JSON.stringify(routeManifest.publicRouteMethods)
  const workerHelpers = `const payloadAssetPrefix = "/_payload_next";
const publicExactRoutes = new Set(${publicExactRoutes});
const publicRouteMethods = new Map(Object.entries(${publicRouteMethods}));
function isPublicRouteMethod(pathname, method) {
    const methods = publicRouteMethods.get(pathname);
    return Array.isArray(methods) && methods.includes(method);
}
function shouldProxyToPayload(pathname, method) {
    if (pathname === payloadAssetPrefix) {
        return true;
    }
    if (pathname.startsWith(\`\${payloadAssetPrefix}/_next/\`)) {
        return false;
    }
    if (pathname.startsWith(\`\${payloadAssetPrefix}/\`)) {
        return true;
    }
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
        return true;
    }
    if (publicRouteMethods.has(pathname)) {
        return !isPublicRouteMethod(pathname, method);
    }
    if (publicExactRoutes.has(pathname)) {
        return false;
    }
    return pathname === "/api" || pathname.startsWith("/api/");
}
function createPayloadProxyRequest(request, env) {
    const requestUrl = new URL(request.url);
    const proxyUrl = new URL(requestUrl);
    proxyUrl.hostname = \`\${env.PAYLOAD_WORKER_NAME || "payload-worker"}.internal\`;
    proxyUrl.port = "";
    const proxyRequest = new Request(proxyUrl, request);
    const host = request.headers.get("host");
    if (host) {
        proxyRequest.headers.set("host", host);
    }
    if (env.PAYLOAD_WORKER_NAME && env.PAYLOAD_WORKER_VERSION_ID) {
        proxyRequest.headers.set("Cloudflare-Workers-Version-Overrides", \`\${env.PAYLOAD_WORKER_NAME}="\${env.PAYLOAD_WORKER_VERSION_ID}"\`);
    }
    return proxyRequest;
}
${hostHeaderHelper}`
  let nextWorkerSource = workerSource
    .replace(workerExportMarker, `${workerHelpers}${workerExportMarker}`)
    .replace(
      workerUrlMarker,
      `${workerUrlMarker}            request = ensureHostHeader(request, url);\n            if (shouldProxyToPayload(url.pathname, request.method)) {\n                return env.PAYLOAD_WORKER.fetch(createPayloadProxyRequest(request, env));\n            }\n`,
    )
    .replace(middlewareBridgeMarker, requestBridgeMarker)

  fs.writeFileSync(workerFile, nextWorkerSource)
}

function patchPayloadWorker(workerFile) {
  const workerSource = fs.readFileSync(workerFile, 'utf8')
  const nextWorkerSource = workerSource
    .replace(workerExportMarker, `${hostHeaderHelper}${workerExportMarker}`)
    .replace(
      workerUrlMarker,
      `${workerUrlMarker}            request = ensureHostHeader(request, url);\n            if (url.pathname === "/_payload_next") {\n                url.pathname = "/_next";\n                request = new Request(url, request);\n            } else if (url.pathname.startsWith("/_payload_next/")) {\n                url.pathname = url.pathname.replace(/^\\/\\_payload_next/, "");\n                if (url.pathname.startsWith("/_next/static/")) {\n                    return env.ASSETS.fetch(new Request(url, request));\n                }\n                request = new Request(url, request);\n            }\n`,
    )
    .replace(middlewareBridgeMarker, requestBridgeMarker)

  fs.writeFileSync(workerFile, nextWorkerSource)
}

function patchVariantWorkerOutput(variant, routeManifest) {
  const workerFile = path.join(
    variant === 'public' ? cloudflarePaths.publicOutputDir : cloudflarePaths.payloadOutputDir,
    'worker.js',
  )

  if (variant === 'public') {
    patchPublicWorker(workerFile, routeManifest)
    return
  }

  patchPayloadWorker(workerFile)
}

function prepareWorkspace(variant) {
  const workspaceDir = path.join(cloudflarePaths.scratchDir, 'workspaces', variant)

  ensureCleanDirectory(workspaceDir)
  for (const entry of fs.readdirSync(cloudflarePaths.rootDir)) {
    const sourceEntryPath = path.join(cloudflarePaths.rootDir, entry)

    if (!shouldCopySource(sourceEntryPath)) {
      continue
    }

    fs.cpSync(sourceEntryPath, path.join(workspaceDir, entry), {
      filter: shouldCopySource,
      recursive: true,
    })
  }
  linkNodeModules(workspaceDir)
  pruneVariantRoutes(workspaceDir, variant)
  customizeWorkspacePackageJson(workspaceDir, variant)

  return workspaceDir
}

function buildVariant(variant, targetName, routeManifest) {
  const workspaceDir = prepareWorkspace(variant)
  const target = getTargetConfig(targetName)
  const env = {
    ...process.env,
    CLOUDFLARE_WORKER_VARIANT: variant,
    NEXT_PUBLIC_SERVER_URL: target.buildPublicURL,
    NODE_OPTIONS: buildNodeOptions,
  }

  runCommand(process.execPath, ['./src/scripts/patch-opennext-cloudflare.mjs'], {
    cwd: workspaceDir,
    env,
  })
  runCommand(
    'pnpm',
    ['exec', 'opennextjs-cloudflare', 'build', '--config', 'wrangler.toml'],
    {
      cwd: workspaceDir,
      env,
    },
  )
  runCommand(process.execPath, ['./src/scripts/patch-opennext-cloudflare.mjs', '--postbuild'], {
    cwd: workspaceDir,
    env,
  })

  copyBuildOutput(workspaceDir, variant)
  patchVariantWorkerOutput(variant, routeManifest)
}

function parseGzipKiB(output) {
  const match = output.match(/gzip:\s+([0-9.]+)\s+KiB/)

  if (!match) {
    throw new Error(`Unable to parse gzip size from Wrangler output:\n${output}`)
  }

  return Number.parseFloat(match[1])
}

export function runWorkerSizeCheck(targetName) {
  const target = getTargetConfig(targetName)
  const checks = [
    { config: cloudflarePaths.publicWranglerConfig, label: 'public' },
    { config: cloudflarePaths.payloadWranglerConfig, label: 'payload' },
  ]

  const results = checks.map(({ config, label }) => {
    const output = runCommandCapture(
      'pnpm',
      ['exec', 'wrangler', 'deploy', '--dry-run', '--no-bundle', ...getWranglerArgs(config, targetName)],
      {
        env: {
          ...createWranglerEnv(process.env),
          NEXT_PUBLIC_SERVER_URL: target.buildPublicURL,
        },
      },
    )
    const gzipKiB = parseGzipKiB(output)

    if (gzipKiB >= 3072) {
      throw new Error(`${label} worker gzip size ${gzipKiB.toFixed(2)} KiB exceeds Cloudflare Free limit`)
    }

    return {
      gzipKiB,
      label,
    }
  })

  return results
}

export function buildCloudflareWorkers(targetName, options = {}) {
  const routeManifest = writeRouteManifest()

  buildVariant('public', targetName, routeManifest)
  buildVariant('payload', targetName, routeManifest)
  syncPayloadAssetsIntoPublicWorker()

  if (options.skipSizeCheck) {
    return []
  }

  return runWorkerSizeCheck(targetName)
}
