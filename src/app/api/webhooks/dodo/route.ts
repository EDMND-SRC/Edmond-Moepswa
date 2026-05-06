import { NextResponse } from 'next/server'
import {
  mirrorDodoLead,
  updateOrderStatusByPaymentId,
  updateOrderStatusBySubscriptionId,
  upsertOrder,
} from '@/lib/server/app-persistence'
import { reportServerError } from '@/lib/server/report-server-error'

type DodoCustomer = {
  email?: string
  name?: string
}

type DodoPaymentEvent = {
  amount?: number
  currency?: string
  customer?: DodoCustomer
  failure_reason?: string
  id: string
  product_id?: string
  product_name?: string
}

type DodoSubscriptionEvent = {
  customer?: DodoCustomer
  customer_id?: string
  id: string
  product_id?: string
}

type DodoRefundEvent = {
  amount?: number
  id: string
  payment_id: string
}

type ParsedDodoEvent = {
  data: Record<string, unknown>
  type: string
}

async function verifyWebhook(payload: string, signature: string, secret: string) {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const data = encoder.encode(payload)

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, data)
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')

  if (signature.length !== expectedSignature.length) {
    return false
  }

  let result = 0
  for (let index = 0; index < signature.length; index += 1) {
    result |= signature.charCodeAt(index) ^ expectedSignature.charCodeAt(index)
  }

  return result === 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function parseEvent(value: unknown): ParsedDodoEvent | null {
  if (!isRecord(value) || typeof value.type !== 'string' || !isRecord(value.data)) {
    return null
  }

  return {
    data: value.data,
    type: value.type,
  }
}

function parsePaymentEvent(event: ParsedDodoEvent): DodoPaymentEvent | null {
  const id = typeof event.data.id === 'string' ? event.data.id : null

  if (!id) {
    return null
  }

  const customer = isRecord(event.data.customer)
    ? {
        email: typeof event.data.customer.email === 'string' ? event.data.customer.email : undefined,
        name: typeof event.data.customer.name === 'string' ? event.data.customer.name : undefined,
      }
    : undefined

  return {
    amount: typeof event.data.amount === 'number' ? event.data.amount : undefined,
    currency: typeof event.data.currency === 'string' ? event.data.currency : undefined,
    customer,
    failure_reason:
      typeof event.data.failure_reason === 'string' ? event.data.failure_reason : undefined,
    id,
    product_id: typeof event.data.product_id === 'string' ? event.data.product_id : undefined,
    product_name:
      typeof event.data.product_name === 'string' ? event.data.product_name : undefined,
  }
}

function parseSubscriptionEvent(event: ParsedDodoEvent): DodoSubscriptionEvent | null {
  const id = typeof event.data.id === 'string' ? event.data.id : null

  if (!id) {
    return null
  }

  const customer = isRecord(event.data.customer)
    ? {
        email: typeof event.data.customer.email === 'string' ? event.data.customer.email : undefined,
        name: typeof event.data.customer.name === 'string' ? event.data.customer.name : undefined,
      }
    : undefined

  return {
    customer,
    customer_id: typeof event.data.customer_id === 'string' ? event.data.customer_id : undefined,
    id,
    product_id: typeof event.data.product_id === 'string' ? event.data.product_id : undefined,
  }
}

function parseRefundEvent(event: ParsedDodoEvent): DodoRefundEvent | null {
  const id = typeof event.data.id === 'string' ? event.data.id : null
  const paymentId = typeof event.data.payment_id === 'string' ? event.data.payment_id : null

  if (!id || !paymentId) {
    return null
  }

  return {
    amount: typeof event.data.amount === 'number' ? event.data.amount : undefined,
    id,
    payment_id: paymentId,
  }
}

async function forwardToMake(event: ParsedDodoEvent) {
  const webhookUrl = process.env.MAKE_WEBHOOK_DODO_PAYMENTS

  if (!webhookUrl) {
    return
  }

  const customer = isRecord(event.data.customer)
    ? {
        email: typeof event.data.customer.email === 'string' ? event.data.customer.email : '',
        name: typeof event.data.customer.name === 'string' ? event.data.customer.name : '',
      }
    : { email: '', name: '' }

  const productName =
    typeof event.data.product_name === 'string'
      ? event.data.product_name
      : typeof event.data.product_id === 'string'
        ? event.data.product_id
        : 'Digital resource'

  const makePayload = {
    customer,
    eventType: event.type,
    product_cart: [{ name: productName }],
    rawEvent: event,
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(makePayload),
  })

  if (!response.ok) {
    throw new Error(`MAKE_WEBHOOK_DODO_PAYMENTS returned ${response.status}`)
  }
}

