# Unified GEO/SEO Audit Orchestration Skill

## Purpose

This skill performs a comprehensive Generative Engine Optimization (GEO) and Traditional Search Engine Optimization (SEO) audit of any website. It measures how well a site performs across both AI citation metrics and standard search engine ranking factors, producing an actionable unified improvement plan.

## Key Insight

Traditional SEO optimizes for search engine rankings via keywords, backlinks, and technical health. GEO optimizes for AI citation and recommendation via citability, brand entity presence, and LLM-friendly structures. A modern marketing strategy requires excellence in both.

---

## Audit Workflow

### Phase 1: Discovery and Reconnaissance

**Step 1: Fetch Homepage and Detect Business Type**
1. Use WebFetch to retrieve the homepage at the provided URL.
2. Extract the following signals (title, meta, navigation, footer, schema, structural markers).
3. Classify the business type (SaaS, Local Business, E-commerce, Publisher, Agency/Services, Hybrid).

**Step 2: Crawl Sitemap and Internal Links**
1. Attempt to fetch `/sitemap.xml`.
2. Extract up to 50 unique page URLs prioritized by value.
3. Respect `robots.txt` directives.

**Step 3: Collect Page-Level Data**
For each page: URL, title, meta description, H1-H6 structure, word count, schema types, structured data presence.

---

### Phase 2: Parallel Subagent Delegation

Delegate analysis to 6 specialized subagents.

**Subagent 1: AI Visibility Analysis (geo-ai-visibility)**
- Analyze content blocks for quotability by AI systems 
- Check AI crawler access via robots.txt and llms.txt presence

**Subagent 2: Platform Optimization (geo-platform-analysis)**
- Assess readiness for Google AI Overviews, ChatGPT, Perplexity, Gemini, Bing Copilot

**Subagent 3: Technical GEO Infrastructure (geo-technical)**
- Analyze server-side rendering, page speed, technical accessibility for AI

**Subagent 4: Content E-E-A-T Quality (geo-content)**
- Evaluate Experience, Expertise, Authoritativeness, Trustworthiness signals

**Subagent 5: Schema & Structured Data (geo-schema)**
- Validate schema.org markup

**Subagent 6: Traditional SEO Strategy (seo-strategist)**
- Run `seo-onpage`, `seo-keywords`, `seo-backlinks`, `seo-local` checks.
- Produce traditional SEO metrics.

---

### Phase 3: Score Aggregation and Report Generation

#### Dual Score Calculation

Calculate two distinct composite scores:

1. **GEO Visibility Score (0-100)**: Reflects AI search readiness (Citability, Brand, E-E-A-T, Platform, Schema, Technical).
2. **SEO Health Score (0-100)**: Reflects traditional ranking readiness (On-page, Keywords, Backlinks, Local, Technical).

#### Score Interpretation
| Score Range | Rating | Interpretation |
|---|---|---|
| 90-100 | Excellent | Top-tier optimization |
| 75-89 | Good | Strong foundation with room for improvement |
| 60-74 | Fair | Moderate presence; significant optimization opportunities exist |
| 40-59 | Poor | Weak signals |
| 0-39 | Critical | Minimal optimization; practically invisible |

---

## Output Format

Generate a file called `GEO-SEO-AUDIT-REPORT.md` with the following structure:

```markdown
# Unified GEO/SEO Audit Report: [Site Name]

**Audit Date:** [Date]
**URL:** [URL]
**Business Type:** [Detected Type]

---

## Executive Summary

**Overall GEO Visibility Score: [X]/100**
**Overall SEO Health Score: [Y]/100**

[2-3 sentence summary of the site's dual health, biggest strengths, and most critical gaps.]

---

## Critical Issues (Fix Immediately)
[List each critical issue]

## High Priority Issues
[List each high-priority issue]

## Category Deep Dives

### GEO Metrics
- AI Citability
- Brand Authority
- Content E-E-A-T
- Technical GEO
- Schema & Structured Data
- Platform Optimization

### SEO Metrics
- On-Page HTML
- Keyword Strategy
- Backlink Profile
- Local Signals (if applicable)
```

---

## Quick Start
```
# Full unified audit
/geo-seo-audit https://example.com
```
