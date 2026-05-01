# Component Inventory

Generated: `2026-05-01T07:42:21+0200`

This inventory groups components by responsibility instead of dumping a flat alphabetical list.

## Frontend Page Composition

### Homepage sections

Location: `src/components/homepage/`

Core sections:

- `HeroSection.tsx`
- `IntroSection.tsx`
- `ServicesSection/`
- `ProjectsSection/`
- `TestimonialsSection.tsx`
- `CalSection.tsx`
- `FAQSection.tsx`
- `FreeResourcesSection.tsx`
- `ProcessSection.tsx`
- `HomePageFooter.tsx`

Notable nested features:

- `CalculatorSection/`
  - `AnimatedNumber.tsx`
  - `QuoteModal.tsx`
  - `SummaryDownload.tsx`
  - `data.ts`
  - `index.tsx`
- `ProjectsSection/`
  - `ProjectsSectionClient.tsx`
  - `types.ts`
- `ServicesSection/`
  - `ServiceBlock.tsx`
  - `ServiceNumber.tsx`
  - `Stardust.tsx`
  - `data.ts`

## Shared UI System

Location: `src/components/ui/`

This folder mixes primitive wrappers with bespoke brand interactions.

### Brand-specific interactive pieces

- `CustomCursor.tsx`
- `MagneticButton.tsx`
- `LoadingScreen.tsx`
- `PageTransition.tsx`
- `ParallaxBackground.tsx`
- `ScrollProgress.tsx`
- `ScrollTextReveal.tsx`
- `HorizontalScroll.tsx`
- `FloatingShapes.tsx`

### Navigation and layout helpers

- `MobileNav.tsx`
- `SectionNav.tsx`
- `SkipToContent.tsx`
- `logo-marquee.tsx`

### Primitive-style controls

- `button.tsx`
- `card.tsx`
- `checkbox.tsx`
- `input.tsx`
- `label.tsx`
- `pagination.tsx`
- `select.tsx`
- `skeleton.tsx`
- `slider.tsx`
- `sonner.tsx`
- `textarea.tsx`
- `tooltip.tsx`

## CMS and Admin Components

### Payload admin augmentation

- `src/components/BeforeLogin/index.tsx`
- `src/components/BeforeDashboard/index.tsx`
- `src/components/BeforeDashboard/SeedButton/index.tsx`
- `src/components/AdminBar/index.tsx`

These components are operationally significant because they affect Payload admin boot behavior and import-map weight.

### CMS content rendering

- `src/components/RichText/index.tsx`
- `src/components/Media/index.tsx`
- `src/components/Media/ImageMedia/index.tsx`
- `src/components/Media/VideoMedia/index.tsx`
- `src/components/PayloadRedirects/index.tsx`
- `src/components/CollectionArchive/index.tsx`
- `src/components/PageRange/index.tsx`
- `src/components/Pagination/index.tsx`

## Forms and Lead Capture

### Dedicated forms

- `src/components/forms/LeadCaptureForm.tsx`

### Payload block form implementation

Location: `src/blocks/Form/`

Subcomponents:

- `Checkbox/index.tsx`
- `Country/index.tsx`
- `Email/index.tsx`
- `Error/index.tsx`
- `Message/index.tsx`
- `Number/index.tsx`
- `Select/index.tsx`
- `State/index.tsx`
- `Text/index.tsx`
- `Textarea/index.tsx`
- `Width/index.tsx`

This block family is one of the more nested and reusable parts of the repository.

## Content Blocks and Hero Variants

### Blocks

Location: `src/blocks/`

- `ArchiveBlock`
- `CallToAction`
- `Code`
- `Content`
- `Form`
- `MediaBlock`
- `RenderBlocks.tsx`

### Hero variants

Location: `src/heros/`

- `HighImpact/index.tsx`
- `MediumImpact/index.tsx`
- `LowImpact/index.tsx`
- `RenderHero.tsx`
- `config.ts`

These define the page-builder visual vocabulary used by CMS pages.

## Navigation, Branding, and Supporting Content

### Header/Footer

- `src/Header/Component.tsx`
- `src/Header/Component.client.tsx`
- `src/Header/Nav/index.tsx`
- `src/Footer/Component.tsx`
- row-label helpers for Payload admin array fields

### Branding and icons

- `src/components/Logo/Logo.tsx`
- `src/components/icons/BrandIcons.tsx`
- `src/components/icons/SubstackIcon.tsx`
- `src/components/icons/ThreadsIcon.tsx`
- `src/lib/icon-registry.tsx`

### Secondary content sections

- `src/components/about/TechStackSection.tsx`
- `src/components/resources/ResourceCards.tsx`
- `src/components/SubstackFeed.tsx`
- `src/components/PolicyLayout.tsx`

## Providers

Location: `src/providers/`

- `HeaderTheme/index.tsx`
- `Theme/index.tsx`
- `Theme/InitTheme/index.tsx`
- `Theme/ThemeSelector/index.tsx`
- `index.tsx`

These are relatively small, but they sit near root layout concerns and therefore matter to render behavior.

## Inventory Notes

- The component tree is heavily skewed toward the public brand experience rather than toward CRUD-heavy SaaS screens.
- `src/components/homepage/` and `src/components/ui/` together represent the bulk of the bespoke UX surface.
- The admin component surface is smaller, but it is disproportionately important because it affects Payload bundle shape and Cloudflare admin behavior.