async function handlePaymentSucceeded(event: ParsedDodoEvent, payment: DodoPaymentEvent) {
  await upsertOrder({
    amount: typeof payment.amount === 'number' ? payment.amount / 100 : null,
    currency: payment.currency ?? null,
    customerEmail: payment.customer?.email || 'unknown@example.com',
    dodoPaymentId: payment.id,
    metadata: event,
    productId: payment.product_id ?? null,
    productName: payment.product_name ?? null,
    status: 'succeeded',
  })

  if (payment.customer?.email) {
    await mirrorDodoLead({
      email: payment.customer.email,
      eventType: event.type,
      metadata: event,
      name: payment.customer.name,
      productName: payment.product_name,
      status: typeof payment.amount === 'number' && payment.amount > 0 ? 'qualified' : 'new',
    })
  }
}

async function handlePaymentFailed(event: ParsedDodoEvent, payment: DodoPaymentEvent) {
  await upsertOrder({
    amount: typeof payment.amount === 'number' ? payment.amount / 100 : null,
    currency: payment.currency ?? null,
    customerEmail: payment.customer?.email || 'unknown@example.com',
    dodoPaymentId: payment.id,
    metadata: event,
    productId: payment.product_id ?? null,
    productName: payment.product_name ?? null,
    status: 'failed',
  })
}

async function handleSubscriptionActive(
  event: ParsedDodoEvent,
  subscription: DodoSubscriptionEvent,
) {
  await upsertOrder({
    customerEmail: subscription.customer?.email || 'unknown@example.com',
    dodoPaymentId: subscription.id,
    dodoSubscriptionId: subscription.id,
    metadata: event,
    productId: subscription.product_id ?? null,
    status: 'succeeded',
  })
}

async function handleSubscriptionCancelled(event: ParsedDodoEvent, subscription: DodoSubscriptionEvent) {
  await updateOrderStatusBySubscriptionId(subscription.id, 'cancelled', event)
}

async function handleRefundSucceeded(event: ParsedDodoEvent, refund: DodoRefundEvent) {
  await updateOrderStatusByPaymentId(refund.payment_id, 'refunded', event)
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-dodo-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing webhook signature' }, { status: 401 })
    }

    const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('DODO_PAYMENTS_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    if (!(await verifyWebhook(body, signature, webhookSecret))) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    const event = parseEvent(JSON.parse(body))

    if (!event) {
      return NextResponse.json({ error: 'Invalid Dodo payload' }, { status: 400 })
    }

    switch (event.type) {
      case 'payment.succeeded': {
        const payment = parsePaymentEvent(event)
        if (!payment) {
          return NextResponse.json({ error: 'Invalid Dodo payment payload' }, { status: 400 })
        }
        await handlePaymentSucceeded(event, payment)
        break
      }
      case 'payment.failed': {
        const payment = parsePaymentEvent(event)
        if (!payment) {
          return NextResponse.json({ error: 'Invalid Dodo payment payload' }, { status: 400 })
        }
        await handlePaymentFailed(event, payment)
        break
      }
      case 'subscription.active': {
        const subscription = parseSubscriptionEvent(event)
        if (!subscription) {
          return NextResponse.json(
            { error: 'Invalid Dodo subscription payload' },
            { status: 400 },
          )
        }
        await handleSubscriptionActive(event, subscription)
        break
      }
      case 'subscription.cancelled': {
        const subscription = parseSubscriptionEvent(event)
        if (!subscription) {
          return NextResponse.json(
            { error: 'Invalid Dodo subscription payload' },
            { status: 400 },
          )
        }
        await handleSubscriptionCancelled(event, subscription)
        break
      }
      case 'refund.succeeded': {
        const refund = parseRefundEvent(event)
        if (!refund) {
          return NextResponse.json({ error: 'Invalid Dodo refund payload' }, { status: 400 })
        }
        await handleRefundSucceeded(event, refund)
        break
      }
      default:
        console.log('Unhandled Dodo event type:', event.type)
        break
    }

    await forwardToMake(event)

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Webhook handler failed'
    console.error('Webhook handler error:', error)
    reportServerError(error, { feature: 'dodo-webhook' })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
