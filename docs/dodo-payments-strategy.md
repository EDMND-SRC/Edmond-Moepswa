# Dodo Payments Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Dodo Payments (dodopayments.com)
**Free Tier:** No monthly platform fee — percentage-based per-transaction fee. Standard payouts free (USD SWIFT $25 fee applies).

---

## Overview

Dodo Payments operates as a Merchant of Record (MoR) — it legally sells the product on behalf of the seller, handles tax compliance across 150+ countries, and remits the net revenue. This eliminates the seller's need to register for VAT/sales tax in multiple jurisdictions, making it ideal for international digital product and SaaS sales.

For Edmond's service offerings, Dodo Payments serves as:

1. **Tier A — Starter Storefront** — Hosted product page at store.dodopayments.com/[store] for selling digital products, SaaS, and subscriptions internationally
2. **International payment gateway** — For Botswana-based businesses selling to international customers where Stripe is unavailable
3. **Tax and compliance handling** — Dodo manages sales tax, VAT, and digital services tax across 150+ countries — the seller receives net revenue without tax registration overhead
4. **Boilerplate payment integration** — E-commerce stores (Boilerplate 6) and SaaS products (Tier C) that need international payment processing

---

## Cost Structure (2026)

| Item | Cost |
|------|------|
| Monthly platform fee | $0 (standard tier) |
| Per-transaction fee | Percentage-based (varies by product type and volume — typically 5–8% + payment processing) |
| Payout fee (USD SWIFT) | $25 per payout |
| Payout schedule | Standard — typically weekly or bi-weekly |
| Tax compliance | Included in transaction fee (Merchant of Record) |
| Supported currencies | 80+ currencies |
| Supported countries | 150+ countries for payment acceptance |

**Key advantage:** As a Merchant of Record, Dodo handles all tax compliance — the seller doesn't need to register for VAT, sales tax, or digital services tax in any jurisdiction. This alone can save thousands in compliance costs for international sellers.

---

## By Service Category

### 1. Web Applications — Tier A (Starter Storefront from P2,500)

#### Dodo Payments Storefront Setup
- **Use case:** Client needs to start selling digital products, SaaS, or services internationally — without building a full website
- **Deliverables:**
  - Dodo merchant account setup and configuration
  - Store branding (name, logo, colour theme)
  - Product listing — pricing tiers, descriptions, file uploads or SaaS access configuration
  - Subscription product setup (if applicable) — billing cycle, trial period, cancellation policy
  - Test mode walkthrough + live mode handover
  - Written documentation: how to add products, manage orders, update the store
- **Value:** International storefront live within days. Handles tax compliance automatically. No website required.
- **Best for:** Digital products, SaaS, services, and subscriptions sold to international customers

#### Subscription and Recurring Billing
- **Use case:** Client offers a monthly subscription product (SaaS tool, membership, content access)
- **Dodo capability:** Native recurring billing — Dodo handles trial periods, proration, failed payment retries, and cancellation
- **Value:** Full subscription management without building billing logic. Dodo handles dunning (failed payment recovery), tax on recurring charges, and receipt generation

---

### 2. Web Applications — Boilerplate 6 (E-commerce Store from P35,000)

#### International Payment Gateway
- **Use case:** E-commerce store selling physical or digital products to international customers
- **Integration:** Dodo Payments API or hosted checkout → Next.js frontend → order confirmation → fulfilment workflow
- **Value:** Accept payments from 150+ countries in 80+ currencies. Tax compliance handled automatically. No need for separate tax registration in each market
- **Botswana context:** Dodo accepts payments from Botswana-registered businesses — unlike Stripe, which does not support Botswana merchant accounts

#### Hybrid Payment Strategy (Local + International)
- **Use case:** Client sells to both local (Botswana) and international customers
- **Strategy:** DPO PayGate for local BWP payments + Dodo Payments for international USD/multi-currency payments
- **Implementation:** Website detects visitor location (via IP geolocation) → shows appropriate payment gateway → local customers pay in BWP via DPO, international customers pay via Dodo
- **Value:** Maximum market coverage — local and international customers each get the most convenient payment experience

---

### 3. Web Applications — Tier C (Custom SaaS from P48,000)

#### SaaS Billing and Subscription Management
- **Use case:** Custom SaaS product with tiered pricing (Free, Pro at $29/month, Enterprise at $99/month)
- **Dodo capability:** Subscription management, usage-based billing (if supported), coupon codes, upgrade/downgrade handling, proration
- **Integration:** Dodo checkout → webhook to application → activate user's subscription tier → recurring billing managed by Dodo
- **Value:** Full SaaS billing infrastructure without building payment processing, tax compliance, or subscription management from scratch

---

### 4. Advisory & Consulting

#### International Expansion Advisory
- **Use case:** Botswana-based business wants to sell internationally → needs payment processing, tax compliance, and pricing strategy guidance
- **Deliverable:** Payment gateway recommendation (Dodo vs. Paddle vs. Lemon Squeezy vs. PayPal), pricing strategy, compliance briefing
- **Pricing:** Included in advisory session (P2,500) or Half-Day Working Session (P6,500)

