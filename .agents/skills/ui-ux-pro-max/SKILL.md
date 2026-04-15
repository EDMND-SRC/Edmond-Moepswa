---
name: ui-ux-pro-max
description: Comprehensive design guide for web and mobile applications with styles, color palettes, font pairings, UX guidelines, and tech stack recommendations.
---

# ui-ux-pro-max

# Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## How to Use This Skill

Use this skill when the user requests any of the following:

| Scenario | Trigger Examples | Start From |
|----------|-----------------|------------|
| **New project / page** | "做一个 landing page"、"Build a dashboard" | Step 1 → Step 2 (design system) |
| **New component** | "Create a pricing card"、"Add a modal" | Step 3 (domain search: style, ux) |
| **Choose style / color / font** | "What style fits a fintech app?"、"推荐配色" | Step 2 (design system) |
| **Review existing UI** | "Review this page for UX issues"、"检查无障碍" | Quick Reference checklist above |
| **Fix a UI bug** | "Button hover is broken"、"Layout shifts on load" | Quick Reference → relevant section |
| **Improve / optimize** | "Make this faster"、"Improve mobile experience" | Step 3 (domain search: ux, react) |
| **Implement dark mode** | "Add dark mode support" | Step 3 (domain: style "dark mode") |
| **Add charts / data viz** | "Add an analytics dashboard chart" | Step 3 (domain: chart) |
| **Stack best practices** | "React performance tips"、"SwiftUI navigation" | Step 4 (stack search) |

Follow this workflow:

### Step 1: Analyze User Requirements

Extract key information from user request:
- **Product type**: Entertainment (social, video, music, gaming), Tool (scanner, editor, converter), Productivity (task manager, notes, calendar), or hybrid
- **Target audience**: C-end consumer users; consider age group, usage context (commute, leisure, work)
- **Style keywords**: playful, vibrant, minimal, dark mode, content-first, immersive, etc.
- **Stack**: Check project context

### Step 2: Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations with reasoning:

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

This command:
1. Searches domains in parallel (product, style, color, landing, typography)
2. Applies reasoning rules from `ui-reasoning.csv` to select best matches
3. Returns complete design system: pattern, style, colors, typography, effects
4. Includes anti-patterns to avoid

**Example:**
```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

### Step 2b: Persist Design System (Master + Overrides Pattern)

To save the design system for **hierarchical retrieval across sessions**, add `--persist`:

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

This creates:
- `design-system/MASTER.md` — Global Source of Truth with all design rules
- `design-system/pages/` — Folder for page-specific overrides

**With page-specific override:**
```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

This also creates:
- `design-system/pages/dashboard.md` — Page-specific deviations from Master

**How hierarchical retrieval works:**
1. When building a specific page (e.g., "Checkout"), first check `design-system/pages/checkout.md`
2. If the page file exists, its rules **override** the Master file
3. If not, use `design-system/MASTER.md` exclusively

**Context-aware retrieval prompt:**
```
I am building the [Page Name] page. Please read design-system/MASTER.md.
Also check if design-system/pages/[page-name].md exists.
If the page file exists, prioritize its rules.
If not, use the Master rules exclusively.
Now, generate the code...
```

### Step 3: Supplement with Detailed Searches (as needed)

After getting the design system, use domain searches to get additional details:

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**When to use detailed searches:**

| Need | Domain | Example |
|------|--------|---------|
| Product type patterns | `product` | `--domain product "entertainment social"` |
| More style options | `style` | `--domain style "glassmorphism dark"` |
| Color palettes | `color` | `--domain color "entertainment vibrant"` |
| Font pairings | `typography` | `--domain typography "playful modern"` |
| Chart recommendations | `chart` | `--domain chart "real-time dashboard"` |
| UX best practices | `ux` | `--domain ux "animation accessibility"` |
| Landing structure | `landing` | `--domain landing "hero social-proof"` |
| Stack-specific perf | `<stack>` | `--stack react "rerender memo list"` |

### Step 4: Stack Guidelines

Get stack-specific implementation guidelines:

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

