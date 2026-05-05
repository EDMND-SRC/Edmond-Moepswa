# Development Guide

## Local commands

```bash
pnpm install
pnpm db:migrate:launch
pnpm dev
pnpm cf:dev:workers
pnpm typecheck
pnpm lint
pnpm test:int
```

## Launch content editing

The public launch content is committed in the repo.

Edit these files directly:

- `src/content/launchSnapshot.ts`
- `src/content/launchServices.ts`

That is where pages, testimonials, products, redirects, header/footer, and site settings now live for launch.

## Direct SQL APIs

These routes are intentionally app-owned and should stay simple:

- `src/app/(frontend)/api/faqs/route.ts`
- `src/app/(frontend)/api/projects/route.ts`

Use `src/lib/server/postgres.ts` for shared client lifecycle instead of open-coding new `pg.Client` setup everywhere.

## Lead and order persistence

Use the shared persistence layer:

- `src/lib/server/app-persistence.ts`

Do not reintroduce a CMS Local API or schema-driven write path for:

- Make.com lead capture
- calculator quote requests
- Dodo order syncing

## Preview and admin

- Preview is intentionally disabled.
- Admin is intentionally absent from the launch build.

Do not add `/admin` back into verification, deployment gating, or Cloudflare route ownership unless the project explicitly decides to restore a CMS runtime.

## Cloudflare build rules

- `src/scripts/cloudflare-workers.mjs` is the top-level orchestration entrypoint.
- `src/scripts/lib/cloudflare-workers/workspace.mjs` builds the single public worker artifact.
- `src/scripts/patch-opennext-cloudflare.mjs` is the compatibility seam for OpenNext patching.

Keep changes here surgical. These scripts are deployment-critical.

## Database migration

The current app-owned migration is:

- `database/migrations/20260505_extract_payload_runtime.sql`

Apply it with:

```bash
pnpm db:migrate:launch
```
