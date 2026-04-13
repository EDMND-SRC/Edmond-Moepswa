# Firecrawl Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**API Key:** `FIRECRAWL_API_KEY` (configured in `.env.local`)
**Free Tier:** 500 credits/month

---

## Overview

Firecrawl converts websites into LLM-ready markdown or structured data. For Edmond's service offerings, this creates three categories of value:

1. **Internal efficiency** — Faster research, competitor analysis, and content gathering
2. **Client deliverables** — Tangible outputs you can sell or include in engagements
3. **Product differentiation** — Unique services competitors don't offer

---

## By Service Category

### 1. Web Design & Development

#### Competitor & Inspiration Research (Internal Efficiency)
- **Use case:** Before scoping a client's website, scrape 5-10 competitor sites and convert them to structured markdown for analysis
- **Endpoint:** `/v2/crawl` with `limit: 10` to map entire competitor sites
- **Output:** Clean markdown files organised in a folder — easy to review design patterns, content structures, CTAs
- **Value:** Cuts discovery research from hours to minutes. You can present this to clients as part of your "competitive audit" deliverable

#### Content Migration / Site Redesign
- **Use case:** Client wants to redesign their existing site. Scrape all current pages → extract content structure → map to new architecture
- **Endpoint:** `/v2/crawl` with `scrapeOptions: { formats: ["markdown"] }`
- **Output:** Complete content inventory in markdown, ready to plan the new site's information architecture
- **Value:** No more manual copy-pasting from old sites. Full content audit delivered as part of the proposal

#### Accessibility Audit
- **Use case:** Scrape client's current site → analyze HTML structure for accessibility issues (missing alt text, heading hierarchy, landmark roles)
- **Endpoint:** `/v2/scrape` with `formats: ["html"]` + custom analysis
- **Value:** Sell as a standalone audit service (P2,500-5,000)

---

### 2. Web Applications

#### Requirements Gathering from Existing Systems
- **Use case:** Client wants to replicate or replace a legacy system. Scrape the existing application's pages to document current functionality
- **Endpoint:** `/v2/map` first to discover all URLs, then `/v2/crawl` for content
- **Value:** Accurate functional specification based on the real system, not the client's memory of it

#### API Documentation Aggregation
- **Use case:** Building integrations? Scrape third-party API docs into markdown for your dev process or RAG pipeline
- **Endpoint:** `/v2/crawl` with `allowedDomains` and `maxDepth`
- **Value:** Offline reference documentation for complex integrations (DPO PayGate, Orange Money, HubSpot, etc.)

---

### 3. Workflow Automation

#### Lead Enrichment Pipeline (Client-Facing Product)
- **Use case:** When a lead comes in via contact form or Cal.com, automatically scrape their company website to gather context before the discovery call
- **Endpoint:** `/v2/scrape` with `onlyMainContent: true`
- **Integration:** Make.com scenario — trigger on form submission → Firecrawl scrape → append to CRM record
- **Value:** You walk into every discovery call knowing the prospect's business, services, and pain points

#### Competitor Monitoring Service (Retainer Add-On)
- **Use case:** Monthly crawl of client's top 5 competitors' websites → structured report on pricing changes, new services, marketing moves
- **Endpoint:** `/v2/crawl` with `limit: 50` per competitor, scheduled monthly
- **Output:** Monthly competitive intelligence report
- **Value:** Sell as a retainer add-on (P1,500-3,000/month per client)

#### Google Business Profile Audit
- **Use case:** Scrape client's GBP listing + top 10 local competitors' GBP listings → extract review count, service categories, photos, posts
- **Endpoint:** `/v2/scrape` with structured extraction schema
- **Value:** Data-driven GBP optimisation as part of SEO service (P500 audit)

---

### 4. SEO, GEO & Google Business

#### Full Site SEO Audit (Sellable Service)
- **Use case:** Crawl entire client site → extract all meta titles, descriptions, headings, internal links, page structure → identify SEO gaps
- **Endpoint:** `/v2/crawl` with `limit: 500` + `scrapeOptions: { formats: ["markdown", "html"] }`
- **Output:** Structured dataset of every page's SEO elements, cross-referenced with target keywords
- **Value:** Sell as "Technical SEO Audit" (P3,500-7,500 depending on site size). This is the foundation of your Full Foundation SEO package

#### Content Gap Analysis
- **Use case:** Scrape client's site + 3 competitor sites → compare topic coverage → identify missing content opportunities
- **Endpoint:** `/v2/crawl` for each site, then analyse with AI
- **Value:** Concrete content recommendations backed by competitive data, not guesses

#### SERP Analysis Automation
- **Use case:** For each target keyword, scrape the top 10 Google results → extract content patterns, word counts, heading structures, schema markup
- **Endpoint:** `/v2/scrape` for each result URL (from Ahrefs or manual search)
- **Output:** "What ranks" report showing exactly what Google rewards for each keyword
- **Value:** Part of your ongoing SEO retainer — gives clients data-driven content direction

