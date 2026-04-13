export interface PricingTier {
  name: string
  price: string
  features: string[]
  timeline?: string
}

export interface Service {
  id: string
  title: string
  description: string
  pricingTiers: PricingTier[]
  notes?: string
}

/**
 * Extract technology name from feature text to show relevant icon.
 * Uses word-boundary matching to avoid false positives.
 */
export function extractTechFromFeature(feature: string): string | null {
  const lower = feature.toLowerCase()

  // Check multi-word/specific matches first
  if (/\bpayload cms\b/.test(lower) || /\bpayload\b/.test(lower)) return 'Payload CMS'
  if (/\bnext\.?js\b/.test(lower)) return 'Next.js'
  if (/\btailwind\b/.test(lower)) return 'Tailwind CSS'
  if (/\bposthog\b/.test(lower)) return 'PostHog'
  if (/\bgoogle analytics\b/.test(lower) || /\bga4\b/.test(lower)) return 'Google Analytics 4'
  if (/\bhubspot\b/.test(lower)) return 'HubSpot'
  if (/\bstripe\b/.test(lower)) return 'Stripe'
  if (/\bresend\b/.test(lower)) return 'Resend'
  if (/\bsupabase\b/.test(lower)) return 'Supabase'
  if (/\bvercel\b/.test(lower)) return 'Vercel'
  if (/\bpostgres\b/.test(lower)) return 'PostgreSQL'
  if (/\bcal\.?com\b/.test(lower) || /\bcalendly\b/.test(lower)) return 'Cal.com'
  if (/\bwhatsapp\b/.test(lower)) return 'WhatsApp'
  if (/\bshopify\b/.test(lower)) return 'Shopify'
  if (/\bfigma\b/.test(lower)) return 'Figma'
  // Return null for generic terms so default checkmark icon shows
  if (/\bseo\b/.test(lower)) return null
  if (/\bcms\b/.test(lower)) return null
  // Single-word general checks last to avoid premature matches
  if (/\breact\b/.test(lower)) return 'React'

  return null
}

