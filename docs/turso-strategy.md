# Turso Database Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Turso (turso.tech) — SQLite at the edge (LibSQL)
**Free Tier:** 500 databases, 9 GB storage, 1 billion row reads/month, 25 million row writes/month, 3 group replicas

---

## Overview

Turso is a serverless edge database built on LibSQL (an open-source SQLite fork). It deploys database replicas to 300+ edge locations worldwide, putting data closer to users than any centralised database can. Its free tier is the most generous in the industry — 500 databases, 1 billion row reads, and 25 million row writes per month.

For Edmond's practice, Turso serves as:

1. **Edge database for read-heavy applications** — Content delivery, catalogues, directories, and listings where read speed matters
2. **Free-tier database for lightweight apps** — More generous than Neon (0.5 GB, 10 compute hours) and Supabase (500 MB) for read-heavy workloads
3. **Local-first development** — SQLite means the database can run locally during development, then sync to Turso for production — zero environment differences
4. **High-database-count scenarios** — 500 databases on the free tier means one database per client project is trivial

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Databases | 500 |
| Total storage | 9 GB (shared across all databases) |
| Row reads/month | 1 billion |
| Row writes/month | 25 million |
| Group replicas | 3 |
| Database locations | Any of 300+ edge locations |
| API tokens | Unlimited |
| Branching | Supported (like git for databases) |

**Scaler plan ($29/month):** 25 billion row reads, 50 million row writes, 25 databases, unlimited groups, point-in-time recovery.

---

## By Service Category

### 1. Web Applications

#### Read-Heavy Application Backend
- **Use case:** Product catalogues, event listings, directories, search indices — applications where reads vastly outnumber writes
- **Architecture:** Turso at the edge → Drizzle ORM (LibSQL dialect) → Next.js server components → client
- **Advantage over Neon/Supabase:** Turso's free tier allows 1 billion row reads/month vs. Neon's 10 compute hours and Supabase's 500 MB database. For read-heavy apps, Turso is significantly more generous
- **Limitation:** SQLite — not suitable for complex relational operations, concurrent writes, or full-text search beyond basic LIKE queries

#### Multi-Client Database Strategy
- **Use case:** 500 databases on the free tier means Edmond can provision a separate Turso database for each client project — total data isolation, no shared infrastructure
- **Value:** Security and compliance advantage. Client A's data is physically separate from Client B's. No multi-tenant schema complexity
- **Storage constraint:** 9 GB shared across all 500 databases = ~18 MB per database if all 500 are used. Sufficient for lightweight application data (user accounts, settings, content) but not for file storage or large media libraries

---

### 2. Web Design & Development

#### Lightweight CMS Backend
- **Use case:** Marketing sites with dynamic content (team directory, service listings, news items) — Turso stores the content, Next.js renders it statically at build time
- **Value:** Database-backed content without the overhead of PostgreSQL. Turso's edge replicas ensure fast reads regardless of visitor location

#### Contact Form Storage
- **Use case:** Form submissions stored in Turso instead of emailed or routed to a CRM
- **Value:** Structured, queryable lead storage. "Show me all leads from the last 30 days where the message contains 'quote'" — a simple SQL query instead of searching through emails

---

### 3. Development Workflow

#### Local-First Development with Turso
- **Use case:** Develop against a local SQLite file (identical engine to Turso's LibSQL) → deploy to Turso for production → zero database engine differences between dev and prod
- **Value:** Eliminates the "works on my machine but not in production" database problem. SQLite is the same engine everywhere

#### Database Branching
- **Use case:** Branch the production database → test schema changes on the branch → merge when verified
- **Value:** Safe schema migrations without risking production data. Like git branching but for your database

---

## Quick-Win Implementations

### Priority 1: Turso + Drizzle Setup (1 hour)
```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Create a database
turso db create myapp

# Get the database URL and auth token
turso db show myapp --url
turso db tokens create myapp
```

```typescript
// db/index.ts — Turso + Drizzle
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema })
```

```typescript
// db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const leads = sqliteTable('leads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message'),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
})
```

### Priority 2: Local Development Workflow (15 min)
```typescript
// db/local.ts — use local SQLite file during development
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const client = createClient({
  url: 'file:./local.db', // Local SQLite file
})

export const db = drizzle(client)
```

Same Drizzle configuration, same query API — just a different connection string.

### Priority 3: Edge Replica Setup (30 min)
```bash
# Create a database with edge replicas in key regions
turso db create myapp --location fra    # Frankfurt (best for Botswana/Europe)
turso db create myapp --location jnb    # Johannesburg (best for Southern Africa)
turso db create myapp --location nyc    # New York (for US visitors)
```

---

## Resource Budget Planning

**Free tier is extremely generous for read-heavy workloads:**

| Metric | Typical Usage (Read-Heavy App) | Free Limit | Headroom |
|--------|-------------------------------|-------------|----------|
| Row reads/month | 10M–100M | 1 billion | ~90%+ |
| Row writes/month | 100K–1M | 25 million | ~96%+ |
| Storage | 100–500 MB | 9 GB | ~95%+ |
| Databases | 1–10 | 500 | ~98%+ |

**When to upgrade to Scaler ($29/month):**
- Row reads exceed 1 billion/month (unusual for SME apps)
- Need point-in-time recovery (database rollback to any timestamp)
- Need more than 3 group replicas
- Need more than 9 GB storage

---

## Risks & Considerations

1. **SQLite limitations:** Turso uses LibSQL (SQLite), not PostgreSQL. This means no window functions, no CTEs (in older versions), limited full-text search, no JSONB, no array types. For complex relational queries, use Neon or Supabase
2. **Write performance:** SQLite is optimised for reads, not writes. High-write applications (real-time chat, event logging, analytics ingestion) will perform poorly on Turso. Use Supabase or a dedicated analytics database instead
3. **Storage shared across databases:** 9 GB is shared across all 500 databases. If one database grows to 8 GB, the remaining 499 share 1 GB. Monitor per-database storage
4. **300ms cold start:** Turso databases scale to zero after inactivity. The first query after a period of inactivity takes ~300ms to warm up. For production apps with consistent traffic, this is not an issue
5. **Ecosystem maturity:** Turso is younger than Supabase and Neon. The Drizzle LibSQL dialect is well-supported, but Prisma and other ORMs have less mature Turso integrations

---

## Summary: Value to Practice

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Read-heavy app backend | Included in build | $0 (free tier) | 100% |
| Per-client database isolation | Included in build | $0 | 100% |
| Local-first development | N/A — internal workflow | $0 | N/A |
| Lightweight CMS backend | Included in build | $0 | 100% |

**Key insight:** Turso's free tier (500 databases, 1 billion reads, 25 million writes, 9 GB) is the most generous database free tier available — by orders of magnitude for read-heavy workloads. It is the right choice for applications where reads vastly outnumber writes (catalogues, directories, content sites) and where SQLite's feature set is sufficient. For complex relational data, use Neon or Supabase. For read-heavy, edge-delivered content, Turso is unbeatable on free-tier value. The 500-database limit means every client project can have its own isolated database at zero cost.

---

**End of Turso Database Integration Strategy**
