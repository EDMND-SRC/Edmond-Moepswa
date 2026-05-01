# Source Tree Analysis

Generated: `2026-05-01T07:42:21+0200`

This scan goes at least three levels deep and focuses on the live implementation rather than generated build output.

## Root Layout

```text
.
├── AGENTS.md
├── DESIGN.md
├── README.md
├── _bmad/
│   ├── _config/
│   ├── bmm/
│   ├── cis/
│   ├── core/
│   ├── custom/
│   ├── scripts/
│   └── tea/
├── _bmad-output/
│   ├── cloudflare-migration-handover-2026-04-28.md
│   ├── cloudflare-migration-handover-2026-04-29.md
│   ├── cloudflare-migration-handover-2026-04-30-rollout.md
│   ├── make-com-api-guide.md
│   └── planning and workflow artifacts
├── business-planning/
│   ├── creative/
│   ├── market-research/
│   ├── profile/
│   ├── services/
│   └── strategy-docs/
├── cloudflare/
│   ├── route-manifest.json
│   └── workers/
├── docs/
│   ├── api-contracts.md
│   ├── architecture-main.md
│   ├── component-inventory.md
│   ├── data-models.md
│   ├── deployment-guide.md
│   ├── development-guide.md
│   ├── index.md
│   ├── project-overview.md
│   ├── project-parts.json
│   ├── project-scan-report.json
│   └── source-tree-analysis.md
├── functions/
│   └── api/
├── make-workflows/
│   ├── README.md
│   ├── blueprints/
│   ├── create-scenarios.mjs
│   └── templates/
├── migrations_backup/
├── public/
│   ├── avatars/
│   ├── brand/
│   ├── favicon/
│   ├── fonts/
│   ├── media/
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── check-media.ts
│   ├── cleanup-projects.ts
│   ├── link-project-thumbnails.ts
│   └── seed and migration helpers
├── src/
├── tests/
│   ├── e2e/
│   ├── helpers/
│   ├── int/
│   └── unit/
├── wrangler.payload.toml
├── wrangler.public.toml
└── wrangler.toml
```

## `src/` Map

