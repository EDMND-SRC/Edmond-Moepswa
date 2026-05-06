import { expect, test } from '@playwright/test'

test.describe('calculator flow', () => {
  test('quick estimator works end-to-end in the browser', async ({ page }) => {
    test.setTimeout(120_000)

    let submittedPayload: unknown = null

    await page.addInitScript(() => {
      const openedUrls: string[] = []
      Object.defineProperty(window, '__edmondOpenedUrls', {
        value: openedUrls,
        writable: false,
      })

      window.open = ((url?: string | URL) => {
        if (url) {
          openedUrls.push(String(url))
        }
        return null
      }) as typeof window.open
    })

    await page.route('**/api/make-webhook', async (route) => {
      submittedPayload = route.request().postDataJSON()
      await route.fulfill({
        body: JSON.stringify({ ok: true }),
        contentType: 'application/json',
        status: 200,
      })
    })

    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const calculator = page.locator('#calculator-section')
    await calculator.scrollIntoViewIfNeeded()
    await expect(calculator.getByText('Service Pricing Calculator')).toBeVisible()

    const growthTier = calculator.getByRole('button', { name: /^Growth/i })
    const deliveryHeading = calculator.getByRole('heading', { name: 'Delivery timeline' })

    let deliveryReady = false
    for (let attempt = 0; attempt < 6; attempt++) {
      await growthTier.click()
      deliveryReady = await deliveryHeading.isVisible().catch(() => false)
      if (deliveryReady) {
        break
      }
      await page.waitForTimeout(600)
    }

    expect(deliveryReady).toBe(true)
    await expect(deliveryHeading).toBeVisible({
      timeout: 15_000,
    })
    await calculator.getByText('Priority', { exact: true }).click()
    await calculator
      .locator('label')
      .filter({ hasText: /I prefer a static, zero-motion website/i })
      .click()

    await expect(calculator.getByText('Estimated Total')).toBeVisible()
    await expect(calculator.getByText('P22,900')).toBeVisible()

    await calculator.getByRole('button', { name: 'Request Formal Quote' }).click()

    const quoteDialog = page.getByRole('dialog', { name: 'Request Formal Quote' })
    await expect(quoteDialog).toBeVisible()

    await quoteDialog.getByRole('button', { name: 'Submit Quote Request' }).click()
    await expect(quoteDialog.getByText('Name is required.')).toBeVisible()
    await expect(quoteDialog.getByText('Email is required.')).toBeVisible()

    await quoteDialog.getByLabel(/^Name/).fill('Launch Client')
    await quoteDialog.getByLabel(/^Email/).fill('hello@example.com')
    await quoteDialog.getByLabel(/^Phone/).fill('+267 71234567')
    await quoteDialog.locator('label').filter({ hasText: /I have a flexible timeline/i }).click()
    await quoteDialog.getByRole('button', { name: 'Submit Quote Request' }).click()

    await expect.poll(() => submittedPayload).not.toBeNull()
    expect(submittedPayload).toMatchObject({
      data: {
        deliveryLabel: 'Priority',
        formattedBase: 'P19,500',
        formattedTotal: 'P22,900',
        service: 'web-design',
        serviceLabel: 'Web Design & Development',
        staticDiscount: true,
        tier: 'Growth',
        tierLabel: 'Growth',
      },
      workflow: 'calculator-quote',
    })
    expect(submittedPayload).not.toHaveProperty('data.addons')
    expect(submittedPayload).not.toHaveProperty('data.addonsSubtotalBWP')

    await expect(quoteDialog).not.toBeVisible()

    await calculator.getByRole('button', { name: 'Send via WhatsApp' }).click()

    const openedUrls = await page.evaluate(() => {
      return (window as typeof window & { __edmondOpenedUrls?: string[] }).__edmondOpenedUrls ?? []
    })

    expect(openedUrls.length).toBeGreaterThan(0)
    expect(openedUrls[0]).toContain('wa.me/')
    expect(decodeURIComponent(openedUrls[0] ?? '')).toContain('Estimated Total: P22,900')
    expect(decodeURIComponent(openedUrls[0] ?? '')).toContain('Simplified-site discount: -P500')

    await calculator.getByRole('button', { name: 'Download Summary' }).click()

    const summaryDialog = page.getByRole('dialog', { name: 'Download Summary' })
    await expect(summaryDialog).toBeVisible()

    await summaryDialog.getByRole('button', { name: 'PDF Quote' }).click()

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      summaryDialog.getByRole('button', { name: 'Download PDF Quote' }).click(),
    ])

    await expect
      .poll(async () => download.suggestedFilename())
      .toMatch(/\.pdf$/)
  })

  test('non-BWP selections keep the active display currency through share and PDF export', async ({
    page,
  }) => {
    test.setTimeout(120_000)

    let pdfPayload: unknown = null

    await page.addInitScript(() => {
      const openedUrls: string[] = []
      Object.defineProperty(window, '__edmondOpenedUrls', {
        value: openedUrls,
        writable: false,
      })

      window.open = ((url?: string | URL) => {
        if (url) {
          openedUrls.push(String(url))
        }
        return null
      }) as typeof window.open
    })

    await page.route('https://api.exchangerate-api.com/**', async (route) => {
      await route.fulfill({
        body: JSON.stringify({ rates: { USD: 0.1 } }),
        contentType: 'application/json',
        status: 200,
      })
    })

    await page.route('**/api/quote-pdf', async (route) => {
      pdfPayload = route.request().postDataJSON()
      await route.fulfill({
        body: '%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF',
        contentType: 'application/pdf',
        headers: {
          'content-disposition': 'attachment; filename="edmond-quote-usd.pdf"',
        },
        status: 200,
      })
    })

    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const calculator = page.locator('#calculator-section')
    await calculator.scrollIntoViewIfNeeded()
    await expect(calculator.getByText('Service Pricing Calculator')).toBeVisible()

    await calculator.getByLabel('Select display currency').selectOption('USD')
    await expect(calculator.getByText('Prices shown in USD are approximate conversions.')).toBeVisible()

    const growthTier = calculator.getByRole('button', { name: /^Growth/i })
    const deliveryHeading = calculator.getByRole('heading', { name: 'Delivery timeline' })

    let deliveryReady = false
    for (let attempt = 0; attempt < 6; attempt++) {
      await growthTier.click()
      deliveryReady = await deliveryHeading.isVisible().catch(() => false)
      if (deliveryReady) {
        break
      }
      await page.waitForTimeout(600)
    }

    expect(deliveryReady).toBe(true)
    await expect(deliveryHeading).toBeVisible({
      timeout: 15_000,
    })
    await calculator.getByText('Priority', { exact: true }).click()
    await calculator
      .locator('label')
      .filter({ hasText: /I prefer a static, zero-motion website/i })
      .click()

    await expect(calculator.getByText('$2,290')).toBeVisible()

    await calculator.getByRole('button', { name: 'Send via WhatsApp' }).click()

    const openedUrls = await page.evaluate(() => {
      return (window as typeof window & { __edmondOpenedUrls?: string[] }).__edmondOpenedUrls ?? []
    })

    expect(openedUrls.length).toBeGreaterThan(0)
    expect(decodeURIComponent(openedUrls[0] ?? '')).toContain('Estimated Total: $2,290')
    expect(decodeURIComponent(openedUrls[0] ?? '')).toContain('Simplified-site discount: -$50')

    await calculator.getByRole('button', { name: 'Download Summary' }).click()

    const summaryDialog = page.getByRole('dialog', { name: 'Download Summary' })
    await expect(summaryDialog).toBeVisible()
    await summaryDialog.getByRole('button', { name: 'PDF Quote' }).click()

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      summaryDialog.getByRole('button', { name: 'Download PDF Quote' }).click(),
    ])

    await expect
      .poll(async () => download.suggestedFilename())
      .toBe('edmond-quote-usd.pdf')

    expect(pdfPayload).toMatchObject({
      selections: {
        currency: 'USD',
        formattedBase: '$1,950',
        formattedDeliveryCost: '$390',
        formattedStaticDiscount: '$50',
        formattedTotal: '$2,290',
      },
    })
  })
})
