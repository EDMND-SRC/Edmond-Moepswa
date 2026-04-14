# Manual Steps Guide — Edmond Moepswa

**Generated:** 6 April 2026
**Last Updated:** 14 April 2026 (Dodo 12 Products Created, Full Integration Complete, GSC Verified)
**Site:** Edmond Moepswa
**Vercel URL:** https://edmond-moepswa.vercel.app
**GitHub:** https://github.com/EDMND-SRC/edmond-moepswa
**Build Status:** ✅ `pnpm build` passes — zero errors (verified 14 April)
**Git Status:** ✅ Local = origin/main — fully synced

---

## Summary

**All code is complete and pushed to GitHub.** Every integration has been built, tested, and deployed to the repo. The 12 Dodo Payments products (3 free PWYW + 9 paid boilerplate) were created via API. Google Search Console ownership has been verified. Only remaining items are visual assets (thumbnails, avatars, favicon), the Make.com webhook scenarios, and the eventual domain purchase.

---

## ✅ What's Already Done (All Verified)

### Analytics, Tracking & Monitoring

**Google Tag (GA4)**

- ✅ Google Tag (gtag.js) injected into `<head>` of every page via `src/app/(frontend)/layout.tsx`
- ✅ Uses `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-LLR99YRCV1`
- ✅ Tracks pageviews, navigation events
- ✅ Also configured in Dodo Payments dashboard (Measurement ID set there too)

**PostHog (Product Analytics)**

- ✅ Client provider: `src/lib/posthog-provider.tsx`
- ✅ Auto-initializes with `NEXT_PUBLIC_POSTHOG_API_KEY=phx_XJuR...`
- ✅ Pageview tracking wrapped in Suspense boundary (no SSG bailout)
- ✅ Debug mode enabled in development

**Sentry (Error Tracking)**

- ✅ SDK: `@sentry/nextjs`
- ✅ Client config: `src/lib/sentry-client.config.ts`
- ✅ Server/edge instrumentation: `src/instrumentation.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- ✅ `next.config.ts` wrapped with `withSentryConfig`
- ✅ Source map upload disabled (won't block builds)
- ✅ Uses `SENTRY_DSN` from env

**Better Stack (Uptime Monitoring)**

- ✅ API key verified
- ✅ 2 monitors created and active, checking `https://edmond-moepswa.vercel.app` every 3 minutes
- ⚠️ Monitors may show "down" if Vercel deployment is stale — will flip to "up" after next deploy

**Google Search Console**

- ✅ Ownership verified (HTML file method — `public/google75a7bf2c52475f25.html`)
- ✅ Property: `https://edmond-moepswa.vercel.app`
- ⏳ Sitemap submission pending (see Pending section)

---

### Dodo Payments — Full Integration

**SDK & Environment**

- ✅ `dodopayments` npm package installed
- ✅ `DODO_PAYMENTS_ENVIRONMENT=test` — single env var controls test/live mode across all integration files
- ✅ API key, store ID, webhook secret all configured in `.env.local` and synced to Vercel

**12 Products Created via API (Test Mode)**

**Free Resources (PWYW — Pay What You Want):**

| Product                                     | Product ID                  | Price                  |
| ------------------------------------------- | --------------------------- | ---------------------- |
| 5 Signs Your Website Is Costing You Clients | `pdt_0NceaY8UNB1GoMOLesz8X` | PWYW (suggested $5.00) |
| Website Launch Checklist                    | `pdt_0NceaYFa2uiHUZPpN7KOA` | PWYW (suggested $5.00) |
| How to Brief a Web Designer                 | `pdt_0NceaYzEq1qzsiDZHrFWb` | PWYW (suggested $5.00) |

**Paid Boilerplates:**

| Product                        | Product ID                  | Price  |
| ------------------------------ | --------------------------- | ------ |
| Artisan & Craftmaker Portfolio | `pdt_0NceaZ7MhTzjPhk2aY0X6` | $49.99 |
| Professional Services Firm     | `pdt_0NceaZEHpeVsSmLthCaZp` | $55.99 |
| Food & Hospitality             | `pdt_0NceaZL68xGvvpTCMwAcr` | $59.99 |
| Health & Wellness              | `pdt_0NceaZcHLefMoeI7jyZj1` | $49.99 |
| Events & Experiences           | `pdt_0NceaZjlwvNurs3YmCFbJ` | $39.99 |
| E-commerce                     | `pdt_0NceaZqUzBh2tvZYMPCKI` | $69.99 |
| NGO / Non-Profit               | `pdt_0NceaZxJIATESTttB9Sy4` | $43.99 |
| Financial Services             | `pdt_0Nceaa45LVxvpPmn0JPm3` | $59.99 |
| SaaS Starter                   | `pdt_0NceaaACaY7X4A4qtHoek` | $99.99 |

