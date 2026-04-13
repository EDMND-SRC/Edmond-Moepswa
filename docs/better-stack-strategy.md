# Better Stack Monitoring Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Better Stack (betterstack.com) — formerly Better Uptime
**Free Tier:** 3 monitors, 15-minute check interval, email notifications

---

## Overview

Better Stack provides uptime monitoring, incident management, and log management in a single platform. Its free tier monitors 3 websites/services with 15-minute check intervals and email notifications — sufficient for ensuring critical client sites don't go unnoticed when they fail.

For Edmond's service offerings, Better Stack serves as:

1. **Uptime monitoring for all live client sites** — Ensure sites are accessible and responding correctly
2. **Incident alerting** — Email notifications when a site goes down, with status page for transparency
3. **Performance monitoring** — Track page load times from multiple geographic locations
4. **Retainer service deliverable** — Monthly performance and availability reports included in the Foundation Cover retainer (from P2,500/month)

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Monitors | 3 |
| Check interval | 15 minutes |
| Monitoring locations | 3 regions (limited on free tier) |
| Notifications | Email |
| Status pages | 1 |
| Incident management | Included |
| Log management | 3 GB of logs, 30-day retention |
| Screenshot evidence | Screenshots captured on failure |
| SSL monitoring | Included — alerts before certificate expiry |
| Team members | 1 user |

**Paid tiers:** Launch at $21/month for 50 monitors, 3-minute check intervals, 12 monitoring locations, and SMS/Slack notifications.

---

## By Service Category

### 1. Web Design & Development

#### Post-Launch Uptime Monitoring (All Builds)
- **Use case:** After deploying a client's site to Vercel or Cloudflare Pages, set up a Better Stack monitor → verifies the site is accessible every 15 minutes → emails Edmond if it goes down
- **Value:** Professional service delivery — Edmond knows about outages before the client does. This is included in every build as a standard practice
- **Setup:** Monitor URL → check type (HTTPS) → expected status code (200) → keyword matching (optional — verify the page contains expected content)

#### SSL Certificate Monitoring
- **Use case:** Better Stack monitors the SSL certificate expiry date → sends alert 30, 14, and 7 days before expiry
- **Value:** Prevents the embarrassing situation of a client's site showing "Not Secure" because an expired certificate wasn't renewed

---

### 2. Retainer & Ongoing Support

#### Foundation Cover Monitoring (from P2,500/month)
- **Use case:** Every Foundation Cover retainer includes uptime monitoring as a standard deliverable
- **Client receives:** Monthly performance and availability report (uptime percentage, response times, any incidents and resolution times)
- **Internal value:** Edmond monitors all retainer clients' sites from a single Better Stack dashboard — immediate visibility into which sites are healthy and which need attention

#### Incident Response Escalation
- **Use case:** Monitor detects downtime → email alert to Edmond → Edmond investigates and resolves → incident logged in Better Stack with resolution notes
- **Value:** Documented incident history for each client — demonstrates value during retainer reviews

---

### 3. Web Applications

#### API Endpoint Monitoring
- **Use case:** Monitor critical API endpoints (form submission handlers, payment webhooks, authentication routes) — not just the homepage
- **Check type:** HTTP POST with expected response body. If the API returns an unexpected response, an incident is raised
- **Value:** Detects backend failures before users experience them. A site that loads but whose API is broken is worse than a site that's entirely down

#### Database Connectivity Monitoring
- **Use case:** Monitor a lightweight health check endpoint (`/api/health`) that tests database connectivity → Better Stack verifies the response
- **Value:** Detects Supabase/Neon database issues (including the Supabase 7-day inactivity pause) before they cascade into full outages

---

### 4. Workflow Automation

#### Monitor → Make.com → Notification Pipeline
- **Use case:** Better Stack webhook fires on incident → Make.com scenario → Slack notification + SMS via Twilio + incident log in Google Sheets
- **Value:** Multi-channel alerting beyond Better Stack's free-tier email-only limitation

#### Automated Incident Reports
- **Use case:** Monthly Better Stack data export → Make.com generates incident summary report → emails to client as part of retainer reporting
- **Value:** Professional monthly reporting showing uptime, incident count, and resolution times

