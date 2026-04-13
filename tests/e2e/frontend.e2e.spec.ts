import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test.afterAll(async () => {
    await page.context()?.close()
  })

  test('homepage loads with all major sections visible', async () => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Edmond Moepswa/)

    // Verify hero section is visible
    const heroHeading = page.locator('h1').first()
    await expect(heroHeading).toBeVisible()

    // Verify navigation exists
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()

    // Scroll down and verify key sections exist
    await page.locator('#services').waitFor({ state: 'visible' })
    await page.locator('#contact').waitFor({ state: 'visible' })
  })

  test('navigation links work - click Services', async () => {
    await page.goto('/')

    // Find and click the Services nav link
    const servicesLink = page.locator('a[href="/services"]').first()
    await expect(servicesLink).toBeVisible()
    await servicesLink.click()

    await expect(page).toHaveURL(/\/services$/)
  })

  test('contact page loads with Cal.com embed', async () => {
    await page.goto('/contact')
    await expect(page).toHaveURL(/\/contact$/)

    // Verify the page has content
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()

    // Cal.com iframe or embed should be present
    const calEmbed = page.locator('iframe').first()
    await expect(calEmbed).toBeVisible()
  })

  test('about page loads', async () => {
    await page.goto('/about')
    await expect(page).toHaveURL(/\/about$/)

    // Verify page has content
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('services page loads with pricing tiers', async () => {
    await page.goto('/services')
    await expect(page).toHaveURL(/\/services$/)

    // Verify services/pricing content is loaded
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()
  })

  test('404 page displays for unknown routes', async () => {
    const response = await page.goto('/this-route-does-not-exist')
    // Next.js should return a 404 status
    expect(response?.status()).toBe(404)

    // Verify the 404 page has visible content
    const notFoundText = page.getByText(/not found|404/i).first()
    await expect(notFoundText).toBeVisible()
  })
})
