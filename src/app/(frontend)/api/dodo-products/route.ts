import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode') || 'test_mode',
})

export async function GET() {
  try {
    const products = await client.products.list({ limit: 50 } as any)

    const data = (products as any).data || []
    const activeProducts = data.filter((p: any) => p.is_active !== false)

    return NextResponse.json({ products: activeProducts })
  } catch (error) {
    console.error('Failed to fetch Dodo products:', error)
    return NextResponse.json({ error: 'Failed to fetch products', products: [] }, { status: 500 })
  }
}
