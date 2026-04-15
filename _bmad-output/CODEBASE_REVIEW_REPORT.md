# Comprehensive Codebase Audit Report: Edmond Moepswa Website

## 1. Executive Summary
This report provides a deep-dive, adversarial audit of the website's codebase, focusing on security, performance, and adherence to project-specific development standards (**Payload CMS**, **Dodo Payments**, and **Karpathy Guidelines**).

Overall, the codebase is structurally sound, using modern patterns (**Next.js App Router**, **Payload CMS 3.0**, **Framer Motion**) with a clear separation of concerns. Security is a first-class citizen, with consistent use of access control and signature verification. However, there are areas where "Hardening" is required, particularly in automated fulfillment logic and type safety.

---

## 2. Guideline Adherence Audit

### 2.1 Payload CMS (AGENTS.md)
*   **Local API Access Control**: Checked throughout `src/utilities` and `src/app`. Usage of `overrideAccess: false` is consistently implemented (e.g., in `getDocument.ts`), preventing accidental privilege escalation.
*   **Transaction Safety**: Hooks (e.g., `revalidatePage.ts`) were audited. No nested database operations without `req` were found, minimizing data corruption risks.
*   **Role-Based Access Control (RBAC)**: Collections (`Projects`, `Services`, `Media`) use a standardized `authenticated` vs `anyone` pattern, adhering to the "restrictive by default" principle.

### 2.2 Dodo Payments (dodo-best-practices)
*   **Checkout Session Flow**: `src/app/api/checkout/route.ts` correctly utilizes the Dodo SDK for session creation and handles environment-based mode switching (`test_mode` vs `live_mode`).
*   **Webhook Verification**: `src/app/api/webhooks/dodo/route.ts` implements SHA-256 HMAC signature verification using `crypto.timingSafeEqual`, protecting against replay and brute-force attacks.

### 2.3 Karpathy Coding Guidelines
*   **Simplicity & Directness**: The codebase avoids "clever" abstractions. Components are functional and focused.
*   **Dead Code**: Minimal dead code found; however, there is a duality between **Stripe** and **Dodo Payments** in some service schemas that should be resolved to reduce cognitive load.

---

## 3. Security Deep-Dive

### 3.1 Honeypot Protection
The `Leads` collection implements a clever "honeypot" field (`website`) that is hidden from the admin UI but validated on the server. This is an effective, zero-friction anti-spam measure.

### 3.2 Access Vulnerabilities
*   **Finding**: No direct leaks found. The `Users` collection is properly guarded.
*   **Recommendation**: Ensure `DODO_PAYMENTS_WEBHOOK_SECRET` and `PAYLOAD_SECRET` are rotated periodically, as they are the primary gatekeepers for payment and session integrity.

---

## 4. Backend & API Analysis

### 4.1 Collection Architectures
*   **Services**: Robust schema with pricing Tier support.
*   **Projects**: Uses server-side filtering to exclude "boilerplate" products from the main portfolio, optimizing build performance and frontend bundle size.
*   **Media**: Standard upload config with logical image sizes (`thumbnail`, `og`, etc.).

### 4.2 Webhook Fulfillment (CRITICAL)
> [!WARNING]
> **Observation**: The Dodo Webhook handler (`src/app/api/webhooks/dodo/route.ts`) is currently a shell with `TODO` markers for `payment.succeeded` and `subscription.active`.
> **Action**: Fulfillment logic (e.g., sending emails, granting access, or updating Payload records) must be implemented to make the store functional.

---

## 5. Frontend & Performance Audit

### 5.1 Performance Optimization
*   **Hydration & Splitting**: High-impact sections like `CalculatorSection` and `SubstackFeed` are lazily loaded via `next/dynamic` with `ssr: false`, significantly improving Initial Page Load (LCP).
*   **Image Handling**: Uses `next/image` with proper `sizes` and `priority` for above-the-fold content.

### 5.2 Identified Bug: Media URL Mismatch
> [!IMPORTANT]
> **Issue**: In `ProjectsSection.tsx`, `getMediaUrl` is passed a `Media` object, but the utility in `getMediaUrl.ts` expects a `string` (URL).
> **Risk**: This causes broken images or `[object Object]` paths in the project gallery.
> **Fix**: Update the utility or the usage to ensure the `url` property is accessed.

---

## 6. Infrastructure & Observability

### 6.1 Telemetry
*   **PostHog**: Well-integrated with a dedicated provider. Correctly handles `Suspense` for pageview tracking in the App Router.
*   **Sentry**: Client-side initialization present. Server-side config is linked in `next.config.ts`.

### 6.2 SEO & GEO
*   **Metadata**: Professional-grade SEO metadata and JSON-LD structured data implemented globally in `layout.tsx`.
*   **GEO Detection**: The `Calculator` uses a custom `/api/geo` endpoint for currency detection, enhancing localized UX.

---

## 7. Strategic Recommendations

1.  **Harden Webhook Logic**: Prioritize the implementation of fulfillment hooks in the Dodo webhook.
2.  **Fix Media Utility**: Resolve the `Media` object vs `string` mismatch in `src/utilities/getMediaUrl.ts`.
3.  **Strict Typing**: Replace remaining `any` types in `api/checkout` and `ProjectsSection` with proper interfaces from `payload-types.ts`.
4.  **Consolidate Payment Providers**: If the migration to Dodo is complete, remove legacy Stripe fields to simplify the schema.

---
**Audit Performed by Antigravity (Autonomous Mode)**
*Timestamp: 2026-04-15*
