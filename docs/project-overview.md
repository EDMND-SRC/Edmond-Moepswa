# Project Overview

Generated: `2026-05-01T07:42:21+0200`

## Purpose

This repository powers Edmond Moepswa's public-facing website, CMS-backed portfolio, digital product storefront, and supporting automation endpoints. It is not a brochure-only site. It combines:

- public brand and service pages
- CMS-managed long-form pages and navigation
- lead capture and booking flows
- digital product sales and free resource delivery
- external workflow automation handoffs
- Cloudflare-specific deployment and verification tooling

## Business Capabilities

The current implementation supports five main business jobs:

1. Present Edmond's positioning, portfolio, services, pricing, and professional background.
2. Capture leads through direct contact forms, pricing-calculator flows, and booking workflows.
3. Publish CMS-managed pages, header/footer navigation, and site-wide settings through Payload.
4. Sell or distribute digital products through Dodo Payments.
5. Run on Cloudflare Workers while retaining Payload CMS and PostgreSQL as the content engine.

## Runtime Model

The codebase is a single repository, but the deployed system is split into two Cloudflare Worker variants:

- Public worker
  - serves the public Next.js frontend
  - handles selected public APIs and proxies Payload routes to the payload worker
  - owns the main `workers.dev` hostname for public traffic
- Payload worker
  - serves `/admin/*`
  - serves generated Payload REST and GraphQL routes
  - provides the admin runtime and server functions

This split is implemented in:

- `wrangler.public.toml`
- `wrangler.payload.toml`
- `src/scripts/cloudflare-workers.mjs`
- `src/scripts/lib/cloudflare-workers/*`

## Core Technology Stack

| Layer | Current implementation |
| --- | --- |
| Framework | Next.js `16.2.3` App Router |
| CMS | Payload `3.82.0` |
| Language | TypeScript `6.0.2` |
| Database | PostgreSQL via `@payloadcms/db-postgres` |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` |
| Styling | Tailwind CSS 4, custom design tokens, Radix primitives |
| Animation | Motion, GSAP, Lenis |
| Payments | Dodo Payments |
| Booking | Cal.com embed + webhook proxy |
| Automation | Make.com webhook dispatch |
| Analytics | PostHog + Google Analytics |
| Media storage | Cloudflare R2 via `@payloadcms/storage-s3` |
| Testing | Playwright + Vitest |

## Top-Level Repository Layout

| Path | Role |
| --- | --- |
| `src/` | Application source, CMS config, components, scripts, utilities |
| `public/` | Static images, favicon set, font, transformed media fixtures |
| `docs/` | Generated project documentation |
| `business-planning/` | Strategy, market research, pricing, creative and positioning artifacts |
| `_bmad-output/` | Handover docs, generated operating notes, planning outputs |
| `_bmad/` | BMad configuration and workflow assets |
| `tests/` | E2E, integration, unit tests, plus helper utilities |
| `cloudflare/` | Generated route manifest and worker support assets |
| `make-workflows/` | Make.com scenario-generation helpers |
| `scripts/` | Older ad hoc migration and cleanup scripts outside `src/` |

## Public Surface

### Public pages

The public application includes:

- homepage: `src/app/(frontend)/page.tsx`
- about page with long-form career narrative
- services page with pricing tiers and technology descriptors
- contact page with Cal.com embed and lead form
- resources page and success flow
- legal and policy pages
- search page
- CMS-driven dynamic slug pages under `src/app/(frontend)/[slug]`

### Public APIs

The public route manifest currently includes 17 exact public routes, including:

- content endpoints: `/api/pages`, `/api/projects`, `/api/services`, `/api/testimonials`, `/api/faqs`
- operational integrations: `/api/checkout`, `/api/dodo-products`, `/api/webhooks/dodo`, `/api/cal-webhook`, `/api/make-webhook`
- utility endpoints: `/api/geo`, `/api/substack`, `/api/media/transform`
- preview and SEO helpers: `/next/preview`, `/next/exit-preview`, `/og-image`, `/pages-sitemap.xml`

### Payload-only APIs

The payload worker owns:

- `/api/[...slug]`
- `/api/graphql`
- `/api/graphql-playground`
- `/admin/*`

## Content and Commerce Domains

The Payload configuration currently defines 10 collections:

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

It also defines 3 globals:

- `header`
- `footer`
- `site-settings`

## Integrations

### Dodo Payments

Used for:

- product catalogue syncing
- checkout session creation
- webhook-driven order creation
- capturing post-purchase leads

Relevant code:

- `src/app/api/checkout/route.ts`
- `src/app/api/dodo-products/route.ts`
- `src/app/api/webhooks/dodo/route.ts`
- `src/scripts/sync-dodo-products.ts`
- `src/scripts/seed-products.ts`

### Cal.com

Used for discovery-call scheduling:

- frontend embed component in `src/components/cal/CalEmbed.tsx`
- contact page booking section
- proxy webhook route in `src/app/api/cal-webhook/route.ts`

### Make.com

Used for workflow handoff rather than direct business logic in the app:

- lead capture
- calculator quote follow-up
- download/purchase workflow forwarding

Primary route:

- `src/app/(frontend)/api/make-webhook/route.ts`

### Substack

The app fetches and parses RSS server-side via `/api/substack` and renders a latest-posts section on the homepage.

## Testing and Verification Shape

The repository currently has:

- 3 Playwright E2E specs
- 1 Vitest integration suite
- 1 Vitest unit suite
- 3 test helper modules

The test coverage emphasizes:

- public page rendering
- admin login and navigation
- Cloudflare smoke flows
- selected Payload Local API queries
- icon-registry behavior

## Current Operational Reality

This repo is in an active Cloudflare migration and hardening phase. The application logic already assumes Cloudflare as the primary deployment target, and the docs in `_bmad-output/` track staging rollout and verify failures. Anyone making platform changes should treat those handovers as live operational context.
