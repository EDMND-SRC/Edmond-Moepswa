import fs from 'node:fs'
import path from 'node:path'

import { expect, test, type Page } from '@playwright/test'

import { resolveAdminUser, shouldUseSmokeUser } from '../helpers/adminUser'
import { login } from '../helpers/login'
import { cleanupTestUser, seedTestUser } from '../helpers/seedUser'

const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000'
const fixturePath = path.join(process.cwd(), 'public', 'favicon', 'favicon-32x32.png')
const artifactPath = path.join(process.cwd(), 'test-outputs', 'cloudflare-smoke-artifacts.json')
const smokePrefix = 'cf-smoke-'

type SmokeArtifacts = {
  mediaIds: string[]
  pageIds: string[]
}

let page: Page
const smokeArtifacts: SmokeArtifacts = {
  mediaIds: [],
  pageIds: [],
}
const useSmokeUser = shouldUseSmokeUser()

function writeArtifacts() {
  fs.mkdirSync(path.dirname(artifactPath), { recursive: true })
  fs.writeFileSync(artifactPath, `${JSON.stringify(smokeArtifacts, null, 2)}\n`)
}

function getCookieHeader(cookies: Array<{ name: string; value: string }>) {
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
}

async function getAuthenticatedHeaders() {
  const cookies = await page.context().cookies(baseURL)
  const cookieHeader = getCookieHeader(cookies)

  return {
    cookie: cookieHeader,
  }
}

async function deleteArtifacts() {
  const headers = await getAuthenticatedHeaders()

  for (const pageId of [...smokeArtifacts.pageIds]) {
    await fetch(`${baseURL}/api/pages/${pageId}`, {
      headers,
      method: 'DELETE',
    })
  }

  for (const mediaId of [...smokeArtifacts.mediaIds]) {
    await fetch(`${baseURL}/api/media/${mediaId}`, {
      headers,
      method: 'DELETE',
    })
  }

  smokeArtifacts.pageIds.length = 0
  smokeArtifacts.mediaIds.length = 0
  writeArtifacts()
}

async function waitForPublicPage(slug: string) {
  const pathname = `/${slug}`
  const deadline = Date.now() + 30000

  while (Date.now() < deadline) {
    const response = await fetch(`${baseURL}${pathname}`)

    if (response.ok) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))
  }

  throw new Error(`Timed out waiting for ${pathname} to return a public 200`)
}

test.describe('Cloudflare smoke', () => {
  test.describe.configure({ mode: 'serial', timeout: 180_000 })
  test.skip(({ browserName }) => browserName !== 'chromium', 'Cloudflare smoke checks run once in Chromium')

  test.beforeAll(async ({ browser }) => {
    if (!useSmokeUser) {
      await seedTestUser()
    }

    const context = await browser.newContext()
    page = await context.newPage()
    await login({ page, user: resolveAdminUser() })
    writeArtifacts()
  })

  test.afterAll(async () => {
    await deleteArtifacts()
    if (!useSmokeUser) {
      await cleanupTestUser()
    }
    await page.context()?.close()
  })

  test('payload REST auth failure is not a 500', async () => {
    const response = await fetch(`${baseURL}/api/users/me`)

    if (response.status === 200) {
      const body = (await response.json()) as { user: null | unknown }

      expect(body.user).toBeNull()
      return
    }

    expect([401, 403]).toContain(response.status)
  })

  test('graphql GET is blocked and POST succeeds', async () => {
    const getResponse = await fetch(`${baseURL}/api/graphql`)

    expect(getResponse.status).toBe(405)

    const postResponse = await fetch(`${baseURL}/api/graphql`, {
      body: JSON.stringify({
        query: 'query CloudflareSmoke { __schema { queryType { name } } }',
      }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })

    expect(postResponse.status).toBe(200)
  })

  test('can upload media and fetch a transformed image', async () => {
    const headers = await getAuthenticatedHeaders()
    const fixtureBytes = fs.readFileSync(fixturePath)
    const smokeId = `${smokePrefix}${Date.now()}`
    const formData = new FormData()

    formData.set('_payload', JSON.stringify({ alt: smokeId }))
    formData.set('file', new File([fixtureBytes], `${smokeId}.png`, { type: 'image/png' }))

    const response = await fetch(`${baseURL}/api/media`, {
      body: formData,
      headers,
      method: 'POST',
    })

    expect([200, 201]).toContain(response.status)

    const mediaResponse = (await response.json()) as {
      doc?: { id: string | number; url?: string }
      id?: string | number
      url?: string
    }
    const mediaRecord = mediaResponse.doc ?? mediaResponse

    expect(mediaRecord.id).toBeTruthy()
    expect(mediaRecord.url).toBeTruthy()

    smokeArtifacts.mediaIds.push(String(mediaRecord.id))
    writeArtifacts()

    const sourceURL = new URL(mediaRecord.url!, baseURL)
    const originalResponse = await fetch(sourceURL)
    const transformedResponse = await fetch(
      `${baseURL}/api/media/transform?src=${encodeURIComponent(sourceURL.pathname)}&w=32&h=32&q=80`,
    )

    expect(originalResponse.status).toBe(200)
    expect(transformedResponse.status).toBe(200)
  })

  test('can create a published page and fetch it publicly', async () => {
    const headers = await getAuthenticatedHeaders()
    const slug = `${smokePrefix}${Date.now()}`
    const title = `Cloudflare Smoke ${Date.now()}`
    const response = await fetch(`${baseURL}/api/pages`, {
      body: JSON.stringify({
        _status: 'published',
        hero: {
          type: 'lowImpact',
        },
        layout: [
          {
            blockType: 'content',
            columns: [],
          },
        ],
        slug,
        title,
      }),
      headers: {
        ...headers,
        'content-type': 'application/json',
      },
      method: 'POST',
    })

    expect([200, 201]).toContain(response.status)

    const pageResponse = (await response.json()) as {
      doc?: { id: string | number }
      id?: string | number
    }
    const pageRecord = pageResponse.doc ?? pageResponse

    expect(pageRecord.id).toBeTruthy()

    smokeArtifacts.pageIds.push(String(pageRecord.id))
    writeArtifacts()

    await waitForPublicPage(slug)
  })
})
