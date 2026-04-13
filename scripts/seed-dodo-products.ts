/**
 * Script to create products in Dodo Payments (Test Mode)
 *
 * This script creates:
 * 1. Free Resources (3 products - currently on Gumroad)
 * 2. Paid Boilerplate Products (from the store page)
 *
 * Usage:
 *   npx tsx seed-dodo-products.ts
 */

import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: 'test_mode', // Use test mode indefinitely until satisfied with website
})

interface ProductToCreate {
  name: string
  description: string
  type: 'one_time' | 'subscription'
  price?: number // in cents (e.g., 2500 = $25.00)
  currency?: string
  tax_category?: 'digital_products' | 'saas' | 'e_book' | 'edtech'
}

// Free Resources (currently on Gumroad)
const freeResources: ProductToCreate[] = [
  {
    name: '5 Signs Your Website Is Costing You Clients',
    description:
      'Discover the 5 most common website mistakes that silently drive potential clients away — and how to fix them fast.',
    type: 'one_time',
    price: 0, // Free
    currency: 'USD',
    tax_category: 'e_book',
  },
  {
    name: 'Website Launch Checklist',
    description:
      'A complete pre-launch checklist to ensure your website goes live without bugs, missing pages, or embarrassing errors.',
    type: 'one_time',
    price: 0, // Free
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'How to Brief a Web Designer',
    description:
      'Write a clear web design brief that saves you time, money, and endless back-and-forth with your designer.',
    type: 'one_time',
    price: 0, // Free
    currency: 'USD',
    tax_category: 'e_book',
  },
]

// Paid Boilerplate Products (from store page)
const paidBoilerplates: ProductToCreate[] = [
  {
    name: 'Artisan & Craftmaker Portfolio Boilerplate',
    description:
      'Visual-first portfolio for artisans and craftmakers. Built with Next.js + Tailwind CSS. Includes gallery layouts, process storytelling, and inquiry forms.',
    type: 'one_time',
    price: 4999, // ~P25,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'Professional Services Firm Boilerplate',
    description:
      'Complete website for professional services. Includes service pages, team profiles, client onboarding forms, and SEO optimization.',
    type: 'one_time',
    price: 5599, // ~P28,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'Food & Hospitality Boilerplate',
    description:
      'Restaurant and hospitality website with menu management, reservation system, and online ordering integration.',
    type: 'one_time',
    price: 5999, // ~P30,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'Health & Wellness Boilerplate',
    description:
      'Accessible, calming design for health practitioners. Includes booking system integration and client resources.',
    type: 'one_time',
    price: 4999, // ~P25,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'Events & Experiences Boilerplate',
    description:
      'Event-focused website with calendar, ticketing integration, countdown CTAs, and social sharing.',
    type: 'one_time',
    price: 3999, // ~P20,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'E-commerce Boilerplate',
    description:
      'Full online store with product variants, cart, checkout, and order management. Supports DPO PayGate, Orange Money, and Dodo Payments.',
    type: 'one_time',
    price: 6999, // ~P35,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'NGO / Non-Profit Boilerplate',
    description:
      'Impact-focused nonprofit website with donation integration, volunteer signups, and newsletter integration.',
    type: 'one_time',
    price: 4399, // ~P22,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'Financial Services Boilerplate',
    description:
      'Trust-building financial services website with client portal, compliance pages, and lead qualification forms.',
    type: 'one_time',
    price: 5999, // ~P30,000 equivalent
    currency: 'USD',
    tax_category: 'digital_products',
  },
  {
    name: 'SaaS Starter Boilerplate',
    description:
      'Complete SaaS starter with authentication, role-based access, subscription billing, admin dashboard, and analytics.',
    type: 'one_time',
    price: 9999, // Premium boilerplate
    currency: 'USD',
    tax_category: 'saas',
  },
]

async function createProducts(products: ProductToCreate[]) {
  const createdProducts: Array<{ id: string; name: string }> = []

  for (const product of products) {
    try {
      console.log(`Creating product: ${product.name}...`)

      const created = await client.products.create({
        name: product.name,
        description: product.description,
        // @ts-expect-error - SDK types may differ from actual API
        pricing: {
          mode: product.type === 'subscription' ? 'recurring' : 'one_time',
          amount: product.price || 0,
          currency: product.currency || 'USD',
        },
        tax_category: product.tax_category || 'digital_products',
        status: 'active',
      } as any)

      createdProducts.push({ id: created.id, name: created.name })
      console.log(`✅ Created: ${product.name} (ID: ${created.id})`)
    } catch (error: any) {
      console.error(`❌ Failed to create "${product.name}":`, error.message || error)
    }
  }

  return createdProducts
}

async function main() {
  console.log('🚀 Starting Dodo Payments Product Creation (Test Mode)...')
  console.log('='.repeat(60))

  // Check API key
  if (!process.env.DODO_PAYMENTS_API_KEY) {
    console.error('❌ DODO_PAYMENTS_API_KEY not set in environment')
    process.exit(1)
  }

  console.log('\n📦 Creating Free Resources...')
  const freeProducts = await createProducts(freeResources)

  console.log('\n💰 Creating Paid Boilerplate Products...')
  const paidProducts = await createProducts(paidBoilerplates)

  console.log('\n' + '='.repeat(60))
  console.log('✅ Product Creation Complete!')
  console.log(`\n📊 Summary:`)
  console.log(`   Free resources created: ${freeProducts.length}/${freeResources.length}`)
  console.log(`   Paid products created: ${paidProducts.length}/${paidBoilerplates.length}`)
  console.log(`   Total: ${freeProducts.length + paidProducts.length} products`)

  // Print product IDs for reference
  console.log('\n📋 Product IDs (save these for env vars):')
  ;[...freeProducts, ...paidProducts].forEach((p) => {
    console.log(`   ${p.name}: ${p.id}`)
  })

  console.log('\n💡 Next steps:')
  console.log('   1. Go to Dodo Dashboard → Products → verify products')
  console.log('   2. Configure Storefront → select products to display')
  console.log('   3. Set up Product Collections (via Dashboard)')
  console.log('   4. Configure webhooks (Dashboard → Developer → Webhooks)')
  console.log('   5. Update .env.local with DODO_PAYMENTS_STORE_ID')
}

main().catch(console.error)
