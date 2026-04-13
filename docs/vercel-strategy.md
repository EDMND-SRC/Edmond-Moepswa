# Vercel Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Vercel (vercel.com)
**Free Tier:** Hobby plan — 100 GB bandwidth/month, 100 build hours/month, 100,000 serverless function invocations/month

---

## Overview

Vercel is the default hosting and deployment platform for all of Edmond's web builds. Its Hobby tier is generous enough for most small-to-medium client sites, and its integration with Next.js provides zero-config deployments, automatic preview URLs for every commit, and edge function support. For Edmond's service offerings, Vercel serves three roles:

1. **Client site hosting** — The primary deployment target for most Foundation and Boilerplate builds
2. **Development workflow** — Preview deployments enable client review before going live
3. **Edge computing** — Serverless and edge functions for API routes, form handling, and integrations

---

## Free Tier Limits (Hobby Plan — 2026)

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Build execution hours | 100 hours/month |
| Serverless function invocations | 100,000/month |
| Serverless function execution | 100 GB-hours/month |
| Edge function invocations | 1,000,000/month |
| Edge function execution | 10 GB-hours/month |
| Serverless function size | 50 MB (uncompressed) |
| Function duration (serverless) | 10 seconds |
| Function duration (edge) | 5 seconds |
| Team members | 1 (owner only) |

**Exceeding limits:** Additional bandwidth costs $0.15/GB on the Pro plan. The Hobby plan will throttle or fail if limits are exceeded — there is no automatic overage billing on Hobby.

---

## By Service Category

### 1. Web Design & Development

#### Primary Deployment Target (Internal Efficiency + Client Deliverable)
- **Use case:** Every Foundation Build (Launch, Presence, Growth) is deployed to Vercel as the default hosting option
- **Setup:** Connect GitHub repository → auto-deploy on push to `main`. Zero configuration needed for Next.js projects
- **Value:** Free hosting included in every build price. Client gets a production URL, plus automatic HTTPS and global CDN
- **Client handover:** Document how to connect their custom domain via Vercel dashboard. Include this in handover notes

#### Preview Deployments for Client Review
- **Use case:** Every push to a feature branch generates a live preview URL. Share this with the client during the review phase instead of screenshots
- **Value:** Clients see the real, interactive site — not static mockups. Reduces revision cycles because feedback is based on the actual product
- **Workflow:** Create a `review` branch → push → share the generated preview URL with the client → they review on their own device

#### Static Site Optimization for Hobby Bandwidth
- **Use case:** The 100 GB/month Hobby limit is sufficient for most marketing sites but can be consumed quickly by image-heavy portfolios or unoptimised media
- **Strategy:** Use Next.js Image component with automatic WebP/AVIF conversion, lazy loading, and responsive sizing. For image-heavy sites (Boilerplate 1, 5), consider Cloudflare R2 for asset storage and serve via Cloudflare CDN instead of Vercel's bandwidth pool
- **Rule of thumb:** A typical 6-page marketing site with optimised images uses 1–3 GB/month. A portfolio site with 50+ unoptimised images can consume 20–40 GB/month

---

### 2. Web Applications

#### API Routes and Serverless Functions
- **Use case:** Form submissions, webhook handlers, and lightweight API logic run as Vercel serverless functions (10-second limit)
- **Limitation:** For long-running tasks (report generation, email batch sends), serverless functions will timeout. Use edge functions (5-second limit, but much faster cold starts) or offload to a background job queue
- **Pattern:** Use Vercel serverless for request validation and routing → delegate heavy work to Supabase edge functions, Resend API, or Make.com webhooks

#### Edge Functions for Geolocation and Personalisation
- **Use case:** Edge middleware can modify responses based on visitor location, device type, or referral source
- **Example:** A Botswana-based visitor sees local pricing in BWP; an international visitor sees USD pricing. All handled at the edge with zero backend cost
- **Value:** No server to manage. Functions scale automatically and are included in the Hobby tier's 1M edge invocations

#### Boilerplate Build Deployment Standard
- **All 9 Boilerplate Builds** deploy to Vercel by default. This is already baked into the pricing and timeline. The setup is:
  1. Create Vercel project (linked to client's GitHub repo or Edmond's repo)
  2. Configure environment variables (Resend API keys, HubSpot tokens, etc.)
  3. Set up custom domain with automatic HTTPS
  4. Configure build settings (Next.js version, Node.js version)

---

### 3. Workflow Automation

#### Webhook Receivers
- **Use case:** Vercel serverless functions as webhook endpoints for Make.com scenarios, HubSpot webhooks, or payment gateway callbacks
- **Pattern:** `POST /api/webhooks/make` → validate payload → trigger internal logic → return 200
- **Value:** No separate server needed. Each function invocation costs a fraction of a cent within the Hobby tier's 100,000 invocations

#### Scheduled Tasks via Vercel Cron
- **Use case:** Vercel's built-in Cron Jobs can trigger serverless functions on a schedule (daily, weekly, monthly)
- **Example:** Daily sitemap regeneration, weekly analytics report generation, monthly content audit
- **Free tier:** Vercel Cron is available on the Hobby plan at no extra cost
- **Value:** Replaces a Make.com scheduled scenario or external cron service — saves credits and simplifies architecture

