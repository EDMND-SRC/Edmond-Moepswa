# Project Documentation Index

## Project Overview

- **Type**: Next.js 16 + Payload CMS 3.82 Web Application
- **Repository Type**: Monolith
- **Primary Language**: TypeScript 6
- **Architecture**: Headless CMS with App Router

### Quick Reference

- **Tech Stack**: Next.js 16, Payload CMS 3, PostgreSQL (Neon), Tailwind 4, Cloudflare Workers, Dodo Payments, PostHog
- **Primary Framework**: Next.js (App Router)
- **CMS**: Payload CMS
- **Database**: PostgreSQL (via @payloadcms/db-postgres)

## Generated Documentation

- [Project Overview](./project-overview.md)
- [Architecture Overview](./architecture-main.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Component Inventory](./component-inventory.md)
- [Development Guide](./development-guide.md)
- [Deployment Guide](./deployment-guide.md)
- [API Contracts](./api-contracts.md)
- [Data Models](./data-models.md)

## Integration Strategies (Business Planning)

These documents provide deep-dives into how specific tools are leveraged within the project ecosystem.

- [Payload CMS Strategy](../business-planning/strategy-docs/payload-cms-strategy.md)
- [Dodo Payments Strategy](../business-planning/strategy-docs/dodo-payments-strategy.md)
- [Make.com Strategy](../business-planning/strategy-docs/make-com-strategy.md)
- [PostHog Strategy](../business-planning/strategy-docs/posthog-strategy.md)
- [Cal.com Strategy](../business-planning/strategy-docs/cal-com-strategy.md)

## Getting Started

1.  **Prerequisites**: Node.js 20+, pnpm 9+, PostgreSQL
2.  **Setup**: `pnpm install`
3.  **Environment**: Setup `.env.local` based on `.env.example`
4.  **Database**: `pnpm payload migrate:fresh` followed by `npx tsx seed.ts`
5.  **Development**: `pnpm dev`
6.  **Types**: `pnpm generate:types`
