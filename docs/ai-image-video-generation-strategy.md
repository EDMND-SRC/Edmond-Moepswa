# AI Image & Video Generation Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Coverage:** Nano Banana, ChatGPT/DALL-E 3, Ideogram, FLUX — all free tiers, no credit card required

---

## Overview

This document consolidates all free-tier AI image and video generation tools available without credit card binding, mapped to Edmond's service categories. It integrates research from the **AI Prompting Masterguide 2025-26** — which documents prompting frameworks, cinematography vocabulary, reference image techniques, and platform-specific best practices — with current free-tier limits and capabilities.

### The Golden Rule (From Masterguide)

> "You are the director, not a wishmaker. You are writing a brief for a cinematographer, a photographer, a production designer, and a VFX supervisor simultaneously."

All prompting across all platforms follows the Masterguide's five-layer framework:
1. **Subject layer** — Who/what, what they're doing, how they appear
2. **Environment layer** — Where, time of day, weather, spatial context
3. **Lighting layer** — Quality, direction, color temperature, contrast
4. **Style/mood layer** — Aesthetic reference, emotional tone, art movement
5. **Technical layer** — Camera/lens type, aspect ratio, resolution feel, film stock

---

## Platform Comparison Matrix (Free Tiers, No Credit Card)

| Platform | Free Limit | Max Resolution | Text Rendering | Best For | No Credit Card |
|----------|-----------|----------------|----------------|----------|---------------|
| **Nano Banana (Flash Image)** | ~100/day (web), ~500 RPD (API) | 1K | ✅ Excellent | Volume, brand assets, web imagery | ✅ |
| **Nano Banana Pro (Gemini 3 Pro)** | 2/day (web only) | 4K | ✅ Industry-leading | Hero images, print-quality assets | ✅ |
| **Nano Banana 2 (Flash Image)** | ~20/day (web) | 1K | ✅ Excellent | Improved quality over original Flash | ✅ |
| **ChatGPT (DALL-E 3)** | 2–3 images/day | 1024×1024 | ✅ Good | Quick concepts, conversational iteration | ✅ |
| **Ideogram** | 10 slow credits/day (~10 images) | 1024×1024 | ✅ Best-in-class | Typography, text-in-image, brand marks | ✅ |
| **FLUX** | Via free platforms (Wavespeed, Fal.ai) — free credits on signup | Varies | ✅ Good | Open-source, self-hostable, bulk generation | ✅ |

### Platforms Excluded (No Free Tier)
- **Midjourney:** No free tier since late 2024. Requires $10/month minimum.
- **Sora (ChatGPT video):** Free access was briefly available but has been restricted.
- **Stable Diffusion online platforms:** Most require credits or subscriptions. Self-hosting is free but requires GPU hardware.

---

## By Platform — Free Tier Details & Best Use Cases

### 1. Nano Banana (Google Gemini Flash Image)

**Free Tier:**
- ~100 images/day via Gemini app (web)
- ~500 RPD via Google AI Studio API (free, no credit card)
- Up to 1K resolution
- All outputs include SynthID + C2PA watermarking

**Best Use Cases for Edmond's Practice:**
- **Website hero images** — Generate 50+ variations, select the best
- **Brand identity mockups** — Using Masterguide Framework 1 (Text-to-Image)
- **Social media content** — 100/day means an entire month's worth in one session
- **Placeholder imagery** — Contextually relevant images during development

**Masterguide Prompting Framework 1 Applied:**
```
[Subject] A striking fashion model wearing a tailored brown dress,
sleek boots, and holding a structured handbag.
[Action] Posing with a confident, statuesque stance, slightly turned.
[Location/context] A seamless, deep cherry red studio backdrop.
[Composition] Medium-full shot, center-framed.
[Style] Fashion magazine style editorial, shot on medium-format
analog film, pronounced grain, high saturation, cinematic
lighting effect.
```

**Masterguide Prompting Framework 2 (With Reference Images):**
Nano Banana accepts up to 14 reference images per prompt.
```
Using the attached napkin sketch as the structure and the attached
fabric sample as the texture, transform this into a high-fidelity
product render. Place it in a sun-drenched, minimalist setting.
```

**Advantage over all competitors:** 500 RPD via API means you can programmatically generate hundreds of images in a Make.com workflow or script. No other free image generator comes close.

---

### 2. Nano Banana Pro (Google Gemini 3 Pro Image)

**Free Tier:**
- 2 images/day via Gemini app (web only — no free API tier)
- Up to 4K resolution
- Industry-leading text rendering
- Physics-accurate scene generation

**Best Use Cases:**
- **Hero images for flagship client sites** — Where quality justifies the 2/day limit
- **Print-quality brand assets** — 4K resolution suitable for print materials
- **Infographics and documents** — Nano Banana Pro uniquely generates legible, accurate text in images
- **Book covers, posters, signage** — Text rendering is critical

