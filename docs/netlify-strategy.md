# Netlify Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Netlify (netlify.com)
**Free Tier:** Starter plan — 100 GB bandwidth/month, 300 build minutes/month, 1 concurrent build, unlimited sites, forms (100 submissions/month), serverless functions (125,000 invocations/month)

---

## Overview

Netlify is a frontend hosting and deployment platform that competes directly with Vercel. Its free tier offers generous bandwidth (100 GB/month), built-in form handling (no backend code needed), serverless functions, and split testing. For Edmond's practice, Netlify serves as both a Vercel alternative and a complementary platform for specific features that Vercel doesn't provide natively.

For Edmond's practice, Netlify serves as:

1. **Alternative hosting for static sites** — When Vercel's Hobby tier is exhausted or when Netlify-specific features (built-in forms, split testing) are needed
2. **Built-in form handling** — Netlify Forms processes form submissions without backend code — no API routes, no database, no serverless functions needed
3. **A/B split testing** — Netlify's free-tier split testing allows comparing two versions of a page — a feature Vercel reserves for enterprise plans
4. **Backup hosting** — Secondary deployment target for disaster recovery or multi-region redundancy

---

## Free Tier Limits (Starter Plan — 2026)

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Build minutes | 300/month |
| Concurrent builds | 1 |
| Sites | Unlimited |
| Serverless functions | 125,000 invocations/month |
| Function runtime | 10 seconds |
| Netlify Forms | 100 submissions/month |
| Split testing (A/B) | Included on free tier |
| Custom domains | Unlimited |
| HTTPS | Automatic (Let's Encrypt) |
| Team members | 1 user |

**Pro plan ($19/user/month):** 1 TB bandwidth, 500 build minutes, 3 concurrent builds, 500 form submissions/month, 2M serverless invocations, password-protected sites.

---

## By Service Category

### 1. Web Design & Development

#### Built-In Form Handling (Key Differentiator)
- **Use case:** Client's contact form submits to Netlify — no API route, no database, no serverless function needed. Netlify captures submissions and displays them in the dashboard or forwards them via email notification
- **Implementation:** Add `netlify` attribute to the form element → Netlify detects and processes the form automatically → submissions appear in the Netlify dashboard
- **Value:** Eliminates the need for Resend, Supabase, or Make.com for simple contact forms. The form data lives in Netlify's dashboard — accessible without any infrastructure
- **Limitation:** 100 submissions/month on the free tier. For higher-volume forms, use the Pro plan (500/month) or route to a custom backend

```html
<!-- Netlify Form — no backend code needed -->
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

#### A/B Split Testing
- **Use case:** Test two versions of a landing page — version A with a long-form layout, version B with a short-form layout. Netlify splits traffic 50/50 and reports on conversion rates
- **Implementation:** Create two branches (`main` and `variant-b`) → configure split test in Netlify dashboard → Netlify routes traffic based on rules
- **Value:** Vercel does not offer split testing on the Hobby tier. Netlify includes it for free. This is a concrete advantage for conversion-focused projects

#### Static Site Hosting Alternative to Vercel
- **Use case:** When Vercel's 100 GB bandwidth is approaching its limit, or when the client prefers Netlify's dashboard and features
- **Value:** Identical free-tier bandwidth (100 GB) but with different feature strengths. Netlify's form handling and split testing complement Vercel's Next.js integration and edge functions

---

### 2. Web Applications

#### Serverless Functions as API Routes
- **Use case:** Netlify serverless functions (125,000 invocations/month) as lightweight API endpoints — form processing, webhook receivers, data transformations
- **Comparison to Vercel:** Netlify offers 125K invocations vs. Vercel's 100K — slightly more generous for API-heavy applications
- **Function duration:** 10 seconds (same as Vercel serverless)

#### Password-Protected Sites (Pro Plan)
- **Use case:** Client needs a staging environment or private site accessible only to specific people
- **Netlify capability:** Built-in password protection — no auth system needed
- **Value:** Simple access control for preview sites, internal tools, or client review environments

---

### 3. Workflow Automation

#### Form Submissions → Webhook → Make.com
- **Use case:** Netlify form submission → webhook fires → Make.com processes the submission → creates HubSpot contact, sends email notification, logs to Google Sheets
- **Value:** Netlify handles the form capture (no backend code), Make.com handles the workflow (CRM routing, notifications). Clean separation of concerns

#### Deploy Hooks for Automated Deployments
- **Use case:** External trigger (Make.com scenario, GitHub Actions, CI/CD pipeline) → Netlify deploy hook → triggers a rebuild and deployment
- **Value:** Automated content updates — when content changes in the CMS, a webhook triggers a Netlify rebuild

---

## Quick-Win Implementations

### Priority 1: Netlify Form Setup (10 min)
```html
<!-- Add to any static form — no backend code needed -->
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <p hidden>
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Submit</button>
</form>
```
The `netlify-honeypot` attribute adds spam protection — bots fill the hidden field, Netlify rejects the submission.

### Priority 2: Netlify + Next.js Static Export (30 min)
```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  images: { unoptimised: true },
}
export default nextConfig
```
Deploy to Netlify via GitHub integration — automatic builds on push to `main`.

### Priority 3: A/B Split Test Setup (30 min)
1. Create `variant-b` branch with the alternative page design
2. Push to GitHub → Netlify deploys both branches
3. In Netlify dashboard: Split Tests → Create new test → select `main` (50%) and `variant-b` (50%)
4. Monitor conversion rates in the Split Tests dashboard

---

## Netlify vs. Vercel Decision Guide

| Feature | Netlify (Free) | Vercel (Hobby) |
|---------|---------------|----------------|
| Bandwidth | 100 GB/month | 100 GB/month |
| Build minutes | 300/month | 100 hours/month |
| Serverless invocations | 125,000/month | 100,000/month |
| Built-in form handling | ✅ (100 submissions/month) | ❌ (requires API route) |
| A/B split testing | ✅ | ❌ (enterprise only) |
| Next.js SSR | ❌ (static export only) | ✅ (full SSR support) |
| Image optimisation | ❌ (on free tier) | ✅ |
| Edge functions | ✅ (limited) | ✅ (1M/month) |
| Preview deployments | ✅ | ✅ |
| Best for | Static sites, forms, A/B testing | Next.js apps, SSR, edge compute |

**Recommendation:** Default to Vercel for Next.js applications (full SSR support, better Next.js integration). Use Netlify for static sites, sites that need built-in form handling, and projects requiring A/B split testing.

---

## Resource Budget Planning

**Free tier covers most static sites:**

| Resource | Typical Usage (Static Site) | Free Limit | Headroom |
|----------|---------------------------|-------------|----------|
| Bandwidth | 1–5 GB/month | 100 GB/month | ~95%+ |
| Build minutes | 5–15/month | 300/month | ~95%+ |
| Form submissions | 20–80/month | 100/month | ~20%+ |
| Serverless invocations | 1,000–10,000/month | 125,000/month | ~92%+ |

**When to upgrade to Pro ($19/month):**
- Bandwidth exceeds 100 GB/month
- Form submissions exceed 100/month
- Need password-protected sites
- Need more than 1 concurrent build (team deployments)

---

## Risks & Considerations

1. **No SSR on free tier for Next.js:** Netlify supports Next.js static export (`output: 'export'`) but not server-side rendering on the free tier. For full Next.js SSR, use Vercel
2. **Image optimisation not free:** Netlify's image optimisation (Netlify Image CDN) is available on paid plans only. On the free tier, images must be pre-optimised before build
3. **Form submission limit (100/month):** The free tier caps form submissions at 100/month. For higher-volume forms, either upgrade to Pro (500/month) or route to a custom backend (Supabase, Resend, Make.com)
4. **Single concurrent build:** Only one site can build at a time. For multi-site deployments, builds are serialised — not parallel
5. **Vendor lock-in for forms:** Netlify Forms data lives on Netlify. Export is possible (CSV), but migrating form submissions to another platform requires manual data transfer
6. **Build minute consumption:** Complex builds (large Next.js projects with many pages) can consume 10–30 minutes each. 300 build minutes/month = 10–30 deployments. For projects with frequent deployments, monitor build time carefully

---

## Summary: Value to Practice

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Static site hosting | Included in build | $0 (free tier) | 100% |
| Form handling (simple contact forms) | Included in build | $0 | 100% |
| A/B split testing | +P2,000 add-on | $0 | 100% |
| Backup/secondary hosting | N/A — internal | $0 | N/A |

**Key insight:** Netlify is the strategic alternative to Vercel — not a replacement, but a complement. Its two killer free-tier features are built-in form handling (no backend code needed) and A/B split testing (not available on Vercel Hobby). For static sites, marketing pages, and landing pages that need form capture and conversion testing, Netlify is the better choice. For full Next.js applications with SSR, image optimisation, and edge compute, Vercel remains the default. Both platforms should be in Edmond's toolkit — use the right one for each project's specific requirements.

---

**End of Netlify Integration Strategy**