**API Routes:**

| Route                | Method | Purpose                                                          |
| -------------------- | ------ | ---------------------------------------------------------------- |
| `/api/checkout`      | POST   | Creates Dodo checkout session (supports PWYW `amount` field)     |
| `/api/dodo-products` | GET    | Fetches all products for storefront (60s cache revalidation)     |
| `/api/webhooks/dodo` | POST   | HMAC-signed webhook handler — routes payment/subscription events |

**Store Page (`/store`)**

- ✅ Completely rebuilt — fetches products from Dodo API at build/runtime
- ✅ PWYW products show custom amount input with suggested price
- ✅ Fixed-price products show "Buy Now" with price
- ✅ Checkout redirects to Dodo hosted checkout
- ✅ Graceful fallback if products API is unavailable
- ✅ Adaptive currency note displayed (70+ currencies)

**ResourceCards (Free Resources Page)**

- ✅ All 3 resources wired to their Dodo product IDs
- ✅ Gumroad URLs preserved as fallback if Dodo checkout fails
- ✅ Download tracking via Make.com webhook still fires

**Adaptive Currency**

- ✅ Enabled in Dodo Dashboard (Settings → Business → Adaptive Pricing)
- ✅ All integration files use `DODO_PAYMENTS_ENVIRONMENT` to switch between test/live
- ✅ 70+ currencies supported — 2-4% FX fee (paid by customer)

**Seed Script**

- ✅ `scripts/seed-dodo-products-api.ts` — reusable for creating new products or recreating in live mode
- ✅ Correct SDK format: `price: { type: 'one_time_price', price: <cents>, discount: 0, purchasing_power_parity: false, currency: 'USD' }`

---

### Implementation Plan v3 — All 5 Tracks Complete

**Track 1: Hero & Navigation**

- ✅ Hero text repositioned, social links set to `#` placeholders, Book Call icon sized up

**Track 2: Services Section Redesign**

- ✅ Homepage services: pricing removed, descriptions only, spacing reduced
- ✅ `/services` page preserved with full pricing
- ✅ CommitmentsSection moved to About page

**Track 3: Projects & Testimonials**

- ✅ Boilerplate projects filtered from homepage
- ✅ TestimonialsSection with 4 fictional placeholders, 3D flip carousel, pause/play

**Track 4: Calculator Rebuild**

- ✅ Interactive add-ons with steppers, tier selector, delivery timeline
- ✅ Three automation paths: quote modal, WhatsApp pre-fill, download summary (.md/.txt/.csv)

**Track 5: Homepage Restructure**

- ✅ Homepage: 13 sections → 9 sections
- ✅ ProcessSection → `/services`, FAQSection → `/contact`
- ✅ Substack API route bug fixed, HomePageFooter redesigned

---

### Environment Variables — All Synced to Vercel

| Variable                        | Value                                    | Target                           |
| ------------------------------- | ---------------------------------------- | -------------------------------- |
| `DODO_PAYMENTS_API_KEY`         | `i2C7srYd2ml...`                         | production, preview, development |
| `DODO_PAYMENTS_ENVIRONMENT`     | `test`                                   | production, preview, development |
| `DODO_PAYMENTS_STORE_ID`        | `bus_0NcbJEcXUhVRoZWBULvZ9`              | production, preview, development |
| `DODO_PAYMENTS_WEBHOOK_SECRET`  | `whsec_WqcGva3lcb4RtAMdcjsA1x4j9nN824kk` | production, preview, development |
| `NEXT_PUBLIC_POSTHOG_API_KEY`   | `phx_XJuR...`                            | production, preview, development |
| `NEXT_PUBLIC_POSTHOG_API_HOST`  | `https://us.i.posthog.com`               | production, preview, development |
| `SENTRY_DSN`                    | `https://a895c486b...`                   | production, preview, development |
| `BETTER_STACK_API_KEY`          | `pU1UWS3bQXHJso4XE9MkHszx`               | production, preview, development |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-LLR99YRCV1`                           | production, preview, development |
| `SUBSTACK_FEED_URL`             | `https://edmnd.substack.com/feed`        | production, preview, development |
| `FIRECRAWL_API_KEY`             | `fc-08fc70ff7a4548cfa7cf78f50445a4e3`    | production, preview, development |

