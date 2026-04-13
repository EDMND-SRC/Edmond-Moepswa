import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: 'test_mode',
})

export async function POST(req: Request) {
  try {
    const { productId, customerEmail, amount } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 })
    }

    const cartItem: { product_id: string; quantity: number; amount?: number } = {
      product_id: productId,
      quantity: 1,
    }

    // For PWYW products, include the amount if specified
    if (amount !== undefined && amount !== null) {
      cartItem.amount = amount
    }

    const session: any = await client.checkoutSessions.create({
      product_cart: [cartItem],
      customer: customerEmail ? { email: customerEmail } : undefined,
      return_url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://edmond-moepswa.vercel.app'}/store/success`,
    } as any)

    return NextResponse.json({ url: session.url || session.checkout_url })
  } catch (error: any) {
    console.error('Checkout session creation failed:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create checkout session' },
      { status: error?.status || 500 },
    )
  }
}
