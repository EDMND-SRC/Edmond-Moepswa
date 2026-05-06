import { createHmac } from 'node:crypto'
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const persistenceMocks = vi.hoisted(() => ({
  mirrorDodoLead: vi.fn(),
  persistCalculatorLead: vi.fn(),
  persistContactLead: vi.fn(),
  updateOrderStatusByPaymentId: vi.fn(),
  updateOrderStatusBySubscriptionId: vi.fn(),
  upsertOrder: vi.fn(),
}))

vi.mock('@/lib/server/app-persistence', () => persistenceMocks)

import { POST as postMakeWebhook } from '@/app/(frontend)/api/make-webhook/route'
import { POST as postCalWebhook } from '@/app/api/cal-webhook/route'
import { POST as postDodoWebhook } from '@/app/api/webhooks/dodo/route'

describe('Automation routes', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset().mockResolvedValue(new Response(null, { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    persistenceMocks.mirrorDodoLead.mockReset().mockResolvedValue(undefined)
    persistenceMocks.persistCalculatorLead.mockReset().mockResolvedValue(undefined)
    persistenceMocks.persistContactLead.mockReset().mockResolvedValue(undefined)
    persistenceMocks.updateOrderStatusByPaymentId.mockReset().mockResolvedValue(undefined)
    persistenceMocks.updateOrderStatusBySubscriptionId.mockReset().mockResolvedValue(undefined)
    persistenceMocks.upsertOrder.mockReset().mockResolvedValue(undefined)

    process.env.CAL_WEBHOOK_URL = 'https://hook.make.com/cal'
    process.env.CRON_SECRET = 'launch-secret'
    process.env.DODO_PAYMENTS_WEBHOOK_SECRET = 'dodo-secret'
    process.env.MAKE_WEBHOOK_CALCULATOR_QUOTE = 'https://hook.make.com/calculator'
    process.env.MAKE_WEBHOOK_DODO_PAYMENTS = 'https://hook.make.com/dodo'
    process.env.MAKE_WEBHOOK_LEAD_CAPTURE = 'https://hook.make.com/lead'
  })

  it('accepts and persists public contact leads', async () => {
    const response = await postMakeWebhook(
      new NextRequest('http://localhost/api/make-webhook', {
        body: JSON.stringify({
          workflow: 'lead-capture',
          data: {
            budgetRange: 'P5,000 - P15,000',
            company: 'BridgeArc',
            email: 'lead@example.com',
            message: 'Need a redesign.',
            name: 'Lead User',
            projectType: 'Website Design',
            source: 'contact-page-form',
            timestamp: '2026-05-05T10:00:00.000Z',
          },
        }),
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '1.1.1.1',
        },
        method: 'POST',
      }),
    )

    expect(response.status).toBe(200)
    expect(persistenceMocks.persistContactLead).toHaveBeenCalledWith({
      budgetRange: 'P5,000 - P15,000',
      company: 'BridgeArc',
      email: 'lead@example.com',
      message: 'Need a redesign.',
      name: 'Lead User',
      projectType: 'Website Design',
      sourceContext: 'contact-page-form',
      timestamp: '2026-05-05T10:00:00.000Z',
    })
    expect(fetchMock).toHaveBeenCalledWith(
      'https://hook.make.com/lead',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('accepts calculator quote submissions without auth', async () => {
    const response = await postMakeWebhook(
      new NextRequest('http://localhost/api/make-webhook', {
        body: JSON.stringify({
          workflow: 'calculator-quote',
          data: {
            currency: 'BWP',
            email: 'quote@example.com',
            estimatedTotalBWP: 7900,
            name: 'Quote User',
            phone: '+26712345678',
            scopeTags: ['existing-redesign'],
            service: 'web-design',
            tier: 'growth',
            tierPriceBWP: 5800,
            timestamp: '2026-05-05T10:05:00.000Z',
          },
        }),
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '1.1.1.2',
        },
        method: 'POST',
      }),
    )

    expect(response.status).toBe(200)
    expect(persistenceMocks.persistCalculatorLead).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'quote@example.com',
        estimatedTotalBWP: 7900,
        phone: '+26712345678',
        service: 'web-design',
        tier: 'growth',
      }),
    )
    expect(fetchMock).toHaveBeenCalledWith(
      'https://hook.make.com/calculator',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('forwards cal.com bookings through the server-side route', async () => {
    const response = await postCalWebhook(
      new NextRequest('http://localhost/api/cal-webhook', {
        body: JSON.stringify({
          attendees: [{ email: 'booked@example.com', name: 'Booked User' }],
          eventType: 'Discovery Call',
          startTime: '2026-05-05T11:00:00.000Z',
          title: 'Discovery Call',
        }),
        headers: {
          authorization: 'Bearer launch-secret',
          'content-type': 'application/json',
          'x-forwarded-for': '1.1.1.3',
        },
        method: 'POST',
      }),
    )

    expect(response.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://hook.make.com/cal',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('persists and forwards verified Dodo payment events', async () => {
    const event = {
      type: 'payment.succeeded',
      data: {
        id: 'pay_123',
        amount: 790000,
        currency: 'BWP',
        customer: {
          email: 'buyer@example.com',
          name: 'Buyer',
        },
        product_id: 'pdt_123',
        product_name: 'Website Launch Checklist',
      },
    }
    const body = JSON.stringify(event)
    const signature = createHmac('sha256', 'dodo-secret').update(body).digest('hex')

    const response = await postDodoWebhook(
      new Request('http://localhost/api/webhooks/dodo', {
        body,
        headers: {
          'content-type': 'application/json',
          'x-dodo-signature': signature,
        },
        method: 'POST',
      }),
    )

    expect(response.status).toBe(200)
    expect(persistenceMocks.upsertOrder).toHaveBeenCalledWith({
      amount: 7900,
      currency: 'BWP',
      customerEmail: 'buyer@example.com',
      dodoPaymentId: 'pay_123',
      metadata: event,
      productId: 'pdt_123',
      productName: 'Website Launch Checklist',
      status: 'succeeded',
    })
    expect(persistenceMocks.mirrorDodoLead).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'buyer@example.com',
        eventType: 'payment.succeeded',
        name: 'Buyer',
        productName: 'Website Launch Checklist',
        status: 'qualified',
      }),
    )
    expect(fetchMock).toHaveBeenCalledWith(
      'https://hook.make.com/dodo',
      expect.objectContaining({ method: 'POST' }),
    )
  })
})