---

### Database Seeding — Text Complete

| Collection   | Rows | Status                                                 |
| ------------ | ---- | ------------------------------------------------------ |
| Projects     | 8    | ✅ All seeded with rich descriptions                   |
| Testimonials | 9    | ✅ Seeded in CMS (+ 4 hardcoded in homepage component) |
| FAQs         | 19   | ✅ All seeded across 5 categories                      |
| Media        | 0    | ❌ **No images uploaded** — see Visual Assets below    |

---

## ⏳ What Requires Action

### Priority 1: Visual Assets

| #    | Image                 | Ratio            | Use                               | Action                                           |
| ---- | --------------------- | ---------------- | --------------------------------- | ------------------------------------------------ |
| 1-8  | 8 project thumbnails  | 3:2 (1200×800px) | Project cards                     | Generate → WebP → compress → upload to CMS Media |
| 9-12 | 4 testimonial avatars | 1:1 (400×400px)  | Testimonial carousel              | Optional — initials fallback already works       |
| 13   | EM monogram favicon   | Various          | favicon.ico, apple-touch-icon.png | Generate → replace in `public/favicon/`          |

**Image prompts:** `_bmad-output/ai-image-generation-prompts.md` — 20 detailed prompts for Nano Banana Pro / Midjourney

**After generating:**

1. Convert to WebP: `cwebp -q 85 input.png output.webp`
2. Compress thumbnails to <500KB
3. Start dev server → login to Payload admin → Media → Upload
4. Attach thumbnails to each project in CMS

---

### Priority 2: Make.com Scenarios (7 Total)

**URL:** https://make.com
**Plan:** Teams Plan (expires 2026-08-12)

| #   | Scenario                                    | Status                                          |
| --- | ------------------------------------------- | ----------------------------------------------- |
| 1   | Cal.com → Booking Confirmation Email        | ❌ Not created                                  |
| 2   | Cal.com → Google Sheets Lead Tracking       | ❌ Not created                                  |
| 3   | Contact Form → Intent-Based Email Reply     | ❌ Not created (webhook URL placeholder in env) |
| 4   | Calculator High-Value Quote Alert (>P2,000) | ❌ Not created (webhook URL placeholder in env) |
| 5   | Weekly Vercel Analytics Report              | ❌ Not created                                  |
| 6   | Cal.com Cancelled → Re-engagement Email     | ❌ Not created                                  |
| 7   | Gumroad Download → Nurture Sequence         | ❌ Not created (webhook URL placeholder in env) |

**Before starting:** Create Google Sheet "Portfolio Leads CRM" with columns: `Name`, `Email`, `Date/Time`, `Service Interest`, `Source`, `Estimated Value`

**Placeholder webhook URLs in `.env.local`:**

```
MAKE_WEBHOOK_LEAD_CAPTURE=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
MAKE_WEBHOOK_CALCULATOR_QUOTE=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
MAKE_WEBHOOK_GUMROAD_DOWNLOAD=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
```

---

### Priority 3: Google Search Console — Submit Sitemap

- ✅ Ownership verified
- ⏳ **Submit sitemap:**
  1. Go to https://search.google.com/search-console
  2. Select property: `https://edmond-moepswa.vercel.app`
  3. Click "Sitemaps" in left sidebar
  4. Enter: `sitemap.xml`
  5. Click "Submit"

Sitemap is auto-generated on `pnpm build` via `next-sitemap`. Current config excludes Payload CMS routes (`/*`, `/posts/*`) and only exposes static pages.

---

### Priority 4: Dodo Storefront Configuration (Dashboard)

Products are created via API. Now configure the hosted storefront:

1. Go to https://app.dodopayments.com → Store Front
2. Set store name, upload logo and cover image
3. Select which products to display (all 12 recommended)
4. Publish storefront
5. Verify at: https://test.store.dodopayments.com/edmond-moepswa