Available stacks: `html-tailwind`, `react`, `nextjs`, `vue`, `nuxtjs`, `nuxt-ui`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`, `angular`, `laravel`

---

## Search Reference

### Available Domains

| Domain | Use For | Example Keywords |
|--------|---------|------------------|
| `product` | Product type recommendations | SaaS, e-commerce, portfolio, healthcare, beauty, service |
| `style` | UI styles, colors, effects | glassmorphism, minimalism, dark mode, brutalism |
| `typography` | Font pairings, Google Fonts | elegant, playful, professional, modern |
| `color` | Color palettes by product type | saas, ecommerce, healthcare, beauty, fintech, service |
| `landing` | Page structure, CTA strategies | hero, hero-centric, testimonial, pricing, social-proof |
| `chart` | Chart types, library recommendations | trend, comparison, timeline, funnel, pie |
| `ux` | Best practices, anti-patterns | animation, accessibility, z-index, loading |
| `prompt` | AI prompts, CSS keywords | (style name) |

### Available Stacks

| Stack | Focus |
|-------|-------|
| `html-tailwind` | HTML + Tailwind CSS utilities |
| `react` | Components, hooks, performance |
| `nextjs` | SSR, routing, image optimization |
| `vue` | Composition API, reactivity |
| `nuxtjs` | SSR, modules, plugins |
| `nuxt-ui` | Nuxt UI components |
| `svelte` | Compile-time optimization |
| `swiftui` | iOS native, declarative |
| `react-native` | Mobile components, navigation |
| `flutter` | Cross-platform widgets |
| `shadcn` | shadcn/ui components |
| `jetpack-compose` | Android native, declarative |
| `angular` | Components, services, DI |
| `laravel` | Blade, Livewire, Inertia.js |

---

## Example Workflow

**User request:** "Build a portfolio landing page"

### Step 1: Analyze Requirements
- Product type: Portfolio
- Target audience: Potential employers/clients
- Style keywords: modern, minimal, professional, creative
- Stack: Next.js + React

### Step 2: Generate Design System (REQUIRED)

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "portfolio creative modern minimal" --design-system -p "Portfolio"
```

**Output:** Complete design system with pattern, style, colors, typography, effects, and anti-patterns.

### Step 3: Supplement with Detailed Searches (as needed)

```bash
# Get style options for a modern portfolio
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "minimalism clean" --domain style

# Get UX best practices for portfolio
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "portfolio hero social-proof" --domain ux
```

### Step 4: Stack Guidelines

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "image optimization performance" --stack nextjs
```

**Then:** Synthesize design system + detailed searches and implement the design.

---

## Output Formats

The `--design-system` flag supports two output formats:

```bash
# ASCII box (default) - best for terminal display
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system

# Markdown - best for documentation
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

---

## Tips for Better Results

### Query Strategy

- Use **multi-dimensional keywords** — combine product + industry + tone + density: `"entertainment social vibrant content-dense"` not just `"app"`
- Try different keywords for the same need: `"playful neon"` → `"vibrant dark"` → `"content-first minimal"`
- Use `--design-system` first for full recommendations, then `--domain` to deep-dive any dimension you're unsure about
- Always add `--stack <stack>` for implementation-specific guidance

### Common Sticking Points

| Problem | What to Do |
|---------|------------|
| Can't decide on style/color | Re-run `--design-system` with different keywords |
| Dark mode contrast issues | Search `--domain style "dark mode"` + `--domain ux "accessibility contrast"` |
| Animations feel unnatural | Search `--domain ux "animation timing easing"` |
| Form UX is poor | Search `--domain ux "form validation error inline"` |
| Navigation feels confusing | Search `--domain ux "navigation hierarchy bottom-tabs"` |
| Layout breaks on small screens | Search `--domain ux "responsive mobile-first breakpoint"` |
| Performance / jank | Search `--stack <your-stack> "performance optimization"` |

### Pre-Delivery Checklist

