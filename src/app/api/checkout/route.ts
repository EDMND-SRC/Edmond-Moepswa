import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import { getDodoEnvironment } from '@/utilities/getDodoEnvironment'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: getDodoEnvironment(),
})

interface CheckoutRequest {
  productId: string
  customerEmail?: string
  amount?: number
}

export async function POST(req: Request) {
  try {
    const { productId, customerEmail, amount }: CheckoutRequest = await req.json()

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

    const returnURL = new URL('/resources/success', req.url).toString()

    const session = await client.checkoutSessions.create({
      product_cart: [cartItem],
      customer: customerEmail ? { email: customerEmail } : undefined,
      return_url: returnURL,
    })

    return NextResponse.json({ url: session.checkout_url })
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number }
    console.error('Checkout session creation failed:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to create checkout session' },
      { status: err.status || 500 },
    )
  }
}