---

### 4. SEO, GEO & Google Business

#### Automatic Sitemap and Robots.txt Generation
- **Use case:** Next.js + Vercel automatically generates `sitemap.xml` and `robots.txt` at build time
- **Implementation:** Use `next-sitemap` or Next.js 14+ built-in `generateSitemaps` API. Both produce standards-compliant sitemaps submitted to Google Search Console
- **Value:** Included in every build. Zero maintenance after deployment

#### Core Web Vitals Monitoring
- **Use case:** Vercel's built-in analytics (Analytics package) provides Core Web Vitals scores (LCP, CLS, INP) for production deployments
- **Caveat:** Vercel Analytics is a paid feature beyond basic page views. For free-tier monitoring, pair Vercel hosting with PostHog for real-user performance data
- **Alternative:** Use Better Stack's free tier (3 monitors) to track page load times and uptime from the client's perspective

---

### 5. Boilerplate Products

#### Template Repository Hosting
- **Use case:** Host your Boilerplate Build templates as private GitHub repositories → connect each to a separate Vercel project → fork and deploy for new clients
- **Value:** Consistent deployment process across all builds. Every boilerplate has the same Vercel configuration, making it easy to manage multiple client sites

#### Demo / Staging Environments
- **Use case:** Deploy boilerplate demos to Vercel so prospective clients can see live, functional examples before committing
- **Example:** `demo-boilerplate-artisan.vercel.app` — a live Artisan & Craftmaker Portfolio build
- **Value:** Tangible proof of capability. Prospects interact with a real site instead of reading a description

---

## Quick-Win Implementations

### Priority 1: Standardise Deployment Template (1 hour)
Create a standard `vercel.json` configuration file for all projects:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "pnpm install",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

Deploy to Frankfurt (`fra1`) for best latency to Botswana clients.

### Priority 2: Preview Deployment Workflow (30 min)
Add a `.github/workflows/preview.yml` that deploys every PR to a Vercel preview URL. Share these URLs with clients during review phases instead of sending screenshots.

### Priority 3: Vercel Cron for Sitemap Regeneration (30 min)
Add a cron job to regenerate the sitemap weekly:

```json
{
  "crons": [
    {
      "path": "/api/cron/regenerate-sitemap",
      "schedule": "0 0 * * 0"
    }
  ]
}
```

---

## Credit / Resource Budget Planning

**Hobby tier covers most single-site deployments comfortably:**

| Resource | Typical Usage (Marketing Site) | Hobby Limit | Headroom |
|----------|-------------------------------|-------------|----------|
| Bandwidth | 1–3 GB/month | 100 GB/month | ~97% |
| Serverless invocations | 5,000–20,000/month | 100,000/month | ~80% |
| Edge invocations | 10,000–50,000/month | 1,000,000/month | ~95% |
| Build hours | 1–3 hours/month | 100 hours/month | ~97% |

**When to upgrade to Pro ($20/month):**
- Client site exceeds 100 GB/month bandwidth (unusual for marketing sites)
- Client needs team collaboration (multiple Vercel users on one project)
- Analytics package needed (Vercel Analytics requires Pro)
- Serverless function needs >10 second duration

**Cost optimisation tip:** If a client's site approaches bandwidth limits, migrate static assets (images, PDFs) to Cloudflare R2 (10 GB free, no egress fees) and serve via Cloudflare CDN. This preserves Vercel's Hobby tier for the application layer.

---

## Risks & Considerations

1. **Single-user limit:** The Hobby plan supports only one team member. For client collaboration, either share login credentials (not recommended) or upgrade to Pro ($20/month, client bears cost)
2. **No SLA on Hobby:** Vercel provides no uptime guarantee on the free tier. For mission-critical client sites, recommend the Pro plan or add Better Stack monitoring
3. **Cold starts:** Serverless functions on Vercel have cold start latencies (200ms–2s for Node.js). For latency-sensitive endpoints, use edge functions instead
4. **Bandwidth spikes:** A viral social media post can consume 50+ GB in a single day. Monitor usage and set up alerts via Better Stack
5. **Vendor lock-in:** Vercel-specific features (edge config, image optimisation) create dependency. Where possible, use standard Next.js patterns that work on any host

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Foundation Build hosting | Included in build price | $0 (Hobby tier) | 100% |
| Preview deployments | Included in revision process | $0 | 100% |
| Boilerplate demo sites | Marketing tool | $0 | N/A |
| API routes / webhooks | Included in build price | $0 | 100% |
| Vercel Cron tasks | Included in build price | $0 | 100% |

**Key insight:** Vercel's Hobby tier is a genuine cost advantage. Every build ships with free, production-grade hosting included. The Pro upgrade ($20/month) should only be recommended when a client genuinely needs team collaboration or analytics — and that cost should be disclosed at scoping, not after delivery.

---

**End of Vercel Integration Strategy**
