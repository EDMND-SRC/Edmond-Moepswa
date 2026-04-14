# Dodo Payments Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Last Updated:** 14 April 2026 (Full Integration Complete — 12 Products Created, PWYW, Adaptive Currency, Webhooks, Sentra)
**Platform:** Dodo Payments (dodopayments.com)
**Free Tier:** No monthly platform fee — percentage-based per-transaction fee. Standard payouts free (USD SWIFT $25 fee applies).
**Current Mode:** Test Mode (indefinite until website is satisfied)
**Environment Variable:** `DODO_PAYMENTS_ENVIRONMENT=test` — set to `live` when ready to switch

---

## Overview

Dodo Payments operates as a Merchant of Record (MoR) — it legally sells the product on behalf of the seller, handles tax compliance across 150+ countries, and remits the net revenue. This eliminates the seller's need to register for VAT/sales tax in multiple jurisdictions, making it ideal for international digital product and SaaS sales.

For Edmond's service offerings, Dodo Payments serves as:

1. **Primary Storefront** — Replacing Gumroad/Lemon Squeezy for free resources and paid boilerplate products. All products hosted on this site's `/store` page with Dodo checkout.
2. **International payment gateway** — For Botswana-based businesses selling to international customers where Stripe is unavailable
3. **Tax and compliance handling** — Dodo manages sales tax, VAT, and digital services tax across 150+ countries — the seller receives net revenue without tax registration overhead
4. **Boilerplate payment integration** — E-commerce stores (Boilerplate 6) and SaaS products (Tier C) that need international payment processing

---

## Integration Status (14 April 2026)

### ✅ Complete — All Code & Products
- ✅ `dodopayments` SDK installed and integrated
- ✅ **12/12 products created in Dodo** (test mode) via API:
  - 3 free resources with PWYW (Pay What You Want) pricing
  - 9 paid boilerplate products with fixed pricing
- ✅ Test mode API key configured (`DODO_PAYMENTS_API_KEY`)
- ✅ `DODO_PAYMENTS_ENVIRONMENT=test` — single env var switches all integrations between test/live
- ✅ Store ID configured (`DODO_PAYMENTS_STORE_ID=bus_0NcbJEcXUhVRoZWBULvZ9`)
- ✅ Webhook secret configured (`DODO_PAYMENTS_WEBHOOK_SECRET`)
- ✅ Store page (`/store`) fully redesigned with Dodo integration
- ✅ Checkout API route: `/api/checkout` — PWYW amount support
- ✅ Products API route: `/api/dodo-products` — 60s revalidation
- ✅ Webhook handler: `/api/webhooks/dodo` — HMAC verification, event routing
- ✅ ResourceCards wired to Dodo product IDs (Gumroad fallback preserved)
- ✅ Adaptive currency: 70+ currencies (enabled in Dodo dashboard)
- ✅ Vercel env vars synced (11 vars → production/preview/development)
- ✅ Build verified: `pnpm build` passes with zero errors

### 📋 Created Product IDs (Test Mode)

**Free Resources (PWYW):**

| Product | ID | Price |
|---|---|---|
| 5 Signs Your Website Is Costing You Clients | `pdt_0NceaY8UNB1GoMOLesz8X` | PWYW (suggested $5.00) |
| Website Launch Checklist | `pdt_0NceaYFa2uiHUZPpN7KOA` | PWYW (suggested $5.00) |
| How to Brief a Web Designer | `pdt_0NceaYzEq1qzsiDZHrFWb` | PWYW (suggested $5.00) |

**Paid Boilerplates:**

| Product | ID | Price |
|---|---|---|
| Artisan & Craftmaker Portfolio | `pdt_0NceaZ7MhTzjPhk2aY0X6` | $49.99 |
| Professional Services Firm | `pdt_0NceaZEHpeVsSmLthCaZp` | $55.99 |
| Food & Hospitality | `pdt_0NceaZL68xGvvpTCMwAcr` | $59.99 |
| Health & Wellness | `pdt_0NceaZcHLefMoeI7jyZj1` | $49.99 |
| Events & Experiences | `pdt_0NceaZjlwvNurs3YmCFbJ` | $39.99 |
| E-commerce | `pdt_0NceaZqUzBh2tvZYMPCKI` | $69.99 |
| NGO / Non-Profit | `pdt_0NceaZxJIATESTttB9Sy4` | $43.99 |
| Financial Services | `pdt_0Nceaa45LVxvpPmn0JPm3` | $59.99 |
| SaaS Starter | `pdt_0NceaaACaY7X4A4qtHoek` | $99.99 |

