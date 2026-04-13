# Lovable Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026 | **Updated:** 6 April 2026 (limits verified)
**Platform:** Lovable (lovable.dev) — AI full-stack builder
**Free Tier:** 5 credits/day, capped at 30/month. Public projects only. No credit card required.

**Related doc:** `ai-prototyping-builders-strategy.md` (Bolt.new, Replit, Lovable compared)

---

## Overview

Lovable is an AI-powered full-stack application builder that generates working applications from natural language descriptions. Unlike Cursor (which assists within an IDE), Lovable generates entire applications — frontend, backend, database schema, and deployment configuration — from conversational prompts.

For Edmond's practice, Lovable serves as:

1. **Rapid prototyping** — Generate a functional prototype in minutes during advisory sessions or discovery calls, then refine and productionise manually
2. **Client visualisation tool** — Show prospects a working prototype of their concept during the scoping process — dramatically improves mutual understanding
3. **Early-stage MVP for startups** — For founder clients who need to validate an idea before investing in a production build
4. **Learning and exploration** — Experiment with new frameworks, patterns, and architectures by asking Lovable to generate implementations

---

## Free Tier Capabilities (2026 — Verified)

| Feature | Limit |
|---------|-------|
| Daily credits | 5/day |
| Monthly cap | 30 credits/month (credits don't accumulate) |
| Project visibility | Public only (private projects require Pro) |
| Credit card | Not required |
| Full-stack generation | Frontend + backend (Supabase) + database |
| Deployment | Built-in deployment (Lovable-hosted) |
| Code export | Export generated code for manual refinement |
| Editing | Conversational editing — small edits cost 1 credit, full generations cost 3-5 credits |
| Technology stack | React, TypeScript, Tailwind CSS, Supabase |
| Integrations | Limited on free tier — expands on paid plans |

**Paid plans:** Usage-based pricing — credits consumed per generation and edit. Exact pricing varies by plan tier.

---

## By Service Category

### 1. Advisory & Consulting

#### Live Prototyping During Sessions
- **Use case:** Advisory client describes their business idea → Edmond inputs the description into Lovable → within minutes, a working prototype appears → client interacts with it → iterate based on feedback
- **Value:** Transforms abstract discussions into concrete experiences. "I want a booking system for my salon" becomes a working application in 10 minutes. The client can click, navigate, and give specific feedback
- **Outcome:** Much more accurate scoping for the eventual production build. The prototype reveals requirements that wouldn't emerge in a conversation

#### Proof of Concept for Investors
- **Use case:** Founder client needs a working prototype for investor presentations → Lovable generates the prototype → Edmond refines the UI and deploys → client has a tangible product to demonstrate
- **Value:** Reduces the cost of investor-ready prototypes from P15,000–30,000 (custom development) to P2,500–5,000 (Lovable generation + refinement)

---

### 2. Web Applications

#### Early-Stage MVP Generation
- **Use case:** Startup client needs an MVP to validate product-market fit → Lovable generates the core application → Edmond refines the code, adds production-grade error handling, security, and deployment configuration → ships to early users
- **Value:** Faster time-to-market for validation. The Lovable-generated code is the starting point — Edmond's production hardening makes it viable for real users
- **Caveat:** Lovable-generated code is not production-ready. It lacks proper error handling, security hardening, performance optimisation, and accessibility compliance. Always plan for manual refinement before any public launch

#### Boilerplate Exploration
- **Use case:** Before building a new Boilerplate type, use Lovable to explore different architectural approaches → "Generate a restaurant booking system using Next.js and Supabase" → review the generated architecture → adopt good patterns, discard bad ones
- **Value:** Rapid architectural exploration. Instead of spending hours researching patterns, Lovable generates multiple approaches in minutes

---

### 3. Web Design & Development

#### Quick Visual Prototyping
- **Use case:** Client wants to see what their site could look like → describe the layout, content, and style to Lovable → generate a visual prototype → iterate on colours, layout, and content
- **Value:** Faster than designing in Figma for clients who want to see a working page, not a static mockup. The prototype is interactive — they can click, scroll, and interact

---

## Quick-Win Implementations

### Priority 1: Advisory Session Prototyping Workflow (15 min setup)
```
1. Client describes their idea during the advisory session
2. Edmond inputs the description into Lovable
3. Lovable generates a working prototype (2–5 minutes)
4. Client interacts with the prototype
5. Edmond iterates via conversational editing:
   - "Make it look more professional — darker colours, cleaner layout"
   - "Add a pricing section with three tiers"
   - "Add a contact form that sends emails"
6. Export the code → review → refine → deploy if needed
```

### Priority 2: Code Review and Production Hardening (2 hours per prototype)
Lovable-generated code requires these refinements before production:
- [ ] Add proper error handling (try/catch, error boundaries, fallback UI)
- [ ] Add TypeScript strict types (replace `any` with proper types)
- [ ] Add accessibility attributes (ARIA labels, semantic HTML, keyboard navigation)
- [ ] Add form validation (client-side and server-side)
- [ ] Add security hardening (input sanitisation, CSRF protection, rate limiting)
- [ ] Optimise performance (lazy loading, image optimisation, code splitting)
- [ ] Add proper environment variable management
- [ ] Add deployment configuration (Vercel, Supabase production setup)
- [ ] Add analytics and monitoring (PostHog, Sentry)

### Priority 3: Architectural Pattern Library (3 hours)
Use Lovable to generate common patterns → review the code → extract good patterns → add to Edmond's internal pattern library:
- Authentication flows
- CRUD operations
- Dashboard layouts
- Form handling with validation
- Data tables with sorting and filtering
- Payment integration patterns

---

## Resource Budget Planning

**Free tier usage:**

| Activity | Free Tier Consumption | Notes |
|----------|----------------------|-------|
| Prototype generation | 1 project per generation | Sufficient for advisory sessions |
| Conversational editing | Limited edits per project | Sufficient for 10–15 iterations |
| Code export | Included | Essential for production refinement |
| Deployment | Lovable-hosted | Fine for demos, not for production |

**When paid credits are needed:**
- Multiple prototypes in the same session
- Complex applications that require many iterative edits
- Production deployments through Lovable's hosting

---

## Risks & Considerations

1. **Code quality:** Lovable-generated code is functional but not production-grade. It typically lacks proper error handling, security hardening, accessibility compliance, and performance optimisation. **Never deploy Lovable-generated code directly to production** — always review, test, and harden
2. **Technology lock-in:** Lovable generates applications using its preferred stack (React, TypeScript, Tailwind, Supabase). If a project requires a different stack (Next.js App Router, Payload CMS, etc.), the generated code requires significant adaptation
3. **Limited context:** Lovable doesn't understand the client's existing infrastructure, business rules, or compliance requirements. It generates generic applications — the domain-specific logic must be added manually
4. **Free tier limits:** The free tier is designed for exploration, not production use. For regular prototyping work, paid credits will be consumed. Budget accordingly
5. **Client expectations:** When showing a Lovable prototype to a client, be explicit that it is a prototype — not the final product. The risk is the client seeing a working application in 10 minutes and expecting the production build to take the same effort
6. **Code ownership:** Exported code from Lovable is owned by the user — there are no licensing restrictions on the generated code. However, the Lovable platform itself is a dependency for editing — once exported, manual editing is required

---

## Summary: Value to Practice

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Live prototyping (advisory sessions) | Included in P2,500 session | Free tier credits | 100% |
| Proof of concept for investors | P2,500–5,000 | 2–3 hours refinement | 100% |
| MVP generation + production hardening | Quoted per scope (typically 30–50% of full custom build) | 10–20 hours | 100% |
| Architectural exploration (internal) | N/A | Free tier credits | N/A |

**Key insight:** Lovable is the fastest path from idea to working prototype — but the prototype is a starting point, not a deliverable. Its value for Edmond's practice is in advisory sessions (showing clients their idea in working form), early-stage MVPs for startup founders, and architectural exploration for complex builds. The critical discipline is production hardening: every Lovable-generated application requires 2–20 hours of manual refinement (error handling, security, accessibility, performance) before it is viable for production use. Be transparent with clients about this — the prototype demonstrates possibility; the production build delivers reliability.

---

**End of Lovable Integration Strategy**
