---
name: bridgearc-geo-seo
description: |
  Unified GEO/SEO strategy suite. AI search visibility, citability score, llms.txt, AI crawler access, brand mentions, platform readiness. Plus traditional SEO: on-page SEO, keyword intent mapping, local SEO citations, and backlink network strategies. Generates a unified GEO/SEO PDF report. 
---

# BridgeArc GEO/SEO Unified Suite — Antigravity Skill

> **Philosophy:** GEO-first, SEO-supported. AI search is eating traditional search, but traditional search engines still drive the majority of base traffic. This unified suite optimizes for both paradigms simultaneously.

---

## Quick Reference

| Command | What It Does |
|---------|-------------|
| "geo-seo-audit <url>" | commands/Full GEO + SEO audit with parallel subagents .md |
| "geo-seo-report-pdf <url>" | commands/Generate unified PDF report with charts and dual scores .md |
| "seo-onpage <url>" | commands/Title tags, meta descriptions, headings, keyword density .md |
| "seo-keywords <url>" | commands/Keyword intent clustering and mapping strategy .md |
| "seo-backlinks <url>" | commands/Simulated backlink profile and off-page SEO strategy .md |
| "seo-local <url>" | commands/NAP consistency and Google Business Profile optimization .md |
| "geo-citability <url>" | commands/Score content for AI citation readiness .md |
| "geo-crawlers <url>" | commands/Check AI crawler access (robots.txt analysis) .md |
| "geo-llmstxt <url>" | commands/Analyze or generate llms.txt file .md |
| "geo-brands <url>" | commands/Scan brand mentions across AI-cited platforms .md |
| "geo-platforms <url>" | commands/Platform-specific optimization (ChatGPT, Perplexity, Google AIO) .md |
| "geo-schema <url>" | commands/Detect, validate, and generate structured data .md |
| "geo-technical <url>" | commands/Technical SEO audit targeting AI SSR requirements .md |
| "geo-content <url>" | commands/Content quality and E-E-A-T assessment .md |

---

## Orchestration Logic

### Unified Audit (`/geo-seo-audit <url>`)

**Phase 1: Discovery (Sequential)**
1. Fetch homepage HTML (curl or WebFetch)
2. Detect business type (SaaS, Local, E-commerce, Publisher, Agency, Other)
3. Extract key pages from sitemap.xml or internal links (up to 50 pages)

**Phase 2: Parallel Analysis (Delegate to Subagents)**
Launch these 6 subagents simultaneously:

| Subagent | Responsibility |
|----------|---------------|
| geo-ai-visibility | GEO audit, citability, AI crawlers, llms.txt, brand mentions |
| geo-platform-analysis | Platform-specific optimization (ChatGPT, Perplexity, Google AIO) |
| geo-technical | Technical SEO, Core Web Vitals, SSR, crawlability |
| geo-content | Content quality, E-E-A-T, readability, AI content detection |
| geo-schema | Schema markup detection, validation, generation |
| seo-strategist | On-page SEO, local citations, keyword clustering, backlinks |

**Phase 3: Synthesis (Sequential)**
1. Collect all subagent reports
2. Calculate dual scores: **GEO Visibility Score (0-100)** and **SEO Health Score (0-100)**
3. Generate prioritized action plan
4. Output client-ready report

---

## Subagents (6 Parallel Workers)

| Agent | File | Skills Used |
|-------|------|-------------|
| geo-ai-visibility | `agents/geo-ai-visibility.md` | geo-citability, geo-crawlers, geo-llmstxt, geo-brand-mentions |
| geo-platform-analysis | `agents/geo-platform-analysis.md` | geo-platforms |
| geo-technical | `agents/geo-technical.md` | geo-technical |
| geo-content | `agents/geo-content.md` | geo-content |
| geo-schema | `agents/geo-schema.md` | geo-schema |
| seo-strategist | `agents/seo-strategist.md` | seo-onpage, seo-keywords, seo-backlinks, seo-local |

---

## Output Files

| Command | Output File |
|---------|------------|
| "geo-seo-audit" | `GEO-SEO-AUDIT-REPORT.md` |
| "geo-seo-report-pdf" | `GEO-SEO-REPORT.pdf` (professional PDF with charts) |
| "seo-onpage" | `SEO-ONPAGE-REPORT.md` |
| "seo-keywords" | `SEO-KEYWORDS-REPORT.md` |
| "seo-backlinks" | `SEO-BACKLINKS-REPORT.md` |
| "seo-local" | `SEO-LOCAL-REPORT.md` |

---

## PDF Report Generation

The `/geo-seo-report-pdf <url>` command generates a professional, branded PDF report:

### How It Works
1. Run the full unified audit first
2. Collect all scores and findings into a JSON structure
3. Execute the PDF generator: `python3 ~/.Antigravity/commands/geo-seo-audit.md/scripts/generate_pdf_report.py data.json GEO-SEO-REPORT.pdf`

### What the PDF Includes
- **Cover page** with dual score gauges (GEO Visibility & SEO Health)
- **Score breakdown** with color-coded bar charts
- **AI Platform Readiness** dashboard
- **Crawler Access** status table
- **Prioritized Action Plan** (Quick Wins, Medium-Term, Strategic)


> [!IMPORTANT]
> **Global Export & Directory Routing Rule:**  
> When performing analysis or generating final reports (both `.md` and `.pdf`), **DO NOT** save them as internal System/Gemini "artifacts". You must construct a context-appropriate export directory within the user's workspace (e.g., `clients/[project_or_domain_name]/[report_files]`) and save all deliverables directly into that folder using absolute paths. 
