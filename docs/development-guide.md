# Development Guide

Generated: `2026-05-01T07:42:21+0200`

## Prerequisites

- Node.js `20+`
- pnpm `9+` or `10+`
- PostgreSQL
- Cloudflare credentials for worker deploy/verify workflows

## Core Install and Boot Commands

```bash
pnpm install
pnpm generate:importmap
pnpm generate:types
pnpm dev
```

Standard local site URLs:

- public app: `http://localhost:3000`
- Payload admin: `http://localhost:3000/admin`

## Environment Setup

Base template: `.env.example`

Important env groups:

- database
  - `DATABASE_URL`
- Payload
  - `PAYLOAD_SECRET`
  - `PAYLOAD_ADMIN_EMAIL`
  - `PAYLOAD_ADMIN_PASSWORD`
- runtime URL
  - `NEXT_PUBLIC_SERVER_URL`
- Cal.com
  - `CAL_WEBHOOK_URL`
  - `CAL_USERNAME`
  - `CAL_NAMESPACE`
- Make.com
  - `MAKE_WEBHOOK_LEAD_CAPTURE`
  - `MAKE_WEBHOOK_CALCULATOR_QUOTE`
  - related Make API fields in `.env.local`
- commerce
  - `DODO_PAYMENTS_API_KEY`
  - `DODO_PAYMENTS_WEBHOOK_SECRET`
  - product ID env vars
- media
  - `R2_BUCKET`
  - `R2_REGION`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_ENDPOINT`

## Local Development Modes

### 1. Standard Next/Payload mode

```bash
pnpm dev
```

Use this for:

- frontend work
- CMS schema work
- typical component development

### 2. Cloudflare worker mode

```bash
pnpm cf:dev:workers
```

This mode matters when:

- changing public/payload route ownership
- debugging worker-specific behavior
- validating Cloudflare-only issues
- reproducing staging rollout problems

## Build and Validation Commands

### Core validation

```bash
pnpm typecheck
pnpm lint
pnpm build
```

### Cloudflare-specific validation

```bash
pnpm cf:build:workers
pnpm cf:verify:staging
pnpm cf:verify:prod
```

### Payload generated artifacts

```bash
pnpm generate:importmap
pnpm generate:types
pnpm cf-typegen
```

## Testing

### E2E

```bash
pnpm test:e2e
```

Notes:

- Playwright config uses `pnpm dev` as the default web server unless `E2E_SKIP_WEBSERVER` is set.
- base URL comes from `E2E_BASE_URL`.
- smoke-user mode is enabled via `E2E_USE_SMOKE_USER=1`.

### Integration and unit

```bash
pnpm test:int
pnpm test
```

Vitest coverage currently focuses on:

- Local API queries
- collection shape assumptions
- test database isolation
- icon registry lookup behavior

## Seeding and Fixtures

Primary seed entrypoint:

```bash
npx tsx seed.ts
```

Supporting scripts:

- `src/scripts/seed-products.ts`
- `src/scripts/ensure-cloudflare-smoke-user.ts`
- `src/scripts/cleanup-cloudflare-smoke-data.ts`
- older utility scripts in `scripts/`

## Cloudflare Tooling Layout

Important local tooling entrypoints:

- `src/scripts/cloudflare-workers.mjs`
- `src/scripts/patch-opennext-cloudflare.mjs`
- `src/scripts/measure-admin-performance.ts`
- `src/scripts/cloudflare-sync-secrets.mjs`

These scripts should be treated as part of the product's operating surface, not just throwaway helpers.

## Common Developer Pitfalls

### Generated files

These files are derived and should be regenerated rather than hand-maintained:

- `src/app/(payload)/admin/importMap.js`
- `src/payload-types.ts`
- generated Payload route wrappers under `src/app/(payload)/api`

### Cloudflare runtime differences

Behavior that looks fine under `pnpm dev` may fail under worker execution. When changing:

- admin bundle shape
- public/payload route ownership
- database access patterns
- response streaming

always test in worker mode as well.

### Payload Local API usage

Follow the repo rule already reflected in the source:

- when acting as a user-facing route, use `overrideAccess: false`

### Worker-safe database path

`workerSafePg` exists for a reason. Do not remove or bypass it casually in Cloudflare-oriented changes.

## Useful Files For New Contributors

- `README.md`
- `DESIGN.md`
- `src/payload.config.ts`
- `src/plugins/index.ts`
- `src/app/(frontend)/layout.tsx`
- `src/app/(frontend)/page.tsx`
- `src/scripts/cloudflare-workers.mjs`
- `_bmad-output/cloudflare-migration-handover-2026-04-30-rollout.md`
