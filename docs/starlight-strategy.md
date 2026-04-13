# Starlight (Astro) Documentation Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Starlight (starlight.astro.build) — Open-source documentation framework built on Astro
**Free Tier:** Fully free and open-source (MIT license). Self-hosted — only infrastructure costs apply.

---

## Overview

Starlight is an open-source documentation site generator built on Astro. It produces fast, accessible, beautifully simple documentation sites from Markdown files. Unlike Mintlify (a hosted platform), Starlight is a self-hosted tool — you own the entire stack, from design to deployment.

For Edmond's practice, Starlight serves as:

1. **Self-hosted alternative to Mintlify** — For clients who want full ownership of their documentation infrastructure
2. **Custom-branded documentation** — Starlight's design is customisable (colours, typography, layout, components) — no two Starlight sites need look the same
3. **Documentation included in builds** — Deploy alongside the client's main Next.js application on Vercel — no separate platform dependency
4. **Open-source compliance** — MIT license means no vendor lock-in, no usage limits, no paid tiers — ever

---

## Cost Structure

Starlight is **free and open-source** (MIT license). The only costs are hosting infrastructure:

| Component | Cost |
|-----------|------|
| Starlight software | $0 (MIT license) |
| Astro framework | $0 (MIT license) |
| Hosting | $0 on Vercel Hobby tier (static site) |
| Custom domain | Included in Vercel hosting |
| Build minutes | Included in Vercel Hobby (100 hours/month) |

**Total cost: $0/month** when hosted on Vercel Hobby as a static site.

---

## By Service Category

### 1. Web Applications

#### Self-Hosted Product Documentation (Tier C)
- **Use case:** SaaS product documentation deployed alongside the application — same hosting, same domain, no external platform dependency
- **Structure:** `docs.client-app.com` — a Starlight subdomain deployed as a separate Vercel project
- **Advantage over Mintlify:** Full design customisation, no platform dependency, no team limits, no usage tracking by a third party
- **Value:** Documentation that matches the client's brand exactly — not a template that looks like every other Mintlify site

---

### 2. Web Design & Development

#### Branded Handover Documentation
- **Use case:** Client handover docs deployed as a Starlight site with the client's brand colours, logo, and typography — indistinguishable from their main website
- **Value:** Seamless brand experience. The documentation doesn't feel like a third-party platform — it feels like part of the product
- **Implementation:** Create a Starlight project → apply client's brand tokens → write content → deploy to Vercel → custom domain `docs.client.com`

---

### 3. Internal Use (Edmond's Own Practice)

#### Internal Knowledge Base
- **Use case:** Edmond's own practice documentation — deployment procedures, boilerplate configurations, tool configurations, decision frameworks
- **Value:** Permanently accessible, version-controlled, searchable knowledge base. Deployed to Vercel at `docs.edmondmoepswa.com` (or private repo)

#### Boilerplate Reference
- **Use case:** Each of the 9 Boilerplate Builds documented in Starlight — tech stack, configuration, common customisations, known issues, deployment checklist
- **Value:** Consistent, structured reference that improves with use. Every project adds lessons learned to the documentation

---

## Quick-Win Implementations

### Priority 1: Starlight Project Setup (30 min)
```bash
# Create a new Starlight project
npm create astro@latest -- --template starlight
cd my-docs-site
npm install
npm run dev
```

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Client Documentation',
      logo: { src: '/logo.svg' },
      social: { github: 'https://github.com/client-org' },
      sidebar: [
        { label: 'Getting Started', link: '/getting-started/' },
        { label: 'User Guide', link: '/guide/' },
        { label: 'Admin Manual', link: '/admin/' },
        { label: 'API Reference', link: '/api/' },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
})
```

### Priority 2: Brand Customisation (1 hour)
```css
/* src/styles/custom.css — apply client's brand */
:root {
  --sl-color-text-accent: #client-brand-primary;
  --sl-color-bg: #client-background;
  --sl-font: 'client-brand-font', system-ui, sans-serif;
}

