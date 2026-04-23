# Edmond Moepswa

**Website:** [edmond-moepswa.vercel.app](https://edmond-moepswa.vercel.app)
**Substack:** [edmnd.substack.com](https://edmnd.substack.com)

Full-stack developer and systems thinker based in Gaborone, Botswana. Designs and builds custom websites, web applications, and workflow automations for businesses and institutions — from P&L statements to production code.

## What This Is

A production personal brand website for Edmond Moepswa, an independent software developer and digital services consultant. The site showcases:

- **8 demo projects** spanning web design, workflow automation, boilerplate products, and open-source work
- **9 client testimonials** from engagements across Australia and Botswana
- **19 FAQs** covering services, pricing, process, and technical questions
- **Interactive pricing calculator** with multi-currency support (19 currencies)
- **Cal.com booking widget** for free 30-minute discovery calls
- **Dodo Payments integration** for free resource downloads and paid automation products
- **Make.com automation workflows** for lead capture, email replies, and nurture sequences

## Tech Stack

| Layer          | Technology                                 |
| -------------- | ------------------------------------------ |
| **Framework**  | Next.js 16 (App Router) + Payload CMS 3.82 |
| **Database**   | PostgreSQL (Neon)                          |
| **Styling**    | Tailwind CSS 4 + shadcn/ui components      |
| **Animations** | Motion (Framer Motion successor)           |
| **Scheduling** | Cal.com embed with webhook automation      |
| **Automation** | Make.com (Teams plan)                      |
| **Products**   | Dodo Payments                              |
| **Hosting**    | Vercel (Team: EDMND-SRC)                   |
| **Analytics**  | PostHog, Google Analytics 4                |
| **Monitoring** | Sentry (errors), Better Stack (uptime)     |

## Services

Edmond delivers five core service categories:

1. **Web Design & Development** — Landing pages, multi-page CMS sites, e-commerce — all custom-built, no templates
2. **Web Applications** — SaaS platforms, dashboards, booking systems, internal tools
3. **Workflow Automation** — Make.com and n8n pipelines for lead management, CRM, email sequences
4. **SEO, GEO & Google Business** — Technical SEO foundations, ongoing keyword strategy, GBP optimisation
5. **Advisory & Consulting** — Tech stack selection, pricing strategy, architecture reviews for founders

Plus **boilerplate products** (pre-built starter kits) and **free resources** (guides, checklists).

## Project Structure

```
business-planning/            # Business strategy & service catalogues
src/
├── app/
│   ├── (frontend)/           # Public-facing pages
│   │   ├── page.tsx          # Homepage (SPA with code-split sections)
│   │   ├── about/            # About page (4-act career narrative)
│   │   ├── services/         # Services & pricing catalogue
│   │   ├── contact/          # Contact form + Cal.com embed
│   │   ├── resources/        # Free and paid digital products
│   │   ├── search/           # Site search
│   │   └── [slug]/           # Dynamic CMS pages
│   └── (payload)/            # Payload CMS admin panel
├── collections/              # Payload CMS collections
│   ├── Projects.ts           # Demo projects (8 seeded)
│   ├── Testimonials.ts       # Client testimonials (9 seeded)
│   ├── FAQs.ts               # FAQ items (19 seeded, 5 categories)
│   ├── Services.ts           # Service offerings with pricing
│   ├── Products.ts           # Dodo Payments products
│   ├── Leads.ts              # Lead capture from forms/calculator
│   ├── Media.ts              # Image uploads with responsive sizes
│   ├── Users/                # Admin users (admin/editor roles)
│   └── Pages/                # CMS pages with layout builder
├── globals/                  # Site-wide settings
│   ├── SiteSettings.ts       # Contact info, social links
│   └── Header/config.ts, Footer/config.ts
├── components/
│   ├── homepage/             # Homepage sections (Hero, Intro, Services, etc.)
│   ├── ui/                   # shadcn/ui components
│   ├── forms/                # LeadCaptureForm
│   └── ...
├── access/                   # Access control (authenticated, anyone, adminOnly)
├── hooks/                    # Payload hooks + React hooks (useReducedMotion)
└── utilities/                # Helper functions (getURL, getMediaUrl)
```

## Integrations

### Cal.com

Embedded booking widget for 30-minute discovery calls.

### Make.com Automations

3 workflows handling:

1. Contact form → Intent-based email replies
2. Calculator high-tier → Quote follow-up
3. Dodo download/purchase → Nurture sequence

### Dodo Payments

Free resources and paid automation products delivered through Dodo Payments.

### Substack

RSS feed from `edmnd.substack.com` parsed server-side and displayed on the homepage.

## Accessibility

- Skip-to-content link with keyboard-visible focus
- `prefers-reduced-motion` respected across all animations
- WCAG AA color contrast ratios throughout
- Proper heading hierarchy (h1 → h2 → h3)
- `aria-label`, `aria-labelledby`, and `aria-live` on interactive components
- All form inputs 16px minimum (prevents iOS zoom)
- Keyboard navigation for all interactive elements

## Development

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (Neon recommended)

### Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Seed demo content (projects, testimonials, FAQs)
echo "y" | CI=true pnpm payload migrate:fresh
npx tsx seed.ts
```

Open `http://localhost:3000` for the site, `http://localhost:3000/admin` for CMS admin.

### Common Commands

```bash
pnpm dev                  # Start dev server
pnpm build                # Production build
pnpm start                # Run production build
pnpm generate:types       # Regenerate Payload TypeScript types
pnpm generate:importmap   # Regenerate admin import map
pnpm lint                 # Run ESLint
pnpm test                 # Run all tests (unit + E2E)
```

### Database Seeding

The seed script (`seed.ts`) populates:

- **8 Projects** with realistic descriptions based on actual work
- **9 Testimonials** from clients across Canberra, Sydney, and Gaborone
- **19 FAQs** across 5 categories

After seeding, upload project thumbnails via the Payload admin panel.

## Deployment

### Vercel

Deployed to Vercel with Neon PostgreSQL. All environment variables documented in `.env.local`.

**URL:** https://edmond-moepswa.vercel.app
**Team:** EDMND-SRC (`vercel.com/edmnd-src`)

## Security

- Leads collection with email validation
- Role-based access control (admin/editor)
- All secrets via environment variables — never committed
- Payload CMS access control on all collections

## License

MIT
