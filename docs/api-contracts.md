# API Contracts

## Public content APIs

### `GET /api/pages`

- source: typed launch snapshot
- response: paginated shape with `docs`, `limit`, `totalDocs`, `totalPages`

### `GET /api/services`

- source: typed launch services
- response: `{ services: Service[] }`

### `GET /api/testimonials`

- source: typed launch snapshot
- response: `{ testimonials: Testimonial[] }`

### `GET /api/faqs`

- source: PostgreSQL
- response: `{ faqs: Array<{ id, question, answer, category, order, isActive }> }`

### `GET /api/projects`

- source: PostgreSQL plus media join
- response: `{ docs: Project[] }`

## Automation APIs

### `POST /api/make-webhook`

Accepted workflows:

- `lead-capture`
- `calculator-quote`
- `resource-download`

Behavior:

- persists contact and calculator leads to PostgreSQL
- forwards the sanitized workflow payload to the matching Make.com webhook
- returns `500` if the matching Make.com webhook URL is not configured

### `POST /api/cal-webhook`

- requires `Authorization: Bearer <CRON_SECRET>`
- forwards Cal booking payloads to `CAL_WEBHOOK_URL`

### `POST /api/webhooks/dodo`

- verifies `x-dodo-signature`
- upserts orders in PostgreSQL
- mirrors qualifying customer leads in PostgreSQL
- optionally forwards the verified event to `MAKE_WEBHOOK_DODO_PAYMENTS`

## Commerce APIs

### `POST /api/checkout`

- creates or resolves a Dodo checkout URL for a product

### `GET /api/dodo-products`

- returns public product/catalog data used by the storefront

### `POST /api/quote-pdf`

- returns an Edmond Moepswa-branded PDF quote
- public-only implementation using `pdf-lib`

## Intentional non-contracts

- `/admin` is not a supported launch path
- `/next/preview` and `/next/exit-preview` intentionally return `404`
