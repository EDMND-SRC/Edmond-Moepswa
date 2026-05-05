import { NextRequest } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { POST } from '@/app/(frontend)/api/quote-pdf/route'

const validSelections = {
  addons: [{ id: 'copywriting', name: 'Copywriting support', priceBWP: 1200, qty: 1 }],
  addonsSubtotalBWP: 1200,
  currency: 'BWP',
  delivery: 'priority',
  deliveryCostBWP: 1400,
  deliveryLabel: 'Priority',
  deliveryMultiplier: 0.2,
  estimatedTotalBWP: 7900,
  formattedBase: 'P5,800',
  formattedTotal: 'P7,900',
  service: 'web-design',
  serviceLabel: 'Web Design',
  staticDiscount: true,
  staticDiscountBWP: 500,
  tier: 'growth',
  tierLabel: 'Growth',
  tierPriceBWP: 5800,
}

describe('quote-pdf route', () => {
  it('returns a valid Edmond Moepswa PDF quote', async () => {
    const request = new NextRequest('http://localhost/api/quote-pdf', {
      body: JSON.stringify({
        client: {
          email: 'client@example.com',
          name: 'Client Name',
        },
        notes: 'Need launch support and copy feedback.',
        scopeTags: ['existing-redesign', 'ongoing-support'],
        selections: validSelections,
      }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/pdf')
    expect(response.headers.get('content-disposition')).toContain('edmond-quote-')

    const bytes = new Uint8Array(await response.arrayBuffer())
    expect(Buffer.from(bytes.subarray(0, 4)).toString('utf8')).toBe('%PDF')

    const pdfDoc = await PDFDocument.load(bytes)
    expect(pdfDoc.getPageCount()).toBeGreaterThan(0)
  })

  it('rejects invalid payloads', async () => {
    const request = new NextRequest('http://localhost/api/quote-pdf', {
      body: JSON.stringify({ selections: { service: 'web-design' } }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })
})
