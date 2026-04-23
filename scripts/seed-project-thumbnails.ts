/**
 * Seed Script — Project Thumbnails
 *
 * [!] DEPRECATION NOTICE: This script is deprecated.
 * Project thumbnails are now managed and generated automatically by Payload CMS
 * inside the public/media directory. Manual seeding via this script is no longer required
 * and may cause duplicate Media collection entries.
 *
 * Uploads project thumbnail images to the Media collection and creates/updates
 * Project entries in the Projects collection.
 *
 * Run: npx tsx seed-project-thumbnails.ts
 *
 * Requires:
 *   - DATABASE_URL in .env.local
 *   - Thumbnail images in visual-assets/project-thumbnails/
 */

import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Creates a minimal valid Lexical editor state with a single paragraph */
function createLexicalParagraph(text: string) {
  return {
    root: {
      type: 'root' as const,
      format: '',
      direction: 'ltr' as const,
      indent: 0,
      version: 2,
      children: [
        {
          type: 'paragraph' as const,
          format: '',
          direction: 'ltr' as const,
          indent: 0,
          version: 2,
          children: [
            { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 2 },
          ],
        },
      ],
    },
  }
}

// Load .env.local before importing payload config
dotenv.config({ path: path.resolve(dirname, '.env.local') })

const THUMBNAIL_DIR = path.resolve(dirname, 'visual-assets/project-thumbnails')

interface ProjectSeed {
  slug: string
  title: string
  category: 'web' | 'automation' | 'boilerplate' | 'open-source' | 'seo'
  year: string
  description: string
  thumbnail: string
  link: string
}

