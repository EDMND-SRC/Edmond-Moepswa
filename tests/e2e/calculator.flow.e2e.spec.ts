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

    await calculator
      .getByRole('button', { name: /Growth 15-22 business days P19,500/i })
      .click()
    await calculator.locator('label').filter({ hasText: /^Priority/ }).click()
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

    await expect(quoteDialog).not.toBeVisible()

    await calculator.getByRole('button', { name: 'Send via WhatsApp' }).click()

    const openedUrls = await page.evaluate(() => {
      return (window as typeof window & { __edmondOpenedUrls?: string[] }).__edmondOpenedUrls ?? []
    })

    expect(openedUrls.length).toBeGreaterThan(0)
    expect(openedUrls[0]).toContain('wa.me/')
    expect(decodeURIComponent(openedUrls[0] ?? '')).toContain('Estimated Total: P22,900')

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
})
