import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

import { cloudflarePaths, getTargetConfig, getWranglerArgs } from './lib/cloudflare-workers/config.mjs'
import {
  createWranglerEnv,
  runCommand,
  runWranglerCommand,
  runWranglerCommandCapture,
} from './lib/cloudflare-workers/process.mjs'
import { buildCloudflareWorkers } from './lib/cloudflare-workers/workspace.mjs'

function parseArgs(argv) {
  const args = {
    command: argv[2],
    dryRun: argv.includes('--dry-run'),
    skipBuild: argv.includes('--skip-build'),
    skipSecrets: argv.includes('--skip-secrets'),
    skipSizeCheck: argv.includes('--skip-size-check'),
    target: 'local',
  }

  const targetFlagIndex = argv.findIndex((arg) => arg === '--target' || arg === '--env')

  if (targetFlagIndex >= 0 && argv[targetFlagIndex + 1]) {
    args.target = argv[targetFlagIndex + 1]
  }

  return args
}

function ensureCommand(command) {
  if (!command) {
    throw new Error('Missing cloudflare-workers command')
  }
}

function createDeploymentStateFile(targetName) {
  return path.join(cloudflarePaths.scratchDir, `last-deploy-${targetName}.json`)
}

function createDeploymentBaselineFile(targetName) {
  return path.join(cloudflarePaths.scratchDir, `last-deploy-${targetName}.baseline.json`)
}

