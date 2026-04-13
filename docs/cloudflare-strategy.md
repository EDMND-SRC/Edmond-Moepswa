# Cloudflare (Pages, Workers, R2) Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Cloudflare (cloudflare.com)
**Free Tiers:** Pages (unlimited bandwidth), Workers (100K requests/day), R2 (10 GB storage, no egress fees)

---

## Overview

Cloudflare provides three distinct services that complement or substitute Vercel in Edmond's stack. Together they form a powerful, free-tier infrastructure layer:

1. **Cloudflare Pages** — Static/SSG site hosting with unlimited bandwidth and a global CDN. Alternative to Vercel for static sites and marketing pages
2. **Cloudflare Workers** — Serverless edge functions running on Cloudflare's 300+ global locations. 100,000 requests/day free (10ms CPU per invocation)
3. **Cloudflare R2** — S3-compatible object storage with zero egress fees. 10 GB free storage, 1M Class A operations/month, 10M Class B operations/month

Cloudflare's free tiers are among the most generous in the industry. The combination of unlimited bandwidth (Pages) + no egress fees (R2) + edge compute (Workers) makes it an excellent cost-optimisation platform for Edmond's builds.

---

## Free Tier Limits (2026)

### Cloudflare Pages (Free)
| Resource | Limit |
|----------|-------|
| Bandwidth | Unlimited |
| Requests | Unlimited |
| Build minutes | 500/month |
| Concurrent builds | 1 |
| Custom domains | Unlimited |
| Preview deployments | Unlimited |
| Team members | Unlimited |

### Cloudflare Workers (Free)
| Resource | Limit |
|----------|-------|
| Requests | 100,000/day (~3M/month) |
| CPU time | 10ms per invocation |
| Subrequests | 1,000 per invocation |
| KV read requests | 100,000/day |
| KV write requests | 1,000/day |
| D1 databases | 10 (free) |

### Cloudflare R2 (Free)
| Resource | Limit |
|----------|-------|
| Storage | 10 GB |
| Class A operations (list, write) | 1,000,000/month |
| Class B operations (read) | 10,000,000/month |
| Egress (download) | Unlimited — **no fees** |

---

## By Service Category

### 1. Web Design & Development

#### Alternative Hosting for Image-Heavy Sites
- **Use case:** Client sites with large image galleries (Boilerplate 1 — Artisan, Boilerplate 5 — Events) can exceed Vercel's 100 GB Hobby bandwidth
- **Strategy:** Deploy the Next.js static export to Cloudflare Pages (unlimited bandwidth) and serve all images from Cloudflare R2 (no egress fees)
- **Value:** Zero bandwidth anxiety. A site can serve 10 GB of images to 10,000 visitors for free on Cloudflare — the same traffic on Vercel would consume ~100 GB
- **Implementation:** Build as static export (`output: 'export'` in Next.js) → deploy to Pages → store images in R2 → reference via R2 public URLs or a custom subdomain

#### Static Site Performance Advantage
- **Use case:** Cloudflare Pages serves from 300+ edge locations vs. Vercel's ~50+ regions. For clients with significant African traffic, Cloudflare's Johannesburg edge node provides lower latency
- **Value:** Faster page loads for Botswana and Southern African visitors without any infrastructure cost

#### Image Optimisation Pipeline via R2
- **Use case:** Store all client images in R2 → use Cloudflare Images (paid) or a Workers script for on-the-fly resizing and WebP conversion
- **Free approach:** Pre-optimise images before upload (Sharp CLI, Squoosh) → upload to R2 → serve optimised files directly
- **Value:** R2's no-egress-fee model means serving 100 GB of images to visitors costs nothing. On AWS S3, the same egress would cost ~$9/month

---

### 2. Web Applications

#### Edge API with Workers
- **Use case:** Lightweight API endpoints running at the edge — form validation, webhook receivers, rate-limited data lookups
- **Advantage over Vercel:** Workers free tier provides 100K requests/day (3M/month) vs. Vercel's 100K/month. For high-traffic API endpoints, Workers is 30x more generous
- **Pattern:** Deploy API as a Worker → connect to Supabase/Neon database → handle requests at the edge with sub-50ms latency
- **Example:** A lead capture API endpoint that receives form submissions, validates them, and stores them in Supabase — all at the edge

#### D1 Edge Database for Lightweight Apps
- **Use case:** Cloudflare D1 is a serverless SQLite database that runs at the edge. Free tier: 10 databases, 5M rows read/day, 100K rows written/day
- **Use case examples:** Simple blog CMS, event listings, contact form storage, URL shortener
- **Value:** Full database + API layer on Workers + D1 with zero external dependencies. Ideal for single-purpose micro-applications and landing pages
- **Limitation:** D1 is SQLite — not suitable for complex relational data or high-concurrency writes. Use Supabase for production SaaS backends

#### Image Upload Handling via R2
- **Use case:** Boilerplate 7 (Professional Services Firm) requires document upload capability. R2 is S3-compatible — drop it in as the storage backend using the AWS SDK
- **Implementation:** Generate presigned upload URLs from a Worker → client uploads directly to R2 from the browser → no server-side proxying needed
- **Value:** No storage cost for documents under 10 GB. No egress fees when documents are downloaded. This is significantly cheaper than AWS S3 for small-to-medium file storage

---

### 3. Workflow Automation

#### Webhook Receiver Workers
- **Use case:** Cloudflare Workers as high-throughput webhook endpoints for payment gateway callbacks, Make.com triggers, and third-party integrations
- **Advantage:** 100K requests/day free handles far more webhook traffic than Vercel's serverless functions on the Hobby tier
- **Pattern:** Worker receives webhook → validates signature → forwards to Make.com or stores in D1/Supabase → returns 200