---

## Architecture

### Environment Variables

| Variable | Purpose | Test Value |
|---|---|---|
| `DODO_PAYMENTS_API_KEY` | API authentication | (set in `.env.local`) |
| `DODO_PAYMENTS_ENVIRONMENT` | Mode switch: `test` or `live` | `test` |
| `DODO_PAYMENTS_STORE_ID` | Storefront/business identifier | `bus_0NcbJEcXUhVRoZWBULvZ9` |
| `DODO_PAYMENTS_WEBHOOK_SECRET` | Webhook HMAC verification | `whsec_WqcGva3lcb4RtAMdcjsA1x4j9nN824kk` |

### API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/checkout` | POST | Creates checkout session with optional PWYW amount |
| `/api/dodo-products` | GET | Fetches all products for storefront (60s cache) |
| `/api/webhooks/dodo` | POST | Handles payment/subscription events |

### SDK Usage Pattern

```typescript
import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'test' ? 'test_mode' : 'live_mode',
})
```

### Product Creation Format

The Dodo SDK requires a specific structure for the `price` field:

```typescript
client.products.create({
  name: 'Product Name',
  description: 'Description',
  price: {
    type: 'one_time_price',          // or 'recurring_price'
    price: 0,                         // amount in cents
    discount: 0,
    purchasing_power_parity: false,
    currency: 'USD',                  // must be uppercase
    // Optional for PWYW:
    pay_what_you_want: true,
    suggested_price: 500,             // in cents
  },
  tax_category: 'digital_products',   // or 'e_book', 'saas', 'edtech'
})
```

### Switching to Live Mode

