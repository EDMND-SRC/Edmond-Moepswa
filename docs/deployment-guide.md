# Deployment Guide

This guide provides instructions for deploying the Edmond Moepswa project to production.

## Target Platform: Vercel

The project is optimized for deployment on Vercel, leveraging its Next.js and Serverless functions capabilities.

### Prerequisites

- A Vercel account.
- A Neon PostgreSQL database instance.
- Dodo Payments account.
- Make.com account.
- Sentry and PostHog accounts for monitoring and analytics.

### Deployment Steps

1.  **Configure Environment Variables**:
    Set the following variables in your Vercel project dashboard:
    - `DATABASE_URL`: Your Neon connection string.
    - `PAYLOAD_SECRET`: A secure random string.
    - `NEXT_PUBLIC_SERVER_URL`: The production URL of your site.
    - `DODO_PAYMENTS_API_KEY`: For payment processing.
    - `MAKE_WEBHOOK_*`: Webhook URLs from your Make.com scenarios.
    - `SENTRY_DSN`: For error tracking.
    - `NEXT_PUBLIC_POSTHOG_KEY`: For product analytics.

2.  **Connect Repository**:
    Connect your GitHub/GitLab/Bitbucket repository to Vercel.

3.  **Build Settings**:
    - **Framework Preset**: Next.js
    - **Build Command**: `pnpm build`
    - **Install Command**: `pnpm install`

4.  **Post-Deployment**:
    - Run the database migrations (if not handled by the build script).
    - Sync Dodo products using the provided scripts.
    - Verify webhooks for Cal.com and Dodo Payments.

## Monitoring & Operations

- **Error Tracking**: Handled by Sentry. Check the Sentry dashboard for runtime exceptions.
- **Analytics**: Managed by PostHog and Google Analytics 4.
- **Uptime Monitoring**: Managed via Better Stack.
- **Database Backups**: Handled by Neon's native backup and point-in-time recovery features.

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that performs the following on every pull request:
- Lints the codebase.
- Runs unit and integration tests.
- Ensures the project builds successfully.
