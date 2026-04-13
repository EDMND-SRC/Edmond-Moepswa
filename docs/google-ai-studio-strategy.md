# Google AI Studio Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Google AI Studio (aistudio.google.com)
**Free Tier:** No credit card required. Rate-limited access to multiple Gemini models.

---

## Overview

Google AI Studio is the developer-facing portal for Google's generative AI models. For Edmond's practice, it provides free, no-credit-card access to the entire Gemini model family — text, code, and image generation — through both a conversational interface and a REST API. The rate limits vary significantly by model, making it critical to understand which model to use for which task.

**Key distinction:** Google AI Studio provides two access modes:
1. **Web interface** — Conversational, multimodal (text + image input/output), no API key needed
2. **API access** — Generate an API key, make programmatic calls with rate limits per model

---

## Free Tier Limits by Model (2026)

### Text/Code Models

| Model | RPM (free) | RPD (free) | TPM (free) | Best For |
|-------|-----------|-----------|-----------|----------|
| **Gemini 3.1 Flash-Lite** | 15 | 1,000 | 250,000 | High-volume coding, batch processing, quick reasoning |
| **Gemini 2.5 Flash** | 5–10 | 20–250 | 250,000 | Fast text generation, summarisation |
| **Gemini 2.5 Pro** | 5 | 100 | 250,000 | Complex reasoning, structured analysis, code architecture |
| **Gemini 3 Pro** | 10–50 | 250 | 1,000,000 | Most capable reasoning model — planning, deep analysis |

**Important:** Gemini 3.1 Pro is available free in the AI Studio **web interface only** (250 RPD) — no free API tier.

### Image Generation Models

| Model | Free Access | Daily Limit | Max Resolution | Notes |
|-------|------------|-------------|----------------|-------|
| **Nano Banana (Flash Image / 3.1 Flash Image)** | ✅ Web + API | ~100/day (web), ~500 RPD (API) | 1K | Most generous free image tier. Fast generation. |
| **Nano Banana 2 (Gemini 3.1 Flash Image)** | ✅ Web + API | ~20/day (web) | 1K | Improved quality over original Flash. |
| **Nano Banana Pro (Gemini 3 Pro Image)** | ✅ Web only | 2/day (web) | 4K | Studio quality. **No free API tier.** |

### Important Notes on Rate Limits
- All free-tier models share the same 250,000 TPM ceiling
- RPM and RPD vary dramatically — Flash-Lite has the most generous limits (15 RPM, 1,000 RPD), while 2.5 Flash has been reduced to as low as 20 RPD
- After December 2025, Google significantly reduced free-tier quotas for some models (2.5 Flash cut by 80%+)
- Rate limits are dynamic and may change without notice — check AI Studio dashboard for current limits
- No billing setup required — free tier is truly free with just a Google account

---

## By Use Case

### 1. Brand Development (Using Masterguide Research)

#### Brand Name Generation
- **Model:** Gemini 3 Pro (web interface) for quality, Gemini 3.1 Flash-Lite (API) for volume
- **Workflow:** Input brand brief from research notes → prompt for 50 name options across naming styles (descriptive, abstract, compound, coined) → filter → check domain availability via Atom
- **Prompt pattern (from Masterguide Framework 1):**
  ```
  Generate 30 brand name options for a [industry] business
  targeting [audience] in [market]. The brand should convey
  [values: trust, innovation, accessibility]. Provide names in
  these categories: descriptive (5), abstract (5), compound (5),
  coined (5), acronym-based (5), metaphor-based (5). For each,
  provide a one-sentence rationale.
  ```

#### Brand Identity System Generation
- **Model:** Nano Banana Pro (web) for image quality, up to 2/day
- **Use:** Generate brand identity mockups — logo concepts, colour palettes, typography pairings — using the prompting frameworks from the Masterguide
- **Masterguide Framework 1 applied:**
  ```
  Create a professional brand identity mockup for a premium
  [business type] called "[name]". Show a [logo style] with
  [colour palette], [typography style], on [background].
  [Style: clean product photography, studio lighting,
  3/4 angle perspective, sharp focus throughout].
  ```

