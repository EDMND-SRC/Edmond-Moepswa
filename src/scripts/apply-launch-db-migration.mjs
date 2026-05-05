import fs from 'node:fs'
import path from 'node:path'

import pg from 'pg'

const migrationFile = path.join(process.cwd(), 'database', 'migrations', '20260505_extract_payload_runtime.sql')
const connectionString = process.env.DATABASE_URL?.trim()

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured')
}

if (!fs.existsSync(migrationFile)) {
  throw new Error(`Missing migration file: ${migrationFile}`)
}

const client = new pg.Client({ connectionString })

try {
  await client.connect()
  await client.query(readFileSync(migrationFile))
  console.log(`Applied ${path.basename(migrationFile)}`)
} finally {
  await client.end().catch(() => undefined)
}

function readFileSync(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}
