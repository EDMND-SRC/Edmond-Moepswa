# Google AI Tools (Nano Banana / Flow) Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026 | **Updated:** 6 April 2026 (rate limits revised)
**Platforms:** Google Nano Banana (Gemini 2.5/3.1 Flash Image), Nano Banana Pro (Gemini 3 Pro Image), Google Flow (unified AI creative workspace)
**Free Tier:** Google AI Studio free tier — model-specific limits, no credit card required

**Related docs:** `google-ai-studio-strategy.md` (API access, rate limits by model), `ai-image-video-generation-strategy.md` (all free image/video platforms compared)

---

## Overview

Google's AI image generation and creative tools form a powerful brand development and content production pipeline. The Nano Banana model family (Gemini 2.5/3.1 Flash Image and Gemini 3 Pro Image) provides studio-quality image generation, while Google Flow merges image generation, video production, and audio synthesis into a single creative workspace.

For Edmond's service offerings, these tools serve as:

1. **Brand image generation** — Logos, brand assets, social media graphics, and website imagery generated from text prompts
2. **Web design assets** — Hero images, background textures, product mockups, and placeholder imagery for client builds
3. **Video content production** — Google Flow's Veo 3.1 generates cinematic video with native audio (dialogue, ambient sound, sound effects) from text prompts and reference images
4. **Rapid prototyping** — Generate visual concepts during client advisory sessions — show, don't just describe

---

## Model Capabilities & Free Tier Limits (2026 — Updated)

### Nano Banana (Gemini 2.5 Flash Image / 3.1 Flash Image)
- **Role:** Fast, iterative image generation and editing
- **Free tier (web):** ~100 images/day via Gemini app
- **Free tier (API):** ~500 RPD via Google AI Studio — the most generous free image API available
- **Max resolution:** 1K
- **Speed:** Near-instant generation — suitable for real-time ideation
- **Best for:** Volume generation — website hero images, social media content, placeholder imagery

### Nano Banana Pro (Gemini 3 Pro Image)
- **Role:** Studio-quality output up to 4K with advanced reasoning and precise creative controls
- **Free tier (web):** 2 images/day via Gemini app (reduced from 3 in November 2025 due to high demand)
- **Free tier (API):** ❌ No free API tier for Nano Banana Pro
- **Max resolution:** 4K
- **Features:** Industry-leading text rendering, physics-accururate scene generation, character consistency
- **Best for:** Final brand assets, hero images, print-quality graphics, infographics with text

### Nano Banana 2 (Gemini 3.1 Flash Image)
- **Role:** Latest model combining Pro-level quality with Flash-level speed
- **Free tier (web):** ~20 images/day, capped at 1K resolution
- **Best for:** Default image generation model — the go-to for most production work
- **Availability:** Default in Google Flow, Google AI Studio, and Vertex AI

### Important Rate Limit Changes (Late 2025 – Early 2026)
- Nano Banana Pro free tier reduced from 3 to 2 images/day
- Gemini 2.5 Flash API RPD cut by 80%+ (from ~100 to ~20 RPD)
- Gemini 3.1 Flash-Lite now has the most generous free API limits: 15 RPM, 1,000 RPD, 250K TPM
- Gemini 3 Pro has no free API tier — available only in AI Studio web interface (250 RPD)
- **Always check AI Studio dashboard for current limits** — they change frequently

### Google Flow
- **Role:** Unified AI creative workspace — from initial concept image through to animated, audio-synced video
- **Video engine:** Veo 3.1 generates cinematic video with native audio — dialogue, ambient sound, and sound effects from text prompts and reference images
- **Best for:** Brand video production, social media content, client marketing videos

---

## By Service Category

### 1. Web Design & Development

#### Hero Image and Visual Asset Generation
- **Use case:** Client's new website needs a hero image — instead of sourcing stock photos or commissioning a photographer, generate custom imagery that matches the brand
- **Process:** Brand brief → Nano Banana Pro prompt → generate 10–20 variations → refine top 3 → deliver 4K hero image + responsive crops
- **Value:** Custom imagery at a fraction of photography cost. No licensing concerns — AI-generated images are not subject to copyright claims
- **Example prompt:** "A modern Botswana-based artisan woodworking a handcrafted furniture piece in a sunlit workshop, warm golden hour light, shallow depth of field, professional photography style, earthy colour palette — 4K"