/* Custom logo in header, custom favicon, custom colour tokens */
```

### Priority 3: Vercel Deployment (15 min)
```bash
# Push to GitHub → connect to Vercel → auto-deploy on push
# Configure custom domain: docs.client.com
# Zero build configuration — Starlight outputs static files by default
```

---

## Starlight vs. Mintlify Decision Guide

| Feature | Starlight | Mintlify |
|---------|-----------|----------|
| Cost | $0 forever (MIT license) | Free for open-source/single site |
| Hosting | Self-hosted (Vercel, Netlify, any static host) | Hosted by Mintlify |
| Design customisation | Full — CSS, components, layouts | Limited — colour and logo only |
| Search | Built-in (client-side) | Algolia-powered (server-side) |
| MDX support | Yes | Yes |
| i18n (multiple languages) | Built-in | Supported |
| Analytics | Manual (add your own) | Built-in |
| API docs (OpenAPI) | Via plugin (@astrojs/starlight-openapi) | Built-in import |
| Vendor lock-in | None — Markdown files are portable | Some — site structure is Mintlify-specific |
| Team collaboration | Via Git (PR workflow) | Via Mintlify dashboard |
| Best for | Custom-branded, self-hosted docs | Quick, professional docs with zero setup |

**Recommendation:** Use Starlight when the client wants custom-branded documentation that matches their website exactly, or when self-hosting is a requirement. Use Mintlify when speed and simplicity are the priority — a professional docs site in under an hour with no design work needed.

---

## Resource Budget Planning

**Completely free:**

| Component | Cost |
|-----------|------|
| Starlight | $0 (MIT license) |
| Astro | $0 (MIT license) |
| Vercel hosting (Hobby) | $0 |
| Custom domain | Included in Vercel |
| Build minutes | Included in Vercel |

**Total: $0/month, always.**

---

## Risks & Considerations

1. **Self-hosting responsibility:** Starlight requires deployment and maintenance. Unlike Mintlify (which handles hosting, search indexing, and uptime), Starlight's infrastructure is your responsibility. For Vercel-hosted static sites, this is minimal — but it is not zero
2. **Search limitations:** Starlight uses client-side search (Pagefind), which works well for documentation under ~500 pages. For larger documentation sites, server-side search (like Mintlify's Algolia integration) is faster and more accurate
3. **No built-in analytics:** Starlight doesn't include page view tracking or search query analytics. Add your own analytics (PostHog, Google Analytics) if the client needs documentation usage data
4. **Content management via Git:** Starlight content is managed through Markdown files in a Git repository — not through a CMS editor. For clients who want to edit documentation without Git, Mintlify's dashboard editor is more accessible
5. **OpenAPI plugin maturity:** Starlight's OpenAPI plugin (`@astrojs/starlight-openapi`) is newer than Mintlify's built-in API doc generation. For complex API documentation, Mintlify may produce more polished results out of the box

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Branded handover documentation | Included in build or +P1,500 | 1–2 hours | 100% |
| Self-hosted product docs (Tier C) | Included in P48,000+ build | 2–3 hours | 100% |
| Internal knowledge base | N/A — internal tool | 2–3 hours initial setup | N/A |

**Key insight:** Starlight is the self-hosted, fully customisable documentation alternative to Mintlify. Its MIT license means zero cost, zero vendor lock-in, and zero usage limits — forever. For Edmond's practice, Starlight is the right choice when the client wants documentation that matches their brand exactly, or when self-hosting is a requirement (data sovereignty, compliance, or independence from third-party platforms). Mintlify remains the faster option for professional documentation with minimal setup time. Both should be in the toolkit — Starlight for custom-branded, self-hosted docs; Mintlify for quick, polished docs with zero infrastructure.

---

**End of Starlight Documentation Integration Strategy**
