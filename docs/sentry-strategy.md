# Sentry Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Sentry (sentry.io)
**Free Tier:** Developer plan — 5,000 errors/month, 10,000 performance transactions/month, 500 session replays/month, 1 uptime monitor, 1 user, 30-day data retention

---

## Overview

Sentry is the industry-standard error tracking and performance monitoring platform. It captures unhandled exceptions, slow queries, and performance bottlenecks in real time — with full stack traces, user context, and release tracking. For Edmond's web application builds, Sentry provides visibility into what's breaking in production, long before clients or users report issues.

For Edmond's practice, Sentry serves as:

1. **Production error tracking** — Know when and why application code is failing, with full context (user, browser, URL, stack trace)
2. **Performance monitoring** — Identify slow API routes, database queries, and page loads
3. **Session replay** — Watch what the user was doing when an error occurred (500 replays/month on free tier)
4. **Release tracking** — Link errors to specific deployments — know which release introduced a bug

---

## Free Tier Limits (Developer Plan — 2026)

| Resource | Limit |
|----------|-------|
| Error events | 5,000/month |
| Performance transactions | 10,000/month |
| Session replays | 500/month |
| Uptime monitors | 1 |
| Users with dashboard access | 1 |
| Data retention | 30 days |
| Projects | Unlimited |
| Platforms supported | JavaScript/TypeScript, React, Next.js, Python, Node.js, and 40+ more |

**Team plan ($26/month):** 50,000 errors/month, 100,000 transactions, 5,000 session replays, 5 users, 90-day retention.

---

## By Service Category

### 1. Web Applications

#### Error Tracking for All SaaS Builds (Tier C)
- **Use case:** Unhandled exception in production → Sentry captures the error with full stack trace, browser info, user context, and URL → Edmond receives email notification → fixes the bug before the client reports it
- **Integration:** Next.js Sentry SDK — automatically captures unhandled errors, rejected promises, and console errors
- **Value:** Proactive bug detection. Instead of waiting for a client to email "something's broken," Edmond already knows and is working on it

#### Performance Monitoring for API Routes
- **Use case:** Sentry traces every API route execution → identifies routes taking >500ms → traces through to database queries → pinpoints the slow operation
- **Value:** Data-driven performance optimisation. Not "I think the site is slow" — "The `/api/orders` route averages 1,200ms because of an unindexed database query on line 47"

#### Release Tracking
- **Use case:** Deploy a new version → Sentry records the release hash → if error rates spike after deployment, Sentry flags it as a regression → Edmond knows exactly which commit introduced the bug
- **Value:** Faster bug resolution. "This error started appearing in release v2.3.1, introduced in commit abc123" cuts debugging time from hours to minutes

---

### 2. Web Design & Development

#### Production Site Monitoring (Growth Builds)
- **Use case:** Client's live site — JavaScript errors in the browser, failed API calls, broken form submissions — all captured by Sentry
- **Value:** Professional service delivery. Edmond monitors the health of every shipped site, not just uptime (Better Stack) but application-level errors

#### Session Replay for UX Debugging
- **Use case:** User reports "the form doesn't work" → Sentry session replay shows exactly what the user clicked, in what order, and where the error occurred
- **Value:** Reproducing bugs is the hardest part of debugging. Session replays eliminate the "I can't reproduce it on my machine" problem

---

### 3. Retainer & Ongoing Support

#### Monthly Error Report (Included in Foundation Cover)
- **Use case:** Monthly review of Sentry data → how many errors occurred, which were resolved, which are recurring, performance trends
- **Value:** Tangible evidence of proactive maintenance. "We caught and fixed 12 errors this month before any user reported them"

---

## Quick-Win Implementations

### Priority 1: Sentry + Next.js Setup (30 min)
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, // 100% when error occurs
  environment: process.env.NODE_ENV,
})

// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
})
```

### Priority 2: Vercel Integration (15 min)
Connect Sentry to Vercel → automatic release tracking → every deployment creates a Sentry release → errors are linked to the specific Vercel deployment that introduced them.

### Priority 3: Error Alert Configuration (15 min)
Configure Sentry alerts:
- Email notification on every new error (for the free tier's single user)
- Weekly summary report of all errors, resolved issues, and performance trends
- Uptime monitor (1 free monitor) — alerts if the site is completely unreachable

---

## Resource Budget Planning

**Free tier covers most small-to-medium applications:**

| Metric | Typical Usage (SME App) | Free Limit | Headroom |
|--------|------------------------|-------------|----------|
| Errors/month | 200–2,000 | 5,000 | ~60%+ |
| Transactions/month | 1,000–5,000 | 10,000 | ~50%+ |
| Session replays | 50–300 | 500 | ~40%+ |
| Uptime monitors | 1 | 1 | Full |

**When to upgrade to Team ($26/month):**
- Error volume regularly exceeds 5,000/month
- Multiple team members need dashboard access
- Longer data retention needed (90 days vs. 30 days)
- More uptime monitors needed

---

## Risks & Considerations

1. **Single user on free tier:** Only 1 person can access the Sentry dashboard. For client-facing error reporting, share weekly summary reports instead of dashboard access
2. **30-day retention:** After 30 days, error data is purged. If historical error analysis beyond 30 days is needed, export data or upgrade to Team (90 days)
3. **Sampling for performance:** The `tracesSampleRate` of 0.1 (10%) means 90% of transactions are not captured. For low-traffic sites, increase to 1.0 (100%) — the 10,000 transaction limit should handle it
4. **PII in error data:** Sentry captures request data, user context, and cookies. Ensure sensitive data (passwords, tokens, personal information) is scrubbed using Sentry's data filters
5. **Free tier sufficiency:** 5,000 errors/month is generous for most SME sites. A well-built Next.js app should produce <100 errors/month in production. If you're hitting 5,000, you have deeper quality issues than Sentry can solve

---

## Summary: Value to Practice

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Error tracking (Tier C builds) | Included in P48,000+ | $0 (free tier) | 100% |
| Performance monitoring | Included in build | $0 | 100% |
| Monthly error reports (retainer) | Included in P2,500/month | $0 | 100% |
| Session replay debugging | Included in build | $0 | 100% |

**Key insight:** Sentry's free tier (5,000 errors, 10,000 transactions, 500 session replays) is more than sufficient for every SME web application Edmond builds. The real value isn't just error capture — it's the professional practice of knowing about production issues before the client does. Session replay alone justifies the setup: seeing exactly what a user did when they encountered an error eliminates the most time-consuming part of debugging. Integrate Sentry into every Tier C build, every Boilerplate with a custom backend, and optionally into Growth builds where application-level reliability matters.

---

**End of Sentry Integration Strategy**
