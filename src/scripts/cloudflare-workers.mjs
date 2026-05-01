import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

import {
  cloudflarePaths,
  getTargetConfig,
  getWranglerArgs,
} from './lib/cloudflare-workers/config.mjs'
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

function writeDeploymentState(targetName, state) {
  const filePath = createDeploymentStateFile(targetName)

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(state, null, 2)}\n`)
}

function writeDeploymentBaseline(targetName, state) {
  const filePath = createDeploymentBaselineFile(targetName)

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(state, null, 2)}\n`)
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

function listWorkerVersions(configPath, targetName) {
  const output = runWranglerCommandCapture(
    'pnpm',
    ['exec', 'wrangler', 'versions', 'list', '--json', ...getWranglerArgs(configPath, targetName)],
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

function parseVersionSpec(versionSpec) {
  const match = versionSpec.match(/^([0-9a-f-]+)@(\d+)%$/i)

  if (!match) {
    throw new Error(`Unexpected Wrangler version spec: ${versionSpec}`)
  }

  return {
    percentage: Number.parseInt(match[2], 10),
    versionId: match[1],
  }
}

function deploymentMatchesVersionSplit(status, versionSpecs) {
  const actualVersions = new Map(
    (status.versions ?? []).map((version) => [version.version_id, Number(version.percentage)]),
  )

  return versionSpecs.every((versionSpec) => {
    const expected = parseVersionSpec(versionSpec)
    return actualVersions.get(expected.versionId) === expected.percentage
  })
}

function findVersionIdByMessage(configPath, targetName, message) {
  const versions = listWorkerVersions(configPath, targetName)
  const matchingVersion = versions.find((version) => version.annotations?.['workers/message'] === message)

  return matchingVersion?.id ?? null
}

function createPublicWranglerConfigWithPayloadVersion(targetName, payloadVersionId) {
  const tempConfigFile = path.join(
    cloudflarePaths.rootDir,
    `.wrangler.public.${targetName}.versioned.toml`,
  )
  const configSource = fs.readFileSync(cloudflarePaths.publicWranglerConfig, 'utf8')
  const nextConfigSource = configSource.replaceAll(
    'PAYLOAD_WORKER_VERSION_ID = ""',
    `PAYLOAD_WORKER_VERSION_ID = "${payloadVersionId}"`,
  )

  fs.mkdirSync(path.dirname(tempConfigFile), { recursive: true })
  fs.writeFileSync(tempConfigFile, nextConfigSource)

  return tempConfigFile
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
    {
      beforeRetry: () => {
        const recoveredVersionId = findVersionIdByMessage(configPath, targetName, message)

        if (!recoveredVersionId) {
          return null
        }

        return {
          handled: true,
          stdout: `Worker Version ID: ${recoveredVersionId}\n`,
        }
      },
      env: createWranglerEnv(process.env),
    },
  )

  return extractWorkerVersionId(output)
}

function deployVersionSplit(configPath, targetName, versionSpecs, message) {
  runWranglerCommand(
    'pnpm',
    [
      'exec',
      'wrangler',
      'versions',
      'deploy',
      ...versionSpecs,
      '--message',
      message,
      '-y',
      ...getWranglerArgs(configPath, targetName),
    ],
    {
      beforeRetry: () => {
        const status = getWorkerStatus(configPath, targetName)

        if (!deploymentMatchesVersionSplit(status, versionSpecs)) {
          return null
        }

        return { handled: true }
      },
      env: createWranglerEnv(process.env),
    },
  )
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
  const payloadStatus = workerExists(cloudflarePaths.payloadWranglerConfig, targetName)
    ? getWorkerStatus(cloudflarePaths.payloadWranglerConfig, targetName)
    : null

  writeDeploymentBaseline(targetName, {
    capturedAt: new Date().toISOString(),
    payload: payloadStatus
      ? {
          createdOn: payloadStatus.created_on,
          deploymentId: payloadStatus.id,
          versionId: getActiveVersionId(cloudflarePaths.payloadWranglerConfig, targetName),
        }
      : null,
    public: {
      createdOn: publicStatus.created_on,
      deploymentId: publicStatus.id,
      versionId: getActiveVersionId(cloudflarePaths.publicWranglerConfig, targetName),
    },
    rollbackCommands: [
      formatRollbackCommand(
        cloudflarePaths.publicWranglerConfig,
        targetName,
        getActiveVersionId(cloudflarePaths.publicWranglerConfig, targetName),
        `restore public ${targetName} baseline ${new Date().toISOString().slice(0, 10)}`,
      ),
      ...(payloadStatus
        ? [
            formatRollbackCommand(
              cloudflarePaths.payloadWranglerConfig,
              targetName,
              getActiveVersionId(cloudflarePaths.payloadWranglerConfig, targetName),
              `restore payload ${targetName} baseline ${new Date().toISOString().slice(0, 10)}`,
            ),
          ]
        : []),
    ],
    target: targetName,
  })
}

function bootstrapWorker(configPath, targetName) {
  runWranglerCommand(
    'pnpm',
    [
      'exec',
      'wrangler',
      'deploy',
      '--no-bundle',
      ...getWranglerArgs(configPath, targetName),
    ],
    {
      beforeRetry: () => {
        if (!workerExists(configPath, targetName)) {
          return null
        }

        return { handled: true }
      },
      env: createWranglerEnv(process.env),
    },
  )
}

function bootstrapWorkers(targetName) {
  bootstrapWorker(cloudflarePaths.payloadWranglerConfig, targetName)
  bootstrapWorker(cloudflarePaths.publicWranglerConfig, targetName)

  const deploymentState = {
    payloadVersionId: getActiveVersionId(cloudflarePaths.payloadWranglerConfig, targetName),
    publicVersionId: getActiveVersionId(cloudflarePaths.publicWranglerConfig, targetName),
  }

  writeDeploymentState(targetName, deploymentState)

  return deploymentState
}

function deployWorkers(targetName) {
  if (targetName === 'production') {
    captureDeploymentBaseline(targetName)
  }

  const payloadExists = workerExists(cloudflarePaths.payloadWranglerConfig, targetName)
  const publicExists = workerExists(cloudflarePaths.publicWranglerConfig, targetName)

  if (!payloadExists || !publicExists) {
    return bootstrapWorkers(targetName)
  }

  const newPayloadVersionId = uploadWorkerVersion(
    cloudflarePaths.payloadWranglerConfig,
    targetName,
    `payload rollout ${new Date().toISOString()}`,
  )
  const currentPayloadVersionId = getActiveVersionId(cloudflarePaths.payloadWranglerConfig, targetName)
  const publicConfigWithVersion = createPublicWranglerConfigWithPayloadVersion(targetName, newPayloadVersionId)
  try {
    const newPublicVersionId = uploadWorkerVersion(
      publicConfigWithVersion,
      targetName,
      `public rollout ${new Date().toISOString()}`,
    )

    deployVersionSplit(
      cloudflarePaths.payloadWranglerConfig,
      targetName,
      [`${currentPayloadVersionId}@100%`, `${newPayloadVersionId}@0%`],
      'prepare payload gradual rollout',
    )
    deployVersionSplit(
      publicConfigWithVersion,
      targetName,
      [`${newPublicVersionId}@100%`],
      'promote public worker',
    )
    deployVersionSplit(
      cloudflarePaths.payloadWranglerConfig,
      targetName,
      [`${newPayloadVersionId}@100%`],
      'promote payload worker',
    )

    const deploymentState = {
      payloadVersionId: newPayloadVersionId,
      publicVersionId: newPublicVersionId,
    }

    writeDeploymentState(targetName, deploymentState)

    return deploymentState
  } finally {
    fs.rmSync(publicConfigWithVersion, { force: true })
  }
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
  const currentPayloadVersionId = getActiveVersionId(cloudflarePaths.payloadWranglerConfig, targetName)

  if (currentPublicVersionId !== expectedState.publicVersionId) {
    throw new Error(
      `Public worker version mismatch: expected ${expectedState.publicVersionId}, got ${currentPublicVersionId}`,
    )
  }

  if (currentPayloadVersionId !== expectedState.payloadVersionId) {
    throw new Error(
      `Payload worker version mismatch: expected ${expectedState.payloadVersionId}, got ${currentPayloadVersionId}`,
    )
  }
}

function runSmokeUserScript(scriptPath) {
  runCommand('pnpm', ['exec', 'tsx', scriptPath], {
    env: {
      ...process.env,
      NODE_OPTIONS: '--no-deprecation',
    },
  })
}

async function verifyWorkers(targetName) {
  const target = getTargetConfig(targetName)
  const isRemote = targetName === 'staging' || targetName === 'production'
  const publicTail = isRemote ? startTail(cloudflarePaths.publicWranglerConfig, targetName) : null
  const payloadTail = isRemote ? startTail(cloudflarePaths.payloadWranglerConfig, targetName) : null

  try {
    if (isRemote) {
      verifyDeploymentVersions(targetName)
      runSmokeUserScript('src/scripts/ensure-cloudflare-smoke-user.ts')
      runSmokeUserScript('src/scripts/cleanup-cloudflare-smoke-data.ts')
    }

    runCommand(
      'pnpm',
      [
        'exec',
        'playwright',
        'test',
        'tests/e2e/frontend.e2e.spec.ts',
        'tests/e2e/admin.e2e.spec.ts',
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
          E2E_USE_SMOKE_USER: isRemote ? '1' : '0',
          NODE_OPTIONS: '--no-deprecation --import=tsx/esm',
        },
      },
    )
  } finally {
    if (isRemote) {
      runSmokeUserScript('src/scripts/cleanup-cloudflare-smoke-data.ts')
    }

    const tailOutputs = await Promise.all([publicTail?.stop(), payloadTail?.stop()])

    for (const tailOutput of tailOutputs) {
      if (!tailOutput) {
        continue
      }

      if (tailOutput.stderr.trim()) {
        throw new Error(`Wrangler tail error output:\n${tailOutput.stderr}`)
      }

      if (tailOutput.stdout.trim()) {
        throw new Error(`Worker error logs detected during smoke verification:\n${tailOutput.stdout}`)
      }
    }
  }
}

