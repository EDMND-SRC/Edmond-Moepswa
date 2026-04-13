# Beehiiv Newsletter Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Beehiiv (beehiiv.com)
**Free Tier:** Up to 2,500 subscribers, unlimited email sends, website builder, landing pages, basic analytics

---

## Overview

Beehiiv is a newsletter-first platform designed for creators, consultants, and businesses building content-led audiences. Its free tier (Launch plan) is genuinely capable — unlimited sends to up to 2,500 subscribers, plus a built-in website builder and landing page creator.

For Edmond's service offerings, Beehiiv serves as:

1. **Newsletter platform for content-led clients** — Consultants, advisers, and thought leaders who publish regular content to build authority and generate inbound leads
2. **Email marketing for SME audiences** — Alternative to Mailchimp or Brevo for businesses with 500–2,500 subscribers who need unlimited sends
3. **Audience building for personal brand sites** — Professionals (Boilerplate 2) who combine a marketing site with a regular newsletter to stay top-of-mind
4. **Monetisation-ready platform** — When clients are ready to monetise, Beehiiv's paid tiers offer subscription management, premium content gates, and sponsor marketplace access

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Subscribers | Up to 2,500 |
| Email sends | Unlimited |
| Newsletter website | 1 (built-in website builder) |
| Landing pages | Unlimited |
| Basic analytics | Open rate, click rate, subscriber growth |
| Email editor | Rich-text + code editor |
| Forms and popups | Included |
| Segmentation | Basic (tags, subscriber attributes) |
| Monetisation features | Not available on free tier (requires paid plan) |
| Advanced analytics | Not available on free tier |

**Paid tiers:** Start at $43/month for 1,000 subscribers (all features unlocked — monetisation, advanced analytics, priority support).

---

## By Service Category

### 1. Web Design & Development

#### Newsletter Integration for Personal Professional Services (BP2 — from P28,000)
- **Use case:** Financial adviser, insurance broker, or consultant publishes a monthly market update, regulatory change summary, or practical advice newsletter
- **Implementation:** Beehiiv embed signup form on website → subscriber added to Beehiiv list → monthly newsletter sent via Beehiiv editor
- **Value:** Professional email marketing with unlimited sends. Free tier covers up to 2,500 subscribers — enough for years of organic growth for most solo practitioners

#### Newsletter Signup for Growth Builds (from P19,500)
- **Use case:** Client wants email marketing as part of their growth strategy — Beehiiv provides the email layer, integrated into the Resend-powered transactional email system
- **Division of responsibility:** Resend handles transactional emails (order confirmations, booking reminders). Beehiiv handles marketing emails (newsletters, campaigns, promotions)
- **Value:** Two-purpose email architecture — transactional (Resend) + marketing (Beehiiv) — each optimised for its purpose

---

### 2. Web Applications

#### Newsletter as Lead Nurturing Tool
- **Use case:** SaaS product signup → user automatically subscribed to product newsletter → onboarding series (Day 1: Welcome, Day 3: Key features, Day 7: Advanced tips, Day 30: Upgrade offer)
- **Implementation:** Make.com scenario — new user in Clerk/Supabase → Beehiiv API adds subscriber with tags → Beehiiv automation sends sequence
- **Value:** Automated lead nurturing without building custom email sequences

---

### 3. Workflow Automation

#### Beehiiv + Make.com Integration
- **Use case:** New Beehiiv subscriber → Make.com webhook → create HubSpot contact → tag as "newsletter subscriber" → trigger personalised welcome sequence
- **Value:** Newsletter subscribers flow into the CRM automatically — no manual list management

#### Subscriber Milestone Automations
- **Use case:** Subscriber reaches 6-month mark → Make.com triggers Beehiiv API → send personalised check-in or upsell email
- **Value:** Time-based engagement without manual subscriber management

---

### 4. Advisory & Consulting

