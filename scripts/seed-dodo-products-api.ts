/**
 * Creates all 12 products in Dodo Payments via SDK.
 *
 * Free resources: PWYW with $0 suggested
 * Paid boilerplates: Fixed pricing
 *
 * Usage: DODO_PAYMENTS_API_KEY="..." DODO_PAYMENTS_ENVIRONMENT=test npx tsx scripts/seed-dodo-products-api.ts
 */

import DodoPayments from 'dodopayments'

const API_KEY =
  process.env.DODO_PAYMENTS_API_KEY ||
  'i2C7srYd2mlUpXtJ.nSef762JdjKvNHHjT2lAH_oKQH7GrAU6tHsHcpF6Epf8O7dW'
const ENV = process.env.DODO_PAYMENTS_ENVIRONMENT || 'test'
const ENV_MODE = ENV === 'test' ? 'test_mode' : 'live_mode'

const client = new DodoPayments({
  bearerToken: API_KEY,
  environment: ENV_MODE,
})

function oneTimePrice(cents, pwyw = false, suggested = null) {
  return {
    type: 'one_time_price',
    price: cents,
    discount: 0,
    purchasing_power_parity: false,
    currency: 'USD',
    ...(pwyw && {
      pay_what_you_want: true,
      suggested_price: suggested,
    }),
  }
}

const products = [
  // FREE RESOURCES (PWYW)
  {
    name: '5 Signs Your Website Is Costing You Clients',
    description:
      'Discover the 5 most common website mistakes that silently drive potential clients away — and how to fix them fast.',
    price: oneTimePrice(0, true, 500),
    tax_category: 'e_book',
  },
  {
    name: 'Website Launch Checklist',
    description:
      'A complete pre-launch checklist to ensure your website goes live without bugs, missing pages, or embarrassing errors.',
    price: oneTimePrice(0, true, 500),
    tax_category: 'digital_products',
  },
  {
    name: 'How to Brief a Web Designer',
    description:
      'Write a clear web design brief that saves you time, money, and endless back-and-forth with your designer.',
    price: oneTimePrice(0, true, 500),
    tax_category: 'e_book',
  },
  // PAID BOILERPLATES
  {
    name: 'Artisan & Craftmaker Portfolio',
    description:
      'Visual-first portfolio for artisans. Next.js + Tailwind CSS, gallery layouts, process storytelling, inquiry forms.',
    price: oneTimePrice(4999),
    tax_category: 'digital_products',
  },
  {
    name: 'Professional Services Firm',
    description:
      'Complete website for professional services. Service pages, team profiles, client onboarding forms, SEO optimization.',
    price: oneTimePrice(5599),
    tax_category: 'digital_products',
  },
  {
    name: 'Food & Hospitality',
    description:
      'Restaurant and hospitality website with menu management, reservation system, and online ordering integration.',
    price: oneTimePrice(5999),
    tax_category: 'digital_products',
  },
  {
    name: 'Health & Wellness',
    description:
      'Accessible, calming design for health practitioners. Booking system integration and client resources.',
    price: oneTimePrice(4999),
    tax_category: 'digital_products',
  },
  {
    name: 'Events & Experiences',
    description:
      'Event-focused website with calendar, ticketing integration, countdown CTAs, and social sharing.',
    price: oneTimePrice(3999),
    tax_category: 'digital_products',
  },
  {
    name: 'E-commerce',
    description:
      'Full online store with product variants, cart, checkout, and order management. Supports DPO PayGate, Orange Money, and Dodo Payments.',
    price: oneTimePrice(6999),
    tax_category: 'digital_products',
  },
  {
    name: 'NGO / Non-Profit',
    description:
      'Impact-focused nonprofit website with donation integration, volunteer signups, and newsletter integration.',
    price: oneTimePrice(4399),
    tax_category: 'digital_products',
  },
  {
    name: 'Financial Services',
    description:
      'Trust-building financial services website with client portal, compliance pages, and lead qualification forms.',
    price: oneTimePrice(5999),
    tax_category: 'digital_products',
  },
  {
    name: 'SaaS Starter',
    description:
      'Complete SaaS starter with authentication, role-based access, subscription billing, admin dashboard, and analytics.',
    price: oneTimePrice(9999),
    tax_category: 'digital_products',
  },
]

async function main() {
  console.log(`🚀 Dodo Payments — Product Creation (${ENV_MODE})`)
  console.log('='.repeat(60))

  const created = []

  for (const p of products) {
    try {
      console.log(`  Creating: ${p.name}...`)
      const result = await client.products.create(p)
      created.push({ id: result.product_id, name: result.name })
      console.log(`  ✅ ${result.name} → ${result.product_id}`)
    } catch (e) {
      console.error(`  ❌ ${p.name}: ${e.message || JSON.stringify(e)}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ Created ${created.length}/${products.length} products`)

  if (created.length > 0) {
    console.log('\n📋 Product IDs (for reference):')
    for (const c of created) {
      console.log(`   ${c.name}: ${c.id}`)
    }
    console.log('\n📋 Copy these IDs to update ResourceCards.tsx dodoProductId fields')
  }
}

main().catch(console.error)
