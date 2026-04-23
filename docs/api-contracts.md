# API Contracts

This document catalogs the internal and external API endpoints used in the project.

## Internal API Routes (`/api`)

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/checkout` | `POST` | Initiates Dodo Payments checkout sessions. |
| `/api/dodo-products` | `GET` | Fetches synchronized product data from Dodo Payments. |
| `/api/substack` | `GET` | Proxies and parses the Substack RSS feed for the homepage. |
| `/api/geo` | `GET` | Returns location data for multi-currency pricing logic. |
| `/api/webhooks/dodo` | `POST` | Handles Dodo Payments payment and subscription events. |
| `/api/cal-webhook` | `POST` | Syncs Cal.com booking events with the local Leads collection. |

## Frontend Data API (`/(frontend)/api`)

These routes provide JSON data for interactive frontend sections.

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/projects` | `GET` | Returns portfolio project data. |
| `/api/testimonials` | `GET` | Returns client feedback and ratings. |
| `/api/faqs` | `GET` | Returns frequently asked questions. |
| `/api/services` | `GET` | Returns service offerings and pricing tiers. |
| `/api/quote-pdf` | `POST` | Triggers Make.com to generate and return a PDF quote. |
| `/api/make-webhook` | `POST` | Generic entry point for Make.com callbacks. |

## Payload CMS Local API

Used extensively for server-side rendering in Next.js Server Components.

```typescript
// Example usage in page.tsx
const payload = await getPayloadSingleton()
const projects = await payload.find({
  collection: 'projects',
  where: { featured: { equals: true } },
})
```

## External Integrations

### Dodo Payments
- **Type**: Webhook + REST API
- **Events handled**: `order.succeeded`, `subscription.created`, `subscription.cancelled`

### Make.com
- **Type**: Outbound Webhooks
- **Triggers**: Contact form submission, Calculator quote request, Dodo purchase.
