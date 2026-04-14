import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getPayload } from 'payload'
import config from '../src/payload.config'

async function cleanupProjects() {
  const payload = await getPayload({ config })
  
  // List of slugs that are "bad" (no media counterparts)
  const badSlugs = [
    'morning-dew-cafe',
    'payload-cms-botswana-sme',
    'saas-boilerplate-subscriptions',
    'lead-client-automation',
    'gaborone-food-hub',
    'gaborone-artisan-marketplace',
    'hsnv-risk-dashboard',
    'botswana-construction-website'
  ]

  console.log('Cleaning up duplicate projects...')
  
  for (const slug of badSlugs) {
    const result = await payload.find({
      collection: 'projects',
      where: {
        slug: { equals: slug }
      }
    })

    if (result.docs.length > 0) {
      for (const doc of result.docs) {
        // Double check it doesn't have a thumbnail before deleting
        if (!doc.thumbnail) {
          console.log(`Deleting duplicate project: ${doc.title} (${doc.slug})`)
          await payload.delete({
            collection: 'projects',
            id: doc.id
          })
        }
      }
    }
  }
  
  console.log('Cleanup complete.')
}

cleanupProjects().catch(console.error).then(() => process.exit(0))
