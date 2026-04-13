# AI Prototyping Builders Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Coverage:** Bolt.new, Replit, Lovable (existing doc cross-referenced)
**All platforms: No credit card required for free tier**

---

## Overview

AI app builders generate working applications from natural language descriptions. They differ from AI IDEs (Antigravity, Cursor, Trae) in that they generate the entire application — frontend, backend, database, and deployment — from a single conversational interface, without requiring a local development environment.

For Edmond's practice, these tools serve as:

1. **Rapid prototyping during advisory sessions** — Show clients their idea working in minutes, not days
2. **Early-stage MVP for startup founders** — Validate product-market fit before investing in production builds
3. **Architectural exploration** — Generate multiple approaches to the same problem, adopt good patterns
4. **Client visualisation** — A working prototype communicates requirements far more effectively than a wireframe

---

## Platform Comparison Matrix (Free Tiers)

| Feature | Bolt.new | Replit | Lovable |
|---------|---------|--------|---------|
| **Free tier limit** | 300K tokens/day, 1M tokens/month | Daily Agent credits, 1 published app | 5 credits/day, 30/month |
| **No credit card** | ✅ | ✅ | ✅ |
| **Full-stack generation** | ✅ | ✅ | ✅ |
| **Built-in hosting** | ✅ (bolt.host) | ✅ (replit.app) | ✅ (lovable.app) |
| **Code export** | ✅ | ✅ | ✅ |
| **Private projects (free)** | ✅ | ❌ (public only) | ❌ (public only) |
| **Custom domain** | ❌ (Pro only) | ❌ (Pro only) | ❌ (Pro only) |
| **AI model** | Claude/GPT (varies) | Replit AI (custom) | Claude/GPT (varies) |
| **Best for** | Quick web app prototypes | Full-stack with compute | Polished full-stack apps |
| **Biggest limitation** | 300K daily token cap | Apps sleep after inactivity | 30 credits/month cap |

---

## By Platform — Free Tier Details

### 1. Bolt.new (StackBlitz)

**Free Tier:**
- 300,000 tokens per day
- 1,000,000 tokens per month
- Built-in hosting on bolt.host
- Public and private projects (even on free tier)
- No credit card required

**Token Budget Reality:**
- 300K tokens/day lasts ~5-10 iterations on a serious project
- A single complex generation can consume 50K-100K tokens
- After hitting the daily cap, you wait until the next day
- Monthly cap of 1M means ~3 full days of active prototyping per month

**Best Use Cases:**
- **Quick web app prototypes** — Landing pages, dashboards, simple CRUD apps
- **Private client demos** — Free tier includes private projects (unique advantage)
- **Built-in hosting** — Share a live URL immediately, no separate deployment

**Prompting Strategy:**
Bolt responds best to specific, structured descriptions:
```
Build a restaurant booking system with:
- A homepage with restaurant info and photo gallery
- A booking page with date/time picker and party size selector
- An admin dashboard showing upcoming bookings
- Store data in a local database
- Style: warm, modern restaurant aesthetic
```

**When to choose Bolt over alternatives:**
- You need a private project (only Bolt offers this free)
- You need built-in hosting with a shareable URL
- The prototype is a web app, not a full-stack application with custom backend logic

---

### 2. Replit

**Free Tier (Starter Plan):**
- Unlimited public Repls (projects)
- Free daily Agent credits for small tasks
- Basic compute (512MB RAM, 0.2-0.5 vCPU)
- Up to 1 published app at a time
- Apps sleep after inactivity (wake-up delay of 10-30 seconds)
- Community features (forking, sharing)
- No credit card required

**Agent Capability:**
- Replit Agent can generate full applications from descriptions
- Daily credits are limited — enough for small tasks, not full projects
- Basic AI integrations are free, advanced features require paid plans

**Best Use Cases:**
- **Learning and experimentation** — Public Repls are great for open-source sharing
- **Quick prototypes with actual backend** — Replit provides real compute, not just frontend
- **Multi-language projects** — Replit supports Python, Node.js, Go, Rust, and more
- **Collaborative coding** — Multiplayer editing for pair programming sessions

**When to choose Replit over alternatives:**
- You need server-side compute (not just a static frontend)
- You're working with non-JavaScript languages (Python, Go, etc.)
- You want to share your prototype publicly as a learning resource

**Limitation awareness:**
- The sleep-after-inactivity makes demos unreliable — the first visitor after a quiet period waits 10-30 seconds for the app to wake
- Only 1 published app at a time on free tier
- All projects are public

---

### 3. Lovable

**Free Tier:** (See `lovable-strategy.md` for full details)
- 5 credits per day
- Capped at 30 credits per month
- Public projects only
- No credit card required
- Full-stack generation (React + Supabase backend)

**Credit Economy:**
- Each generation/edit consumes credits based on complexity
- A full app generation may cost 3-5 credits
- Small edits cost 1 credit
- 30 credits/month = ~6-10 full app generations or ~30 small edits

**Best Use Cases:**
- **Polished full-stack prototypes** — Lovable's output tends to be the most production-looking
- **Supabase-backed applications** — Native Supabase integration
- **Iterative refinement** — Small edits are cheap (1 credit each)

**When to choose Lovable over alternatives:**
- You need the most polished, production-ready prototype
- You want Supabase as the backend (native integration)
- You plan to export the code and continue development manually

---

## Platform Selection Decision Tree

