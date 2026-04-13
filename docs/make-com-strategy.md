# Make.com Automation Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Make.com (make.com)
**Free Tier:** 1,000 operations/month, 2 active scenarios, 100 MB data transfer

---

## Overview

Make.com is the primary automation and workflow orchestration platform for Edmond's service offerings. It connects to 3,000+ applications and handles everything from simple trigger-to-action workflows to multi-branch, AI-enhanced orchestration. For standard modules, the credit model is transparent: 1 action step = 1 credit.

**Important note on credit consumption:** Scenarios using iterators or aggregators (which process lists or batched data) consume one credit per item processed, not per scenario run. A 2-step scenario that iterates over 200 records consumes 200 credits, not 2. This is the most common cause of unexpected free-tier exhaustion.

For Edmond's service offerings, Make.com serves as:

1. **Client automation delivery** — The core product of the Workflow Automation service (Foundation Scenario from P2,500, add-ons beyond)
2. **Lead routing** — Contact form → CRM, booking → calendar notification, payment → confirmation email
3. **AI-enhanced workflows** — OpenAI/Claude integration for content generation, data classification, sentiment analysis, and document processing (requires Core plan + client's own API key)
4. **Internal efficiency** — Automating Edmond's own processes: lead enrichment, project tracking, proposal generation

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Operations (credits) | 1,000/month |
| Active scenarios | 2 |
| Data transfer | 100 MB/month |
| Scenario runs (execution history) | Kept for 14 days |
| Webhooks | Unlimited (webhook receivers are free; operations consumed per trigger) |
| AI module (OpenAI/Anthropic) | Not available on free tier (Core plan + required) |
| Team members | 1 user |

**Paid tiers:**
- **Core ($9/month, billed annually / $10.59/month monthly):** 10,000 operations, unlimited scenarios, AI module with own API key
- **Pro ($19/month, billed annually / $29/month monthly):** 50,000 operations, advanced scenario branching, custom webhooks

---

## By Service Category

### 1. Workflow Automation (Core Service)

#### Foundation Scenario (from P2,500) — Primary Product
- **Use case:** One Make.com scenario — a single, clearly scoped trigger-to-action workflow — discovered, built, tested, deployed, and documented
- **Examples:**
  - Contact form submission → HubSpot contact creation → email notification to sales team
  - Cal.com booking → Google Calendar event → SMS confirmation via Twilio
  - Payment received (DPO callback) → invoice generation → email to customer
- **Design principle:** Fit within the free tier (1,000 ops/month, 2 scenarios) when possible. If the client's volume requires more, disclose the Core plan ($9/month) at scoping

#### Multi-Scenario Automation Systems
- **Use case:** Connected workflows — form submission triggers scenario 1 (CRM update) which triggers scenario 2 (welcome email) which triggers scenario 3 (task assignment)
- **Pricing:** Each additional scenario is +P2,000. Design to share data via webhooks or shared database (Google Sheets, Airtable, Supabase) to minimise operation consumption
- **Credit planning:** Map expected monthly operation count before building. A 5-step scenario running 200 times/month = 1,000 credits (exactly the free tier limit)

#### AI-Enhanced Workflows (Core Plan Required)
- **Use case:** As of November 2025, Core plan users can connect their own OpenAI or Anthropic API keys directly — paying their AI provider at cost rather than through Make's internal credit model
- **Examples:**
  - Incoming lead email → AI classifies sentiment and priority → routes to appropriate team member
  - Form submission with business description → AI generates a brief company summary → appends to CRM
  - Monthly content calendar → AI suggests blog topics based on competitor analysis data
- **Cost note:** Client supplies their own OpenAI/Anthropic API key. AI token costs are billed by the AI provider (typically $1–5/month for moderate use). Make.com scenario operations still count toward the Core plan's 10,000 ops.

---

### 2. Web Design & Development

#### Lead Capture + CRM Routing (Included in Presence/Growth Builds)
- **Use case:** Advanced form on client's website → Make.com webhook → HubSpot contact creation (free tier, up to 1M contacts) or Google Sheets row
- **Setup:** Next.js form → `fetch('/api/webhook')` → Make.com webhook receiver → CRM action
- **Value:** Included in every Presence and Growth build. Client gets structured lead storage without any additional cost

#### Post-Launch Notifications
- **Use case:** Website goes live → Make.com scenario monitors Better Stack uptime check → sends notification to Edmond and client
- **Value:** Simple but professional — shows attention to operational detail

---

### 3. Workflow Automation Add-Ons

#### Conditional Logic / Router (+P1,200)
- **Use case:** Form submission → router → if message contains "quote" → route to sales CRM. If message contains "support" → route to support ticket system
- **Credit impact:** Router counts as 1 operation per branch evaluated. A 3-branch router evaluating all branches = 3 operations per trigger

#### Iterator / Aggregator (+P1,500)
- **Use case:** Fetch all new rows from Google Sheets → for each row, create a HubSpot contact → send confirmation email
- **Credit impact:** **WARNING** — each item processed consumes 1 credit. Processing 200 rows = 200 credits, not 1. This is the single biggest cause of free-tier overruns
- **Design principle:** Use filters before iterators to process only new/changed items, not the entire dataset

#### Custom API / Webhook Integration (+P2,500 per endpoint)
- **Use case:** DPO PayGate payment callback → Make.com webhook → validate signature → update order status in Supabase → send confirmation email
- **Value:** Connects payment gateways and custom APIs that don't have native Make.com modules

#### SMS Notification System (+P3,500)
- **Use case:** Booking confirmed → Make.com → Twilio SMS to client → delivery confirmation logged in Google Sheets
- **Credit impact:** 3–5 operations per SMS (trigger → Twilio → log → notification). At 100 SMS/month = 300–500 operations

#### WhatsApp API Integration (+P5,000)
- **Use case:** Order placed → Make.com → WhatsApp Business API message → delivery status tracked
- **Requirements:** Client must hold approved Meta Business verification. Approval is not guaranteed and is at Meta's discretion
- **Credit impact:** WhatsApp API messages are conversation-based (24-hour session). Multiple messages within one session = 1 conversation cost + Make.com operations

---

### 4. Internal Efficiency (Edmond's Own Operations)

#### Lead Enrichment Pipeline
- **Use case:** Discovery call booking via Cal.com → Make.com triggers → Firecrawl scrapes prospect's company website → summary appended to HubSpot contact record
- **Value:** Edmond walks into every discovery call knowing the prospect's business, services, and potential pain points
- **Credit cost:** ~15 operations per lead (Cal.com webhook → Firecrawl → HubSpot → notification)

#### Proposal Follow-Up Automation
- **Use case:** Proposal sent (tracked in Google Sheets) → 7-day delay → if no status change → send follow-up email via Resend
- **Value:** Systematic follow-up without manual tracking

#### Project Handover Checklist
- **Use case:** Project marked "complete" in task tracker → Make.com generates handover email (documentation links, support contact, retainer offer) → sends to client
- **Value:** Consistent, professional handover process across all projects

---

## Quick-Win Implementations

### Priority 1: Standard Webhook Receiver (30 min)
```typescript
// app/api/webhooks/make/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  // Validate webhook signature if applicable
  // Process the payload
  return NextResponse.json({ received: true })
}
```

### Priority 2: Credit Monitoring Dashboard (1 hour)
Set up a Google Sheet that Make.com updates after each scenario run:
- Scenario name
- Operations consumed
- Timestamp
- Success/failure status

Review monthly to understand actual usage patterns and plan for upgrades.

### Priority 3: Error Handling Template (1 hour)
Every scenario should include:
- Error handler route (catches failures)
- Failure notification (email or Slack message with error details)
- Retry logic (for transient failures)

```
[Trigger] → [Router]
              ├── [Success path] → [Actions] → [Log success]
              └── [Error path] → [Notify failure] → [Retry or escalate]
```

---

## Operation Budget Planning

**Free tier (1,000 ops/month) allocation examples:**

| Scenario | Steps | Runs/Month | Total Ops |
|----------|-------|-----------|-----------|
| Contact form → CRM | 5 | 50 | 250 |
| Booking confirmation → Email + SMS | 7 | 30 | 210 |
| Daily data sync (Google Sheets → HubSpot) | 8 | 30 | 240 |
| **Total** | | | **700** |
| **Buffer** | | | **300** |

**When to recommend Core plan ($9/month):**
- Client has more than 2 scenarios (free tier limit)
- Monthly operations consistently exceed 800 (leave headroom)
- AI integration needed (Core plan required for custom API keys)
- Operations health monitoring needed (longer execution history)

**Iterator/aggregator warning:** If a scenario processes lists, calculate: `items_per_run × steps_per_item × runs_per_month`. A weekly sync of 500 contacts through a 3-step iterator = 1,500 ops/week = 6,000 ops/month — far exceeding the free tier.

---

## Risks & Considerations

1. **Credit surprise with iterators:** The most common cause of free-tier exhaustion. A scenario processing 200 items through 5 steps = 1,000 credits in a single run. Always estimate iterator consumption conservatively
2. **Scenario limits on free tier:** Only 2 active scenarios. A third scenario requires upgrading to Core ($9/month). Design automations to fit within 2 scenarios when possible by combining logic
3. **Data transfer limit (100 MB/month):** Large file transfers (attachments, images) through Make.com consume this quickly. Use direct URLs — pass a link to the file rather than transferring the file itself through Make
4. **Error handling is manual:** Make.com does not automatically retry failed operations. Every scenario needs explicit error routes and retry logic
5. **Meta verification dependency:** WhatsApp API integration requires client's Meta Business verification. If rejected (not guaranteed), the automation cannot be activated. This risk should be communicated at scoping
6. **Rate limiting:** Make.com rate-limits API calls to connected services. High-volume scenarios may need scheduling adjustments (e.g., process in batches rather than real-time)

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Foundation Scenario | P2,500 | $0 (free tier) | 100% |
| Additional scenario | +P2,000 | $0–$9/month | 100% |
| Conditional logic (router) | +P1,200 | $0 | 100% |
| Iterator/aggregator | +P1,500 | $0 (if within free tier) | 100% |
| Custom API/webhook | +P2,500 | $0 | 100% |
| AI step (Core plan) | +P3,000 | $9/month + AI API costs | ~85% |
| SMS notifications | +P3,500 | ~$10/month for 100 SMS (client pays Twilio) | 100% |

**Key insight:** Make.com's free tier (1,000 ops, 2 scenarios) is sufficient for most individual client automations — a contact form route, a booking confirmation, or a data sync. The Core plan ($9/month) is the first meaningful upgrade and should be recommended when a client needs 3+ scenarios or AI integration. The critical design principle is **operation awareness**: always estimate monthly consumption before building, especially for scenarios using iterators. A single poorly designed iterator can consume a month's free-tier allocation in one run.

---

**End of Make.com Automation Integration Strategy**
