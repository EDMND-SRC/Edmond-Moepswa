# n8n (Self-Hosted) Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** n8n (n8n.io) — Open-source, self-hosted
**Free Tier:** Community Edition — unlimited workflows, unlimited executions, self-hosted

---

## Overview

n8n is an open-source workflow automation platform that serves as an alternative to Make.com for clients who need unlimited workflows without per-operation costs. The self-hosted Community Edition is fully free — the only cost is the server infrastructure to run it.

For Edmond's service offerings, n8n serves as:

1. **Unlimited automation for high-volume clients** — Businesses that exceed Make.com's free tier and find the paid plans uneconomical
2. **Data-sensitive workflows** — Clients who require all data to stay on their own infrastructure (healthcare, financial services, government)
3. **AI-powered automation at cost** — n8n supports OpenAI, Anthropic, and other AI providers with the client's own API key — no platform markup, no credit system
4. **Complex workflow orchestration** — n8n's visual builder supports branching, merging, error handling, and sub-workflows with more flexibility than Make.com for certain patterns

---

## Cost Structure

n8n Community Edition is **free and open-source** (Sustainable Use License). The only costs are infrastructure:

| Component | Free Option | Paid Option |
|-----------|------------|-------------|
| Hosting | Oracle Cloud Free Tier ARM instance (4 OCPU, 24 GB RAM — $0/month) | VPS ($5–20/month), n8n Cloud ($20/month) |
| Database | SQLite (built-in) or Supabase free PostgreSQL | Managed PostgreSQL ($10–25/month) |
| n8n license | Free (Community Edition) | Enterprise license (custom pricing) |

**Total minimum cost: $0/month** when self-hosted on Oracle Cloud Free Tier.

---

## By Service Category

### 1. Workflow Automation

#### Unlimited Workflows for High-Volume Clients
- **Use case:** Client processes 500+ form submissions/month — Make.com free tier (1,000 ops) is exhausted in 2 days. Make.com Core (10,000 ops, $9/month) works but client wants unlimited
- **Solution:** Self-hosted n8n → unlimited workflows → unlimited executions → no per-operation cost
- **Value:** Automation that scales without increasing monthly cost. Client pays for infrastructure (VPS) once, not per operation

#### AI-Powered Workflows at API Cost
- **Use case:** Client wants AI-enhanced lead scoring — each incoming lead is analysed by Claude for fit, priority, and recommended next action
- **Make.com approach:** Core plan ($9/month) + Claude API key. Each AI call consumes Make.com operations
- **n8n approach:** n8n Community Edition (free) + Claude API key. No operation limits — only the Claude API cost applies (~$0.50–2/month for moderate use)
- **Value:** Cheapest possible AI automation. Client pays only for the AI API calls, nothing else

#### Data-Sensitive Workflows (Boilerplate 9 — Financial Services)
- **Use case:** Financial services client requires KYC document processing, lead data, and compliance records to never leave their infrastructure
- **Solution:** n8n self-hosted on client's VPS → all data processing happens within their network → no third-party automation platform handles sensitive data
- **Value:** Compliance advantage. All automation data stays within the client's controlled environment

---

### 2. Web Applications

#### Webhook Processing Pipeline
- **Use case:** High-traffic application receiving hundreds of webhook events/day (form submissions, payment callbacks, real-time notifications)
- **Make.com limitation:** Each webhook trigger + processing = multiple operations. 500 webhooks × 5 steps = 2,500 ops/month — exceeding the free tier
- **n8n advantage:** Unlimited webhook processing. No operation counting. The only limit is server capacity

#### Scheduled Data Syncs
- **Use case:** Daily sync between client's CRM (HubSpot) and internal database (Supabase) — 1,000 contacts, 500 companies
- **Make.com cost:** 1,000 contacts × 2 steps (fetch + update) = 2,000 ops per sync. Daily = 60,000 ops/month — requires Teams plan ($34/month) or above
- **n8n cost:** Free. No operation limits. Runs as a scheduled workflow on the self-hosted instance

---

### 3. Internal Efficiency (Edmond's Own Operations)

#### Project Management Automation
- **Use case:** GitHub PR merged → n8n creates deployment notification → updates project tracker → sends client update email
- **Value:** Unlimited internal automations at zero marginal cost

#### Monthly Client Reporting
- **Use case:** n8n scheduled workflow → fetches analytics from PostHog → fetches uptime from Better Stack → generates PDF report → emails to client
- **Value:** Automated monthly reporting included in retainer packages. No Make.com credit consumption

#### Competitive Intelligence Monitoring
- **Use case:** n8n scheduled workflow → Firecrawl API scrapes competitor sites → AI summarises changes → stores in Google Sheets → notifies Edmond of significant changes
- **Value:** Automated competitor monitoring for SEO and GEO strategy — runs daily at no platform cost

