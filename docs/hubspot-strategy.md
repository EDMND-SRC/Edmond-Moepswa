# HubSpot CRM Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** HubSpot CRM (hubspot.com)
**Free Tier:** Up to 1M contacts, 2 users, deal pipeline, email marketing (2,000 sends/month)

---

## Overview

HubSpot CRM is the most capable free customer relationship management platform available. With 1 million contacts, 2 users, a deal pipeline, and basic email marketing included at zero cost, it is the default CRM for Edmond's web builds and automation workflows.

For Edmond's service offerings, HubSpot serves as:

1. **Lead capture destination** — Contact forms and booking enquiries routed from client websites
2. **Deal pipeline management** — Visual sales pipeline for tracking prospects from initial enquiry to closed deal
3. **Email marketing platform** — Basic campaign emails (2,000 sends/month on free tier)
4. **Internal CRM for Edmond's own practice** — Managing prospective clients, active projects, and retainer relationships

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Contacts | Up to 1,000,000 |
| Users | 2 |
| Deal pipelines | 1 pipeline |
| Email marketing sends | 2,000/month |
| Forms | Unlimited |
| Live chat | Not available on free tier |
| Reporting dashboard | Basic (limited reports) |
| Meeting scheduling | 1 meeting link per user |
| Task management | Included |
| Workflow automation | Not available on free tier (requires Starter at $19/user/month) |
| API access | 250,000 calls/day — generous for free tier |

**Note on contact limits:** While HubSpot advertises "up to 1M contacts," recent community reports suggest the practical limit on the free plan is closer to 1,000 contact records for marketing features. Core CRM storage (contact records, deal records, company records) remains unlimited — the limit applies specifically to marketing-eligible contacts.

---

## By Service Category

### 1. Web Design & Development

#### Lead Capture + CRM Routing (Presence/Growth Builds)
- **Use case:** Advanced form on client's website → Make.com webhook → HubSpot contact creation → deal created in pipeline → email notification to sales team
- **Value:** Client gets a fully functional CRM with structured lead tracking — no spreadsheet needed. Included in every Presence (P13,000) and Growth (P19,500) build
- **Alternative:** Google Sheets for clients who prefer to stay within their existing Google Workspace setup. HubSpot is recommended when the client needs a sales pipeline, not just a contact list

#### Google Sheets Alternative CRM
- **When to use Google Sheets instead of HubSpot:**
  - Client has only 1–2 users and needs a simple contact list (not a sales pipeline)
  - Client's team is already comfortable with Google Sheets
  - Client doesn't need deal tracking, email marketing, or reporting
- **When to use HubSpot:**
  - Client needs a visual sales pipeline (deal stages: New → Qualified → Proposal → Won/Lost)
  - Client wants email marketing capability built in
  - Client expects to grow beyond a simple contact list

---

### 2. Web Applications

#### CRM Integration for Boilerplate Builds
- **Boilerplate 2 (Professional Services):** Lead capture form → HubSpot deal → tracks discovery call → proposal → engagement
- **Boilerplate 3 (Food/Catering):** Catering enquiry → HubSpot contact → deal pipeline: Enquiry → Quote Sent → Deposit Paid → Event Completed
- **Boilerplate 5 (Events/Photography):** Booking enquiry → HubSpot → pipeline: Enquiry → Availability Confirmed → Booked → Event Done → Review Requested
- **Value:** Industry-specific deal pipelines configured during the boilerplate build — the client's CRM is ready to use on day one

---

### 3. Workflow Automation

#### Make.com + HubSpot Integration
- **Use case:** The most common automation pattern — form submission → Make.com → HubSpot contact + deal creation
- **Make.com HubSpot module:** Native integration — no custom code needed. Create contacts, companies, deals, notes, and tasks
- **Credit cost:** 3–5 operations per lead (trigger → create contact → create deal → add note → notify)

#### HubSpot Webhook → Internal Notification
- **Use case:** New deal created in HubSpot → webhook → Make.com → Slack notification to Edmond or client
- **Value:** Real-time lead notification — no need to check HubSpot manually

#### AI Lead Enrichment via Firecrawl
- **Use case:** New HubSpot contact with company URL → Make.com triggers Firecrawl scrape → company summary appended to HubSpot contact notes
- **Value:** Enriched lead data before the first conversation. Knowing the prospect's services, pricing, and market position before the discovery call is a significant advantage

---

### 4. Internal Use (Edmond's Own Practice)

