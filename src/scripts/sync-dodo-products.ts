/**
 * sync-dodo-products.ts
 *
 * Fetches all products from Dodo Payments (test mode) and syncs them
 * into the Payload CMS `products` collection.
 *
 * Key findings from investigation:
 * - client.products.list() with NO PARAMS returns up to 10 results (sorted newest-first)
 * - 2 older free products are not in that default page; retrieved individually by known ID
 * - ESM hoisting fix: use dynamic imports so dotenv runs BEFORE payload.config evaluates
 */

// ── Step 1: Load env vars synchronously — MUST be before any Payload import ──
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const _require = createRequire(import.meta.url)
const dotenv = _require('dotenv')
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') })

// ── Step 2: Dynamic imports run AFTER env is loaded ──────────────────────────
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config.js')
const { default: DodoPayments } = await import('dodopayments')

// ---------------------------------------------------------------------------
// Known product IDs that don't appear in list() due to pagination
// ---------------------------------------------------------------------------
const FREE_PRODUCT_IDS = [
  'pdt_0NceaY8UNB1GoMOLesz8X', // 5 Signs Your Website Is Costing You Clients
  'pdt_0NceaYFa2uiHUZPpN7KOA', // Website Launch Checklist
  'pdt_0NceaYzEq1qzsiDZHrFWb', // How to Brief a Web Designer
]

// ---------------------------------------------------------------------------
// Metadata enrichment — curated descriptions + categorization
// ---------------------------------------------------------------------------
const ENRICHMENT: Record<
  string,
  { description: string; category: string; type: 'free' | 'paid' }
> = {
  pdt_0NceaY8UNB1GoMOLesz8X: {
    description:
      'Discover the 5 most common website mistakes that silently drive potential clients away — and how to fix them fast.',
    category: 'guide',
    type: 'free',
  },
  pdt_0NceaYFa2uiHUZPpN7KOA: {
    description:
      'A complete pre-launch checklist to ensure your website goes live without bugs, missing pages, or embarrassing errors.',
    category: 'checklist',
    type: 'free',
  },
  pdt_0NceaYzEq1qzsiDZHrFWb: {
    description:
      'Write a clear web design brief that saves you time, money, and endless back-and-forth with your designer.',
    category: 'ebook',
    type: 'free',
  },
  pdt_0NceaaACaY7X4A4qtHoek: {
    description:
      'Production-ready Next.js starter kit for SaaS products — payments, auth, CMS, and deployment pre-configured.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0Nceaa45LVxvpPmn0JPm3: {
    description:
      'Professional website starter kit designed for financial advisors, accountants, and investment firms.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0NceaZxJIATESTttB9Sy4: {
    description:
      'Clean, accessible website starter kit for NGOs, charities, and non-profit organisations.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0NceaZqUzBh2tvZYMPCKI: {
    description:
      'Full-featured e-commerce starter kit with product listings, cart, checkout, and order management.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0NceaZjlwvNurs3YmCFbJ: {
    description:
      'Event-ready website starter kit for venues, planners, and experience businesses.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0NceaZcHLefMoeI7jyZj1: {
    description:
      'Modern website starter kit for clinics, wellness practitioners, and health service providers.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0NceaZL68xGvvpTCMwAcr: {
    description:
      'Stylish website starter kit for restaurants, cafés, catering businesses, and hospitality brands.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0NceaZEHpeVsSmLthCaZp: {
    description:
      'Polished website starter kit for law firms, consultancies, and professional service businesses.',
    category: 'boilerplate',
    type: 'paid',
  },
  pdt_0NceaZ7MhTzjPhk2aY0X6: {
    description:
      'Portfolio website starter kit for artisans, makers, craftspeople, and independent creators.',
    category: 'boilerplate',
    type: 'paid',
  },
}

async function sync() {
  console.log('\n🔄 Starting Dodo → Payload CMS product sync...\n')

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET missing — check .env.local is loaded correctly')
  }
  if (!process.env.DODO_PAYMENTS_API_KEY) {
    throw new Error('DODO_PAYMENTS_API_KEY missing — check .env.local')
  }

  // ── 1. Fetch from Dodo ────────────────────────────────────────────────────
  const dodo = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: 'test_mode',
  })

  // Fetch the default page (returns 10 newest products)
  console.log('📦 Fetching products from Dodo...')
  const listResult = await dodo.products.list()
  const listedIds = new Set(listResult.items.map((p: any) => p.product_id))

  const allProducts: any[] = [...listResult.items]
  console.log(`   list() returned ${listResult.items.length} products`)

  // Retrieve the 3 known free products individually (they may be off the default page)
  for (const id of FREE_PRODUCT_IDS) {
    if (!listedIds.has(id)) {
      try {
        const product = await dodo.products.retrieve(id)
        allProducts.push(product)
        console.log(`   ✅ Retrieved missing free product: ${(product as any).name}`)
      } catch {
        console.warn(`   ⚠️  Could not retrieve product ${id} — skipping`)
      }
    }
  }

  console.log(`\n   Total products to sync: ${allProducts.length}`)

  // ── 2. Connect to Payload ─────────────────────────────────────────────────
  const payload = await getPayload({ config })

  // ── 3. Clear existing products ────────────────────────────────────────────
  console.log('\n🗑️  Clearing existing products in Payload CMS...')
  const existing = await payload.find({ collection: 'products', limit: 200 })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'products', id: doc.id })
  }
  console.log(`   Deleted ${existing.docs.length} existing records`)

  // ── 4. Create new records ─────────────────────────────────────────────────
  console.log('\n✨ Creating new product records...')
  let created = 0
  let skipped = 0

  for (const p of allProducts) {
    const id: string = p.product_id || p.id
    const name: string = p.name || 'Untitled'
    const enrichment = ENRICHMENT[id]

    if (!enrichment) {
      console.warn(`   ⚠️  No enrichment found for ${id} (${name}) — skipping`)
      skipped++
      continue
    }

    const priceCents: number =
      p.price?.price ?? p.price ?? 0

    await payload.create({
      collection: 'products',
      data: {
        title: name,
        description: enrichment.description,
        priceCents,
        currency: 'USD',
        dodoProductId: id,
        type: enrichment.type,
        category: enrichment.category,
        featured: enrichment.type === 'free',
      } as any,
    })

    console.log(
      `   ✅ Created: [${enrichment.type.toUpperCase()}] ${name} (${enrichment.category}) — $${(priceCents / 100).toFixed(2)}`,
    )
    created++
  }

  console.log(`\n🎉 Sync complete: ${created} created, ${skipped} skipped`)
  process.exit(0)
}

sync().catch((err) => {
  console.error('\n❌ Sync failed:', err)
  process.exit(1)
})
