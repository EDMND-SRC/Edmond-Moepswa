# Mintlify Documentation Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Mintlify (mintlify.com)
**Free Tier:** Free for open-source projects and single-doc sites — full documentation site builder, custom domain, search, analytics

---

## Overview

Mintlify is a modern documentation platform that generates beautiful, searchable documentation sites from Markdown/MDX files. It provides a polished, professional alternative to manually building docs — with built-in search, versioning, analytics, and a clean design system.

For Edmond's practice, Mintlify serves as:

1. **Client handover documentation** — Professional documentation sites for delivered projects, explaining how to use the CMS, update content, and manage the system
2. **Product documentation for SaaS builds** — API docs, user guides, and developer documentation for Tier C SaaS products
3. **Internal knowledge base** — Documenting Edmond's own processes, boilerplate configurations, and deployment procedures
4. **Deliverable upsell** — Offering a branded documentation site as a premium add-on to any build

---

## Free Tier Capabilities (2026)

| Feature | Availability |
|---------|-------------|
| Documentation site | Full — Markdown/MDX-based site generation |
| Search | Full — Algolia-powered search |
| Custom domain | Supported |
| Analytics | Page views, search queries, most-viewed pages |
| Versioning | Supported (for API docs with multiple versions) |
| MDX support | Full — React components inside documentation |
| Open Graph | Automatic — each page generates shareable metadata |
| Dark mode | Built-in |
| Team members | Limited on free tier |
| Open-source projects | Free (unlimited) |

**Team plan ($120/editor/month):** Advanced collaboration, review workflows, analytics exports, custom themes.

---

## By Service Category

### 1. Web Applications

#### Product Documentation for SaaS (Tier C)
- **Use case:** Every Tier C SaaS product ships with a documentation site — user guide, admin manual, API reference, troubleshooting
- **Structure:**
  - Getting Started — account setup, first login, navigation
  - User Guide — how to use each feature, step by step
  - Admin Manual — managing users, settings, billing, integrations
  - API Reference — endpoints, authentication, request/response examples
  - Troubleshooting — common issues and resolutions
- **Value:** Professional product documentation is a competitive differentiator. Most SME SaaS products have no docs or a Google Doc. A Mintlify site signals maturity and professionalism

#### API Documentation
- **Use case:** Custom API built for a client — document every endpoint with request/response examples, authentication requirements, and error codes
- **Mintlify capability:** OpenAPI specification import → auto-generated API docs with try-it-now functionality
- **Value:** Developer-friendly API documentation without manually writing each endpoint page

---

### 2. Web Design & Development

#### Client Handover Documentation
- **Use case:** Every completed build ships with a handover document. Instead of a PDF, deliver a Mintlify documentation site:
  - How to log in to the CMS
  - How to add/edit/delete content
  - How to manage form submissions and leads
  - How to update images and media
  - How to check analytics
  - Who to contact for support
- **Value:** Searchable, navigable, permanently accessible documentation — not a PDF that gets lost in an email inbox
- **Pricing:** Include in all Boilerplate and Tier C builds. Offer as a premium add-on (+P1,500) for Foundation Builds

---

### 3. Internal Use (Edmond's Own Practice)

#### Boilerplate Documentation
- **Use case:** Document each of the 9 Boilerplate Builds — tech stack, deployment process, common customisations, known issues
- **Value:** Consistent reference material when starting a new boilerplate project. Reduces setup time and prevents forgotten steps

#### Process Documentation
- **Use case:** Document Edmond's own workflows — deployment procedures, DNS configuration, SSL setup, monitoring configuration
- **Value:** Institutional knowledge that survives time and doesn't depend on memory

---

## Quick-Win Implementations

### Priority 1: Mintlify Docs Site Template (1 hour)
```bash
# Install Mintlify CLI
npx mintlify init

# Creates a docs/ folder with:
#   mint.json — configuration file
#   logo.svg — site logo
#   favicon.svg — site favicon
#   api-reference/ — API docs directory
#   getting-started.mdx — first page
```

