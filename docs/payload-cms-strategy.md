# Payload CMS Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Payload CMS (payloadcms.com) — Open-source, self-hosted
**Free Tier:** Fully free and open-source (Apache 2.0 license). Hosting infrastructure costs apply.

---

## Overview

Payload CMS is a TypeScript-native, headless CMS built on Next.js. It is the preferred CMS for Edmond's complex application builds — Boilerplate 6 (E-commerce), Boilerplate 7 (Professional Services Firm), Boilerplate 9 (Financial Services & Insurance), and Tier C (Custom SaaS) — where full data ownership, custom field logic, and granular permissions are required.

Unlike Keystatic (which stores content as Markdown/JSON in Git), Payload CMS stores data in a database (MongoDB or PostgreSQL) and provides a full admin panel, user management, and API. It is self-hosted — there is no paid SaaS tier. The only costs are the infrastructure to run it.

For Edmond's service offerings, Payload CMS serves as:

1. **Enterprise-grade CMS** — For clients needing custom content types, multi-user editing, and role-based access control
2. **E-commerce backend** — Product catalogue, inventory, and order management with a full admin panel
3. **Self-hosted data control** — Client data stays on their infrastructure. No third-party CMS vendor lock-in
4. **Next.js native** — Runs as part of the Next.js app, not a separate service. Shared types, shared deployment

---

## Cost Structure

Payload CMS itself is **free and open-source**. The costs are entirely infrastructure:

| Component | Free Option | Paid Option |
|-----------|------------|-------------|
| Database | Supabase free (500 MB), Neon free (0.5 GB) | Supabase Pro ($25/mo), Neon Launch ($19/mo) |
| Hosting | Vercel Hobby (free), self-hosted on VPS | Vercel Pro ($20/user/mo), dedicated VPS ($5–20/mo) |
| File storage | Cloudflare R2 (10 GB free), Supabase Storage (1 GB free) | AWS S3, Cloudflare R2 paid ($0.015/GB/mo) |

**Total minimum cost: $0/month** when running on Vercel Hobby + Supabase free tier + Cloudflare R2 free tier.

---

## By Service Category

### 1. Web Design & Development

#### Not Used for Foundation Builds
- **Guidance:** Payload CMS is overkill for Launch, Presence, and Growth configurations. These use Keystatic CMS (Git-based, zero infrastructure) or no CMS at all
- **Threshold:** Recommend Payload CMS when the client needs more than 6 content types, multiple editors, or custom field logic (conditional fields, relationship validation, computed values)

---

### 2. Web Applications

#### Boilerplate 6 — E-commerce Store (from P35,000)
- **Use case:** Product catalogue management, category organisation, inventory tracking, order fulfilment workflow
- **Collections:**
  - `products` — Name, description, price, images, variants, stock status, categories
  - `categories` — Hierarchical category structure
  - `orders` — Customer, items, status, payment reference, fulfilment date
  - `customers` — Name, email, order history
- **Access Control:** Admin role can manage products and orders. Customer role can only view own orders
- **Value:** Full e-commerce admin panel included in the build. Client can manage inventory without touching code or a database client

#### Boilerplate 7 — Professional Services Firm (from P32,000)
- **Use case:** Team directory, case studies, news/insights, client document management
- **Collections:**
  - `team` — Name, role, bio, photo, credentials, contact info
  - `caseStudies` — Title, client (anonymised), challenge, solution, outcome
  - `news` — Title, content, author, publish date, categories
  - `documents` — Client-uploaded files with role-based access
- **Access Control:** Firm admins can manage all content. Clients can only view their own documents
- **CMS Selection Note:** For smaller practices (1–2 content managers), Keystatic is preferred. For larger firms needing granular permissions, Payload CMS is the choice

#### Boilerplate 9 — Financial Services & Insurance (from P35,000)
- **Use case:** Services catalog, regulatory updates, lead management, KYC document storage
- **Collections:**
  - `services` — Service name, description, regulatory disclosures, eligibility criteria
  - `news` — Regulatory updates, market commentary, compliance notices
  - `leads` — Captured from website forms, routed to admin dashboard
- **Access Control:** Admin can manage all content. Compliance officer role can approve/reject published content (drafts + versioning workflow)
- **Compliance note:** Required regulatory disclaimers and NBFIRA references are content managed through Payload — ensuring they're always editable without code changes

#### Tier C — Custom SaaS (from P48,000)
- **Use case:** Any custom application requiring a content management layer — internal tools, multi-tenant platforms, data-driven dashboards
- **Advantage:** Payload CMS provides the admin panel and API for free. Edmond builds the custom frontend — the CMS handles the backend
- **Plugin ecosystem:** Payload's plugin system (SEO, nested documents, form builder, s3 storage) accelerates custom builds

---

