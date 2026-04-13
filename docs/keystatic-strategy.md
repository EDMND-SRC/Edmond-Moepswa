# Keystatic CMS Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Keystatic (keystatic.com) — Open-source, Git-based
**Free Tier:** Fully free and open-source (MIT license). No hosting cost — content lives in the Git repository.

---

## Overview

Keystatic is an open-source, Git-based CMS designed for content-managed marketing sites. Unlike Payload CMS (which stores data in a database and runs as a separate application), Keystatic stores content as Markdown and JSON directly in the Git repository. Editors interact with a clean, lightweight interface — no database, no admin panel, no login credentials to manage.

For Edmond's service offerings, Keystatic is the default CMS for:

1. **Marketing sites** — Foundation Builds (Presence, Growth) and Boilerplate Builds where content is primarily pages, blog posts, and simple data
2. **Solo or small-team content management** — Clients with 1–2 content editors who prefer a clean interface over a complex admin dashboard
3. **Zero-infrastructure CMS** — No database, no server, no hosting cost. Content is version-controlled alongside the code
4. **Developer-friendly content model** — Content is defined in code (collections and singletons), making it easy to version, review, and rollback via Git

---

## Cost Structure

Keystatic is **free and open-source** (MIT license). There are no costs whatsoever:

| Component | Cost |
|-----------|------|
| Keystatic software | Free (MIT license) |
| Content storage | Git repository (GitHub/GitLab/Bitbucket — all have free private repos) |
| CMS hosting | None needed — runs as part of the Next.js dev server or as a separate `/admin` route |
| Database | Not applicable — content is stored as Markdown/JSON in Git |

**Total cost: $0/month, always.**

---

## By Service Category

### 1. Web Design & Development

#### Default CMS for Presence and Growth Builds
- **Use case:** Client needs to edit page content, blog posts, team members, or service descriptions without touching code
- **Collections:**
  - `pages` — Home, About, Services, Contact (each page as a Markdown file with frontmatter)
  - `posts` — Blog/news articles (Markdown with rich text via Markdoc or MDX)
  - `team` — Team member profiles (YAML or JSON for structured data)
  - `services` — Service descriptions with pricing and details
- **Value:** Client logs into `/admin` → edits content → commits are created automatically in Git → Next.js rebuilds → changes live. No database, no CMS server, no infrastructure

#### Boilerplate 1 — Artisan & Craftmaker Portfolio (from P25,000)
- **Use case:** Portfolio gallery management — artisans add new project photos and descriptions
- **Collections:**
  - `portfolio` — Title, category, description, images (array), date, featured flag
  - `products` — Commission enquiry items or available works
- **Value:** Artisan can upload new portfolio pieces through a clean interface. Images are stored in the repo (or linked from Cloudflare R2 for large files)

#### Boilerplate 2 — Personal Professional Services (from P28,000)
- **Use case:** Professional bio, service pages, testimonials management
- **Collections:**
  - `bio` — Single content type (singleton) for the professional biography
  - `services` — Service name, description, pricing, booking link
  - `testimonials` — Client name, role, quote, star rating
- **Value:** Broker or adviser can update their bio, add services, and manage testimonials without developer involvement

#### Boilerplate 3 — Food, Catering & Hospitality (from P30,000)
- **Use case:** Menu management, seasonal specials, event listings
- **Collections:**
  - `menu` — Categories, items, descriptions, prices, dietary tags
  - `events` — Event name, date, description, booking link
- **Value:** Chef or caterer updates the menu directly. No need to contact the developer for a price change or new dish

#### Boilerplate 4 — Beauty, Wellness & Fitness (from P28,000)
- **Use case:** Services menu, pricing updates, gallery management
- **Collections:**
  - `services` — Service name, duration, price, description, staff assignment
  - `gallery` — Before/after photos, studio images
- **Value:** Salon owner manages services and gallery independently

#### Boilerplate 5 — Events, Photography & Entertainment (from P28,000)
- **Use case:** Portfolio gallery, packages, pricing tiers
- **Collections:**
  - `portfolio` — Images (lightbox), embedded video links, event details
  - `packages` — Package name, inclusions, price, duration
- **Value:** Photographer or DJ updates portfolio and packages as their offerings evolve

#### Boilerplate 8 — NGO, Church & Community Organisation (from P28,000)
- **Use case:** Programme pages, news/events, volunteer management content
- **Collections:**
  - `programmes` — Programme name, description, impact metrics
  - `news` — News articles and announcements
  - `events` — Event name, date, location, registration link
- **Value:** Organisation staff updates content without requiring technical skills

---

### 2. Web Applications

#### Not Used for Complex Applications
- **Guidance:** Keystatic is not suitable for Boilerplate 6 (E-commerce), Boilerplate 9 (Financial Services), or Tier C (Custom SaaS) where relational data, access control, and complex content types are needed. Use Payload CMS for these
- **Threshold:** If the client needs more than 5 content types, multiple user roles, or relationships between content items (e.g., "this order belongs to this customer"), switch to Payload CMS