**Masterguide Prompt for Text Rendering:**
```
Design a professional book cover for a thriller titled 'The Last
Signal' by Sarah Chen. Use a dark, atmospheric photograph of a
lighthouse at night. Place the title in large bold condensed
sans-serif typography at the top, author name in a lighter weight
at the bottom. Ensure all text is perfectly legible and correctly
spelled.
```

**Masterguide Prompt for Architecture Visualization:**
```
Render a photorealistic exterior visualization of a
contemporary residential home. Single-story structure with
floor-to-ceiling glazing across the front facade, Corten steel
cladding, overhanging flat roof extending 2 meters. Late
afternoon golden hour lighting from the left, long shadows
across drought-resistant landscaping. Shot from a slightly
elevated 3/4 angle, 35mm architectural photography aesthetic.
```

---

### 3. ChatGPT (DALL-E 3)

**Free Tier:**
- 2–3 images/day (24-hour rolling window reset)
- 1024×1024 resolution
- No credit card required
- Conversational iteration — refine via dialogue

**Best Use Cases:**
- **Quick concept exploration** — "Show me 3 different logo directions for a coffee brand"
- **When you're already in ChatGPT** — No context switching
- **Conversational refinement** — "Make it warmer" "Remove the background" "Add a person"

**Limitations:**
- Only 2–3/day is extremely tight
- No API access on free tier
- No reference image support on free tier
- Resolution capped at 1024×1024

**When to use it:** When you need a quick image and are already chatting with ChatGPT. Not worth switching to ChatGPT specifically for image generation — Nano Banana is better in every way except conversational refinement.

---

### 4. Ideogram

**Free Tier:**
- 10 slow credits/day (~10 images)
- All creations are public
- Best-in-class text rendering — solved the "AI can't do text" problem
- No credit card required

**Best Use Cases:**
- **Brand marks with text** — "Coffee & Co." rendered as part of a logo
- **Social media graphics with typography** — Quote cards, announcement graphics
- **Merchandise mockups** — T-shirts, mugs with accurate text
- **Signage and poster design** — Where text legibility is critical

**Why Ideogram over Nano Banana Pro for text:**
Ideogram's text rendering is marginally better for complex typography — multi-word layouts, mixed fonts, and decorative typefaces. Nano Banana Pro is excellent for clean, modern text. Use Ideogram for decorative typography, Nano Banana Pro for clean text.

---

### 5. FLUX (Open-Source)

**Free Tier:**
- Via platforms like Wavespeed, Fal.ai — free credits on signup
- Self-hostable (open-source) — truly unlimited if you have GPU hardware
- Quality comparable to Midjourney v6

**Best Use Cases:**
- **Bulk image generation without platform limits** — Self-hosted = no daily caps
- **Custom fine-tuned models** — Fine-tune FLUX on a client's brand style for consistent output
- **When all other platforms are rate-limited** — FLUX self-hosted has no limits

**Limitation:** Self-hosting requires a GPU with 8GB+ VRAM. Cloud platforms offering FLUX have limited free credits.

---

## Platform Selection Decision Tree

```
Need images for brand development?
├── Need text in the image?
│   ├── Decorative/complex typography → Ideogram (10/day free)
│   ├── Clean, modern text → Nano Banana Pro (2/day, 4K)
│   └── No text needed → Continue below
├── Need high volume (50+ images)?
│   ├── Nano Banana via AI Studio API (500 RPD free)
│   └── FLUX self-hosted (unlimited, needs GPU)
├── Need highest quality (hero/print)?
│   └── Nano Banana Pro (2/day, 4K, studio quality)
├── Need quick concept exploration?
│   └── ChatGPT/DALL-E 3 (2-3/day, conversational)
└── Need consistent brand style across images?
    └── Nano Banana with reference images (up to 14 refs per prompt)
```

---

## Reference Image Strategy (From Masterguide)

The Masterguide identifies reference images as **"the single most powerful technique"** for professional AI image generation. All platforms that support reference images should use this approach:

### Three Types of Reference Images

**1. Subject/Character References** — Establish WHO or WHAT is in the scene
- Nano Banana: Upload up to 14 images alongside text prompt
- Use for: Brand mascot, product shots, consistent visual elements

**2. Style References** — Establish HOW the output should look
- Upload a mood board image, competitor's visual style, or brand guideline example
- Nano Banana: "Using [reference] as the style, apply it to [new content]"

**3. Composition/Scene References** — Establish the spatial structure
- Upload a photograph or rough sketch showing the spatial arrangement
- Use for: Website layout mockups, architectural visualisation

### The Reference Sheet Method (From Masterguide)

Before generating any brand imagery, create reference sheets:
```
Create a professional brand reference sheet for [brand name].
Match the exact visual style of the provided reference image.
Arrange in two horizontal rows:
Top row: logo variations, colour palette, typography samples
Bottom row: photography style examples, texture references,
iconography style, key visual elements.
Maintain absolute visual consistency across all panels.
```

