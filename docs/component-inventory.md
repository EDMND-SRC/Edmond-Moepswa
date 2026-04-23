# Component Inventory

This document catalogs the React UI components used to build the Edmond Moepswa website.

## Homepage Sections (`src/components/homepage`)

| Component | Description | Interactive Features |
| :--- | :--- | :--- |
| `HeroSection` | Above-the-fold brand introduction. | Smooth reveal animations. |
| `IntroSection` | Personal mission and background. | Scroll-triggered transitions. |
| `ServicesSection` | Core service categories and pricing. | Hover-tilt cards, GSAP animations. |
| `ProjectsSection` | Portfolio grid of demo projects. | Filterable grid, animated thumbnails. |
| `CalculatorSection` | Multi-currency pricing estimator. | Dynamic sliders, animated numbers, PDF generation. |
| `TestimonialsSection` | Client social proof carousel. | Infinite scroll/looping animations. |
| `FAQSection` | Collapsible Q&A items. | Accordion transitions. |
| `CalSection` | Cal.com booking embed. | Inline booking interface. |
| `FreeResourcesSection`| Digital product previews. | Grid layout with download links. |

## Layout & Navigation

- **Header**: Responsive navigation with theme toggle and mobile menu.
- **Footer**: Detailed site map, social links, and contact information.
- **AdminBar**: Payload CMS management bar for logged-in admins.

## UI Primitives (`src/components/ui`)

Built on top of **Radix UI** and styled with **Tailwind CSS**.
- **Button**: Standardized buttons with magnetic hover effects.
- **Card**: Reusable containers with subtle borders and shadows.
- **Dialog / Modal**: Used for calculators and form success states.
- **Select / Checkbox**: Accessible form primitives.
- **RichText**: Lexical renderer for CMS content.

## Specialized Components

- **SubstackFeed**: Server-side parsed RSS feed from Substack.
- **LivePreviewListener**: Enables real-time editing in Payload CMS.
- **Media**: Optimized image component with lazy loading and srcsets.
- **Logo**: SVG-based brand identity component.

## Motion & Animation

The project uses **Motion** and **GSAP** for:
- Page transitions.
- Scroll-linked parallax effects.
- Micro-interactions (magnetic buttons, stardust effects).
- Responsive motion scaling based on user preferences.
