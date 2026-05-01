# Edmond Moepswa

Production website, CMS, and automation hub for Edmond Moepswa's personal brand and digital services business.

This repository powers:

- the public marketing site
- the Payload CMS admin and APIs
- digital product checkout and webhook handling
- lead capture and booking workflows
- Cloudflare Workers deployment and verification tooling

## Architecture At A Glance

- Monolith repository
- Public frontend: Next.js 16 App Router
- CMS/admin: Payload CMS 3
- Database: PostgreSQL
- Hosting target: Cloudflare Workers via OpenNext
- Media storage: Cloudflare R2 through `@payloadcms/storage-s3`
- Payments: Dodo Payments
- Automation: Make.com
- Booking: Cal.com

The deployed runtime is intentionally split into two workers:

- public worker
  - serves the public Next.js app
  - owns public APIs and proxies payload-owned routes
- payload worker
  - serves `/admin/*`
  - serves generated Payload REST and GraphQL routes

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js `16.2.3` |
| CMS | Payload `3.82.0` |
| Language | TypeScript `6.0.2` |
| Database | PostgreSQL via `@payloadcms/db-postgres` |
| Deployment | `@opennextjs/cloudflare` + Wrangler |
| Styling | Tailwind CSS 4 |
| UI | custom components + Radix primitives |
| Animation | Motion, GSAP, Lenis |
| Payments | Dodo Payments |
| Analytics | PostHog + Google Analytics |
| Testing | Playwright + Vitest |

## What The App Contains

- public pages for homepage, about, services, contact, resources, search, and policy/legal content
- CMS-driven pages via `src/app/(frontend)/[slug]`
- 10 Payload collections:
  - `pages`
  - `services`
  - `projects`
  - `testimonials`
  - `faqs`
  - `media`
  - `leads`
  - `users`
  - `orders`
  - `products`
- 3 Payload globals:
  - `header`
  - `footer`
  - `site-settings`
- public API routes for content, geo, media transforms, checkout, and webhooks
- Cloudflare deploy/verify scripts under `src/scripts/`

## Repository Layout

```text
src/
  app/
    (frontend)/      public site pages and public content APIs
    (payload)/       Payload admin, REST, and GraphQL
    api/             integration routes and webhook handlers
  collections/       Payload collection configs
  components/        public UI, admin helpers, section components
  scripts/           Cloudflare build/deploy/verify tooling
  lib/cloudflare/    worker-specific runtime support
  utilities/         shared helpers
public/              static assets and media
tests/               Playwright + Vitest suites
docs/                generated brownfield project documentation
business-planning/   strategy and service artifacts
_bmad-output/        rollout handovers and generated operations docs
```

## Local Development

### Prerequisites

- Node.js `20+`
- pnpm `9+` or `10+`
- PostgreSQL
- `.env.local` populated from `.env.example`

### Install

```bash
pnpm install
pnpm generate:importmap
pnpm generate:types
```

### Run Standard Local Dev

```bash
pnpm dev
```

Default URLs:

- public app: `http://localhost:3000`
- admin: `http://localhost:3000/admin`

### Run In Cloudflare Worker Mode

```bash
pnpm cf:dev:workers
```

Use this mode when you need to validate:

- public vs payload route ownership
- worker-specific runtime behavior
- Cloudflare deploy/verify regressions

## Useful Commands

### Core

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm test
```

### Payload

```bash
pnpm generate:importmap
pnpm generate:types
pnpm payload
```

### Cloudflare

```bash
pnpm cf:build:workers
pnpm cf:dev:workers
pnpm cf:deploy:staging
pnpm cf:deploy:prod
pnpm cf:verify:staging
pnpm cf:verify:prod
pnpm cf:sync-secrets
pnpm cf-typegen
```

### Smoke / Ops Helpers

```bash
pnpm cf:ensure-smoke-user
pnpm cf:cleanup-smoke-data
pnpm exec tsx ./src/scripts/measure-admin-performance.ts --base-url http://127.0.0.1:8787
```

## Testing

### E2E

```bash
pnpm test:e2e
```

Playwright config:

- tests live in `tests/e2e`
- base URL defaults to `http://localhost:3000`
- uses `pnpm dev` as the default local web server unless skipped by env

### Integration / Unit

```bash
pnpm test:int
```

Vitest covers:

- Payload Local API integration checks
- selected collection behavior
- unit behavior for shared utilities such as the icon registry

## Data And Content Notes

- `projects` powers the homepage portfolio and selected public API responses
- `products` and `orders` support Dodo-backed digital product flows
- `leads` captures direct form and purchase-adjacent lead information
- `media` uses R2-compatible storage and Cloudflare-backed transform helpers
- `pages` uses a block-based layout builder and hero variants

## Cloudflare Notes

The Cloudflare deployment system is not a thin wrapper. The repo contains real deployment orchestration in:

- `src/scripts/cloudflare-workers.mjs`
- `src/scripts/lib/cloudflare-workers/config.mjs`
- `src/scripts/lib/cloudflare-workers/process.mjs`
- `src/scripts/lib/cloudflare-workers/routes.mjs`
- `src/scripts/lib/cloudflare-workers/workspace.mjs`

These scripts:

- build separate public and payload worker variants
- write the route manifest used for worker ownership checks
- patch generated worker bundles
- capture deployment baselines and rollback data
- run post-deploy verification

## Documentation

Generated project documentation lives in `docs/`:

- `docs/project-overview.md`
- `docs/architecture-main.md`
- `docs/source-tree-analysis.md`
- `docs/component-inventory.md`
- `docs/api-contracts.md`
- `docs/data-models.md`
- `docs/development-guide.md`
- `docs/deployment-guide.md`

## Operational Guidance

For live rollout status and current Cloudflare migration state, check the latest handover in `_bmad-output/`, especially:

- `_bmad-output/cloudflare-migration-handover-2026-04-30-rollout.md`

That file is the live operational companion to this repository and is more current than a static README for staging/production readiness.

## License

MIT
