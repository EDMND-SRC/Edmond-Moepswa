import { NextResponse } from 'next/server'

// ── Rate limiter ──────────────────────────────────────────────────────────────

const rateLimit = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + windowMs })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

// Proxy route for Cal.com booking webhooks.
// Keeps the Make.com webhook URL server-side only.
export async function POST(req: Request) {
  try {
    // Rate limiting (10 requests per minute per IP for webhooks)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip, 10, 60000)) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
    }

    // Authentication check
    const authHeader = req.headers.get('authorization')
    const expectedToken = process.env.CRON_SECRET
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const webhookUrl = process.env.CAL_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('CAL_WEBHOOK_URL environment variable is not set')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    const body = await req.json()

    // Forward only the essential booking data
    const payload = {
      startTime: body.startTime,
      endTime: body.endTime,
      eventType: body.eventType,
      title: body.title,
      description: body.description,
      // Include attendee info for CRM purposes
      attendees: body.attendees?.map((a: any) => ({
        name: a.name,
        email: a.email,
        timeZone: a.timeZone,
      })),
      responses: body.responses,
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cal.com webhook proxy error:', error)
    return NextResponse.json({ error: 'Webhook forwarding failed' }, { status: 500 })
  }
}
