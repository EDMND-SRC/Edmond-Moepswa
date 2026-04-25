/**
 * Direct SQL Migration — Update projects category enum
 *
 * Run: npx tsx scripts/update-category-enum.ts
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { Client } from 'pg'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env.local') })

async function migrate() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set.')
    process.exit(1)
  }

  console.log('🔄 Updating category enum in PostgreSQL...')

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  try {
    const exec = async (q: string) => {
      try {
        await client.query(q)
      } catch (e: any) {
        // Suppress: already exists, does not exist, already renamed
        if (
          e.message.includes('does not exist') ||
          e.message.includes('already exists') ||
          e.code === '42710' ||
          e.code === '42704'
        )
          return
        throw e
      }
    }

    // Step 1: Check current state
    const res = await client.query("SELECT typname FROM pg_type WHERE typname IN ('enum_projects_category', 'enum_projects_category_old');")
    const hasOld = res.rows.some((r: any) => r.typname === 'enum_projects_category_old')
    const hasCurrent = res.rows.some((r: any) => r.typname === 'enum_projects_category')

    console.log(`  ℹ Current state: enum_projects_category=${hasCurrent}, enum_projects_category_old=${hasOld}`)

    // If previous partial run left us in a bad state, clean up
    if (hasOld && hasCurrent) {
      // Check which enum the column currently uses
      const colRes = await client.query(
        "SELECT udt_name FROM information_schema.columns WHERE table_name='projects' AND column_name='category';"
      )
      const currentType = colRes.rows[0]?.udt_name
      console.log(`  ℹ Column currently uses: ${currentType}`)

      if (currentType === 'enum_projects_category') {
        // Already migrated, just clean up old enum
        await exec('DROP TYPE IF EXISTS enum_projects_category_old;')
        console.log('  ✓ Already migrated. Cleaned up old enum.')
        console.log('\n✅ Migration complete!')
        return
      }
    }

    // Step 2: Drop default
    await exec('ALTER TABLE projects ALTER COLUMN category DROP DEFAULT;')
    console.log('  ✓ Default constraint dropped.')

    // Step 3: Rename old enum to old (only if current exists and not already renamed)
    if (hasCurrent && !hasOld) {
      await exec('ALTER TYPE enum_projects_category RENAME TO enum_projects_category_old;')
    }

    // Step 4: Create new enum if it doesn't already exist
    if (!hasCurrent) {
      await exec("CREATE TYPE enum_projects_category AS ENUM ('websites', 'applications', 'automation', 'products');")
    }
    console.log('  ✓ New enum type ready.')

    // Step 5: Drop NOT NULL temporarily (old values will be null)
    await exec('ALTER TABLE projects ALTER COLUMN category DROP NOT NULL;')
    console.log('  ✓ NOT NULL dropped temporarily.')

    // Step 6: Null out old values
    await exec("UPDATE projects SET category = NULL WHERE category::text NOT IN ('websites', 'applications', 'automation', 'products');")
    console.log('  ✓ Old values nulled.')

    // Step 7: Convert via text
    await exec('ALTER TABLE projects ALTER COLUMN category TYPE text USING category::text;')
    await exec('ALTER TABLE projects ALTER COLUMN category TYPE enum_projects_category USING category::enum_projects_category;')
    console.log('  ✓ Column type updated.')

    // Step 7: Index
    await exec('CREATE INDEX IF NOT EXISTS projects_category_idx ON projects (category);')
    console.log('  ✓ Index ensured.')

    // Step 8: Clean up old enum
    await exec('DROP TYPE IF EXISTS enum_projects_category_old;')
    console.log('  ✓ Old enum dropped.')

    console.log('\n✅ Migration complete!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

migrate()
