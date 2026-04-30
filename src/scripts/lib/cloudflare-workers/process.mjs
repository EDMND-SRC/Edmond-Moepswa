import path from 'node:path'
import { spawnSync } from 'node:child_process'

const wranglerTimeoutShim = path.join(process.cwd(), 'src', 'scripts', 'lib', 'cloudflare-workers', 'wrangler-http-timeout.cjs')

function formatCommand(command, args) {
  return [command, ...args].join(' ')
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
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    env: options.env,
    encoding: 'utf8',
    stdio: options.stdio ?? 'inherit',
  })

  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status ?? 'unknown'}): ${formatCommand(command, args)}`)
  }

  return result
}

export function runCommandCapture(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    env: options.env,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  if (result.status !== 0) {
    process.stdout.write(result.stdout)
    process.stderr.write(result.stderr)
    throw new Error(`Command failed (${result.status ?? 'unknown'}): ${formatCommand(command, args)}`)
  }

  return result.stdout
}
