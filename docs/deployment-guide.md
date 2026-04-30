# Deployment Guide

This guide provides instructions for deploying the Edmond Moepswa project to production.

## Target Platform: Cloudflare Workers

The project is deployed to Cloudflare Workers using OpenNext. The application runtime moves to Cloudflare, while the database remains on Neon PostgreSQL.

### Prerequisites

- A Cloudflare account with Workers access.
- A Neon PostgreSQL database instance.
- Dodo Payments account.
- Make.com account.
- PostHog account for analytics.

### Deployment Steps

1.  **Configure Environment Variables**:
    Set the following variables in your Cloudflare Worker environment or Workers Builds settings:
    - `DATABASE_URL`: Your Neon connection string.
    - `PAYLOAD_SECRET`: A secure random string.
    - `NEXT_PUBLIC_SERVER_URL`: `https://edmond-moepswa.edmnd-src.workers.dev`.
    - `R2_BUCKET`, `R2_REGION`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`: Payload media storage in Cloudflare R2.
    - `DODO_PAYMENTS_API_KEY`: For payment processing.
    - `DODO_PAYMENTS_ENVIRONMENT`: Keep this at `test_mode` until the Dodo catalog is ready for live traffic.
    - `DODO_PAYMENTS_WEBHOOK_SECRET`: For webhook signature verification.
    - `MAKE_WEBHOOK_*`: Webhook URLs from your Make.com scenarios.
    - `NEXT_PUBLIC_POSTHOG_API_KEY`: For product analytics.

2.  **Install and type-check Cloudflare configuration**:
    - `pnpm install`
    - `pnpm cf-typegen`
    - `pnpm generate:types && tsc --noEmit`

3.  **Preview in the Cloudflare runtime**:
    - `pnpm preview`
    - Verify the homepage, `/about`, `/search?q=test`, one dynamic `[slug]` page, `/resources`, and `/admin`.
    - Verify the Payload REST and GraphQL endpoints.

4.  **Deploy to Workers**:
    - `pnpm deploy`
    - Confirm `https://edmond-moepswa.edmnd-src.workers.dev` loads successfully.

5.  **Post-Deployment**:
    - Run database migrations if the target environment schema is behind.
    - Confirm the R2 bucket is receiving new uploads through the Payload admin.
    - Keep Dodo traffic in `test_mode` until the real products exist, then switch the environment deliberately.
    - Verify webhooks for Cal.com and Dodo Payments.
    - Confirm admin login, media rendering, and image transforms in the deployed runtime.

## Monitoring & Operations

- **Runtime Diagnostics**: Review Cloudflare deployment logs and Workers Logs for runtime exceptions.
- **Analytics**: Managed by PostHog and Google Analytics 4.
- **Uptime Monitoring**: Managed via Better Stack.
- **Database Backups**: Handled by Neon's native backup and point-in-time recovery features. No D1 database is used in this migration.

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that performs the following on every pull request:
- Lints the codebase.
- Runs unit and integration tests.
- Ensures the project builds successfully.