---

### 3. Workflow Automation

#### Git-Based Content as Automation Source
- **Use case:** Keystatic commits to the `main` branch trigger a Vercel deployment → webhook fires → Make.com scenario notifies the client via email that their content update is live
- **Value:** Simple, transparent content workflow. Every change is version-controlled and reversible via Git

#### Content Approval via Pull Requests
- **Use case:** For clients who want a review step before content goes live: Keystatic commits to a `content-review` branch → pull request created → reviewer approves → merge → Vercel deploys
- **Value:** Built-in content approval workflow using Git's native PR mechanism. No custom CMS permission system needed

---

### 4. Advisory & Consulting

#### Quick CMS Recommendation for Advisory Clients
- **Use case:** During an advisory session, recommend Keystatic for clients with simple content needs (1–2 editors, <5 content types, no relational data)
- **Value:** Demonstrates practical expertise — "You don't need a database for your blog. Here's a CMS that stores content in your existing Git repo, costs nothing, and your developer can set it up in an hour"

---

## Quick-Win Implementations

### Priority 1: Standard Keystatic Config for Boilerplates (2 hours)
Create a reusable Keystatic configuration:

```typescript
// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: 'client-org/client-repo',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({ label: 'Excerpt' }),
        content: fields.markdoc({ label: 'Content' }),
        image: fields.image({ label: 'Featured Image' }),
        date: fields.date({ label: 'Published Date' }),
      },
    }),
    team: collection({
      label: 'Team Members',
      schema: {
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role' }),
        bio: fields.markdoc({ label: 'Bio' }),
        photo: fields.image({ label: 'Photo' }),
      },
    }),
  },
})
```

### Priority 2: Keystatic Admin Route Integration (30 min)
```typescript
// app/admin/[[...routes]]/page.tsx
import { makePage } from '@keystatic/next/ui/app'
import config from '../../keystatic.config'

export default makePage(config)
```

Access the CMS at `yoursite.com/admin` — no separate hosting needed.

### Priority 3: Image Storage via Cloudflare R2 (1 hour)
For image-heavy boilerplates, configure Keystatic to store images in Cloudflare R2 instead of the Git repository:

```typescript
// keystatic.config.ts
storage: {
  kind: 'cloudflare-r2',
  bucket: 'client-images',
  // credentials via environment variables
}
```

This keeps the Git repository lean while still providing fast image delivery.

---

## Resource Budget Planning

**Keystatic has zero infrastructure costs:**

| Resource | Usage | Cost |
|----------|-------|------|
| Software | Full access | $0 (MIT license) |
| Content storage | Git repository (GitHub free private repos) | $0 |
| Image storage | Git repo (small) or Cloudflare R2 (10 GB free) | $0 |
| CMS hosting | Runs as `/admin` route in Next.js app | $0 |
| Bandwidth | Served via Vercel/Cloudflare CDN | Included in hosting |

**When to consider limits:**
- Git repository exceeds 1 GB (GitHub free limit is 1 GB per repo — unlikely for text content but possible with many embedded images). **Mitigation:** Store images in Cloudflare R2, not the repo
- More than 5 content editors who need simultaneous access. Keystatic supports this, but content conflicts may arise. **Mitigation:** Use Git branching for review workflows

---

## Risks & Considerations

1. **No database = no relational data:** Keystatic cannot enforce relationships between content types. If you need "every blog post must have an author from the team collection," Keystatic cannot validate this
2. **No access control on free tier:** All GitHub repo collaborators have full read/write access to content. For multi-role access control (editor vs. admin vs. viewer), use Payload CMS
3. **Content preview requires rebuild:** After editing content in Keystatic, the Next.js site must rebuild to show changes. This takes 30–60 seconds on Vercel — not instant like a database-backed CMS
4. **Image storage in Git is anti-pattern:** Storing images in the Git repository bloats the repo over time. Always use Cloudflare R2 or another external storage for images
5. **Single admin interface:** Keystatic provides one admin panel at `/admin`. Multiple CMS instances (e.g., separate CMS for different content types) are not supported — use one config with multiple collections

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Presence build CMS (4 pages) | Included in P13,000 | $0 | 100% |
| Growth build CMS (6 pages + blog) | Included in P19,500 | $0 | 100% |
| Boilerplate CMS (all types 1–5, 8) | Included in P25,000–P30,000 | $0 | 100% |
| Additional content types | +P1,800 per type | $0 setup cost | 100% |

**Key insight:** Keystatic is the most cost-effective CMS available for marketing sites — $0 forever, zero infrastructure, and content versioned in Git. It is the right choice for Foundation Builds and Boilerplate Builds 1–5 and 8, where content management needs are straightforward (1–2 editors, <5 content types, no relational data). For complex applications requiring access control, relationships, and admin dashboards, use Payload CMS. The two CMSes complement each other: Keystatic for marketing sites, Payload CMS for applications.

---

**End of Keystatic CMS Integration Strategy**
