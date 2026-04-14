import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'test' ? 'test_mode' : 'live_mode',
})

export const revalidate = 60 // Revalidate every 60 seconds

export async function GET() {
  try {
    const response: any = await client.products.list({ limit: 50 } as any)

    // Transform products for the storefront
    const transformed = (response.data || []).map((p: any) => ({
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
  } catch (error: any) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch products' },
      { status: error?.status || 500 },
    )
  }
}