---

## Quick-Win Implementations

### Priority 1: Oracle Cloud Free Tier Deployment (2 hours)
Deploy n8n on Oracle Cloud's always-free ARM instance:

```bash
# SSH into Oracle Free Tier instance (4 OCPU, 24 GB RAM)
# Install n8n via npm
npm install -g n8n

# Run with SQLite database
n8n start --db-type sqlite

# Access at http://your-server-ip:5678
# Configure reverse proxy with Caddy or Nginx + Let's Encrypt SSL
```

This provides a production-grade n8n instance at $0/month — enough capacity for hundreds of concurrent workflows.

### Priority 2: Standard Workflow Templates (3 hours)
Create reusable n8n workflow JSON templates:

- **Contact form → CRM:** Webhook → HTTP Request (HubSpot API) → Email notification
- **Booking confirmation:** Webhook → Calendar API → Email → SMS
- **AI lead scoring:** Webhook → HTTP Request (Claude API) → Database insert → Notification
- **Data sync:** Schedule → HTTP Request (Source API) → Transform → HTTP Request (Destination API) → Log

### Priority 3: Error Handling and Monitoring (1 hour)
Configure n8n's built-in error handling:
- Error workflow triggers on any workflow failure
- Sends notification via email (Resend) or Slack
- Logs error details for debugging
- Optional retry with exponential backoff

---

## Resource Budget Planning

**Self-hosted on Oracle Cloud Free Tier (4 OCPU, 24 GB RAM):**

| Resource | Capacity | Notes |
|----------|---------|-------|
| Workflows | Unlimited | No platform limit |
| Executions | Unlimited | No platform limit |
| Concurrent workflow runs | 50–100+ | Depends on workflow complexity |
| AI API costs | Variable | Client's own OpenAI/Anthropic key (~$1–5/month moderate use) |
| Server cost | $0/month | Oracle Cloud ARM free tier |

**When to consider n8n Cloud ($20/month):**
- Client lacks technical capacity to manage a self-hosted server
- Client prefers managed infrastructure with support
- High availability requirements (n8n Cloud includes redundancy)

**Cost comparison for high-volume client (100,000 ops/month):**

| Platform | Monthly Cost |
|----------|-------------|
| Make.com Core (10K ops) | $9/month (insufficient — need Pro at $29 or Teams at $34) |
| Make.com Pro (50K ops) | $29/month (still insufficient) |
| Make.com Teams (unlimited ops) | $34+/month |
| n8n self-hosted (Oracle Free Tier) | $0/month + server |
| n8n Cloud | $20/month |

---

## Risks & Considerations

1. **Self-hosting responsibility:** n8n Community Edition requires server management, updates, backups, and security patching. This is Edmond's responsibility (or the client's after handover)
2. **Sustainable Use License:** n8n is not fully open-source (MIT). The Sustainable Use License allows free self-hosted use for internal business purposes, but reselling n8n as a service to third parties requires a commercial license
3. **No official support:** Community Edition has community support (forums, Discord) but no SLA or guaranteed response times. For production-critical automations, n8n Cloud ($20/month) provides managed support
4. **Scaling limits:** A single self-hosted instance handles hundreds of workflows comfortably, but thousands of concurrent executions require horizontal scaling — which is an Enterprise feature
5. **Database choice:** SQLite (default) is fine for moderate use. For high-concurrency or multi-user scenarios, use PostgreSQL as the n8n database backend
6. **Version updates:** n8n releases frequent updates. Staying current is important for security and new features, but breaking changes in major versions require migration planning

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Unlimited workflow setup | Quoted per scope (similar to Make.com pricing) | $0 (Oracle Free Tier) | 100% |
| AI-powered automation | +P3,000 per AI step | AI API cost only (~$1–5/month) | ~95% |
| Data-sensitive workflow (self-hosted) | Premium pricing for compliance value | $0–$5/month VPS | 100% |
| Internal automation (Edmond's ops) | N/A — internal tool | $0 | N/A |

**Key insight:** n8n self-hosted is the unlimited, zero-per-operation-cost alternative to Make.com. It is the right choice for clients who exceed Make.com's free tier and find the paid plans uneconomical, or who have data sovereignty requirements that preclude third-party automation platforms. The Oracle Cloud Free Tier provides a genuinely free hosting platform with enough capacity for most SME automation needs. For clients comfortable with Make.com's free tier, stay there — the learning curve of n8n is steeper and the self-hosting responsibility is an ongoing commitment. Use n8n when Make.com's limits are the constraint.

---

**End of n8n (Self-Hosted) Integration Strategy**
