import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

import dotenv from 'dotenv'

import {
  cloudflarePaths,
  getTargetConfig,
  getWranglerArgs,
  runtimeSecretKeys,
} from './lib/cloudflare-workers/config.mjs'
import { createWranglerEnv } from './lib/cloudflare-workers/process.mjs'

const wranglerPath = path.join(process.cwd(), 'node_modules', 'wrangler', 'bin', 'wrangler.js')
const envLocalPath = path.join(process.cwd(), '.env.local')

dotenv.config({ path: '.env' })
dotenv.config({ override: true, path: '.env.local' })

if (!fs.existsSync(envLocalPath)) {
  throw new Error('Missing .env.local')
}

if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
  throw new Error('CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set before syncing')
}

const dryRun = process.argv.includes('--dry-run')
const targetFlagIndex = process.argv.findIndex((arg) => arg === '--env' || arg === '--target')
const targetName = targetFlagIndex >= 0 ? process.argv[targetFlagIndex + 1] : 'production'
const target = getTargetConfig(targetName)
const workerConfigs = [cloudflarePaths.publicWranglerConfig]
const secretSyncAttempts = 3

console.log(
  `${dryRun ? 'Dry run:' : 'Syncing'} ${runtimeSecretKeys.length} Cloudflare runtime secrets for ${targetName}.`,
)

for (const workerConfig of workerConfigs) {
  const presentKeys = runtimeSecretKeys.filter((key) => {
    if (key === 'NEXT_PUBLIC_SERVER_URL') {
      return true
    }

    return typeof process.env[key] === 'string'
  })
  const missingKeys = runtimeSecretKeys.filter((key) => {
    if (key === 'NEXT_PUBLIC_SERVER_URL') {
      return false
    }

    return typeof process.env[key] !== 'string'
  })

  console.log(`- ${path.basename(workerConfig)}: ${presentKeys.length} keys`)

  if (missingKeys.length > 0) {
    console.log(`  skipping unset keys: ${missingKeys.join(', ')}`)
  }

  const secretEntries = Object.fromEntries(
    presentKeys.flatMap((key) => {
      const value = key === 'NEXT_PUBLIC_SERVER_URL' ? target.buildPublicURL : process.env[key]

      return typeof value === 'string' ? [[key, value]] : []
    }),
  )

  for (const key of Object.keys(secretEntries)) {
    if (dryRun) {
      console.log(`  * ${key}`)
    }
  }

  if (dryRun) {
    continue
  }

  const workerLabel = path.basename(workerConfig)
  const bulkSecretsFile = path.join(
    cloudflarePaths.scratchDir,
    `versions-secrets.${targetName}.${workerLabel}.json`,
  )

  fs.mkdirSync(path.dirname(bulkSecretsFile), { recursive: true })
  fs.writeFileSync(bulkSecretsFile, `${JSON.stringify(secretEntries, null, 2)}\n`)

  let lastResult = null

  try {
    for (let attempt = 1; attempt <= secretSyncAttempts; attempt += 1) {
      const result = spawnSync(
        process.execPath,
        [
          wranglerPath,
          'versions',
          'secret',
          'bulk',
          bulkSecretsFile,
          ...getWranglerArgs(workerConfig, targetName),
          '--message',
          `runtime secret sync ${targetName} ${new Date().toISOString()}`,
        ],
        {
          cwd: process.cwd(),
          env: createWranglerEnv(process.env),
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
        },
      )

      lastResult = result

      if (result.status === 0) {
        break
      }

      process.stdout.write(result.stdout)
      process.stderr.write(result.stderr)

      if (attempt < secretSyncAttempts) {
        console.log(`  * retrying bulk sync for ${workerLabel} (${attempt + 1}/${secretSyncAttempts})`)
      }
    }
  } finally {
    fs.rmSync(bulkSecretsFile, { force: true })
  }

  if (!lastResult || lastResult.status !== 0) {
    throw new Error(`Failed to sync secrets for ${workerLabel}`)
  }

  console.log(`  * synced ${Object.keys(secretEntries).length} secrets`)
}
