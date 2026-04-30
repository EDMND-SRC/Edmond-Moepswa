import { test, expect, Page } from '@playwright/test'
import { resolveAdminUser, shouldUseSmokeUser } from '../helpers/adminUser'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe('Admin Panel', () => {
  test.describe.configure({ timeout: 120_000 })
  let page: Page
  const useSmokeUser = shouldUseSmokeUser()

  test.beforeAll(async ({ browser }) => {
    if (!useSmokeUser) {
      await seedTestUser()
    }

    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: useSmokeUser ? resolveAdminUser() : testUser })
  })

  test.afterAll(async () => {
    if (!useSmokeUser) {
      await cleanupTestUser()
    }

    await page.context()?.close()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin$/)
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test('can navigate to list view', async () => {
    await page.goto('/admin/collections/users')
    await expect(page).toHaveURL(/\/admin\/collections\/users/)
    const listViewArtifact = page.locator('h1', { hasText: 'Users' }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test('can navigate to edit view', async () => {
    await page.goto('/admin/collections/pages/create')
    await expect(page).toHaveURL(/\/admin\/collections\/pages\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="title"]')
    await expect(editViewArtifact).toBeVisible()
  })
})
