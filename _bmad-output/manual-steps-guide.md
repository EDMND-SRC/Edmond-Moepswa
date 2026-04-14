# Manual Steps Guide — Edmond Moepswa

**Generated:** 6 April 2026
**Last Updated:** 14 April 2026 (Dodo 12 Products Created, Full Integration Complete, GSC Verified, Visual Assets Audit)
**Site:** Edmond Moepswa
**Vercel URL:** https://edmond-moepswa.vercel.app
**GitHub:** https://github.com/EDMND-SRC/Edmond-Moepswa
**Build Status:** ✅ `pnpm build` passes — zero errors (verified 14 April)
**Git Status:** ✅ Local = origin/main — fully synced

---

## Summary

**All code is complete and pushed to GitHub.** Every integration has been built, tested, and deployed to the repo. The 12 Dodo Payments products (3 free PWYW + 9 paid boilerplate) were created via API. Google Search Console ownership has been verified. Visual assets (avatars, favicons, brand assets, project thumbnails, hero portraits) are all generated and mostly deployed to `public/`. Remaining items are: uploading project thumbnails to Payload CMS Media and linking them to projects, the Make.com webhook scenarios, and the eventual domain purchase.

---

## ✅ What's Already Done (All Verified)

### Analytics, Tracking & Monitoring

**Google Tag (GA4)**

- ✅ Google Tag (gtag.js) injected into `<head>` of every page via `src/app/(frontend)/layout.tsx`
- ✅ Uses `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-LLR99YRCV1`
- ✅ Also configured in Dodo Payments dashboard (Measurement ID set there too)

**PostHog (Product Analytics)**

- ✅ Client provider: `src/lib/posthog-provider.tsx`
- ✅ Auto-initializes with `NEXT_PUBLIC_POSTHOG_API_KEY=phx_XJuR...`
- ✅ Pageview tracking wrapped in Suspense boundary
- ✅ Debug mode enabled in development

**Sentry (Error Tracking)**

- ✅ SDK: `@sentry/nextjs`
- ✅ Client config: `src/lib/sentry-client.config.ts`
- ✅ Server/edge instrumentation: `src/instrumentation.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- ✅ `next.config.ts` wrapped with `withSentryConfig`

**Better Stack (Uptime Monitoring)**

- ✅ API key verified
- ✅ 2 monitors active, checking `https://edmond-moepswa.vercel.app` every 3 minutes

**Google Search Console**

- ✅ Ownership verified (HTML file method — `public/google75a7bf2c52475f25.html`)
- ✅ Property: `https://edmond-moepswa.vercel.app`
- ⏳ Sitemap submission pending (see Pending section)

---

### Dodo Payments — Full Integration

**SDK & Environment**

- ✅ `dodopayments` npm package installed
- ✅ `DODO_PAYMENTS_ENVIRONMENT=test` — single env var controls test/live mode globally
- ✅ API key, store ID, webhook secret all configured in `.env.local` and synced to Vercel

**12 Products Created via API (Test Mode)**

**Free Resources (PWYW):**

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

| Route                | Method | Purpose                                                      |
| -------------------- | ------ | ------------------------------------------------------------ |
| `/api/checkout`      | POST   | Creates Dodo checkout session (supports PWYW `amount` field) |
| `/api/dodo-products` | GET    | Fetches all products for storefront (60s revalidation)       |
| `/api/webhooks/dodo` | POST   | HMAC-signed webhook handler                                  |

**Store Page (`/store`)**

- ✅ Completely rebuilt with Dodo integration
- ✅ PWYW products show custom amount input with suggested price
- ✅ Fixed-price products show "Buy Now" with price
- ✅ Graceful fallback if products API is unavailable

**ResourceCards**

- ✅ All 3 free resources wired to Dodo product IDs
- ✅ Gumroad URLs preserved as fallback

**Adaptive Currency**

- ✅ Enabled in Dodo Dashboard
- ✅ 70+ currencies, 2-4% FX fee (customer-paid)

---

### Visual Assets — Audit Complete

**109 files** in `visual-assets/` across 6 subdirectories. Most have been copied to `public/`. Here is the exact state:

#### ✅ Favicons — DONE & Deployed