**Product Collections (create via dashboard):**

1. Dashboard → Products → Collections → Create Collection
2. Suggested collections:
   - **Free Resources** — the 3 PWYW products
   - **Boilerplate Products** — all 9 paid products

---

### Priority 5: Domain Purchase (Future)

**Current URL:** `https://edmond-moepswa.vercel.app`
**Target:** `https://edmondmoepswa.com` (or similar)

**Steps:**

1. Purchase domain (~$10/year on Namecheap/Cloudflare)
2. Configure DNS → point to Vercel
3. Add custom domain in Vercel dashboard
4. Set up Resend for branded email (`edmond@edmondmoepswa.com`)
5. Update `NEXT_PUBLIC_SERVER_URL` to custom domain
6. Re-verify Google Search Console with new domain
7. Switch Dodo Payments to live mode (create new products, update env vars)

---

## Quick-Reference Checklist

### ✅ Complete (No Action Needed)

- [x] Google Tag (gtag.js) on all pages
- [x] PostHog analytics with pageview tracking
- [x] Sentry error tracking (client + server + edge)
- [x] Better Stack uptime monitoring (2 monitors active)
- [x] Google Search Console ownership verified
- [x] 12 Dodo Payments products created (test mode)
- [x] Dodo checkout API route (`/api/checkout`)
- [x] Dodo products API route (`/api/dodo-products`)
- [x] Dodo webhook handler (`/api/webhooks/dodo`)
- [x] Store page rebuilt with Dodo integration (PWYW + fixed pricing)
- [x] ResourceCards wired to Dodo product IDs
- [x] Adaptive currency enabled (Dodo dashboard)
- [x] `DODO_PAYMENTS_ENVIRONMENT=test` wired globally
- [x] All 11 env vars synced to Vercel (production/preview/development)
- [x] Build passes clean (`pnpm build` — zero errors)
- [x] All code committed and pushed to GitHub
- [x] All 5 tracks of implementation plan v3 complete
- [x] Database text content seeded (8 projects, 19 FAQs, 9 testimonials)
- [x] Sitemap auto-generation configured

### ⏳ Pending (Action Required)

- [ ] **Visual Assets:** Generate 8 project thumbnails, 4 avatars, favicon
- [ ] **Visual Assets:** Upload images to Payload CMS Media collection
- [ ] **Visual Assets:** Link project thumbnails to projects in CMS
- [ ] **Make.com:** Create 7 webhook scenarios
- [ ] **Make.com:** Replace placeholder webhook URLs in `.env.local` and Vercel
- [ ] **Google Search Console:** Submit `sitemap.xml`
- [ ] **Dodo Dashboard:** Configure hosted storefront (branding, select products)
- [ ] **Dodo Dashboard:** Create Product Collections (Free Resources, Boilerplates)
- [ ] **Domain:** Purchase custom domain, configure DNS, update Vercel
- [ ] **Domain:** Set up Resend for branded email
- [ ] **Dodo:** Switch to live mode when ready (new API key, recreate products)
- [ ] **Deploy:** Trigger Vercel deploy (push to main or manual redeploy)

---

## Deployment Checklist

Post-next-push verification:

- [ ] Visit `https://edmond-moepswa.vercel.app` — all pages load
- [ ] Test `/store` — products render (or fallback if Dodo API is rate-limited)
- [ ] Test `/resources` — free resources show "Download Free" (uses Dodo checkout)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Better Stack monitor shows "up"
- [ ] Verify Sentry captures a test error (trigger from browser console: `Sentry.captureMessage('test')`)
- [ ] Verify PostHog events in dashboard (real-time view)
- [ ] Verify GA4 events in Google Analytics (real-time view)
- [ ] Test calculator: select options, verify price updates, try "Request Formal Quote"

---

## Webhook URLs Reference

| Service                       | URL                                                           |
| ----------------------------- | ------------------------------------------------------------- |
| Dodo Payments (production)    | `https://edmond-moepswa.vercel.app/api/webhooks/dodo`         |
| Dodo Payments (local testing) | `ngrok http 3000` → `https://XXXX.ngrok.io/api/webhooks/dodo` |
| Cal.com → Make.com            | Configure in Cal.com webhook settings                         |

---

**End of Manual Steps Guide — Last Updated 14 April 2026**
