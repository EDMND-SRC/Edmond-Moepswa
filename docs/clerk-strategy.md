# Clerk Authentication Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Clerk (clerk.com)
**Free Tier:** 10,000 monthly active users (MAU), unlimited sign-ins, all core features included

---

## Overview

Clerk is a developer-first authentication platform that provides sign-in, sign-up, user management, and session handling with pre-built UI components. Its free tier is exceptionally generous — 10,000 MAU covers most small-to-medium applications with room to grow.

For Edmond's service offerings, Clerk serves as:

1. **User authentication for SaaS products** — Email/password, OAuth (Google, GitHub, Microsoft), magic links, and passkeys
2. **User management UI** — Pre-built `<SignIn />`, `<SignUp />`, and `<UserProfile />` components that work out of the box
3. **Multi-tenant auth** — Organisations feature for applications where users belong to teams or companies
4. **Alternative to Supabase Auth** — When richer auth UI and user management are needed than Supabase provides natively

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Monthly Active Users (MAU) | 10,000 |
| Sign-ins | Unlimited |
| Applications | Unlimited |
| Users who sign up but don't sign in | Not counted against MAU |
| Pre-built components | All included (SignIn, SignUp, UserProfile, OrganisationProfile) |
| OAuth providers | All included (Google, GitHub, Microsoft, Apple, etc.) |
| Custom domain | 1 custom domain on free tier |
| Team members (Clerk dashboard) | Unlimited |
| Rate limits | Standard rate limits apply (can be restrictive on free tier for high-traffic apps) |

**After 10,000 MAU:** Pro plan at $25/month + $0.02 per additional MAU. At 50,000 users: ~$825/month. At 100,000: ~$1,825/month. This pricing cliff is important to understand at scoping.

---

## By Service Category

### 1. Web Applications

#### Primary Auth for Tier C (Custom SaaS)
- **Use case:** SaaS products requiring user registration, login, password reset, profile management, and session handling
- **Components:** `<SignIn />`, `<SignUp />`, `<UserProfile />` — drop in and get full auth UI in minutes
- **Integration:** Clerk's Next.js SDK provides `auth()` server component helper and `useAuth()` client hook
- **Value:** Eliminates weeks of auth development. No need to build login pages, password reset flows, email verification, or session management from scratch

#### Multi-Tenant Auth with Organisations
- **Use case:** SaaS where users belong to teams or organisations (e.g., project management tool, internal operations platform)
- **Feature:** Clerk Organisations — users can create/join organisations, have roles within organisations (admin, member), and organisation-specific permissions
- **Value:** Multi-tenancy out of the box. No custom table design for organisation memberships and role assignments

#### Boilerplate 6 — E-commerce (Alternative to Supabase Auth)
- **Use case:** Customer accounts for order history, saved addresses, and wishlist functionality
- **Advantage over Supabase Auth:** Clerk provides richer UI components, OAuth login (Google, Apple), and better user management dashboard
- **Decision factor:** Use Clerk when the client wants social login (customers prefer Google sign-in over creating a new password). Use Supabase Auth when keeping everything on one platform is preferred for cost simplicity

#### Boilerplate 7 — Professional Services Firm (Client Portal)
- **Use case:** Secure client login for document access, matter tracking, and communication
- **Integration:** Clerk handles auth → Next.js middleware protects `/portal/*` routes → data fetched from Supabase with user ID from Clerk session
- **Value:** Professional-grade login experience with minimal development effort

---

### 2. Web Design & Development

#### Member Area / Gated Content Add-On (+P5,000)
- **Use case:** Login-protected pages, resources, or client portal layer on top of a marketing site
- **Implementation:** Clerk `<SignIn />` component → protected routes via Next.js middleware → content fetched based on user role
- **Value:** Gated content functionality added to any Foundation or Boilerplate build without building auth from scratch

---

### 3. Workflow Automation