---

## Iteration Framework (From Masterguide)

The Masterguide's systematic iteration approach:

1. **Generate** — Produce 4–8 variations with the same prompt
2. **Assess** — Identify ONE specific weakness (wrong lighting, poor composition, inaccurate text)
3. **Change one variable** — Modify ONLY the weakness (e.g., change "flat lighting" to "dramatic side-lighting from the left")
4. **Regenerate** — Compare to previous
5. **Document** — Note what worked for future prompts

**Never change five things at once.** You'll never know what improved the result.

---

## Quick-Win Implementations

### Priority 1: Nano Banana API Setup (15 min)
1. Go to aistudio.google.com → Get API key
2. Store in `.env.local`
3. Test with a script that generates 20 brand image variations in one batch

### Priority 2: Masterguide Prompt Template Library (1 hour)
Create a prompt library organised by use case, using the Masterguide's frameworks:

```
Brand Identity:
  - Logo concepts (Nano Banana Pro, 2/day)
  - Brand mockups (Nano Banana API, 500/day)
  - Typography-with-text (Ideogram, 10/day)

Web Design Assets:
  - Hero images (Nano Banana API, 500/day)
  - Background textures (Nano Banana API)
  - Icon concepts (Nano Banana API)

Marketing Content:
  - Social media graphics (Ideogram for text, Nano Banana for imagery)
  - Infographics (Nano Banana Pro for text accuracy)
  - Product photography (Nano Banana Pro, 4K)
```

### Priority 3: Multi-Platform Workflow (30 min)
For a complete brand identity image set:
1. **Nano Banana Pro (2/day):** Generate hero image and brand mark in 4K
2. **Ideogram (10/day):** Generate typography variations and text-based graphics
3. **Nano Banana API (500/day):** Generate 50+ background textures and supporting imagery
4. **ChatGPT/DALL-E 3 (2-3/day):** Quick concept exploration for ideas you want to test fast

---

## Resource Budget Planning

| Platform | Daily Capacity | Monthly Capacity | Cost |
|----------|---------------|-----------------|------|
| Nano Banana (API) | 500 requests | 15,000 | $0 |
| Nano Banana (web) | 100 images | 3,000 | $0 |
| Nano Banana Pro (web) | 2 images | 60 | $0 |
| Nano Banana 2 (web) | 20 images | 600 | $0 |
| ChatGPT/DALL-E 3 | 2-3 images | 60-90 | $0 |
| Ideogram | 10 images | 300 | $0 |
| FLUX (self-hosted) | Unlimited | Unlimited | $0 (hardware cost) |

**Combined monthly capacity across all free platforms: ~19,000+ images at zero cost.**

---

## Risks & Considerations

1. **Rate limits change frequently:** Google has already cut Nano Banana free limits multiple times. Don't build workflows that depend on specific numbers — design for flexibility
2. **Watermarking:** Nano Banana outputs include SynthID + C2PA content credentials. These are invisible to viewers but detectable by tools that check for AI-generated content. Disclose AI usage to clients where appropriate
3. **Copyright status:** AI-generated images are generally not copyrightable. Clients cannot claim exclusive copyright over AI-generated brand assets. For logos requiring legal protection, recommend traditional design work
4. **Public outputs on free tiers:** Ideogram makes all free-tier creations public. Nano Banana API outputs are private. Be aware of visibility settings
5. **Quality vs. volume trade-off:** Nano Banana Pro (2/day, 4K) for quality. Nano Banana API (500/day, 1K) for volume. Use both — don't try to get 4K quality from the API tier or volume from the Pro tier

---

## Summary: Value to Practice

| Use Case | Platform | Images/Month | Time Saved |
|----------|---------|-------------|------------|
| Brand identity assets | Nano Banana Pro + Ideogram | ~360 | 10-20 hours |
| Website hero/background images | Nano Banana API | 15,000 | 5-10 hours |
| Social media content | Nano Banana + Ideogram | 3,300 | 8-15 hours |
| Marketing materials | Multi-platform | 19,000+ | 15-25 hours |

**Key insight:** Between all free-tier platforms, you can generate 19,000+ images per month at zero cost — more than any branding project could ever need. The skill is not generation; it's curation. The Masterguide's prompting frameworks (especially the five-layer structure and reference image techniques) dramatically improve output quality. Use Nano Banana API for volume (500 RPD), Nano Banana Pro for quality (2/day, 4K), Ideogram for text rendering (10/day), ChatGPT for quick concepts (2-3/day), and FLUX for unlimited self-hosted generation. The reference image technique from the Masterguide — using up to 14 reference images per Nano Banana prompt — is the single most powerful lever for professional-quality output.

---

**End of AI Image & Video Generation Strategy**
