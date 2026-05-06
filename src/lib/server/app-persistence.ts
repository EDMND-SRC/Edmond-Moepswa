import type { PostgresClient } from './postgres'
import { withPostgresClient } from './postgres'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'
export type LeadSource = 'contact' | 'calculator'
export type OrderStatus = 'cancelled' | 'failed' | 'refunded' | 'succeeded'

export type ContactLeadInput = {
  budgetRange?: string
  company?: string
  email: string
  message?: string
  name?: string
  projectType?: string
  sourceContext?: string
  timestamp?: string
}

export type CalculatorLeadInput = {
  currency?: string
  delivery?: string
  deliveryCostBWP?: number
  deliveryLabel?: string
  deliveryMultiplier?: number
  email: string
  estimatedTotalBWP?: number
  formattedBase?: string
  formattedDeliveryCost?: string
  formattedStaticDiscount?: string
  formattedTotal?: string
  name?: string
  notes?: string
  phone?: string
  scopeTags?: string[]
  service?: string
  serviceLabel?: string
  staticDiscount?: boolean
  staticDiscountBWP?: number
  tier?: string
  tierLabel?: string
  tierPriceBWP?: number
  timestamp?: string
}

export type DodoMirroredLeadInput = {
  email: string
  eventType: string
  metadata: unknown
  name?: string
  productName?: string
  status?: LeadStatus
}

export type OrderUpsertInput = {
  amount?: number | null
  currency?: string | null
  customerEmail: string
  dodoPaymentId: string
  dodoSubscriptionId?: string | null
  metadata: unknown
  productId?: string | null
  productName?: string | null
  status: OrderStatus
}

function normalizeOptionalText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function normalizeMessage(value: string | undefined, fallback: string | null = null) {
  const normalized = normalizeOptionalText(value)

  return normalized ?? fallback
}

export async function persistContactLead(input: ContactLeadInput) {
  await withPostgresClient(async (client) => {
    await client.query(
      `
        INSERT INTO leads (
          name,
          email,
          source,
          message,
          status,
          company,
          project_type,
          budget_range,
          metadata
        )
        VALUES ($1, $2, 'contact', $3, 'new', $4, $5, $6, $7::jsonb)
      `,
      [
        normalizeOptionalText(input.name),
        normalizeEmail(input.email),
        normalizeMessage(input.message),
        normalizeOptionalText(input.company),
        normalizeOptionalText(input.projectType),
        normalizeOptionalText(input.budgetRange),
        JSON.stringify({
          sourceContext: normalizeOptionalText(input.sourceContext),
          timestamp: normalizeOptionalText(input.timestamp),
        }),
      ],
    )
  })
}

export async function persistCalculatorLead(input: CalculatorLeadInput) {
  await withPostgresClient(async (client) => {
    await client.query(
      `
        INSERT INTO leads (
          name,
          email,
          source,
          message,
          calculator_data,
          status,
          phone,
          metadata
        )
        VALUES ($1, $2, 'calculator', $3, $4::jsonb, 'new', $5, $6::jsonb)
      `,
      [
        normalizeOptionalText(input.name),
        normalizeEmail(input.email),
        normalizeMessage(input.notes),
        JSON.stringify({
          currency: normalizeOptionalText(input.currency),
          delivery: normalizeOptionalText(input.delivery),
          deliveryCostBWP: input.deliveryCostBWP ?? null,
          deliveryLabel: normalizeOptionalText(input.deliveryLabel),
          deliveryMultiplier: input.deliveryMultiplier ?? null,
          estimatedTotalBWP: input.estimatedTotalBWP ?? null,
          formattedBase: normalizeOptionalText(input.formattedBase),
          formattedDeliveryCost: normalizeOptionalText(input.formattedDeliveryCost),
          formattedStaticDiscount: normalizeOptionalText(input.formattedStaticDiscount),
          formattedTotal: normalizeOptionalText(input.formattedTotal),
          service: normalizeOptionalText(input.service),
          serviceLabel: normalizeOptionalText(input.serviceLabel),
          staticDiscount: Boolean(input.staticDiscount),
          staticDiscountBWP: input.staticDiscountBWP ?? null,
          tier: normalizeOptionalText(input.tier),
          tierLabel: normalizeOptionalText(input.tierLabel),
          tierPriceBWP: input.tierPriceBWP ?? null,
        }),
        normalizeOptionalText(input.phone),
        JSON.stringify({
          scopeTags: Array.isArray(input.scopeTags) ? input.scopeTags : [],
          timestamp: normalizeOptionalText(input.timestamp),
        }),
      ],
    )
  })
}

export async function mirrorDodoLead(input: DodoMirroredLeadInput) {
  await withPostgresClient(async (client) => {
    await client.query(
      `
        INSERT INTO leads (
          name,
          email,
          source,
          message,
          status,
          metadata
        )
        VALUES ($1, $2, 'contact', $3, $4, $5::jsonb)
      `,
      [
        normalizeOptionalText(input.name),
        normalizeEmail(input.email),
        normalizeMessage(
          undefined,
          input.productName
            ? `Dodo ${input.eventType}: ${input.productName}`
            : `Dodo ${input.eventType}`,
        ),
        input.status ?? 'new',
        JSON.stringify(input.metadata),
      ],
    )
  })
}

export async function upsertOrder(input: OrderUpsertInput) {
  await withPostgresClient(async (client) => {
    await client.query(
      `
        INSERT INTO orders (
          dodo_payment_id,
          dodo_subscription_id,
          customer_email,
          product_name,
          product_id,
          amount,
          currency,
          status,
          metadata
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb)
        ON CONFLICT (dodo_payment_id)
        DO UPDATE SET
          dodo_subscription_id = EXCLUDED.dodo_subscription_id,
          customer_email = EXCLUDED.customer_email,
          product_name = EXCLUDED.product_name,
          product_id = EXCLUDED.product_id,
          amount = EXCLUDED.amount,
          currency = EXCLUDED.currency,
          status = EXCLUDED.status,
          metadata = EXCLUDED.metadata,
          updated_at = now()
      `,
      [
        input.dodoPaymentId,
        normalizeOptionalText(input.dodoSubscriptionId),
        normalizeEmail(input.customerEmail),
        normalizeOptionalText(input.productName),
        normalizeOptionalText(input.productId),
        typeof input.amount === 'number' ? input.amount : null,
        normalizeOptionalText(input.currency),
        input.status,
        JSON.stringify(input.metadata),
      ],
    )
  })
}

export async function updateOrderStatusByPaymentId(
  dodoPaymentId: string,
  status: OrderStatus,
  metadata: unknown,
) {
  await withPostgresClient(async (client) => {
    await client.query(
      `
        UPDATE orders
        SET status = $2,
            metadata = $3::jsonb,
            updated_at = now()
        WHERE dodo_payment_id = $1
      `,
      [dodoPaymentId, status, JSON.stringify(metadata)],
    )
  })
}

export async function updateOrderStatusBySubscriptionId(
  dodoSubscriptionId: string,
  status: OrderStatus,
  metadata: unknown,
) {
  await withPostgresClient(async (client) => {
    await client.query(
      `
        UPDATE orders
        SET status = $2,
            metadata = $3::jsonb,
            updated_at = now()
        WHERE dodo_subscription_id = $1
      `,
      [dodoSubscriptionId, status, JSON.stringify(metadata)],
    )
  })
}