#### Newsletter Strategy for Advisory Clients
- **Use case:** Advisory client wants to build thought leadership — recommend Beehiiv as the platform, help design content strategy, set up the newsletter structure
- **Deliverable:** Newsletter strategy document (content pillars, publishing cadence, growth tactics) + Beehiiv setup
- **Pricing:** Included in advisory session output, or quoted as a standalone setup (P2,500–5,000)

---

## Quick-Win Implementations

### Priority 1: Beehiiv Signup Form Embed (30 min)
```html
<!-- Embed on any Next.js page -->
<iframe
  src="https://embeds.beehiiv.com/[your-form-id]"
  frameborder="0"
  scrolling="no"
  style="width: 100%; min-height: 100px; border: none;"
></iframe>
```

Style the surrounding container to match the site's design. Beehiiv's embed forms are responsive and adapt to the container width.

### Priority 2: Beehiiv API Integration (1 hour)
```typescript
// app/api/newsletter/subscribe/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, name } = await req.json()
  
  const response = await fetch('https://api.beehiiv.com/v2/publications/[PUB_ID]/subscriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: 'website',
    }),
  })
  
  return NextResponse.json({ success: response.ok })
}
```

### Priority 3: Newsletter Landing Page (1 hour)
Use Beehiiv's built-in landing page builder to create a standalone signup page for social media sharing, QR code campaigns, or event signups. No website required — the landing page lives at `[publication].beehiiv.com/subscribe`.

---

## Resource Budget Planning

**Free tier covers most growing newsletters:**

| Metric | Typical Usage | Free Limit | Headroom |
|--------|--------------|-------------|----------|
| Subscribers | 100–1,000 (year 1) | 2,500 | ~60%+ |
| Sends/month | 4–8 newsletters | Unlimited | N/A |
| Landing pages | 2–5 | Unlimited | N/A |

**When to upgrade to paid ($43/month):**
- Subscriber count approaches 2,500
- Monetisation needed (paid subscriptions, premium content, sponsor marketplace)
- Advanced analytics required (cohort analysis, attribution, A/B testing)
- Priority support needed

**Growth projection:** A solo professional publishing 2 newsletters/month grows at ~50 subscribers/month from organic website traffic. At this rate, 2,500 subscribers takes ~4 years. The free tier is genuinely sufficient for the entire growth phase for most professional services clients.

---

## Risks & Considerations

1. **No monetisation on free tier:** Paid subscriptions, premium content gates, and sponsor access require a paid plan. If the client's goal is to monetise the newsletter from day one, recommend the paid tier from the start
2. **Limited segmentation on free tier:** Basic tags and attributes only. Complex subscriber segmentation (e.g., "clients who bought X and opened Y in the last 30 days") requires paid features
3. **Beehiiv branding:** Free tier emails include a small "Powered by Beehiiv" footer. This is minimal but should be disclosed to clients who want fully white-label emails
4. **Platform dependency:** Newsletter content, subscriber list, and analytics live on Beehiiv. Export is possible (subscribers, content), but migrating to another platform requires rebuilding automations and re-verifying sending domains
5. **Deliverability on free tier:** Beehiiv's shared sending infrastructure on the free tier is generally reliable, but dedicated IPs (which improve deliverability for large lists) require paid plans

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Newsletter setup for professional site | Included in BP2 (P28,000) | $0 (free tier) | 100% |
| Standalone newsletter launch | P2,500–5,000 | $0 setup cost | 100% |
| Newsletter strategy advisory | P2,500 (advisory session) | $0 | 100% |
| Make.com + Beehiiv integration | +P2,500 add-on | $0 | 100% |

**Key insight:** Beehiiv's free tier (2,500 subscribers, unlimited sends) is the most capable newsletter platform available at zero cost. It is the right choice for professional services clients who want to build authority through regular content publishing, and for any client with a mailing list under 2,500 who needs unlimited marketing emails. Pair with Resend for transactional emails — Beehiiv handles marketing and newsletters, Resend handles order confirmations and booking reminders. The free tier's unlimited sends are a significant advantage over Mailchimp (1,000 sends/month on free tier) and Brevo (300 emails/day).

---

**End of Beehiiv Newsletter Integration Strategy**
