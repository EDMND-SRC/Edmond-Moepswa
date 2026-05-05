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

const prunedPaths = []
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

  if (!relativePath) {
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

function pruneWorkspace(workspaceDir) {
  for (const prunedRelativePath of prunedPaths) {
    fs.rmSync(path.join(workspaceDir, prunedRelativePath), { force: true, recursive: true })
  }
}

function customizeWorkspacePackageJson(workspaceDir) {
  const packageJsonFile = path.join(workspaceDir, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'))

  packageJson.scripts.build =
    'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8192" next build --webpack'

  fs.writeFileSync(packageJsonFile, `${JSON.stringify(packageJson, null, 2)}\n`)
}

function copyBuildOutput(workspaceDir) {
  const sourceOpenNextDir = path.join(workspaceDir, '.open-next')

  if (!fs.existsSync(sourceOpenNextDir)) {
    throw new Error(`Missing OpenNext output: ${sourceOpenNextDir}`)
  }

  fs.rmSync(cloudflarePaths.publicOutputDir, { force: true, recursive: true })
  fs.mkdirSync(path.dirname(cloudflarePaths.publicOutputDir), { recursive: true })
  fs.cpSync(sourceOpenNextDir, cloudflarePaths.publicOutputDir, { recursive: true })
}

function patchPublicWorker(workerFile) {
  const workerSource = fs.readFileSync(workerFile, 'utf8')
  const nextWorkerSource = workerSource
    .replace(workerExportMarker, `${hostHeaderHelper}${workerExportMarker}`)
    .replace(
      workerUrlMarker,
      `${workerUrlMarker}            request = ensureHostHeader(request, url);\n`,
    )
    .replace(middlewareBridgeMarker, requestBridgeMarker)

  fs.writeFileSync(workerFile, nextWorkerSource)
}

function prepareWorkspace() {
  const workspaceDir = path.join(cloudflarePaths.scratchDir, 'workspaces', 'public')

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
  pruneWorkspace(workspaceDir)
  customizeWorkspacePackageJson(workspaceDir)

  return workspaceDir
}

function buildPublicVariant(targetName) {
  const workspaceDir = prepareWorkspace()
  const target = getTargetConfig(targetName)
  const env = {
    ...process.env,
    CLOUDFLARE_WORKER_VARIANT: 'public',
    NEXT_PUBLIC_SERVER_URL: target.buildPublicURL,
    NODE_OPTIONS: buildNodeOptions,
  }

  runCommand(process.execPath, ['./src/scripts/patch-opennext-cloudflare.mjs'], {
    cwd: workspaceDir,
    env,
  })
  runCommand('pnpm', ['exec', 'opennextjs-cloudflare', 'build', '--config', 'wrangler.toml'], {
    cwd: workspaceDir,
    env,
  })
  runCommand(process.execPath, ['./src/scripts/patch-opennext-cloudflare.mjs', '--postbuild'], {
    cwd: workspaceDir,
    env,
  })

  copyBuildOutput(workspaceDir)
  patchPublicWorker(path.join(cloudflarePaths.publicOutputDir, 'worker.js'))
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
  const output = runCommandCapture(
    'pnpm',
    ['exec', 'wrangler', 'deploy', '--dry-run', '--no-bundle', ...getWranglerArgs(cloudflarePaths.publicWranglerConfig, targetName)],
    {
      env: {
        ...createWranglerEnv(process.env),
        NEXT_PUBLIC_SERVER_URL: target.buildPublicURL,
      },
    },
  )
  const gzipKiB = parseGzipKiB(output)

  if (gzipKiB >= 3072) {
    throw new Error(`public worker gzip size ${gzipKiB.toFixed(2)} KiB exceeds Cloudflare Free limit`)
  }

  return [{ gzipKiB, label: 'public' }]
}

export function buildCloudflareWorkers(targetName, options = {}) {
  writeRouteManifest()
  buildPublicVariant(targetName)

  if (options.skipSizeCheck) {
    return []
  }

  return runWorkerSizeCheck(targetName)
}
