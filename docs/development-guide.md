# Development Guide

This guide outlines the setup and development workflow for the Edmond Moepswa project.

## Prerequisites

- **Node.js**: 20.x or higher
- **Package Manager**: pnpm 9.x or 10.x
- **Database**: PostgreSQL (Neon recommended for production, local Postgres for dev)

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd edmond-moepswa
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Environment Setup**:
    Copy `.env.example` to `.env.local` and populate the variables.
    ```bash
    cp .env.example .env.local
    ```

4.  **Database Migration & Seeding**:
    ```bash
    # Reset and run migrations
    echo "y" | CI=true pnpm payload migrate:fresh
    
    # Seed demo content
    npx tsx seed.ts
    ```

5.  **Start Development Server**:
    ```bash
    pnpm dev
    ```
    - Website: `http://localhost:3000`
    - Admin Panel: `http://localhost:3000/admin`

## Common Development Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start development server with HMR. |
| `pnpm build` | Create a production build of the application. |
| `pnpm start` | Run the production build locally. |
| `pnpm generate:types` | Regenerate Payload CMS TypeScript types. |
| `pnpm generate:importmap` | Regenerate the Payload admin import map. |
| `pnpm lint` | Run ESLint to check for code quality issues. |
| `pnpm test` | Run all unit and E2E tests. |
| `pnpm test:int` | Run integration tests via Vitest. |
| `pnpm test:e2e` | Run end-to-end tests via Playwright. |

## Data Seeding

The `seed.ts` script populates the following:
- **8 Projects** with descriptions and metadata.
- **9 Testimonials** from global clients.
- **19 FAQs** categorized for easy navigation.

After seeding, you must manually upload thumbnails for projects via the admin panel.

## Key Integrations

- **Payload CMS**: Headless CMS for managing content.
- **Dodo Payments**: Payment processing and digital product delivery.
- **Make.com**: Automation workflows for lead capture and notifications.
- **Cal.com**: Booking widget integration.
- **Substack**: RSS feed parser for blog posts.