#### Placeholder Imagery During Development
- **Use case:** Client site is being built before their actual photography is ready. Instead of grey boxes or generic stock photos, generate contextually relevant placeholder imagery
- **Value:** Client reviews the site with realistic visuals — not lorem ipsum images. This produces more meaningful feedback during the design review phase

#### Scroll Animations and Micro-Interaction Visuals
- **Use case:** Custom SVG icons, decorative elements, and animated visual components generated as starting points
- **Process:** Generate base imagery → refine in vector editor → animate with Framer Motion
- **Value:** Starting point for custom design work — faster than designing from scratch

---

### 2. Brand Development (Add-On Service)

#### Brand Design System (+P3,500)
- **Use case:** Client needs a complete visual identity — colour palette, typography, logo, brand imagery style
- **Process:** Brand brief → Nano Banana Pro generates logo concepts (20+ variations) → refine top 3 → generate supporting imagery (patterns, textures, social media templates) → deliver brand guidelines document
- **Value:** Professional brand identity at P3,500 — far below traditional brand agency pricing (P15,000–50,000)
- **Deliverables:** Logo variations, colour palette with hex codes, typography recommendations, imagery style guide, social media template examples

#### Social Media Content Generation
- **Use case:** Client needs a month's worth of social media graphics — promotional posts, educational content, brand awareness posts
- **Process:** Content calendar → Nano Banana 2 generates each image → size optimised for platform (Instagram 1080×1080, Twitter 1200×675, LinkedIn 1200×627)
- **Value:** 20–30 branded images generated in a single session. Consistent style and quality across all platforms

---

### 3. Web Applications

#### Video Content for Marketing Pages
- **Use case:** Boilerplate build client wants a video on their homepage — "See our work in action" or "Meet the team"
- **Google Flow approach:** Text prompt + reference images → Veo 3.1 generates 30–60 second video with native audio (background music, ambient sound, optional dialogue)
- **Value:** Professional marketing video without a production crew. Generated in minutes, not weeks
- **Example prompt:** "Aerial drone shot of a modern Gaborone office building at sunrise, smooth camera pan, soft orchestral music, people arriving for work, professional cinematic colour grading — 60 seconds"

#### Product and Service Visualisation
- **Use case:** E-commerce store needs product photography — generate lifestyle images showing products in use
- **Process:** Product photo + context prompt → Google Flow generates lifestyle scenario → "This artisan's handcrafted leather bag being used by a professional in a modern office setting"
- **Value:** Lifestyle product photography without hiring models, locations, or a photography team

---

### 4. Advisory & Consulting

#### Real-Time Visual Ideation During Sessions
- **Use case:** During a Half-Day Working Session, client describes their vision → Edmond generates visual concepts live → client sees their ideas materialise
- **Value:** Dramatically improves communication. "Show me what you mean" becomes instant instead of "I'll send you mockups next week"

#### Marketing Strategy Visualisation
- **Use case:** Advisory client wants to understand their competitive positioning → generate visual comparison of their brand vs. competitors → identify visual differentiation opportunities
- **Value:** Visual strategy sessions are more productive than spreadsheet-based competitive analysis

---

## Quick-Win Implementations

### Priority 1: Google AI Studio Setup (15 min)
1. Access Google AI Studio at aistudio.google.com
2. Sign in with Google account
3. Select Nano Banana 2 (Gemini 3.1 Flash Image) as the default model
4. Set output resolution to match the use case (1024×1024 for social media, 4K for hero images)

### Priority 2: Prompt Template Library (2 hours)
Create reusable prompt templates for common use cases:

```
Brand Logo:
"Minimalist [industry] logo for [business name], [style: modern/traditional/playful], 
[colour palette], vector-style, transparent background, professional brand identity"

Hero Image:
"[Scene description] in [location/city], [lighting: golden hour/overcast/studio], 
[style: professional photography/illustration/minimalist], [mood: warm/energetic/serene], 
[composition: wide-angle/close-up/aerial], 4K resolution"

Social Media Post:
"Square social media graphic for [business type], [topic/message], 
[brand colours], clean typography, professional design, Instagram format 1080x1080"
```

