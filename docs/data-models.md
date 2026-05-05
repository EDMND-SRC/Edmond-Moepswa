# Data Models

## Launch snapshot data

Committed launch content lives in:

- `src/content/launchSnapshot.ts`
- `src/content/launchServices.ts`

That snapshot currently owns:

- pages
- header
- footer
- site settings
- redirects
- testimonials
- products
- search inputs derived from the same content

## PostgreSQL tables still used by the app

### `faqs`

Read-only in the public app through `/api/faqs`.

### `projects`

Read-only in the public app through `/api/projects`.

### `media`

Used for project thumbnail joins and media URL resolution.

### `leads`

App-owned lead persistence table.

Current app usage:

- `source = 'contact'` for contact form submissions
- `source = 'calculator'` for quote calculator submissions
- optional mirrored Dodo leads also persist here with direct SQL

Expected columns after `20260505_extract_payload_runtime.sql`:

- `id`
- `name`
- `email`
- `source`
- `message`
- `calculator_data`
- `status`
- `website`
- `company`
- `project_type`
- `budget_range`
- `phone`
- `metadata`
- `created_at`
- `updated_at`

### `orders`

App-owned Dodo order persistence table.

Expected columns:

- `id`
- `dodo_payment_id`
- `dodo_subscription_id`
- `customer_email`
- `product_name`
- `product_id`
- `amount`
- `currency`
- `status`
- `metadata`
- `created_at`
- `updated_at`

## Migration source of truth

- `database/migrations/20260505_extract_payload_runtime.sql`

This migration replaces the old CMS-driven expectation that schema changes would come from Payload.