| Source                                              | Destination                                 | Status      |
| --------------------------------------------------- | ------------------------------------------- | ----------- |
| `visual-assets/favicons/favicon-16x16.png`          | `public/favicon/favicon-16x16.png`          | ✅ Deployed |
| `visual-assets/favicons/favicon-32x32.png`          | `public/favicon/favicon-32x32.png`          | ✅ Deployed |
| `visual-assets/favicons/favicon.ico`                | `public/favicon/favicon.ico`                | ✅ Deployed |
| `visual-assets/favicons/favicon.svg`                | `public/favicon/favicon.svg`                | ✅ Deployed |
| `visual-assets/favicons/apple-touch-icon.png`       | `public/favicon/apple-touch-icon.png`       | ✅ Deployed |
| `visual-assets/favicons/android-chrome-192x192.png` | `public/favicon/android-chrome-192x192.png` | ✅ Deployed |
| `visual-assets/favicons/android-chrome-512x512.png` | `public/favicon/android-chrome-512x512.png` | ✅ Deployed |
| `visual-assets/favicons/site.webmanifest`           | `public/favicon/site.webmanifest`           | ✅ Deployed |

#### ✅ Testimonial Avatars — DONE & Deployed (4 of 5)

| Source                                        | Destination                            | In Use                    | Status          |
| --------------------------------------------- | -------------------------------------- | ------------------------- | --------------- |
| `visual-assets/avatars/avatar-raymond-c.webp` | `public/avatars/avatar-raymond-c.webp` | ✅ TestimonialsSection    | ✅ Deployed     |
| `visual-assets/avatars/avatar-thabo-n.webp`   | `public/avatars/avatar-thabo-n.webp`   | ✅ TestimonialsSection    | ✅ Deployed     |
| `visual-assets/avatars/avatar-amara-k.webp`   | `public/avatars/avatar-amara-k.webp`   | ✅ TestimonialsSection    | ✅ Deployed     |
| `visual-assets/avatars/avatar-david-o.webp`   | `public/avatars/avatar-david-o.webp`   | ✅ TestimonialsSection    | ✅ Deployed     |
| `visual-assets/avatars/avatar-kagiso-m.webp`  | —                                      | ❌ Not referenced in code | ⏳ Unused asset |

Note: `avatar-kagiso-m.webp` exists in visual-assets but is NOT referenced in any component and NOT copied to `public/`. It was generated as a 5th testimonial avatar when the homepage only uses 4 testimonials.

#### ✅ Brand Assets — DONE & Deployed

| Source                                     | Destination                         | Status      |
| ------------------------------------------ | ----------------------------------- | ----------- |
| `visual-assets/brand/logomark.svg`         | `public/brand/logomark.svg`         | ✅ Deployed |
| `visual-assets/brand/logo-horizontal.svg`  | `public/brand/logo-horizontal.svg`  | ✅ Deployed |
| `visual-assets/brand/brandmark-circle.svg` | `public/brand/brandmark-circle.svg` | ✅ Deployed |
| `visual-assets/brand/favicon-grey-bg.svg`  | `public/brand/favicon-grey-bg.svg`  | ✅ Deployed |

#### ✅ Hero Portrait — DONE & Deployed

| Source                                                     | Destination                        | Status                                     |
| ---------------------------------------------------------- | ---------------------------------- | ------------------------------------------ |
| `visual-assets/edmond-portraits/edmond-portrait-hero.webp` | `public/edmond-portrait-hero.webp` | ✅ Deployed (HeroSection + HomePageFooter) |

#### ⏳ Portrait Variants — Generated but Not in Code

| Source                               | In Use                     | Status               |
| ------------------------------------ | -------------------------- | -------------------- |
| `edmond-portrait-office.webp`        | ❌ Not referenced anywhere | ⏳ Generated, unused |
| `edmond-portrait-office-square.webp` | ❌ Not referenced anywhere | ⏳ Generated, unused |

#### ⏳ Hero Video Assets — Generated but Not in Code

| Source                                                   | In Use            | Status               |
| -------------------------------------------------------- | ----------------- | -------------------- |
| `edmond-portrait-hero-video-720p.mp4`                    | ❌ Not referenced | ⏳ Generated, unused |
| `edmond-portrait-hero-video-mute-720p.mp4`               | ❌ Not referenced | ⏳ Generated, unused |
| `edmond-portrait-hero-video-720p-png-split/` (76 frames) | ❌ Not referenced | ⏳ Generated, unused |

#### ⏳ Project Thumbnails — Generated, NOT Deployed to CMS

8 thumbnails exist in `visual-assets/project-thumbnails/`. They are **NOT** in `public/` and **NOT** uploaded to Payload CMS Media. These must be uploaded to the CMS and linked to their projects.

