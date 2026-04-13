# Dodo Payments Integration — Implementation Guide

**Last Updated:** 13 April 2026
**Current Mode:** Test Mode (indefinite until website is satisfied)
**Status:** SDK installed, products pending creation, storefront integration pending

---

## Current State (13 April 2026)

### ✅ Completed
- ✅ `dodopayments` npm package installed (`pnpm add dodopayments`)
- ✅ Test mode API key in `.env.local`: `DODO_PAYMENTS_API_KEY=KemhK2WFsU9lZ5Bg...`
- ✅ Product seeding script created: `seed-dodo-products.ts`
- ✅ Environment variables structure ready

### ⏳ Pending Manual Steps

#### 1. Create Products in Dodo Dashboard

**Why manual:** The API had schema compatibility issues with the SDK. Dashboard creation is more reliable.

**URL:** https://app.dodopayments.com → Products → Add Product

**Products to Create:**

**Free Resources** (migrate from Gumroad):
1. **5 Signs Your Website Is Costing You Clients**
   - Type: One-time payment
   - Price: $0.00 (Free)
   - Tax Category: E-book
   - Description: PDF guide on common website mistakes

2. **Website Launch Checklist**
   - Type: One-time payment
   - Price: $0.00 (Free)
   - Tax Category: Digital Products
   - Description: Pre-launch checklist for websites

3. **How to Brief a Web Designer**
   - Type: One-time payment
   - Price: $0.00 (Free)
   - Tax Category: E-book
   - Description: Guide for writing effective web design briefs

**Paid Boilerplate Products:**
4. Artisan & Craftmaker Portfolio — $49.99 (Digital Products)
5. Professional Services Firm — $55.99 (Digital Products)
6. Food & Hospitality — $59.99 (Digital Products)
7. Health & Wellness — $49.99 (Digital Products)
8. Events & Experiences — $39.99 (Digital Products)
9. E-commerce — $69.99 (Digital Products)
10. NGO / Non-Profit — $43.99 (Digital Products)
11. Financial Services — $59.99 (Digital Products)
12. SaaS Starter — $99.99 (SaaS)

#### 2. Configure Storefront

**URL:** Dashboard → Store Front

1. Set store name: "Edmond Moepswa"
2. Upload logo (optional)
3. Upload cover image (optional)
4. Select which products to display
5. Note the store URL slug (e.g., `edmond-moepswa`)

**After setup, update `.env.local`:**
```env
DODO_PAYMENTS_STORE_ID=store_YOUR_SLUG_HERE
```

#### 3. Set Up Webhook

**URL:** Dashboard → Developer → Webhooks

1. Click "Create Webhook"
2. Enter URL:
   - **Production:** `https://edmond-moepswa.vercel.app/api/webhooks/dodo`
   - **Local testing:** Use ngrok: `ngrok http 3000` → `https://YOUR_ID.ngrok.io/api/webhooks/dodo`
3. Select events:
   - ✅ `payment.succeeded`
   - ✅ `payment.failed`
   - ✅ `subscription.active`
   - ✅ `subscription.cancelled`
   - ✅ `refund.succeeded`
4. Save and copy the **signing secret**

**Update `.env.local`:**
```env
DODO_PAYMENTS_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

#### 4. Create Product Collections

**URL:** Dashboard → Products → Collections

Create these collections:
1. **Free Resources** — Group the 3 free products
2. **Boilerplate Products** — All 9 paid products
3. **Web Design Collection** (optional) — Design-focused boilerplates

**Note:** Collections can only be created via dashboard, not API.

---

## Code Implementation Needed

### File 1: Replace `/store` Page

**Current:** `src/app/(frontend)/store/page.tsx` shows static boilerplate cards
**Target:** Fetch products from Dodo API and display with buy buttons

**Implementation:**
```tsx
// src/app/(frontend)/store/page.tsx
import DodoPayments from 'dodopayments'
import Link from 'next/link'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: 'test_mode', // Switch to 'live_mode' when ready
})

async function getProducts() {
  const products = await client.products.list({ limit: 20 })
  return products.data
}

export default async function StorePage() {
  const products = await getProducts()

  return (
    <main>
      <h1>Boilerplate Products</h1>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.pricing.amount === 0 ? 'Free' : `$${(product.pricing.amount / 100).toFixed(2)}`}</p>
            <BuyButton productId={product.id} />
          </div>
        ))}
      </div>
    </main>
  )
}

// Client component for checkout
'use client'
function BuyButton({ productId }: { productId: string }) {
  const handleBuy = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  return <button onClick={handleBuy}>Buy Now</button>
}
```

### File 2: Create Checkout API Route

```typescript
// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: 'test_mode',
})

