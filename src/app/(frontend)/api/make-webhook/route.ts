import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URLS: Record<string, string | undefined> = {
  'lead-capture': process.env.MAKE_WEBHOOK_LEAD_CAPTURE,
  'calculator-quote': process.env.MAKE_WEBHOOK_CALCULATOR_QUOTE,
  'dodo-download': process.env.MAKE_WEBHOOK_DODO_PAYMENTS,
  'cal-booking': process.env.CAL_WEBHOOK_URL,
}

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

// ── Allowed lead-capture fields ───────────────────────────────────────────────

const ALLOWED_LEAD_FIELDS = new Set([
  'name',
  'email',
  'company',
  'projectType',
  'budgetRange',
  'message',
  'timestamp',
  'source',
])

type WorkflowName = keyof typeof WEBHOOK_URLS

const isWorkflowName = (value: string): value is WorkflowName => value in WEBHOOK_URLS

interface MakeWebhookBody {
  data?: Record<string, unknown>
  workflow: WorkflowName
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

function sanitizeLeadData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {}
  for (const key of ALLOWED_LEAD_FIELDS) {
    if (key in data) {
      sanitized[key] = data[key]
    }
  }
  return sanitized
}

function parseMakeWebhookBody(value: unknown): MakeWebhookBody | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const workflow = (value as Record<string, unknown>).workflow
  const data = (value as Record<string, unknown>).data

  if (typeof workflow !== 'string' || !isWorkflowName(workflow)) {
    return null
  }

  return {
    data: isRecord(data) ? data : undefined,
    workflow,
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (10 requests per minute per IP for webhooks)
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip, 10, 60000)) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
    }

    const body = parseMakeWebhookBody(await request.json())
    if (!body) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
    }

    const { workflow, data } = body

    // Authentication check — allow unauthenticated lead-capture and dodo-download
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.CRON_SECRET

    if (workflow === 'lead-capture') {
      // Allow unauthenticated lead-capture submissions; validate data shape
    } else if (workflow === 'dodo-download') {
      // Allow unauthenticated anonymous tracking
    } else if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const webhookUrl = WEBHOOK_URLS[workflow]
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Unknown workflow' }, { status: 400 })
    }

    // Sanitize lead-capture data to only pass known fields
    let forwardedData: Record<string, unknown> | undefined = data
    if (workflow === 'lead-capture') {
      forwardedData = sanitizeLeadData(data || {})
    }
    // NOTE: Other workflows forward data as-is. Ensure Make.com validates incoming payloads.

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardedData),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Webhook returned an error', status: response.status },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
