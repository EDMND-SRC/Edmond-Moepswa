# Implementation Plan — Edmond Moepswa Portfolio UX & Feature Revision (v3)

**Date:** 7 April 2026  
**Status:** ✅ **FULLY EXECUTED** — all 5 tracks complete  
**Scope:** All fixable issues requiring no pending manual steps — no image uploads, no account setup, no credentials.  
**Execution Date:** 7 April 2026  
**Verification:** `tsc --noEmit` — zero errors · Dev server — all pages return 200 · Code review — 6 issues found, all fixed

---

## Execution Summary

### Track 1: Hero & Navigation Polish ✅ COMPLETE

| #   | Change                                                                                        | Status  | File(s)                      |
| --- | --------------------------------------------------------------------------------------------- | ------- | ---------------------------- |
| 1.1 | Hero text restructure ("From P&L statements..." removed, remaining text repositioned lower)   | ✅ Done | `HeroSection.tsx`            |
| 1.2 | Social links `#` placeholders (LinkedIn, X, Instagram, Threads, GitHub)                       | ✅ Done | `constants.ts`               |
| 1.3 | Book Call icon sized up (`w-4 h-4 md:w-5 md:h-5`, text `sm md:base`)                          | ✅ Done | `HeroSection.tsx`            |
| 1.4 | Substack URL defaulted to `https://substack.com/@edmnd` + `SUBSTACK_FEED_URL` in `.env.local` | ✅ Done | `constants.ts`, `.env.local` |

### Track 2: Services Section Redesign & Commitments Relocation ✅ COMPLETE

| #   | Change                                                                                              | Status  | File(s)                                         |
| --- | --------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------- |
| 2.1 | Spacing reduced (`gap-32/48` → `gap-16/24`, parallax `[150,-150]` → `[40,-40]`)                     | ✅ Done | `ServicesSection/index.tsx`, `ServiceBlock.tsx` |
| 2.2 | Homepage: pricing removed via `showPricing={false}` prop; title + description + "Learn more →" link | ✅ Done | `ServiceBlock.tsx`, `ServicesSection/index.tsx` |
| 2.3 | Section label renamed to `"// Services"`                                                            | ✅ Done | `ServicesSection/index.tsx`                     |
| 2.4 | CommitmentsSection moved to About page (after Philosophy, before Cal.com CTA)                       | ✅ Done | `page.tsx`, `about/page.tsx`                    |

### Track 3: Projects Filtering & Testimonials ✅ COMPLETE

| #   | Change                                                                                                 | Status  | File(s)                         |
| --- | ------------------------------------------------------------------------------------------------------ | ------- | ------------------------------- |
| 3.1 | Boilerplate projects filtered from homepage (`"Boilerplate Products"` excluded)                        | ✅ Done | `ProjectsSection.tsx`           |
| 3.2 | "Boilerplate Products" filter pill removed from category labels                                        | ✅ Done | `ProjectsSection.tsx`           |
| 3.3 | TestimonialsSection created — 4 fictional placeholders, 3D flip carousel, pause/play, initials avatars | ✅ Done | `TestimonialsSection.tsx` (new) |
| 3.4 | "Verified" badge removed from placeholder testimonials                                                 | ✅ Done | `TestimonialsSection.tsx`       |
| 3.5 | Dead error state/loading state removed from TestimonialsSection                                        | ✅ Done | `TestimonialsSection.tsx`       |

### Track 4: Interactive Calculator Rebuild ✅ COMPLETE

| #   | Change                                                                                                             | Status  | File(s)                                              |
| --- | ------------------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------- |
| 4.1 | Add-on definitions added to all 6 service categories (14 + 3 + 3 + 2 + 1 + 2 = 25 addons)                          | ✅ Done | `CalculatorSection/data.ts`                          |
| 4.2 | Interactive state: tier selector, add-on checkboxes with steppers, delivery timeline, static discount              | ✅ Done | `CalculatorSection/index.tsx`                        |
| 4.3 | Live summary panel with itemized breakdown and animated total                                                      | ✅ Done | `CalculatorSection/index.tsx`                        |
| 4.4 | Path A: Enhanced QuoteModal — 11 project scope checkboxes, notes textarea, phone field, structured webhook payload | ✅ Done | `CalculatorSection/QuoteModal.tsx`                   |
| 4.5 | Path B: Pre-populated WhatsApp message with service package                                                        | ✅ Done | `CalculatorSection/index.tsx`                        |
| 4.6 | Path C: Download summary in .md / .txt / .csv format                                                               | ✅ Done | `CalculatorSection/SummaryDownload.tsx` (new)        |
| 4.7 | **Bug fix:** Delivery cost math — now passed as `deliveryCostBWP` from parent instead of reverse-engineered        | ✅ Done | `index.tsx`, `QuoteModal.tsx`, `SummaryDownload.tsx` |
| 4.8 | **Bug fix:** WhatsApp "static discount" wording changed to "Simplified-site discount: –P500"                       | ✅ Done | `CalculatorSection/index.tsx`                        |

### Track 5: Homepage Restructure, Substack Fix, LogoMarquee, Footer ✅ COMPLETE

