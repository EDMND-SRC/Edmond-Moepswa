/**
 * Creates products in Dodo Payments (Test Mode) via raw REST API.
 *
 * Free resources: Pay What You Want with minimum $0
 * Paid boilerplates: Fixed pricing in USD
 *
 * Usage: npx tsx seed-dodo-products-api.ts
 */

const API_KEY =
  process.env.DODO_PAYMENTS_API_KEY ||
  'i2C7srYd2mlUpXtJ.nSef762JdjKvNHHjT2lAH_oKQH7GrAU6tHsHcpF6Epf8O7dW'
const BASE_URL = 'https://test.dodopayments.com' // test mode

if (!API_KEY) {
  console.error('❌ DODO_PAYMENTS_API_KEY not set')
  process.exit(1)
}

interface ProductDef {
  name: string
  description: string
  priceCents: number
  taxCategory: 'digital_products' | 'saas' | 'e_book' | 'edtech'
  pwyw?: boolean
  pwywMinCents?: number
  pwywMaxCents?: number
  pwywSuggestedCents?: number
}

const freeResources: ProductDef[] = [
  {
    name: '5 Signs Your Website Is Costing You Clients',
    description:
      'Discover the 5 most common website mistakes that silently drive potential clients away — and how to fix them fast.',
    priceCents: 0,
    taxCategory: 'e_book',
    pwyw: true,
    pwywMinCents: 0,
    pwywSuggestedCents: 500,
  },
  {
    name: 'Website Launch Checklist',
    description:
      'A complete pre-launch checklist to ensure your website goes live without bugs, missing pages, or embarrassing errors.',
    priceCents: 0,
    taxCategory: 'digital_products',
    pwyw: true,
    pwywMinCents: 0,
    pwywSuggestedCents: 500,
  },
  {
    name: 'How to Brief a Web Designer',
    description:
      'Write a clear web design brief that saves you time, money, and endless back-and-forth with your designer.',
    priceCents: 0,
    taxCategory: 'e_book',
    pwyw: true,
    pwywMinCents: 0,
    pwywSuggestedCents: 500,
  },
]

const paidBoilerplates: ProductDef[] = [
  {
    name: 'Artisan & Craftmaker Portfolio',
    description:
      'Visual-first portfolio for artisans. Next.js + Tailwind CSS, gallery layouts, process storytelling, inquiry forms.',
    priceCents: 4999,
    taxCategory: 'digital_products',
  },
  {
    name: 'Professional Services Firm',
    description:
      'Complete website for professional services. Service pages, team profiles, client onboarding forms, SEO optimization.',
    priceCents: 5599,
    taxCategory: 'digital_products',
  },
  {
    name: 'Food & Hospitality',
    description:
      'Restaurant and hospitality website with menu management, reservation system, and online ordering integration.',
    priceCents: 5999,
    taxCategory: 'digital_products',
  },
  {
    name: 'Health & Wellness',
    description:
      'Accessible, calming design for health practitioners. Booking system integration and client resources.',
    priceCents: 4999,
    taxCategory: 'digital_products',
  },
  {
    name: 'Events & Experiences',
    description:
      'Event-focused website with calendar, ticketing integration, countdown CTAs, and social sharing.',
    priceCents: 3999,
    taxCategory: 'digital_products',
  },
  {
    name: 'E-commerce',
    description:
      'Full online store with product variants, cart, checkout, and order management. Supports DPO PayGate, Orange Money, and Dodo Payments.',
    priceCents: 6999,
    taxCategory: 'digital_products',
  },
  {
    name: 'NGO / Non-Profit',
    description:
      'Impact-focused nonprofit website with donation integration, volunteer signups, and newsletter integration.',
    priceCents: 4399,
    taxCategory: 'digital_products',
  },
  {
    name: 'Financial Services',
    description:
      'Trust-building financial services website with client portal, compliance pages, and lead qualification forms.',
    priceCents: 5999,
    taxCategory: 'digital_products',
  },
  {
    name: 'SaaS Starter',
    description:
      'Complete SaaS starter with authentication, role-based access, subscription billing, admin dashboard, and analytics.',
    priceCents: 9999,
    taxCategory: 'saas',
  },
]

async function createProduct(
  def: ProductDef,
): Promise<{ id: string; name: string; url: string } | null> {
  try {
    const body: Record<string, unknown> = {
      name: def.name,
      description: def.description,
      pricing: {
        type: 'one_time',
        amount: def.priceCents,
        currency: 'usd',
      },
      tax_category: def.taxCategory,
    }

    if (def.pwyw) {
      ;(body.pricing as any).pwyw_enabled = true
      if (def.pwywMinCents !== undefined) {
        ;(body.pricing as any).pwyw_min_amount = def.pwywMinCents
      }
      if (def.pwywMaxCents !== undefined) {
        ;(body.pricing as any).pwyw_max_amount = def.pwywMaxCents
      }
      if (def.pwywSuggestedCents !== undefined) {
        ;(body.pricing as any).pwyw_suggested_amount = def.pwywSuggestedCents
      }
    }

    console.log(`  Creating: ${def.name}...`)

    const res = await fetch(`${BASE_URL}/v1/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error(`  ❌ Failed (${res.status}):`, JSON.stringify(data, null, 2))
      return null
    }

    const id = data.id || data.data?.id
    const url = data.url || data.checkout_url || data.storefront_url || ''
    console.log(`  ✅ Created: ${def.name} (ID: ${id})`)
    return { id, name: def.name, url }
  } catch (err: any) {
    console.error(`  ❌ Error: ${err.message}`)
    return null
  }
}

async function main() {
  console.log('🚀 Dodo Payments — Product Creation (Test Mode)')
  console.log('='.repeat(60))

  const allProducts = [...freeResources, ...paidBoilerplates]
  const created: Array<{ id: string; name: string; url: string }> = []

  for (const def of allProducts) {
    const result = await createProduct(def)
    if (result) created.push(result)
    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500))
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ Created ${created.length}/${allProducts.length} products`)

  if (created.length > 0) {
    console.log('\n📋 Product IDs:')
    for (const p of created) {
      console.log(`   ${p.name}: ${p.id}`)
    }
  }
}

main().catch(console.error)