#### Scheduled Workers for Automated Tasks
- **Use case:** Cloudflare Workers Cron Triggers run scheduled tasks (daily, weekly, monthly) without Make.com credit consumption
- **Examples:** Daily competitor site scraping via Firecrawl API, weekly analytics report generation, monthly CRM data sync
- **Value:** Unlimited scheduled executions on the free tier. No credit cost like Make.com.

---

### 4. SEO, GEO & Google Business

#### Fast Static Sites for SEO
- **Use case:** Google's Core Web Vitals favour fast-loading sites. Cloudflare Pages serves fully static sites from edge locations — typically achieving 100/100 Lighthouse Performance scores
- **Value:** Every build deployed to Cloudflare Pages gets a performance advantage that contributes to SEO. This is a concrete selling point in proposals

#### DNS Management (Free)
- **Use case:** Cloudflare's free DNS management is faster and more reliable than most registrar DNS. Pointing a client's domain to Cloudflare nameservers provides free DDoS protection, faster DNS resolution, and DNSSEC
- **Value:** Included in every build where Cloudflare is the hosting platform. Mention this as a bonus in proposals

---

### 5. Boilerplate Products

#### R2 as Boilerplate File Storage Standard
- **Use case:** Standardise Cloudflare R2 as the default file storage layer for all Boilerplate Builds requiring document uploads, image galleries, or media libraries
- **Implementation:** Create a reusable R2 integration module (TypeScript) that handles presigned URL generation, upload, and download
- **Value:** Consistent, well-tested code across all boilerplates. No per-client setup cost. R2's S3 compatibility means it works with existing AWS SDK code

#### Workers as Boilerplate API Layer
- **Use case:** For boilerplate builds that need a lightweight API (form handling, data fetching), deploy Workers instead of maintaining a separate backend server
- **Value:** Zero infrastructure cost for the API layer. Workers scale automatically and are included in the free tier

---

## Quick-Win Implementations

### Priority 1: R2 Storage Module (2 hours)
Create a reusable TypeScript module for R2 integration:

```typescript
// lib/r2.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function generateUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ContentType: contentType,
  })
  return getSignedUrl(r2, command, { expiresIn: 3600 })
}

export async function generateDownloadUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
  })
  return getSignedUrl(r2, command, { expiresIn: 3600 })
}
```

### Priority 2: Static Export for Cloudflare Pages (1 hour)
For image-heavy sites, add a Cloudflare Pages build profile:

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // Pre-optimise images before build
}
export default nextConfig
```

Deploy to Pages via GitHub integration — automatic deploys on push.

### Priority 3: Worker Webhook Handler (1 hour)
```typescript
// worker.ts
export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    
    const body = await request.json()
    // Validate, process, forward to Make.com or store in D1
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
```

---

## Resource Budget Planning

**Cloudflare Pages (Free):**
- Unlimited bandwidth — no monitoring needed for marketing sites
- 500 build minutes/month — sufficient for 10–20 deployments per month
- 1 concurrent build — serialise deployments for large projects

**Cloudflare Workers (Free):**
- 100,000 requests/day = ~3,000,000/month — enough for high-traffic API endpoints
- 10ms CPU per invocation — keep logic simple. Offload heavy computation to Supabase or external services
- 10 KV read requests/day — sufficient for low-traffic cache layers

**Cloudflare R2 (Free):**
- 10 GB storage = ~2,000 optimised images (5 MB each) or ~1,000 documents
- 1M write operations/month — enough for 33,000 uploads/day
- 10M read operations/month — enough for 333,000 downloads/day
- **No egress fees** — this is the killer feature

**When R2 exceeds 10 GB:** Upgrade to paid R2 ($0.015/GB/month for storage, $0.0033/GB for Class A, $0.00033/GB for Class B). 50 GB costs ~$0.75/month — far cheaper than S3's equivalent with egress fees.

---

## Risks & Considerations

1. **Static export limitation:** Next.js on Cloudflare Pages requires static export (`output: 'export'`) to use the free tier fully. This means no server-side rendering, no API routes, no ISR. For full SSR, use Vercel
2. **Worker CPU limits:** 10ms per invocation is tight. Complex logic will exceed the limit. Use Workers for simple request handling, not data processing
3. **D1 immaturity:** Cloudflare D1 is newer than Supabase/Neon. It works well for simple use cases but lacks advanced features (full-text search, complex joins, realtime subscriptions)
4. **R2 eventual consistency:** R2 has strong read-after-write consistency for single objects, but list operations are eventually consistent. Design accordingly
5. **DNS migration complexity:** Moving a client's domain to Cloudflare nameservers requires coordination. The domain's existing DNS records must be replicated first

---

## Summary: Revenue and Efficiency Potential

| Use Case | Alternative | Savings |
|----------|------------|---------|
| Image-heavy site hosting (Vercel 100 GB → Pages unlimited) | Vercel Pro ($20/month) | $240/year per site |
| File storage for document uploads (R2 vs. S3) | AWS S3 ($9/month egress for 100 GB) | $108/year per site |
| Webhook endpoint (Workers vs. Vercel serverless) | Vercel Pro for higher invocations | $240/year per site |
| DNS management | Third-party DNS provider | $12–60/year per site |

**Key insight:** Cloudflare's free tiers are the most generous in the industry. The combination of unlimited bandwidth (Pages) + no egress fees (R2) + 100K daily requests (Workers) makes it the optimal cost-optimisation platform. Use it for image-heavy sites, file storage, and high-throughput API endpoints. Default to Vercel for full SSR Next.js applications, but reach for Cloudflare when bandwidth, storage costs, or edge compute throughput are the constraint.

---

**End of Cloudflare Integration Strategy**