```text
src
├── Header/
│   ├── Component.client.tsx
│   ├── Component.tsx
│   ├── Nav/
│   │   └── index.tsx
│   ├── RowLabel.tsx
│   ├── config.ts
│   └── hooks/
│       └── revalidateHeader.ts
├── Footer/
│   ├── Component.tsx
│   ├── RowLabel.tsx
│   ├── config.ts
│   └── hooks/
│       └── revalidateFooter.ts
├── access/
│   ├── anyone.ts
│   ├── authenticated.ts
│   └── authenticatedOrPublished.ts
├── app/
│   ├── (frontend)/
│   │   ├── (sitemaps)/
│   │   │   └── pages-sitemap.xml/route.ts
│   │   ├── [slug]/
│   │   │   ├── page.client.tsx
│   │   │   └── page.tsx
│   │   ├── about/page.tsx
│   │   ├── api/
│   │   │   ├── faqs/route.ts
│   │   │   ├── make-webhook/route.ts
│   │   │   ├── pages/route.ts
│   │   │   ├── projects/route.ts
│   │   │   ├── services/route.ts
│   │   │   └── testimonials/route.ts
│   │   ├── contact/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── resources/
│   │   │   ├── page.tsx
│   │   │   └── success/page.tsx
│   │   ├── search/
│   │   │   ├── page.client.tsx
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── data.ts
│   │   │   └── page.tsx
│   │   └── policy and legal pages
│   ├── (payload)/
│   │   ├── admin/
│   │   │   ├── [[...segments]]/page.tsx
│   │   │   ├── [[...segments]]/not-found.tsx
│   │   │   └── importMap.js
│   │   ├── api/
│   │   │   ├── [...slug]/route.ts
│   │   │   ├── graphql/route.ts
│   │   │   └── graphql-playground/route.ts
│   │   ├── custom.scss
│   │   └── layout.tsx
│   └── api/
│       ├── cal-webhook/route.ts
│       ├── checkout/route.ts
│       ├── dodo-products/route.ts
│       ├── geo/route.ts
│       ├── media/transform/route.ts
│       ├── substack/route.ts
│       └── webhooks/dodo/route.ts
├── blocks/
│   ├── ArchiveBlock/
│   │   ├── Component.tsx
│   │   └── config.ts
│   ├── CallToAction/
│   │   ├── Component.tsx
│   │   └── config.ts
│   ├── Code/
│   │   ├── Component.client.tsx
│   │   ├── Component.tsx
│   │   ├── CopyButton.tsx
│   │   └── config.ts
│   ├── Content/
│   │   ├── Component.tsx
│   │   └── config.ts
│   ├── Form/
│   │   ├── Checkbox/index.tsx
│   │   ├── Country/index.tsx
│   │   ├── Email/index.tsx
│   │   ├── Error/index.tsx
│   │   ├── Message/index.tsx
│   │   ├── Number/index.tsx
│   │   ├── Select/index.tsx
│   │   ├── State/index.tsx
│   │   ├── Text/index.tsx
│   │   ├── Textarea/index.tsx
│   │   ├── Width/index.tsx
│   │   ├── Component.tsx
│   │   ├── config.ts
│   │   └── fields.tsx
│   ├── MediaBlock/
│   │   ├── Component.tsx
│   │   └── config.ts
│   └── RenderBlocks.tsx
├── collections/
│   ├── FAQs.ts
│   ├── Leads.ts
│   ├── Media.ts
│   ├── Orders.ts
│   ├── Pages/
│   │   ├── hooks/revalidatePage.ts
│   │   └── index.ts
│   ├── Products.ts
│   ├── Projects.ts
│   ├── Services.ts
│   ├── Testimonials.ts
│   └── Users/index.ts
├── components/
│   ├── AdminBar/
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── BeforeDashboard/
│   │   ├── SeedButton/
│   │   │   ├── index.scss
│   │   │   └── index.tsx
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── BeforeLogin/
│   │   └── index.tsx
│   ├── Media/
│   │   ├── ImageMedia/index.tsx
│   │   ├── VideoMedia/index.tsx
│   │   ├── index.tsx
│   │   └── types.ts
│   ├── homepage/
│   │   ├── CalculatorSection/
│   │   │   ├── AnimatedNumber.tsx
│   │   │   ├── QuoteModal.tsx
│   │   │   ├── SummaryDownload.tsx
│   │   │   ├── data.ts
│   │   │   └── index.tsx
│   │   ├── ProjectsSection/
│   │   │   ├── ProjectsSectionClient.tsx
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── ServicesSection/
│   │   │   ├── ServiceBlock.tsx
│   │   │   ├── ServiceNumber.tsx
│   │   │   ├── Stardust.tsx
│   │   │   ├── data.ts
│   │   │   └── index.tsx
│   │   └── other homepage sections
│   ├── ui/
│   │   ├── AnimatedCounter.tsx
│   │   ├── CurrencySelector.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── FloatingShapes.tsx
│   │   ├── HorizontalScroll.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── MobileNav.tsx
│   │   ├── PageTransition.tsx
│   │   ├── ParallaxBackground.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── ScrollTextReveal.tsx
│   │   ├── SectionNav.tsx
│   │   ├── SkeletonPulse.tsx
│   │   ├── SkipToContent.tsx
│   │   └── form and layout primitives
│   └── shared content and icon components
├── fields/
│   ├── defaultLexical.ts
│   ├── link.ts
│   └── linkGroup.ts
├── globals/
│   └── SiteSettings.ts
├── heros/
│   ├── HighImpact/index.tsx
│   ├── LowImpact/index.tsx
│   ├── MediumImpact/index.tsx
│   ├── RenderHero.tsx
│   └── config.ts
├── hooks/
│   ├── populatePublishedAt.ts
│   ├── revalidateRedirects.ts
│   └── useReducedMotion.ts
├── lib/
│   ├── cloudflare/
│   │   ├── drizzle-kit-runtime-stub.ts
│   │   └── workerSafePg.ts
│   ├── constants.ts
│   ├── currency.ts
│   ├── icon-registry.tsx
│   ├── payload.ts
│   ├── posthog-provider.tsx
│   ├── substack.ts
│   └── utils.ts
├── migrations/
│   ├── 20260406_065751_init.json
│   ├── 20260406_065751_init.ts
│   ├── 20260413_073331_fix_projects_schema.json
│   ├── 20260413_073331_fix_projects_schema.ts
│   └── index.ts
├── plugins/
│   └── index.ts
├── providers/
│   ├── HeaderTheme/index.tsx
│   ├── Theme/
│   │   ├── InitTheme/index.tsx
│   │   ├── ThemeSelector/index.tsx
│   │   ├── shared.ts
│   │   └── types.ts
│   └── index.tsx
├── scripts/
│   ├── check-media-local.ts
│   ├── cleanup-cloudflare-smoke-data.ts
│   ├── cloudflare-sync-secrets.mjs
│   ├── cloudflare-workers.mjs
│   ├── create-dodo-automations.ts
│   ├── ensure-cloudflare-smoke-user.ts
│   ├── lib/
│   │   ├── cloudflare-smoke.ts
│   │   └── cloudflare-workers/
│   │       ├── config.mjs
│   │       ├── process.mjs
│   │       ├── routes.mjs
│   │       ├── workspace.mjs
│   │       └── wrangler-http-timeout.cjs
│   ├── measure-admin-performance.ts
│   ├── patch-opennext-cloudflare.mjs
│   ├── purge-vercel-content.ts
│   ├── seed-products.ts
│   ├── sync-dodo-products.ts
│   └── test-dodo.ts
├── search/
│   ├── Component.tsx
│   ├── beforeSync.ts
│   └── fieldOverrides.ts
└── utilities/
    ├── canUseDOM.ts
    ├── deepMerge.ts
    ├── formatDateTime.ts
    ├── generateMeta.ts
    ├── generatePreviewPath.ts
    ├── getDocument.ts
    ├── getDodoEnvironment.ts
    ├── getGlobals.ts
    ├── getMeUser.ts
    ├── getMediaTransformURL.ts
    ├── getMediaUrl.ts
    ├── getRedirects.ts
    ├── getURL.ts
    ├── mergeOpenGraph.ts
    ├── toBufferedResponse.ts
    ├── toKebabCase.ts
    ├── ui.ts
    ├── useClickableCard.ts
    └── useDebounce.ts
```