#### Backlink Source Discovery
- **Use case:** Use Ahrefs to find competitor backlinks → scrape those source sites → identify link-building opportunities
- **Endpoint:** `/v2/scrape` to assess page quality and relevance before outreach
- **Value:** Quality-filtered link-building targets, not spray-and-pray

---

### 5. Advisory & Consulting

#### Market Research Reports
- **Use case:** Client considering a new market? Scrape industry association sites, regulatory bodies, competitor pricing pages → compile into briefing document
- **Endpoint:** `/v2/crawl` across multiple domains
- **Value:** Data-backed advisory, not opinion. Justifies premium pricing

#### Technology Stack Benchmarking
- **Use case:** Client wants to modernise? Scrape technology vendors' sites to compare features, pricing, documentation quality
- **Endpoint:** `/v2/scrape` for product pages, `/v2/crawl` for documentation sites
- **Value:** Concrete vendor comparison data for architecture decisions

---

### 6. Boilerplate Products

#### Documentation Generation
- **Use case:** Build a scraper that crawls your own boilerplate product's documentation site → generates a searchable knowledge base for buyers
- **Endpoint:** `/v2/crawl` with `limit: 200`
- **Value:** Include "AI-powered documentation search" as a boilerplate feature — differentiator vs. other starter kits

#### Starter Site Content Population
- **Use case:** Use Firecrawl to generate starter content for your boilerplate products — scrape public domain content, government data sites, or open datasets to populate demo content
- **Endpoint:** `/v2/scrape` for structured data sources
- **Value:** Boilerplate products ship with realistic demo content, not lorem ipsum

---

## Quick-Win Implementations (Do These First)

### Priority 1: Competitor Research Automation (1-2 hours to build)
```typescript
// Run this locally before any client proposal
import FirecrawlApp from '@mendable/firecrawl-js'

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

// Scrape competitor site for analysis
const result = await app.scrapeUrl('https://competitor.co.bw', {
  formats: ['markdown'],
  onlyMainContent: true
})

// Save to file for review
import fs from 'fs'
fs.writeFileSync(`competitor-analysis/${Date.now()}.md`, result.markdown)
```

### Priority 2: SEO Audit Tool (Half-day build)
Build a simple CLI or web form that takes a client's URL, crawls their entire site, extracts SEO metadata from every page, and generates a report. Sell this as a standalone service at P3,500.

### Priority 3: Lead Enrichment via Make.com (2 hours)
Add a Firecrawl step to your existing Make.com contact form workflow. When a lead submits the form with their company URL, scrape their site and append a summary to the CRM row.

---

## Credit Budget Planning

**Free tier: 500 credits/month**

Estimated credit consumption per use:
- Single page scrape (`/v2/scrape`): ~1 credit
- Full site crawl (`/v2/crawl`, 50 pages): ~50 credits
- URL mapping (`/v2/map`): ~5 credits
- Structured extraction (`/v2/extract`): ~2 credits per URL

**Monthly budget allocation:**
- Competitor research (4 clients × 5 sites): ~20 credits
- SEO audits (2 clients × 200 pages): ~400 credits
- Lead enrichment (unlimited, triggered): ~50 credits
- **Remaining buffer:** ~30 credits

**If you exceed 500 credits:** Firecrawl's paid plans start at $16/month for 1,000 credits. Factor this into your service pricing.

---

## Risks & Considerations

1. **Legal:** Ensure compliance with target sites' Terms of Service and robots.txt. Firecrawl respects robots.txt by default.
2. **Client trust:** When scraping competitor sites for analysis, keep outputs internal — don't share raw scraped content with the client (potential copyright issues).
3. **Rate limiting:** Don't run multiple large crawls simultaneously. Space them out to avoid hitting rate limits.
4. **Data freshness:** Cached/stale data is a risk. Always note the scrape date in any deliverable.
5. **Cost tracking:** Monitor credit usage in the Firecrawl dashboard. Set up alerts at 80% utilisation.

---

## Summary: Revenue Potential

| Use Case | Sell Price | Frequency | Monthly Revenue |
|----------|-----------|-----------|----------------|
| Technical SEO Audit | P3,500-7,500 | 2/month | P7,000-15,000 |
| Competitive Intelligence Report | P1,500-3,000 | 4/month | P6,000-12,000 |
| Lead Enrichment (internal) | Included in proposals | — | Higher close rate |
| Content Gap Analysis | P2,500-5,000 | 2/month | P5,000-10,000 |
| **Total potential** | | | **P18,000-37,000** |

These are add-on services layered on top of your existing offerings. The Firecrawl API cost is negligible (free tier covers most use cases, $16/month if you scale).

---

**End of Firecrawl Integration Strategy**