- Run `--domain ux "animation accessibility z-index loading"` as a UX validation pass before implementation
- Test on 375px, 768px, 1024px, 1440px breakpoints
- Verify behavior with **reduced-motion** enabled
- Check dark mode contrast independently (don't assume light mode values work)
- Confirm all touch targets meet minimum size requirements

---

## Common Rules for Professional UI

These are frequently overlooked issues that make UI look unprofessional:

### Icons & Visual Elements

| Rule | Standard | Avoid | Why It Matters |
|------|----------|--------|----------------|
| **No Emoji as Structural Icons** | Use vector-based icons (e.g., Lucide, Heroicons, Phosphor) | Using emojis (🎨 🚀 ⚙️) for navigation, settings, or system controls | Emojis are font-dependent, inconsistent across platforms, and cannot be controlled via design tokens |
| **Vector-Only Assets** | Use SVG that scales cleanly and supports theming | Raster PNG icons that blur or pixelate | Ensures scalability, crisp rendering, and dark/light mode adaptability |
| **Consistent Icon Sizing** | Define icon sizes as design tokens (e.g., icon-sm, icon-md = 24px, icon-lg) | Mixing arbitrary values like 20px / 24px / 28px randomly | Maintains rhythm and visual hierarchy across the interface |
| **Touch Target Minimum** | Minimum 44×44px interactive area | Small icons without expanded hit area | Meets accessibility and platform usability standards |

### Light/Dark Mode Contrast

| Rule | Do | Don't |
|------|----|----- |
| **Text contrast (light)** | Maintain body text contrast >=4.5:1 against light surfaces | Low-contrast gray body text |
| **Text contrast (dark)** | Maintain primary text contrast >=4.5:1 and secondary text >=3:1 on dark surfaces | Dark mode text that blends into background |
| **Token-driven theming** | Use semantic color tokens mapped per theme across app surfaces/text/icons | Hardcoded per-screen hex values |

### Layout & Spacing

| Rule | Do | Don't |
|------|----|----- |
| **Safe-area compliance** | Respect top/bottom safe areas for all fixed headers, footers, and CTA bars | Placing fixed UI under notch, status bar, or gesture area |
| **Consistent spacing rhythm** | Use a consistent 4/8px spacing system for padding/gaps/section spacing | Random spacing increments with no rhythm |
| **Responsive breakpoints** | Test at 375px, 768px, 1024px, 1440px minimum | Only testing on desktop viewport |

---

## Pre-Delivery Checklist

Before delivering UI code, verify these items:

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons come from a consistent icon family and style
- [ ] Official brand assets are used with correct proportions and clear space
- [ ] Pressed-state visuals do not shift layout bounds or cause jitter
- [ ] Semantic theme tokens are used consistently (no ad-hoc per-screen hardcoded colors)

### Interaction
- [ ] All tappable elements provide clear pressed feedback (opacity/transform/shadow)
- [ ] Touch targets meet minimum size (44×44px)
- [ ] Micro-interaction timing stays in the 150-300ms range with native-feeling easing
- [ ] Disabled states are visually clear and non-interactive
- [ ] Focus order matches visual order, and interactive labels are descriptive

### Light/Dark Mode
- [ ] Primary text contrast >=4.5:1 in both light and dark mode
- [ ] Secondary text contrast >=3:1 in both light and dark mode
- [ ] Dividers/borders and interaction states are distinguishable in both modes
- [ ] Modal/drawer scrim opacity is strong enough to preserve foreground legibility
- [ ] Both themes are tested before delivery (not inferred from a single theme)

### Layout
- [ ] Safe areas are respected for headers, footers, and fixed elements
- [ ] Scroll content is not hidden behind fixed/sticky bars
- [ ] Verified on small phone, large phone, and tablet (portrait + landscape)
- [ ] 4/8px spacing rhythm is maintained across component, section, and page levels
- [ ] Long-form text measure remains readable on larger devices

### Accessibility
- [ ] All meaningful images/icons have accessibility labels
- [ ] Form fields have labels, hints, and clear error messages
- [ ] Color is not the only indicator
- [ ] Reduced motion and dynamic text size are supported without layout breakage
- [ ] Accessibility traits/roles/states (selected, disabled, expanded) are announced correctly
