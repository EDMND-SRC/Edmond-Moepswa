/**
 * Link project thumbnails to existing seeded projects.
 * Uploads images from public/media/ and assigns them to projects.
 *
 * Run: npx tsx scripts/link-project-thumbnails.ts
 */

import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env.local') })

const MEDIA_DIR = path.resolve(dirname, '../public/media')

const thumbnailMap: Record<string, string> = {
  'morning-dew-cafe': 'project-morning-dew-cafe-3.webp',
  'hsnv-risk-dashboard': 'project-hsnv-risk-3.webp',
  'gaborone-artisan-marketplace': 'project-artisan-marketplace-3.webp',
  'lead-client-automation': 'project-automation-pipeline-3.webp',
  'saas-boilerplate-subscriptions': 'project-saas-boilerplate-3.webp',
  'botswana-construction-website': 'project-construction-website-3.webp',
  'gaborone-food-hub': 'project-food-hub-3.webp',
  'payload-cms-botswana-sme': 'project-open-source-cms-3.webp',
}

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set.')
    process.exit(1)
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  console.log('🖼️  Linking project thumbnails...')

  const payload = await getPayload({ config })

  let uploaded = 0
  let linked = 0
  let skipped = 0
  let errors = 0

  for (const [slug, thumbnailFile] of Object.entries(thumbnailMap)) {
    try {
      const filePath = path.join(MEDIA_DIR, thumbnailFile)

      if (!fs.existsSync(filePath)) {
        console.warn(`  ⚠ File not found: ${thumbnailFile} — skipping ${slug}`)
        skipped++
        continue
      }

      // Check if media already exists
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: thumbnailFile } },
      })

      let mediaId: number | string
      if (existingMedia.docs.length > 0) {
        mediaId = existingMedia.docs[0].id
        console.log(`  ⊘ Media exists (ID: ${mediaId}): ${thumbnailFile}`)
      } else {
        const fileBuffer = await fs.promises.readFile(filePath)
        const fileStats = await fs.promises.stat(filePath)

        const media = await payload.create({
          collection: 'media',
          data: { alt: `${slug} thumbnail` },
          file: {
            data: fileBuffer,
            name: thumbnailFile,
            mimetype: 'image/webp',
            size: fileStats.size,
          },
        })
        mediaId = media.id
        console.log(`  ✓ Uploaded (ID: ${mediaId}): ${thumbnailFile}`)
        uploaded++
      }

      // Find and update project
      const project = await payload.find({
        collection: 'projects',
        where: { slug: { equals: slug } },
      })

      if (project.docs.length === 0) {
        console.warn(`  ⚠ Project not found: ${slug}`)
        skipped++
        continue
      }

      await payload.update({
        collection: 'projects',
        id: project.docs[0].id,
        data: { thumbnail: mediaId },
      })
      console.log(`  ✓ Linked thumbnail to project: ${project.docs[0].title}`)
      linked++
    } catch (error) {
      console.error(`  ✗ Error: ${slug}:`, error instanceof Error ? error.message : error)
      errors++
    }
  }

  console.log('')
  console.log('✅ Thumbnail linking complete!')
  console.log(`   Uploaded: ${uploaded}`)
  console.log(`   Linked:   ${linked}`)
  console.log(`   Skipped:  ${skipped}`)
  console.log(`   Errors:   ${errors}`)

  await payload.db?.destroy?.()
  process.exit(errors > 0 ? 1 : 0)
}

seed()