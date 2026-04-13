# PostHog Analytics Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** PostHog (posthog.com)
**Free Tier:** 1 million events/month, 5,000 session recordings/month, 1 million feature flag requests/month, 250 survey responses/month

---

## Overview

PostHog is an open-source product analytics platform that combines event tracking, session recordings, feature flags, A/B testing, and surveys in a single platform. Its free tier is exceptionally generous — 1 million events and 5,000 session recordings per month cover most SME websites and applications with significant headroom.

For Edmond's service offerings, PostHog serves as:

1. **Website analytics for all builds** — Replacing Google Analytics for clients who prefer privacy-focused, session-level analytics
2. **Session recording for UX audit** — Watch how real visitors interact with client sites to identify friction points
3. **Feature flags for staged rollouts** — Deploy new features to a subset of users before full release
4. **A/B testing for conversion optimisation** — Test different page layouts, CTAs, and form designs with statistical significance

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Events | 1,000,000/month |
| Session recordings | 5,000/month (web), 2,500/month (mobile) |
| Feature flag requests | 1,000,000/month |
| Survey responses | 250/month |
| Data warehouse rows synced | 1,000,000/month |
| Users | Unlimited |
| Projects | 1 project per organisation on free tier |
| Data retention | 1 year on free tier |
| Team members | Unlimited |

**After free tier:** Pay-as-you-go pricing — $0.00031/event after 1 million, $15/1,000 session recordings after 5,000.

---

## By Service Category

### 1. Web Design & Development

#### Default Analytics for All Builds (Growth — from P19,500)
- **Use case:** PostHog replaces Google Analytics as the primary analytics tool for Growth builds and Boilerplate builds
- **Events tracked:** Page views, form submissions, button clicks, scroll depth, outbound link clicks, file downloads
- **Value:** Privacy-compliant analytics (PostHog can be self-hosted in the EU or US). Session recordings show exactly how visitors use the site — not just aggregate numbers

#### Conversion Funnel Tracking
- **Use case:** Track the visitor journey from landing page → service page → contact form submission. Identify where visitors drop off
- **PostHog Funnels:** Define steps → PostHog visualises conversion rate at each step → identifies the biggest leak in the funnel
- **Value:** Data-driven conversion optimisation. Instead of guessing why visitors don't convert, see exactly where they leave

#### Scroll Depth and Engagement Tracking
- **Use case:** Track how far visitors scroll on key pages (home, services, about). Identify content that's never seen because it's below the fold
- **Value:** Informs design decisions — if 60% of visitors never scroll past the hero section, the hero must carry the entire value proposition

---

### 2. Web Applications

#### Feature Flags for Staged Rollouts
- **Use case:** Deploy a new feature (e.g., client portal, booking system) to 10% of users → monitor for errors → gradually increase to 50%, then 100%
- **Value:** Zero-downtime feature releases. If a bug is discovered, disable the flag instantly without redeploying
- **Free tier capacity:** 1 million feature flag requests/month — enough for 33,000 users making 30 flag checks/day

#### A/B Testing for Conversion Optimisation
- **Use case:** Test two versions of a landing page — version A with a long-form layout, version B with a short-form layout and prominent CTA
- **PostHog Experiments:** Automatically splits traffic → tracks conversion → calculates statistical significance → recommends winner
- **Value:** Data-driven design decisions. "We tested two layouts and version B converted 23% better" is a powerful client report

#### User Behaviour Analysis via Session Recordings
- **Use case:** Watch 50 session recordings per month to understand how real users navigate the application. Identify rage clicks, confusion, and dead ends
- **Value:** The single most valuable tool for UX improvement. Seeing a real visitor struggle with a form is more actionable than any analytics dashboard

---

### 3. Retainer & Ongoing Support

#### Monthly Analytics Review (Included in Foundation Cover — from P2,500/month)
- **Use case:** Monthly review of PostHog data → written report on traffic trends, conversion rates, top pages, and drop-off points
- **Value:** Proactive optimisation. Instead of waiting for the client to report issues, Edmond identifies and addresses problems before the client notices

#### A/B Testing as Retainer Add-On (+P2,500/month)
- **Use case:** Design, implement, and analyse one A/B test per month on the client's site
- **Process:** Hypothesis → test design → implementation in PostHog → run for statistical significance → report results → implement winner
- **Value:** Continuous conversion rate improvement as part of the retainer

---

