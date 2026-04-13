# Kinde Authentication Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Kinde (kinde.com)
**Free Tier:** 7,500 monthly active users (MAU), unlimited team members, basic features, 2 social connections

---

## Overview

Kinde is a lightweight authentication platform designed for developers who need simple, reliable auth without the complexity of Auth0 or the enterprise overhead of traditional identity providers. Its free tier offers 7,500 MAU — more generous than Clerk's 10,000 MAU in terms of what's included (all core auth features, no component library limitations).

For Edmond's practice, Kinde serves as:

1. **Alternative to Clerk** — When a lighter, simpler auth solution is preferred, or when the client's application is expected to scale beyond Clerk's free tier more cost-effectively
2. **Lightweight SaaS auth** — For applications that need email/password + OAuth login without Clerk's pre-built UI components (Kinde provides hosted pages instead)
3. **B2B authentication** — Kinde's organisation feature (teams, roles, permissions) is built-in on the free tier, making it suitable for multi-tenant applications
4. **Cost-predictable scaling** — Kinde's pricing structure is simpler and more predictable at scale than Clerk's per-MAU pricing

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Monthly Active Users (MAU) | 7,500 |
| Team members (Kinde dashboard) | Unlimited |
| Social connections | 2 (e.g., Google + GitHub) |
| Authentication methods | Email/password, magic link, OAuth, SSO (1 connection) |
| Organisations (multi-tenancy) | Included on free tier |
| Role-based access control | Included |
| API access | Full REST API |
| Webhooks | Included |
| Custom domains | 1 custom domain |
| Environment | 3 environments (dev, staging, prod) |

**Growth plan ($45/month):** 25,000 MAU, unlimited social connections, 10 SSO connections, advanced features, priority support.

---

## By Service Category

### 1. Web Applications

#### Lightweight Auth for Tier C SaaS
- **Use case:** SaaS product needing user registration, login, password reset, and organisation management
- **Architecture:** Kinde hosted auth pages → OAuth redirect → JWT token → Next.js middleware validates token → protected routes
- **Advantage over Clerk:** Simpler setup, no React component dependency (Kinde uses hosted pages, not embedded components), organisation/multi-tenancy included on free tier
- **Advantage over Supabase Auth:** Better developer experience, cleaner dashboard, built-in organisations for multi-tenant apps

#### Multi-Tenant SaaS with Organisations
- **Use case:** SaaS where users belong to organisations (teams, companies, departments) — each organisation has its own users, roles, and data
- **Kinde capability:** Create organisations → invite users → assign roles (admin, member, viewer) → filter application data by organisation
- **Value:** Multi-tenancy without building the organisation/user/role data model. Kinde handles it natively

---

### 2. Web Design & Development

#### Member Area / Gated Content (+P5,000 add-on)
- **Use case:** Alternative to Clerk for login-protected pages and client portal layers
- **Implementation:** Kinde hosted login → protected Next.js routes → content gated by authentication status and role
- **Value:** Same capability as Clerk, potentially lower cost at scale. Choose Kinde when the client's auth needs are straightforward and multi-tenancy is a requirement

---

### 3. Cost Comparison with Clerk

| Scenario | Kinde Free | Clerk Free | Kinde Growth ($45) | Clerk Pro ($25 + usage) |
|----------|-----------|-----------|-------------------|----------------------|
| 500 MAU | Free | Free | N/A | Free |
| 7,500 MAU | Free | Free | N/A | $25 + $0 |
| 10,000 MAU | $45/month | $25 + $0 | N/A | $25 + $0 |
| 25,000 MAU | $45/month | $25 + $300 = $325 | $45 | $25 + $300 = $325 |
| 50,000 MAU | Custom (~$90) | $25 + $800 = $825 | Custom | $25 + $800 = $825 |

**Key insight:** Kinde is significantly cheaper at scale (25,000+ MAU). The Growth plan ($45/month for 25,000 MAU) is far more economical than Clerk's per-MAU pricing at the same volume ($325/month).

---

## Quick-Win Implementations

### Priority 1: Kinde + Next.js Setup (30 min)
```typescript
// middleware.ts
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware'

export default withAuth({
  isReturnToCurrentPage: true,
})

export const config = {
  matcher: ['/dashboard/:path*', '/portal/:path*', '/api/protected/:path*'],
}
```

```typescript
// app/layout.tsx — KindeProvider
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <KindeProvider>
        <body>{children}</body>
      </KindeProvider>
    </html>
  )
}
```

### Priority 2: Organisation Setup (15 min)
1. Create organisation in Kinde dashboard
2. Invite users via email → users receive invite link → create account → join organisation
3. Assign roles (admin, member) within the organisation
4. In the application: filter data by organisation ID from the JWT token

### Priority 3: Protected API Route (15 min)
```typescript
// app/api/protected/route.ts
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.json({ message: `Hello, ${user.given_name}` })
}
```

---

## Resource Budget Planning

**Free tier covers most SME applications:**

| Metric | Typical Usage | Free Limit | Headroom |
|--------|--------------|-------------|----------|
| MAU | 50–2,000 | 7,500 | ~73%+ |
| Social connections | 2 (Google + GitHub) | 2 | Full |
| Custom domains | 1 | 1 | Full |
| Organisations | 1–5 | Unlimited | N/A |

**When to upgrade to Growth ($45/month):**
- MAU approaches 7,500
- Need more than 2 social connections
- Need more than 1 SSO connection
- Need advanced features (MFA, user impersonation, custom claims)

---

## Risks & Considerations

1. **Hosted pages vs. embedded components:** Kinde uses hosted authentication pages (redirect to Kinde, authenticate, redirect back). Clerk embeds login components directly in the app. Kinde's approach is simpler to set up but less customisable in terms of UI integration
2. **2 social connection limit on free tier:** Only 2 OAuth providers (e.g., Google + GitHub). If a client needs Google, GitHub, Microsoft, and Apple login, upgrade to Growth or use email/password as the fallback
3. **Smaller ecosystem:** Kinde has fewer tutorials, community resources, and third-party integrations than Clerk or Auth0. When issues arise, the solution may not be as easily findable
4. **Custom domain limit (1 on free tier):** Only 1 custom auth domain. If a client needs auth on multiple domains (e.g., `app.client.com` and `admin.client.com`), upgrade to Growth
5. **Less mature than Auth0:** Kinde is newer and simpler. For enterprise-grade requirements (SAML, SCIM, advanced MFA policies, compliance certifications), Auth0 is the more proven platform

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| SaaS authentication (Tier C) | Included in P48,000+ build | $0 (free tier) | 100% |
| Multi-tenant auth with organisations | Included in build | $0 | 100% |
| Member area add-on (+P5,000) | P5,000 | $0 | 100% |
| Auth alternative when Clerk is too expensive | Cost savings at 25K+ MAU | $45/month vs. $325/month | Significant |

**Key insight:** Kinde is the lightweight, cost-predictable authentication alternative to Clerk. Its free tier (7,500 MAU) covers the vast majority of SME applications, and its Growth plan ($45/month for 25,000 MAU) is dramatically cheaper than Clerk's per-MAU pricing at scale ($325/month at 25,000 MAU). The trade-off is simplicity: Kinde uses hosted auth pages (less customisable UI) and has a smaller ecosystem. For Edmond's builds, Kinde is the recommended choice when the client's auth needs are straightforward, multi-tenancy is required, or the application is expected to scale beyond 10,000 MAU. For applications needing rich, embedded auth UI components, Clerk remains the better choice.

---

**End of Kinde Authentication Integration Strategy**