### 3. Workflow Automation

#### Payload Webhooks as Make.com Triggers
- **Use case:** Payload collection hook (afterChange) → webhook to Make.com → notify team via Slack, create task in project management tool, send welcome email
- **Pattern:**
  ```typescript
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create' && doc.sendNotification) {
          await fetch(process.env.MAKE_WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({ event: 'new_lead', data: doc }),
          })
        }
        return doc
      },
    ],
  }
  ```
- **Value:** Payload becomes the trigger source for automation workflows — not just a content store

#### Automated Document Generation
- **Use case:** Payload CMS stores template data → Make.com scenario generates PDF (via AI or template engine) → stores in Cloudflare R2 → emails to client via Resend
- **Value:** Document generation pipeline powered by CMS data — useful for legal firms, insurance brokers, and consulting practices

---

### 4. Boilerplate Products

#### Reusable Collection Definitions
- **Strategy:** Create a library of tested Payload collection definitions (products, orders, team, news, documents) that can be imported into new projects
- **Value:** Consistent data models across boilerplate builds. Tested access control patterns. Reduced setup time per project

#### Payload Cloud vs. Self-Hosted
- **Guidance:** Payload Cloud (payloadcms.com/cloud) is the managed hosting option. For Edmond's builds, self-hosting on Vercel + Supabase is the default — keeping costs at $0 on free tiers
- **When to recommend Payload Cloud:** When the client wants zero infrastructure management and is willing to pay for managed hosting (pricing starts at $99/month — disclose at scoping)

---

## Quick-Win Implementations

### Priority 1: Standard Payload Config for Boilerplates (2 hours)
Create a reusable Payload configuration with common collections:

```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Users, Products, Categories, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL,
  }),
})
```

### Priority 2: Access Control Templates (1 hour)
```typescript
// access/adminOrSelf.ts
import type { Access } from 'payload'

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) return true
  return { id: { equals: user?.id } }
}
```

### Priority 3: Type Generation Workflow (30 min)
After every schema change, run:
```bash
pnpm generate:types
```
This updates `payload-types.ts` — keeping frontend TypeScript in sync with CMS collections.

---

## Resource Budget Planning

**Infrastructure costs when using Payload CMS on free tiers:**

| Component | Free Tier Usage | Limit | Headroom |
|-----------|----------------|-------|----------|
| Vercel hosting (Hobby) | 1–3 GB bandwidth/month | 100 GB/month | ~97% |
| Supabase database | 100–300 MB | 500 MB | ~40% |
| Cloudflare R2 storage | 500 MB–2 GB | 10 GB | ~80% |
| Payload CMS license | Free (Apache 2.0) | N/A | N/A |

**When costs increase:**
- Database exceeds 500 MB → Supabase Pro ($25/month)
- Vercel bandwidth exceeds 100 GB → Vercel Pro ($20/month) or migrate to Cloudflare Pages
- File storage exceeds 10 GB → Cloudflare R2 paid ($0.015/GB/month — 50 GB costs ~$0.75)

---

## Risks & Considerations

1. **Self-hosting responsibility:** There is no "Payload support" for infrastructure issues. Database management, backups, and uptime are Edmond's responsibility (or the client's, after handover)
2. **Local API access control:** Payload's Local API bypasses access control by default. Always set `overrideAccess: false` when querying with a specific user context
3. **Transaction safety:** In Payload hooks, always pass `req` to nested operations to maintain database atomicity
4. **Hook loops:** Payload operations in hooks can trigger the same hooks. Use `context` flags to prevent infinite loops
5. **MongoDB vs. PostgreSQL:** Payload supports both. MongoDB is simpler to set up (Supabase uses PostgreSQL — requires the PostgreSQL adapter). PostgreSQL offers stronger relational integrity for complex data models
6. **Type generation:** After every schema change, `generate:types` must be run. Forgetting this causes TypeScript errors in the frontend

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| E-commerce CMS (BP6) | Included in P35,000 | $0 (free tiers) | 100% |
| Professional services CMS (BP7) | Included in P32,000 | $0 (free tiers) | 100% |
| Financial services CMS (BP9) | Included in P35,000 | $0 (free tiers) | 100% |
| Custom SaaS admin panel (Tier C) | From P48,000 | $0 until scale | 100% |

**Key insight:** Payload CMS is free software — the only costs are infrastructure, which can be kept at $0 using free-tier hosting (Vercel + Supabase + Cloudflare R2). This makes it the most cost-effective enterprise-grade CMS available for Edmond's builds. The self-hosted model means full data ownership for clients, no per-user licensing, and no vendor lock-in. Use it for complex applications requiring custom collections, role-based access, and admin panels. Default to Keystatic for simpler marketing sites where Git-based content management is sufficient.

---

**End of Payload CMS Integration Strategy**
