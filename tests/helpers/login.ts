import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface LoginOptions {
  page: Page
  serverURL?: string
  user: {
    email: string
    password: string
  }
}

/**
 * Logs the user into the admin panel via the login page.
 */
export async function login({
  page,
  serverURL = process.env.E2E_BASE_URL || 'http://localhost:3000',
  user,
}: LoginOptions): Promise<void> {
  await page.goto(`${serverURL}/admin/login`)

  // Use resilient attribute-based selectors instead of generated #field-* IDs
  // which may change between Payload versions.
  await page.fill('input[name="email"]', user.email)
  await page.fill('input[name="password"]', user.password)
  await page.click('button[type="submit"]')

  await page.waitForURL(
    (url) => url.origin === serverURL && (url.pathname === '/admin' || url.pathname === '/admin/'),
    { timeout: 60_000, waitUntil: 'domcontentloaded' },
  )

  const dashboardArtifact = page.locator('span[title="Dashboard"]')
  await expect(dashboardArtifact).toBeVisible()
}