export async function POST(req: Request) {
  const { productId, customerEmail } = await req.json()

  const session = await client.checkoutSessions.create({
    product_cart: [{ product_id: productId, quantity: 1 }],
    customer: customerEmail ? { email: customerEmail } : {},
    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/store/success`,
  })

  return NextResponse.json({ url: session.url })
}
```

### File 3: Create Webhook Handler

```typescript
// app/api/webhooks/dodo/route.ts
import { NextResponse } from 'next/server'
import crypto from 'crypto'

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-dodo-signature')

  if (!signature || !verifyWebhook(body, signature, process.env.DODO_PAYMENTS_WEBHOOK_SECRET!)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)

  switch (event.type) {
    case 'payment.succeeded':
      console.log('Payment succeeded:', event.data)
      // Fulfill order, grant access to product
      break
    case 'subscription.active':
      console.log('Subscription activated:', event.data)
      // Activate subscription in your system
      break
    case 'subscription.cancelled':
      console.log('Subscription cancelled:', event.data)
      // Downgrade user access
      break
    case 'refund.succeeded':
      console.log('Refund processed:', event.data)
      // Revoke access, update records
      break
  }

  return NextResponse.json({ received: true })
}
```

---

## SDK Usage Reference

### Installation
```bash
pnpm add dodopayments
```

### Initialize Client
```typescript
import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: 'test_mode', // or 'live_mode'
})
```

### Common Operations

**List Products:**
```typescript
const products = await client.products.list({ limit: 20 })
```

**Create Checkout Session:**
```typescript
const session = await client.checkoutSessions.create({
  product_cart: [{ product_id: 'prod_xxx', quantity: 1 }],
  customer: { email: 'customer@example.com' },
  return_url: 'https://yoursite.com/success',
})
// Redirect to: session.url
```

**Collection Checkout:**
```typescript
const session = await client.checkoutSessions.create({
  product_collection_id: 'pdc_xxx', // Collection ID
  product_cart: [], // Must be empty for collection checkout
  return_url: 'https://yoursite.com/success',
})
```

**Customer Portal:**
```typescript
const portal = await client.customers.createPortalSession({
  customer_id: 'cust_xxx',
  return_url: 'https://yoursite.com/account',
})
// Redirect to: portal.url
```

---

## Test Mode Webhook URL

**For local development:**
1. Run `ngrok http 3000`
2. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
3. In Dodo Dashboard → Developer → Webhooks, enter: `https://abc123.ngrok.io/api/webhooks/dodo`
4. Save and copy the signing secret

**For production:**
- URL: `https://edmond-moepswa.vercel.app/api/webhooks/dodo`
- Configure after deployment

---

## Product Collections Integration

### What Are Collections?
Collections group related products (e.g., pricing tiers) under a single checkout experience. Customers can choose which product they want from the collection.

### API Usage
```typescript
// List collections (read-only via API)
const collections = await client.productCollections.list()

// Use collection in checkout
const session = await client.checkoutSessions.create({
  product_collection_id: 'pdc_abc123',
  product_cart: [], // Must be empty
  return_url: 'https://yoursite.com/success',
})
```

### Creating Collections (Dashboard Only)
1. Dashboard → Products → Collections
2. Click "Create Collection"
3. Add name, description, image
4. Select products to include
5. Drag to reorder (first product = default selection)
6. Publish

---

## Migration from Gumroad

### Current State
3 free resources hosted on Gumroad:
- `https://edmnd.gumroad.com/l/bgbgoq` — 5 Signs...
- `https://edmnd.gumroad.com/l/fwruno` — Website Launch Checklist
- `https://edmnd.gumroad.com/l/legyuk` — How to Brief...

### Migration Steps
1. Create equivalent products in Dodo Dashboard (see above)
2. Update `src/components/resources/ResourceCards.tsx` to use Dodo checkout instead of Gumroad URLs
3. Test download flow with free products
4. Once verified, archive Gumroad products

### Code Change for Resources
```tsx
// Before (ResourceCards.tsx)
url: 'https://edmnd.gumroad.com/l/bgbgoq'

// After
url: '/api/checkout' // With product ID in payload
// Or direct download if free product has auto-fulfillment
```

---

## Next Steps

1. ✅ SDK installed
2. ⏳ Create products manually in Dodo Dashboard
3. ⏳ Configure Storefront
4. ⏳ Set up webhook
5. ⏳ Create webhook handler (`/api/webhooks/dodo/route.ts`)
6. ⏳ Replace `/store` page with Dodo integration
7. ⏳ Update ResourceCards to use Dodo checkout
8. ⏳ Test checkout flow (test mode)
9. ⏳ Create Product Collections
10. ⏳ When satisfied: Switch to live mode, complete KYC

---

**End of Implementation Guide**
