import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { launchSnapshotUpdatedAt } from '@/content/launchSnapshot'

const pgMocks = vi.hoisted(() => ({
  connect: vi.fn(),
  end: vi.fn(),
  query: vi.fn(),
}))

vi.mock('pg', () => {
  class MockClient {
    connect = pgMocks.connect
    end = pgMocks.end
    query = pgMocks.query
  }

  return {
    default: {
      Client: MockClient,
    },
  }
})

import { GET as getFaqs } from '@/app/(frontend)/api/faqs/route'
import { GET as getPages } from '@/app/(frontend)/api/pages/route'
import { GET as getProjects } from '@/app/(frontend)/api/projects/route'
import { POST as getQuotePdf } from '@/app/(frontend)/api/quote-pdf/route'
import { GET as getServices } from '@/app/(frontend)/api/services/route'
import { GET as getTestimonials } from '@/app/(frontend)/api/testimonials/route'
import { GET as getExitPreview } from '@/app/(frontend)/next/exit-preview/route'
import { GET as getPreview } from '@/app/(frontend)/next/preview/route'

describe('Public launch integration routes', () => {
  beforeEach(() => {
    pgMocks.connect.mockReset().mockResolvedValue(undefined)
    pgMocks.end.mockReset().mockResolvedValue(undefined)
    pgMocks.query.mockReset()
  })

  it('returns launch pages in the expected paginated shape', async () => {
    const response = await getPages(new NextRequest('http://localhost/api/pages?limit=5'))
    const body = (await response.json()) as {
      docs: unknown[]
      limit: number
      totalDocs: number
      totalPages: number
    }

    expect(response.status).toBe(200)
    expect(body).toMatchObject({
      docs: [],
      limit: 5,
      totalDocs: 0,
      totalPages: 0,
    })
  })

  it('returns typed launch services without hitting Payload', async () => {
    const response = await getServices()
    const body = (await response.json()) as {
      services: Array<{ id: string; pricingTiers: unknown[]; title: string }>
    }

    expect(response.status).toBe(200)
    expect(body.services.length).toBeGreaterThan(0)
    expect(body.services[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
    })
    expect(Array.isArray(body.services[0]?.pricingTiers)).toBe(true)
  })

  it('returns launch testimonials with snapshot timestamps', async () => {
    const response = await getTestimonials()
    const body = (await response.json()) as {
      testimonials: Array<{ clientName: string; rating: number; updatedAt: string }>
    }

    expect(response.status).toBe(200)
    expect(body.testimonials.length).toBeGreaterThan(0)
    expect(body.testimonials[0]).toMatchObject({
      clientName: expect.any(String),
      rating: expect.any(Number),
      updatedAt: launchSnapshotUpdatedAt,
    })
  })

  it('returns normalized FAQs from the direct SQL path', async () => {
    pgMocks.query.mockResolvedValueOnce({
      rows: [
        {
          answer: 'Answer',
          category: 'general',
          id: 1,
          is_active: true,
          order: 2,
          question: 'Question',
        },
      ],
    })

    const response = await getFaqs()
    const body = (await response.json()) as {
      faqs: Array<{
        answer: string
        category: string
        id: number
        isActive: boolean
        order: number
        question: string
      }>
    }

    expect(response.status).toBe(200)
    expect(pgMocks.connect).toHaveBeenCalledTimes(1)
    expect(pgMocks.end).toHaveBeenCalledTimes(1)
    expect(body.faqs).toEqual([
      {
        answer: 'Answer',
        category: 'general',
        id: 1,
        isActive: true,
        order: 2,
        question: 'Question',
      },
    ])
  })

  it('returns normalized projects with media joins from the direct SQL path', async () => {
    pgMocks.query
      .mockResolvedValueOnce({
        rows: [
          {
            category: 'websites',
            description: 'Project summary',
            id: 7,
            link: 'https://example.com',
            thumbnail_id: 19,
            title: 'Project Launch',
            year: '2026',
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            alt: 'Preview image',
            height: 900,
            id: 19,
            mime_type: 'image/jpeg',
            updated_at: '2026-05-04T00:00:00.000Z',
            url: '/media/preview.jpg',
            width: 1600,
          },
        ],
      })

    const response = await getProjects(
      new NextRequest('http://localhost/api/projects?category=websites&limit=3'),
    )
    const body = (await response.json()) as {
      docs: Array<{
        category: string
        description: string
        id: number
        link: string
        thumbnail: {
          alt: string
          height: number
          mimeType: string
          updatedAt: string
          url: string
          width: number
        } | null
        title: string
        year: string
      }>
    }

    expect(response.status).toBe(200)
    expect(pgMocks.query).toHaveBeenCalledTimes(2)
    expect(body.docs).toEqual([
      {
        category: 'websites',
        description: 'Project summary',
        id: 7,
        link: 'https://example.com',
        thumbnail: {
          alt: 'Preview image',
          height: 900,
          mimeType: 'image/jpeg',
          updatedAt: '2026-05-04T00:00:00.000Z',
          url: '/media/preview.jpg',
          width: 1600,
        },
        title: 'Project Launch',
        year: '2026',
      },
    ])
  })

  it('keeps preview routes disabled in the launch build', async () => {
    const previewResponse = await getPreview()
    const exitPreviewResponse = await getExitPreview()

    expect(previewResponse.status).toBe(404)
    expect(await previewResponse.text()).toContain('disabled for this launch build')
    expect(exitPreviewResponse.status).toBe(404)
    expect(await exitPreviewResponse.text()).toContain('disabled for this launch build')
  })

  it('returns a PDF quote from the public route', async () => {
    const response = await getQuotePdf(
      new NextRequest('http://localhost/api/quote-pdf', {
        body: JSON.stringify({
          notes: 'Need launch support and copy feedback.',
          scopeTags: ['existing-redesign'],
          selections: {
            addons: [],
            addonsSubtotalBWP: 0,
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
          },
        }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/pdf')
    expect(response.headers.get('content-disposition')).toContain('edmond-quote-web-design-growth.pdf')
  })
})
