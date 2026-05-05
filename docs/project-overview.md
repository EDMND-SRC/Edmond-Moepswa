# Project Overview

## What this repo is now

This repo powers Edmond Moepswa’s public website and digital product storefront.

It is no longer a split public-worker plus payload-worker system. The production architecture is:

- one public Cloudflare Worker
- typed launch content for static marketing content
- direct PostgreSQL reads for FAQs and projects
- direct PostgreSQL writes for leads and Dodo order persistence
- Dodo Payments for product checkout
- Make.com and Cal.com for automation
- Cloudflare R2 for media delivery

## Deployed endpoints

- Production: [edmond.bridgearc.workers.dev](https://edmond.bridgearc.workers.dev)
- Staging: [edmond-staging.bridgearc.workers.dev](https://edmond-staging.bridgearc.workers.dev)

## Key directories

- `src/app/(frontend)` — public pages and public API routes
- `src/app/api` — root API routes used outside the frontend route group
- `src/content` — typed launch snapshot data and services
- `src/lib/server` — shared PostgreSQL and persistence helpers
- `src/scripts` — Cloudflare build, deploy, secret sync, and database migration utilities
- `database/migrations` — app-owned SQL migrations

## Current data model strategy

- Marketing pages, header, footer, site settings, redirects, products, and testimonials are committed as typed launch content.
- FAQs and projects stay on direct SQL APIs.
- Leads and orders are app-owned PostgreSQL tables.
- There is no live CMS runtime managing content edits.

## Integrations that matter

- Dodo Payments
- Make.com
- Cal.com
- Cloudflare R2
- PostHog / GA / social env links

## Intentional omissions

- No Payload admin
- No GraphQL admin APIs
- No payload worker
- No live preview
- No generated CMS schema or Local API dependency
