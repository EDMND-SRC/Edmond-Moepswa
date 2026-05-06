import { NextResponse } from 'next/server'
import { reportServerError } from '@/lib/server/report-server-error'

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

type CalAttendee = {
  email?: string
  name?: string
  timeZone?: string
}

type CalWebhookPayload = {
  attendees?: CalAttendee[]
  description?: string
  endTime?: string
  eventType?: string
  responses?: unknown
  startTime?: string
  title?: string
}

const getOptionalString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined

function parseCalWebhookPayload(value: unknown): CalWebhookPayload {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  const payload = value as Record<string, unknown>
  const attendees = Array.isArray(payload.attendees)
    ? payload.attendees
        .filter((attendee): attendee is Record<string, unknown> => {
          return Boolean(attendee) && typeof attendee === 'object' && !Array.isArray(attendee)
        })
        .map((attendee) => ({
          email: getOptionalString(attendee.email),
          name: getOptionalString(attendee.name),
          timeZone: getOptionalString(attendee.timeZone),
        }))
    : undefined

  return {
    attendees,
    description: getOptionalString(payload.description),
    endTime: getOptionalString(payload.endTime),
    eventType: getOptionalString(payload.eventType),
    responses: payload.responses,
    startTime: getOptionalString(payload.startTime),
    title: getOptionalString(payload.title),
  }
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

    const body = parseCalWebhookPayload(await req.json())

    // Forward only the essential booking data
    const payload = {
      startTime: body.startTime,
      endTime: body.endTime,
      eventType: body.eventType,
      title: body.title,
      description: body.description,
      // Include attendee info for CRM purposes
      attendees: body.attendees,
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
    reportServerError(error, { feature: 'cal-webhook' })
    return NextResponse.json({ error: 'Webhook forwarding failed' }, { status: 500 })
  }
}
