import { chromium, type Page } from '@playwright/test'

import { resolveAdminUser } from '../../tests/helpers/adminUser'

type NavigationMetrics = {
  domContentLoaded: number
  load: number
  responseStart: number
}

type Measurement = {
  label: string
  metrics: NavigationMetrics
  url: string
  wallMs: number
}

const baseURLFlagIndex = process.argv.findIndex((arg) => arg === '--base-url')
const baseURL =
  (baseURLFlagIndex >= 0 ? process.argv[baseURLFlagIndex + 1] : null) ||
  process.env.E2E_BASE_URL ||
  'http://localhost:3000'
const enforceThresholds = process.argv.includes('--assert')
const adminUser = resolveAdminUser()

const thresholds: Readonly<Record<string, (measurement: Measurement) => boolean>> = {
  admin_dashboard: (measurement) => measurement.metrics.responseStart <= 3000,
  admin_pages_create: (measurement) =>
    measurement.metrics.responseStart <= 10000 && measurement.wallMs <= 20000,
  admin_users_list: (measurement) => measurement.metrics.responseStart <= 4000,
  login_submit_to_dashboard_visible: (measurement) => measurement.wallMs <= 20000,
}

async function readNavigationMetrics(page: Page) {
  return page.evaluate<NavigationMetrics>(() => {
    const [navigationEntry] = performance.getEntriesByType('navigation')

    if (!navigationEntry || !('responseStart' in navigationEntry)) {
      return {
        domContentLoaded: 0,
        load: 0,
        responseStart: 0,
      }
    }

    const entry = navigationEntry as PerformanceNavigationTiming

    return {
      domContentLoaded: entry.domContentLoadedEventEnd,
      load: entry.loadEventEnd,
      responseStart: entry.responseStart,
    }
  })
}

async function measureNavigation(page: Page, label: string, pathname: string, readySelector: string) {
  const startedAt = Date.now()

  await page.goto(`${baseURL}${pathname}`, {
    waitUntil: 'load',
  })
  await page.locator(readySelector).first().waitFor({
    state: 'visible',
    timeout: 120_000,
  })

  return {
    label,
    metrics: await readNavigationMetrics(page),
    url: page.url(),
    wallMs: Date.now() - startedAt,
  } satisfies Measurement
}

function printMeasurements(measurements: Measurement[]) {
  console.log(JSON.stringify(measurements, null, 2))
}

async function main() {
  const browser = await chromium.launch()

  try {
    const context = await browser.newContext()
    const page = await context.newPage()
    const measurements: Measurement[] = []

    measurements.push(
      await measureNavigation(page, 'admin_login', '/admin/login', 'input[name="email"]'),
    )

    await page.fill('input[name="email"]', adminUser.email)
    await page.fill('input[name="password"]', adminUser.password)

    const loginStartedAt = Date.now()

    await page.click('button[type="submit"]')
    await page.waitForURL(
      (url) => url.origin === new URL(baseURL).origin && (url.pathname === '/admin' || url.pathname === '/admin/'),
      {
        timeout: 120_000,
        waitUntil: 'load',
      },
    )
    await page.locator('span[title="Dashboard"]').first().waitFor({
      state: 'visible',
      timeout: 120_000,
    })

    measurements.push({
      label: 'login_submit_to_dashboard_visible',
      metrics: await readNavigationMetrics(page),
      url: page.url(),
      wallMs: Date.now() - loginStartedAt,
    })

    measurements.push(
      await measureNavigation(page, 'admin_dashboard', '/admin', 'span[title="Dashboard"]'),
    )
    measurements.push(
      await measureNavigation(page, 'admin_users_list', '/admin/collections/users', 'h1'),
    )
    measurements.push(
      await measureNavigation(
        page,
        'admin_pages_create',
        '/admin/collections/pages/create',
        'input[name="title"]',
      ),
    )

    printMeasurements(measurements)

    if (!enforceThresholds) {
      return
    }

    const failures = measurements.filter((measurement) => {
      const threshold = thresholds[measurement.label]
      return threshold ? !threshold(measurement) : false
    })

    if (failures.length > 0) {
      console.error('Admin performance thresholds failed:')
      printMeasurements(failures)
      process.exit(1)
    }
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
