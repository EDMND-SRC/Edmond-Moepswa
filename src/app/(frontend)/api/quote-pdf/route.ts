import type { CalculatorSelections, QuotePdfRequestBody } from '@/components/homepage/CalculatorSection/types'
import { EMAIL, LOCATION, PHONE_DISPLAY } from '@/lib/constants'
import { NextRequest } from 'next/server'
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const PAGE_MARGIN = 52
const FOOTER_BASELINE = 34
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2
const VALIDITY_DAYS = 14

const PAPER = rgb(0.97, 0.96, 0.94)
const TEXT = rgb(0.07, 0.07, 0.07)
const MUTED = rgb(0.39, 0.39, 0.39)
const BORDER = rgb(0.84, 0.84, 0.84)
const ACCENT = rgb(1, 0.3019607843, 0.1803921569)
const SOFT_ACCENT = rgb(1, 0.949, 0.937)

type PdfContext = {
  bold: PDFFont
  cursorY: number
  page: PDFPage
  pdfDoc: PDFDocument
  regular: PDFFont
}

type TextOptions = {
  color?: ReturnType<typeof rgb>
  font?: PDFFont
  gapAfter?: number
  lineHeight?: number
  size: number
  x?: number
}

type QuotePdfPayload = {
  client?: QuotePdfRequestBody['client']
  notes?: string
  scopeTags: string[]
  selections: CalculatorSelections
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

function parseSelections(value: unknown): CalculatorSelections | null {
  if (!isRecord(value)) {
    return null
  }

  if (
    typeof value.service !== 'string' ||
    typeof value.serviceLabel !== 'string' ||
    typeof value.tier !== 'string' ||
    typeof value.tierLabel !== 'string' ||
    typeof value.tierPriceBWP !== 'number' ||
    typeof value.delivery !== 'string' ||
    typeof value.deliveryLabel !== 'string' ||
    typeof value.deliveryCostBWP !== 'number' ||
    typeof value.deliveryMultiplier !== 'number' ||
    typeof value.staticDiscount !== 'boolean' ||
    typeof value.staticDiscountBWP !== 'number' ||
    typeof value.estimatedTotalBWP !== 'number' ||
    typeof value.formattedTotal !== 'string' ||
    typeof value.formattedBase !== 'string' ||
    typeof value.currency !== 'string'
  ) {
    return null
  }

  return {
    currency: value.currency,
    delivery: value.delivery,
    deliveryCostBWP: value.deliveryCostBWP,
    deliveryLabel: value.deliveryLabel,
    deliveryMultiplier: value.deliveryMultiplier,
    estimatedTotalBWP: value.estimatedTotalBWP,
    formattedBase: value.formattedBase,
    formattedDeliveryCost:
      typeof value.formattedDeliveryCost === 'string' ? value.formattedDeliveryCost : undefined,
    formattedStaticDiscount:
      typeof value.formattedStaticDiscount === 'string' ? value.formattedStaticDiscount : undefined,
    formattedTotal: value.formattedTotal,
    service: value.service,
    serviceLabel: value.serviceLabel,
    staticDiscount: value.staticDiscount,
    staticDiscountBWP: value.staticDiscountBWP,
    tier: value.tier,
    tierLabel: value.tierLabel,
    tierPriceBWP: value.tierPriceBWP,
  }
}

function parseBody(value: unknown): QuotePdfPayload | null {
  if (!isRecord(value)) {
    return null
  }

  const selections = parseSelections(value.selections)

  if (!selections) {
    return null
  }

  const client = isRecord(value.client)
    ? {
        email: typeof value.client.email === 'string' ? value.client.email.trim() : undefined,
        name: typeof value.client.name === 'string' ? value.client.name.trim() : undefined,
        phone: typeof value.client.phone === 'string' ? value.client.phone.trim() : undefined,
      }
    : undefined

  const notes = typeof value.notes === 'string' ? value.notes.trim() : undefined
  const scopeTags = Array.isArray(value.scopeTags)
    ? value.scopeTags.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
    : []

  return {
    client,
    notes,
    scopeTags,
    selections,
  }
}

function createPage(ctx: PdfContext, reuseCurrent = false) {
  ctx.page = reuseCurrent ? ctx.page : ctx.pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  ctx.page.drawRectangle({
    color: PAPER,
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    x: 0,
    y: 0,
  })
  ctx.page.drawLine({
    color: BORDER,
    end: { x: PAGE_WIDTH - PAGE_MARGIN, y: FOOTER_BASELINE + 10 },
    start: { x: PAGE_MARGIN, y: FOOTER_BASELINE + 10 },
    thickness: 1,
  })
  ctx.page.drawText('Edmond Moepswa', {
    color: TEXT,
    font: ctx.bold,
    size: 9,
    x: PAGE_MARGIN,
    y: FOOTER_BASELINE,
  })
  ctx.page.drawText(`${EMAIL}  •  ${PHONE_DISPLAY}  •  ${LOCATION}`, {
    color: MUTED,
    font: ctx.regular,
    size: 8,
    x: PAGE_MARGIN,
    y: FOOTER_BASELINE - 12,
  })
  ctx.cursorY = PAGE_HEIGHT - PAGE_MARGIN
}

function ensureSpace(ctx: PdfContext, neededHeight: number) {
  if (ctx.cursorY - neededHeight < FOOTER_BASELINE + 40) {
    createPage(ctx)
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-BW', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatBwp(value: number) {
  return `P${Math.round(value).toLocaleString('en-BW')}`
}

function formatDisplayAmount(formatted: string | undefined, fallbackBwp: number) {
  return formatted?.trim() || formatBwp(fallbackBwp)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = []

  for (const paragraph of text.split('\n')) {
    const trimmed = paragraph.trim()
    if (!trimmed) {
      lines.push('')
      continue
    }

    const words = trimmed.split(/\s+/)
    let currentLine = words[0] ?? ''

    for (let index = 1; index < words.length; index++) {
      const candidate = `${currentLine} ${words[index]}`
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        currentLine = candidate
      } else {
        lines.push(currentLine)
        currentLine = words[index] ?? ''
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }
  }

  return lines
}

function drawRightText(
  ctx: PdfContext,
  text: string,
  y: number,
  size: number,
  font: PDFFont = ctx.regular,
  color = TEXT,
) {
  ctx.page.drawText(text, {
    color,
    font,
    size,
    x: PAGE_WIDTH - PAGE_MARGIN - font.widthOfTextAtSize(text, size),
    y,
  })
}

function drawParagraph(ctx: PdfContext, text: string, options: TextOptions) {
  const font = options.font ?? ctx.regular
  const lineHeight = options.lineHeight ?? options.size * 1.5
  const x = options.x ?? PAGE_MARGIN
  const lines = wrapText(text, font, options.size, CONTENT_WIDTH - (x - PAGE_MARGIN))

  ensureSpace(ctx, Math.max(lineHeight, lines.length * lineHeight) + (options.gapAfter ?? 0))

  let y = ctx.cursorY
  for (const line of lines) {
    if (line.length > 0) {
      ctx.page.drawText(line, {
        color: options.color ?? TEXT,
        font,
        size: options.size,
        x,
        y,
      })
    }
    y -= lineHeight
  }

  ctx.cursorY = y - (options.gapAfter ?? 0)
}

function drawSectionLabel(ctx: PdfContext, label: string) {
  ensureSpace(ctx, 28)
  ctx.page.drawText(label.toUpperCase(), {
    color: ACCENT,
    font: ctx.bold,
    size: 9,
    x: PAGE_MARGIN,
    y: ctx.cursorY,
  })
  ctx.cursorY -= 14
  ctx.page.drawLine({
    color: BORDER,
    end: { x: PAGE_WIDTH - PAGE_MARGIN, y: ctx.cursorY },
    start: { x: PAGE_MARGIN, y: ctx.cursorY },
    thickness: 1,
  })
  ctx.cursorY -= 16
}

function drawMetaRow(ctx: PdfContext, label: string, value: string) {
  ensureSpace(ctx, 18)
  ctx.page.drawText(label, {
    color: MUTED,
    font: ctx.regular,
    size: 10,
    x: PAGE_MARGIN,
    y: ctx.cursorY,
  })
  drawRightText(ctx, value, ctx.cursorY, 10, ctx.bold)
  ctx.cursorY -= 18
}

function drawLineItem(ctx: PdfContext, label: string, amount: string, detail?: string, accent = false) {
  ensureSpace(ctx, detail ? 30 : 18)
  ctx.page.drawText(label, {
    color: accent ? ACCENT : TEXT,
    font: accent ? ctx.bold : ctx.regular,
    size: 10.5,
    x: PAGE_MARGIN,
    y: ctx.cursorY,
  })
  drawRightText(ctx, amount, ctx.cursorY, 10.5, accent ? ctx.bold : ctx.regular, accent ? ACCENT : TEXT)
  ctx.cursorY -= 16

  if (detail) {
    drawParagraph(ctx, detail, {
      color: MUTED,
      gapAfter: 4,
      size: 9,
    })
  }
}

function drawBulletList(ctx: PdfContext, items: string[]) {
  for (const item of items) {
    const lines = wrapText(item, ctx.regular, 9.5, CONTENT_WIDTH - 16)
    ensureSpace(ctx, lines.length * 14 + 2)
    ctx.page.drawCircle({
      color: ACCENT,
      size: 2.2,
      x: PAGE_MARGIN + 4,
      y: ctx.cursorY + 5,
    })
    let y = ctx.cursorY
    for (const line of lines) {
      ctx.page.drawText(line, {
        color: TEXT,
        font: ctx.regular,
        size: 9.5,
        x: PAGE_MARGIN + 14,
        y,
      })
      y -= 14
    }
    ctx.cursorY = y - 2
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const payload = parseBody(await request.json().catch(() => null))

  if (!payload) {
    return new Response('Invalid quote payload', { status: 400 })
  }

  const { client, notes, scopeTags, selections } = payload
  const issuedAt = new Date()
  const validUntil = new Date(issuedAt)
  validUntil.setDate(validUntil.getDate() + VALIDITY_DAYS)

  const quoteReference = `EM-${issuedAt.toISOString().slice(0, 10).replace(/-/g, '')}-${slugify(
    `${selections.service}-${selections.tier}` || 'service-quote',
  ).toUpperCase()}`

  const pdfDoc = await PDFDocument.create()
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const ctx: PdfContext = {
    bold,
    cursorY: 0,
    page: pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]),
    pdfDoc,
    regular,
  }

  createPage(ctx, true)

  ctx.page.drawText('EDMOND MOEPSWA // QUOTATION', {
    color: ACCENT,
    font: bold,
    size: 9,
    x: PAGE_MARGIN,
    y: ctx.cursorY,
  })
  drawRightText(ctx, quoteReference, ctx.cursorY, 9, bold, MUTED)
  ctx.cursorY -= 26

  drawParagraph(ctx, 'Service Quote', {
    font: bold,
    gapAfter: 4,
    size: 28,
  })
  drawParagraph(
    ctx,
    'A print-ready estimate for the selected package, delivery scope, and next-step discussion.',
    {
      color: MUTED,
      gapAfter: 18,
      size: 11,
    },
  )

  ctx.page.drawRectangle({
    borderColor: BORDER,
    borderWidth: 1,
    color: SOFT_ACCENT,
    height: 72,
    width: CONTENT_WIDTH,
    x: PAGE_MARGIN,
    y: ctx.cursorY - 72,
  })
  drawParagraph(ctx, 'Issued by', {
    color: MUTED,
    gapAfter: 2,
    size: 9,
    x: PAGE_MARGIN + 16,
  })
  drawParagraph(ctx, 'Edmond Moepswa', {
    font: bold,
    gapAfter: 2,
    size: 16,
    x: PAGE_MARGIN + 16,
  })
  drawParagraph(ctx, 'Web design, development, and workflow automation', {
    color: TEXT,
    gapAfter: 0,
    size: 10.5,
    x: PAGE_MARGIN + 16,
  })

  const metaTopY = ctx.cursorY + 56
  drawRightText(ctx, `Issued ${formatDate(issuedAt)}`, metaTopY, 9.5, ctx.regular, MUTED)
  drawRightText(ctx, `Valid until ${formatDate(validUntil)}`, metaTopY - 16, 9.5, ctx.regular, MUTED)
  drawRightText(ctx, `Reference ${quoteReference}`, metaTopY - 32, 9.5, ctx.bold, TEXT)
  ctx.cursorY -= 18

  drawSectionLabel(ctx, 'Client details')
  drawMetaRow(ctx, 'Prepared for', client?.name || 'To be confirmed')
  drawMetaRow(ctx, 'Email', client?.email || 'To be confirmed')
  drawMetaRow(ctx, 'Phone', client?.phone || 'To be confirmed')
  drawMetaRow(ctx, 'Source', 'Self-serve website calculator')
  ctx.cursorY -= 8

  drawSectionLabel(ctx, 'Project summary')
  drawMetaRow(ctx, 'Service category', selections.serviceLabel)
  drawMetaRow(ctx, 'Selected tier', selections.tierLabel)
  drawMetaRow(ctx, 'Delivery option', selections.deliveryLabel)
  drawMetaRow(
    ctx,
    'Display currency',
    selections.currency === 'BWP' ? 'Botswana Pula (BWP)' : selections.currency,
  )

  drawSectionLabel(ctx, 'Pricing breakdown')
  drawLineItem(
    ctx,
    `${selections.serviceLabel} — ${selections.tierLabel}`,
    formatDisplayAmount(selections.formattedBase, selections.tierPriceBWP),
  )

  if (selections.deliveryCostBWP > 0) {
    drawLineItem(
      ctx,
      `Delivery adjustment — ${selections.deliveryLabel}`,
      formatDisplayAmount(selections.formattedDeliveryCost, selections.deliveryCostBWP),
      `Timeline surcharge of ${Math.round(selections.deliveryMultiplier * 100)}% applied to the base package.`,
    )
  }

  if (selections.staticDiscount) {
    drawLineItem(
      ctx,
      'Static website discount',
      `-${formatDisplayAmount(selections.formattedStaticDiscount, selections.staticDiscountBWP)}`,
      'Applied to simplified brochure-style builds with no custom app logic.',
      true,
    )
  }

  ensureSpace(ctx, 84)
  ctx.page.drawRectangle({
    borderColor: BORDER,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    height: 84,
    width: CONTENT_WIDTH,
    x: PAGE_MARGIN,
    y: ctx.cursorY - 84,
  })
  drawParagraph(ctx, 'Estimated total', {
    color: MUTED,
    gapAfter: 2,
    size: 9,
    x: PAGE_MARGIN + 16,
  })
  drawParagraph(ctx, selections.formattedTotal, {
    color: ACCENT,
    font: bold,
    gapAfter: 2,
    size: 24,
    x: PAGE_MARGIN + 16,
  })
  drawParagraph(
    ctx,
    selections.currency === 'BWP'
      ? 'Final pricing basis: Botswana Pula (BWP).'
      : `Line items above are priced in BWP. Display total shown in ${selections.currency} is indicative until scope is confirmed.`,
    {
      color: MUTED,
      gapAfter: 0,
      size: 9.5,
      x: PAGE_MARGIN + 16,
    },
  )
  ctx.cursorY -= 14

  drawSectionLabel(ctx, 'Notes & scope tags')
  if (scopeTags.length > 0) {
    drawParagraph(ctx, scopeTags.join(' • '), {
      color: TEXT,
      gapAfter: 8,
      size: 10,
    })
  } else {
    drawParagraph(ctx, 'No additional scope tags were captured in this self-serve estimate.', {
      color: MUTED,
      gapAfter: 8,
      size: 10,
    })
  }
  drawParagraph(
    ctx,
    notes && notes.length > 0
      ? notes
      : 'No extra notes were attached to this version of the quote. Final delivery detail can be refined during the discovery call.',
    {
      color: TEXT,
      gapAfter: 10,
      size: 10,
    },
  )

  drawSectionLabel(ctx, 'Assumptions & exclusions')
  drawBulletList(ctx, [
    'This estimate is based on the selected package only. Final scope, timeline, and integrations are confirmed after discovery.',
    'Third-party subscriptions, domain registration, premium plugins, paid media, and external software fees are excluded unless stated separately.',
    selections.currency === 'BWP'
      ? 'Invoices are issued in Botswana Pula (BWP) unless another billing arrangement is agreed in writing.'
      : `Converted totals shown in ${selections.currency} are guidance only. Billing is issued in Botswana Pula (BWP) unless agreed otherwise.`,
  ])
  ctx.cursorY -= 6

  drawSectionLabel(ctx, 'Next steps')
  drawBulletList(ctx, [
    'Reply with any missing scope detail or book a discovery call to firm up the brief.',
    'A formal final quote and timeline will be issued once the scope is confirmed.',
    'Work begins after written approval and kickoff scheduling.',
  ])

  const pdfBytes = await pdfDoc.save()
  const pdfBody = new Uint8Array(pdfBytes.length)
  pdfBody.set(pdfBytes)
  const pdfBlob = new Blob([pdfBody], { type: 'application/pdf' })
  const filename = `edmond-quote-${slugify(`${selections.service}-${selections.tier}` || 'service-quote')}.pdf`

  return new Response(pdfBlob, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'application/pdf',
      'X-Content-Type-Options': 'nosniff',
    },
    status: 200,
  })
}
