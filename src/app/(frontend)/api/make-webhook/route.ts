import { NextRequest, NextResponse } from 'next/server'
import { persistCalculatorLead, persistContactLead } from '@/lib/server/app-persistence'

const rateLimit = new Map<string, { count: number; reset: number }>()

const ALLOWED_CONTACT_FIELDS = new Set([
  'budgetRange',
  'company',
  'email',
  'message',
  'name',
  'projectType',
  'source',
  'timestamp',
])

const ALLOWED_CALCULATOR_FIELDS = new Set([
  'addons',
  'addonsSubtotalBWP',
  'currency',
  'delivery',
  'deliveryMultiplier',
  'email',
  'estimatedTotalBWP',
  'name',
  'notes',
  'phone',
  'scopeTags',
  'service',
  'staticDiscount',
  'staticDiscountBWP',
  'tier',
  'tierPriceBWP',
  'timestamp',
])

const ALLOWED_RESOURCE_FIELDS = new Set(['resource', 'timestamp'])

type WorkflowName = 'calculator-quote' | 'lead-capture' | 'resource-download'

type ContactLeadPayload = {
  budgetRange?: string
  company?: string
  email: string
  message?: string
  name?: string
  projectType?: string
  source?: string
  timestamp?: string
}

type CalculatorQuotePayload = {
  addons?: unknown
  addonsSubtotalBWP?: number
  currency?: string
  delivery?: string
  deliveryMultiplier?: number
  email: string
  estimatedTotalBWP?: number
  name?: string
  notes?: string
  phone?: string
  scopeTags?: string[]
  service?: string
  staticDiscount?: boolean
  staticDiscountBWP?: number
  tier?: string
  tierPriceBWP?: number
  timestamp?: string
}

type ResourceDownloadPayload = {
  resource?: string
  timestamp?: string
}

type MakeWebhookBody =
  | { data: CalculatorQuotePayload; workflow: 'calculator-quote' }
  | { data: ContactLeadPayload; workflow: 'lead-capture' }
  | { data: ResourceDownloadPayload; workflow: 'resource-download' }

function checkRateLimit(ip: string, max: number, windowMs: number) {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + windowMs })
    return true
  }

  if (entry.count >= max) {
    return false
  }

  entry.count += 1
  return true
}

function getOptionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function getOptionalNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function getOptionalBoolean(value: unknown) {
  return typeof value === 'boolean' ? value : undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function sanitizeAllowedFields(
  data: Record<string, unknown>,
  allowedFields: ReadonlySet<string>,
) {
  const sanitized: Record<string, unknown> = {}

  for (const field of allowedFields) {
    if (field in data) {
      sanitized[field] = data[field]
    }
  }

  return sanitized
}

function sanitizeContactLeadPayload(data: Record<string, unknown>): ContactLeadPayload | null {
  const sanitized = sanitizeAllowedFields(data, ALLOWED_CONTACT_FIELDS)
  const email = getOptionalString(sanitized.email)

  if (!email) {
    return null
  }

  return {
    budgetRange: getOptionalString(sanitized.budgetRange),
    company: getOptionalString(sanitized.company),
    email,
    message: getOptionalString(sanitized.message),
    name: getOptionalString(sanitized.name),
    projectType: getOptionalString(sanitized.projectType),
    source: getOptionalString(sanitized.source),
    timestamp: getOptionalString(sanitized.timestamp),
  }
}

function sanitizeCalculatorQuotePayload(data: Record<string, unknown>): CalculatorQuotePayload | null {
  const sanitized = sanitizeAllowedFields(data, ALLOWED_CALCULATOR_FIELDS)
  const email = getOptionalString(sanitized.email)

  if (!email) {
    return null
  }

  return {
    addons: Array.isArray(sanitized.addons) ? sanitized.addons : undefined,
    addonsSubtotalBWP: getOptionalNumber(sanitized.addonsSubtotalBWP),
    currency: getOptionalString(sanitized.currency),
    delivery: getOptionalString(sanitized.delivery),
    deliveryMultiplier: getOptionalNumber(sanitized.deliveryMultiplier),
    email,
    estimatedTotalBWP: getOptionalNumber(sanitized.estimatedTotalBWP),
    name: getOptionalString(sanitized.name),
    notes: getOptionalString(sanitized.notes),
    phone: getOptionalString(sanitized.phone),
    scopeTags: Array.isArray(sanitized.scopeTags)
      ? sanitized.scopeTags.filter((value): value is string => typeof value === 'string')
      : undefined,
    service: getOptionalString(sanitized.service),
    staticDiscount: getOptionalBoolean(sanitized.staticDiscount),
    staticDiscountBWP: getOptionalNumber(sanitized.staticDiscountBWP),
    tier: getOptionalString(sanitized.tier),
    tierPriceBWP: getOptionalNumber(sanitized.tierPriceBWP),
    timestamp: getOptionalString(sanitized.timestamp),
  }
}

function sanitizeResourceDownloadPayload(data: Record<string, unknown>): ResourceDownloadPayload {
  const sanitized = sanitizeAllowedFields(data, ALLOWED_RESOURCE_FIELDS)

  return {
    resource: getOptionalString(sanitized.resource),
    timestamp: getOptionalString(sanitized.timestamp),
  }
}

function parseMakeWebhookBody(value: unknown): MakeWebhookBody | null {
  if (!isRecord(value) || typeof value.workflow !== 'string' || !isRecord(value.data)) {
    return null
  }

  switch (value.workflow) {
    case 'lead-capture': {
      const data = sanitizeContactLeadPayload(value.data)
      return data ? { data, workflow: value.workflow } : null
    }
    case 'calculator-quote': {
      const data = sanitizeCalculatorQuotePayload(value.data)
      return data ? { data, workflow: value.workflow } : null
    }
    case 'resource-download':
      return {
        data: sanitizeResourceDownloadPayload(value.data),
        workflow: value.workflow,
      }
    default:
      return null
  }
}

async function persistWorkflow(body: MakeWebhookBody) {
  switch (body.workflow) {
    case 'lead-capture':
      await persistContactLead({
        budgetRange: body.data.budgetRange,
        company: body.data.company,
        email: body.data.email,
        message: body.data.message,
        name: body.data.name,
        projectType: body.data.projectType,
        sourceContext: body.data.source,
        timestamp: body.data.timestamp,
      })
      return
    case 'calculator-quote':
      await persistCalculatorLead(body.data)
      return
    case 'resource-download':
      return
  }
}

async function forwardWorkflow(body: MakeWebhookBody) {
  const webhookUrl =
    body.workflow === 'lead-capture'
      ? process.env.MAKE_WEBHOOK_LEAD_CAPTURE
      : body.workflow === 'calculator-quote'
        ? process.env.MAKE_WEBHOOK_CALCULATOR_QUOTE
        : process.env.MAKE_WEBHOOK_RESOURCE_DOWNLOAD

  if (!webhookUrl) {
    throw new Error(`Missing Make webhook URL for ${body.workflow}`)
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body.data),
  })

  if (!response.ok) {
    throw new Error(`Make webhook returned ${response.status}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    if (!checkRateLimit(ip, 10, 60_000)) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
    }

    const body = parseMakeWebhookBody(await request.json())

    if (!body) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
    }

    await persistWorkflow(body)
    await forwardWorkflow(body)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Make webhook proxy failed:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
