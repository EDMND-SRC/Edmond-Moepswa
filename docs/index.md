# Project Documentation Index

Generated: `2026-05-01T07:42:21+0200`

This documentation set is a fresh exhaustive rescan of the current repository state in `/Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa`.

## Snapshot

- Project: `edmond-moepswa-cms`
- Repository type: monolith
- Primary type: web application
- Runtime model: Next.js 16 + Payload CMS 3 + PostgreSQL + Cloudflare Workers via OpenNext
- Scan depth: exhaustive
- Source files under `src/`: 265
- App route handlers under `src/app/`: 20
- Public routes in `cloudflare/route-manifest.json`: 17
- Payload-only API routes in `cloudflare/route-manifest.json`: 3
- Payload collection definitions: 10
- Payload global definitions: 3
- Test files: 8

## Document Set

- [Project Overview](./project-overview.md)
- [Architecture Overview](./architecture-main.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Component Inventory](./component-inventory.md)
- [API Contracts](./api-contracts.md)
- [Data Models](./data-models.md)
- [Development Guide](./development-guide.md)
- [Deployment Guide](./deployment-guide.md)

## What Changed Since The Older Docs

The prior documentation in this folder was generated on `2026-04-23` and did not reflect the current Cloudflare-first deployment work. This refresh incorporates:

- dual-worker Cloudflare deployment orchestration in `src/scripts/cloudflare-workers.mjs`
- worker-safe PostgreSQL runtime support in `src/lib/cloudflare/workerSafePg.ts`
- generated Payload REST and GraphQL routes buffered for Workers
- current staging/prod deploy and verify command flow
- newer operational artifacts such as:
  - `_bmad-output/cloudflare-migration-handover-2026-04-30-rollout.md`
  - `src/scripts/measure-admin-performance.ts`
  - `src/scripts/purge-vercel-content.ts`

## Adjacent Knowledge Sources

These are not part of the application runtime, but they matter to anyone onboarding into the repo:

- `business-planning/`
  - strategy documents, pricing notes, service catalogues, brand and market research
- `_bmad-output/`
  - rollout handovers, manual operations notes, generated planning artifacts
- `_bmad/`
  - BMad framework configuration and local automation assets
- `make-workflows/`
  - scenario-generation helpers for Make.com workflows

## Recommended Reading Order

1. Read [Project Overview](./project-overview.md) for the business and technical shape.
2. Read [Architecture Overview](./architecture-main.md) to understand the public worker vs payload worker split.
3. Read [Source Tree Analysis](./source-tree-analysis.md) for the folder-by-folder map.
4. Use [API Contracts](./api-contracts.md) and [Data Models](./data-models.md) when changing routes or collections.
5. Use [Development Guide](./development-guide.md) and [Deployment Guide](./deployment-guide.md) for local workflows and Cloudflare rollout steps.

## Operational Note

The codebase is actively being hardened for Cloudflare Workers. For live rollout state, staging issues, and production gating rules, check the latest Cloudflare handover in `_bmad-output/` rather than relying on this index.
