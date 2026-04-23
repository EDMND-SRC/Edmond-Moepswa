export interface PricingTier {
  name: string
  priceBWP: number | null // null = "Custom quote"
  timeline?: string
  features: string[]
}

export interface AddonOption {
  id: string
  name: string
  priceBWP: number
  perUnit?: boolean // if true, price is per unit (e.g., per page, per language)
  unitLabel?: string // e.g., "page", "language", "integration"
  maxQty?: number // max quantity for stepper
}

export interface ServiceCategory {
  id: string
  label: string
  shortDesc?: string
  tiers: PricingTier[]
  addons?: AddonOption[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'web-design',
    label: 'Web Design & Development',
    tiers: [
      {
        name: 'Launch',
        priceBWP: 6500,
        timeline: '5-8 business days',
        features: [
          'Single-page landing site',
          'Fully responsive',
          'Basic SEO setup',
          'Contact form',
          '1 revision round',
          'Source files included',
          'Logo mark + wordmark',
          'Colour palette',
        ],
      },
      {
        name: 'Presence',
        priceBWP: 13000,
        timeline: '10-15 business days',
        features: [
          '4 pages (1 home + 3 inner)',
          'CMS integration',
          'Advanced SEO',
          'Analytics setup',
          'Blog section',
          '2 revision rounds',
          'CMS training session',
          'Full brand identity (logo + colour + typography)',
          'Brand guidelines (1-page)',
        ],
      },
      {
        name: 'Growth',
        priceBWP: 19500,
        timeline: '15-22 business days',
        features: [
          '6 pages (1 home + 5 inner)',
          'E-commerce integration',
          'Product catalogue & cart',
          'Customer account area',
          'Advanced analytics',
          'CRM integration',
          '2 revision rounds',
          'Full brand identity (logo, colour, typography, iconography, motion)',
          'Brand guidelines (multi-page)',
          'Design tokens & component system',
        ],
      },
    ],
    addons: [
      {
        id: 'extra-pages',
        name: 'Additional pages',
        priceBWP: 1800,
        perUnit: true,
        unitLabel: 'page',
        maxQty: 10,
      },
      { id: 'blog-module', name: 'Blog/news module', priceBWP: 3500 },
      { id: 'portfolio-module', name: 'Portfolio/case study module', priceBWP: 2000 },
      { id: 'team-directory', name: 'Team directory', priceBWP: 2000 },
      { id: 'scroll-animations', name: 'Scroll animations & micro-interactions', priceBWP: 3000 },
      { id: 'custom-illustrations', name: 'Custom illustration / icon set', priceBWP: 3500 },
      { id: 'brand-design-system', name: 'Brand design system', priceBWP: 3500 },
      { id: 'copywriting', name: 'Professional copywriting', priceBWP: 2500 },
      { id: 'booking-integration', name: 'Booking / scheduling integration', priceBWP: 2500 },
      { id: 'ecommerce', name: 'E-commerce / payment integration', priceBWP: 9000 },
      { id: 'member-area', name: 'Member area / gated content', priceBWP: 5000 },
      {
        id: 'multilingual',
        name: 'Multilingual setup',
        priceBWP: 3500,
        perUnit: true,
        unitLabel: 'language',
        maxQty: 3,
      },
      { id: 'cookie-consent', name: 'Cookie consent & compliance', priceBWP: 1500 },
      { id: 'uptime-monitoring', name: 'Uptime & performance monitoring', priceBWP: 1500 },
    ],
  },
  {
    id: 'web-apps',
    label: 'Web Applications',
    tiers: [
      {
        name: 'Tier A - Storefront',
        priceBWP: 3500,
        timeline: '15-25 business days',
        features: [
          'Public-facing web app',
          'User authentication',
          'Product/content catalogue',
          'Search & filtering',
          'Admin dashboard',
          'Payment gateway integration',
        ],
      },
      {
        name: 'Tier B - Boilerplate SaaS',
        priceBWP: 25000,
        timeline: '20-35 business days',
        features: [
          'Multi-tenant architecture',
          'Subscription billing',
          'Role-based access control',
          'API endpoints',
          'Analytics dashboard',
          'Documentation & handover',
        ],
      },
      {
        name: 'Tier C - Custom SaaS',
        priceBWP: 55000,
        timeline: 'Scoped per project',
        features: [
          'Full custom architecture',
          'Complex business logic',
          'Third-party API integrations',
          'Real-time features',
          'Advanced security',
          'Scalable infrastructure',
        ],
      },
    ],
    addons: [
      { id: 'realtime-features', name: 'Real-time features (WebSockets/SSE)', priceBWP: 8000 },
      { id: 'security-hardening', name: 'Advanced security hardening', priceBWP: 5000 },
      {
        id: 'api-integrations',
        name: 'Third-party API integrations',
        priceBWP: 5000,
        perUnit: true,
        unitLabel: 'integration',
        maxQty: 5,
      },
    ],
  },
  {
    id: 'automation',
    label: 'Workflow Automation',
    tiers: [
      {
        name: 'Foundation',
        priceBWP: 2500,
        timeline: '3-5 business days',
        features: [
          'Single workflow',
          'Make.com / Zapier / n8n',
          'Up to 3 connected apps',
          'Error handling',
          'Documentation included',
        ],
      },
      {
        name: 'Multi-Step',
        priceBWP: 6000,
        timeline: '5-10 business days',
        features: [
          'Complex multi-step workflows',
          'Up to 8 connected apps',
          'Conditional logic & branching',
          'Data transformation',
          'Error recovery & retry',
          'Monitoring setup',
        ],
      },
      {
        name: 'Enterprise',
        priceBWP: null,
        timeline: 'Scoped per project',
        features: [
          'Full process audit',
          'Custom n8n deployment',
          'API development',
          'Event-driven architecture',
          'Dashboard & reporting',
          'Ongoing retainer support',
        ],
      },
    ],
    addons: [
      { id: 'multi-step', name: 'Multi-step expansion', priceBWP: 3500 },
      { id: 'custom-api', name: 'Custom API / webhook integration', priceBWP: 5000 },
      { id: 'dashboard-reporting', name: 'Dashboard & reporting', priceBWP: 4000 },
    ],
  },
  {
    id: 'seo',
    label: 'SEO / GEO / GBP',
    tiers: [
      {
        name: 'GBP Quick Start',
        priceBWP: 2500,
        timeline: '3-5 business days',
        features: [
          'Google Business Profile setup',
          'Category & service area config',
          'Business description with keywords',
          'Photo & logo optimisation',
          'Review management strategy',
        ],
      },
      {
        name: 'Full Foundation',
        priceBWP: 4500,
        timeline: '7-10 business days',
        features: [
          'Everything in GBP Quick Start',
          'Technical SEO audit & fixes',
          'On-page SEO optimisation',
          'Schema markup',
          'Search Console setup',
          'Keyword research (20 keywords)',
          'Competitor analysis',
        ],
      },
      {
        name: 'Ongoing Retainer',
        priceBWP: 4500,
        timeline: 'Monthly',
        features: [
          'Monthly ranking reports',
          'Content recommendations',
          'Backlink monitoring',
          'Technical SEO maintenance',
          'GBP updates',
          'Quarterly strategy review',
        ],
      },
    ],
    addons: [
      { id: 'content-recommendations', name: 'Content creation recommendations', priceBWP: 2000 },
      { id: 'competitor-deep-dive', name: 'Competitor deep-dive analysis', priceBWP: 3000 },
    ],
  },
  {
    id: 'retainers',
    label: 'Retainers',
    tiers: [
      {
        name: 'Essential',
        priceBWP: 2500,
        timeline: 'Per month',
        features: [
          'Up to 2 hours/month',
          'Bug fixes & minor updates',
          'CMS content updates (5 items)',
          'Uptime monitoring',
          'Monthly health report',
          '48-hour email response',
        ],
      },
      {
        name: 'Additional Hour Block',
        priceBWP: 1200,
        timeline: 'Per hour',
        features: [
          'Single hour add-on',
          'Same deliverables as retainer hours',
          'Billed monthly in blocks',
          'Flexible use - any task',
        ],
      },
    ],
    addons: [
      {
        id: 'extra-hours',
        name: 'Additional hour blocks',
        priceBWP: 1500,
        perUnit: true,
        unitLabel: 'hour',
        maxQty: 10,
      },
    ],
  },
  {
    id: 'advisory',
    label: 'Advisory',
    tiers: [
      {
        name: 'Foundation Session',
        priceBWP: 2500,
        timeline: '60 minutes',
        features: [
          'Deep-dive into current systems',
          'Tech stack assessment',
          'Gap analysis',
          'Prioritised action plan',
          'Written summary within 48hrs',
        ],
      },
      {
        name: 'Architecture Review',
        priceBWP: 5000,
        timeline: '3-5 business days',
        features: [
          'Full architecture review',
          'Security assessment',
          'Performance audit',
          'Scalability evaluation',
          'Written report',
          '1-hour follow-up call',
        ],
      },
      {
        name: 'Ongoing Advisory',
        priceBWP: null,
        timeline: 'Monthly or per-engagement',
        features: [
          'Regular strategy sessions',
          'Vendor evaluation support',
          'Technical due diligence',
          'Team mentoring',
          'Urgent consultations available',
        ],
      },
    ],
    addons: [
      { id: 'written-report', name: 'Written report & documentation', priceBWP: 2000 },
      { id: 'follow-up-session', name: 'Follow-up working session', priceBWP: 2500 },
    ],
  },
]