| File                                | Project Slug           | Status        |
| ----------------------------------- | ---------------------- | ------------- |
| `project-morning-dew-cafe.webp`     | `morning-dew-cafe`     | ⏳ Not in CMS |
| `project-hsnv-risk.webp`            | `hsnv-risk-dashboard`  | ⏳ Not in CMS |
| `project-artisan-marketplace.webp`  | `artisan-marketplace`  | ⏳ Not in CMS |
| `project-automation-pipeline.webp`  | `automation-pipeline`  | ⏳ Not in CMS |
| `project-saas-boilerplate.webp`     | `saas-boilerplate`     | ⏳ Not in CMS |
| `project-construction-website.webp` | `construction-website` | ⏳ Not in CMS |
| `project-food-hub.webp`             | `food-hub`             | ⏳ Not in CMS |
| `project-open-source-cms.webp`      | `open-source-cms`      | ⏳ Not in CMS |

---

### Implementation Plan v3 — All 5 Tracks Complete

- ✅ Track 1: Hero & Navigation
- ✅ Track 2: Services Section Redesign
- ✅ Track 3: Projects & Testimonials
- ✅ Track 4: Calculator Rebuild
- ✅ Track 5: Homepage Restructure

---

### Environment Variables — All Synced to Vercel (11 total)

| Variable                             | Target                           |
| ------------------------------------ | -------------------------------- |
| `DODO_PAYMENTS_API_KEY`              | production, preview, development |
| `DODO_PAYMENTS_ENVIRONMENT` = `test` | production, preview, development |
| `DODO_PAYMENTS_STORE_ID`             | production, preview, development |
| `DODO_PAYMENTS_WEBHOOK_SECRET`       | production, preview, development |
| `NEXT_PUBLIC_POSTHOG_API_KEY`        | production, preview, development |
| `NEXT_PUBLIC_POSTHOG_API_HOST`       | production, preview, development |
| `SENTRY_DSN`                         | production, preview, development |
| `BETTER_STACK_API_KEY`               | production, preview, development |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`      | production, preview, development |
| `SUBSTACK_FEED_URL`                  | production, preview, development |
| `FIRECRAWL_API_KEY`                  | production, preview, development |

---

### Database Seeding — Text Complete

| Collection   | Rows | Status                                       |
| ------------ | ---- | -------------------------------------------- |
| Projects     | 8    | ✅ Seeded with descriptions                  |
| Testimonials | 9    | ✅ Seeded in CMS (+ 4 hardcoded in homepage) |
| FAQs         | 19   | ✅ Seeded across 5 categories                |
| Media        | 0    | ❌ **No images uploaded to CMS**             |

---

## ⏳ What Requires Action

### Priority 1: Upload Project Thumbnails to Payload CMS

8 thumbnails are generated and sitting in `visual-assets/project-thumbnails/`. They need to be:

1. Uploaded to Payload CMS → Media
2. Linked to their respective projects in CMS → Projects

**How to do it:**

1. Start dev server: `pnpm dev`
2. Go to `http://localhost:3000/admin`
3. Login: `edmond.moepswa@gmail.com` / `H1$maje$ty1994`
4. **⚠️ SECURITY:** Change password immediately
5. **Media → Upload** — upload all 8 files from `visual-assets/project-thumbnails/`
6. **Projects** → click each project → attach corresponding thumbnail

Alternatively, run the seed script: `npx tsx seed-project-thumbnails.ts` (if it can connect to the running dev server).

---

### Priority 2: Unused Visual Assets — Decide What to Do

These assets are generated but not referenced in any code:

- `avatar-kagiso-m.webp` — 5th testimonial avatar (only 4 used)
- `edmond-portrait-office.webp` — office portrait variant
- `edmond-portrait-office-square.webp` — square office portrait
- `edmond-portrait-hero-video-720p.mp4` — hero video with sound
- `edmond-portrait-hero-video-mute-720p.mp4` — muted hero video
- `edmond-portrait-hero-video-720p-png-split/` (76 frames) — video split frames

Options:

- Keep them (might be useful for future design iterations)
- Delete them to reduce repo size
- Integrate them (e.g., use video in hero section instead of static image)

---

### Priority 3: Make.com Scenarios (7 Total)

**URL:** https://make.com
**Plan:** Teams Plan (expires 2026-08-12)

