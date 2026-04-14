# Website Humanizer Review — Full Site (v4)

Apply the 29-pattern humanizer review to every page, fix factual inaccuracies, rename BridgeArc → BridgeArc Digital, remove the tools section, and implement all improvement opportunities.

## Background

This is Edmond Moepswa's personal portfolio site. Built with Next.js + Payload CMS. The IntroSection is the gold standard for voice. The site has two categories of problems: (1) AI writing patterns in transactional/functional copy, and (2) factual inaccuracies and structural issues that need targeted fixes.

> [!IMPORTANT]
> **Voice calibration baseline:** `IntroSection.tsx` — specific, first-person, admits complexity, varies sentence length. All rewrites move *toward* that benchmark.

> [!IMPORTANT]
> **Legal pages:** Formal register is intentional. Only target **clear AI-isms** — NOT the formal language itself.

---

## Critical Factual Fixes (Apply First)

These are factual errors that must be corrected before cosmetic humanizer work begins.

### Fix 1: Privacy Policy §5 — Botswana Data Protection Act

> [!CAUTION]
> **The current text is factually wrong.** Lines 89–112 of [/privacy-policy/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/privacy-policy/page.tsx) state: *"As of the last update date, Botswana does not yet have a comprehensive standalone data protection law equivalent to the GDPR."*
>
> **The Botswana Data Protection Act (Act No. 18 of 2024) was assented to on October 24, 2024, published in the Official Gazette on October 29, 2024, and came into force on January 14, 2025.** It repealed the previous 2018 Act. This is now a comprehensive, GDPR-aligned data protection law enforced by the Information and Data Protection Commission.

**Rewrite §5 to state:**

- Botswana has a comprehensive data protection law: the **Data Protection Act, 2024 (Act No. 18 of 2024)**, in force since January 14, 2025.
- Enforced by the **Information and Data Protection Commission**.
- Key obligations: lawfulness, fairness, transparency; data subject rights (access, rectification, erasure, portability, objection); 72-hour breach notification to the Commission; DPIAs for high-risk processing; cross-border transfer restrictions requiring Commission authorisation.
- Penalties: up to **50 million Pula or 4% of worldwide annual revenue**, whichever is higher.
- Remove the references to the Cybercrime Act 2007 and constitutional protections as the *primary* data obligations — these are supplementary, not the core framework anymore.
- Keep the closing paragraph about implementing best practices "regardless of minimum legal requirements" but adjust framing — Botswana now *has* substantial legal requirements.

### Fix 2: Privacy Policy — All Gumroad References → Dodo Payments

> [!CAUTION]
> The Store uses Dodo Payments as merchant of record, not Gumroad. There are **7 Gumroad references** in the privacy policy that need updating:

| Line(s) | Section | Current | Change to |
|---|---|---|---|
| 37–38 | §2.1 | `"Gumroad purchases: ... processed by Gumroad as merchant of record"` | `"Store purchases: ... processed by Dodo Payments as merchant of record"` |
| 65 | §3 | `"To deliver digital products purchased through Gumroad."` | `"To deliver digital products purchased through the Store."` |
| 157–168 | §6 | Gumroad, Inc. third-party entry with gumroad.com/privacy link | Replace with Dodo Payments entry, link to `https://dodopayments.com/privacy` |
| 241–243 | §8 | `"Gumroad purchase records: retained by Gumroad as merchant of record..."` | `"Store purchase records: retained by Dodo Payments as merchant of record..."` |
| 283 | §10 | `"...Vercel, Neon, Supabase, Make.com, Gumroad, PostHog..."` | `"...Vercel, Neon, Supabase, Make.com, Dodo Payments, PostHog..."` |

### Fix 3: BridgeArc → BridgeArc Digital

4 locations:

