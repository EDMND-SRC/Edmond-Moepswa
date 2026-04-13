# Drizzle ORM Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Drizzle ORM (orm.drizzle.team) — Open-source TypeScript ORM
**Free Tier:** Fully free and open-source (Apache 2.0 license)

---

## Overview

Drizzle ORM is a TypeScript-first ORM for SQL databases (PostgreSQL, MySQL, SQLite) that provides type-safe database queries, schema definitions, and migrations. Unlike heavier ORMs like Prisma, Drizzle is lightweight, fast, and generates SQL that developers can easily understand and optimise.

For Edmond's service offerings, Drizzle serves as:

1. **Type-safe database layer** — TypeScript types generated from schema definitions ensure compile-time query safety
2. **Schema-as-code** — Database tables defined in TypeScript files, version-controlled alongside application code
3. **Migration management** — Schema changes generate migration files that keep the database in sync with the code
4. **Universal SQL access** — Works with Supabase (PostgreSQL), Neon (serverless PostgreSQL), Cloudflare D1 (SQLite), and Planetscale (MySQL)

---

## Cost Structure

Drizzle ORM is **free and open-source** (Apache 2.0 license). There are no costs:

| Component | Cost |
|-----------|------|
| Drizzle ORM package | Free (npm install drizzle-orm) |
| Drizzle Kit (migrations) | Free (npm install -D drizzle-kit) |
| Drizzle Studio (database browser) | Free |
| License | Apache 2.0 — fully open-source |

The only costs are the underlying database infrastructure (Supabase, Neon, etc.) — which have their own free tiers.

---

## By Service Category

### 1. Web Applications

#### Standard Database Layer for All SaaS Builds (Tier C)
- **Use case:** Define database schema in TypeScript → generate types → write type-safe queries → deploy migrations
- **Architecture:** Drizzle ORM + Neon (PostgreSQL) + Clerk (Auth) → fully type-safe stack from database to React components
- **Value:** Compile-time type safety catches errors before deployment. No runtime "column does not exist" surprises

```typescript
// db/schema.ts
import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  role: text('role', { enum: ['admin', 'user'] }).default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  status: text('status', { enum: ['draft', 'active', 'archived'] }).default('draft').notNull(),
  budget: integer('budget'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

#### Boilerplate 6 — E-commerce (from P35,000)
- **Use case:** Product catalogue, categories, orders, customers, inventory
- **Schema:**
  ```typescript
  export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: integer('price').notNull(), // in cents
    stock: integer('stock').default(0),
    categoryId: uuid('category_id').references(() => categories.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  })
  ```
- **Value:** Type-safe product queries. `db.select().from(products).where(eq(products.stock, 0))` returns `{ stock: number }` — TypeScript knows the type

#### Boilerplate 7 — Professional Services Firm (from P32,000)
- **Use case:** Clients, matters, documents, team members
- **Row Level Security + Drizzle:** Drizzle queries combined with Supabase RLS policies ensure users can only access their own data
- **Pattern:** Clerk provides userId → Drizzle queries filter by userId → Supabase RLS enforces at database level

---

### 2. Development Workflow

#### Migration Workflow
```bash
# After schema changes:
npx drizzle-kit generate    # Generates migration SQL file
npx drizzle-kit migrate     # Applies migration to database
npx drizzle-kit studio      # Opens Drizzle Studio (visual database browser)
```

- **Value:** Version-controlled database schema. Every migration is a SQL file in Git — reviewable, reversible, auditable

#### Drizzle Studio for Development
- **Use case:** Visual database browser during development — inspect data, test queries, debug issues
- **Value:** Free alternative to pgAdmin or DBeaver. Connects to any PostgreSQL database via the connection string
- **Access:** `npx drizzle-kit studio` → opens browser-based UI at localhost:3000

---

### 3. Testing

#### Vitest + Drizzle for Database Tests
- **Use case:** Unit tests that verify database queries and business logic
- **Pattern:** Create test database → run migrations → execute queries → assert results → tear down
- **Value:** Tests the actual SQL queries, not mocked database responses. Catches real SQL errors before deployment

---

## Quick-Win Implementations

### Priority 1: Standard Drizzle Setup (30 min)
```typescript
// db/index.ts — PostgreSQL (Supabase/Neon)
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
```

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

### Priority 2: Type Generation (automatic)
Drizzle automatically generates TypeScript types from the schema. Every table definition becomes a TypeScript type:

```typescript
// Usage — types are inferred
import { users } from './db/schema'
type User = typeof users.$inferSelect  // { id: string, email: string, name: string | null, ... }
type NewUser = typeof users.$inferInsert // { email: string, name?: string, ... }
```

### Priority 3: Common Query Patterns Library (2 hours)
Create reusable query patterns for common operations:

```typescript
// db/queries/users.ts
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getUserById(id: string) {
  return db.select().from(users).where(eq(users.id, id)).limit(1)
}

export async function createUser(data: typeof users.$inferInsert) {
  return db.insert(users).values(data).returning()
}

export async function updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
  return db.update(users).set(data).where(eq(users.id, id)).returning()
}
```

---

## Resource Budget Planning

**Drizzle ORM is free — database infrastructure costs apply:**

| Component | Free Option | Cost |
|-----------|------------|------|
| Drizzle ORM | Apache 2.0 | $0 |
| Drizzle Kit | Apache 2.0 | $0 |
| Drizzle Studio | Apache 2.0 | $0 |
| Database (Supabase free) | 500 MB | $0 |
| Database (Neon free) | 0.5 GB, 10 compute hrs/month | $0 |

**No upgrade path needed:** Drizzle is fully featured at zero cost. The only costs are the database infrastructure, which has its own free tiers (covered in the Supabase and Neon strategy documents).

---

## Risks & Considerations

1. **No built-in connection pooling:** Drizzle relies on the database's connection pooling (Neon's serverless driver, Supabase's PgBouncer). Ensure the database provider handles connection pooling — otherwise, Next.js server components will exhaust database connections
2. **Migrations are manual:** Drizzle generates migration SQL files, but they must be applied manually or via a deployment script. There is no automatic migration on deployment (unlike Prisma's `prisma migrate deploy`)
3. **No built-in auth:** Drizzle is purely an ORM — it doesn't handle authentication, session management, or user permissions. Use Clerk, Supabase Auth, or Kinde for authentication
4. **Learning curve for SQL:** Drizzle exposes SQL directly — developers need to understand SQL concepts (joins, subqueries, indexes) to use it effectively. This is an advantage over Prisma (which abstracts SQL) but a barrier for developers without SQL experience
5. **Drizzle Studio in production:** Drizzle Studio connects directly to the database. Never expose it to the internet on a production server. Use it only in development or on a secured internal network

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Database layer for SaaS (Tier C) | Included in P48,000+ build | $0 (free ORM) | 100% |
| E-commerce database (BP6) | Included in P35,000 build | $0 | 100% |
| Professional services database (BP7) | Included in P32,000 build | $0 | 100% |
| Migration management | Included in build | $0 | 100% |

**Key insight:** Drizzle ORM is the default database layer for all of Edmond's application builds. It is free, type-safe, lightweight, and works with every SQL database in the stack (Supabase, Neon, D1). The combination of Drizzle + Neon + Clerk provides a fully type-safe stack from database schema to React components — with compile-time error checking that catches bugs before deployment. There is no cost to Drizzle itself; the only infrastructure costs are the database platforms (covered in Supabase and Neon strategy documents).

---

**End of Drizzle ORM Integration Strategy**