#### Pipeline Management for Edmond's Business
- **Deal stages:** Lead → Discovery Call Booked → Proposal Sent → Negotiation → Won → Lost
- **Contact properties:** Service interest (Web Design, Automation, SEO, Advisory), budget range, timeline, source (website, referral, Upwork)
- **Email sequences:** Follow-up sequence for proposal recipients (Day 3: Check-in, Day 7: Address concerns, Day 14: Final follow-up)
- **Value:** Structured business development process — no leads fall through the cracks, pipeline health is visible at a glance

#### Retainer Client Tracking
- **Contacts:** All retainer clients tagged with "retainer" + service type
- **Deals:** Recurring deal created monthly/quarterly for retainer invoicing
- **Tasks:** Monthly report delivery, strategy session scheduling, health check reviews
- **Value:** Centralised view of all ongoing client relationships

---

## Quick-Win Implementations

### Priority 1: HubSpot Form + Make.com Webhook (1 hour)
```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  
  // Option A: Send directly to HubSpot API
  await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        email: body.email,
        firstname: body.name,
        message: body.message,
        lead_source: body.source || 'website',
      },
    }),
  })
  
  return NextResponse.json({ success: true })
}
```

### Priority 2: Standard Deal Pipeline Template (30 min)
Create a reusable deal pipeline for common business types:

```
Professional Services Pipeline:
1. New Enquiry → 2. Discovery Call Scheduled → 3. Qualified → 4. Proposal Sent → 5. Negotiation → 6. Won / 7. Lost

E-commerce Pipeline:
1. New Lead → 2. Product Interest Logged → 3. Quote Sent → 4. Order Placed → 5. Fulfilled → 6. Follow-up Sent
```

### Priority 3: HubSpot Tracking Code Installation (15 min)
```typescript
// Install HubSpot tracking code to track website visitors who are known contacts
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* HubSpot tracking */}
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-eu1.hs-scripts.com/[HUBSPOT_PORTAL_ID].js"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Resource Budget Planning

**Free tier covers most SME CRM needs:**

| Resource | Typical Usage | Free Limit | Headroom |
|----------|--------------|-------------|----------|
| Contacts | 100–5,000 | 1,000,000 | ~99%+ |
| Users | 1–2 | 2 | Full or needs upgrade |
| Email sends | 200–1,000/month | 2,000/month | ~50%+ |
| API calls | 1,000–10,000/day | 250,000/day | ~96%+ |

**When to upgrade to Starter ($19/user/month):**
- More than 2 users need CRM access
- Workflow automation needed (auto-assign leads, nurture sequences, task creation)
- More than 2,000 email sends/month needed
- Custom reporting dashboards required
- Live chat widget needed on website

---

## Risks & Considerations

1. **2-user limit on free tier:** Only 2 people can access the CRM. If a client's team has 3+ salespeople, upgrade to Starter ($19/user/month) or use Google Sheets as the shared contact list
2. **No workflow automation on free tier:** HubSpot's workflow builder (if contact does X, then do Y) requires Starter. Automation must be handled externally via Make.com
3. **Contact limit ambiguity:** HubSpot's community reports suggest marketing contact limits on the free tier may be closer to 1,000 than 1M. Core CRM records (contacts without marketing eligibility) remain unlimited. Clarify with the client what they need — a contact list or a marketing database
4. **HubSpot data lock-in:** HubSpot's CRM data is exportable (CSV), but workflow automations, deal pipelines, and email templates are not easily portable. Once a client is invested in HubSpot, switching is painful
5. **Email marketing limits:** 2,000 sends/month on free tier is sufficient for most SMEs but limiting for newsletter publishers. Use Beehiiv for newsletters, HubSpot for transactional and sales emails
6. **EU vs. US data residency:** HubSpot offers EU data residency (js-eu1.hs-scripts.com). For clients with GDPR concerns, configure the EU endpoint

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| CRM setup in web build | Included in Presence/Growth | $0 (free tier) | 100% |
| CRM setup standalone | P1,500 | 1 hour labour | 100% |
| Make.com + HubSpot integration | Included in automation price | $0 | 100% |
| Deal pipeline configuration | Included in boilerplate builds | $0 | 100% |

**Key insight:** HubSpot's free tier (1M contacts, 2 users, deal pipeline) is the most capable free CRM available — it is the default choice for every Edmond build that includes lead capture. The 2-user limit is the most common upgrade trigger, and the absence of workflow automation on the free tier means Make.com must handle all automation logic. For clients who need more than 2 users or want HubSpot-native workflows, the Starter plan ($19/user/month) is the entry point — disclose this at scoping.

---

**End of HubSpot CRM Integration Strategy**