| #   | Change                                                                                                                                       | Status  | File(s)                 |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------- |
| 5.1 | Substack API route bug fixed (early return only on `#` or empty string)                                                                      | ✅ Done | `api/substack/route.ts` |
| 5.2 | LogoMarquee repositioned to immediately after IntroSection                                                                                   | ✅ Done | `page.tsx`              |
| 5.3 | Homepage: 13 sections → 9 sections (ProcessSection→services, FAQSection→contact, CalSection/FreeResourcesSection/CommitmentsSection removed) | ✅ Done | `page.tsx`              |
| 5.4 | SectionNav removed from root layout                                                                                                          | ✅ Done | `layout.tsx`            |
| 5.5 | ProcessSection imported into `/services` page                                                                                                | ✅ Done | `services/page.tsx`     |
| 5.6 | FAQSection imported into `/contact` page                                                                                                     | ✅ Done | `contact/page.tsx`      |
| 5.7 | HomePageFooter redesigned — portrait occupies full area, nav links below, social icons bottom-right, legal bottom-left                       | ✅ Done | `HomePageFooter.tsx`    |

---

## Homepage Section Map (Before → After)

### Before (13 sections)

1. HeroSection
2. IntroSection (wrapped in ParallaxBackground)
3. ServicesSection (wrapped in ParallaxBackground)
4. ProjectsSection
5. CommitmentsSection
6. LogoMarquee
7. ProcessSection (wrapped in ParallaxBackground)
8. FAQSection (wrapped in ParallaxBackground)
9. CalculatorSection
10. CalSection
11. FreeResourcesSection
12. SubstackFeed
13. HomePageFooter

### After (9 sections)

1. HeroSection
2. IntroSection
3. LogoMarquee
4. ServicesSection (descriptions only, no pricing)
5. ProjectsSection (boilerplate filtered)
6. **TestimonialsSection** (new — 4 fictional placeholders)
7. CalculatorSection (fully interactive)
8. SubstackFeed
9. **HomePageFooter** (redesigned)

**Net reduction:** ~30% scroll depth improvement.

---

## Remaining Work (Manual Steps Only)

The following items require external accounts, credentials, or visual assets and cannot be automated:

| Category               | Items                                                                                                                | Est. Effort |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| **Visual Assets**      | Generate 8 project thumbnails, 4 testimonial avatars, 1 favicon from `ai-image-generation-prompts.md`; upload to CMS | 1-2 hrs     |
| **Platform Accounts**  | Dodo Payments, PostHog, Sentry, Better Stack, Google Search Console, GA4                                             | 1-2 hrs     |
| **Make.com Scenarios** | 7 scenarios for automated emails, lead tracking, nurture sequences                                                   | 1-2 hrs     |
| **Deployment**         | Git push, Vercel env vars, post-deploy verification                                                                  | 30 min      |

**See:** `_bmad-output/manual-steps-guide.md` for complete step-by-step instructions.

---

## Code Review Findings — All Resolved

| #   | Issue                                                                             | Severity | Resolution                                    |
| --- | --------------------------------------------------------------------------------- | -------- | --------------------------------------------- |
| 1   | Boilerplate filter pill shown despite all boilerplate projects being filtered out | Medium   | Removed `boilerplate` from `categoryLabels`   |
| 2   | TestimonialsSection dead error state/loading state                                | Low      | Removed dead code                             |
| 3   | "Verified" badge on fictional placeholder testimonials                            | High     | Removed badge                                 |
| 4   | QuoteModal delivery cost reverse-engineered incorrectly from total                | High     | Now uses `deliveryCostBWP` from parent        |
| 5   | SummaryDownload CSV same delivery cost math bug                                   | High     | Now uses `deliveryCostBWP` from parent        |
| 6   | WhatsApp message shows "Static discount: Yes/No" (internal jargon)                | Medium   | Reworded to "Simplified-site discount: –P500" |

---

## Files Created

| File                                                            | Purpose                                            |
| --------------------------------------------------------------- | -------------------------------------------------- |
| `src/components/homepage/TestimonialsSection.tsx`               | Testimonial carousel with 4 fictional placeholders |
| `src/components/homepage/CalculatorSection/SummaryDownload.tsx` | Download summary in .md / .txt / .csv format       |

## Files Modified (~18)

| File                                                       | Changes                                                           |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| `src/components/homepage/HeroSection.tsx`                  | Hero text restructure, icon sizing                                |
| `src/lib/constants.ts`                                     | Social URLs → `#`, Substack default URL                           |
| `.env.local`                                               | Added `SUBSTACK_FEED_URL`                                         |
| `src/components/homepage/ServicesSection/index.tsx`        | Removed CurrencySelector, reduced spacing, `showPricing={false}`  |
| `src/components/homepage/ServicesSection/ServiceBlock.tsx` | Added `showPricing` prop, reduced parallax/min-h                  |
| `src/components/homepage/ProjectsSection.tsx`              | Boilerplate filter, removed boilerplate category                  |
| `src/components/homepage/CalculatorSection/index.tsx`      | Complete rebuild with interactive state                           |
| `src/components/homepage/CalculatorSection/data.ts`        | Added `AddonOption` interface + addons per category               |
| `src/components/homepage/CalculatorSection/QuoteModal.tsx` | Enhanced with scope options, package summary, fixed delivery cost |
| `src/app/(frontend)/page.tsx`                              | Homepage restructure: 13→9 sections                               |
| `src/app/(frontend)/layout.tsx`                            | Removed SectionNav                                                |
| `src/app/(frontend)/about/page.tsx`                        | Added CommitmentsSection                                          |
| `src/app/(frontend)/services/page.tsx`                     | Added ProcessSection                                              |
| `src/app/(frontend)/contact/page.tsx`                      | Added FAQSection                                                  |
| `src/app/api/substack/route.ts`                            | Fixed early return bug                                            |
| `src/components/homepage/HomePageFooter.tsx`               | Complete redesign                                                 |

## Files Deleted: 0

---

**Implementation Plan v3 — Execution Complete — 7 April 2026**
