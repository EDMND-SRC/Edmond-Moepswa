import path from 'node:path'
import { spawnSync } from 'node:child_process'

const wranglerTimeoutShim = path.join(process.cwd(), 'src', 'scripts', 'lib', 'cloudflare-workers', 'wrangler-http-timeout.cjs')
const wranglerRetryDelaysMs = [5000, 15000, 30000]
const wranglerTransientFailurePatterns = [
  'fetch failed',
  'ECONNRESET',
  'ETIMEDOUT',
  'UND_ERR_BODY_TIMEOUT',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
]

function formatCommand(command, args) {
  return [command, ...args].join(' ')
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function spawnCommand(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd,
    env: options.env,
    encoding: 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
  })
}

function writeCommandOutput(result) {
  if (result.stdout) {
    process.stdout.write(result.stdout)
  }

  if (result.stderr) {
    process.stderr.write(result.stderr)
  }
}

function createCommandFailure(command, args, result) {
  return new Error(`Command failed (${result.status ?? 'unknown'}): ${formatCommand(command, args)}`)
}

function isRetryableWranglerFailure(result) {
  if (result.status === 0) {
    return false
  }

  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`

  return wranglerTransientFailurePatterns.some((pattern) => output.includes(pattern))
}

export function createWranglerEnv(baseEnv = process.env) {
  const requireFlag = `--require=${wranglerTimeoutShim}`
  const nodeOptions = baseEnv.NODE_OPTIONS ?? ''

  if (nodeOptions.includes(requireFlag)) {
    return { ...baseEnv }
  }

  return {
    ...baseEnv,
    NODE_OPTIONS: nodeOptions ? `${nodeOptions} ${requireFlag}` : requireFlag,
  }
}

export function runCommand(command, args, options = {}) {
  const result = spawnCommand(command, args, {
    ...options,
    stdio: options.stdio ?? 'inherit',
  })

  if (result.status !== 0) {
    throw createCommandFailure(command, args, result)
  }

  return result
}

export function runCommandCapture(command, args, options = {}) {
  const result = spawnCommand(command, args, options)

  if (result.status !== 0) {
    writeCommandOutput(result)
    throw createCommandFailure(command, args, result)
  }

  return result.stdout
}

function runWranglerWithRetry(command, args, options = {}) {
  for (let attemptIndex = 0; attemptIndex <= wranglerRetryDelaysMs.length; attemptIndex += 1) {
    const result = spawnCommand(command, args, {
      ...options,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    if (result.status === 0) {
      if (!options.capture) {
        writeCommandOutput(result)
        return result
      }

      return result.stdout
    }

    const canRetry = isRetryableWranglerFailure(result) && attemptIndex < wranglerRetryDelaysMs.length

    if (!canRetry) {
      writeCommandOutput(result)
      throw createCommandFailure(command, args, result)
    }

    const recovery = options.beforeRetry?.({
      args,
      attempt: attemptIndex + 1,
      command,
      nextAttempt: attemptIndex + 2,
      result,
    })

    if (recovery?.handled) {
      return options.capture ? recovery.stdout ?? '' : result
    }

    writeCommandOutput(result)
    console.log(
      `Retrying transient Wrangler failure (${attemptIndex + 2}/${wranglerRetryDelaysMs.length + 1}): ${formatCommand(command, args)}`,
    )
    sleep(wranglerRetryDelaysMs[attemptIndex])
  }

  throw new Error(`Exhausted Wrangler retries: ${formatCommand(command, args)}`)
}

export function runWranglerCommand(command, args, options = {}) {
  return runWranglerWithRetry(command, args, { ...options, capture: false })
}

export function runWranglerCommandCapture(command, args, options = {}) {
  return runWranglerWithRetry(command, args, { ...options, capture: true })
}
