import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Dodo Payments Webhook Handler
 * 
 * Handles real-time payment events from Dodo Payments.
 * Verifies webhook signatures to ensure authenticity.
 */

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-dodo-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 401 }
      )
    }

    const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('DODO_PAYMENTS_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    if (!verifyWebhook(body, signature, webhookSecret)) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    const event = JSON.parse(body)

    console.log('Dodo webhook event received:', event.type)

    switch (event.type) {
      case 'payment.succeeded': {
        const payment = event.data
        console.log('Payment succeeded:', {
          paymentId: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          customerEmail: payment.customer?.email,
          productId: payment.product_id,
        })
        // TODO: Fulfill order, grant access to digital product
        break
      }

      case 'payment.failed': {
        const payment = event.data
        console.log('Payment failed:', {
          paymentId: payment.id,
          reason: payment.failure_reason,
          customerEmail: payment.customer?.email,
        })
        break
      }

      case 'subscription.active': {
        const subscription = event.data
        console.log('Subscription activated:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer_id,
          productId: subscription.product_id,
        })
        // TODO: Activate subscription in your system
        break
      }

      case 'subscription.cancelled': {
        const subscription = event.data
        console.log('Subscription cancelled:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer_id,
        })
        // TODO: Downgrade user access
        break
      }

      case 'refund.succeeded': {
        const refund = event.data
        console.log('Refund processed:', {
          refundId: refund.id,
          amount: refund.amount,
          paymentId: refund.payment_id,
        })
        // TODO: Revoke access, update records
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: error?.message || 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
