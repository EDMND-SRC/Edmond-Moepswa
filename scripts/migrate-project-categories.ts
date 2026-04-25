/**
 * Migration Script — Update Project Categories to New Taxonomy
 *
 * Run: npx tsx scripts/migrate-project-categories.ts
 *
 * Maps existing project slugs to the new category values:
 *   websites, applications, automation, products
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env.local') })

const categoryMap: Record<string, string> = {
  'morning-dew-cafe': 'websites',
  'hsnv-risk-dashboard': 'applications',
  'gaborone-artisan-marketplace': 'applications',
  'lead-client-automation': 'automation',
  'saas-boilerplate-subscriptions': 'products',
  'botswana-construction-website': 'websites',
  'gaborone-food-hub': 'websites',
  'payload-cms-botswana-sme': 'products',
}

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Please configure .env.local')
    process.exit(1)
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  console.log('🔄 Migrating project categories...')

  const payload = await getPayload({ config })

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const [slug, newCategory] of Object.entries(categoryMap)) {
    try {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: slug } },
      })

      if (existing.docs.length === 0) {
        console.log(`  ⊘ ${slug} — not found`)
        skipped++
        continue
      }

      const project = existing.docs[0]

      // Only update if the category actually changed
      if (project.category === newCategory) {
        console.log(`  ⊘ ${slug} — already ${newCategory}`)
        skipped++
        continue
      }

      await payload.update({
        collection: 'projects',
        id: project.id,
        data: { category: newCategory as 'websites' | 'applications' | 'automation' | 'products' },
      })

      console.log(`  ✓ ${slug} → ${newCategory}`)
      updated++
    } catch (err) {
      console.error(`  ✗ ${slug}:`, err instanceof Error ? err.message : err)
      errors++
    }
  }

  console.log('')
  console.log('✅ Migration complete!')
  console.log(`   Updated: ${updated}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors:  ${errors}`)

  await payload.db?.destroy?.()
  process.exit(errors > 0 ? 1 : 0)
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
