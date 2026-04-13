# Paddle Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Paddle (paddle.com) — Merchant of Record
**Free Tier:** No monthly fee on pay-as-you-go plan — 5% + $0.50 per transaction

---

## Overview

Paddle is a Merchant of Record (MoR) platform built specifically for SaaS and software businesses. It handles payment processing, global tax compliance, subscription management, fraud prevention, and revenue operations in a single platform. Like Dodo Payments and Lemon Squeezy, Paddle is the legal seller — the client doesn't need to register for tax in any jurisdiction.

For Edmond's practice, Paddle serves as:

1. **SaaS billing for Tier C applications** — Subscription management with built-in tax compliance for custom SaaS products
2. **International SaaS MoR alternative** — Competing with Dodo Payments and Lemon Squeezy for clients selling software internationally
3. **Revenue operations platform** — Paddle provides analytics, churn management, and revenue forecasting beyond basic payment processing
4. **Enterprise-grade MoR** — For larger SaaS clients where Paddle's maturity (founded 2012, processing $2B+ annually) provides confidence

---

## Cost Structure (2026)

| Item | Cost |
|------|------|
| Monthly platform fee | $0 (pay-as-you-go plan) |
| Per-transaction fee | 5% + $0.50 |
| Payment processing | Included in the 5% + $0.50 |
| Tax compliance | Included (Merchant of Record) |
| Subscription management | Included |
| Fraud prevention | Included |
| Revenue analytics | Included |
| Payout schedule | Weekly or monthly |
| Supported currencies | 200+ currencies, 100+ payment methods |

**Custom pricing:** Available for businesses processing $50,000+/month — typically lower percentage rates.

**Fee comparison with alternatives:**

| Platform | Fee | Monthly Fee | Best For |
|----------|-----|-------------|----------|
| Paddle | 5% + $0.50 | $0 | SaaS, software, subscriptions |
| Lemon Squeezy | 5% + $0.50 | $0 | Digital products, software, subscriptions |
| Dodo Payments | ~5–8% + processing | $0 | International digital products |
| Gumroad | 10% flat | $0 | Creator content, simple digital products |

---

## By Service Category

### 1. Web Applications — Tier C (Custom SaaS from P48,000)

#### Primary SaaS Billing Platform
- **Use case:** Custom SaaS product with subscription tiers, usage-based billing, free trials, and coupon codes
- **Paddle capability:** Subscription lifecycle management (create, upgrade, downgrade, cancel), proration, dunning management (failed payment recovery), trial periods, coupon codes, usage-based billing
- **Integration:** Paddle Checkout → webhook to application → subscription activation → recurring billing managed by Paddle
- **Value:** Full SaaS billing infrastructure with tax compliance. The client sells globally without registering for VAT, sales tax, or digital services tax in any jurisdiction

#### Churn Management and Revenue Analytics
- **Use case:** Paddle's built-in analytics provide churn rate, MRR, ARPU, and revenue forecasts — data the client needs to make business decisions
- **Value:** Business intelligence included in the payment platform. No separate analytics tool needed for subscription metrics

---

### 2. Advisory & Consulting

#### MoR Platform Selection Advisory
- **Use case:** Client needs to choose between Paddle, Lemon Squeezy, Dodo Payments, and Stripe + TaxJar for their SaaS product
- **Deliverable:** Platform comparison based on product type, expected volume, target markets, and pricing — with recommendation
- **Paddle's positioning:** Best for established or scaling SaaS products where Paddle's maturity, analytics, and churn management features justify choosing it over newer alternatives
- **Pricing:** Included in advisory session (P2,500) or Half-Day Working Session (P6,500)

---

## Quick-Win Implementations

### Priority 1: Paddle Checkout Integration (2 hours)
```typescript
// app/api/checkout/paddle/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { priceId, customerEmail } = await req.json()
  
  const response = await fetch('https://api.paddle.com/checkout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [{ price_id: priceId, quantity: 1 }],
      customer: { email: customerEmail },
      success_url: 'https://yoursite.com/success?checkout_id={{checkout.id}}',
    }),
  })
  
  const checkout = await response.json()
  return NextResponse.json({ url: checkout.data.url })
}
```

