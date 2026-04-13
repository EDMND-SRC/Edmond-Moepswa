# Lemon Squeezy Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Lemon Squeezy (lemonsqueezy.com)
**Free Tier:** No monthly fee — 5% + $0.50 per transaction. Merchant of Record.

---

## Overview

Lemon Squeezy is a Merchant of Record (MoR) platform for selling digital products, software licences, and SaaS subscriptions. It handles tax compliance, payment processing, and licence key delivery in a single platform. Its pricing (5% + $0.50 per transaction, no monthly fee) undercuts Gumroad's 10% flat fee and provides a cleaner checkout experience.

**Note:** Lemon Squeezy was acquired by Stripe in late 2025. As of early 2026, the pricing and MoR model remain unchanged, but the long-term roadmap is uncertain.

For Edmond's practice, Lemon Squeezy serves as:

1. **Tier A storefront alternative** — For clients selling digital products internationally who want lower fees than Gumroad (5% + $0.50 vs. 10%)
2. **SaaS billing platform** — Subscription management with built-in tax compliance for Tier C SaaS products
3. **Software licence delivery** — Built-in licence key generation and validation for software products
4. **Higher-margin digital product sales** — For products expected to generate significant volume, the lower fee (5% vs. Gumroad's 10%) preserves meaningful margin

---

## Cost Structure (2026)

| Item | Cost |
|------|------|
| Monthly platform fee | $0 |
| Per-transaction fee | 5% + $0.50 |
| Payment processing | Included in the 5% + $0.50 |
| Tax compliance | Included (Merchant of Record) |
| Licence key delivery | Included |
| Payout threshold | $50 minimum |
| Payout schedule | Monthly (net-30) |
| Supported currencies | 135+ currencies |
| Supported countries | 150+ countries |

**Cost comparison for a $50 product:**

| Platform | Fee | Net to Seller |
|----------|-----|--------------|
| Lemon Squeezy | 5% + $0.50 = $3.00 | $47.00 |
| Gumroad | 10% + ~$1.75 = $6.75 | $43.25 |
| Dodo Payments | ~5–8% + processing = ~$3–4.50 | ~$45.50–47.00 |
| Paddle | 5% + $0.50 = $3.00 | $47.00 |

---

## By Service Category

### 1. Web Applications — Tier A (Starter Storefront)

#### Lemon Squeezy Store Setup (from P3,500)
- **Use case:** Client selling digital products internationally with lower fees than Gumroad
- **Deliverables:**
  - Lemon Squeezy account setup and branding
  - Product listing with pricing tiers, descriptions, file uploads
  - Subscription product configuration (if applicable)
  - Licence key setup (for software products)
  - Test checkout flow → live mode handover
  - Written documentation
- **Value:** Lower per-sale fees than Gumroad (5% + $0.50 vs. 10%). For a client selling 100 products at $25/month, Lemon Squeezy saves ~$100/month in fees vs. Gumroad
- **Best for:** Software tools, templates, subscriptions, and digital products where checkout quality and licence key delivery matter

---

### 2. Web Applications — Tier C (Custom SaaS)

#### SaaS Subscription Billing
- **Use case:** Custom SaaS product with tiered pricing (Free, Pro $29/month, Enterprise $99/month)
- **Lemon Squeezy capability:** Subscription management, trial periods, proration, dunning (failed payment recovery), coupon codes, licence key validation
- **Integration:** Lemon Squeezy checkout → webhook to application → activate subscription tier → recurring billing managed by Lemon Squeezy
- **Value:** Full SaaS billing with tax compliance. No need to build billing logic, handle international tax registration, or manage payment failures

#### Licence Key Delivery for Software Products
- **Use case:** Client sells a downloadable software tool (template, plugin, CLI tool) — Lemon Squeezy generates and validates licence keys automatically
- **Value:** Built-in licence management — no custom licence validation system needed

---

### 3. Digital Products — Gumroad Alternative

#### When to Recommend Lemon Squeezy Over Gumroad
- **Higher expected volume:** If a client expects >50 sales/month, the fee difference (5% + $0.50 vs. 10%) becomes material
- **Software/licence keys:** Lemon Squeezy has built-in licence key generation; Gumroad does not
- **Cleaner checkout UX:** Lemon Squeezy's checkout is more polished and professional — important for B2B products
- **B2B positioning:** Lemon Squeezy's branding feels more "software company" than "creator marketplace" — better for professional services selling digital products

#### When to Recommend Gumroad Over Lemon Squeezy
- **Free products:** Gumroad allows free products with zero fees; Lemon Squeezy still charges $0.50 minimum per transaction
- **Discover marketplace:** Gumroad's Discover marketplace can surface products to organic buyers; Lemon Squeezy has no equivalent
- **Simpler setup:** Gumroad is faster to set up for basic digital products

---

## Quick-Win Implementations

### Priority 1: Lemon Squeezy Store Setup (2 hours)
1. Create Lemon Squeezy account → complete business verification
2. Configure store settings → branding, currency, payout details
3. Add products → name, description, pricing, file uploads
4. Configure subscriptions (if applicable) → billing cycle, trial, cancellation
5. Set up licence keys (for software products) → generation rules, validation endpoint
6. Test checkout → verify payment processing, email notifications, file delivery
7. Go live

### Priority 2: Webhook Integration (1 hour)
```typescript
// app/api/webhooks/lemon-squeezy/route.ts
import { NextResponse } from 'next/server'
import { validateWebhook } from '@lemonsqueezy/lemonsqueezy.js'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-signature')
  
  const event = await validateWebhook(body, signature, process.env.LEMON_SQUEEZY_WEBHOOK_SECRET)
  
  switch (event.meta.event_name) {
    case 'subscription_created':
      await activateSubscription(event.data)
      break
    case 'subscription_cancelled':
      await deactivateSubscription(event.data)
      break
    case 'order_created':
      await recordSale(event.data)
      break
  }
  
  return NextResponse.json({ received: true })
}
```

### Priority 3: Licence Key Validation API (1 hour)
```typescript
// app/api/validate-license/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { licenseKey, instanceName } = await req.json()
  
  const response = await fetch(`https://api.lemonsqueezy.com/v1/licenses/validate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      license_key: licenseKey,
      instance_name: instanceName,
    }),
  })
  
  const result = await response.json()
  return NextResponse.json(result)
}
```

---

## Resource Budget Planning

**No monthly platform fee:**

| Cost Component | Cost |
|----------------|------|
| Per-transaction fee | 5% + $0.50 |
| Tax compliance | Included |
| Licence key delivery | Included |
| Monthly platform fee | $0 |

**Fee comparison at volume:**

| Monthly Revenue | Lemon Squeezy Fee | Gumroad Fee | Savings |
|----------------|-------------------|-------------|---------|
| $500 | $30.00 | $52.50 | $22.50 |
| $1,000 | $55.00 | $102.50 | $47.50 |
| $2,500 | $130.00 | $252.50 | $122.50 |
| $5,000 | $255.00 | $502.50 | $247.50 |

---

## Risks & Considerations

1. **Stripe acquisition uncertainty:** Lemon Squeezy was acquired by Stripe in late 2025. While pricing and features remain unchanged, the long-term roadmap is uncertain — Stripe may merge Lemon Squeezy into its own product suite or change the pricing model
2. **$0.50 minimum per transaction:** For very low-priced products (e.g., $1–3), the $0.50 fixed fee represents a significant percentage. A $1 product costs $0.55 in fees (55%) — Gumroad's 10% ($0.10) is cheaper at this price point
3. **Monthly payouts (net-30):** Lemon Squeezy pays monthly, 30 days after the end of the month. A sale on January 1st isn't paid until end of February. This is slower than Gumroad's weekly payouts
4. **$50 payout threshold:** Must earn at least $50 before a payout is issued. For low-volume sellers, this can mean delayed payouts
5. **Merchant of Record model:** Like Dodo and Paddle, Lemon Squeezy is the legal seller — not the payment processor. This means less control over the customer experience, chargebacks, and refund policies
6. **Product restrictions:** Certain product categories are restricted (adult content, gambling, weapons, etc.). Verify product eligibility before committing

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Lemon Squeezy store setup (Tier A) | from P3,500 | 2–3 hours labour | 100% |
| SaaS billing setup (Tier C) | Included in P48,000+ build | 3–5 hours integration | 100% |
| Licence key integration | +P2,000 add-on | 1–2 hours | 100% |

**Key insight:** Lemon Squeezy is the lower-fee alternative to Gumroad for international digital product sales. At 5% + $0.50 per transaction (vs. Gumroad's 10%), it saves meaningful money at volume. The built-in licence key delivery makes it the default choice for software products. The Stripe acquisition introduces some uncertainty, but the current offering is strong. Recommend Lemon Squeezy for clients selling software, templates, subscriptions, or digital products where checkout quality and licence management matter. Recommend Gumroad for clients selling free products, relying on the Discover marketplace, or prioritising simple setup over fee optimisation.

---

**End of Lemon Squeezy Integration Strategy**