function writeJSON(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function writeDeploymentState(targetName, state) {
  writeJSON(createDeploymentStateFile(targetName), state)
}

function writeDeploymentBaseline(targetName, state) {
  writeJSON(createDeploymentBaselineFile(targetName), state)
}

function readDeploymentState(targetName) {
  const filePath = createDeploymentStateFile(targetName)

  if (!fs.existsSync(filePath)) {
    return null
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function getWorkerStatus(configPath, targetName) {
  const output = runWranglerCommandCapture(
    'pnpm',
    ['exec', 'wrangler', 'deployments', 'status', '--json', ...getWranglerArgs(configPath, targetName)],
    { env: createWranglerEnv(process.env) },
  )

  return JSON.parse(output)
}

function getActiveVersionId(configPath, targetName) {
  const status = getWorkerStatus(configPath, targetName)
  const [activeVersion] = [...status.versions].sort((left, right) => right.percentage - left.percentage)

  if (!activeVersion?.version_id) {
    throw new Error(`Unable to determine active version for ${configPath}`)
  }

  return activeVersion.version_id
}

function extractWorkerVersionId(output) {
  const match = output.match(/Worker Version ID:\s*([0-9a-f-]+)/i)

  if (!match) {
    throw new Error(`Unable to extract Worker Version ID from output:\n${output}`)
  }

  return match[1]
}

function workerExists(configPath, targetName) {
  try {
    getWorkerStatus(configPath, targetName)
    return true
  } catch {
    return false
  }
}

function formatRollbackCommand(configPath, targetName, versionId, message) {
  const wranglerArgs = getWranglerArgs(configPath, targetName).join(' ')

  return `WRANGLER_CONNECT_TIMEOUT_MS=300000 WRANGLER_HEADERS_TIMEOUT_MS=1800000 WRANGLER_BODY_TIMEOUT_MS=1800000 pnpm exec wrangler versions deploy ${versionId}@100% --message '${message}' -y ${wranglerArgs}`
}

function captureDeploymentBaseline(targetName) {
  const publicStatus = getWorkerStatus(cloudflarePaths.publicWranglerConfig, targetName)
  const publicVersionId = getActiveVersionId(cloudflarePaths.publicWranglerConfig, targetName)

  writeDeploymentBaseline(targetName, {
    capturedAt: new Date().toISOString(),
    public: {
      createdOn: publicStatus.created_on,
      deploymentId: publicStatus.id,
      versionId: publicVersionId,
    },
    rollbackCommands: [
      formatRollbackCommand(
        cloudflarePaths.publicWranglerConfig,
        targetName,
        publicVersionId,
        `restore public ${targetName} baseline ${new Date().toISOString().slice(0, 10)}`,
      ),
    ],
    target: targetName,
  })
}

function bootstrapWorker(configPath, targetName) {
  runWranglerCommand(
    'pnpm',
    ['exec', 'wrangler', 'deploy', '--no-bundle', ...getWranglerArgs(configPath, targetName)],
    { env: createWranglerEnv(process.env) },
  )
}

function bootstrapWorkers(targetName) {
  bootstrapWorker(cloudflarePaths.publicWranglerConfig, targetName)

  const deploymentState = {
    publicVersionId: getActiveVersionId(cloudflarePaths.publicWranglerConfig, targetName),
  }

  writeDeploymentState(targetName, deploymentState)
  return deploymentState
}

function uploadWorkerVersion(configPath, targetName, message) {
  const output = runWranglerCommandCapture(
    'pnpm',
    [
      'exec',
      'wrangler',
      'versions',
      'upload',
      '--no-bundle',
      ...getWranglerArgs(configPath, targetName),
      '--message',
      message,
    ],
    { env: createWranglerEnv(process.env) },
  )

  return extractWorkerVersionId(output)
}

function deployVersion(configPath, targetName, versionId, message) {
  runWranglerCommand(
    'pnpm',
    [
      'exec',
      'wrangler',
      'versions',
      'deploy',
      `${versionId}@100%`,
      '--message',
      message,
      '-y',
      ...getWranglerArgs(configPath, targetName),
    ],
    { env: createWranglerEnv(process.env) },
  )
}

function deployWorkers(targetName) {
  if (targetName === 'production') {
    captureDeploymentBaseline(targetName)
  }

  if (!workerExists(cloudflarePaths.publicWranglerConfig, targetName)) {
    return bootstrapWorkers(targetName)
  }

  const newPublicVersionId = uploadWorkerVersion(
    cloudflarePaths.publicWranglerConfig,
    targetName,
    `public rollout ${new Date().toISOString()}`,
  )

  deployVersion(
    cloudflarePaths.publicWranglerConfig,
    targetName,
    newPublicVersionId,
    'promote public worker',
  )

  const deploymentState = {
    publicVersionId: newPublicVersionId,
  }

  writeDeploymentState(targetName, deploymentState)
  return deploymentState
}

function startTail(configPath, targetName) {
  const child = spawn(
    'pnpm',
    ['exec', 'wrangler', 'tail', '--format', 'json', '--status', 'error', ...getWranglerArgs(configPath, targetName)],
    {
      cwd: cloudflarePaths.rootDir,
      env: createWranglerEnv(process.env),
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  )

  let stdout = ''
  let stderr = ''

  child.stdout.on('data', (chunk) => {
    stdout += chunk.toString()
  })
  child.stderr.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  return {
    async stop() {
      child.kill('SIGINT')
      await new Promise((resolve) => child.once('close', resolve))
      return { stderr, stdout }
    },
  }
}

function verifyDeploymentVersions(targetName) {
  const expectedState = readDeploymentState(targetName)

  if (!expectedState) {
    return
  }

  const currentPublicVersionId = getActiveVersionId(cloudflarePaths.publicWranglerConfig, targetName)

  if (currentPublicVersionId !== expectedState.publicVersionId) {
    throw new Error(
      `Public worker version mismatch: expected ${expectedState.publicVersionId}, got ${currentPublicVersionId}`,
    )
  }
}

async function verifyWorkers(targetName) {
  const target = getTargetConfig(targetName)
  const isRemote = targetName === 'staging' || targetName === 'production'
  const publicTail = isRemote ? startTail(cloudflarePaths.publicWranglerConfig, targetName) : null

  try {
    if (isRemote) {
      verifyDeploymentVersions(targetName)
    }

    runCommand(
      'pnpm',
      [
        'exec',
        'playwright',
        'test',
        'tests/e2e/frontend.e2e.spec.ts',
        'tests/e2e/cloudflare.smoke.e2e.spec.ts',
        '--config',
        'playwright.config.ts',
        '--project',
        'chromium',
        '--timeout',
        '120000',
        '--workers',
        '1',
      ],
      {
        env: {
          ...process.env,
          E2E_BASE_URL: target.buildPublicURL,
          E2E_SKIP_WEBSERVER: '1',
          NODE_OPTIONS: '--no-deprecation --import=tsx/esm',
        },
      },
    )
  } finally {
    const tailOutput = await publicTail?.stop()

    if (!tailOutput) {
      return
    }

    if (tailOutput.stderr.trim()) {
      throw new Error(`Wrangler tail error output:\n${tailOutput.stderr}`)
    }

    if (tailOutput.stdout.trim()) {
      throw new Error(`Worker error logs detected during smoke verification:\n${tailOutput.stdout}`)
    }
  }
}

function syncSecrets(targetName, dryRun) {
  const args = ['src/scripts/cloudflare-sync-secrets.mjs', '--env', targetName]

  if (dryRun) {
    args.push('--dry-run')
  }

  runCommand(process.execPath, args, { env: process.env })
}

async function main() {
  const args = parseArgs(process.argv)
  ensureCommand(args.command)

  switch (args.command) {
    case 'build':
      buildCloudflareWorkers(args.target, { skipSizeCheck: args.skipSizeCheck })
      return
    case 'deploy': {
      if (!args.skipBuild) {
        buildCloudflareWorkers(args.target, { skipSizeCheck: args.skipSizeCheck })
      }

      const publicExists = workerExists(cloudflarePaths.publicWranglerConfig, args.target)
      const needsBootstrap = !args.dryRun && !publicExists

      if (needsBootstrap) {
        bootstrapWorkers(args.target)
      }

      if (!args.skipSecrets) {
        syncSecrets(args.target, args.dryRun)
      }

      if (args.dryRun || needsBootstrap) {
        return
      }

      deployWorkers(args.target)
      return
    }
    case 'dev': {
      buildCloudflareWorkers('local', { skipSizeCheck: false })
      runCommand(
        'pnpm',
        [
          'exec',
          'wrangler',
          'dev',
          '-c',
          path.relative(cloudflarePaths.rootDir, cloudflarePaths.publicWranglerConfig),
          '--port',
          '8787',
        ],
        { env: createWranglerEnv(process.env) },
      )
      return
    }
    case 'sync-secrets':
      syncSecrets(args.target, args.dryRun)
      return
    case 'verify':
      await verifyWorkers(args.target)
      return
    default:
      throw new Error(`Unsupported cloudflare-workers command: ${args.command}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
