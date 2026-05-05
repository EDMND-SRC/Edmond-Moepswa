# edmond

Public website and digital product storefront for Edmond Moepswa.

This repo now ships as a **public-only Cloudflare Worker**. There is no live Payload admin, no payload worker, and no CMS runtime in the deployed architecture. Public content comes from a mix of typed launch content, direct PostgreSQL reads, Dodo Payments, Make.com automations, Cal.com webhooks, and Cloudflare R2 media delivery.

## Current architecture

- Framework: Next.js 16 on Cloudflare Workers via OpenNext
- Deployed worker: `edmond` on [edmond.bridgearc.workers.dev](https://edmond.bridgearc.workers.dev)
- Database: PostgreSQL
- Payments: Dodo Payments
- Automations: Make.com and Cal.com webhooks
- Media: Cloudflare R2 plus the image transform route
- PDF quotes: `pdf-lib`

### Content sources

- Typed launch content: `src/content/launchSnapshot.ts`, `src/content/launchServices.ts`
- Direct SQL APIs:
  - `src/app/(frontend)/api/faqs/route.ts`
  - `src/app/(frontend)/api/projects/route.ts`
- Public integrations:
  - `src/app/api/checkout/route.ts`
  - `src/app/api/dodo-products/route.ts`
  - `src/app/api/webhooks/dodo/route.ts`
  - `src/app/(frontend)/api/make-webhook/route.ts`
  - `src/app/api/cal-webhook/route.ts`
- App-owned persistence helpers:
  - `src/lib/server/postgres.ts`
  - `src/lib/server/app-persistence.ts`

## What is intentionally not here anymore

- No Payload CMS runtime
- No `/admin` launch path
- No payload worker
- No live preview workflow
- No generated Payload types or schema-driven local API

## Local setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy env values into `.env.local` from `.env.example`.

3. Apply the app-owned launch migration before testing webhook persistence:

```bash
pnpm db:migrate:launch
```

4. Run the site locally:

```bash
pnpm dev
```

5. Run the Cloudflare worker locally:

```bash
pnpm cf:dev:workers
```

## Verification

```bash
pnpm typecheck
pnpm lint
pnpm test:int
pnpm cf:build:workers
```

For remote verification:

```bash
pnpm cf:deploy:staging
pnpm cf:verify:staging
pnpm cf:deploy:prod
pnpm cf:verify:prod
```

## Environment variables

The repo now cares about these groups:

- App / Cloudflare:
  - `NEXT_PUBLIC_SERVER_URL`
  - `PREVIEW_SECRET`
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_API_TOKEN`
  - `CRON_SECRET`
- Database:
  - `DATABASE_URL`
- Dodo Payments:
  - `DODO_PAYMENTS_API_KEY`
  - `DODO_PAYMENTS_ENVIRONMENT`
  - `DODO_PAYMENTS_WEBHOOK_SECRET`
  - optional `DODO_PRODUCT_*` overrides
- Make.com:
  - `MAKE_WEBHOOK_LEAD_CAPTURE`
  - `MAKE_WEBHOOK_CALCULATOR_QUOTE`
  - `MAKE_WEBHOOK_RESOURCE_DOWNLOAD`
  - `MAKE_WEBHOOK_DODO_PAYMENTS`
- Cal.com:
  - `CAL_WEBHOOK_URL`
  - `CAL_USERNAME`
  - `CAL_NAMESPACE`
- R2 / media:
  - `R2_BUCKET`
  - `R2_REGION`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_ENDPOINT`
  - `R2_PUBLIC_URL`
- Analytics / social:
  - `NEXT_PUBLIC_POSTHOG_API_HOST`
  - `NEXT_PUBLIC_POSTHOG_API_KEY`
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `NEXT_PUBLIC_INSTAGRAM_URL`
  - `NEXT_PUBLIC_LINKEDIN_URL`
  - `NEXT_PUBLIC_SUBSTACK_URL`
  - `NEXT_PUBLIC_THREADS_URL`
  - `NEXT_PUBLIC_X_URL`
  - `SUBSTACK_FEED_URL`

## Make.com and webhook truth

- `/api/make-webhook` accepts:
  - `lead-capture`
  - `calculator-quote`
  - `resource-download`
- `/api/cal-webhook` stays server-side only.
- `/api/webhooks/dodo` verifies the Dodo signature, persists orders and mirrored leads through direct Postgres, and optionally forwards the event to `MAKE_WEBHOOK_DODO_PAYMENTS`.

## Operational truth

- Overview: `docs/project-overview.md`
- Architecture: `docs/architecture-main.md`
- Deployment: `docs/deployment-guide.md`
- Development: `docs/development-guide.md`
- APIs: `docs/api-contracts.md`
- Data model: `docs/data-models.md`
- Current project context: `_bmad-output/project-context.md`
- Rollout / handover log: `_bmad-output/cloudflare-migration-handover-2026-04-30-rollout.md`