### 4. SEO, GEO & Google Business

#### Content Performance Tracking
- **Use case:** Track which GEO-optimised content pieces (FAQ pages, service pages, blog posts) receive the most engagement
- **PostHog metrics:** Page views, time on page, scroll depth, outbound link clicks to contact forms
- **Value:** Identifies which content is actually being consumed vs. which is just published. Informs the next month's content strategy

---

## Quick-Win Implementations

### Priority 1: PostHog Setup for Next.js (30 min)
```typescript
// app/layout.tsx
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    autocapture: true, // Automatically track clicks, form submissions, pageviews
  })
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <html lang="en">{children}</html>
    </PostHogProvider>
  )
}
```

### Priority 2: Custom Event Tracking (1 hour)
```typescript
// Track specific business events
posthog.capture('contact_form_submitted', {
  form_type: 'general_enquiry',
  page_url: window.location.pathname,
  referrer: document.referrer,
})

posthog.capture('booking_completed', {
  service_type: 'discovery_call',
  booking_source: 'homepage_cta',
})
```

### Priority 3: Session Recording Sampling (15 min)
```typescript
// Record 100% of sessions for small sites, or sample for high-traffic sites
posthog.init(KEY, {
  session_recording: {
    sampleRate: 1.0, // 100% (reduce to 0.1 for 10% on high-traffic sites)
  },
})
```

---

## Resource Budget Planning

**Free tier covers most websites and applications:**

| Metric | Typical Usage (Marketing Site) | Free Limit | Headroom |
|--------|-------------------------------|-------------|----------|
| Events/month | 10,000–50,000 | 1,000,000 | ~95%+ |
| Session recordings | 500–2,000 | 5,000 | ~60%+ |
| Feature flag requests | 5,000–50,000 | 1,000,000 | ~95%+ |
| Survey responses | 10–100 | 250 | ~60%+ |

| Metric | Typical Usage (SaaS Application) | Free Limit | Headroom |
|--------|--------------------------------|-------------|----------|
| Events/month | 50,000–200,000 | 1,000,000 | ~80%+ |
| Session recordings | 1,000–3,000 | 5,000 | ~40%+ |
| Feature flag requests | 100,000–500,000 | 1,000,000 | ~50%+ |

**When costs increase:**
- Events exceed 1M/month → $0.00031/event. 2M events = $310/month for overages
- Session recordings exceed 5,000/month → $15/1,000 additional recordings
- For most SME sites and applications, the free tier lasts indefinitely

---

## Risks & Considerations

1. **Privacy compliance:** PostHog collects user behaviour data. Ensure cookie consent banners (GDPR add-on +P1,500) are in place for EU visitors. PostHog can be configured to anonymise IPs and respect Do Not Track
2. **Session recording storage:** Recordings are stored on PostHog's servers. For clients with strict data residency requirements (financial services, healthcare), self-host PostHog on the client's infrastructure
3. **Performance impact:** PostHog's autocapture adds ~30–50ms to page load. This is negligible for most sites but should be tested on performance-critical pages
4. **Data retention (1 year on free tier):** After 1 year, data is purged. If historical analysis beyond 1 year is needed, export data to a data warehouse (BigQuery, Snowflake — paid feature)
5. **Survey limit (250 responses/month):** Useful for NPS, feedback collection, and usability testing — but 250 responses can be consumed quickly on high-traffic sites. Monitor usage

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Analytics setup (Growth builds) | Included in P19,500 | $0 (free tier) | 100% |
| Boilerplate analytics integration | Included in boilerplate price | $0 (free tier) | 100% |
| A/B testing (retainer add-on) | +P2,500/month | $0 (free tier) | 100% |
| Monthly analytics review (retainer) | Included in P2,500/month | $0 (free tier) | 100% |
| Session recording UX audit | P2,000 standalone | $0 | 100% |

**Key insight:** PostHog's free tier (1M events, 5,000 session recordings) is the most generous product analytics platform available. It replaces Google Analytics for clients who want session-level insights, provides A/B testing that would otherwise require Optimizely ($50,000+/year), and includes feature flags that eliminate the need for LaunchDarkly. For virtually every SME build Edmond delivers, PostHog's free tier covers the entire analytics requirement indefinitely. The session recording capability alone justifies its inclusion — seeing how real visitors use a site is the single most actionable insight for conversion improvement.

---

**End of PostHog Analytics Integration Strategy**
