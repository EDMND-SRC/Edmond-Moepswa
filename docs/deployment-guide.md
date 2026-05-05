# Deployment Guide

## Worker model

There is one deployable application worker:

- production: `edmond`
- staging: `edmond-staging`

Both use the `bridgearc.workers.dev` suffix.

## Prerequisites

- `.env.local` populated
- `CLOUDFLARE_ACCOUNT_ID` set
- `CLOUDFLARE_API_TOKEN` set
- database migration applied:

```bash
pnpm db:migrate:launch
```

## Build

```bash
pnpm cf:build:workers
```

This must keep the public worker under the Cloudflare Free gzip limit.

## Secret sync

```bash
pnpm cf:sync-secrets --env staging
pnpm cf:sync-secrets --env production
```

## Staging deploy and verify

```bash
pnpm cf:deploy:staging
pnpm cf:verify:staging
```

## Production deploy and verify

```bash
pnpm cf:deploy:prod
pnpm cf:verify:prod
```

## Remote cleanup after Payload extraction

As of May 5, 2026, `edmond-payload` and `edmond-payload-staging` were checked for deletion and Cloudflare returned `10090` for both names, which means they do not currently exist on the account.

If those workers ever reappear, the cleanup command is:

```bash
pnpm exec wrangler delete <worker-name> --force
```

## Verification scope

`cf:verify:*` now validates the public-only launch path:

- frontend smoke tests
- public API checks
- preview routes remain disabled
- quote PDF route works

It does not verify `/admin`, because `/admin` is no longer part of the shipped architecture.
