import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test.afterAll(async () => {
    await page.context()?.close()
  })

  test('homepage loads with all major sections visible', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveTitle(/Edmond Moepswa/)

    // Verify hero section is visible
    const heroHeading = page.locator('h1').first()
    await expect(heroHeading).toBeVisible()

    // Verify navigation exists
    const servicesLink = page.locator('a[href="/services"]').first()
    await expect(servicesLink).toBeVisible()

    // Scroll down and verify key sections exist
    await expect(page.locator('#services')).toBeVisible()
    await expect(page.locator('#testimonials')).toBeVisible()
  })

  test('navigation links work - click Services', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Find and click the Services nav link
    const servicesLink = page.locator('a[href="/services"]').first()
    await expect(servicesLink).toBeVisible()
    await servicesLink.click()

    await expect(page).toHaveURL(/\/services$/)
  })

  test('contact page loads with booking or direct contact actions', async () => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL(/\/contact$/)

    // Verify the page has content
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()

    // The page is valid if either the live booking iframe appears or the direct-contact
    // actions are present.
    const calEmbedCount = await page.locator('iframe[title="Book a call"]').count()
    if (calEmbedCount > 0) {
      await expect(page.locator('iframe[title="Book a call"]').last()).toHaveAttribute(
        'title',
        'Book a call',
      )
      return
    }

    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible()
    await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible()
  })

  test('about page loads', async () => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL(/\/about$/)

    // Verify page has content
    await expect(page.getByRole('heading', { name: /Tools & Technologies/i })).toBeVisible()
  })

  test('services page loads with pricing tiers', async () => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL(/\/services$/)

    // Verify services/pricing content is loaded
    await expect(
      page.getByRole('heading', { name: /Transparent pricing for every service/i }),
    ).toBeVisible()
  })

  test('404 page displays for unknown routes', async () => {
    const response = await page.goto('/this-route-does-not-exist', {
      waitUntil: 'domcontentloaded',
    })
    // Next.js should return a 404 status
    expect(response?.status()).toBe(404)
  })
})
