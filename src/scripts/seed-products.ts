import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env before anything else to ensure Payload config gets the variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') })

import { getPayload } from 'payload'
import config from '../payload.config'

const products = [
  {
    title: '5 Signs Your Business Is Losing Money to Manual Processes',
    description: 'A short guide to identifying costly manual processes that could be automated in your business.',
    priceCents: 0,
    currency: 'USD',
    dodoProductId: 'bgbgoq',
    type: 'free',
    category: 'guide',
    featured: true,
  },
  {
    title: 'Digital Systems Health Check',
    description: 'A self-assessment scorecard for evaluating the health of your current digital infrastructure.',
    priceCents: 0,
    currency: 'USD',
    dodoProductId: 'fwruno',
    type: 'free',
    category: 'checklist',
    featured: false,
  },
  {
    title: 'UX Red Flags Checklist',
    description: 'Common UX mistakes that cost conversions — 15 red flags to check on your own site today.',
    priceCents: 0,
    currency: 'USD',
    dodoProductId: 'legyuk',
    type: 'free',
    category: 'checklist',
    featured: false,
  },
  {
    title: 'High-Conversion Landing Page Kit',
    description: 'Professional Landing Page Kit built with Next.js, Framer Motion, and Tailwind CSS.',
    priceCents: 4900,
    currency: 'USD',
    dodoProductId: process.env.DODO_PRODUCT_LANDING_PAGE || 'PLACEHOLDER_LANDING',
    type: 'paid',
    category: 'boilerplate',
    featured: true,
  },
  {
    title: 'Next.js SaaS Starter',
    description: 'Full-stack SaaS boilerplate with Dodo Payments, Payload CMS, and Next.js.',
    priceCents: 14900,
    currency: 'USD',
    dodoProductId: process.env.DODO_PRODUCT_SAAS_STARTER || 'PLACEHOLDER_SAAS',
    type: 'paid',
    category: 'boilerplate',
    featured: true,
  },
]

async function seed() {
  console.log('--- Seeding Products ---')
  
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing after dotenv.config()')
  }

  const payload = await getPayload({ config })

  for (const product of products) {
    const existing = await payload.find({
      collection: 'products',
      where: {
        title: { equals: product.title },
      },
    })

    if (existing.docs.length > 0) {
      console.log(`Product already exists: ${product.title}`)
      continue
    }

    await payload.create({
      collection: 'products',
      data: product as any,
    })
    console.log(`Created product: ${product.title}`)
  }

  console.log('--- Seeding Complete ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
