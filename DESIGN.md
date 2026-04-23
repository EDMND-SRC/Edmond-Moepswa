# Design System

This document outlines the implemented design system for Edmond Moepswa's site, reflecting the current state of the codebase.

## 1. Design Philosophy

- **Dark-First:** The site uses a single-theme dark mode (forced via `next-themes`) to present a high-contrast, editorial aesthetic suited for a personal brand, rather than a generic corporate SaaS look.
- **Motion-Rich:** Interactivity is driven by smooth transitions, magnetic buttons, and scroll-linked animations, providing a premium, "living" feel.
- **Accessible:** Motion features degrade gracefully for users who prefer reduced motion. High contrast is maintained for all text against backgrounds.

## 2. Color System

The color palette is built on semantic roles to ensure consistency.

| Token          | Role              | Value                       | Notes                                                             |
| -------------- | ----------------- | --------------------------- | ----------------------------------------------------------------- |
| `--background` | Page background   | `#0a0a0a` (Near-black)      | Main foundation                                                   |
| `--card` / Nav | Elevated surface  | `#1a1a1a`                   | Used for cards and navigation                                     |
| `--e5e5e5`     | Hero background   | `#e5e5e5`                   | Used in the light hero section to contrast with the dark portrait |
| `--primary`    | Primary accent    | `#FF4D2E` (Red-Orange)      | Used for CTAs, links, focus rings, and section labels             |
| `--muted`      | Secondary copy    | `#b0b0b0`                   | Muted body text for readability without glaring                   |
| `white`        | Primary text      | `#ffffff`                   | High-contrast text on dark backgrounds                            |
| `white/5`      | Borders           | `rgba(255, 255, 255, 0.05)` | Subtle depth layering                                             |
| `white/10`     | Dividers / Hovers | `rgba(255, 255, 255, 0.10)` | Interactive hover states                                          |

## 3. Typography

- **Primary Font:** Geist Variable (sans-serif), implemented via standard `@theme inline` mapping to `--font-sans`.
- **Heading Scale:**
  - `h1`: 2.5rem (mobile) / 3.5rem (desktop)
  - `h2`: 1.25rem (mobile) / 1.5rem (desktop)
  - Tracking is tight on large headings (`tracking-tight`, `leading-[1.1]`).
- **Body Text:** System sans-serif with normal, medium, and bold weights.
- **Stylistic Signatures:** Code-comment prefixes (e.g., `//`) are frequently used as section labels to reinforce the developer identity.

## 4. Spacing & Layout

- **Base Grid:** 8px foundation (`p-2`, `mt-4`, etc.).
- **Container Widths:**
  - Standard Content: `max-w-5xl` (1024px).
  - Expanded Content (e.g., Project grids): `max-w-7xl` (1280px).
- **Section Padding:** Standard vertical rhythm is `py-24` (192px) on desktop and `py-16` (128px) on mobile, with `px-6` to `px-10` horizontal constraints.
- **Responsive Breakpoints:** Tailwind defaults: `md` (768px), `lg` (1024px).

## 5. Components & Patterns

- **MagneticButton:** A custom interactive button that pulls slightly toward the cursor on hover.
- **Glassmorphism Nav:** The main navigation uses `backdrop-blur-xl bg-[#1a1a1a]/40 border border-white/10` to float above the content.
- **Resource/Project Cards:** Unified card aesthetic using `bg-[#1A1A1A] rounded-2xl p-8 border border-white/5` with hover transitions that slightly elevate (`-translate-y-2`) and illuminate the border (`hover:border-[#FF4D2E]/40`).
- **Section Labels:** Small, highly tracked uppercase text to introduce sections: `text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em]`.

## 6. Motion & Animation

- **Library:** Motion (formerly Framer Motion).
- **Hero Effects:** Infinite scrolling marquee text with `mix-blend-difference` and a custom cursor parallax effect on the background portrait.
- **Scroll Links:** The hero image uses `useTransform` to tie the scroll position to CSS filters (e.g., desaturating the image as the user scrolls down).
- **Entrance:** Standard `whileInView` animations stagger child elements fading and translating up as they enter the viewport.
- **Reduced Motion:** Handled programmatically via a `useReducedMotion` hook and CSS `@media (prefers-reduced-motion: reduce)` to disable non-essential animations.

## 7. Accessibility

- **Skip-to-Content:** Implemented via a `SkipToContent` component that becomes visible only on keyboard focus.
- **Focus States:** Globally enforced focus rings (`focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:outline-none`) to ensure keyboard navigability.
- **Touch Targets:** Mobile breakpoint enforces a minimum 44x44px target for buttons and links.
- **Semantic HTML:** Strict adherence to appropriate heading hierarchy and ARIA labels for interactive, non-text elements.

## 8. Z-Index Scale

Managed via custom CSS properties in `globals.css` to prevent conflicts:

- `--z-base`: 1
- `--z-dropdown`: 100
- `--z-sticky`: 200
- `--z-overlay`: 300
- `--z-modal`: 400
- `--z-toast`: 500
- `--z-cursor`: 600
