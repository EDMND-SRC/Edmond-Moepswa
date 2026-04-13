# Supabase Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Supabase (supabase.com)
**Free Tier:** 500 MB database, 1 GB file storage, 50 MB file uploads, 2 GB bandwidth/month

---

## Overview

Supabase is the primary backend-as-a-service in Edmond's stack for web applications requiring authentication, relational data, file storage, and real-time capabilities. It provides PostgreSQL + Auth + Storage + Realtime subscriptions out of the box. For Edmond's service offerings, Supabase serves as:

1. **Application database** — PostgreSQL with Row Level Security for multi-tenant or role-based applications
2. **Authentication layer** — Email/password, OAuth, and magic link auth without managing auth infrastructure
3. **File storage** — S3-compatible storage for document uploads, images, and media
4. **Real-time data** — WebSocket subscriptions for live dashboards, notifications, and collaborative features

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Database size | 500 MB |
| File storage | 1 GB |
| Max file upload | 50 MB |
| Bandwidth | 2 GB/month |
| Compute hours | Active project only (pauses after 7 days of inactivity) |
| API requests | Unlimited (rate-limited at 100 req/sec on free tier) |
| Realtime concurrent connections | 200 |
| Projects | 2 active projects on free tier |

**Important:** Projects on the free tier are **paused after 7 days of inactivity**. A paused project requires manual reactivation from the Supabase dashboard (takes ~30 seconds). This is not suitable for production client sites without monitoring.

---

## By Service Category

### 1. Web Design & Development

#### Not Typically Used for Marketing Sites
- **Guidance:** Supabase is overkill for Foundation Builds (Launch, Presence, Growth). These sites need no database — content lives in the Next.js app or Keystatic CMS
- **Exception:** Use Supabase for advanced form submission storage when the client wants structured data instead of email routing. A contact form → Supabase table with timestamps, source tracking, and lead scoring fields

---

### 2. Web Applications

#### Primary Backend for Boilerplate 6 (E-commerce Store)
- **Use case:** Product catalogue, inventory tracking, order management, and customer data
- **Architecture:** PostgreSQL with Drizzle ORM → Supabase for persistence → Row Level Security ensures customers only see their own orders
- **Tables:** `products`, `categories`, `orders`, `order_items`, `customers`, `inventory`
- **Auth:** Supabase Auth for customer accounts (email/password + magic link)
- **Storage:** Supabase Storage for product images (1 GB limit — use Cloudflare R2 for larger catalogues)
- **Value:** Full backend with auth, database, and storage for $0 until the project scales

#### Primary Backend for Boilerplate 7 (Professional Services Firm)
- **Use case:** Client portal with document upload, matter tracking, team directory
- **Architecture:** PostgreSQL with Row Level Security — each client role sees only their own documents and matters
- **Tables:** `clients`, `matters`, `documents`, `team_members`, `communications`
- **Storage:** Supabase Storage for client document uploads (CVs, KYC documents, engagement forms)
- **RLS Policy Example:**
  ```sql
  CREATE POLICY "Clients see own documents" ON documents
    FOR SELECT USING (auth.uid() = client_id);
  ```
- **Value:** Enterprise-grade access control with zero backend code

#### Primary Backend for Tier C (Custom SaaS)
- **Use case:** Multi-role platforms, booking systems, membership platforms, data-driven dashboards
- **Architecture:** PostgreSQL + Supabase Auth (or Clerk for richer auth UI) + Drizzle ORM for type safety
- **Pattern:** Supabase as the persistence layer — application logic lives in Next.js server components and API routes
- **Value:** Eliminates the need for a separate backend service. Full-stack application with one infrastructure dependency

---

### 3. Workflow Automation

#### Database Target for Make.com Scenarios
- **Use case:** Make.com scenario → trigger on form submission → insert row into Supabase `leads` table → notify via email
- **Integration:** Supabase REST API (built-in) — no custom code needed in Make.com
- **Value:** Structured lead storage with automatic timestamps and audit trails

#### Webhook-Triggered Automations via Supabase Realtime
- **Use case:** New row inserted → Supabase realtime channel fires → Next.js server component updates → admin dashboard refreshes without page reload
- **Value:** Real-time notifications and dashboard updates without polling

