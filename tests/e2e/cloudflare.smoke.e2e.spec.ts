import { expect, test } from '@playwright/test'

const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000'

test.describe('Cloudflare smoke', () => {
  test.describe.configure({ mode: 'serial', timeout: 120_000 })
  test.skip(({ browserName }) => browserName !== 'chromium', 'Cloudflare smoke checks run once in Chromium')

  test('public APIs return launch content', async () => {
    const [pagesResponse, servicesResponse, testimonialsResponse, faqsResponse, projectsResponse] =
      await Promise.all([
        fetch(`${baseURL}/api/pages?limit=5`),
        fetch(`${baseURL}/api/services`),
        fetch(`${baseURL}/api/testimonials`),
        fetch(`${baseURL}/api/faqs`),
        fetch(`${baseURL}/api/projects?limit=3`),
      ])

    expect(pagesResponse.status).toBe(200)
    expect(servicesResponse.status).toBe(200)
    expect(testimonialsResponse.status).toBe(200)
    expect(faqsResponse.status).toBe(200)
    expect(projectsResponse.status).toBe(200)

    const pagesBody = (await pagesResponse.json()) as { docs: unknown[]; limit: number }
    const servicesBody = (await servicesResponse.json()) as {
      services: Array<{ id: string; pricingTiers: unknown[]; title: string }>
    }
    const testimonialsBody = (await testimonialsResponse.json()) as {
      testimonials: Array<{ clientName: string; rating: number }>
    }
    const faqsBody = (await faqsResponse.json()) as {
      faqs: Array<{ answer: string; question: string }>
    }
    const projectsBody = (await projectsResponse.json()) as {
      docs: Array<{
        id: number
        link?: string | null
        thumbnail?: { url?: string | null } | null
        title: string
      }>
    }

    expect(Array.isArray(pagesBody.docs)).toBe(true)
    expect(pagesBody.limit).toBe(5)
    expect(servicesBody.services.length).toBeGreaterThan(0)
    expect(servicesBody.services[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
    })
    expect(Array.isArray(servicesBody.services[0]?.pricingTiers)).toBe(true)
    expect(testimonialsBody.testimonials.length).toBeGreaterThan(0)
    expect(testimonialsBody.testimonials[0]).toMatchObject({
      clientName: expect.any(String),
      rating: expect.any(Number),
    })
    expect(faqsBody.faqs.length).toBeGreaterThan(0)
    expect(faqsBody.faqs[0]).toMatchObject({
      answer: expect.any(String),
      question: expect.any(String),
    })
    expect(projectsBody.docs.length).toBeGreaterThan(0)
    expect(projectsBody.docs[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
    })

    const firstThumbnailURL = projectsBody.docs[0]?.thumbnail?.url

    if (firstThumbnailURL) {
      const thumbnailResponse = await fetch(
        firstThumbnailURL.startsWith('http')
          ? firstThumbnailURL
          : `${baseURL}${firstThumbnailURL}`,
      )

      expect(thumbnailResponse.status).toBe(200)
      expect(thumbnailResponse.headers.get('content-type')).toMatch(/^image\//)
    }

    if (projectsBody.docs[0]?.link) {
      expect(projectsBody.docs[0].link).not.toBe('https://github.com/edmnd-src')
      expect(projectsBody.docs[0].link).not.toBe('#')
    }
  })

  test('preview routes stay disabled for the launch build', async () => {
    const [previewResponse, exitPreviewResponse] = await Promise.all([
      fetch(`${baseURL}/next/preview`),
      fetch(`${baseURL}/next/exit-preview`),
    ])

    expect(previewResponse.status).toBe(404)
    expect(await previewResponse.text()).toContain('disabled for this launch build')
    expect(exitPreviewResponse.status).toBe(404)
    expect(await exitPreviewResponse.text()).toContain('disabled for this launch build')
  })

  test('quote PDF returns a branded PDF payload', async () => {
    const response = await fetch(`${baseURL}/api/quote-pdf`, {
      body: JSON.stringify({
        client: {
          email: 'hello@example.com',
          name: 'Launch Client',
        },
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
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/pdf')
    expect(response.headers.get('content-disposition')).toContain('edmond-quote-web-design-growth.pdf')

    const pdfBytes = new Uint8Array(await response.arrayBuffer())

    expect(pdfBytes.byteLength).toBeGreaterThan(1000)
    expect(Buffer.from(pdfBytes.subarray(0, 4)).toString('ascii')).toBe('%PDF')
  })
})