export const services: Service[] = [
  {
    id: '01',
    title: 'Web Design & Development',
    description:
      'Professional websites, custom-designed from scratch. No templates, no themes, no page builders. Every project includes documentation and a handover session so you can manage it yourself.',
    pricingTiers: [
      {
        name: 'Launch (Landing Page)',
        price: 'from P5,000',
        timeline: '5–8 business days',
        features: [
          'Single-page, fully responsive design',
          'Hero, about, services/features, contact sections',
          'Basic SEO setup (meta tags, Open Graph, sitemap, robots.txt)',
          'Contact form with email delivery',
          'WhatsApp click-to-chat link',
          '2 rounds of revisions',
          'Source files and documentation included',
          'Logo mark + wordmark',
          'Colour palette',
        ],
      },
      {
        name: 'Presence (Multi-Page)',
        price: 'from P13,000',
        timeline: '10–15 business days',
        features: [
          '4 pages (1 home + 3 inner), fully responsive',
          'CMS integration (Payload CMS, Sanity, or Keystatic)',
          'Advanced form with CRM routing (HubSpot free or Google Sheets)',
          'Advanced SEO on-page optimisation',
          'Analytics integration (GA4, PostHog)',
          'Blog/news section setup',
          'Social media integration',
          '2 rounds of revisions',
          'Training session on CMS usage',
          'Source files and documentation included',
          'Full brand identity (logo + colour + typography)',
          'Brand guidelines (1-page)',
        ],
      },
      {
        name: 'Growth (Advanced)',
        price: 'from P19,500',
        timeline: '15–22 business days',
        features: [
          '6 pages (1 home + 5 inner), fully responsive',
          'CMS integration + advanced form + CRM routing',
          'Technical SEO package + analytics (PostHog)',
          'Email marketing integration (Resend, Beehiiv, Brevo)',
          'Performance optimisation (Core Web Vitals)',
          'Security hardening',
          '2 rounds of revisions',
          'Training session on CMS and store management',
          'Source files and documentation included',
          'Full brand identity (logo, colour, typography, iconography, motion)',
          'Brand guidelines (multi-page)',
          'Design tokens & component system',
        ],
      },
    ],
    notes:
      'Always included across all configurations: Custom visual design and mobile-first responsive layout, WhatsApp click-to-chat link, one lead capture or contact form, basic SEO foundation, deployment to Vercel, 2 rounds of client revisions. Static/zero-motion design receives a P500 reduction — specify at scoping. Platform fees for third-party services are borne by the client. I default to free tiers first. Delivery timeline clock pauses during client review periods.',
  },
  {
    id: '02',
    title: 'Web Applications & Digital Products',
    description:
      'Custom web applications — storefronts, SaaS products, internal tools, full platforms. Built with Next.js, React, Payload CMS, PostgreSQL, and whatever else the project needs.',
    pricingTiers: [
      {
        name: 'Tier A — Storefront',
        price: 'From P2,500',
        timeline: '15–25 business days',
        features: [
          'Platform account configuration and branding',
          'Product or service listing with pricing tiers',
          'Test mode walkthrough and live mode handover',
          'Written documentation for store management',
          'Manual bank transfer option always included',
          'Available formats: Dodo Payments (from P2,500), Gumroad Store (from P2,500), Lemon Squeezy (from P3,500), Shopify Storefront (from P5,000)',
        ],
      },
      {
        name: 'Tier B — Boilerplate Builds',
        price: 'From P25,000',
        timeline: '20–35 business days',
        features: [
          'Industry-specific Growth-level builds with pre-integrated functionality',
          'Custom visual design and brand application',
          'CMS for client-managed content (Keystatic or Payload CMS)',
          'Technical SEO, analytics, email marketing, CRM routing',
          'WhatsApp click-to-chat integration',
          '2 rounds of revisions, full handover documentation',
          'Available: Artisan & Craftmaker (from P25,000), Personal Professional Services (from P28,000), Food & Hospitality (from P30,000), Beauty & Wellness (from P28,000), Events & Photography (from P28,000), E-commerce Store (from P35,000)',
        ],
      },
      {
        name: 'Tier C — Custom SaaS / Platform',
        price: 'From P48,000',
        timeline: '6–16 weeks, scoped per project',
        features: [
          'Fully bespoke, production-grade applications',
          'Multi-tenant architecture with role-based access',
          'Complex business logic and workflows',
          'Third-party API integrations',
          'Real-time features (WebSockets, Server-Sent Events)',
          'Advanced security and compliance',
          'Scalable infrastructure design',
          'Ongoing support available via retainer',
        ],
      },
    ],
    notes:
      'Tier A always includes: Manual bank transfer payment option — no merchant account needed. Tier B boilerplates are industry-specific Growth-level builds starting from the same baseline (6 pages, CMS, technical SEO, analytics, email marketing, form + CRM). All platform fees borne by the client. Payment gateway approvals are outside my control.',
  },
  {
    id: '03',
    title: 'Workflow Automation',
    description:
      'If your team is doing the same thing manually more than three times a day, it should be automated. I build on Make.com (3,000+ app integrations) — from simple one-step workflows to complex multi-branch logic with AI.',
    pricingTiers: [
      {
        name: 'Foundation Scenario',
        price: 'From P2,500',
        timeline: '3–5 business days',
        features: [
          'Process discovery call (30–45 minutes)',
          'One Make.com scenario: one trigger + up to 5 action steps',
          'Build, test, and full deployment',
          'Basic error handling (fail notifications)',
          'Written documentation',
          '1 round of revisions',
        ],
      },
      {
        name: 'Multi-Step Automation',
        price: 'From P6,000',
        timeline: '5–10 business days',
        features: [
          'Complex multi-step workflows',
          'Up to 8 connected apps/services',
          'Conditional logic and branching (routers)',
          'Data transformation and formatting',
          'Error recovery and retry logic',
          'Monitoring setup',
          'Training on managing and extending workflows',
        ],
      },
      {
        name: 'Enterprise Automation',
        price: 'Custom quote',
        timeline: 'Scoped per project',
        features: [
          'Full business process audit',
          'Custom Make.com scenarios with advanced logic',
          'AI steps (OpenAI/Claude — client supplies API key)',
          'Custom API / webhook integrations',
          'Dashboard and reporting',
          'Ongoing support via retainer',
        ],
      },
    ],
    notes:
      'Platform fees borne by the client. Make.com free: 1,000 credits/month. Core plan from ~$10/month (enables client-owned AI API keys). Add-ons: Additional steps (+P400/step), conditional logic (+P1,200/router), custom API (+P2,500/endpoint), AI step (+P3,000), CRM integration (+P2,500), payment platform (+P2,500), WhatsApp API (+P5,000, requires Meta verification), SMS (+P3,500).',
  },
  {
    id: '04',
    title: 'SEO, GEO & Google Business',
    description:
      'Get found by people who are looking for you. Technical SEO, on-page optimisation, Google Business Profile setup, and generative engine optimisation so AI assistants recommend your business. SEO is a long-term compounding activity — results measured in months, not days.',
    pricingTiers: [
      {
        name: 'GBP Quick Start',
        price: 'P2,500',
        timeline: '3–5 business days',
        features: [
          'Google Business Profile creation or complete optimisation',
          'Category selection, service area, hours, photos, Q&A',
          'NAP consistency check across web',
          'Google Search Console verification and sitemap submission',
          'Basic structured data (LocalBusiness/Organisation)',
          'Written handover notes',
        ],
      },
      {
        name: 'Full Foundation',
        price: 'P4,500',
        timeline: '7–12 business days',
        features: [
          'Everything in GBP Quick Start',
          'Full technical SEO audit and fixes',
          'On-page SEO (title tags, meta descriptions, headings, schema)',
          'Google Analytics 4 setup with event tracking',
          'GEO foundation layer (FAQ structured for direct-answer extraction)',
          'Keyword research (up to 20 target keywords)',
          'Competitor analysis',
          'Written handover report with recommended next steps',
        ],
      },
      {
        name: 'Ongoing SEO & GEO Retainer',
        price: 'From P3,500/month',
        timeline: 'Monthly (minimum 3 months)',
        features: [
          'Monthly crawl audit and technical health check',
          'Rank tracking with movement reporting',
          'GBP management (3-4 posts/month, review responses)',
          'One GEO content update per month',
          'Monthly performance report',
          'AI citation monitoring (Google AI Overviews, ChatGPT, Perplexity)',
          'Quarterly strategy review',
        ],
      },
    ],
  },
  {
    id: '05',
    title: 'Retainer & Ongoing Support',
    description:
      'Your site will need updates after launch. A retainer means you have someone on call who already knows your code — no briefing, no ramp-up, just fixes and features when you need them.',
    pricingTiers: [
      {
        name: 'Essential',
        price: 'P2,500/month',
        features: [
          'Up to 2 hours of support per month',
          'Bug fixes and minor updates',
          'CMS content updates (up to 5 items)',
          'Uptime monitoring',
          'Monthly health report',
          'Email support with 48-hour response',
        ],
      },
      {
        name: 'Growth',
        price: 'P5,000/month',
        features: [
          'Up to 10 hours of support per month',
          'Everything in Essential',
          'New page or feature development (small)',
          'Performance monitoring and optimisation',
          'Security updates and patches',
          'Priority support with 24-hour response',
          'Monthly strategy call',
        ],
      },
      {
        name: 'Partner',
        price: 'P10,000/month',
        features: [
          'Up to 25 hours of support per month',
          'Everything in Growth',
          'Larger feature development',
          'A/B testing and conversion optimisation',
          'Quarterly strategy review',
          'Dedicated Slack channel',
          'Same-week delivery for small tasks',
        ],
      },
    ],
    notes:
      'Hours do not roll over. New scopes beyond retainer hours are quoted separately. Retainer clients receive priority scheduling.',
  },
  {
    id: '06',
    title: 'Advisory & Consulting',
    description:
      'Not every engagement requires a build. Sometimes you need someone who has seen a few of these before to review your architecture, assess your tech stack, or help you plan your next move.',
    pricingTiers: [
      {
        name: 'Foundation Session',
        price: 'P2,500',
        timeline: '60 minutes',
        features: [
          'Deep-dive into your current systems',
          'Tech stack assessment',
          'Gap analysis and recommendations',
          'Prioritised action plan',
          'Written summary delivered within 48 hours',
        ],
      },
      {
        name: 'Architecture Review',
        price: 'P5,000',
        timeline: '3–5 business days',
        features: [
          'Full review of existing architecture',
          'Security assessment',
          'Performance audit',
          'Scalability evaluation',
          'Written report with recommendations',
          '1-hour follow-up call',
        ],
      },
      {
        name: 'Ongoing Advisory',
        price: 'Custom quote',
        timeline: 'Monthly or per-engagement',
        features: [
          'Regular strategy sessions',
          'Vendor evaluation support',
          'Technical due diligence',
          'Team mentoring',
          'Available for urgent consultations',
        ],
      },
    ],
  },
]
