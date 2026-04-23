# Manual Steps Guide — Edmond Moepswa

**Generated:** 23 April 2026
**Site:** Edmond Moepswa Personal Website
**Vercel URL:** https://edmond-moepswa.vercel.app
**GitHub:** https://github.com/EDMND-SRC/Edmond-Moepswa
**Build Status:** ✅ `pnpm build` passes — zero errors
**Git Status:** ✅ Local = origin/main — fully synced

---

## Summary

All code is complete and pushed to GitHub. The core integrations (Payload CMS, Dodo Payments, Sentry, PostHog, GA4) are fully configured in the codebase. The website architecture is fully operational with Next.js App Router and Payload CMS 3.82. 

The `public/` directory is fully populated with all required brand assets, favicons, avatars, and media files. The `visual-assets/` working directory has been fully processed and removed.

---

## ✅ What's Already Done (All Verified)

### Analytics, Tracking & Monitoring

**Google Tag (GA4)**
- ✅ Google Tag (gtag.js) injected into `<head>` of every page via `src/app/(frontend)/layout.tsx`
- ✅ Uses `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- ✅ Configured in Dodo Payments dashboard

**PostHog (Product Analytics)**
- ✅ Client provider: `src/lib/posthog-provider.tsx`
- ✅ Auto-initializes with `NEXT_PUBLIC_POSTHOG_API_KEY`
- ✅ Pageview tracking wrapped in Suspense boundary
- ✅ Debug mode enabled in development

**Sentry (Error Tracking)**
- ✅ SDK: `@sentry/nextjs`
- ✅ Client config: `src/lib/sentry-client.config.ts`
- ✅ Server/edge instrumentation: `src/instrumentation.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`

**Better Stack (Uptime Monitoring)**
- ✅ API key verified
- ✅ 2 monitors active, checking Vercel URL every 3 minutes

**Google Search Console**
- ✅ Ownership verified (HTML file method — `public/google75a7bf2c52475f25.html`)
- ✅ `sitemap.xml` and `robots.txt` present

---

### Dodo Payments — Integration

**SDK & Environment**
- ✅ `dodopayments` npm package installed
- ✅ `DODO_PAYMENTS_ENVIRONMENT=test` configured globally
- ✅ API key, store ID, webhook secret configured

**Products**
- ✅ 15 Products created and seeded in the database.
- ✅ Store page (`/store`) is completely dynamic and fetches products live.

**API Routes:**
| Route                | Method | Purpose                                                      |
| -------------------- | ------ | ------------------------------------------------------------ |
| `/api/checkout`      | POST   | Creates Dodo checkout session (supports PWYW `amount` field) |
| `/api/dodo-products` | GET    | Fetches all products for storefront                          |
| `/api/webhooks/dodo` | POST   | HMAC-signed webhook handler                                  |

---

### Visual Assets — Finalized

The `public/` directory contains all necessary static files.

- **Favicons:** 8 files (PNGs, ICO, SVG, webmanifest) are fully deployed in `public/favicon/`. Layout metadata is explicitly linked.
- **Avatars:** 4 testimonial avatars are deployed in `public/avatars/`.
- **Brand Assets:** 4 core SVG brand assets deployed in `public/brand/` (`logomark.svg`, `logo-horizontal.svg`, `brandmark-circle.svg`, `favicon-grey-bg.svg`).
- **Hero Image:** High-quality `edmond-portrait-hero.webp` is deployed in `public/`.
- **Media & Thumbnails:** Payload CMS has auto-generated 50 responsive image variants inside `public/media/`. These are actively used by the `Media` collection.

---

### Environment Variables

All core environment variables are populated, except for Make.com webhook URLs which currently use placeholders. 

---

### Database Seeding — Complete

| Collection   | Status                                       |
| ------------ | -------------------------------------------- |
| Projects     | ✅ Seeded with descriptions and thumbnails   |
| Testimonials | ✅ Seeded in CMS (+ 4 hardcoded in homepage) |
| FAQs         | ✅ Seeded across 5 categories                |
| Media        | ✅ 50 image variants uploaded to CMS         |
| Products     | ✅ 15 products fully seeded                  |

---

## ⏳ What Requires Action

### Priority 1: Make.com Scenarios (3 Total)

You need to create the Make.com scenarios for your automated workflows.

1.  **Contact Form → Intent-Based Email Reply**
2.  **Calculator High-Value Quote Alert (>P2,000)**
3.  **Gumroad/Dodo Payments Purchase → Nurture Sequence**

**Action:**
Once created in Make.com, replace the placeholder URLs in your `.env.local` (and Vercel dashboard):
```env
MAKE_WEBHOOK_LEAD_CAPTURE=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
MAKE_WEBHOOK_CALCULATOR_QUOTE=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
MAKE_WEBHOOK_GUMROAD_DOWNLOAD=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
```

### Priority 2: Dodo Dashboard — Final Steps

- ⏳ Configure hosted storefront (branding, select products)
- ⏳ Create Product Collections (Free Resources, Boilerplates)
- ⏳ Switch `DODO_PAYMENTS_ENVIRONMENT` to `live` when ready to accept real payments.

### Priority 3: Domain Purchase & Launch

1. Purchase domain.
2. Configure DNS → point to Vercel.
3. Add custom domain in Vercel.
4. Set up Resend for branded email (to match the domain).
5. Update `NEXT_PUBLIC_SERVER_URL` in environment variables.
6. Submit `sitemap.xml` to Google Search Console for the new domain.

---

## Quick-Reference Checklist

### ✅ Complete

- [x] Next.js 16 + Payload CMS 3.82 architecture deployed
- [x] Google Tag (gtag.js) on all pages
- [x] PostHog analytics with pageview tracking
- [x] Sentry error tracking (client + server + edge)
- [x] Better Stack uptime monitoring 
- [x] Google Search Console ownership verified
- [x] Dodo webhook handler (`/api/webhooks/dodo`)
- [x] Store page completely dynamic
- [x] 15 Dodo Payments products mapped
- [x] Adaptive currency enabled
- [x] Build passes cleanly (`pnpm build`)
- [x] All 5 tracks of implementation plan v3 complete
- [x] Database text content seeded
- [x] Media files uploaded to Payload CMS (`public/media/` populated)
- [x] Visual assets structure finalized and redundant files purged

### ⏳ Pending

- [ ] Create 3 Make.com webhook scenarios
- [ ] Replace placeholder webhook URLs in `.env.local` and Vercel
- [ ] Configure Dodo hosted storefront (branding, select products)
- [ ] Purchase custom domain, configure DNS, update Vercel
- [ ] Set up Resend for branded email
- [ ] Switch Dodo to live mode when ready
- [ ] Submit sitemap to Google Search Console for final domain

---

**End of Manual Steps Guide — Last Updated 23 April 2026**
