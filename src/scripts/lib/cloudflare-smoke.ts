import fs from 'node:fs'
import path from 'node:path'

import dotenv from 'dotenv'
import { getPayload } from 'payload'

dotenv.config({ path: '.env' })
dotenv.config({ override: true, path: '.env.local' })

export const smokeArtifactFile = path.join(process.cwd(), 'test-outputs', 'cloudflare-smoke-artifacts.json')

type SmokeArtifacts = {
  mediaIds: string[]
  pageIds: string[]
}

export function resolveSmokeCredentials() {
  const email = process.env.SMOKE_ADMIN_EMAIL || process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.SMOKE_ADMIN_PASSWORD || process.env.PAYLOAD_ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('Missing SMOKE_ADMIN_EMAIL/SMOKE_ADMIN_PASSWORD or PAYLOAD_ADMIN_EMAIL/PAYLOAD_ADMIN_PASSWORD')
  }

  return {
    email,
    name: 'Cloudflare Smoke User',
    password,
  }
}

export function readSmokeArtifacts(): SmokeArtifacts {
  if (!fs.existsSync(smokeArtifactFile)) {
    return {
      mediaIds: [],
      pageIds: [],
    }
  }

  return JSON.parse(fs.readFileSync(smokeArtifactFile, 'utf8')) as SmokeArtifacts
}

export function writeSmokeArtifacts(artifacts: SmokeArtifacts) {
  fs.mkdirSync(path.dirname(smokeArtifactFile), { recursive: true })
  fs.writeFileSync(smokeArtifactFile, `${JSON.stringify(artifacts, null, 2)}\n`)
}

export async function getPayloadClient() {
  const { default: config } = await import('../../payload.config')

  return getPayload({ config })
}