#### Brand Guidelines Document Generation
- **Model:** Gemini 3 Pro (web) for reasoning + Nano Banana Pro for visual assets
- **Workflow:** Feed brand identity research notes → Gemini generates structured brand guidelines document → Nano Banana Pro generates visual examples
- **Value:** First draft of brand guidelines in 30 minutes instead of 4 hours

---

### 2. Web Design & Development

#### Component Code Generation
- **Model:** Gemini 3.1 Flash-Lite (API) — most generous limits (1,000 RPD, 15 RPM)
- **Use case:** Generate React components, Tailwind CSS layouts, API route handlers
- **Why Flash-Lite:** "3.1 Flash Lite can output decent-quality web apps from a single prompt" — community research
- **Prompt pattern:**
  ```typescript
  Create a Next.js server component for a responsive pricing card
  with three tiers. Use Tailwind CSS. The middle tier should be
  highlighted as "recommended". Include TypeScript types.
  ```

#### Full Page Prototyping
- **Model:** Gemini 3 Pro (web) for reasoning quality
- **Use case:** Describe a full page layout → Gemini generates the complete component tree with Tailwind classes
- **Value:** Starting point for page development — structural code generated in seconds, refined manually

#### Image Asset Generation for Websites
- **Model:** Nano Banana (Flash Image) via API — 500 RPD free
- **Use case:** Hero images, background textures, placeholder imagery, icon concepts
- **Advantage:** 500 requests/day via API means you can generate and iterate extensively without hitting limits
- **Prompt (Masterguide Framework 1):**
  ```
  Generate a professional hero image for a Botswana-based
  construction company website. Modern office building under
  construction, golden hour lighting, warm tones, dramatic sky.
  Wide 16:9 aspect ratio, architectural photography aesthetic,
  shot on 24mm lens, deep focus.
  ```

---

### 3. Content Creation & Marketing

#### Blog Post and Article Drafting
- **Model:** Gemini 3.1 Flash-Lite (API) — unlimited volume at 1,000 RPD
- **Use case:** First drafts of blog posts, technical articles, SEO content
- **Workflow:** Outline → Flash-Lite generates draft → manual refinement

#### Social Media Content Generation
- **Model:** Gemini 3 Pro (web) for strategy, Nano Banana for visuals
- **Use case:** Generate a month's worth of social media copy + accompanying images
- **Image prompt (Masterguide Framework 5 for infographics):**
  ```
  Create a clean infographic showing "5 Workflow Automations
  Every Botswana SME Needs". Vertical layout, white background,
  numbered sections with icons, bold headers, clean typography.
  Brand colours: navy blue and gold accent.
  ```

#### Email Newsletter Content
- **Model:** Gemini 3.1 Flash-Lite (API) for volume
- **Use case:** Generate Beehiiv newsletter drafts, subject lines, preview text

---

### 4. Advisory & Consulting

#### Live Research During Sessions
- **Model:** Gemini 3 Pro (web) — most capable reasoning
- **Use case:** Client asks about a technology or market → Gemini researches live during the session → synthesised answer with citations
- **Value:** Real-time research capability during advisory sessions — no need to "get back to you"

#### Competitive Analysis
- **Model:** Gemini 3 Pro (web) for analysis, Nano Banana for visual comparison
- **Use case:** Input competitor websites → Gemini analyses positioning, pricing, messaging → generates comparison matrix

---

### 5. Workflow Automation

#### API-Powered Automation Backend
- **Model:** Gemini 3.1 Flash-Lite (API) — 1,000 RPD, 15 RPM, 250K TPM
- **Use case:** Make.com scenario → Google AI Studio API call → AI classifies, summarises, or generates content → result returned to workflow
- **Advantage over Make.com's built-in AI:** Direct API access at Google's free tier means no platform markup, no credit consumption beyond the free tier
- **Cost:** $0 within free tier limits

#### Document Processing Pipeline
- **Model:** Gemini 3 Pro (web or API at 250 RPD)
- **Use case:** Upload a document → Gemini extracts key information, summarises, classifies → stores in database
- **Value:** AI-powered document understanding without building custom ML models

---

## Quick-Win Implementations

### Priority 1: API Key Setup (10 min)
1. Go to aistudio.google.com
2. Sign in with Google account
3. Click "Get API Key" → create new key
4. Store in `.env.local`:
   ```
   GOOGLE_AI_STUDIO_API_KEY=your_key_here
   ```

