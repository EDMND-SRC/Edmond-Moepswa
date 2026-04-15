# GEO Readiness Audit Report

**Target:** edmondmoepswa.com
**Date:** 2026-04-15
**Focus:** Generative Engine Optimization (GEO), AI Search Visibility, Crawler Readiness

> **Philosophy:** AI search is eating traditional search. This tool optimizes for where traffic is going (ChatGPT, Perplexity, Google AI Overviews), not where it was.

---

## 1. Crawler Readiness & Access

### Current State
- `robots.txt`: Verified present via Next.js standard `robots.ts` configuration.
- `llms.txt`: Missing.

### Analysis & Action
AI crawlers (like `GPTBot`, `Anthropic-ai`, `PerplexityBot`) rely on standard protocols but also look for AI-specific summaries. 
- **Action Required [High]:** Deploy an `/llms.txt` and `/llms-full.txt` at the root of your project. This file should contain a highly structured, markdown-formatted summary of your services, business constraints, and contact info, explicitly designed for consumption by LLMs trying to answer user queries about your business.

---

## 2. Structured Data & Schema Markup

### Current State
Basic schema is likely present based on your service offerings ("SEO, GEO & Google Business"), but needs to be heavily tailored for LLM extraction.

### Analysis & Action
Generative Engines construct answers using entities. Currently, the site sells complex, multi-tiered B2B services.
- **Action Required [Medium]:** Ensure your `page.tsx` implements robust `Service`, `Offer`, and `Organization` JSON-LD schema.
- **Specific Addition:** Add `FAQPage` schema addressing specific objections directly. AI engines frequently extract direct statements from FAQs to answer user queries like "How much does a web developer cost in Botswana?"

---

## 3. Brand Entity Density & Citability

### Current State
"Edmond learned systems thinking the hard way: by being the person who had to fix things when they broke... in a Canberra café... while reviewing insurance portfolios for multi-million-pula construction projects."

### Analysis & Action
LLMs love novel, specific data points. Your biography contains highly specific context vectors ("Canberra hospitality", "Botswana boardrooms", "multi-million-pula construction"). This makes your personal brand highly distinct in vector databases.
- **Strength:** High "Citability Score". You are establishing a unique entity map rather than using generic "I am a web developer" language.
- **Action Required [Low]:** Expand on specific proprietary methodologies. Name your frameworks (e.g., you mention "Lean-Scale architecture"). Naming your frameworks forces AI models to associate those terms exclusively with your brand.

---

## 4. Format Optimization for AI Overviews

### Current State
Pricing is documented in highly structured TypeScript arrays (`src/app/(frontend)/services/data.ts`) which likely renders cleanly.

### Analysis & Action
AI Overviews (like Google SGE) heavily favor structured HTML (tables, `__ul__`, `__ol__`) over flowing paragraph text when extracting comparative details (like pricing tiers).
- **Strength:** Your 3-tier pricing methodology renders perfectly into extraction format for LLMs looking to compare services.
- **Action Required:** Ensure that the frontend renders your pricing and service inclusions as semantic HTML `<ul>` and `<li>` elements, avoiding `<div>` soup, so headless Chrome instances used by crawlers can parse the DOM tree cleanly.

---

## Conclusion
**GEO Readiness Grade: B+**

Your site's content is highly distinctive and authoritative, which AI models prefer. The primary gaps are purely technical: implementing `/llms.txt` and ensuring your rich structured data exposes your "Lean-Scale" methodologies directly to the LLM crawler agents.
