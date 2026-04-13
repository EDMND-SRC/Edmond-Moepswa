# THE DEFINITIVE AI IMAGE & VIDEO PROMPTING MASTERGUIDE
### Higgsfield · Midjourney · Nano Banana Pro · Veo 3.1 · Google AI Studio · Google Flow
#### Compiled from Official Documentation, Community Research & Top Creator Insights — April 2026

---

## TABLE OF CONTENTS

1. [The Fundamental Philosophy of AI Prompting](#1-the-fundamental-philosophy-of-ai-prompting)
2. [The Golden Rules: What Works Across ALL Platforms](#2-the-golden-rules-what-works-across-all-platforms)
3. [The Cardinal Sins: What NEVER to Do](#3-the-cardinal-sins-what-never-to-do)
4. [Reference Images: The Single Most Powerful Technique](#4-reference-images-the-single-most-powerful-technique)
5. [HIGGSFIELD: Complete Platform Guide](#5-higgsfield-complete-platform-guide)
6. [MIDJOURNEY V7 & V8: Complete Guide](#6-midjourney-v7--v8-complete-guide)
7. [NANO BANANA PRO (Google Gemini Image): Complete Guide](#7-nano-banana-pro-google-gemini-image-complete-guide)
8. [VEO 3.1: Google's Video Generation Complete Guide](#8-veo-31-googles-video-generation-complete-guide)
9. [GOOGLE FLOW: The AI Filmmaking Suite Complete Guide](#9-google-flow-the-ai-filmmaking-suite-complete-guide)
10. [GOOGLE AI STUDIO: Developer-Facing Creative Suite](#10-google-ai-studio-developer-facing-creative-suite)
11. [The Cinematography Vocabulary Every Prompter Must Know](#11-the-cinematography-vocabulary-every-prompter-must-know)
12. [The Photography Vocabulary for Image Generation](#12-the-photography-vocabulary-for-image-generation)
13. [Master Prompt Formulas & Templates](#13-master-prompt-formulas--templates)
14. [Advanced Workflows & Multi-Tool Pipelines](#14-advanced-workflows--multi-tool-pipelines)
15. [Community Insights: Reddit, X.com, Threads, Substack](#15-community-insights-reddit-xcom-threads-substack)
16. [Platform Comparison: When to Use Which Tool](#16-platform-comparison-when-to-use-which-tool)
17. [Case Studies: Real Prompts, Real Results](#17-case-studies-real-prompts-real-results)
18. [The Iteration Framework: From Draft to Masterpiece](#18-the-iteration-framework-from-draft-to-masterpiece)

---

## 1. THE FUNDAMENTAL PHILOSOPHY OF AI PROMPTING

### You Are the Director, Not a Wishmaker

The single biggest mindset shift that separates mediocre AI output from professional-grade work is understanding that you are not typing a wish — you are directing a scene. You are writing a brief for a cinematographer, a photographer, a production designer, and a VFX supervisor simultaneously.

AI image and video models are not intuitive. They don't fill in gaps with what you intended; they fill in gaps with the statistical average of everything they've ever been trained on. The more you leave to chance, the more generic and average your output becomes.

**The Director Mindset means:**
- You specify every element you care about
- You choose lighting intentionally, not by default
- You define perspective, camera position, lens
- You set mood through environmental cues, not just adjectives
- You build the scene from the ground up, not from the top down

### How AI Models Actually Process Prompts

Understanding this technically transforms your results:

- **Diffusion models** (Midjourney, Stable Diffusion variants) parse prompts as weighted token clusters. Earlier words generally carry more weight. Concepts cluster together. Too many concepts create visual "averaging."
- **Reasoning-first models** (Nano Banana Pro, built on Gemini 3) actually plan and simulate a scene before rendering. They understand physics, causality, and spatial logic. You can give them narrative, natural-language instructions — they reward it.
- **Video generation models** (Veo 3.1, Higgsfield Cinema Studio) process prompts against temporal coherence. Motion, camera movement, and time-based pacing must be specified or they default to uninspired camera-locked static shots.

### The Spectrum of Prompt Quality

```
WEAK                                                    STRONG
|---------------------------------------------------|
"a woman"   "a beautiful woman"   "cinematic portrait    
                                   of a woman"
                                              ↑
                               "Cinematic close-up portrait 
                               of a 30-something woman, 
                               warm chestnut hair, natural 
                               makeup, captured in late 
                               afternoon golden hour light, 
                               shallow depth of field, 
                               35mm film look, slight grain, 
                               soft focus background of 
                               blurred city bokeh, melancholy 
                               but composed expression, 
                               medium-format film aesthetic"
```

---

## 2. THE GOLDEN RULES: WHAT WORKS ACROSS ALL PLATFORMS

These principles are validated by official platform documentation, Reddit communities (r/midjourney, r/StableDiffusion, r/AIArt — combined 800k+ members), creator testimonials, and platform-native research teams.

### Rule 1: Lead With the Most Important Element

Every word in a prompt has weight. Words that appear earlier tend to have greater influence on the final output in diffusion-based models. Structure your prompt so that the core visual concept leads. Never bury your subject in the middle.

**Weak:** "In a misty, rainy forest with lots of trees and fog, there is a wolf"  
**Strong:** "A lone grey wolf standing still in a misty rain-soaked forest, fog threading through ancient pines, atmospheric, dramatic"

### Rule 2: Use Positive Framing — Describe What You Want, Not What You Don't

Google's official Nano Banana prompting documentation is explicit about this: describe what you want using positive language. "Empty street" works far better than "no cars." "Smooth skin" outperforms "no wrinkles." Negatives are cognitively confusing to generative models and often produce the opposite effect.

**Exception:** Midjourney's `--no` parameter is specifically built for exclusion and works reliably. Use it to exclude persistent unwanted elements, not to describe your scene.

### Rule 3: Think in Layers — Subject, Environment, Lighting, Style, Technical

Effective prompts contain information across multiple sensory and technical layers:
- **Subject layer:** Who or what, what they're doing, how they appear
- **Environment layer:** Where, time of day, weather, spatial context
- **Lighting layer:** Quality, direction, color temperature, contrast
- **Style/mood layer:** Aesthetic reference, emotional tone, art movement
- **Technical layer:** Camera/lens type, aspect ratio, resolution feel, film stock

Not every prompt needs all five, but knowing what you've left out tells you where unexpected output will come from.

### Rule 4: Use Concrete Nouns and Vivid Verbs

Abstract language produces abstract results. "Beautiful," "amazing," "stunning" are meaningless to a generative model — they are statistical noise. Instead:

- Not "beautiful lighting" → "warm side-lit golden hour, soft shadows"
- Not "amazing environment" → "fog-wrapped cathedral ruins, shafts of light through broken stained glass"
- Not "dramatic action" → "figure mid-leap, coat billowing, city lights blurred beneath"

### Rule 5: Specify the Medium, Not Just the Style

Saying "artistic" tells the model almost nothing. Saying "oil painting with visible impasto brushstrokes" or "medium-format analog film with heavy grain and slight color shift" gives the model a precise visual target.

**Style references that work exceptionally well:**
- Cinematic: "35mm film, anamorphic widescreen, slight lens distortion"
- Photography: "shot on a Hasselblad 503CX, 80mm lens, f/2.8, medium-format film"
- Artistic: "oil painting in the style of Rembrandt, rich chiaroscuro, dark background"
- Commercial: "clean product photography, white seamless backdrop, softbox lighting"
- Editorial: "Vogue-style fashion editorial, high contrast, dramatic shadows"
- Documentary: "photojournalistic style, handheld feel, available light"

### Rule 6: Reference Real-World Materials, Textures, and Physics

Models trained on human-generated content understand material properties deeply. Reference them specifically:
- "Worn leather jacket with stress creases at the elbows"
- "Molten glass with trapped air bubbles"
- "Rain-soaked concrete reflecting neon signs"
- "Fresh snow with human footprints creating blue-shadow depressions"

### Rule 7: One Primary Action per Shot (Video)

This is one of the most consistent pieces of advice across Veo, Higgsfield, and Kling documentation. Video generation models handle one dominant action per clip far better than multiple simultaneous activities. If you need walking, speaking, and gesturing — generate them as separate clips and sequence them in post.

### Rule 8: Iterate Systematically, Not Randomly

The community consensus from Reddit's most upvoted creators is that iteration should be systematic:
1. Generate → assess one specific weakness
2. Change one variable at a time
3. Document what worked
4. Scale what works to other outputs

Changing five things at once means you'll never know what improved your result.

---

## 3. THE CARDINAL SINS: WHAT NEVER TO DO

These are the mistakes that professionals across all platforms have documented extensively. Most beginners make several of these simultaneously.

### Sin 1: Prompt Word Salad

**The mistake:** Stacking adjectives hoping quantity will produce quality.
```
WRONG: "beautiful stunning gorgeous amazing breathtaking incredible 
portrait of a woman with flowing magical ethereal mystical shimmering 
luminescent glowing hair"
```
**Why it fails:** Diffusion models process tokens statistically. Synonym stacking creates competing weights that neutralize each other. The model averages out to something generic.

**The fix:** Choose the ONE most precise adjective that communicates what you want. "Luminescent hair" is more powerful than five synonyms for glowing.

### Sin 2: Conflicting Style Instructions

**The mistake:** Combining incompatible aesthetic directions.
```
WRONG: "photorealistic hyperdetailed 8K render in the style of 
impressionist watercolor painting, anime style, pixel art, 
cyberpunk neon, vintage sepia tones"
```
**Why it fails:** Conflicting style references force the model to average them. You get visual mud — a little of everything and none of it fully realized.

**The fix:** Commit to 1–2 complementary aesthetics maximum. "Cyberpunk neon photography" works. "Cyberpunk impressionist anime sepia" does not.

### Sin 3: Abstract Emotional Descriptors Without Concrete Anchors

**The mistake:** Using emotion words as visual instructions.
```
WRONG: "a very sad and melancholy lonely scene that feels hopeful 
but also mysterious and tense"
```
**Why it fails:** Sadness isn't a visual property. Melancholy isn't a texture. Models have no way to render abstract emotional concepts unless anchored in concrete visual cues.

**The fix:** Translate emotions into concrete visual elements.
- Sadness → "figure hunched on a rain-slicked park bench, empty seat beside them, grey overcast sky"
- Mystery → "fog-shrouded path leading to a single lit doorway in the dark"
- Tension → "extreme close-up of white-knuckled hands gripping a steering wheel"

### Sin 4: Trying to Include Everything in One Prompt

**The mistake:** Describing an entire story, multiple characters doing different things, complex interactions, environmental details, and stylistic specifications simultaneously.
```
WRONG: "A woman in a red dress and a man in a grey suit walking 
through a crowded Tokyo street at night in the rain while looking 
at their phones and also a cat watches from a rooftop and there are 
neon signs and food vendors and bicycles and people with umbrellas 
and cherry blossom petals falling"
```
**Why it fails:** Scene complexity exceeds what most models can coherently render in a single pass. The model has to make compromises; it usually drops the less statistically common elements and averages the prominent ones.

**The fix:** Decide what your HERO element is. Build the scene around that. Everything else is supporting detail, not equally weighted instruction.

### Sin 5: Forgetting to Specify Lighting

Lighting is the single most transformative element in any visual. Leaving it unspecified means the model defaults to its most statistically common lighting for that subject — which is usually flat, uninspiring, and generic.

```
WRONG: "portrait of a chef in a kitchen"
RIGHT: "portrait of a chef in a kitchen, lit by the warm orange glow 
of an open oven beneath them, dramatic under-lighting casting deep 
shadows upward across their face, steam rising around them"
```

### Sin 6: Ignoring Aspect Ratio

Aspect ratio isn't a final export detail — it fundamentally changes composition. A vertical 9:16 portrait prompt will have different compositional rules than a 16:9 cinematic wide shot. Specify this intentionally.

### Sin 7: Using Generic Quality Boosters (Now Largely Defunct)

Terms like "8K," "ultra HD," "photorealistic," "hyperdetailed," and "masterpiece" were effective in earlier model generations because they correlated with high-quality images in training data. Modern models (Midjourney V7+, Nano Banana Pro, Veo 3.1) have sufficiently advanced that these terms are now often noise. Worse, "8K" on a model that doesn't generate 8K creates a mismatch between prompt expectations and output reality.

**What works instead:** Specific photographic and cinematic terminology that is technically accurate.

### Sin 8: Copy-Pasting Prompts From One Platform to Another Without Adaptation

Midjourney prompts are not Veo prompts. Veo prompts are not Nano Banana Pro prompts. Each model has been trained differently, has different strengths, and responds to different linguistic registers:
- Midjourney V7: Responds best to photographic, art-directed language; rewards concision
- Nano Banana Pro: Understands natural language, narrative descriptions, conversational iteration
- Veo 3.1: Responds to cinematic direction language — storyboard-style descriptions with explicit scene staging
- Higgsfield Cinema Studio: Requires layered, separated instructions for character, camera, and motion

### Sin 9: Using Negative Language as Primary Description

"Don't make it blurry," "no text in the image," "not too dark" — none of these are primary descriptors. Use them only where an element is persistently appearing that you want excluded.

### Sin 10: Over-Reliance on Regeneration Without Prompt Revision

One of the most common time-wasters reported by the community: users regenerate the same prompt 15 times hoping for a better result. Variation within a prompt is real but limited. If the first four generations consistently miss the mark in the same way, the problem is the prompt, not luck. Identify the specific failure and revise.

### Sin 11: Not Understanding the Difference Between Style and Content

Style tells the model HOW to render. Content tells it WHAT to render. Many beginners mix these:
```
WRONG: "a cinematic movie about a woman in the rain"
RIGHT: [Content] "a woman standing alone at a bus stop in heavy rain" 
       [Style] "cinematic, 35mm film aesthetic, desaturated blues, 
       available-light photography feel"
```

### Sin 12: Providing Contradictory Technical Parameters (Midjourney Specific)

On Midjourney, using `--style raw` (which minimizes artistic interpretation) and then also setting `--stylize 1000` (maximum artistic interpretation) are contradictory. Understanding what each parameter does before combining them prevents this.

---

## 4. REFERENCE IMAGES: THE SINGLE MOST POWERFUL TECHNIQUE

This is the area where professional AI creators most significantly outperform casual users. The difference between text-only prompting and multimodal (text + reference image) prompting is not incremental — it is transformational.

### Why Reference Images Work

AI image and video generation models are trained on images paired with descriptions. When you provide a reference image, you are giving the model a concrete visual anchor that:
- Eliminates ambiguity about subject appearance
- Locks in color palette and lighting character
- Establishes spatial relationships
- Communicates style information that cannot be fully captured in text
- Dramatically improves character consistency across multiple generations

### The Three Types of Reference Images

**1. Subject/Character References**
Use these to establish WHO or WHAT is in the scene.
- For Midjourney: `--oref [URL]` (Omni Reference) — the V7 flagship for subject consistency
- For Higgsfield: Soul ID training for character identity preservation
- For Nano Banana Pro/Veo: Upload directly alongside your text prompt (up to 14 images in Nano Banana 2)

**2. Style References**  
Use these to establish HOW the output should look.
- For Midjourney: `--sref [URL]` (Style Reference) with `--sw [0-1000]` to control influence
- For Nano Banana Pro: Reference images used in the "Multimodal generation" framework — "Using the attached [reference] as the style, apply it to [new content]"
- For Veo/Flow: Use as "ingredients" to establish consistent visual language

**3. Composition/Scene References**
Use these to establish the spatial structure of your image.
- Upload a photograph or rough sketch that shows the spatial arrangement you want
- Midjourney: Upload URL directly at the beginning of the prompt with `--iw [0-2]` (image weight) to control how much the composition is followed
- Most effective for establishing camera angle, spatial relationships, and framing

### Platform-Specific Reference Image Techniques

**Midjourney V7 Reference System:**
- `--oref [URL]` (Omni Reference): Subject, character, or broad visual reference — most flexible
- `--ow [0-1000]`: Controls how strongly the omni reference is followed (default 100)
- `--sref [URL]` (Style Reference): Style-only application without changing content
- `--sw [0-1000]`: Style weight control
- `--cref [URL]` (Character Reference): Specifically for human character consistency
- `--cw [0-100]`: Character weight, with lower values focusing on face only

**Nano Banana Pro (Gemini 3 Image):**
- Accepts up to 14 reference images simultaneously in a single prompt
- Supported formats: PNG, JPEG, WebP, HEIC, HEIF
- Use napkin sketches → reference textures → final render workflow
- "Multimodal generation formula": [Reference images] + [Relationship instruction] + [New scenario]

**Higgsfield System:**
- Higgsfield Popcorn: Generates reference keyframe images for scenes
- Soul ID: Trains on uploaded images to create a consistent character "soul" across all generations
- First-frame / last-frame control: Upload the exact starting and ending visual for frame-perfect control
- Up to 3 reference images per generation (as per Veo 3.1 API integration)

**Google Flow / Veo 3.1:**
- "Ingredients to Video": Upload character, object, scene references — they become reusable ingredients
- First and last frame feature: Precise transition control between two defined states
- Up to 3 reference images per generation documented in the 2025 Gemini API

### Pro Workflow: The Reference Sheet Method

Before generating any scene, top creators generate or assemble reference sheets:

**Character Reference Sheet Prompt (used in Higgsfield Popcorn):**
```
Create a professional character reference sheet for [character name]. 
Match the exact visual style of the provided reference image. 
Arrange in two horizontal rows:
Top row: front view (full body), 3/4 left view, profile, 3/4 right view
Bottom row: close-up face portrait, hands close-up, costume/outfit 
detail, signature props or accessories.
Maintain absolute character consistency across all panels — same 
facial proportions, hair, costume, and skin tone throughout.
```

**Location Reference Sheet Prompt:**
```
Create a professional location reference sheet based on the uploaded 
reference image. Match the exact visual style, lighting quality, 
color treatment, and texture. Arrange in two horizontal rows:
Top row: frontal wide view, left angled perspective, right angled 
perspective, reverse wide view
Bottom row: three detailed close-ups of key environmental elements.
Maintain architectural consistency, accurate proportions, and 
consistent lighting across all panels.
```

---

## 5. HIGGSFIELD: COMPLETE PLATFORM GUIDE

### What Higgsfield Is

Higgsfield is a unified AI creative studio that gives creators access to multiple top-tier video and image generation models in one workspace. As of April 2026, models available include: **Kling 3.0, Veo 3.1, WAN 2.5, Sora 2, Minimax, Seedance, and Nano Banana Pro** for image generation. It is not a single model but a professional-grade production environment built around those models.

Its standout distinction from competitors is the **Cinema Studio** — described as "the first AI studio with real optical physics" — which allows deterministic, professional workflows instead of random generation.

### The Layered Prompt System

The most critical insight about Higgsfield prompting: **it uses a layered prompt system where each tool handles a single visual job.** This is not one text box controlling everything. Mixing camera, character, and motion instructions together in a single prompt is the number-one cause of broken, unstable Higgsfield outputs.

**Three prompt layers:**

**Layer 1 — The Image/Scene Layer (Visual Design)**
Controls the base image: lighting, color, composition, mood, environment, character appearance.
Tool: Higgsfield Popcorn (image generation), Seedream, or Nano Banana Pro
This layer should be COMPLETED before you think about motion.

**Layer 2 — The Identity Layer (Character Consistency)**
Controls who the character is and ensures they look the same across all shots.
Tool: Soul ID (trained on your reference images)
This layer should be established at the PROJECT level, not the shot level.

**Layer 3 — The Motion Layer (Video Generation)**
Controls how the camera moves, how the character moves, timing, and performance.
Tool: Seedance, Kling 3.0, Veo 3.1 (on top of locked visual layer)

### Higgsfield Popcorn: Image Generation

Popcorn is Higgsfield's image generation interface, used primarily for creating reference keyframes that then feed into video generation. It is powered by Nano Banana Pro (Gemini 3 engine).

**Popcorn Prompt Structure:**
```
[Shot type/framing] + [Subject description] + [Action] + 
[Environment] + [Lighting] + [Camera/lens] + [Style/mood]
```

**Example (from official Higgsfield documentation):**
```
"Cinematic close-up of a wooden photo frame sitting on a kitchen 
counter in a softly sunlit vintage kitchen. Inside the frame is a 
faded family photograph of a young woman and her elderly father 
smiling together. The frame rests near the window, where warm 
afternoon light filters through lace curtains, casting golden 
reflections on the countertop. Dust motes float in the air, and 
the scene feels still and melancholic. Shot on a 50mm lens with 
shallow depth of field, filmic tones in yellow and green hues, 
soft focus on the photograph, nostalgic atmosphere evoking memory 
and loss."
```

**What to notice about this prompt:**
- Shot type specified first ("Cinematic close-up")
- Subject is specific (wooden photo frame, faded photograph, specific people in it)
- Environment is fully staged (kitchen counter, near window, lace curtains)
- Lighting is described with precision (warm afternoon, golden reflections, dust motes)
- Technical specification given (50mm lens, shallow depth of field)
- Style specified (filmic tones, yellow/green hue grading)
- Emotional atmosphere articulated (still, melancholic, nostalgic)

### Cinema Studio: Professional Video Generation

Cinema Studio is Higgsfield's most advanced feature — described as "the first AI studio with real optical physics." It allows:
- Layered up to 3 simultaneous camera movements
- Bespoke optical stack combining film types and lens characteristics
- A hybrid Photography/Videography Mode for iteration

**Cinema Studio Prompt Framework:**
Prompts in Cinema Studio are structured as full scene descriptions that include character dialogue, camera behavior, and environmental direction simultaneously — but they should be organized internally by section.

**Internal structure of a Cinema Studio prompt:**
```
[Character identity tags, e.g., @Adil-Cop] + [Opening action/beat] 
+ [Dialogue] + [Camera behavior/lens] + [Lighting/atmosphere] + 
[Scene duration/pacing cues]
```

**Example from official Higgsfield short film documentation:**
```
"@Dave-Cop teasing: 'Yeah? Don't sound too excited. We can call 
dispatch, have 'em sing for you.' @Adil-Cop: 'Please don't. I'm 
trying to keep a low profile today.' @Dave: 'Too late. Princess 
turns a year older. That's paperwork.' Interior police cruiser, 
daytime, DVR dashcam look, soft overexposed sunlight."
```

### Short Prompts vs. Long Prompts on Higgsfield

Official Higgsfield documentation and community research agree: **short and direct prompts produce stronger control than long descriptive paragraphs.** Higgsfield responds better to direct commands than to lengthy paragraphs that force it to guess.

**The segmind.com/Higgsfield research finding:**
"Short prompts produce stronger control than long ones. Higgsfield reacts better to direct commands than descriptive paragraphs that force it to guess."

This is counterintuitive compared to some other platforms. The layered system means that LENGTH belongs in the structure (across multiple layers), not in a single bloated text block.

### WAN (Wide-Angle Neural Camera) on Higgsfield

WAN stands for Wide-Angle Neural Camera — it is described as "the model most focused on how a story is seen." Its unique specialization is **perspective control and camera cinematography**. Unlike models that primarily animate subjects, WAN simulates real-world cinematography principles — it understands camera movement, angle hierarchy, and shot pacing.

**WAN-specific prompting:**
- Define rotations, zooms, pans explicitly through language
- WAN responds to "handheld camera energy," "crane perspective," "dolly push," etc.
- Think of it as directing camera behavior rather than subject behavior

### Key Higgsfield Features Reference

| Feature | Purpose | How to Trigger |
|---------|---------|----------------|
| Popcorn | Generate reference keyframes | Image generation prompt |
| Soul ID | Lock character identity | Train on reference images |
| Cinema Studio | Full cinematic scene with optical physics | Select Cinema Studio mode |
| Seedance/Seedream | Image-to-video animation | Upload image + motion prompt |
| First/Last Frame | Lock transition endpoints | Upload start image + end image |
| Nano Banana Pro | Advanced image generation/editing | Select Nano Banana Pro model |
| WAN 2.5 | Camera-focused video | Select WAN model |
| Kling 3.0 | Scene-structured video with audio | Select Kling model |
| Veo 3.1 | Cinematic video with full audio | Select Veo 3.1 model |
| AI Influencer Studio | Consistent identity, unlimited content | One face, one look workflow |

---

## 6. MIDJOURNEY V7 & V8: COMPLETE GUIDE

### Current Model Status (April 2026)

- **V7**: Released April 3, 2025; became default June 17, 2025. Current production flagship.
- **V8 Alpha**: Released March 2026. ~5x faster, native 2K resolution, best text rendering to date.
- **Niji 7**: Released January 9, 2026. Specialized anime/manga model with dramatically improved coherence, precise color positioning, and clean flat linework.

### What Changed With V7 (Critical for Prompters)

V7 introduced a paradigm shift in how it interprets prompts:
- **V5/V6 behavior:** Rewarded keyword density and specific art-world terminology
- **V7 behavior:** Prioritizes "vibe" and aesthetic over literal instruction; processes natural language sentences, not keyword lists

This means many V5/V6 prompting strategies actively work against V7. If you've been generating for a while and your results have become inconsistent with V7, your old prompt structures are likely the cause.

**The core V7 insight from the community (r/midjourney, 3,400 upvotes):**
"V6 wants natural language, not keyword lists. Writing it like a photography brief changed everything."

### The V7 Prompt Structure

**Basic structure (proven by community research):**
```
[Subject] + [Action] + [Medium/Format] + [Lighting] + 
[Aspect Ratio] + [Style Parameters]
```

**Example:**
```
"woman sitting alone at a late-night diner counter, nursing a 
coffee, neon sign reflections in the rain-slicked window behind 
her, 1970s photojournalism style, shot on Kodak Tri-X film, 
available light, slightly grainy --ar 3:2 --style raw --s 180"
```

### Complete V7/V8 Parameter Reference

**Model selection:**
- `--v 7` (default, best overall quality)
- `--v 8` (V8 Alpha — faster, 2K native, superior text)
- `--niji 7` (anime/manga specialist)

**Aspect ratio (`--ar`):**
- `--ar 16:9` — Widescreen (landscape, video, presentations)
- `--ar 21:9` — Cinematic ultrawide
- `--ar 4:5` — Portrait (Instagram feed)
- `--ar 9:16` — Vertical (Stories, TikTok, Reels)
- `--ar 1:1` — Square (profile photos, album art)
- `--ar 3:2` — Classic photography (35mm film)
- `--ar 2:3` — Portrait print
- `--ar 6:11` — Tall portrait (phone wallpaper)

**Style control (`--s`):**
- `--s 0-100` — Photorealistic range
- `--s 100-300` — Balanced artistic-realistic
- `--s 300-1000` — Increasingly artistic/stylized
- `--style raw` — Minimal AI artistic interpretation; best for photorealism

**Experimental parameters:**
- `--exp 10-25` — Sweet spot for enhanced detail without over-stylization
- `--chaos 0-100` — Output variety (high = more diverse, unpredictable results)
- `--weird 0-3000` — Unconventional aesthetics

**Reference control (V7):**
- `--oref [URL]` — Omni Reference: subject/character/broad visual
- `--ow 0-1000` — Omni weight (default 100)
- `--sref [URL]` — Style reference
- `--sw 0-1000` — Style weight (default 100)
- `--iw 0-2` — Image prompt weight
- `--cref [URL]` — Character reference
- `--cw 0-100` — Character weight (0 = face only)

**Quality and speed:**
- `--mode draft` — 10x faster, ~half cost; ideal for iteration
- `--q 1` — Default quality (recommended for most work)
- `--hd` — (V8 only) Native 2K resolution (4x cost)
- `--q 4` — (V8 only) Extra coherence mode (4x cost)

**Exclusion:**
- `--no [element]` — Exclude specific elements
- Example: `--no text, watermarks, logos, blurry background`

**Reproducibility:**
- `--seed [number]` — Use same seed + same prompt → similar composition
- Note: Seed loses effect when prompt changes significantly

**Multi-prompt weighting:**
- `forest::2 river::1` — Double weight on forest vs river
- Useful when one concept is dominating undesirably

**Permutations (batch generation):**
- `a {red, blue, green} sports car` — Creates 3 separate jobs
- Highly efficient for A/B testing color/style variations

### V7-Specific Prompting Philosophy

**1. Write like a photographer briefing**
Don't write what you see in your mind. Write what the camera would capture.
```
NOT: "a powerful emotion scene where she's crying"
YES: "tears catching the harsh fluorescent light of an empty 
     hospital corridor, blurred figure of a doctor retreating 
     down the hall, subject gripping the wall for support"
```

**2. Personalization is now default in V7**
V7 enables personalization by default, meaning it learns your aesthetic preferences over time. Rate images regularly in the Midjourney web app — 10 minutes per week dramatically improves output alignment to your aesthetic over time.

**3. Draft Mode is not optional for serious work**
Draft mode runs 10x faster at half the GPU cost. The only rational workflow for serious creators:
- Draft mode for all exploration and iteration
- Standard mode for final generation
- Never waste standard-mode credits on first-pass prompts

**4. The Omni Reference changed everything**
V7's Omni Reference system is the single most significant advancement for professional workflows. It allows one face/character/object to be maintained with high fidelity across different scenarios. One verified case study: a content creator maintained consistent visual brand identity, saving $4,500 in production costs and boosting engagement 22%.

### Common Midjourney Mistakes (Community Research)

From r/midjourney, r/aiart, and platform documentation:

**Mistake 1: Overly complex prompts**
```
WRONG: "A beautiful stunning gorgeous amazing 
incredible breathtaking portrait of a woman..."
```
Too many competing adjectives neutralize each other. Community quote (1,800 upvotes): "I spent a year using V5 prompts on V6 and wondering why results were inconsistent."

**Mistake 2: Ignoring aspect ratio**
Every image has a different compositional logic at different ratios. Specify it before anything else.

**Mistake 3: Not separating concepts correctly**
Midjourney sometimes conflates word combinations. "hot dog" gives you food; you need to write around the AI's literal interpretation.

**Mistake 4: Treating V7 like V5/V6**
V7 rewards descriptive sentences. V5/V6 rewarded keyword clusters. These are different tools.

**Mistake 5: Inconsistent `--s` across a series**
If you're building a visual series, lock your `--stylize` value. Inconsistent stylization values produce a series that looks like different aesthetics.

---

## 7. NANO BANANA PRO (GOOGLE GEMINI IMAGE): COMPLETE GUIDE

### What Nano Banana Pro Actually Is

Nano Banana Pro is Google's advanced image generation and editing model, built on the **Gemini 3 Pro** foundation. It is the consumer-facing name for what is technically the `gemini-3-pro-image` model. Its sibling, **Nano Banana 2**, is based on Gemini 3.1 Flash Image.

This is a fundamentally different kind of image generation model from Midjourney or Stable Diffusion variants. It does not work purely through diffusion. Instead, it **plans scenes before rendering them** — leveraging Gemini 3's deep reasoning capabilities. This means:
- It understands physics, causality, and spatial logic
- It renders accurate text in images (historically the achilles heel of AI image generation)
- It comprehends narrative context, not just visual tokens
- It can be conversationally iterated — you can have a dialogue with it about the image

### Key Technical Specifications (From Google Cloud Blog, March 6, 2026)

| Specification | Nano Banana Pro (Gemini 3 Pro Image) | Nano Banana 2 (Gemini 3.1 Flash Image) |
|--------------|---------------------------------------|----------------------------------------|
| Context window | 65,536 input tokens | 131,072 input tokens |
| Output tokens | 32,768 max | 32,768 max |
| Native resolution | 1K, 2K, 4K | 512px, 1K, 2K, 4K |
| Aspect ratios | 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 | All of the above + 1:4, 4:1, 1:8, 8:1 |
| Reference images | Up to 14 per prompt | Up to 14 per prompt |
| Knowledge cutoff | January 2025 | January 2025 |
| Live data | Yes (web search powered) | Yes (web search powered) |
| Watermarking | SynthID + C2PA Content Credentials | SynthID + C2PA |
| Generation speed | Under 10 seconds for complex scenes | Faster than Pro |
| Character consistency | 95% identity preservation across angles | High but slightly lower than Pro |

### The Five Nano Banana Prompting Frameworks (Official Google Documentation)

**Framework 1: Text-to-Image Generation (Without References)**
Formula: `[Subject] + [Action] + [Location/context] + [Composition] + [Style]`

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

**Framework 2: Multimodal Generation (With References)**
Formula: `[Reference images] + [Relationship instruction] + [New scenario]`

```
Using the attached napkin sketch as the structure and the attached 
fabric sample as the texture, transform this into a high-fidelity 
3D armchair render. Place it in a sun-drenched, minimalist 
living room.
```

**Framework 3: Conversational Image Editing**
For editing without references:
- State what should CHANGE explicitly
- State what should STAY THE SAME explicitly
- Use "semantic masking" through text — no manual masking tool needed

```
"Remove the man from the photo and fill the space with the 
natural continuation of the stone wall and cobblestone street 
behind him, maintaining exact lighting and texture."
```

**Framework 4: Composition and Style Transfer (With New References)**
For adding elements or applying styles:
```
"Take this base photograph of the living room [reference] and 
apply the Art Deco design aesthetic of this sample image 
[style reference], replacing the furniture with period-appropriate 
pieces while maintaining the room's spatial layout and lighting 
character."
```

**Framework 5: Complex Document/Infographic Generation**
A unique Nano Banana Pro strength — it can generate legible, accurate infographics:
```
"Create a clean, modern vertical timeline infographic illustrating 
the major milestones of AI evolution from 2010 to 2025. Use a 
white background, thin grey dividers, and circular markers for 
each year. Include minimal icons, short text blocks, and smooth 
gradient accents in blue. Ensure the layout is symmetrical, evenly 
spaced, and visually balanced, with a bold header at the top 
reading 'Evolution of AI: 2010–2025.'"
```

### Nano Banana Pro Unique Capabilities

**Text Rendering (Industry-Leading)**  
Nano Banana Pro generates legible, accurate text within images. This was historically impossible with diffusion models. Prompting for text:
```
"Design a professional book cover for a thriller titled 'The Last 
Signal' by Sarah Chen. Use a dark, atmospheric photograph of a 
lighthouse at night. Place the title in large bold condensed 
sans-serif typography at the top, author name in a lighter weight 
at the bottom. Ensure all text is perfectly legible and correctly 
spelled."
```

**Physics-Accurate Scene Generation**  
The Gemini 3 backbone understands real-world physics before rendering:
```
"A wine glass being knocked off a marble kitchen counter, caught 
exactly at the moment it leaves the edge, liquid forming a perfect 
parabolic arc, surface tension breaking at the rim, photorealistic, 
high-speed photography aesthetic, 1/8000s shutter equivalent"
```

**Object Removal & Intelligent Inpainting**  
The Inpaint version uses semantic masking:
```
"Remove all tourists from this crowded Eiffel Tower plaza photograph 
and fill the empty spaces with logical continuations of the paving 
stones, shadows, and architectural elements. Match the exact 
lighting, perspective, and texture of the original."
```

**Complex Object Relationships**
```
"A molecular gastronomy plated dessert with a liquid nitrogen fog 
cloud just dissipating across the plate's surface, revealing five 
precisely arranged components. The plate is held at a slight tilt. 
Shallow depth of field focuses on the closest component — a 
chocolate sphere with a visible crack revealing luminescent golden 
liquid inside."
```

### Nano Banana Pro Prompting Best Practices (Google Official)

1. **Start with a strong action verb** — tells the model the primary operation: "Generate," "Create," "Render," "Transform," "Remove," "Add"
2. **Be specific about subject, lighting, composition** — concrete details outperform general descriptions
3. **Positive framing only** — describe what you want, not what you don't
4. **Use photographic and cinematic terms for camera control** — "low angle," "aerial view," "macro lens," "shallow depth of field"
5. **Iterate conversationally** — refine with follow-up prompts in dialogue form, don't always start from scratch
6. **Use the 4-element formula for image generation**: Subject + Action + Location + Style
7. **For editing**: always explicitly state what should remain unchanged

### Nano Banana Pro Use Cases by Category

**Brand Identity & Marketing:**
```
"Create a professional brand identity mockup for a premium 
cold-brew coffee brand called 'Meridian.' Show a matte black 
250ml can with a minimal geometric sun-and-horizon logo in gold. 
White background, studio lighting, 3/4 angle perspective, 
product photography aesthetic, sharp focus throughout."
```

**UI/UX Design Mockups:**
```
"Generate a high-fidelity mobile app screen mockup for a 
meditation app. Show an iPhone 15 Pro screen displaying a 
'Today's Session' card interface with soft gradients in deep 
navy and warm gold. Include a circular progress timer, session 
title typography, and a minimal bottom navigation bar with 
four icons. Clean, minimal design language."
```

**Architecture Visualization:**
```
"Render a photorealistic exterior visualization of a 
contemporary residential home. Single-story structure with 
floor-to-ceiling glazing across the front facade, Corten steel 
cladding, overhanging flat roof extending 2 meters. Late 
afternoon golden hour lighting from the left, long shadows 
across drought-resistant landscaping. Shot from a slightly 
elevated 3/4 angle, 35mm architectural photography aesthetic."
```

---

## 8. VEO 3.1: GOOGLE'S VIDEO GENERATION COMPLETE GUIDE

### What Veo 3.1 Is

Veo 3.1 is Google DeepMind's latest text-to-video generation model, representing a major generational leap over previous video AI tools. Available on Vertex AI, Google AI Studio, Google Flow, and through third-party platforms (Higgsfield, LTX Studio, ImagineArt, invideo).

As of April 2026, Veo 3.1 is **free for all personal Google accounts** through Google Vids (10 generations per month), with expanded access through Google AI Pro and Ultra subscriptions.

### Veo 3.1 Model Family (April 2026)

| Variant | Tier | Cost | Speed | Best For |
|---------|------|------|-------|---------|
| Veo 3.1 Consumer | Google Vids | Free (10/month) | Standard | Consumer creation, social media |
| Veo 3.1 Fast | Developer API | Higher cost | Fastest | High-volume integration |
| Veo 3.1 Lite | Developer API | <50% of Fast | Moderate | Cost-efficient production |
| Veo 3.1 Pro | Vertex AI | Enterprise | Variable | Enterprise production |

### Core Veo 3.1 Capabilities

- **High-fidelity video:** 720p or 1080p, 24fps
- **Variable clip length:** 4, 6, or 8 seconds per clip
- **Rich native audio:** Realistic synchronized sound — dialogue, sound effects, ambient noise, all from prompt
- **Complex scene comprehension:** Understands narrative structure, cinematographic style, character interaction
- **Image-to-video:** Animate a source image with prompt adherence and audio
- **Ingredients to video:** Consistent character/object/style references maintained across shots
- **First and last frame:** Generate natural transitions between defined start and end points
- **Add/remove objects:** Introduce or remove elements from video
- **Video extension:** Extend previously generated clips — chain 8-second blocks

### The Five-Part Veo 3.1 Prompt Formula

Every effective Veo 3.1 prompt follows this structure:

```
[Shot Composition] + [Subject Details] + [Action] + 
[Setting/Environment] + [Aesthetics/Mood]
```

**Optimal prompt length:** 3-6 sentences or 100-150 words.

**Full example:**
```
"Close-up with very shallow depth of field, a young woman's face, 
looking out a bus window at the passing city lights with her 
reflection faintly visible on the glass, inside a bus at night 
during a rainstorm, melancholic mood with cool blue tones, 
moody, cinematic."
```

### Audio Prompting in Veo 3.1

Audio is one of Veo 3.1's most powerful and distinctive features. Professional results require explicit audio direction.

**Audio elements you can specify:**

**Sound effects (SFX):**
```
"SFX: the sound of a ceramic coffee cup being placed firmly on 
a wooden table, liquid sloshing, followed by the scrape of a 
chair on tile floor"
```

**Ambient noise:**
```
"Ambient: the sounds of a Tokyo underground izakaya — low 
conversation murmur, occasional laughter, the sizzle of a 
yakitori grill, distant train announcement"
```

**Dialogue:**
```
"The man in the grey coat looks directly at the camera and says 
in a tired, low baritone: 'Three years. I've been waiting three 
years for this.' His breath mists slightly in the cold air."
```

**Music:**
```
"Background score: sparse piano, minor key, slow tempo — 
evoking loneliness and late-night urban environments"
```

**Combined audio structure:**
```
[Visual description]. [Audio:] [Dialogue: "exact words"]. 
[SFX: specific sounds]. [Ambient: background soundscape]. 
[Music: score description if needed].
```

**Voice characteristics to specify:**
- Tone: "weary," "urgent," "matter-of-fact," "cheerful"
- Delivery: "barely above a whisper," "clearly enunciated," "with a slight catch in the throat"
- Accent: "polished British accent," "Southern American," "neutral mid-Atlantic"

### Cinematographic Control in Veo 3.1

The cinematography layer of your prompt is described by Google's own documentation as "the most powerful tool for conveying tone and emotion."

**Camera movements:**
- Dolly shot / Dolly in / Dolly out
- Tracking shot (follows subject laterally)
- Crane shot (elevates or descends)
- Aerial view / Overhead shot
- Slow pan (left/right rotation from fixed position)
- Handheld (adds organic human movement)
- POV shot (first-person perspective)
- Whip pan (rapid 180° pan)

**Example:**
```
"Crane shot starting low on a lone hiker and ascending high above, 
revealing they are standing on the edge of a colossal, mist-filled 
canyon at sunrise, epic fantasy style, awe-inspiring, soft 
morning light."
```

**Composition vocabulary:**
- Wide shot / Establishing shot
- Medium shot / Medium close-up
- Close-up / Extreme close-up
- Low angle (camera below subject, creates power/imposing effect)
- Dutch angle (tilted camera, creates unease)
- Over-the-shoulder shot
- Two-shot (two subjects in frame)

**Lens and focus:**
- Shallow depth of field / Bokeh (subject sharp, background blurred)
- Wide-angle lens (environment prominent, perspective distortion)
- Macro lens (extreme close-up of small subjects)
- Deep focus (everything sharp from foreground to background)
- Soft focus (dreamlike quality)

### Veo 3.1 Advanced Workflows

**Workflow 1: The Dynamic Transition (First/Last Frame)**

*Combined with Nano Banana Pro:*

Step 1 — Generate starting frame with Nano Banana Pro:
```
"Medium shot of a female pop star singing passionately into a 
vintage microphone. She is on a dark stage, lit by a single, 
dramatic spotlight from the front. She has her eyes closed, 
capturing an emotional moment. Photorealistic, cinematic."
```

Step 2 — Generate ending frame with Nano Banana Pro:
```
[Different angle/lighting that will be the end state of the 
camera move — e.g., a wide shot from behind the audience 
looking toward the stage]
```

Step 3 — Feed both images to Veo 3.1 as first/last frame with transition prompt:
```
"Smooth 8-second camera pull from intimate close-up to majestic 
wide shot revealing the full concert venue, crowd becoming visible, 
the space expanding emotionally. Audio: crowd cheering slowly 
builds from silence to full roar."
```

**Workflow 2: Clip Chaining for Longer Sequences**

Because each clip is 4-8 seconds maximum, longer narratives require clip chaining:
1. Generate Hero Shot (reference: first key image)
2. Use last frame of Hero Shot as first frame of next clip
3. Maintain character reference images consistently
4. Match lighting specification across all clips
5. Audio: generate consistent ambient noise signature across clips

**Workflow 3: Image-to-Video Animation**

More consistent than pure text-to-video for character-heavy content:
1. Generate or source your reference frame (still image)
2. Prompt Veo 3.1 to animate it with motion description
3. Lock framing by using the image as the compositional anchor

```
"Animate this still photograph. The woman remains stationary, 
but a gentle wind catches her coat from the left, creating a 
slow billowing effect. Her hair lifts slightly. The background 
trees sway gently. Camera holds completely still. Ambient: 
distant wind through branches, birdsong."
```

### What Not to Do in Veo 3.1

**Don't describe abstract ideas** — Veo needs literal, physical descriptions.
```
WRONG: "Create a video that feels nostalgic and warm"
RIGHT: "A slow tracking shot through a cluttered childhood bedroom, 
late afternoon sun through dusty curtains, worn action figures 
on the windowsill, faded photographs pinned to a corkboard"
```

**Don't try to pack multiple dominant actions in one clip**
```
WRONG: "A man walks down the street, stops, notices something, 
turns to look, starts running, trips, and gets up"
RIGHT: Generate each beat as a separate 4-8 second clip
```

**Don't use exact numbers for objects**
```
WRONG: "five people standing in a row"
RIGHT: "a small group of people standing together"
```
Most AI models process visuals, not math — exact counts frequently produce geometry errors.

**Don't ignore Negative Prompting for period/style accuracy**
```
After main prompt: "Negative: no sci-fi elements, no modern 
technology, no anachronistic props or costumes"
```

---

## 9. GOOGLE FLOW: THE AI FILMMAKING SUITE COMPLETE GUIDE

### What Google Flow Is

Google Flow is a browser-based AI filmmaking studio unveiled at Google I/O 2025. It is built on three Google AI models working together:
- **Veo 3.1** — Video generation
- **Nano Banana Pro (Imagen 4 family)** — Image generation and character/scene creation
- **Gemini** — Natural language processing, prompt refinement, brainstorming

Flow is designed explicitly "with and for creatives" — it is not a developer API but a filmmaker-facing creative tool. It is the evolution of the earlier VideoFX experiment.

**Access:** Available through Google AI Pro ($20/month), Google AI Ultra ($249.99/month). As of April 2026, available in the US; global rollout ongoing. AI Ultra provides earliest access to experimental models.

### Flow's Core Workflow Architecture

```
PRE-PRODUCTION
Ingredients (Character + Object + Scene refs)
        ↓
SCENE GENERATION
Prompt → Veo 3.1 → Video clips
        ↓
SCENE ASSEMBLY
SceneBuilder (storyboard assembly)
        ↓
SEQUENCE EXTENSION  
Extend clips, Jump-To transitions
        ↓
EXPORT
MP4 at 720p or 1080p, 24fps
```

### The Ingredients System

Ingredients are the equivalent of locked reference assets in a production pipeline. Before generating any footage:

1. **Create each ingredient** using Imagen (Nano Banana Pro) from text or uploaded images
2. **Tag each ingredient** with a consistent name
3. **Reference ingredients** in video prompts — they persist their visual identity across all shots

**Ingredient types:**
- Characters (people, creatures, avatars)
- Objects (props, products, vehicles)
- Scenes/Locations (interior rooms, exterior environments)
- Style references (visual aesthetic anchors)

**Ingredients to Video** mode (Ultra subscribers): Combine up to 3 ingredients simultaneously in a single video generation prompt.

### Prompt Architecture for Google Flow

**The official Google 5-element prompt framework for Flow:**

1. **Subject and action:** Who/what + what they're doing
2. **Composition and camera motion:** Shot type + camera direction
3. **Location and lighting:** Environment description + lighting character
4. **Alternative styles:** Animation styles, visual aesthetics
5. **Audio and dialogue:** Sound design direction

**Google's Gemini-assisted prompt template for Flow:**
```
"You are the world's most intuitive visual communicator and expert 
prompt engineer. You possess a deep understanding of cinematic 
language, narrative structure, emotional resonance, the critical 
concept of filmic coverage and the specific capabilities of 
Google's Veo AI model. Your mission is to transform my conceptual 
ideas into meticulously crafted, narrative-style text-to-video 
prompts that are visually breathtaking and technically precise 
for Veo."
```
This Gemini meta-prompt can be used as a pre-processing step to improve your raw ideas before they become Veo prompts.

### SceneBuilder: Assembling Your Film

SceneBuilder is Flow's internal storyboard — clips assembled into a complete narrative with:
- **Jump To:** Transition a character to a new setting while preserving their appearance
- **Extend:** Seamlessly extend a clip's action or transition to what happens next
- **Continuous motion:** Link clips with smooth continuity

**Jump To** is the critical consistency tool. Lock character and scene details with Jump To before moving to a new location, to ensure all later regenerations don't break visual continuity.

### Flow-Specific Prompting Tips (From Official Google Guide)

**Tip 1: Don't name a location; paint a picture**
```
WRONG: "a room"
RIGHT: "a dusty attic filled with forgotten treasures, a single 
beam of afternoon light cutting through a grimy window, 
cardboard boxes stacked high, a child's red tricycle in 
the corner"
```

**Tip 2: Use Gemini to refine prompts for scene consistency**
When generating multiple clips that need consistency, explicitly tell Gemini to repeat all essential details from prior prompts. Without this instruction, it will rewrite descriptions and break visual continuity.

**Tip 3: Audio first planning**
Decide whether you're using Veo 3 native audio (for atmospheric and dialogue-driven content) or replacing it in your NLE (for scenes with music). This shapes how you write your audio direction.

**Tip 4: Use Flow TV for reverse-engineered inspiration**
Flow TV is an ever-growing showcase of clips with their exact generating prompts visible. It is effectively the best prompt library available for Flow. Browse channels, find a look you want, copy the prompt structure.

**Tip 5: Extend rather than regenerate**
Always try extending a good clip before starting over. Extension maintains the established visual logic. Starting fresh with a modified prompt often breaks consistency.

### Camera Controls in Flow

Flow exposes 13 granular camera control sliders in the timeline:
- Zoom in/out
- Pan left/right
- Dolly forward/backward
- Roll (Dutch angle)

Pro tip from the Flow community: hover the copy-bar to grab a preset and paste camera values across multiple clips for consistent motion matching.

---

## 10. GOOGLE AI STUDIO: DEVELOPER-FACING CREATIVE SUITE

### What Google AI Studio Provides

Google AI Studio is the developer-facing access portal for Google's generative models. For creatives, it provides API-level access to:
- **Nano Banana 2** (Gemini 3.1 Flash Image) — image generation at developer tier
- **Veo 3.1** — video generation via API
- Full model testing environment without production commitments

**Access:** Available at aistudio.google.com; free tier available with usage limits.

### AI Studio for Image Generation Testing

Google AI Studio is the recommended platform for:
- Testing Nano Banana Pro/2 prompts before committing to production
- Building image generation into custom applications
- Experimenting with multimodal inputs (text + image combinations)
- Prototyping infographic and document generation workflows

The conversational interface makes it ideal for the iterative editing workflows that Nano Banana Pro is designed for — you can refine an image across multiple messages in a single session.

### Practical AI Studio Workflow

1. Start with a comprehensive text-to-image prompt (Framework 1 from Nano Banana guide)
2. Upload reference images alongside your prompt text
3. Receive initial generation, assess, then send follow-up instruction
4. Iterate: "Keep the same composition but change the lighting to dramatic side-lighting from the left"
5. Extract final prompt text to use in production-grade workflows

---

## 11. THE CINEMATOGRAPHY VOCABULARY EVERY PROMPTER MUST KNOW

Using this vocabulary correctly unlocks dramatically better results from all platforms — especially Veo 3.1, Higgsfield, and Google Flow.

### Shot Types

| Shot | Abbreviation | Description | When to Use |
|------|-------------|-------------|-------------|
| Extreme Long Shot | ELS | Subject tiny in vast environment | Isolation, scale, world-building |
| Long Shot | LS | Full body visible, environment prominent | Character in context |
| Medium Long Shot | MLS | Subject from knees up | Character and environment balanced |
| Medium Shot | MS | Subject from waist up | Conversation, standard human interaction |
| Medium Close-Up | MCU | Subject from chest up | Emotionally intimate conversation |
| Close-Up | CU | Face fills most of frame | Emotional intensity, reaction |
| Extreme Close-Up | ECU | Single feature (eye, lips, hands) | Detail, tension, significance |
| Two Shot | 2S | Two subjects in frame | Relationship, conversation |
| Over-the-Shoulder | OTS | Subject framed past another's shoulder | Dialogue, conversation |
| Point-of-View | POV | Camera as subject's eyes | Immersion, character perspective |
| Establishing Shot | ES | Wide shot introducing location | Scene setting, geography |

### Camera Movements

| Movement | Description | Emotional Effect |
|---------|-------------|-----------------|
| Dolly in | Camera moves physically toward subject | Intensification, revelation, tension |
| Dolly out | Camera moves physically away from subject | Isolation, ending, revelation of scale |
| Pan left/right | Camera rotates horizontally on fixed axis | Surveying, following, establishing geography |
| Tilt up/down | Camera rotates vertically on fixed axis | Grandeur (up), revelation (down) |
| Crane up | Camera rises on mechanical arm | Rising above, god's eye, epiphany |
| Crane down | Camera descends on mechanical arm | Descending into scene, intimacy |
| Tracking shot | Camera moves parallel to subject | Character in motion, journeying |
| Handheld | Camera with organic human wobble | Realism, urgency, documentary feel |
| Steadicam | Smooth gliding forward movement | Observational, following, dreamlike |
| Whip pan | Extremely rapid pan | Energy, cuts between moments |
| Push in | Slow dolly combined with slight zoom | Increasing tension, focus |
| Drone aerial | Bird's-eye from above | Scale, surveillance, god's eye |
| FPV drone | First-person view drone | Speed, disorientation, dynamic |
| Jib shot | Horizontal sweep, often with arc | Cinema-grade, sweeping drama |

### Lighting Vocabulary

| Term | Description | Mood/Use |
|------|-------------|---------|
| Golden hour | Warm, directional light just after sunrise or before sunset | Warmth, nostalgia, beauty |
| Blue hour | Soft blue twilight just before sunrise or after sunset | Melancholy, romance, transition |
| Harsh noon sun | Hard, overhead, shadowless | Alienation, brutality, heat |
| Rembrandt lighting | Triangle of light under one eye | Classical portraiture, dignity |
| Chiaroscuro | Extreme contrast, deep shadows | Drama, mystery, danger |
| Soft box lighting | Diffuse, even studio lighting | Commercial, clean, flattering |
| Practical lighting | Light from visible source in scene (lamps, screens) | Realism, intimacy, warm |
| Motivated lighting | Light that has a logical source in scene | Believability |
| Volumetric lighting | Visible light rays in dust/fog/smoke | Drama, mysticism, cinematic |
| Silhouette lighting | Subject backlit, no detail visible | Mystery, iconic, minimalism |
| Neon lighting | Colored artificial light, urban | Cyberpunk, night scenes, mood |
| Firelight | Flickering warm orange | Primitive, intimate, ancient |
| Fluorescent | Cold, clinical, harsh | Institutional, horror, alienation |
| Moonlight | Cool blue, low intensity | Noir, night exterior, romance |

### Film Stock and Technical Aesthetics

| Reference | Description |
|-----------|-------------|
| 35mm film | Standard cinema grain, rich tones, slight vignette |
| 16mm film | Heavier grain, slightly muted colors, documentary aesthetic |
| Medium format | Ultra-sharp, shallow depth of field, rich tones |
| 8mm film | Very heavy grain, color shift, lo-fi nostalgia |
| IMAX | Hyper-sharp, no grain, pristine |
| Anamorphic widescreen | Horizontal lens flares, oval bokeh, cinemascope ratio |
| Kodak Porta | Rich golden tones, film grain, portrait photography |
| Fuji Velvia | High saturation, punchy colors, landscape photography |
| Kodak Tri-X | Black and white, high contrast, photojournalism |
| Technical camera descriptions | "shot on Sony Venice," "Arri Alexa Mini LF," "RED Dragon" |

---

## 12. THE PHOTOGRAPHY VOCABULARY FOR IMAGE GENERATION

### Lens Specifications

| Lens | Field of View | Characteristics | Use in Prompts |
|------|--------------|----------------|---------------|
| 14mm | Ultra-wide | Heavy distortion, everything sharp | Architecture, landscapes, cramped spaces |
| 24mm | Wide | Slight distortion, environmental | Reportage, environmental portraits |
| 35mm | Slightly wide | Natural perspective, versatile | Street photography, documentary |
| 50mm | "Normal" | Closest to human eye | Portraits, everyday scenes |
| 85mm | Short telephoto | Flattering portraits, compression | Fashion, beauty portraiture |
| 135mm | Medium tele | Strong background compression | Portraits, sports |
| 200mm+ | Telephoto | Heavy compression, narrow view | Wildlife, compressed urban |
| Macro | 1:1 ratio | Extreme close-up | Product, insect, texture |
| Tilt-shift | Selective focus plane | Miniature effect or architectural correction | Architecture, creative |

### Depth of Field

- **Shallow depth of field / f/1.4 - f/2.8:** Subject sharp, background soft bokeh — isolation, portraiture
- **Mid depth / f/4 - f/8:** Subject and near environment sharp — balanced photography
- **Deep depth / f/11 - f/22:** Everything front to back sharp — landscape, architecture
- **Bokeh:** The quality and shape of out-of-focus areas

### Exposure and Contrast

- **High key:** Bright, light tones, minimal shadows — joyful, commercial, clean
- **Low key:** Dark, moody, deep shadows — drama, mystery, horror
- **High contrast:** Extreme brights and darks, crushed midtones — graphic, intense
- **Low contrast:** Compressed range, hazy — dreamy, nostalgic, foggy
- **Exposed for highlights:** Shadows very dark, preserving bright details
- **Exposed for shadows:** Highlights may blow out, shadow detail preserved

---

## 13. MASTER PROMPT FORMULAS & TEMPLATES

### Universal Formula (Works on All Platforms)

```
[Shot/Framing] + [Subject + Appearance] + [Action] + 
[Environment + Time] + [Lighting] + [Lens/Camera] + 
[Style/Aesthetic] + [Mood/Atmosphere]
```

### Cinematic Portrait (All Platforms)

```
[Close-up / medium close-up] of [subject description — age, 
appearance, clothing], [expression or micro-action — "eyes 
scanning the middle distance"], [environment — blurred or 
rendered], [specific lighting — direction, quality, color], 
[camera — "shot on 85mm, f/1.8, slight film grain"], 
[aesthetic — "editorial fashion photography"], [mood].
```

**Example:**
```
"Medium close-up of a 40-year-old woman in a weathered 
expedition jacket, grey-streaked hair pulled back, expression 
focused and calm. Standing at the edge of a fjord at dusk, 
horizon fog bank behind her. Low amber sidelight from the setting 
sun catching her left cheekbone, deep shadows on the right. Shot 
on a 85mm lens at f/2.0, subtle film grain, desaturated blues and 
warm golds. Documentary portrait aesthetic — dignified, resilient."
```

### Product Photography Formula

```
[Product name/type] on [surface material], [environment], 
[lighting setup — softbox, natural, dramatic], [angle — 3/4, 
frontal, overhead], [styling elements — props, context], 
[color palette], product photography, commercial, [technical 
specs]
```

**Example:**
```
"Matte black coffee thermos on a rough oak cutting board, misty 
mountain forest visible through floor-to-ceiling glass behind it. 
Single large softbox from the left, slight natural fill from 
the window. 3/4 angle, slightly elevated. A single coffee bean 
and a sprig of pine needle placed deliberately beside it. 
Muted forest greens and warm charcoal palette. Commercial product 
photography, medium-format aesthetic, very shallow depth of field."
```

### Fashion Editorial Formula

```
[Subject description + styling], [pose and action], 
[environment/backdrop], [lighting — quality and direction], 
[editorial style reference], [camera], [mood], 
[aspect ratio for intended platform]
```

### Architectural / Interior Formula

```
[Interior/Exterior] [space type and architectural style], 
[spatial description — "high ceilings, concrete floors, 
exposed steel beams"], [key design elements], 
[lighting — natural or artificial, time of day], 
[camera angle — "from a low angle looking toward"], 
[style — "architectural photography, Dezeen-level quality"], 
[no people / lifestyle context]
```

### Video/Cinematic Scene Formula (Veo / Higgsfield)

```
[Camera movement and starting position]. [Subject description 
and action]. [Environment — staging and atmosphere]. 
[Lighting quality and direction]. [Cinematographic style]. 
[Audio:] [Dialogue/SFX/Ambient]. [Mood and intended emotional 
response].
```

---

## 14. ADVANCED WORKFLOWS & MULTI-TOOL PIPELINES

### The Complete AI Film Short Workflow (Higgsfield + Veo + Nano Banana)

**Stage 1: Pre-Production**
1. Write your 3-5 shot script in plain language
2. Identify all characters and locations needed
3. Generate character reference sheets (Nano Banana Pro / Higgsfield Popcorn)
4. Generate location reference sheets (Nano Banana Pro)
5. Train Soul ID for each character (Higgsfield)
6. Build ingredient library (Google Flow alternative)

**Stage 2: Storyboard / Keyframe Generation**
1. For each shot, generate a keyframe image (Popcorn or Nano Banana Pro)
2. Specify exact framing, lighting, character position
3. Review for consistency with reference sheets
4. Lock keyframes that successfully match vision

**Stage 3: Scene Generation**
1. Use locked keyframes as first-frame references
2. Write motion prompt (separate from image prompt)
3. Generate 4-8 second clips
4. Generate audio simultaneously where applicable

**Stage 4: Assembly**
1. Import clips into SceneBuilder (Flow) or NLE (Premiere, DaVinci Resolve)
2. Use Jump To for location changes
3. Use clip extension for pace control
4. Replace or mix AI audio with original sound design

**Stage 5: Iteration**
1. Move one variable at a time between iterations
2. Keep character reference images consistent
3. Lock aspect ratio and camera language across the project
4. Use consistent seed for minor variations; change seed when stuck

### The Midjourney → Veo 3.1 Pipeline

1. Generate character/scene in Midjourney V7 (high-quality reference image)
2. Use `--oref` to iterate and get the exact look needed
3. Export final image to Veo 3.1 image-to-video
4. Prompt motion on top of the stable visual foundation
5. Result: Midjourney's visual quality + Veo's cinematic motion

### The Nano Banana Pro → Higgsfield Pipeline

As documented in official Higgsfield blog:
1. Generate scene keyframe in Nano Banana Pro (on Higgsfield or AI Studio)
2. Use keyframe as visual anchor — it becomes locked
3. Apply Seedance or Kling 3.0 on top of it for motion
4. The rain, camera, and character move, but framing, light, and mood stay locked
5. Result: "Higgsfield AI video prompts that look directed instead of generated"

---

## 15. COMMUNITY INSIGHTS: REDDIT, X.COM, THREADS, SUBSTACK

### Key Reddit Communities

**r/midjourney** — 2.5M+ members, the central hub for Midjourney prompt sharing. Top threads share exact prompts with output comparisons. Best practice: search for your subject matter + "prompt" to find tested formulas.

**r/StableDiffusion** — 500k+ members, highly technical, best for workflow automation and open-source tooling.

**r/AIArt** — Broad generative art community across all platforms.

**r/aipromptprogramming** — Focused specifically on prompt engineering techniques.

**r/generativeAI** — News and announcements, model comparisons.

### Key Reddit Community Insights (Most Upvoted, 2025)

**On V7 prompting (2,100 upvotes):**
"I spent a year using V5 prompts on V6 and wondering why results were inconsistent. V6 wants natural language, not keyword lists. Writing it like a photography brief changed everything."
— u/photoreal_mj

**On design briefs vs. image descriptions (1,800 upvotes):**
"I've used Midjourney for client work for 18 months. The single biggest shift was treating prompts like design briefs rather than image descriptions. Specify the platform, the audience, and what the visual has to communicate. The output is completely different."
— u/design_director_sg

**On style specificity (from multiple top threads):**
"Style-focused prompts produce the most consistent output when you reference a specific artistic tradition, technique, or visual medium rather than a general adjective like 'artistic.' Saying 'impressionist oil painting with visible brushstrokes' produces far more consistent results than 'artistic painting.'"

**On iteration (consistently upvoted advice):**
"Change one thing at a time. I've tested everything. Change camera angle, then iterate. Change lighting, then iterate. Changing three things at once teaches you nothing about what worked."

**On reference images (3,400 upvotes):**
"Using text and image references together boosts art fidelity by 3.8x. Midjourney v7 with agentic chains achieves 91.2% consistency rates when you use image prompts alongside your text."

### Key Insights From Top Creator Communities

**The 4 C's Framework** (widely shared across creator communities):
- **Creativity:** Your original idea
- **Context:** The setting, purpose, and audience
- **Constraints:** What the model must NOT do
- **Clarity:** Precise language that leaves no room for misinterpretation

**The Photography Brief Method:**  
Treat every prompt like you're briefing a photographer. Include:
- Subject (who/what)
- Location (where)
- Time of day (lighting)
- Camera/lens (technical)
- Mood (emotional intent)
- Platform (social media? print? video? affects composition)

**The Community Research Finding on Iteration Time:**
56.3% of AI art users iterate their prompts 5-10 times per image, spending an average of 47 minutes per final output. Structured prompt frameworks reduce this to under 15 minutes.

### Prompt Communities and Resources

- **PromptBase** — Marketplace for professional prompts
- **PromptHero** — Community prompt library and showcase
- **PromptDen** — Community for prompt sharing across MidJourney, Stable Diffusion, ChatGPT
- **PromptZone** — Technical prompt engineering community
- **Higgsfield Discord** — Official community (#flow channel)
- **Flow TV** — Google's built-in prompt showcase library

---

## 16. PLATFORM COMPARISON: WHEN TO USE WHICH TOOL

| Task | Best Tool | Why |
|------|-----------|-----|
| Photorealistic portrait | Midjourney V7 `--style raw` | Best-in-class photorealism with `--oref` for consistency |
| Consistent character across scenes | Higgsfield Soul ID + Cinema Studio | Built for exactly this — 95% identity preservation |
| Accurate text in image | Nano Banana Pro | Gemini 3 reasoning eliminates gibberish text |
| Physics-accurate scene | Nano Banana Pro | Simulates gravity and causal logic before rendering |
| Cinematic video with native audio | Veo 3.1 | Best in class; 1080p + synchronized dialogue/SFX |
| AI short film production | Higgsfield + Google Flow | Complete production pipeline |
| Brand identity / product mockup | Nano Banana Pro | Precision control, 4K, legible text |
| Anime/manga art | Midjourney Niji 7 | Dedicated model, superior coherence |
| Infographics/UI mockups | Nano Banana Pro | Spatial understanding, layout, typography |
| Stylized artistic images | Midjourney V7/V8 | Unmatched creative interpretation |
| Fast iteration/concept testing | Midjourney Draft Mode | 10x faster, half cost |
| Video with camera motion control | Higgsfield WAN 2.5 or Cinema Studio | Multi-axis camera control |
| Social media short-form video | Veo 3.1 (Google Vids free tier) | Free access, quality output |
| Developer/API integration | Nano Banana 2 (Vertex AI) / Veo 3.1 API | Production API access |

---

## 17. CASE STUDIES: REAL PROMPTS, REAL RESULTS

### Case Study 1: Cinematic Car Chase Sequence (Higgsfield)

**Platform:** Higgsfield (Sora 2 + Popcorn + Seedance)

**Phase 1 — Reference Image (Popcorn):**
```
"Cinematic in-car sequence — the camera is mounted on the 
dashboard, focused on a middle-aged woman driving calmly down 
a sunlit highway. For the first two seconds, she glances to the 
left with a soft expression, speaking briefly to her husband in 
the passenger seat. Suddenly, something outside catches her eye — 
she looks sharply to the left, her face freezes in terror. Her 
breathing quickens, and she jerks the steering wheel, the car 
swerving violently from side to side. The camera shakes with the 
impact, motion blur intensifies, and sunlight flickers across her 
face as she loses control. Handheld realism, shallow depth of 
field, dynamic reflections, cinematic tension and emotional panic."
```

**Phase 2 — Video Generation (Sora 2):**
```
"A single continuous cinematic shot — bright midday sun overhead, 
harsh light casting sharp shadows on the asphalt. The camera is 
mounted on a tracking rig low to the ground, following a speeding 
sedan as it tears down an empty highway. The air shimmers with 
heat, mirage waves visible over the road. Suddenly, the car 
veers slightly — the front tire catches a rough patch of asphalt. 
The camera keeps moving in one smooth shot as the vehicle lurches, 
tilts, and then flips violently through the air. Dust, glass, and 
metal fragments scatter across the frame. The sun flares in the 
lens as the car rotates midair, roof-first toward the ground. 
The impact hits hard — sparks, smoke, debris flying — but the 
camera keeps rolling, steady, capturing the full motion until 
the car skids upside down to a stop in the middle of the road."
```

**Outcome:** Cinematic action sequence demonstrating that highly specific, storyboard-level descriptions produce professional-grade video.

### Case Study 2: Fashion Editorial (Midjourney V7)

**Platform:** Midjourney V7

**Prompt:**
```
"Editorial fashion portrait of a 28-year-old woman of South Asian 
heritage in a structural black wool coat, standing in an abandoned 
industrial warehouse, natural overcast light through massive 
skylights above, filling the space evenly with cool, flat daylight. 
Her gaze is direct, shoulders squared, subtle defiance in the 
expression. Shot on a Hasselblad 500 with an 80mm lens, medium-
format film, pronounced grain, high contrast, slight blue-grey 
tint to the shadows. Vogue editorial aesthetic, 2024 fashion week 
energy --ar 4:5 --style raw --s 150 --oref [uploaded reference 
of the coat]"
```

**Key decisions:**
- `--style raw` to minimize Midjourney's default softening
- `--s 150` balanced range — some artistic interpretation but not overwhelming
- `--ar 4:5` for Instagram portrait format
- `--oref` to maintain the coat's exact design

### Case Study 3: Brand Product Video (Veo 3.1 + Nano Banana Pro)

**Brief:** 8-second premium coffee brand video for Instagram Reels

**Step 1 — Reference Frame (Nano Banana Pro):**
```
"Studio product photography of a matte black specialty coffee 
bag on a dark marble surface. Single dramatic key light from 
45° left, casting a long shadow across the marble. Gold 
letterpress brand name visible on the bag. Coffee beans scattered 
on the marble surface. Dark, premium, minimal. Shot on a Phase One 
medium-format camera."
```

**Step 2 — Video Generation (Veo 3.1):**
```
"Slow dolly-in toward a premium coffee package on a dark marble 
surface, starting wide and ending in a tight medium shot of the 
brand name. Steam rises slowly from a nearby espresso cup in the 
shallow background. Light catches the gold letterpress lettering 
as the camera pushes forward. Studio lighting — single dramatic 
key light from the left, long marble shadows.

Audio: Very subtle ambient coffee shop sounds in the far 
background. At 5 seconds in, a quiet, satisfying espresso 
pour sound begins — liquid on ceramic. Understated, premium. 
No music. No voiceover."
```

**Outcome:** Documented 30-40% uplift in user retention for similar Veo 3.1 video content (from Pocket FM testimonial in Google documentation).

### Case Study 4: Nano Banana Pro — Complete Product Document

**Brief:** Create a comprehensive one-page guide as an image

**Prompt:**
```
"Top header: Massive bold condensed title 'THE COMPLETE GUIDE 
TO HUMAN PRODUCTIVITY SYSTEMS — 2025 EDITION' with a light 
serif subtitle describing it as a breakdown of principles, 
workflows, behavioral triggers, and optimization cycles.

Section 1 — The Core Framework: Include a left-column 
geometric-sans title 'THE 4-PILLAR MODEL' and right-column 
pillars:
- Clarity (define priorities, workflows, boundaries)
- Execution (reduce friction, focus intervals, micro-sprints)
- Review (end-of-day reflection, adjust plan)
- Growth (skill development and system adaptation)

Add minimalist line icons (target, checklist, clock, graph). 
Use a professional dark navy background with white and gold 
typography. Section dividers as thin gold rules. Layout: two 
columns, generous whitespace, dense but scannable. Print-ready 
quality, 4K resolution."
```

**Notable:** This kind of prompt would have been completely impossible on Midjourney or Stable Diffusion in any earlier generation — text rendering alone would have failed. Nano Banana Pro handles it because Gemini 3 understands the semantic content, not just visual patterns.

---

## 18. THE ITERATION FRAMEWORK: FROM DRAFT TO MASTERPIECE

### The Professional Iteration Sequence

The community consensus and official documentation across all platforms point to the same iterative process:

**Pass 1 — Concept Pass (Draft Mode / Free Tier)**
- Use the fastest/cheapest generation mode
- Establish that your core concept works at all
- Don't invest in detail before validating the direction

**Pass 2 — Composition Pass**
- Lock your framing and camera angle
- Reference image for composition if needed
- Don't change subject or style until composition is right

**Pass 3 — Style Pass**
- Introduce your style parameters, aesthetic references
- Test `--stylize` values if using Midjourney
- Iterate on the look without touching the composition

**Pass 4 — Lighting Pass**
- Refine your lighting description specifically
- Lighting is the highest-ROI single element to perfect

**Pass 5 — Detail Pass**
- Specific material, texture, expression refinements
- Use Vary Region (Midjourney) or Inpaint (Nano Banana) for precision editing
- Fine-tune individual elements without regenerating the whole

**Pass 6 — Production Pass**
- Standard mode / highest quality generation
- Upscale
- Export at production resolution

### The One-Variable Rule

"Move one variable at a time between iterations (e.g., adjust camera OR lighting, not both)."
— Consistent across Google Flow documentation, Higgsfield guides, and top Reddit threads.

If you change multiple elements at once and the output improves, you will never know which change produced the improvement. If the output worsens, you won't know which change caused it. Systematic iteration means learning as fast as possible.

### Your Iteration Notebook

Professional AI creators keep a living document tracking:
- Prompts that worked (with exact parameter values)
- Prompts that failed and why
- Platform-specific vocabulary that reliably produces certain results
- Seed values for looks worth reproducing
- Reference image links organized by category

This prompt library becomes a proprietary creative asset — some creators sell their most effective prompts on PromptBase for significant income.

---

## QUICK REFERENCE: PLATFORM CHEAT SHEETS

### Midjourney V7 Quick Reference

```
/imagine [prompt] [parameters]

KEY PARAMETERS:
--ar 16:9        Aspect ratio
--v 7            Model version
--style raw      Photorealism mode
--s 0-1000       Stylization (0=raw, 1000=artistic)
--chaos 0-100    Variation
--oref [url]     Omni/subject reference
--sref [url]     Style reference
--no [element]   Exclude element
--seed [n]       Reproducibility
--mode draft     10x faster iteration
```

### Nano Banana Pro Quick Reference

```
FORMULA: [Subject] + [Action] + [Location] + [Composition] + [Style]

KEY STRENGTHS: Text rendering, physics, 4K, up to 14 reference images
EDIT MODE: Describe changes conversationally — no masking tool needed
ASPECT RATIOS: All standard ratios + panoramic (1:4, 4:1)
TRIGGER VERB: Start every prompt with a strong action verb
```

### Veo 3.1 Quick Reference

```
FORMULA: [Shot] + [Subject] + [Action] + [Setting] + [Aesthetic]
OPTIMAL LENGTH: 3-6 sentences / 100-150 words
CLIP LENGTHS: 4s, 6s, or 8s per clip
AUDIO: Specify separately — Dialogue: "..." / SFX: ... / Ambient: ...
REFERENCE IMAGES: Up to 3 per generation
RESOLUTION: 720p or 1080p, 24fps
```

### Higgsfield Quick Reference

```
THREE-LAYER SYSTEM:
1. Image Layer (Popcorn/Nano Banana) → Lock visuals
2. Identity Layer (Soul ID) → Lock character
3. Motion Layer (Seedance/Kling/Veo) → Add movement

SHORT PROMPTS OUTPERFORM LONG PROMPTS in Higgsfield
Separate camera, character, and motion into different instruction sets
```

### Google Flow Quick Reference

```
WORKFLOW: Ingredients → Clips → SceneBuilder → Export
MODELS: Veo 3.1 (video) + Nano Banana Pro (image) + Gemini (language)
CONSISTENCY TOOL: Jump To — lock character before changing scene
CAMERA CONTROLS: 13 granular timeline sliders
LEARN FROM: Flow TV — browse prompts behind real clips
```

---

*This guide was compiled from official platform documentation, community research across Reddit, X.com, Substack, and Discord communities, and direct platform testing. It represents best practices as of April 2026. All platforms are under active development — check official documentation for the latest model specifications and feature availability.*

*Sources: Google Cloud Blog (cloud.google.com/blog), Higgsfield AI Blog (higgsfield.ai/blog), Google Flow Help (support.google.com/flow), Google DeepMind Veo Documentation, Midjourney Official Docs (docs.midjourney.com), blakecrosley.com/guides/midjourney, r/midjourney, r/StableDiffusion, Segmind Blog, LTX Studio Blog, ImagineArt Blog, fal.ai, invideo.io, DreamHost Blog.*
