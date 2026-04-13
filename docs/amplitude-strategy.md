# Amplitude Analytics Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Amplitude (amplitude.com)
**Free Tier:** 100,000 events/month (free for unlimited users), core analytics features

---

## Overview

Amplitude is a product analytics platform focused on behavioural analysis — funnels, retention cohorts, user journeys, and pathfinder analysis. While PostHog combines event tracking, session recording, feature flags, and A/B testing in one platform, Amplitude goes deeper on behavioural analytics with more sophisticated analysis tools.

For Edmond's practice, Amplitude serves as:

1. **Behavioural analytics for SaaS products** — Understanding how users actually interact with built applications (feature adoption, drop-off points, retention)
2. **Alternative to PostHog** — When the client needs deeper behavioural analysis than PostHog's free tier provides, or already uses Amplitude
3. **Client reporting for web applications** — Monthly reports on user engagement, feature usage, and retention trends
4. **Data-driven product decisions** — Identifying which features drive retention and which are unused

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Events/month | 100,000 |
| Users (Amplitude dashboard) | Unlimited |
| Apps/projects | 2 |
| Data retention | Unlimited (event-level data) |
| Funnels | Unlimited |
| Retention analysis | Unlimited |
| User segmentation | Unlimited |
| Dashboards | Unlimited |
| Session replay | Not included on free tier (separate product) |
| Feature flags | Not included (use PostHog for this) |
| A/B testing | Not included (use PostHog for this) |

**Growth plan (custom pricing):** Advanced features, predictive analytics, custom destinations, data transformation, team collaboration tools.

---

## By Service Category

### 1. Web Applications

#### Behavioural Analytics for Tier C SaaS
- **Use case:** Track which features users engage with, where they drop off in onboarding, how retention changes over time
- **Amplitude advantage over PostHog:** More sophisticated funnel analysis (compare funnels across segments, time periods), retention cohorts (visual retention curves), and pathfinder (discover the most common user journeys)
- **Value:** Understanding which features drive long-term retention — the data needed to prioritise the product roadmap

#### Onboarding Funnel Analysis
- **Use case:** Define the onboarding funnel: signup → profile setup → first action → first value delivered → active user
- **Amplitude Funnels:** Shows conversion rate at each step, segmented by user attributes (signup source, plan type, region)
- **Value:** Identify the biggest drop-off point in onboarding. "60% of users drop off at profile setup" is a concrete, actionable insight

#### Retention Cohort Analysis
- **Use case:** Track how many users return week-over-week after signing up — segmented by signup date, feature usage, or plan type
- **Value:** The single most important metric for SaaS products. If Week 1 retention is 40% and Week 4 is 10%, the product has a retention problem — not an acquisition problem

---

### 2. Retainer & Ongoing Support

#### Monthly Analytics Review (Alternative to PostHog)
- **Use case:** For clients who prefer Amplitude's analysis depth over PostHog's breadth, monthly review of Amplitude data → written report on engagement, retention, and feature adoption
- **Value:** Data-driven product recommendations based on actual user behaviour, not assumptions

---

## Quick-Win Implementations

### Priority 1: Amplitude + Next.js Setup (30 min)
```typescript
// lib/amplitude.ts
import * as amplitude from '@amplitude/analytics-browser'

export function initAmplitude() {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
    },
  })
}

// Track custom events
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  amplitude.track(eventName, properties)
}

// Usage:
trackEvent('feature_used', { feature: 'booking', time_of_day: 'morning' })
trackEvent('onboarding_completed', { duration_seconds: 180 })
```

### Priority 2: Key Event Schema (1 hour)
Define the core events to track for every SaaS application:
```typescript
// Core SaaS events
'account_created'
'account_verified'
'onboarding_started'
'onboarding_completed'
'feature_used'
'settings_changed'
'upgrade_started'
'upgrade_completed'
'support_contacted'
'session_started'
```

### Priority 3: Funnel Configuration (30 min)
Set up the primary onboarding funnel in Amplitude:
1. Step 1: `account_created`
2. Step 2: `onboarding_started`
3. Step 3: `onboarding_completed`
4. Step 4: `feature_used`

Review the conversion rate at each step monthly.

---

## Resource Budget Planning

**Free tier covers most SME applications:**

| Metric | Typical Usage (SME SaaS) | Free Limit | Headroom |
|--------|-------------------------|-------------|----------|
| Events/month | 10,000–50,000 | 100,000 | ~50%+ |
| Dashboard users | 2–5 | Unlimited | N/A |
| Funnels | 5–10 | Unlimited | N/A |
| Retention analyses | 3–5 | Unlimited | N/A |

**When to upgrade to Growth (custom pricing):**
- Event volume exceeds 100,000/month
- Need predictive analytics (AI-powered insights)
- Need custom data destinations (send Amplitude data to data warehouse)
- Need data transformation (clean and enrich event data)

---

## Amplitude vs. PostHog Decision Guide

| Requirement | Amplitude | PostHog |
|------------|-----------|---------|
| Event tracking | ✅ 100K/month | ✅ 1M/month |
| Session recording | ❌ (separate product) | ✅ 5,000/month |
| Feature flags | ❌ | ✅ 1M/month |
| A/B testing | ❌ | ✅ |
| Funnel analysis | ✅ (more sophisticated) | ✅ |
| Retention cohorts | ✅ (more visual) | ✅ |
| Pathfinder (user journey discovery) | ✅ | ✅ |
| Self-hosting option | ❌ | ✅ |
| Free tier generosity | 100K events | 1M events |
| Best for | Deep behavioural analytics | All-in-one product analytics |

**Recommendation:** Default to PostHog for most builds (more generous free tier, all-in-one platform). Use Amplitude when the client specifically needs deeper behavioural analysis, already has an Amplitude account, or needs enterprise-grade funnel and retention reporting.

---

## Risks & Considerations

1. **No session recording on free tier:** Unlike PostHog (which includes 5,000 session replays/month), Amplitude's session replay is a separate paid product. For behavioural + visual debugging, use PostHog or pair Amplitude with a separate replay tool
2. **No feature flags or A/B testing:** Amplitude focuses purely on analytics. If the client needs feature flags or experiments, use PostHog alongside Amplitude (or just use PostHog for everything)
3. **100K event limit vs. PostHog's 1M:** Amplitude's free tier is 10x more restrictive than PostHog's. For high-traffic applications, PostHog provides more headroom
4. **Complexity:** Amplitude has a steeper learning curve than PostHog. The analysis tools are more powerful but require more expertise to use effectively. For clients who will self-serve, PostHog may be more accessible
5. **Upsell pressure:** Amplitude's free tier is designed to showcase the platform's depth and drive upgrades to Growth (custom pricing, typically $2,000+/month). PostHog's free tier is more generous and the pay-as-you-go pricing is more transparent

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| SaaS behavioural analytics (Tier C) | Included in P48,000+ build | $0 (free tier) | 100% |
| Monthly analytics review (retainer) | Included in retainer | $0 | 100% |
| Funnel and retention analysis setup | Included in build | $0 | 100% |

**Key insight:** Amplitude is the deep-dive behavioural analytics platform — best for SaaS products where understanding feature adoption, onboarding friction, and retention patterns is critical. Its free tier (100,000 events/month) is sufficient for most SME applications but significantly less generous than PostHog's 1M events. For Edmond's builds, default to PostHog (more features, more generous free tier) and reserve Amplitude for clients who specifically need its more sophisticated funnel and retention analysis capabilities, or who already have an Amplitude account and team familiar with the platform.

---

**End of Amplitude Analytics Integration Strategy**