---

## Quick-Win Implementations

### Priority 1: Standard Monitor Setup (15 min per site)
```
Monitor Configuration:
- URL: https://clientsite.com
- Check type: HTTPS (GET)
- Check interval: 15 minutes (free tier)
- Monitoring regions: US, EU, Asia (3 available on free tier)
- Expected status code: 200
- Keyword match (optional): "Contact" (verifies page content loads)
- Notifications: Email to edmond.moepswa@gmail.com
```

### Priority 2: Health Check Endpoint (30 min)
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function GET() {
  try {
    // Test database connectivity
    await db.execute('SELECT 1')
    return NextResponse.json({ status: 'healthy', timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: 'Database connection failed' },
      { status: 503 }
    )
  }
}
```

Monitor this endpoint in Better Stack alongside the homepage.

### Priority 3: Status Page for Client Transparency (30 min)
Set up Better Stack's free status page to show public uptime history. Share the status page URL with the client so they can see real-time site health without needing Better Stack access.

---

## Resource Budget Planning

**Free tier (3 monitors) allocation:**

| Monitor | Purpose | Priority |
|---------|---------|----------|
| Monitor 1 | Primary client website homepage | Critical |
| Monitor 2 | API health endpoint (`/api/health`) | High |
| Monitor 3 | Form submission endpoint or critical user flow | Medium |

**When to upgrade to Launch ($21/month):**
- More than 3 sites/services need monitoring
- 15-minute check interval is too slow for mission-critical sites
- SMS or Slack notifications are needed (free tier is email-only)
- More monitoring locations are needed for geographically distributed user bases

**Monitor allocation across Edmond's portfolio:**

| Category | Sites Needing Monitoring | Monitors Required |
|----------|------------------------|-------------------|
| Active client sites (retainer) | 5–10 | 1 per site (homepage) |
| Development/staging environments | 2–3 | 1 per environment |
| Personal site and demos | 1–2 | 1 total |

With only 3 free monitors, prioritise: (1) active retainer client sites, (2) API health endpoints for web applications, (3) personal site. For clients beyond the 3-monitor limit, recommend the Launch plan ($21/month for 50 monitors — can be shared across all clients).

---

## Risks & Considerations

1. **3-monitor limit:** The free tier supports only 3 monitors. Edmond's active client portfolio will quickly exceed this. **Mitigation:** Use the Launch plan ($21/month for 50 monitors) as a shared monitoring platform for all clients — the per-client cost is then ~P5–10/month, which can be absorbed into retainer pricing
2. **15-minute check interval:** A site can be down for up to 15 minutes before detection. For most marketing sites, this is acceptable. For e-commerce or SaaS applications, consider the Launch plan's 3-minute interval
3. **Email-only notifications on free tier:** No SMS, no Slack, no phone call. If Edmond is away from email for an extended period, an outage could go unacknowledged
4. **Geographic limitations:** Free tier monitors from only 3 regions. A site may be up in the US but down in Southern Africa — the free tier wouldn't detect this
5. **False positives:** Network hiccups, CDN cache invalidation, and Vercel deployment rollouts can trigger false incidents. Configure retry settings (e.g., 2 consecutive failures before alerting) to reduce noise

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Post-launch monitoring setup | Included in all builds | $0 (free tier) | 100% |
| Retainer monitoring (Foundation Cover) | Included in P2,500/month | ~$0.50–1/month per client (shared Launch plan) | ~97% |
| Monthly uptime reporting | Included in retainer | $0 (automated) | 100% |
| SSL monitoring | Included in monitoring setup | $0 | 100% |

**Key insight:** Better Stack's free tier (3 monitors) is useful for personal site monitoring and the first few client sites, but Edmond's portfolio will quickly exceed the limit. The Launch plan ($21/month for 50 monitors) should be treated as a shared infrastructure cost — at 10 retainer clients, that's ~$2.10/month per client, easily absorbed into the P2,500/month Foundation Cover. The value proposition is clear: "I monitor your site 24/7 and respond before you even notice it's down." This is a tangible, reportable deliverable that justifies ongoing retainer relationships.

---

**End of Better Stack Monitoring Integration Strategy**