#### Webhook-Triggered User Onboarding Flows
- **Use case:** Clerk webhook fires on `user.created` → Make.com scenario → create HubSpot contact, send welcome email via Resend, assign to onboarding workflow
- **Value:** Automated user onboarding pipeline from the moment someone creates an account

#### Role-Based Email Routing
- **Use case:** Clerk user assigned "admin" role → Make.com notifies via Slack. New user signs up → welcome email sequence begins
- **Integration:** Clerk webhooks → Make.com → email/notification actions

---

## Quick-Win Implementations

### Priority 1: Clerk + Next.js Setup Template (30 min)
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/portal(.*)', '/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

### Priority 2: Custom User Metadata (1 hour)
Store additional user data (role, company, subscription tier) in Clerk's public metadata:

```typescript
// After user creation
import { clerkClient } from '@clerk/nextjs/server'

await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: {
    role: 'client',
    companyId: 'abc123',
    onboardingComplete: false,
  },
})
```

### Priority 3: Protected API Routes (30 min)
```typescript
// app/api/protected/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  // Fetch user-specific data from Supabase
  return NextResponse.json({ message: `Hello, user ${userId}` })
}
```

---

## Resource Budget Planning

**Free tier covers most applications comfortably:**

| Metric | Typical Usage (Small SaaS) | Free Limit | Headroom |
|--------|---------------------------|-------------|----------|
| MAU | 50–500 | 10,000 | ~95%+ |
| Sign-ins | 200–2,000/month | Unlimited | N/A |
| OAuth providers | 2–4 configured | All included | N/A |
| Custom domains | 1 | 1 | Full |

**When to upgrade to Pro ($25/month + $0.02/MAU):**
- MAU approaches 10,000 (rare for SME applications)
- Need more than 1 custom domain
- Need advanced rate limiting configuration
- Need MFA/2FA (included in free tier for SMS, but TOTP requires Pro)

**Critical cost warning:** At 50,000 MAU, Clerk costs ~$825/month. If a client's application is expected to exceed 10,000 MAU, evaluate alternative auth providers (Kinde, Supabase Auth, or custom) before committing to Clerk — the pricing cliff is steep.

---

## Risks & Considerations

1. **MAU pricing cliff:** The jump from free (10,000 MAU) to paid ($25 + $0.02/MAU) is significant. An application with 20,000 MAU costs $225/month. Ensure clients understand this at scoping
2. **Rate limits on free tier:** Clerk's free tier has API rate limits that can be restrictive for high-traffic applications. If the app makes many auth-related API calls (e.g., checking session status on every page load), you may hit rate limits
3. **Vendor lock-in:** Clerk's pre-built components and SDK create dependency. Migrating away requires rebuilding all auth UI and session handling
4. **Custom domain limit:** Free tier includes only 1 custom domain. If a client needs auth on multiple domains (e.g., `app.client.com` and `admin.client.com`), upgrade to Pro or use Clerk's default domain
5. **User data portability:** Clerk stores user data on their infrastructure. Export is possible via API, but migrating users to another provider requires password resets (passwords cannot be exported)

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| SaaS authentication (Tier C) | Included in P48,000+ build | $0 (free tier) | 100% |
| Client portal auth (BP7) | Included in P32,000 build | $0 (free tier) | 100% |
| Member area add-on (+P5,000) | P5,000 add-on | $0 setup cost | 100% |
| Multi-tenant organisations | Included in build | $0 (free tier) | 100% |

**Key insight:** Clerk's free tier (10,000 MAU) is the most generous auth offering available. It covers the authentication needs of virtually every SME application Edmond builds, with pre-built UI components that eliminate weeks of development work. The key risk is the pricing cliff beyond 10,000 MAU — for applications expected to scale beyond this, consider Kinde (lighter, cheaper at scale) or Supabase Auth (included with database, no separate MAU pricing) as alternatives. For the vast majority of builds, Clerk free tier = zero auth infrastructure cost.

---

**End of Clerk Authentication Integration Strategy**