| File | Line | Change |
|---|---|---|
| [IntroSection.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/components/homepage/IntroSection.tsx) | 172 | `"BridgeArc"` → `"BridgeArc Digital"` |
| [/about/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/about/page.tsx) | 183 | `"BridgeArc"` → `"BridgeArc Digital"` |
| [/about/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/about/page.tsx) | 274 | `"BridgeArc"` → `"BridgeArc Digital"` |
| [README.md](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/README.md) | 10 | `"BridgeArc"` → `"BridgeArc Digital"` |

---

## Improvement Opportunities (Concrete Fixes)

### IMP-1: Testimonials — LEAVE AS-IS

Per user directive. No changes.

---

### IMP-2: Replace "designed to last" Tagline

**Problem:** Vague positive claim that appears in 5 locations. It doesn't communicate Edmond's actual differentiator (full documentation, source code ownership, and no vendor lock-in).

**Replacement:** `"built for handover"` — specific, unusual, and directly tied to the commitments section. Update in:
- `HeroSection.tsx` (~L309)
- `layout.tsx` (L82, L96, L123, L142)
- Re-align the about page hero (`"digital systems that last"`) to `"digital systems built for handover"`.

---

### IMP-3: Resources Page — Remove Tools Section & Fix Hero

**File:** [/resources/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/resources/page.tsx)

1. Delete lines 32–47 (Tools & Calculators section)
2. Remove `Wrench` import
3. Update `<h1>` to `"Free guides for your next project"`
4. Update subtitle to `"Checklists and planning documents I use with clients. Download them, no email required."` (removes "no strings attached").

---

### IMP-4: Standardize Legal Page Layouts

Refactor `terms-and-conditions`, `refund-policy`, `cancellation-policy`, and `legal-restrictions` to use the `<PolicyLayout>` component. This standardizes the back link, gradient title, and valid dates, removing redundant `FadeIn` or `motion.div` wrappers in favor of uniform prose styling.

---

### IMP-5: Footer Legal Links

**File:** [HomePageFooter.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/components/homepage/HomePageFooter.tsx)

**Change:** Add a `<Link href="/refund-policy">Refunds</Link>` alongside Privacy and Terms. (Digital products require refund policy visibility; Cancellation/Restrictions are for operational scoping).

---

### IMP-6: Tier C Features & Retainer Specifics

**File:** [/services/data.ts](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/services/data.ts)

**Current Problem:** Generic capability claims.

**Strategic Insight from Docs:** Edmond offers a specific **"Foundation Cover"** retainer (from P2,500/m) incorporating 24/7 Better Stack monitoring, Sentry errors, and PostHog reviews. Add-ons include A/B testing (+P2,500/m) and Competitor Monitoring (+P1,500/m).

**Replacement features for Tier C:**
```typescript
features: [
  'Built with Next.js + TypeScript, Supabase or Neon, and Clerk or Auth0 for auth',
  'Example: client portal with secure login, document upload, status tracking, and email notifications',
  'Example: multi-staff booking platform with availability calendars, payment at booking, and admin dashboard',
  'Example: property listings platform with search filters, enquiry flow, and CMS-managed catalogue',
  'Example: membership platform with gated content, recurring billing via Dodo Payments, and usage tracking',
  'Foundation Cover retainer (from P2,500/m): 24/7 uptime monitoring, error tracking, and analytics review',
  'Retainer add-ons: Continuous A/B Testing and Competitor Monitoring',
],
```

**Description update:** Replace with *'Custom web applications for clients whose requirements go beyond a marketing site. Client portals, booking platforms, SaaS products, internal tools. Every build is scoped individually after a discovery call.'*

---

### IMP-7: Advisory Services — Business Operations Differentiator

**File:** [/services/data.ts](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/services/data.ts)

**Strategic Insight from Docs:** The core differentiator is a strong finance and operations background over standard generic web development. Also, for SMEs in Botswana, **Google Business Profile (GBP)** optimization is the single highest ROI driver.