```json
// mint.json
{
  "name": "Client Name Documentation",
  "logo": "/logo.svg",
  "favicon": "/favicon.svg",
  "colors": {
    "primary": "#1A1A2E",
    "light": "#16213E",
    "dark": "#0F0F23"
  },
  "navigation": [
    {
      "group": "Getting Started",
      "pages": ["getting-started/introduction", "getting-started/quick-start"]
    },
    {
      "group": "User Guide",
      "pages": ["user-guide/content-management", "user-guide/forms"]
    },
    {
      "group": "Admin Manual",
      "pages": ["admin/settings", "admin/users", "admin/analytics"]
    }
  ]
}
```

### Priority 2: Handover Documentation Template (2 hours)
Create a reusable handover documentation structure:
```
/docs
├── getting-started/
│   ├── introduction.mdx
│   ├── logging-in.mdx
│   └── navigating-the-dashboard.mdx
├── content-management/
│   ├── editing-pages.mdx
│   ├── adding-blog-posts.mdx
│   ├── managing-images.mdx
│   └── managing-forms.mdx
├── leads-and-enquiries/
│   ├── viewing-submissions.mdx
│   └── exporting-data.mdx
├── analytics/
│   ├── viewing-traffic.mdx
│   └── understanding-metrics.mdx
└── support/
    ├── troubleshooting.mdx
    └── contact-support.mdx
```

### Priority 3: Deployment to Mintlify (15 min)
```bash
# Deploy docs site
npx mintlify deploy

# Or connect GitHub repo for automatic deployments on push
# Docs available at docs.client-domain.com (custom domain)
```

---

## Resource Budget Planning

**Free tier covers most documentation needs:**

| Feature | Typical Usage | Free Limit | Headroom |
|---------|--------------|-------------|----------|
| Documentation sites | 1–5 per client | Unlimited (open-source/single) | N/A |
| Pages per site | 20–50 | Unlimited | N/A |
| Search queries | 500–2,000/month | Included | N/A |
| Custom domains | 1 per site | Supported | N/A |

**When to consider paid plans:**
- Multiple team members need to edit documentation simultaneously
- Advanced analytics exports needed
- Custom themes beyond the built-in options
- Review workflows and approval processes

---

## Risks & Considerations

1. **Vendor lock-in:** Documentation lives on Mintlify's infrastructure. Export is possible (Markdown files are the source), but the site structure, styling, and search configuration are Mintlify-specific
2. **Free tier ambiguity:** Mintlify's free tier is generous for open-source projects and single documentation sites, but the exact limits for commercial use are not clearly published. Verify at setup
3. **Markdown-only content:** Mintlify renders Markdown/MDX — it doesn't auto-generate documentation from code (like TypeDoc or JSDoc). API documentation must be written manually or imported from OpenAPI specs
4. **Design limitations:** While Mintlify's design is clean and professional, it is a template — all Mintlify docs look similar. For clients who want a fully custom design, a self-hosted solution like Starlight (Astro) may be more appropriate
5. **Team collaboration on free tier:** Limited team editing on the free tier. For single-author documentation (which is the typical use case for handover docs), this is not a constraint

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Handover documentation (Boilerplate/Tier C) | Included in build | 1–2 hours to write | 100% |
| Handover documentation (Foundation Build add-on) | +P1,500 | 1–2 hours | 100% |
| SaaS product documentation | Included in Tier C build | 3–5 hours to write | 100% |
| API documentation | +P2,000 add-on | 2–3 hours | 100% |

**Key insight:** Mintlify transforms handover documentation from a forgotten PDF into a professional, searchable, permanently accessible documentation site. For Boilerplate and Tier C builds, it should be included as standard — the time investment (1–2 hours) is minimal compared to the value signal it sends. For Foundation Builds, offer it as a premium add-on (+P1,500). The documentation site becomes a lasting touchpoint with the client — every time they look up how to do something, they see a professionally delivered resource that reinforces the quality of the original build.

---

**End of Mintlify Documentation Integration Strategy**