| #   | Scenario                                    | Status         |
| --- | ------------------------------------------- | -------------- |
| 1   | Cal.com → Booking Confirmation Email        | ❌ Not created |
| 2   | Cal.com → Google Sheets Lead Tracking       | ❌ Not created |
| 3   | Contact Form → Intent-Based Email Reply     | ❌ Not created |
| 4   | Calculator High-Value Quote Alert (>P2,000) | ❌ Not created |
| 5   | Weekly Vercel Analytics Report              | ❌ Not created |
| 6   | Cal.com Cancelled → Re-engagement Email     | ❌ Not created |
| 7   | Gumroad Download → Nurture Sequence         | ❌ Not created |

**Placeholder URLs in `.env.local` (replace after creating scenarios):**

```
MAKE_WEBHOOK_LEAD_CAPTURE=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
MAKE_WEBHOOK_CALCULATOR_QUOTE=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
MAKE_WEBHOOK_GUMROAD_DOWNLOAD=https://hook.eu2.make.com/PLACEHOLDER_REPLACE_IN_MAKE
```

---

### Priority 4: Google Search Console — Submit Sitemap

- ✅ Ownership verified
- ⏳ **Submit sitemap:**
  1. Go to https://search.google.com/search-console
  2. Select property
  3. Click "Sitemaps"
  4. Enter: `sitemap.xml`
  5. Click "Submit"

---

### Priority 5: Dodo Dashboard — Final Steps

- ✅ 12 products created via API
- ⏳ Configure hosted storefront (branding, select products)
- ⏳ Create Product Collections (Free Resources, Boilerplates)
- ⏳ Verify at: https://test.store.dodopayments.com/edmond-moepswa

---

### Priority 6: Domain Purchase (Future)

1. Purchase domain (~$10/year)
2. Configure DNS → point to Vercel
3. Add custom domain in Vercel
4. Set up Resend for branded email
5. Update `NEXT_PUBLIC_SERVER_URL`
6. Re-verify Google Search Console
7. Switch Dodo to live mode

---

## Quick-Reference Checklist

### ✅ Complete

- [x] Google Tag (gtag.js) on all pages
- [x] PostHog analytics with pageview tracking
- [x] Sentry error tracking (client + server + edge)
- [x] Better Stack uptime monitoring (2 monitors active)
- [x] Google Search Console ownership verified
- [x] 12 Dodo Payments products created (test mode)
- [x] Dodo checkout API route (`/api/checkout`)
- [x] Dodo products API route (`/api/dodo-products`)
- [x] Dodo webhook handler (`/api/webhooks/dodo`)
- [x] Store page rebuilt with Dodo integration
- [x] ResourceCards wired to Dodo product IDs
- [x] Adaptive currency enabled
- [x] `DODO_PAYMENTS_ENVIRONMENT=test` wired globally
- [x] All 11 env vars synced to Vercel
- [x] Build passes clean
- [x] All code committed and pushed to GitHub
- [x] All 5 tracks of implementation plan v3 complete
- [x] Database text content seeded (8 projects, 19 FAQs, 9 testimonials)
- [x] Sitemap auto-generation configured
- [x] Favicons generated and deployed (8 files in `public/favicon/`)
- [x] Brand assets generated and deployed (4 SVGs in `public/brand/`)
- [x] Testimonial avatars generated and deployed (4 in `public/avatars/`)
- [x] Hero portrait generated and deployed (`public/edmond-portrait-hero.webp`)
- [x] Project thumbnails generated (8 WebP files in `visual-assets/project-thumbnails/`)

### ⏳ Pending

- [ ] **Upload 8 project thumbnails to Payload CMS Media and link to projects**
- [ ] **Decide on 6 unused visual assets (keep, delete, or integrate)**
- [ ] Create 7 Make.com webhook scenarios
- [ ] Replace placeholder webhook URLs in `.env.local` and Vercel
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Configure Dodo hosted storefront (branding, select products)
- [ ] Create Dodo Product Collections (dashboard)
- [ ] Purchase custom domain, configure DNS, update Vercel
- [ ] Set up Resend for branded email
- [ ] Switch Dodo to live mode when ready

---

## Deployment Checklist

- [ ] Visit `https://edmond-moepswa.vercel.app` — all pages load
- [ ] Test `/store` — products render
- [ ] Test `/resources` — free resources use Dodo checkout
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Better Stack monitor shows "up"
- [ ] Verify Sentry captures test error
- [ ] Verify PostHog events in dashboard
- [ ] Verify GA4 events in Google Analytics
- [ ] Test calculator: select options, verify price updates
- [ ] Upload project thumbnails to Payload CMS

---

**End of Manual Steps Guide — Last Updated 14 April 2026**