**Replacement Foundation Session features:**
```typescript
features: [
  'Review of your current systems, tools, and workflows',
  'Assessment from a business operations perspective, not just a technical one',
  'Honest evaluation of what needs building vs. what can be solved with existing tools',
  'Written summary with specific next steps, delivered within 48 hours',
  'Includes Google Business Profile (GBP) Quick Start for applicable local SMEs',
],
```

**Replacement Architecture Review features:**
```typescript
features: [
  'Full review of your existing codebase or system architecture',
  'Security assessment and performance audit',
  'Specific recommendations with estimated effort for each',
  'Written report with diagrams where relevant',
  '1-hour follow-up call to walk through findings',
],
```

---

### IMP-8: LocalBusiness Schema Name

No change needed. `Person` and `LocalBusiness` types logically and legally function under Edmond's personal name for the solopreneur architecture currently adopted.

---

### IMP-9: Substack CTA tightening

**File:** `/resources/page.tsx`
Change from four-topic dump to: `"I write about building and running a digital services business from Botswana. Occasional, not weekly."`

---

### IMP-10: Remove Remaining Clichés

`"Watch this space"` removed with tools section deletion. `"no strings attached"` replaced above.

---

## Humanizer Tracks — 5 Parallel Tracks

### Track A — Homepage Components

#### [HeroSection.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/components/homepage/HeroSection.tsx)
| Location | Issue | Pattern # |
|---|---|---|
| Subtitle: `"designed to last"` | Vague positive claim — replaced via IMP-2 | 25 |
| Em dash in subtitle | Classic AI punctuation | 14 |

#### [IntroSection.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/components/homepage/IntroSection.tsx)
**Gold standard — leave untouched.** Apply BridgeArc Digital rename only.

#### [CommitmentsSection.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/components/homepage/CommitmentsSection.tsx)
| Location | Issue | Pattern # |
|---|---|---|
| `"These aren't marketing promises. They're the rules I work by."` | Three-sentence staccato | 10 |
| Card 2: `"Source code, databases... — all handed over"` | Em dash | 14 |
| Card 6: `"fewer workarounds, less resistance... "` | Rule of three | 10 |

#### [TestimonialsSection.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/components/homepage/TestimonialsSection.tsx) — No changes

#### [HomePageFooter.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/components/homepage/HomePageFooter.tsx) — IMP-5 refund link only

*ServicesSection + ProcessSection + FAQSection + FreeResourcesSection remain strictly monitored for patterns during the actual file edits pass.*

---

### Track B — About Page

#### [/about/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/about/page.tsx)
| Location | Issue | Pattern # |
|---|---|---|
| Hero subtitle: `"... — and now building digital systems that last."` | Em dash; vague — update to match IMP-2 | 14, 25 |
| CTA subtext: `"No commitment — just an honest conversation."` | Em dash | 14 |
| `"Let's discuss your project"` | "Let's" signposting | 28 |
| BridgeArc → BridgeArc Digital (2 locations) | Factual fix | — |

---

### Track C — Services Page + Contact Page

#### [/services/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/services/page.tsx)
| Location | Issue | Pattern # |
|---|---|---|
| Hero sub: `"documentation, training, and handover"` | Rule of three | 10 |
| CTA sub: em dash | Em dash | 14 |

#### [/services/data.ts](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/services/data.ts)
**IMP-6** and **IMP-7** applied here.
| Location | Issue | Pattern # |
|---|---|---|
| Service 01 desc: `"No templates, no themes, no page builders."` | Three-item negation list | 9 |

#### [/contact/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/contact/page.tsx)
| Location | Issue | Pattern # |
|---|---|---|
| `"No commitment -- just an honest conversation about your goals and how I can help."` | Em dash via `--`; filler | 14, 23 |
| `"what works, what doesn't, and what might be a fit"` | Rule of three | 10 |
| `"No pressure -- just clarity."` | Negation-positive cliché | 9 |
| `"Zero obligation to proceed."` | Subjectless tailing fragment | 13 |

---

### Track D — Resources + Store

#### [/resources/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/resources/page.tsx)
IMP-3, IMP-9, IMP-10 all applied here.