function syncSecrets(targetName, dryRun) {
  const args = ['src/scripts/cloudflare-sync-secrets.mjs', '--env', targetName]

  if (dryRun) {
    args.push('--dry-run')
  }

  runCommand(process.execPath, args, {
    env: process.env,
  })
}

async function main() {
  const args = parseArgs(process.argv)
  ensureCommand(args.command)

  switch (args.command) {
    case 'build': {
      buildCloudflareWorkers(args.target, { skipSizeCheck: args.skipSizeCheck })
      return
    }

    case 'cleanup-smoke-data': {
      runSmokeUserScript('src/scripts/cleanup-cloudflare-smoke-data.ts')
      return
    }

    case 'deploy': {
      if (!args.skipBuild) {
        buildCloudflareWorkers(args.target, { skipSizeCheck: args.skipSizeCheck })
      }

      if (!args.skipSecrets) {
        syncSecrets(args.target, args.dryRun)
      }

      if (args.dryRun) {
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
          '-c',
          path.relative(cloudflarePaths.rootDir, cloudflarePaths.payloadWranglerConfig),
          '--port',
          '8787',
        ],
        { env: createWranglerEnv(process.env) },
      )
      return
    }

    case 'ensure-smoke-user': {
      runSmokeUserScript('src/scripts/ensure-cloudflare-smoke-user.ts')
      return
    }

    case 'sync-secrets': {
      syncSecrets(args.target, args.dryRun)
      return
    }

    case 'verify': {
      await verifyWorkers(args.target)
      return
    }

    default:
      throw new Error(`Unsupported cloudflare-workers command: ${args.command}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
