# Architecture Overview

Generated: `2026-05-01T07:42:21+0200`

## High-Level Shape

This is a single-repo, dual-runtime web system:

- authoring and structured content live in Payload CMS
- public rendering lives in Next.js App Router
- deployment is split between a public Cloudflare worker and a payload Cloudflare worker
- both workers ultimately depend on the same PostgreSQL database and shared repository source

## Main Architectural Layers

### 1. Presentation Layer

The public UI is implemented in `src/app/(frontend)` and component folders under `src/components`.

Key traits:

- dark-first, motion-heavy personal-brand frontend
- large client-side homepage composition in `src/app/(frontend)/page.tsx`
- CMS-driven dynamic pages via `src/app/(frontend)/[slug]/page.tsx`
- dedicated pages for services, about, contact, resources, and legal content

### 2. CMS Layer

Payload is configured in `src/payload.config.ts`.

Key traits:

- Postgres-backed collections and globals
- admin UI under `src/app/(payload)`
- plugin stack for forms, redirects, search, SEO, and R2 storage
- user auth via the `users` collection
- selective admin trimming when `CLOUDFLARE_WORKER_VARIANT === 'payload'`

### 3. Integration Layer

The application exposes route handlers for:

- Dodo Payments checkout and webhook ingestion
- Cal.com booking webhook proxying
- Make.com outbound webhook dispatch
- Substack RSS ingestion
- geo lookup
- media transformation through Cloudflare Images

### 4. Deployment and Worker Orchestration Layer

Cloudflare-specific orchestration lives in:

- `src/scripts/cloudflare-workers.mjs`
- `src/scripts/lib/cloudflare-workers/config.mjs`
- `src/scripts/lib/cloudflare-workers/process.mjs`
- `src/scripts/lib/cloudflare-workers/routes.mjs`
- `src/scripts/lib/cloudflare-workers/workspace.mjs`

This layer:

- builds separate public and payload workspaces
- prunes source differently per worker variant
- writes a route manifest
- patches generated worker bundles
- uploads and deploys worker versions
- captures deployment baselines and rollback commands
- runs post-deploy verification

## Request Flow

### Public page request

1. Request lands on the public worker.
2. The worker checks the generated route manifest.
3. If the pathname is public, it serves the public Next.js bundle directly.
4. If the pathname is payload-owned, it proxies to the payload worker.

This split is encoded by:

- `cloudflare/route-manifest.json`
- `patchPublicWorker()` and `patchPayloadWorker()` in `workspace.mjs`

### Payload admin request

1. `/admin/*` goes to the payload worker.
2. Payload's generated `RootLayout` and `RootPage` render the admin shell.
3. The admin import map wires custom components such as `BeforeLogin`, row labels, and upload handlers.

Relevant files:

- `src/app/(payload)/layout.tsx`
- `src/app/(payload)/admin/[[...segments]]/page.tsx`
- `src/app/(payload)/admin/importMap.js`

### Public content API request

Content endpoints currently mix two styles:

- Payload Local API queries
  - `/api/pages`
  - `/api/services`
  - `/api/testimonials`
  - `/api/faqs`
- direct SQL for performance-sensitive content
  - `/api/projects`

The recent architecture direction is visible here: use Payload where performance is acceptable, and use more surgical access when the Workers runtime needs tighter control.

### Payload REST or GraphQL request

1. Request is routed to the payload worker.
2. Generated Payload route wrappers handle REST or GraphQL.
3. Responses are buffered using `toBufferedResponse` for worker compatibility.

Relevant files:

- `src/app/(payload)/api/[...slug]/route.ts`
- `src/app/(payload)/api/graphql/route.ts`
- `src/utilities/toBufferedResponse.ts`

## Data Architecture

### Primary datastore

The primary datastore is PostgreSQL, configured through Payload's Postgres adapter.

### Worker-safe DB adaptation

Cloudflare execution pushed the repo toward a nonstandard database adaptation:

- `src/lib/cloudflare/workerSafePg.ts` implements a shared-client, serialized-query wrapper
- the wrapper manages transaction locking and connection reset behavior
- `src/payload.config.ts` switches to this wrapper when `PAYLOAD_DB_POOL_MAX === '1'`

This is a deployment-driven architectural customization, not generic Payload boilerplate.

### Media storage

Media is stored through the S3-compatible R2 plugin:

- collection: `media`
- plugin: `s3Storage(...)`
- utility helpers transform or normalize URLs before rendering

### Search and redirects

The repo relies on Payload plugins rather than a separate microservice:

- `searchPlugin(...)` extends searchable content
- `redirectsPlugin(...)` manages redirect records and revalidation hooks

## Frontend Composition Model

### Homepage

The homepage is a large client-rendered composition with dynamic imports for below-the-fold sections.

Core sections include:

- hero
- intro
- logo marquee
- services
- projects
- testimonials
- calculator
- Substack feed
- footer

This page is optimized more like a branded experience than a conventional SSR-heavy landing page.

### CMS pages

Generic pages use Payload's block-based layout model:

- hero selection
- content blocks
- call to action blocks
- archive blocks
- media blocks
- form blocks

This is how the project balances bespoke pages with CMS-authored content.

## Access and Security Model

Access primitives are intentionally small:

- `anyone`
- `authenticated`
- `authenticatedOrPublished`

These are reused across collections rather than over-abstracted into a larger policy system.

Security-sensitive patterns visible in the codebase:

- Payload Local API routes explicitly use `overrideAccess: false`
- webhook routes check signatures or bearer secrets
- several external-facing routes implement in-memory rate limiting
- `users.roles` is saved to JWT for fast admin-role checks

## Operational Architecture Notes

### Local vs Cloudflare runtime

The repo supports two materially different development modes:

- standard Next dev: `pnpm dev`
- Cloudflare worker dev: `pnpm cf:dev:workers`

The latter is the meaningful environment for rollout verification because public/payload split and worker behavior matter.

### Baselines and rollback

Deployments write state into `scratch/cloudflare-workers/`, including:

- last deployment state
- baseline version captures before rollout
- rollback commands referencing exact worker version IDs

### Active platform risk area

Current operational handovers show that:

- supported public staging routes can be green
- while full Cloudflare verify still fails on worker-runtime edge cases

That means architecture work in this repo is not finished at the code structure level alone; runtime behavior under Workers is part of the real design boundary.
