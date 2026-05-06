export interface PricingTier {
  name: string
  priceBWP: number | null // null = "Custom quote"
  timeline?: string
  features: string[]
}

export interface ServiceCategory {
  id: string
  label: string
  shortDesc?: string
  tiers: PricingTier[]
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
  },
]