### Priority 2: Model Selection Guide (15 min)
Save this as a reference for every task:

| Task | Model | Access Method | Why |
|------|-------|--------------|-----|
| Code generation (volume) | 3.1 Flash-Lite | API | 1,000 RPD, 15 RPM |
| Code generation (quality) | Gemini 3 Pro | Web | Best reasoning |
| Image generation (volume) | Nano Banana (Flash) | API | 500 RPD |
| Image generation (quality) | Nano Banana Pro | Web | 4K, studio quality |
| Text/content (volume) | 3.1 Flash-Lite | API | 1,000 RPD |
| Text/analysis (quality) | Gemini 3 Pro | Web | Best reasoning |
| Structured analysis | Gemini 2.5 Pro | Web/API | 100 RPD, good for reports |

### Priority 3: Make.com Integration (30 min)
```
Make.com HTTP Module → POST to:
https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=YOUR_API_KEY

Body:
{
  "contents": [{
    "parts": [{"text": "Your prompt here"}]
  }]
}
```

---

## Model Selection Strategy

### The Two-Tier Approach

**Tier 1 — Volume (Flash-Lite):** Use for everything that needs high throughput — code generation, text drafting, classification, summarisation. The 1,000 RPD limit means you can make a request every 86 seconds, 24 hours a day, and never hit the ceiling.

**Tier 2 — Quality (Gemini 3 Pro / Nano Banana Pro):** Use for anything that needs the best possible output — strategic analysis, brand identity generation, image assets, complex reasoning. Accept the lower rate limits (250 RPD for 3 Pro, 2/day for Nano Banana Pro) because quality matters more than volume here.

### When to Use AI Studio vs. Alternatives

| Need | Tool | Reason |
|------|------|--------|
| IDE-integrated coding | Antigravity, Trae, Cursor | Built into workflow |
| Full app prototyping | Bolt.new, Lovable, Replit | Generates entire apps |
| Conversational research | Gemini app (gemini.google.com) | Simpler interface |
| API-powered automation | Google AI Studio | Programmatic access |
| Highest-quality images | Nano Banana Pro (web) | 4K, studio quality |
| High-volume image generation | Nano Banana via AI Studio API | 500 RPD |

---

## Risks & Considerations

1. **Rate limits change without notice:** Google has already cut free-tier quotas by 80%+ for some models (2.5 Flash). Don't build critical infrastructure that depends on specific free-tier limits — have fallback models
2. **No free API tier for Nano Banana Pro:** The highest-quality image generation model is only available via the web interface (2/day free). For programmatic high-quality image generation, you need a paid Google Cloud account
3. **Data privacy:** Free-tier API calls may be used to improve Google's models. For client-confidential code or data, use a paid tier with data retention controls
4. **Regional availability:** Free-tier API access may not be available in all regions. Botswana access should be confirmed at setup
5. **Quota vs. rate limit confusion:** RPD (requests per day) and RPM (requests per minute) are both enforced. A model with 1,000 RPD but 15 RPM means you can't burst 100 requests in one minute even if you have daily quota remaining

---

## Summary: Value to Practice

| Use Case | Internal Cost | Output Value |
|----------|--------------|-------------|
| Code generation (Flash-Lite) | $0, ~500 requests/day usable | Saves 1–2 hours/day |
| Brand identity assets (Nano Banana Pro) | $0, 2/day | P3,500+ brand design value |
| Content drafting (Flash-Lite) | $0, unlimited volume | Saves 2–3 hours/week |
| Live research (3 Pro web) | $0 | Enhances advisory sessions |
| API automation (Flash-Lite) | $0, 1,000 RPD | Replaces paid AI API calls |

**Key insight:** Google AI Studio's free tier is the most versatile AI access point available — text, code, and image generation across multiple quality tiers, all without a credit card. The critical skill is matching the right model to the right task: Flash-Lite for volume (code, text, classification), Gemini 3 Pro for quality (reasoning, strategy, analysis), and Nano Banana Pro for visual assets (brand identity, marketing imagery). The 1,000 RPD limit on Flash-Lite alone provides enough daily capacity for most development and content workflows. Use it as the AI infrastructure layer that powers everything from code generation to brand development to workflow automation.

---

**End of Google AI Studio Integration Strategy**