---

### 4. Advisory & Consulting

#### Rapid Prototyping for Advisory Clients
- **Use case:** During a Half-Day Working Session, spin up a Supabase project to demonstrate data architecture for a client's proposed application
- **Value:** Live database schema in 15 minutes — far more convincing than a whiteboard diagram

---

## Quick-Win Implementations

### Priority 1: Standardised Supabase + Drizzle Setup (1 hour)
Create a reusable Drizzle ORM configuration for Supabase:

```typescript
// db/schema.ts
import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message'),
  source: text('source'), // 'contact_form', 'booking', 'landing_page'
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

### Priority 2: Row Level Security Template Library (2 hours)
Create RLS policy templates for common patterns:

```sql
-- Admin can see all
CREATE POLICY "Admins see all records" ON documents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
  );

-- Users see own records
CREATE POLICY "Users see own records" ON documents
  FOR SELECT USING (auth.uid() = owner_id);

-- Insert own records
CREATE POLICY "Users insert own records" ON documents
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
```

### Priority 3: Supabase Pause Monitoring (30 min)
Add a Better Stack monitor (from free tier) that pings the Supabase REST API daily. If the project is paused, the monitor fails and sends an alert. This prevents the embarrassing situation of a client's site failing because Supabase was paused.

---

## Resource Budget Planning

**Free tier covers most small-to-medium applications:**

| Resource | Typical Usage (Small App) | Free Limit | Headroom |
|----------|--------------------------|-------------|----------|
| Database | 50–200 MB | 500 MB | ~60% |
| Storage | 200–500 MB | 1 GB | ~50% |
| Bandwidth | 500 MB–1.5 GB/month | 2 GB/month | ~25% |
| API requests | 10K–100K/day | Unlimited (100 req/sec) | ~90%+ |
| Realtime connections | 10–50 | 200 | ~75% |

**When to upgrade to Pro ($25/project/month):**
- Database exceeds 500 MB
- Project pausing is unacceptable for production (Pro projects never pause)
- Client needs automated backups (Pro includes daily backups with 7-day retention)
- Bandwidth exceeds 2 GB/month
- More than 2 active projects needed simultaneously

**Cost optimisation tip:** For image-heavy applications (e-commerce, portfolios), use Supabase for the database and auth, but store files in Cloudflare R2 (no egress fees, 10 GB free). This preserves Supabase's 1 GB storage limit for structured data only.

---

## Risks & Considerations

1. **Project pausing:** The 7-day inactivity pause is the biggest risk on the free tier. A paused project means all API calls return errors. **Mitigation:** Monitor with Better Stack, or upgrade to Pro for production sites
2. **No custom domains on free tier:** Supabase project URLs use the `supabase.co` subdomain. Custom domains require the Pro plan
3. **50 MB file upload limit:** Large file uploads (video, high-res images) will fail. Use Cloudflare R2 for files >10 MB
4. **Row Level Security complexity:** RLS policies are powerful but easy to misconfigure. Test thoroughly — a broken RLS policy can expose data to unauthorised users
5. **Drizzle + Supabase:** Drizzle ORM works with Supabase's PostgreSQL, but Supabase-specific features (Realtime, Storage) require the `@supabase/supabase-js` SDK directly — Drizzle doesn't abstract these
6. **2-project limit:** On the free tier, only 2 active projects at a time. Archive old projects to free up slots

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| E-commerce backend (BP6) | Included in P35,000 build | $0 (free tier) | 100% |
| Client portal with document storage (BP7) | Included in P32,000 build | $0 (free tier) | 100% |
| Custom SaaS backend (Tier C) | From P48,000 | $0 until scale | 100% |
| Lead storage for marketing sites | Optional add-on +P1,800 | $0 | 100% |

**Key insight:** Supabase eliminates the need for a separate backend service in most application builds. The free tier covers the database, auth, and storage needs of small-to-medium applications entirely. The upgrade trigger ($25/month Pro plan) should be disclosed at scoping when a project is expected to exceed 500 MB or requires zero-downtime production reliability. For document-heavy applications, pair Supabase (database + auth) with Cloudflare R2 (file storage) to maximise free-tier headroom.

---

**End of Supabase Integration Strategy**
