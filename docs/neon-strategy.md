# Neon Database Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Neon (neon.tech)
**Free Tier:** 0.5 GB storage, 10 compute hours/month, 1 project

---

## Overview

Neon is a serverless PostgreSQL platform with database branching (inspired by Git). Unlike Supabase — which bundles database + auth + storage — Neon focuses purely on PostgreSQL as a service. Its key differentiator is **branching**: creating instant, zero-copy clones of your database for development, testing, or feature previews.

For Edmond's service offerings, Neon is the database choice for:

1. **SaaS applications** where Git-like branching accelerates development and testing
2. **Projects needing type-safe ORM integration** with Drizzle (Neon's serverless driver is purpose-built for this)
3. **Development workflows** where database branching enables safe schema changes and feature testing
4. **Alternatives to Supabase** when auth and storage are handled elsewhere (e.g., Clerk for auth, Cloudflare R2 for storage)

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Storage | 0.5 GB |
| Compute hours | 10 hours/month |
| Projects | 1 |
| Branches | Unlimited per project |
| Database size per project | 0.5 GB |
| Connections | Unlimited (serverless connection pooling built-in) |

**Important:** Compute hours are consumed when the database is actively processing queries. Neon auto-suspends the database after 5 minutes of inactivity (free tier), and the next query resumes it — but this counts against the 10-hour compute budget. **10 hours/month is tight** — roughly 20 minutes of active query time per day.

---

## By Service Category

### 1. Web Applications

#### Primary Database for Tier C (Custom SaaS)
- **Use case:** SaaS products requiring complex relational data, migrations, and type-safe queries with Drizzle ORM
- **Architecture:** Neon (PostgreSQL) + Drizzle ORM + Clerk (Auth) → full type-safe stack from database to React components
- **Advantage over Supabase:** Neon's serverless driver eliminates connection pooling issues with Next.js server components. Supabase's standard PostgreSQL connection can exhaust connection limits under load; Neon handles this automatically
- **Branching workflow:** Create a branch per feature → test schema changes against real data → merge when ready. Zero risk to production data

#### E-commerce Alternative (Boilerplate 6)
- **Use case:** When the product catalogue, order management, and inventory tracking require more complex queries than Drizzle + Supabase comfortably handles
- **Advantage:** PostgreSQL's advanced features (window functions, CTEs, full-text search, JSONB) are first-class in Neon
- **Caveat:** 0.5 GB storage is half of Supabase's 500 MB — sufficient for ~5,000 products with metadata, or ~50,000 orders

---

### 2. Web Design & Development

#### Not Typically Used for Marketing Sites
- **Guidance:** Foundation Builds (Launch, Presence, Growth) don't need a dedicated database server. Content is managed via Keystatic CMS or embedded in the Next.js app
- **Exception:** If a client needs a lightweight data layer (e.g., a dynamic directory, searchable portfolio), Neon + Drizzle provides a type-safe API with minimal overhead

---

### 3. Development Workflow

#### Database Branching for Safe Development
- **Use case:** Before deploying a schema change to production, branch the database → test the migration on the branch → verify with Playwright end-to-end tests → merge
- **Value:** Eliminates the risk of breaking production data during development. Branching is instant and costs no extra storage (zero-copy)
- **Integration with CI/CD:** GitHub Actions can create a Neon branch → run tests against it → delete it on PR merge. This provides a real PostgreSQL database in CI, not a mocked SQLite substitute

#### Drizzle Studio with Neon
- **Use case:** Drizzle Studio provides a visual database browser connected to Neon. Useful during development for inspecting data, testing queries, and debugging
- **Value:** Free, type-safe database management without pgAdmin or DBeaver setup

---

## Quick-Win Implementations

### Priority 1: Neon + Drizzle Boilerplate (1 hour)
Create a reusable setup for new projects:

```typescript
// db/index.ts
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)
```

```typescript
// db/schema.ts
import { pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(), // in cents
  stock: integer('stock').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

### Priority 2: GitHub Actions CI with Neon Branching (2 hours)
```yaml
# .github/workflows/db-test.yml
name: Database Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Create Neon branch
        run: |
          curl -X POST "https://console.neon.tech/api/v2/projects/$PROJECT_ID/branches" \
            -H "Authorization: Bearer $NEON_API_KEY" \
            -H "Content-Type: application/json" \
            -d '{"branch": {"name": "test-${{ github.head_ref }}"}}'
      - name: Run migrations
        run: npx drizzle-kit push
      - name: Run tests
        run: npx vitest
      - name: Delete branch
        if: always()
        run: |
          curl -X DELETE "https://console.neon.tech/api/v2/projects/$PROJECT_ID/branches/$BRANCH_ID" \
            -H "Authorization: Bearer $NEON_API_KEY"
```

---

## Resource Budget Planning

**Free tier is tight — use strategically:**

| Resource | Typical Usage (Small App) | Free Limit | Notes |
|----------|--------------------------|-------------|-------|
| Storage | 100–300 MB | 0.5 GB | ~40% utilised |
| Compute hours | 2–8 hours/month | 10 hours/month | Auto-suspend after 5 min helps |
| Branches | 3–10 | Unlimited | Zero-copy — no storage cost |

**When to upgrade to Launch ($19/project/month):**
- Compute hours regularly exceed 10/month
- Production database cannot tolerate 5-minute auto-suspend (Launch has configurable suspend timeout)
- Need more than 1 project
- Need point-in-time recovery (Launch includes 24-hour PITR)

**Cost optimisation tip:** Use Neon for development and staging (where branching is valuable), and Supabase for production (where the free tier offers 500 MB storage and no compute-hour limit). This hybrid approach maximises free-tier value across both platforms.

---

## Risks & Considerations

1. **Compute hour exhaustion:** 10 hours/month is easily consumed by a moderately active application. An application making continuous API calls can burn through this in a day. **Mitigation:** Use Neon for dev/staging, Supabase for production
2. **Auto-suspend latency:** After 5 minutes of inactivity, the database suspends. The next query takes 2–5 seconds to resume. This is unacceptable for production user experience but fine for development
3. **No auth built-in:** Unlike Supabase, Neon provides only the database. Authentication must be handled by Clerk, Kinde, or a custom solution
4. **Single project limit:** The free tier supports only one project. Managing multiple clients requires upgrading or using Supabase for some projects
5. **Drizzle ORM dependency:** Neon's serverless driver is designed for ORMs like Drizzle. Using raw SQL or other ORMs works but doesn't leverage Neon's connection pooling optimisation

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| SaaS development environment | Included in Tier C build | $0 (free tier) | 100% |
| Database branching for CI/CD | Included in build price | $0 (free tier) | 100% |
| Production database (if within limits) | Included in build price | $0 → $19/month if upgraded | 100% until upgrade |

**Key insight:** Neon's free tier is not intended for production workloads — 10 compute hours/month and 5-minute auto-suspend make it unsuitable for live client applications. Its real value is in the **branching workflow**: instant database clones for development, testing, and CI/CD without the overhead of managing local PostgreSQL instances. Use Neon for development and testing, pair with Supabase for production (or upgrade to Neon Launch for $19/month when production-grade performance is needed). The branching capability alone justifies keeping Neon in the stack — it eliminates the "works on my machine" database problem entirely.

---

**End of Neon Database Integration Strategy**