const projectData: ProjectSeed[] = [
  {
    slug: 'morning-dew-cafe',
    title: 'Morning Dew Café — Website Redesign',
    category: 'web',
    year: '2019',
    description:
      'Online ordering system and website redesign for a Canberra cafe. Cut morning rush wait times in half and grew catering business through the website.',
    thumbnail: 'project-morning-dew-cafe.webp',
    link: '#',
  },
  {
    slug: 'construction-website',
    title: 'Construction Company Website',
    category: 'web',
    year: '2024',
    description:
      'Modern web presence for a Gaborone-based construction firm. Portfolio showcase, service pages, and lead capture forms.',
    thumbnail: 'project-construction-website.webp',
    link: '#',
  },
  {
    slug: 'hsnv-risk-dashboard',
    title: 'HSNV Risk Management Dashboard',
    category: 'web',
    year: '2024',
    description:
      'Insurance policy tracking dashboard for a Botswana risk management firm. Tracks expiring policies across 12+ construction projects and auto-generates NBFIRA compliance reports.',
    thumbnail: 'project-hsnv-risk.webp',
    link: '#',
  },
  {
    slug: 'artisan-marketplace',
    title: 'Artisan E-commerce Platform',
    category: 'web',
    year: '2024',
    description:
      'Custom e-commerce platform for Botswana artisans. Online ordering, inventory management, and mobile-first responsive design.',
    thumbnail: 'project-artisan-marketplace.webp',
    link: '#',
  },
  {
    slug: 'food-hub',
    title: 'Food Hub Platform',
    category: 'web',
    year: '2024',
    description:
      'Multi-vendor food ordering platform connecting local restaurants with customers. Real-time order tracking and payment integration.',
    thumbnail: 'project-food-hub.webp',
    link: '#',
  },
  {
    slug: 'automation-pipeline',
    title: 'Lead Automation Pipeline',
    category: 'automation',
    year: '2024',
    description:
      'Make.com automated pipeline for lead routing. Detects intent from contact forms, assigns team members, sends personalised replies, and logs to CRM.',
    thumbnail: 'project-automation-pipeline.webp',
    link: '#',
  },
  {
    slug: 'saas-boilerplate',
    title: 'SaaS Boilerplate',
    category: 'boilerplate',
    year: '2025',
    description:
      'Subscription management platform with Dodo Payments integration, user tier management, and analytics dashboard. Built in three weeks from a custom boilerplate.',
    thumbnail: 'project-saas-boilerplate.webp',
    link: '#',
  },
  {
    slug: 'open-source-cms',
    title: 'Open Source CMS Tools',
    category: 'open-source',
    year: '2025',
    description:
      'Open-source tooling and plugins for Payload CMS. Community-maintained utilities for developers building with modern headless architectures.',
    thumbnail: 'project-open-source-cms.webp',
    link: '#',
  },
]

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Please configure .env.local')
    process.exit(1)
  }

  if (!fs.existsSync(THUMBNAIL_DIR)) {
    console.error(`Thumbnail directory not found: ${THUMBNAIL_DIR}`)
    process.exit(1)
  }

  // Dynamic imports after dotenv
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  console.log('🌱 Seeding project thumbnails...')

  // Local API bypasses access control — no login needed
  const payload = await getPayload({ config })

  // ─── Process each project ─────────────────────────────────────────────────

  let uploaded = 0
  let skipped = 0
  let created = 0
  let updated = 0
  let errors = 0

  for (const project of projectData) {
    const thumbnailPath = path.join(THUMBNAIL_DIR, project.thumbnail)

    // Check thumbnail exists
    if (!fs.existsSync(thumbnailPath)) {
      console.warn(`  ⚠ Thumbnail not found: ${project.thumbnail} — skipping ${project.title}`)
      skipped++
      continue
    }

    try {
      // Step 1: Upload thumbnail to Media collection
      console.log(`📸 Uploading ${project.thumbnail}...`)

      const fileStats = await fs.promises.stat(thumbnailPath)
      const fileBuffer = await fs.promises.readFile(thumbnailPath)

      // Detect MIME type from file extension
      const ext = path.extname(project.thumbnail).toLowerCase()
      const mimetypes: Record<string, string> = {
        '.webp': 'image/webp',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      }
      const mimetype = mimetypes[ext] || 'application/octet-stream'

      // Check if media with this filename already exists (dedup)
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: project.thumbnail } },
      })

      let mediaId: number | string
      if (existingMedia.docs.length > 0) {
        mediaId = existingMedia.docs[0].id
        console.log(`  ⊘ Media exists (ID: ${mediaId}) — reusing`)
      } else {
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: `${project.title} thumbnail`,
          },
          file: {
            data: fileBuffer,
            name: project.thumbnail,
            mimetype,
            size: fileStats.size,
          },
        })
        mediaId = media.id
        console.log(`  ✓ Media uploaded (ID: ${mediaId})`)
        uploaded++
      }

      // Step 2: Create or update project (check by slug)
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
      })

      const projectDataForPayload = {
        title: project.title,
        category: project.category,
        year: project.year,
        thumbnail: mediaId,
        link: project.link,
        description: createLexicalParagraph(project.description),
      }

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'projects',
          data: projectDataForPayload as any,
        })
        console.log(`  ✓ Created project: ${project.title}`)
        created++
      } else {
        await payload.update({
          collection: 'projects',
          id: existing.docs[0].id,
          data: projectDataForPayload as any,
        })
        console.log(`  ✓ Updated project: ${project.title}`)
        updated++
      }
    } catch (error) {
      console.error(
        `  ✗ Error processing ${project.title}:`,
        error instanceof Error ? error.message : error,
      )
      errors++
    }
  }

  // ─── Summary ───────────────────────────────────────────────────────────────

  console.log('')
  console.log('✅ Seeding complete!')
  console.log(`   Thumbnails uploaded: ${uploaded}`)
  console.log(`   Projects created:    ${created}`)
  console.log(`   Projects updated:    ${updated}`)
  console.log(`   Skipped:             ${skipped}`)
  console.log(`   Errors:              ${errors}`)

  if (errors > 0) {
    await payload.db?.destroy?.()
    process.exit(1)
  }
  await payload.db?.destroy?.()
  process.exit(0)
}

seed().catch((error) => {
  console.error('Fatal error during seeding:', error)
  process.exit(1)
})