### Priority 2: Webhook Handler for Subscription Events (2 hours)
```typescript
// app/api/webhooks/paddle/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const events = await req.json()
  
  for (const event of events) {
    switch (event.event_type) {
      case 'subscription.created':
        await activateSubscription(event.data)
        break
      case 'subscription.updated':
        await updateSubscription(event.data)
        break
      case 'subscription.canceled':
        await cancelSubscription(event.data)
        break
      case 'payment.succeeded':
        await recordPayment(event.data)
        break
    }
  }
  
  return NextResponse.json({ received: true })
}
```

### Priority 3: Paddle Analytics Dashboard Integration (1 hour)
Use Paddle's API to surface subscription metrics in the client's admin dashboard:
- MRR, ARR, churn rate, active subscriptions
- Revenue by plan, coupon usage, trial conversion rates

---

## Resource Budget Planning

**No monthly platform fee:**

| Cost Component | Cost |
|----------------|------|
| Per-transaction fee | 5% + $0.50 |
| Tax compliance | Included |
| Subscription management | Included |
| Monthly platform fee | $0 |

**Fee comparison at SaaS volume:**

| Monthly MRR | Paddle Fee | Stripe + TaxJar (~$100/mo + 2.9%+$0.30) |
|-------------|-----------|----------------------------------------|
| $1,000 | $55.00 | ~$129.00 |
| $5,000 | $255.00 | ~$245.00 |
| $10,000 | $505.00 | ~$390.00 |
| $50,000 | Custom pricing (~$1,500–2,000) | ~$1,550.00 |

**Crossover point:** At ~$5,000 MRR, Stripe + TaxJar becomes slightly cheaper. Below that, Paddle is more economical and significantly simpler (no separate tax registration).

---

## Risks & Considerations

1. **Merchant of Record model:** Paddle is the legal seller — less control over customer experience, refund policies, and chargebacks. The client's brand is subordinated to Paddle's checkout experience
2. **Product restrictions:** Paddle has specific product category restrictions (no adult content, gambling, weapons, certain crypto products, etc.). Verify product eligibility before committing
3. **Approval process:** Paddle reviews and approves each product before it can go live. This can take 1–3 business days. Unlike Lemon Squeezy or Gumroad (which allow immediate listing), Paddle has a gatekeeping step
4. **Pricing parity with Lemon Squeezy:** Both charge 5% + $0.50. The differentiator is Paddle's maturity, analytics, and SaaS-specific features vs. Lemon Squeezy's simplicity and faster setup
5. **Custom pricing threshold:** At $50,000+/month, negotiate custom pricing. Don't stay on the 5% + $0.50 plan at that volume
6. **Payout timing:** Weekly or monthly payouts depending on account maturity. New accounts may have longer hold periods (Paddle manages fraud risk for the MoR relationship)

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| SaaS billing setup (Tier C) | Included in P48,000+ build | 5–8 hours integration | 100% |
| MoR platform advisory | Included in advisory session | $0 | 100% |
| Revenue analytics integration | +P2,000 add-on | 1–2 hours | 100% |

**Key insight:** Paddle is the mature, SaaS-focused Merchant of Record — the best choice for custom SaaS products (Tier C) where subscription management, churn analytics, and revenue operations matter. At 5% + $0.50 per transaction (no monthly fee), it is cost-competitive with all alternatives for businesses under $5,000 MRR. For higher volumes, custom pricing should be negotiated. Paddle's main advantages over Lemon Squeezy are its maturity (founded 2012), deeper SaaS-specific features, and more robust analytics. Its main disadvantage is the product approval process, which adds 1–3 days to go-live. For Edmond's Tier C SaaS builds, Paddle should be evaluated alongside Dodo Payments and Lemon Squeezy at the scoping stage — the right choice depends on the client's specific product type, target markets, and growth expectations.

---

**End of Paddle Integration Strategy**
