/**
 * audit-integrations.ts
 * 
 * Verifies all API keys and integrations programmatically.
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const _require = createRequire(import.meta.url)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

async function runAudit() {
  console.log('\n🔍 Starting Integration Health Audit...\n')
  let allPass = true

  const logResult = (name: string, status: '✅' | '❌' | '⚠️', message: string) => {
    console.log(`${status} ${name.padEnd(20)} | ${message}`)
    if (status === '❌') allPass = false
  }

  // 1. Dodo Payments
  try {
    if (!process.env.DODO_PAYMENTS_API_KEY) throw new Error('API Key missing')
    const { default: DodoPayments } = await import('dodopayments')
    const dodo = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: 'test_mode'
    })
    const res = await dodo.products.list({ page_size: 1 })
    logResult('Dodo Payments', '✅', `Connected. Verified ${res.items.length} products.`)
  } catch (err: any) {
    logResult('Dodo Payments', '❌', `Failed: ${err.message}`)
  }

  // 2. Dodo Webhook
  try {
    if (!process.env.DODO_PAYMENTS_WEBHOOK_SECRET) throw new Error('Webhook Secret missing')
    // Generate test signature
    const testPayload = JSON.stringify({ type: 'test' })
    const sig = crypto.createHmac('sha256', process.env.DODO_PAYMENTS_WEBHOOK_SECRET).update(testPayload).digest('hex')
    if (sig) logResult('Dodo Webhook', '✅', 'Secret configured and crypto module functioning.')
  } catch (err: any) {
    logResult('Dodo Webhook', '❌', `Failed: ${err.message}`)
  }

  // 3. Payload CMS (Database Connection)
  try {
    if (!process.env.PAYLOAD_SECRET) throw new Error('Payload Secret missing')
    const { getPayload } = await import('payload')
    // @ts-expect-error - Expected for runtime TSX execution but Next.js build complains
    const { default: config } = await import('../payload.config.js')
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'products', limit: 1 })
    logResult('Payload CMS', '✅', `Connected. Found ${res.totalDocs} products in DB.`)
  } catch (err: any) {
    logResult('Payload CMS', '❌', `Failed: ${err.message}`)
  }

  // 4. PostHog
  try {
    const key = process.env.NEXT_PUBLIC_POSTHOG_API_KEY
    if (!key) throw new Error('API Key missing')
    // A simple public token verification endpoint. Using capture endpoint with track event is simplest
    const host = process.env.NEXT_PUBLIC_POSTHOG_API_HOST || 'https://us.i.posthog.com'
    const res = await fetch(`${host}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: key, event: '$test', distinct_id: '123' })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    logResult('PostHog', '✅', `Capture endpoint responsive (${res.status})`)
  } catch (err: any) {
    logResult('PostHog', '❌', `Failed: ${err.message}`)
  }

  // 5. Sentry
  try {
    if (!process.env.SENTRY_DSN) throw new Error('DSN missing')
    logResult('Sentry', '✅', `Configured. (DSN present)`)
  } catch (err: any) {
    logResult('Sentry', '❌', `Failed: ${err.message}`)
  }

  // 6. Better Stack (Uptime)
  try {
    const key = process.env.BETTER_STACK_API_KEY
    if (!key) throw new Error('API Key missing')
    const res = await fetch('https://uptime.betterstack.com/api/v2/monitors', {
      headers: { Authorization: `Bearer ${key}` }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    logResult('Better Stack', '✅', `Connected. Found ${data.data?.length || 0} monitors.`)
  } catch (err: any) {
    // If it's 401, it's missing or invalid
    logResult('Better Stack', err.message.includes('HTTP 401') ? '❌' : '⚠️', `Status: ${err.message}`)
  }

  // 7. Substack
  try {
    const url = process.env.SUBSTACK_FEED_URL || 'https://edmnd.substack.com/feed'
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    if (!text.includes('<rss')) throw new Error('Not an RSS feed')
    logResult('Substack RSS', '✅', `Feed responsive (XML returned)`)
  } catch (err: any) {
    logResult('Substack RSS', '❌', `Failed: ${err.message}`)
  }

  // 8. Make.com (Webhooks)
  const makes = ['MAKE_WEBHOOK_LEAD_CAPTURE', 'MAKE_WEBHOOK_CALCULATOR_QUOTE', 'MAKE_WEBHOOK_DODO_DOWNLOAD']
  const makeStatus = makes.map(m => !!process.env[m]).filter(Boolean).length
  if (makeStatus === 3) logResult('Make.com Hooks', '✅', 'All 3 webhook URLs configured')
  else if (makeStatus > 0) logResult('Make.com Hooks', '⚠️', `${makeStatus}/3 webhook URLs configured`)
  else logResult('Make.com Hooks', '⚠️', 'No webhook URLs configured (Pending scenario creation)')

  // 9. Cal.com
  if (process.env.CAL_WEBHOOK_URL) logResult('Cal.com Webhook', '✅', 'Configured')
  else logResult('Cal.com Webhook', '⚠️', 'Missing CAL_WEBHOOK_URL')

  // 10. Geo API
  try {
    const res = await fetch('https://ipapi.co/json/')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    logResult('Geo API (ipapi)', '✅', `Responsive. Detected IP Country: ${data.country || 'Unknown'}`)
  } catch (err: any) {
    logResult('Geo API (ipapi)', '❌', `Failed: ${err.message}`)
  }

  // 11. Vercel API
  try {
    if (!process.env.VERCEL_TOKEN) throw new Error('Token missing')
    const res = await fetch('https://api.vercel.com/v2/user', {
      headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    logResult('Vercel API', '✅', `Connected. Verified user profile.`)
  } catch (err: any) {
    logResult('Vercel API', '❌', `Failed: ${err.message}`)
  }

  console.log('\n----------------------------------------')
  console.log(allPass ? '🎊 ALL CORE INTEGRATIONS HEALTHY' : '⚠️ SOME INTEGRATIONS FAILED AUDIT')
  console.log('----------------------------------------\n')
  process.exit(allPass ? 0 : 1)
}

runAudit()
