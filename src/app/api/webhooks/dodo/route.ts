import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'


/**
 * Dodo Payments Webhook Handler
 * 
 * Handles real-time payment events from Dodo Payments.
 * Verifies webhook signatures to ensure authenticity.
 */

async function verifyWebhook(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const data = encoder.encode(payload)

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, data)
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  // Constant-time comparison
  if (signature.length !== expectedSignature.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < signature.length; i++) {
    result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i)
  }
  return result === 0
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

    if (!(await verifyWebhook(body, signature, webhookSecret))) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    const event = JSON.parse(body)
    const payload = await getPayload({ config })

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
        
        // Create Order record
        await payload.create({
          collection: 'orders',
          data: {
            dodoPaymentId: payment.id,
            customerEmail: payment.customer?.email || 'unknown',
            productName: payment.product_name,
            productId: payment.product_id,
            amount: payment.amount / 100, // Convert cents to base unit
            currency: payment.currency,
            status: 'succeeded',
            metadata: event,
          },
        })

        // Capture as Lead if email is available
        if (payment.customer?.email) {
          try {
            const isPurchase = payment.amount > 0
            await payload.create({
              collection: 'leads',
              data: {
                email: payment.customer.email,
                name: payment.customer.name || '',
                source: 'contact', // Closest match in current select options
                message: `Dodo ${isPurchase ? 'Purchase' : 'Download'}: ${payment.product_name}`,
                status: isPurchase ? 'qualified' : 'new',
              },
            })
          } catch (leadError) {
            console.error('Failed to create lead from webhook:', leadError)
          }
        }
        break
      }

      case 'payment.failed': {
        const payment = event.data
        console.log('Payment failed:', {
          paymentId: payment.id,
          reason: payment.failure_reason,
          customerEmail: payment.customer?.email,
        })
        
        await payload.create({
          collection: 'orders',
          data: {
            dodoPaymentId: payment.id,
            customerEmail: payment.customer?.email || 'unknown',
            status: 'failed',
            metadata: event,
          },
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

        await payload.create({
          collection: 'orders',
          data: {
            dodoPaymentId: subscription.id, // Using subscription ID as fallback identifier
            dodoSubscriptionId: subscription.id,
            customerEmail: subscription.customer?.email || 'unknown',
            productId: subscription.product_id,
            status: 'succeeded',
            metadata: event,
          },
        })
        break
      }

      case 'subscription.cancelled': {
        const subscription = event.data
        console.log('Subscription cancelled:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer_id,
        })

        // Update existing order status if found
        const existing = await payload.find({
          collection: 'orders',
          where: {
            dodoSubscriptionId: { equals: subscription.id },
          },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'orders',
            id: existing.docs[0].id,
            data: { status: 'cancelled' },
          })
        }
        break
      }

      case 'refund.succeeded': {
        const refund = event.data
        console.log('Refund processed:', {
          refundId: refund.id,
          amount: refund.amount,
          paymentId: refund.payment_id,
        })

        // Update status of the original payment
        const existing = await payload.find({
          collection: 'orders',
          where: {
            dodoPaymentId: { equals: refund.payment_id },
          },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          await payload.update({
            collection: 'orders',
            id: existing.docs[0].id,
            data: { status: 'refunded' },
          })
        }
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    const err = error as { message?: string }
    console.error('Webhook handler error:', err)
    return NextResponse.json(
      { error: err.message || 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