### Priority 3: Google Flow Video Production (1 hour)
1. Access Google Flow at flow.google.com
2. Upload reference images (client's branding, location photos, product shots)
3. Write video prompt with scene description, camera movement, audio preferences
4. Generate → review → refine → export

---

## Resource Budget Planning

**Google AI Studio & Gemini App free tier (updated limits):**

| Resource | Free Tier Limit | Typical Usage | Notes |
|----------|----------------|---------------|-------|
| Nano Banana (web) | ~100 images/day | 50–200 images per session | Generous for most needs |
| Nano Banana (API) | ~500 RPD | 500+ images/day programmatically | Most generous free image API |
| Nano Banana Pro (web) | 2 images/day | 2 hero images/day | Reduced from 3/day |
| Nano Banana Pro (API) | ❌ Not available | N/A | Requires paid Google Cloud |
| Nano Banana 2 (web) | ~20 images/day | 20 images/day | Good quality, 1K max |
| Gemini 3.1 Flash-Lite (API) | 15 RPM, 1,000 RPD, 250K TPM | High-volume text/code | Most generous free API |
| Gemini 3 Pro (web only) | 250 RPD | Complex reasoning tasks | No free API tier |
| Google Flow usage | Free with Google account | 10–30 video generations per session | See Google Flow section |
| Image resolution | Up to 4K (Pro), 2K (Flash), 1K (Flash-Lite) | As needed | |
| Video length (Veo 3.1) | Up to 60 seconds per generation | 30–60 second marketing videos | |

**For comprehensive rate limits by model, see `google-ai-studio-strategy.md`.**
**For comparison with other free image/video platforms, see `ai-image-video-generation-strategy.md`.**

**Paid tier (Google AI Studio Pro):**
- Higher rate limits
- Priority access during peak usage
- Extended video generation length
- Cost: Pay-per-use pricing based on tokens/characters processed

**Cost per output:**
- Image generation: $0.002–0.01 per image (depending on resolution and model)
- Video generation: $0.05–0.30 per video (depending on length and resolution)
- A complete brand image set (50 images): ~$0.10–0.50
- A 60-second marketing video: ~$0.15–0.30

---

## Risks & Considerations

1. **AI-generated content disclosure:** Some clients and audiences have opinions about AI-generated imagery. Be transparent about the use of AI tools — frame it as a capability, not a shortcut
2. **Brand consistency:** AI image generation can produce inconsistent results. Generate multiple variations and curate carefully. Maintain a style guide for prompts to ensure consistency across outputs
3. **Legal considerations:** AI-generated images are generally not copyrightable in most jurisdictions. This means the client cannot claim exclusive copyright over AI-generated brand assets. For logos and trademarks, recommend traditional design work for elements that need legal protection
4. **Content filters:** Google's AI models have content filters that may block generation of certain imagery. Test prompts before committing to AI-generated assets for sensitive industries
5. **Quality variance:** Even with the same prompt, generation results can vary. Always generate 10–20 variations and select the best — don't rely on the first output
6. **Video audio limitations:** Veo 3.1 generates audio natively, but the audio quality and accuracy may not match professional production. Generated audio is suitable for social media and web use but not broadcast-quality

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Brand design system (+P3,500 add-on) | P3,500 | ~$0.10–0.50 in AI credits + 2–3 hours | ~99% |
| Hero image generation | Included in build | ~$0.01–0.05 per image | 100% |
| Social media content pack (20 images) | P2,500 | ~$0.20 in AI credits + 2 hours | ~99% |
| Marketing video (60 sec via Flow) | P3,000 | ~$0.30 in AI credits + 1–2 hours | ~99% |
| Real-time visual ideation (advisory) | Included in advisory session | ~$0.05/session | 100% |

**Key insight:** Google's AI creative tools (Nano Banana model family + Google Flow) dramatically reduce the cost and time of brand image and video production. A brand design system that traditionally costs P15,000–50,000 from an agency can be produced for P3,500 with AI-generated assets and human curation. A 60-second marketing video that requires a production crew, location, and editing team can be generated in minutes for under $0.30 in AI credits. The human value-add is prompt engineering, curation, and brand alignment — not the raw generation. These tools are not a replacement for human design judgment; they are a force multiplier that makes professional-quality visual output accessible to every client, regardless of budget.

---

**End of Google AI Tools Integration Strategy**