1. Change `DODO_PAYMENTS_ENVIRONMENT=live` in `.env.local` and Vercel
2. Ensure live API key is set (starts with different prefix)
3. Create products in live mode (test products don't carry over)
4. Redeploy

---

## Cost Structure (2026)

| Item | Cost |
|------|------|
| Monthly platform fee | $0 (standard tier) |
| Per-transaction fee | Percentage-based (typically 5–8% + payment processing) |
| Payout fee (USD SWIFT) | $25 per payout |
| Tax compliance | Included in transaction fee (Merchant of Record) |
| Supported currencies | 80+ currencies |
| Supported countries | 150+ countries for payment acceptance |

---

## PWYW (Pay What You Want)

Free resources use PWYW pricing:
- **Minimum:** $0 (truly free)
- **Suggested:** $5.00 (shown as recommendation)
- **Customer choice:** Can enter any amount ≥ $0
- **Checkout:** `/api/checkout` accepts optional `amount` field in cents

---

## Adaptive Currency

- **Enabled:** Dodo Dashboard → Settings → Business → Adaptive Pricing
- **Support:** 70+ currencies
- **FX fee:** 2-4% tiered (paid by customer, not merchant)
- **Detection:** Auto-detects customer country via billing address
- **Override:** Customer can switch currency manually

---

## Sentra by Dodo Payments

Sentra is Dodo Payments' AI-powered product creation tool, available as an IDE extension (Antigravity, VS Code, etc.). It allows you to create, configure, and manage products through natural language prompts instead of using the dashboard UI or writing code.

### Capabilities

1. **Product Creation** — Create single or multiple products in one prompt
2. **Bulk Operations** — Define multiple products with shared global defaults
3. **Full Configuration** — All product fields: pricing, tax, metadata, images, SKUs, trials
4. **Environment Selection** — Specify test or live mode per prompt
5. **Subscription Setup** — Configure recurring billing intervals, trials, setup fees
6. **PWYW Configuration** — Set up Pay What You Want products
7. **Metadata & Tax** — Add custom metadata, tax categories, shipping requirements
8. **Validation** — Returns created product IDs and full details for verification

### Sentra Prompts for Product Management

**For future product creation via Sentra, use this prompt format:**

```
Create products in test mode with the following settings. Use defaults for any field marked "skip".

Global defaults (apply unless overridden per product):
Currency: USD
Taxable: true
Billing type: one-time
Active: true
Shipping required: false

Products to create:

1. Product Name: [Name]
   Type: one-time
   Description: [description]
   Price: [amount in dollars, e.g., 49.99]
   Currency: USD
   Tax category: digital_products
   Active: true
   Metadata: { category: "boilerplate" }

2. Product Name: [Name 2]
   Type: one-time
   Description: [description]
   Price: 0
   Pay what you want: true
   Suggested price: 5.00
   Currency: USD
   Tax category: e_book
   Active: true

Extra rules/notes:
- If any field is not supported, skip it and proceed.
- Use lowest denomination for prices (e.g., $49.99 → 4999 cents).
- Return created product IDs and full details.
```

**For subscription products:**

```
Create products in test mode:

1. Product Name: Pro Monthly
   Type: subscription
   Description: [description]
   Price: 49.00
   Currency: USD
   Billing interval: monthly
   Billing interval count: 1
   Trial period: 14 days
   Taxable: true
   Active: true
   SKU: pro_monthly_001

Return created product IDs.
```

---

## By Service Category

### 1. Web Applications — Tier A (Starter Storefront from P2,500)

#### Dodo Payments Storefront Setup
- **Use case:** Client needs to start selling digital products, SaaS, or services internationally
- **Deliverables:** Dodo merchant account, store branding, product listing, subscription setup, test mode walkthrough, live mode handover
- **Value:** International storefront live within days. Handles tax compliance automatically.

#### Subscription and Recurring Billing
- **Use case:** Monthly subscription product (SaaS tool, membership, content access)
- **Dodo capability:** Native recurring billing — trial periods, proration, failed payment retries, cancellation
- **Value:** Full subscription management without building billing logic

### 2. Web Applications — Boilerplate 6 (E-commerce Store from P35,000)

#### International Payment Gateway
- **Use case:** E-commerce store selling to international customers
- **Integration:** Dodo Payments API → Next.js frontend → order confirmation → fulfilment
- **Value:** Accept payments from 150+ countries in 80+ currencies

#### Hybrid Payment Strategy (Local + International)
- **Use case:** Client sells to both local (Botswana) and international customers
- **Strategy:** DPO PayGate for local BWP + Dodo for international USD/multi-currency
- **Implementation:** IP geolocation → appropriate gateway → local customers pay in BWP, international via Dodo

### 3. Web Applications — Tier C (Custom SaaS from P48,000)

#### SaaS Billing and Subscription Management
- **Use case:** Custom SaaS with tiered pricing (Free, Pro $29/mo, Enterprise $99/mo)
- **Integration:** Dodo checkout → webhook → activate subscription → recurring billing
- **Value:** Full SaaS billing infrastructure without building payment processing

---

## Quick-Win Implementations

### Priority 1: Dodo Storefront Setup (2 hours)
1. Create Dodo merchant account → complete business verification
2. Configure store settings → branding, currency, payout details
3. Add products → name, description, pricing, files
4. Configure subscription products (if applicable)
5. Test checkout flow → verify payment processing, email notifications
6. Go live → share storefront URL

### Priority 2: Dodo API Integration (3 hours)
```typescript
// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'test' ? 'test_mode' : 'live_mode',
})

export async function POST(req: Request) {
  const { productId, customerEmail, amount } = await req.json()

  const cartItem: { product_id: string; quantity: number; amount?: number } = {
    product_id: productId,
    quantity: 1,
  }
  if (amount !== undefined) cartItem.amount = amount

  const session = await client.checkoutSessions.create({
    product_cart: [cartItem],
    customer: customerEmail ? { email: customerEmail } : undefined,
    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/store/success`,
  })

  return NextResponse.json({ url: session.url })
}
```

### Priority 3: Webhook Handler (2 hours)
```typescript
// app/api/webhooks/dodo/route.ts
import { NextResponse } from 'next/server'
import crypto from 'crypto'

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-dodo-signature')
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET!

  if (!signature || !verifyWebhook(body, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)

  switch (event.type) {
    case 'payment.succeeded':
      // Fulfill order
      break
    case 'subscription.active':
      // Activate access
      break
    case 'subscription.cancelled':
      // Revoke access
      break
  }

  return NextResponse.json({ received: true })
}
```

---

## Risks & Considerations

1. **Merchant account approval:** Dodo requires business verification. Approval depends on registration, identity, and product type compliance
2. **SWIFT payout fee ($25):** Each payout to non-US bank incurs $25 SWIFT fee. Batch payouts monthly to minimize
3. **Not a local BWP gateway:** Dodo settles in USD — not Botswana Pula. Use DPO PayGate for local BWP
4. **Merchant of Record model:** Dodo is the legal seller — sets terms, handles refunds, manages chargebacks
5. **Product restrictions:** Certain categories restricted (adult content, gambling, weapons). Verify eligibility
6. **Test vs Live:** Test mode products don't carry over to live mode — recreate when switching

---

**End of Dodo Payments Integration Strategy**
