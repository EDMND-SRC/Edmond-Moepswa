import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import { getDodoEnvironment } from '@/utilities/getDodoEnvironment'
export const revalidate = 60 // Revalidate every 60 seconds

interface DodoProductAPI {
  id: string
  name: string
  description: string | null
  image_url: string | null
  tax_category: string
  pricing: {
    amount: number
    currency: string
    type: 'one_time' | 'subscription'
    pwyw_enabled?: boolean
    pwyw_min_amount?: number
    pwyw_suggested_amount?: number
  }
}

interface DodoListResponse {
  items: DodoProductAPI[]
  data?: DodoProductAPI[] // fallback for older SDK versions
}

export async function GET() {
  try {
    const client = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY || '',
      environment: getDodoEnvironment(),
    })

    // Fetch all products (max limit 100 for Dodo)
    const response = (await client.products.list({ page_size: 100 })) as unknown as DodoListResponse

    // Transform products for the storefront
    const items = response.items || response.data || []
    
    if (!Array.isArray(items)) {
      throw new Error('Invalid items response from Dodo Payments')
    }

    const transformed = items.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description || '',
      priceCents: p.pricing?.amount || 0,
      currency: p.pricing?.currency?.toUpperCase() || 'USD',
      type: p.pricing?.type || 'one_time',
      pwywEnabled: p.pricing?.pwyw_enabled || false,
      pwywMinCents: p.pricing?.pwyw_min_amount || 0,
      pwywSuggestedCents: p.pricing?.pwyw_suggested_amount || 0,
      imageUrl: p.image_url || null,
      taxCategory: p.tax_category || '',
    }))

    return NextResponse.json({ products: transformed })
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number }
    console.error('Failed to fetch products:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to fetch products' },
      { status: err.status || 500 },
    )
  }
}
