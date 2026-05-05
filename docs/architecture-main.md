# Architecture

## Runtime model

The site runs as a single public Cloudflare Worker built from Next.js 16 through OpenNext.

There is no payload worker and no server-side CMS runtime in the request path.

## Content model

The public site reads from three places:

1. Typed launch content in `src/content/launchSnapshot.ts`
2. Typed service definitions in `src/content/launchServices.ts`
3. Direct PostgreSQL reads for:
   - `/api/faqs`
   - `/api/projects`

This is deliberate. The content needed for launch is either committed directly in the repo or fetched from app-owned tables.

## Persistence model

Two write paths remain app-owned:

- `src/app/(frontend)/api/make-webhook/route.ts`
  - persists contact and calculator leads into PostgreSQL
  - forwards approved workflows to Make.com
- `src/app/api/webhooks/dodo/route.ts`
  - verifies Dodo signatures
  - upserts orders into PostgreSQL
  - mirrors purchase/download leads into PostgreSQL
  - optionally forwards the verified event to Make.com

Shared database access lives in:

- `src/lib/server/postgres.ts`
- `src/lib/server/app-persistence.ts`

## Media model

Media delivery stays on Cloudflare:

- source assets in R2
- image transform route on the public worker

The repo no longer ships admin upload/runtime code for managing media through a CMS.

## Build model

Cloudflare build orchestration lives in:

- `src/scripts/cloudflare-workers.mjs`
- `src/scripts/lib/cloudflare-workers/config.mjs`
- `src/scripts/lib/cloudflare-workers/workspace.mjs`
- `src/scripts/patch-opennext-cloudflare.mjs`

The build only produces one deployable worker artifact now.

## Preview and admin

- `/next/preview` and `/next/exit-preview` intentionally return `404`
- `/admin` is not part of the launch architecture

Any documentation or code path that assumed live CMS editing is now obsolete unless explicitly marked otherwise.
