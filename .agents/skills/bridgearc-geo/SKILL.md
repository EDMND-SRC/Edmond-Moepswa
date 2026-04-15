---
name: bridgearc-geo
description: |
  GEO audit, AI search visibility, citability score, AI crawler access, schema markup, llms.txt, brand mentions, platform readiness, AI overview optimization, GEO PDF report.
---

# GEO-SEO Analysis Tool — Antigravity Skill (February 2026)

> **Philosophy:** GEO-first, SEO-supported. AI search is eating traditional search.
> This tool optimizes for where traffic is going, not where it was.

---

## Quick Reference

| Command | What It Does |
|---------|-------------|
| "audit <url>" | commands/Full GEO + SEO audit with parallel subagents .md |
| "page <url>" | commands/Deep single-page GEO analysis .md |
| "citability <url>" | commands/Score content for AI citation readiness .md |
| "crawlers <url>" | commands/Check AI crawler access (robots.txt analysis) .md |
| "llmstxt <url>" | commands/Analyze or generate llms.txt file .md |
| "brands <url>" | commands/Scan brand mentions across AI-cited platforms .md |
| "platforms <url>" | commands/Platform-specific optimization (ChatGPT, Perplexity, Google AIO) .md |
| "schema <url>" | commands/Detect, validate, and generate structured data .md |
| "technical <url>" | commands/Traditional technical SEO audit .md |
| "content <url>" | commands/Content quality and E-E-A-T assessment .md |
| "report <url>" | commands/Generate client-ready GEO deliverable .md |
| "report-pdf <url>" | commands/Generate professional PDF report with charts and scores .md |
| "quick <url>" | commands/60-second GEO visibility snapshot .md |
| "prospect <cmd>" | commands/CRM-lite: manage prospects through the sales pipeline .md |
| "proposal <domain>" | commands/Auto-generate client proposal from audit data .md |
| "compare <domain>" | commands/Monthly delta report: show score improvements to client .md |

---

## Market Context (Why GEO Matters)

| Metric | Value | Source |
|--------|-------|--------|
| GEO services market (2025) | $850M-$886M | Yahoo Finance / Superlines |
| Projected GEO market (2031) | $7.3B (34% CAGR) | Industry analysts |
| AI-referred sessions growth | +527% (Jan-May 2025) | SparkToro |
| AI traffic conversion vs organic | 4.4x higher | Industry data |
| Google AI Overviews reach | 1.5B users/month, 200+ countries | Google |
| ChatGPT weekly active users | 900M+ | OpenAI |
| Perplexity monthly queries | 500M+ | Perplexity |
| Gartner: search traffic drop by 2028 | -50% | Gartner |
| Marketers investing in GEO | Only 23% | Industry surveys |
| Brand mentions vs backlinks for AI | 3x stronger correlation | Ahrefs (Dec 2025) |

---

## Orchestration Logic

### Full Audit (`/geo audit <url>`)

**Phase 1: Discovery (Sequential)**
1. Fetch homepage HTML (curl or WebFetch)
2. Detect business type (SaaS, Local, E-commerce, Publisher, Agency, Other)
3. Extract key pages from sitemap.xml or internal links (up to 50 pages)

**Phase 2: Parallel Analysis (Delegate to Subagents)**
Launch these 5 subagents simultaneously:

| Subagent | File | Responsibility |
|----------|------|---------------|
| geo-ai-visibility | `agents/geo-ai-visibility.md` | GEO audit, citability, AI crawlers, llms.txt, brand mentions |
| geo-platform-analysis | `agents/geo-platform-analysis.md` | Platform-specific optimization (ChatGPT, Perplexity, Google AIO) |
| geo-technical | `agents/geo-technical.md` | Technical SEO, Core Web Vitals, crawlability, indexability |
| geo-content | `agents/geo-content.md` | Content quality, E-E-A-T, readability, AI content detection |
| geo-schema | `agents/geo-schema.md` | Schema markup detection, validation, generation |

**Phase 3: Synthesis (Sequential)**
1. Collect all subagent reports
2. Calculate composite GEO Score (0-100)
3. Generate prioritized action plan
4. Output client-ready report

### Scoring Methodology

| Category | Weight | Measured By |
|----------|--------|-------------|
| AI Citability & Visibility | 25% | Passage scoring, answer block quality, AI crawler access |
| Brand Authority Signals | 20% | Mentions on Reddit, YouTube, Wikipedia, LinkedIn; entity presence |
| Content Quality & E-E-A-T | 20% | Expertise signals, original data, author credentials |
| Technical Foundations | 15% | SSR, Core Web Vitals, crawlability, mobile, security |
| Structured Data | 10% | Schema completeness, JSON-LD validation, rich result eligibility |
| Platform Optimization | 10% | Platform-specific readiness (Google AIO, ChatGPT, Perplexity) |

---

## Business Type Detection

Analyze homepage for patterns:

| Type | Signals |
|------|---------|
| **SaaS** | Pricing page, "Sign up", "Free trial", "/app", "/dashboard", API docs |
| **Local Service** | Phone number, address, "Near me", Google Maps embed, service area |
| **E-commerce** | Product pages, cart, "Add to cart", price elements, product schema |
| **Publisher** | Blog, articles, bylines, publication dates, article schema |
| **Agency** | Portfolio, case studies, "Our services", client logos, testimonials |
| **Other** | Default — apply general GEO best practices |

