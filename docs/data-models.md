# Data Models

Generated: `2026-05-01T07:42:21+0200`

This document summarizes the primary Payload collections and globals defined directly in the repository.

## Collections

### `pages`

Location: `src/collections/Pages/index.ts`

- Purpose: CMS-managed marketing and content pages
- Access:
  - read: authenticated or published
  - write: authenticated
- Main fields:
  - `title`
  - tabbed hero/content/SEO structure
  - `layout` blocks
  - `publishedAt`
  - `slug`
- Hooks:
  - `populatePublishedAt`
  - `revalidatePage`
  - `revalidateDelete`
- Drafts:
  - enabled
  - autosave interval differs for payload-worker build

### `services`

Location: `src/collections/Services.ts`

- Purpose: service catalogue and pricing records
- Access:
  - public read
  - authenticated write
- Main fields:
  - `title`
  - `description`
  - `price`
  - `features[]`
  - `icon`
  - `dodoProductId`

### `projects`

Location: `src/collections/Projects.ts`

- Purpose: showcase portfolio and productized project cards
- Access:
  - public read
  - authenticated write
- Main fields:
  - `title`
  - `slug`
  - `category`
  - `year`
  - `description`
  - `thumbnail`
  - `images[]`
  - `link`
  - `featured`

### `testimonials`

Location: `src/collections/Testimonials.ts`

- Purpose: social proof entries for the public site
- Main fields:
  - `clientName`
  - `clientRole`
  - `content`
  - `avatar`
  - `rating`

### `faqs`

Location: `src/collections/FAQs.ts`

- Purpose: FAQ data powering contact and homepage sections plus public API output
- Main fields:
  - `question`
  - `answer`
  - `category`
  - `order`
  - `isActive`
- Default sort: `order`

### `media`

Location: `src/collections/Media.ts`

- Purpose: uploaded image and video assets
- Access:
  - public read
  - authenticated write
- Main fields:
  - `alt`
  - `caption`
- Upload behavior:
  - folders enabled
  - focal point enabled
  - image and video mime types allowed
  - admin thumbnail generated through transform utilities

### `leads`

Location: `src/collections/Leads.ts`

- Purpose: inbound lead capture and CRM-lite status tracking
- Access:
  - create: anyone
  - read/update/delete: authenticated
- Main fields:
  - honeypot `website`
  - `name`
  - `email`
  - `source`
  - `message`
  - `calculatorData`
  - `status`
- Hook behavior:
  - basic email format validation
  - string trimming for `name`

### `users`

Location: `src/collections/Users/index.ts`

- Purpose: Payload admin users
- Access:
  - authenticated admin surface
  - delete and role updates restricted to admins
- Auth:
  - enabled
- Main fields:
  - `name`
  - `roles[]`

### `orders`

Location: `src/collections/Orders.ts`

- Purpose: webhook-driven commerce ledger for Dodo events
- Access:
  - read/update/delete: authenticated
  - create: open in collection config, but intended to be protected by route-level webhook validation
- Main fields:
  - `dodoPaymentId`
  - `dodoSubscriptionId`
  - `customerEmail`
  - `productName`
  - `productId`
  - `amount`
  - `currency`
  - `status`
  - `metadata`

### `products`

Location: `src/collections/Products.ts`

- Purpose: locally managed representation of Dodo-backed digital products/resources
- Access:
  - public read
  - authenticated write
- Main fields:
  - `title`
  - `description`
  - `priceCents`
  - `currency`
  - `dodoProductId`
  - `type`
  - `category`
  - `thumbnail`
  - `featured`
  - `slug`

## Globals

### `header`

Location: `src/Header/config.ts`

- Purpose: top navigation links
- Main fields:
  - `navItems[]` using shared link field
- Hook:
  - `revalidateHeader`

### `footer`

Location: `src/Footer/config.ts`

- Purpose: footer navigation links
- Main fields:
  - `navItems[]`
- Hook:
  - `revalidateFooter`

### `site-settings`

Location: `src/globals/SiteSettings.ts`

- Purpose: site-wide profile and contact settings
- Main fields:
  - `siteTitle`
  - `siteDescription`
  - `logo`
  - `contactEmail`
  - `contactPhone`
  - `whatsappNumber`
  - `socialLinks` group

## Plugin-Driven Data Effects

Defined in `src/plugins/index.ts`:

- `redirectsPlugin`
  - adds redirect management behavior and revalidation hook integration
- `seoPlugin`
  - enabled only outside the payload worker variant
- `formBuilderPlugin`
  - extends form capabilities for CMS-driven forms
- `searchPlugin`
  - adds search indexing behavior and custom search field overrides
- `s3Storage`
  - binds `media` to R2-compatible storage

## Access Model Summary

The repo keeps access helpers intentionally small:

- `anyone`
- `authenticated`
- `authenticatedOrPublished`

Most public content collections expose read access to everyone and reserve write operations for authenticated users. `users` is the only clearly role-sensitive collection in the authored source.