## Directory Notes

### `src/app/(frontend)`

- public routes are mixed between static pages, CMS-driven dynamic pages, and public APIs
- homepage is a large client component with section-level dynamic imports
- several policy pages are hard-coded marketing/legal content rather than CMS pages
- `api/quote-pdf/` exists as a directory but currently does not expose a `route.ts`
- explicitly notable paths in this area include:
  - `src/app/(frontend)/api/projects/route.ts`
  - `src/app/(frontend)/api/faqs/route.ts`
  - `src/app/(frontend)/api/pages/route.ts`
  - `src/app/(frontend)/[slug]/page.tsx`

### `src/app/(payload)`

- largely generated Payload Next integration surface
- `admin/importMap.js` is a critical file because it exposes the admin component dependency surface
- generated route files should be treated as derived integration points, not hand-authored business logic

### `src/components/homepage`

- this is the visual heart of the brand site
- nested section directories go deeper than three levels in places, especially for calculator, projects, and services sections
- the pricing calculator and projects/services sections are complex enough to deserve feature-level ownership if the repo keeps growing
- explicitly notable nested paths include:
  - `src/components/homepage/CalculatorSection/AnimatedNumber.tsx`
  - `src/components/homepage/CalculatorSection/QuoteModal.tsx`
  - `src/components/homepage/ProjectsSection/ProjectsSectionClient.tsx`
  - `src/components/homepage/ServicesSection/ServiceBlock.tsx`

### `src/scripts`

- this is no longer a small scripts folder
- it contains real deployment automation, verification logic, secret synchronization, smoke-user provisioning, and performance measurement
- `src/scripts/lib/cloudflare-workers/` is effectively an internal deployment tool package
- explicitly notable nested paths include:
  - `src/scripts/lib/cloudflare-workers/workspace.mjs`
  - `src/scripts/lib/cloudflare-workers/process.mjs`
  - `src/scripts/lib/cloudflare-workers/routes.mjs`
  - `src/scripts/measure-admin-performance.ts`

### `business-planning`

- not runtime code, but materially important to understanding why the site contains pricing logic, service tiers, strategy writeups, and productized digital resources
- `strategy-docs/` is especially dense and reflects broader ecosystem evaluation beyond the application itself
- explicitly notable path:
  - `business-planning/strategy-docs/`

### `functions/` and `cloudflare/workers/`

- both are currently thin
- `functions/api/` appears to be a placeholder or leftover integration location
- `cloudflare/workers/` exists beside the generated route manifest but is not currently the main source of worker logic