```
What are you building?
├── Quick web app prototype (frontend + simple backend)?
│   ├── Need it private? → Bolt.new (only free platform with private projects)
│   ├── Need real server-side compute? → Replit
│   └── Need polished full-stack with Supabase? → Lovable
├── Multi-language project (Python, Go, etc.)?
│   └── Replit (best language support)
├── Need to share live URL immediately?
│   └── All three provide hosting — Bolt.new is fastest to deploy
├── Need to export code for production refinement?
│   └── All three support export — Lovable produces the cleanest code
└── Need collaborative/real-time editing?
    └── Replit (multiplayer editing)
```

---

## Advisory Session Prototyping Workflow

This is the highest-value use case for all three platforms:

```
Step 1: Client describes their idea during the session (5 min)
Step 2: Choose the platform:
  - Simple web app → Bolt.new
  - Full-stack with backend → Lovable
  - Server-side logic needed → Replit
Step 3: Input the description → generate prototype (2-5 min)
Step 4: Client interacts with the prototype
Step 5: Iterate via conversational editing:
  - "Make the booking form simpler"
  - "Add a pricing section"
  - "Change the colour scheme to navy and gold"
Step 6: Export the code → review → refine → deploy if needed
```

**Critical:** Be explicit with the client that this is a prototype — not the final product. The risk is the client seeing a working application in 10 minutes and expecting the production build to take the same effort.

---

## Production Hardening Checklist

AI-generated code requires these refinements before production:

- [ ] Add proper error handling (try/catch, error boundaries, fallback UI)
- [ ] Add TypeScript strict types (replace `any` with proper types)
- [ ] Add accessibility attributes (ARIA labels, semantic HTML, keyboard navigation)
- [ ] Add form validation (client-side and server-side)
- [ ] Add security hardening (input sanitisation, CSRF protection, rate limiting)
- [ ] Optimise performance (lazy loading, image optimisation, code splitting)
- [ ] Add proper environment variable management
- [ ] Add deployment configuration (Vercel, Supabase production setup)
- [ ] Add analytics and monitoring (PostHog, Sentry)
- [ ] Add SEO metadata (meta tags, Open Graph, structured data)

Estimated hardening time: 2-20 hours depending on application complexity.

---

## Quick-Win Implementations

### Priority 1: Account Setup (15 min)
Create accounts on all three platforms:
- Bolt.new → bolt.new (Google/GitHub login)
- Replit → replit.com (Google/GitHub login)
- Lovable → lovable.dev (Google/GitHub login)

### Priority 2: Prompt Template Library (1 hour)
Create reusable prompt templates for common prototype types:
```
Template: Booking System
"Build a booking system for a [business type] with:
- A homepage with business info and services
- A booking page with date/time selection
- A confirmation email sent after booking
- An admin view showing all bookings
- Clean, modern design"

Template: E-commerce Frontend
"Build a product catalogue with:
- Product listing page with categories and search
- Product detail pages with images and descriptions
- A shopping cart
- A checkout form
- Clean, professional design"

Template: Dashboard
"Build an admin dashboard with:
- A sidebar navigation
- Key metrics cards (revenue, users, orders)
- A recent activity feed
- User management table
- Dark theme, modern design"
```

### Priority 3: Code Review Pipeline (30 min)
After exporting AI-generated code:
1. Open in Cursor or Antigravity
2. Ask AI to review for security issues, type errors, and accessibility gaps
3. Apply fixes iteratively
4. Deploy to Vercel for production testing

---

## Resource Budget Planning

| Platform | Daily Capacity | Monthly Capacity | Cost |
|----------|---------------|-----------------|------|
| Bolt.new | 300K tokens/day | 1M tokens/month | $0 |
| Replit | Daily Agent credits (limited) | ~1 published app | $0 |
| Lovable | 5 credits/day | 30 credits/month | $0 |

**Combined:** Three different prototyping engines, all free. Use Bolt.new for quick private prototypes, Replit for server-side compute, and Lovable for polished full-stack apps.

---

## Risks & Considerations

1. **Code quality is prototype-grade:** AI-generated code lacks production hardening. Never deploy directly — always review, test, and refine
2. **Client expectation management:** A working prototype in 10 minutes creates unrealistic expectations. Be explicit: "This shows us what's possible. The production build will take X weeks because we need to add security, testing, accessibility, and reliability."
3. **Platform lock-in:** Exported code may have platform-specific dependencies. Verify the exported code runs independently before committing to a platform
4. **Public projects on Replit and Lovable:** All free-tier projects are publicly visible. Don't prototype client-confidential ideas on these platforms
5. **Token/credit consumption on complex projects:** A single complex generation can consume a significant portion of your daily/monthly budget. Plan your iterations carefully — start simple, then add complexity
6. **No production databases on free tiers:** All three platforms provide development databases. For production data, connect to Supabase, Neon, or Turso separately

---

## Summary: Value to Practice

| Use Case | Platform | Time to Prototype | Value |
|----------|---------|-------------------|-------|
| Advisory session live demo | Bolt.new / Lovable | 5-10 min | Transforms abstract discussion into concrete experience |
| Early-stage MVP for founders | Lovable / Replit | 30-60 min | Validates product-market fit before P48,000+ investment |
| Architectural exploration | All three | 15-30 min each | Multiple approaches compared before committing to a build |
| Client requirement validation | Bolt.new | 10-20 min | Client sees what they want before scoping begins |

**Key insight:** AI prototyping builders are not development tools — they are communication tools. Their highest value is in making abstract ideas concrete during advisory sessions, requirement-gathering meetings, and scoping calls. A client who interacts with a 10-minute prototype has a fundamentally different quality of conversation than one who describes their idea verbally. Use Bolt.new for quick private prototypes, Replit for server-side experiments, and Lovable for polished full-stack demos. Always harden the exported code before any production deployment.

---

**End of AI Prototyping Builders Strategy**
