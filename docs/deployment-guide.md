# Deployment Guide

Generated: `2026-05-01T07:42:21+0200`

## Deployment Model

The application deploys to Cloudflare Workers as two coordinated worker services:

- public worker
  - config: `wrangler.public.toml`
  - entry: `.open-next/public/worker.js`
- payload worker
  - config: `wrangler.payload.toml`
  - entry: `.open-next/payload/worker.js`

The public worker proxies payload-owned routes to the payload worker, including `/admin/*`.

## Core Commands

### Build

```bash
pnpm cf:build:workers
```

Equivalent entrypoint:

```bash
node ./src/scripts/cloudflare-workers.mjs build --target local
```

### Local worker runtime

```bash
pnpm cf:dev:workers
```

### Staging deploy

```bash
pnpm cf:deploy:staging
```

### Production deploy

```bash
pnpm cf:deploy:prod
```

### Verification

```bash
pnpm cf:verify:staging
pnpm cf:verify:prod
```

Or directly:

```bash
node ./src/scripts/cloudflare-workers.mjs verify --env staging
node ./src/scripts/cloudflare-workers.mjs verify --env production
```

## What The Cloudflare Deployment Script Actually Does

Entry point: `src/scripts/cloudflare-workers.mjs`

Key responsibilities:

- build public and payload worker variants
- upload worker versions
- deploy version splits
- capture deployment baselines before rollout
- store deployment state under `scratch/cloudflare-workers/`
- verify that the public worker references the intended payload worker version
- run smoke-user setup and cleanup
- tail worker logs during verification

This is more than a thin wrapper around Wrangler. It is the repo's deployment control plane.

## Worker Build Pipeline

The Cloudflare build pipeline is implemented in `src/scripts/lib/cloudflare-workers/workspace.mjs`.

Key steps:

1. copy the repo into per-variant scratch workspaces
2. prune variant-specific source paths
3. patch OpenNext Cloudflare support
4. build each variant with variant-specific env
5. copy generated `.open-next` output back into the main repo build area
6. patch generated worker files
7. sync payload static assets into the public worker asset tree

## Route Ownership

Source of truth:

- `cloudflare/route-manifest.json`
- `src/scripts/lib/cloudflare-workers/routes.mjs`

Important behavior:

- public exact routes stay on the public worker
- `/admin/*` and payload APIs go to the payload worker
- `/_payload_next/*` is used as the payload asset prefix

## Secrets and Environment Handling

Relevant files:

- `.env.example`
- `wrangler.public.toml`
- `wrangler.payload.toml`
- `src/scripts/cloudflare-sync-secrets.mjs`
- `src/scripts/lib/cloudflare-workers/config.mjs`

The config module also tracks a long list of runtime secrets used during sync and deploy operations.

## Deployment State and Rollback

Important output location:

- `scratch/cloudflare-workers/`

Key artifacts:

- `last-deploy-<target>.json`
- `last-deploy-<target>.baseline.json`

The baseline capture is important because rollback commands are derived from the version state observed before rollout.

## Verification Workflow

`verifyWorkers(targetName)` in `src/scripts/cloudflare-workers.mjs` performs the main verification flow:

- confirm deployed versions match expected state
- seed or resolve smoke user
- clean old smoke artifacts
- run targeted Playwright smoke coverage
- tail worker logs
- fail verification if worker error logs are detected

This is why a deployment can have green surface routes but still fail verify.

## Current Operational Notes

The repository contains active rollout handovers in `_bmad-output/`, especially:

- `_bmad-output/cloudflare-migration-handover-2026-04-30-rollout.md`

That handover should be treated as the live operational companion to this document. It contains:

- latest staging versions and deployment IDs
- currently supported staging readiness checks
- known verify failures
- production gating rules

## Practical Rollout Discipline

When operating this repo:

1. build locally in worker mode
2. validate the specific changed behavior locally
3. deploy staging only
4. recheck the supported public routes
5. run full verify
6. stop at a checkpoint before production if staging has only just recovered

That sequencing matches the current codebase reality better than a naive `deploy and hope` workflow.