Adjust recommendations based on detected type. Local businesses need LocalBusiness schema and Google Business Profile optimization. SaaS needs SoftwareApplication schema and comparison page strategy. E-commerce needs Product schema and review aggregation.

---

## Sub-Skills (13 Specialized Components)

| # | Skill | Directory | Purpose |
|---|-------|-----------|---------|
| 1 | geo-audit | `commands/geo-audit.md/` | Full audit orchestration and scoring |
| 2 | geo-citability | `commands/geo-citability.md/` | Passage-level AI citation readiness |
| 3 | geo-crawlers | `commands/geo-crawlers.md/` | AI crawler access and robots.txt |
| 4 | geo-llmstxt | `commands/geo-llmstxt.md/` | llms.txt standard analysis and generation |
| 5 | geo-brand-mentions | `commands/geo-brand-mentions.md/` | Brand presence on AI-cited platforms |
| 6 | geo-platform-optimizer | `commands/geo-platform-optimizer.md/` | Platform-specific AI search optimization |
| 7 | geo-schema | `commands/geo-schema.md/` | Structured data for AI discoverability |
| 8 | geo-technical | `commands/geo-technical.md/` | Technical SEO foundations |
| 9 | geo-content | `commands/geo-content.md/` | Content quality and E-E-A-T |
| 10 | geo-report | `commands/geo-report.md/` | Client-ready deliverable generation |
| 11 | geo-prospect | `commands/geo-prospect.md/` | CRM-lite prospect and client pipeline management |
| 12 | geo-proposal | `commands/geo-proposal.md/` | Auto-generate client proposals from audit data |
| 13 | geo-compare | `commands/geo-compare.md/` | Monthly delta tracking and progress reports |

---

## Subagents (5 Parallel Workers)

| Agent | File | Skills Used |
|-------|------|-------------|
| geo-ai-visibility | `agents/geo-ai-visibility.md` | geo-citability, geo-crawlers, geo-llmstxt, geo-brand-mentions |
| geo-platform-analysis | `agents/geo-platform-analysis.md` | geo-platform-optimizer |
| geo-technical | `agents/geo-technical.md` | geo-technical |
| geo-content | `agents/geo-content.md` | geo-content |
| geo-schema | `agents/geo-schema.md` | geo-schema |

---

## Output Files

All commands generate structured output:

| Command | Output File |
|---------|------------|
| "audit" | `GEO-AUDIT-REPORT.md` |
| "page" | `GEO-PAGE-ANALYSIS.md` |
| "citability" | `GEO-CITABILITY-SCORE.md` |
| "crawlers" | `GEO-CRAWLER-ACCESS.md` |
| "llmstxt" | `llms.txt` (ready to deploy) |
| "brands" | `GEO-BRAND-MENTIONS.md` |
| "platforms" | `GEO-PLATFORM-OPTIMIZATION.md` |
| "schema" | `GEO-SCHEMA-REPORT.md` + generated JSON-LD |
| "technical" | `GEO-TECHNICAL-AUDIT.md` |
| "content" | `GEO-CONTENT-ANALYSIS.md` |
| "report" | `GEO-CLIENT-REPORT.md` (presentation-ready) |
| "report-pdf" | `GEO-REPORT.pdf` (professional PDF with charts) |
| "quick" | Inline summary (no file) |
| "prospect" | Updates `~/.geo-prospects/prospects.json` |
| "proposal" | `~/.geo-prospects/proposals/<domain>-proposal-<date>.md` |
| "compare" | `~/.geo-prospects/reports/<domain>-monthly-<YYYY-MM>.md` |

---

## PDF Report Generation

The `/geo report-pdf <url>` command generates a professional, branded PDF report:

### How It Works
1. Run the full audit or individual analyses first
2. Collect all scores and findings into a JSON structure
3. Execute the PDF generator: `python3 ~/.Antigravity/commands/geo.md/scripts/generate_pdf_report.py data.json GEO-REPORT.pdf`

### What the PDF Includes
- **Cover page** with GEO score gauge visualization
- **Score breakdown** with color-coded bar charts
- **AI Platform Readiness** dashboard with horizontal bar chart
- **Crawler Access** status table with color-coded Allow/Block
- **Key Findings** categorized by severity (Critical/High/Medium/Low)
- **Prioritized Action Plan** (Quick Wins, Medium-Term, Strategic)
- **Methodology & Glossary** appendix

### Workflow
1. First run `/geo audit <url>` to collect all data
2. Then run `/geo report-pdf <url>` to generate the PDF
3. The tool will compile audit data into JSON, then generate the PDF
4. Output: `GEO-REPORT.pdf` in the current directory

---

## Quality Gates

- **Crawl limit:** Max 50 pages per audit (focus on quality over quantity)
- **Timeout:** 30 seconds per page fetch
- **Rate limiting:** 1-second delay between requests, max 5 concurrent
- **Robots.txt:** Always respect, always check
- **Duplicate detection:** Skip pages with >80% content similarity

---

## Quick Start Examples

```
# Full GEO audit of a website
/geo audit https://example.com

# Check if AI bots can see your site
/geo crawlers https://example.com

# Score a specific page for AI citability
/geo citability https://example.com/blog/best-article

# Generate an llms.txt file for your site
/geo llmstxt https://example.com

# Get a 60-second visibility snapshot
/geo quick https://example.com

# Generate a client-ready report
/geo report https://example.com
```
