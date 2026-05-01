# API Contracts

Generated: `2026-05-01T07:42:21+0200`

This document covers the hand-authored public API surface plus the generated Payload APIs that live behind the payload worker.

## Public Route Manifest

Source of truth: `cloudflare/route-manifest.json`

### Public exact routes

| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/cal-webhook` | `POST` | Authenticated Cal.com webhook proxy to hidden Make.com URL |
| `/api/checkout` | `POST` | Create Dodo checkout sessions |
| `/api/dodo-products` | `GET`, `HEAD` | Read Dodo product catalogue for storefront use |
| `/api/faqs` | `GET`, `HEAD` | Return active FAQs sorted by `order` |
| `/api/geo` | `GET`, `HEAD` | Server-side geo lookup proxy |
| `/api/make-webhook` | `POST` | Forward selected automation payloads to Make.com |
| `/api/media/transform` | `GET`, `HEAD` | Cloudflare image transformation proxy |
| `/api/pages` | `GET`, `HEAD` | Return published pages for the public site |
| `/api/projects` | `GET`, `HEAD` | Return homepage project cards |
| `/api/services` | `GET`, `HEAD` | Return service catalogue data |
| `/api/substack` | `GET`, `HEAD` | Parse Substack RSS into JSON |
| `/api/testimonials` | `GET`, `HEAD` | Return trimmed testimonial records |
| `/api/webhooks/dodo` | `POST` | Validate and process Dodo webhook events |
| `/next/exit-preview` | `GET`, `HEAD` | Exit preview mode |
| `/next/preview` | `GET`, `HEAD` | Enter preview mode |
| `/og-image` | `GET`, `HEAD` | Generate OG image |
| `/pages-sitemap.xml` | `GET`, `HEAD` | Serve page sitemap |

## Payload Worker Routes

| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/[...slug]` | REST verbs | Generated Payload REST API |
| `/api/graphql` | `POST`, `OPTIONS` | Payload GraphQL endpoint |
| `/api/graphql-playground` | `GET` | Payload GraphQL playground |
| `/admin/*` | browser routes | Payload admin UI |

## Route-by-Route Notes

### `/api/projects`

File: `src/app/(frontend)/api/projects/route.ts`

Current behavior:

- accepts `limit`
- accepts exact `category` filter from a fixed allowlist
- runs direct SQL against `projects`
- fetches related media in a second query
- returns `{ docs }`

Response shape per item:

```json
{
  "id": 1,
  "title": "Example",
  "category": "websites",
  "year": "2026",
  "description": "Short summary",
  "thumbnail": {
    "alt": "Example",
    "url": "/media/example.webp",
    "width": 900,
    "height": 600,
    "mimeType": "image/webp",
    "updatedAt": "2026-04-30T00:00:00.000Z"
  },
  "link": "https://example.com"
}
```

### `/api/pages`

File: `src/app/(frontend)/api/pages/route.ts`

Current behavior:

- Payload Local API query
- `overrideAccess: false`
- `depth: 0`
- bounded `limit`
- paginated result returned directly

Selected fields:

- `title`
- `slug`
- `meta`
- `publishedAt`
- `updatedAt`

### `/api/services`

Returns `result.docs` as `{ services }` without additional reshaping.

### `/api/testimonials`

Returns a trimmed array under `{ testimonials }` with:

- `id`
- `clientName`
- `clientRole`
- `content`
- `rating`
- `updatedAt`

### `/api/faqs`

Returns `{ faqs }` by querying Payload for active records sorted by `order`.

Operational note:

- this route is currently important in Cloudflare verification because it has appeared in worker-runtime hang investigations

### `/api/make-webhook`

Workflows currently recognized:

- `lead-capture`
- `calculator-quote`
- `dodo-download`
- `cal-booking`

Important behaviors:

- in-memory rate limiting
- selective unauthenticated flows
- lead data allowlist sanitization
- server-side concealment of Make.com webhook URLs

### `/api/cal-webhook`

Important behaviors:

- bearer-token gate via `CRON_SECRET`
- in-memory rate limiting
- payload narrowing before forwarding

### `/api/checkout`

Accepts:

```json
{
  "productId": "prod_x",
  "customerEmail": "optional@example.com",
  "amount": 5000
}
```

Returns:

```json
{
  "url": "https://checkout..."
}
```

### `/api/dodo-products`

Normalizes Dodo SDK responses into storefront JSON with:

- `id`
- `name`
- `description`
- `priceCents`
- `currency`
- `type`
- `pwywEnabled`
- `pwywMinCents`
- `pwywSuggestedCents`
- `imageUrl`
- `taxCategory`

### `/api/media/transform`

Input query params:

- `src` required
- `w` optional
- `h` optional
- `q` optional
- `fit` optional, allowlisted

Security features:

- blocks recursive self-calls
- restricts hostnames to known safe origins
- falls back to original fetch if transformed request is not usable

### `/api/webhooks/dodo`

Important behaviors:

- validates `x-dodo-signature` with HMAC SHA-256
- creates or updates `orders`
- may create `leads`
- handles `payment.succeeded`, `payment.failed`, `subscription.active`, `subscription.cancelled`, `refund.succeeded`

## Generated Payload APIs

Payload REST and GraphQL routes are generated wrappers, but two implementation details matter:

- REST and GraphQL are wrapped through `toBufferedResponse(...)`
- the generated admin and API surface depends on the current `importMap.js`

Those details are operationally significant under Cloudflare Workers.
