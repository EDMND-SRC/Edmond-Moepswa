# Source Tree Analysis

This document provides an annotated directory structure for the Edmond Moepswa project, highlighting critical paths and their roles within the application.

## Root Directory Structure

```text
.
├── .agents/                # AI agent skills and configuration
├── .github/                # GitHub Actions workflows (CI/CD)
├── business-planning/      # Business strategy, research, and catalogues
│   ├── creative/           # Brand development and AI prompting
│   ├── market-research/    # Pricing and competitor analysis
│   ├── profile/            # Career narrative and bio
│   ├── services/           # Service catalogue and calculator logic
│   └── strategy-docs/      # 50+ strategy files for tool integrations
├── docs/                   # Project documentation (Technical)
├── make-workflows/         # Make.com automation logic
├── public/                 # Static assets (images, fonts, robots.txt)
├── scripts/                # One-off scripts (seeding, data sync)
├── src/                    # Primary source code
│   ├── access/             # Access control functions (RBAC)
│   ├── app/                # Next.js App Router (Frontend & Admin)
│   │   ├── (frontend)/     # Public-facing website pages
│   │   ├── (payload)/      # Payload CMS admin interface
│   │   └── api/            # Integration API routes (Dodo, Substack, Geo)
│   ├── blocks/             # Reusable content blocks for Page Builder
│   ├── collections/        # Payload CMS collection configurations (10 total)
│   ├── components/         # React UI components (shadcn/ui, custom)
│   ├── fields/             # Custom Payload field configurations (Links, Lexical)
│   ├── globals/            # Site-wide globals (SiteSettings)
│   ├── heros/              # Hero section variations (High, Med, Low impact)
│   ├── hooks/              # Payload hooks and React hooks
│   ├── lib/                # Shared libraries (Payload client, Sentry, PostHog)
│   ├── migrations/         # PostgreSQL database migrations
│   ├── plugins/            # Payload CMS plugins
│   ├── providers/          # React Context providers (Theme, Header)
│   ├── utilities/          # Shared helper functions
│   └── payload.config.ts   # Main Payload CMS configuration entry point [ENTRY]
├── tests/                  # Test suites (Unit, Integration, E2E)
├── AGENTS.md               # Payload 3 development rules
├── DESIGN.md               # Design system and brand guidelines
├── README.md               # Project overview and developer setup
├── next.config.ts          # Next.js configuration
├── package.json            # Project manifest and dependencies
└── tsconfig.json           # TypeScript configuration
```

## Critical Folders Summary

| Folder | Purpose |
| :--- | :--- |
| `src/app/(frontend)` | Renders the public website using Next.js App Router. |
| `src/collections` | Defines the data structures for Projects, Leads, Orders, etc. |
| `src/components/homepage` | Contains the core sections of the single-page application. |
| `src/app/api` | Handles external integrations with Dodo Payments, Make.com, and Cal.com. |
| `business-planning` | Serves as the "brain" for business logic, pricing, and service definitions. |
| `src/utilities` | Contains foundational helpers for SEO, Media URLs, and Redirects. |

## Entry Points

- **Frontend**: `src/app/(frontend)/page.tsx`
- **Admin Panel**: `src/app/(payload)/admin/page.tsx`
- **CMS Config**: `src/payload.config.ts`
- **Global Styles**: `src/app/(frontend)/globals.css`