#### [/store/StoreClient.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/store/StoreClient.tsx)
| Location | Issue | Pattern # |
|---|---|---|
| Hero sub: `"Pre-built, production-ready starter kits. Free guides..."` | Three stacked tagline fragments | 13 |
| `"Download free guides — pay what you want (or nothing)."` | Em dash | 14 |
| `"Buy once, deploy fast, customise to your brand."` | Three-clause staccato, ad copy | 10 |

---

### Track E — Legal Pages

> [!IMPORTANT]
> Legal register is intentional. Keep formal structures.

#### [/privacy-policy/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/privacy-policy/page.tsx)
**Fix 1 + Fix 2 (DPA + Dodo) applied first.** Then clean:
| Location | Issue | Pattern # |
|---|---|---|
| §6 intro: `"I use the following..."` | Restates the obvious | 29 |
| §11: `"no method of transmission over the internet is 100% secure"` | Boilerplate hedge | 24 |

#### [/terms-and-conditions/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/terms-and-conditions/page.tsx)
Standardize layout (IMP-4). Then:
| Location | Issue | Pattern # |
|---|---|---|
| §5: `"genuinely require"` | Weasel qualifier | 24 |

#### [/refund-policy/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/refund-policy/page.tsx)
Standardize layout (IMP-4). Then:
| Location | Issue | Pattern # |
|---|---|---|
| §1: `"Due to the custom, service-based nature..."` | Filler opener | 23 |
| §5: `"copied, retained, and used indefinitely"` | Rule of three; passive | 10, 13 |

#### [/cancellation-policy/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/cancellation-policy/page.tsx)
Standardize layout (IMP-4). Then:
| Location | Issue | Pattern # |
|---|---|---|
| §7: `"priorities shift, budgets change, and timing is not always right"` | Rule of three | 10 |

#### [/legal-restrictions/page.tsx](file:///Users/edmond/02_BridgeArc_Projects/Internal/Edmond-Moepswa/src/app/(frontend)/legal-restrictions/page.tsx)
Standardize layout (IMP-4). Then:
| Location | Issue | Pattern # |
|---|---|---|
| Opening: `"platform limitations, regulatory environments, and geographic... "` | Rule of three | 10 |
| §1: `"as of the last update date"` | Knowledge-cutoff hedge | 21 |
| §1.2: `"Excellent for reaching unbanked and mobile-first customers"` | Promotional in legal context | 4 |

---

## Execution Protocol

Per Karpathy guidelines:
1. **Touch only what you must** — no adjacent refactoring
2. **Every change must trace** back to a humanizer pattern (1-29), factual fix (DPA/Dodo), or listed IMP
3. **Simplicity First** — no unnecessary abstractions
4. **Goal-Driven Execution** — follow Verification Plan

---

## Verification Plan

### Success criteria
- [ ] `tsc --noEmit` passes
- [ ] Privacy Policy §5 correctly references Data Protection Act 2024 (Act No. 18 of 2024), Information and Data Protection Commission, and January 14 2025 effective date
- [ ] Zero remaining Gumroad references in privacy-policy/page.tsx
- [ ] `BridgeArc` (without "Digital") appears zero times in `src/` outside of comments and non-user-facing code
- [ ] Tools section absent from /resources
- [ ] `Wrench` import absent from resources page
- [ ] All 4 non-privacy legal pages use `<PolicyLayout>`
- [ ] Footer contains Privacy, Terms, and Refunds links
- [ ] Tier C features list contains concrete project examples & Foundation Cover details
- [ ] Advisory features reference operations background & GBP Quick Start
- [ ] "designed to last" appears zero times in site copy
- [ ] Voice consistent across pages (calibrated to IntroSection)

### Verification commands
```bash
tsc --noEmit
grep -ri "designed to last" src/
grep -ri "Gumroad" src/app/\(frontend\)/privacy-policy/
grep -ri "no strings attached" src/
```