---

## Quick-Win Implementations

### Priority 1: Dodo Storefront Setup (2 hours)
Standard setup workflow:
1. Create Dodo merchant account → complete business verification (business registration documents, identity verification)
2. Configure store settings → branding, currency, payout details
3. Add products → name, description, pricing, files (for digital products) or access URL (for SaaS)
4. Configure subscription products (if applicable) → billing cycle, trial, cancellation terms
5. Test checkout flow → verify payment processing, email notifications, delivery
6. Go live → share storefront URL with client

### Priority 2: Dodo API Integration (3 hours)
For custom Next.js storefronts:
```typescript
// app/api/checkout/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { productId, customerEmail } = await req.json()
  
  const response = await fetch('https://api.dodopayments.com/v1/checkouts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DODO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      customer: { email: customerEmail },
      success_url: 'https://yoursite.com/success',
      cancel_url: 'https://yoursite.com/cancel',
    }),
  })
  
  const checkout = await response.json()
  return NextResponse.json({ url: checkout.url })
}
```

### Priority 3: Webhook Handler for Subscription Events (2 hours)
```typescript
// app/api/webhooks/dodo/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const event = await req.json()
  
  switch (event.type) {
    case 'subscription.created':
      // Activate user's subscription in the application
      await activateSubscription(event.data)
      break
    case 'subscription.cancelled':
      // Downgrade user's access
      await downgradeSubscription(event.data)
      break
    case 'payment.succeeded':
      // Log payment, update usage metrics
      await recordPayment(event.data)
      break
  }
  
  return NextResponse.json({ received: true })
}
```

---

## Resource Budget Planning

**No monthly platform fee:**

| Cost Component | Typical Cost | Notes |
|----------------|-------------|-------|
| Per-transaction fee | 5–8% + payment processing | Varies by product type and volume |
| SWIFT payout fee | $25 per payout | For USD payouts to non-US bank accounts |
| Tax compliance | Included | MoR handles all tax registration and remittance |
| Monthly platform fee | $0 | No monthly cost |

**Cost comparison for a $50/month SaaS subscription:**

| Platform | Per-Transaction Fee | Monthly Fee | Net on $50 |
|----------|--------------------|-------------|-----------|
| Dodo Payments | ~5–8% + processing | $0 | ~$44–46 |
| Paddle | 5% + $0.50 | $0 | ~$47 |
| Lemon Squeezy | 5% + $0.50 | $0 | ~$47 |
| Stripe + tax tool | 2.9% + $0.30 + tax tool (~$100/month) | $100 | ~$47 (at scale) |

**When Dodo becomes expensive:** At high transaction volumes, the percentage-based fee accumulates. For businesses processing $50,000+/month, a direct Stripe integration with a separate tax compliance tool (e.g., TaxJar) may be more economical — but the complexity and compliance overhead are significantly higher.

---

## Risks & Considerations

1. **Merchant account approval:** Dodo requires business verification. Approval is not automatic — it depends on business registration, identity verification, and product type compliance. The application process can take several business days
2. **SWIFT payout fee ($25):** Each payout to a non-US bank account incurs a $25 SWIFT fee. For small-volume sellers, this means batching payouts to minimise frequency. Weekly payouts at low volume mean $25/week in fees — monthly payouts reduce this to $25/month
3. **Not a local BWP gateway:** Dodo settles in USD and other major currencies — not Botswana Pula. It is for international sales, not local Botswana transactions. For local BWP settlement, use DPO PayGate or Orange Money
4. **Merchant of Record model:** Dodo is the legal seller of the product — not the payment processor. This means Dodo sets the terms of service, handles refunds, and manages chargebacks. The seller has less control over the customer relationship
5. **Product restrictions:** Dodo has restrictions on certain product categories (adult content, gambling, weapons, etc.). Verify product eligibility before committing to the platform
6. **Limited customisation:** The hosted Dodo storefront has limited design customisation. For clients who want a fully branded checkout experience, a custom Next.js storefront with Dodo API integration is needed

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Dodo Storefront setup (Tier A) | from P2,500 | 2–3 hours labour | 100% |
| E-commerce payment integration (BP6) | Included in P35,000 build | 3–5 hours integration | 100% |
| SaaS billing setup (Tier C) | Included in P48,000+ build | 5–8 hours integration | 100% |
| Hybrid payment strategy (local + international) | Custom quote | 4–6 hours setup | 100% |

**Key insight:** Dodo Payments is the most practical international payment solution for Botswana-based businesses. It accepts payments from 150+ countries, handles all tax compliance as a Merchant of Record, charges no monthly fee, and settles in 80+ currencies. The per-transaction fee (5–8% + processing) is competitive with alternatives (Paddle, Lemon Squeezy) and far simpler than building a Stripe + tax tool integration. The $25 SWIFT payout fee is the main cost concern for low-volume sellers — mitigated by batching payouts monthly rather than weekly. For local BWP transactions, pair Dodo with DPO PayGate to cover both domestic and international markets.

---

**End of Dodo Payments Integration Strategy**
