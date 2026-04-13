export interface PricingTier {
  name: string
  price: string
  features: string[]
  timeline?: string
  revisions?: string
}

export interface Service {
  id: string
  title: string
  description: string
  pricingTiers: PricingTier[]
  notes?: string
}

export const services: Service[] = [
  {
    id: '01',
    title: 'Web Design & Development',
    description:
      'Professional websites — from single-page landing sites to multi-page business platforms. Custom-designed from scratch, built to perform, and fully documented so you can manage it yourself.',
    pricingTiers: [
      {
        name: 'Launch',
        price: 'P5,000',
        timeline: '5–8 business days',
        revisions: '2 rounds',
        features: [
          'Up to 5 pages',
          'Single-page, fully responsive design',
          'Basic SEO setup (meta tags, Open Graph, sitemap)',
          'Contact form with email delivery',
          'Source files and documentation included',
          'Logo mark + wordmark',
          'Colour palette',
        ],
      },
      {
        name: 'Presence',
        price: 'P13,000',
        timeline: '10–15 business days',
        revisions: '2 rounds',
        features: [
          '4 pages (1 home + 3 inner)',
          'CMS integration (Payload CMS, Sanity, or similar)',
          'Advanced SEO on-page optimisation',
          'Analytics integration (GA4, PostHog, or similar)',
          'Blog/news section setup',
          'Social media integration',
          'Training session on CMS usage',
          'Source files and documentation included',
          'Full brand identity (logo + colour + typography)',
          'Brand guidelines (1-page)',
        ],
      },
      {
        name: 'Growth',
        price: 'P19,500',
        timeline: '15–22 business days',
        revisions: '2 rounds',
        features: [
          '6 pages (1 home + 5 inner)',
          'Advanced analytics and conversion tracking',
          'Email marketing integration (Beehiiv, Brevo, Mailchimp)',
          'Performance optimisation (Core Web Vitals)',
          'Security hardening',
          'Training session on CMS usage',
          'Source files and documentation included',
          'Full brand identity (logo, colour, typography, iconography, motion)',
          'Brand guidelines (multi-page)',
          'Design tokens & component system',
        ],
      },
    ],
    notes:
      'Add-ons available: Additional pages (+P1,800/page), Blog module (+P3,500), Portfolio module (+P2,000), Team directory (+P2,000), Scroll animations (+P3,000), Custom illustrations (+P3,500), Brand design system (+P3,500), Copywriting (+P2,500/3 pages), Booking integration (+P2,500), E-commerce (+P9,000), Member area (+P5,000), Multilingual (+P3,500/language), Live chat (+P1,800), WhatsApp API (+P5,000), SMS notifications (+P3,500), Telegram bot (+P2,500), Cookie consent (+P1,500), Uptime monitoring (+P1,500). Priority delivery +20%, Rush delivery +35%, Phased delivery no surcharge. Static/zero-motion design gets P500 reduction. Platform fees for third-party services are borne by the client. I default to free tiers first. Delivery timeline clock pauses during client review periods. Payment gateway availability depends on your location and business registration. For Botswana-based businesses, DPO PayGate or Orange Money are the primary options. Stripe is not available in Botswana.',
  },
  {
    id: '02',
    title: 'Web Applications',
    description:
      'Custom-built web applications — from storefronts and boilerplate SaaS products to full-scale platforms. Built with modern stacks: Next.js, React, Payload CMS, PostgreSQL, and more.',
    pricingTiers: [
      {
        name: 'Tier A — MVP',
        price: 'From P2,500',
        timeline: '15–25 business days',
        features: [
          'Single-purpose app: booking system, contact form, calculator, dashboard',
          'User authentication and accounts',
          'Basic admin panel',
          'Email notifications',
          'Documentation and handover',
        ],
      },
      {
        name: 'Tier B — Platform',
        price: 'From P25,000',
        timeline: '20–35 business days',
        features: [
          'Multi-tenant architecture',
          'Role-based access control',
          'API endpoints',
          'Analytics dashboard',
          'Payment gateway integration',
          'Email marketing integration',
          'Documentation and handover',
        ],
      },
      {
        name: 'Tier C — Enterprise',
        price: 'From P48,000',
        timeline: 'Scoped per project',
        features: [
          'Multi-tenant, complex integrations, custom architecture',
          'Complex business logic and workflows',
          'Third-party API integrations',
          'Real-time features (WebSockets, Server-Sent Events)',
          'Advanced security and compliance',
          'Scalable infrastructure design',
          'Ongoing support available via retainer',
        ],
      },
    ],
  },
  {
    id: '03',
    title: 'Workflow Automation',
    description:
      'If your team is doing the same thing manually more than three times a day, it should be automated. I build workflows on Make.com, n8n, or custom API integrations — from simple one-step routes to complex multi-branch logic with AI.',
    pricingTiers: [
      {
        name: 'Foundation',
        price: 'From P2,500',
        timeline: '3–5 business days',
        features: [
          'One trigger + up to 5 action steps',
          'Error handling',
          'Notification routing',
          'Documentation',
        ],
      },
      {
        name: 'Add-On: Multi-Step Expansion',
        price: 'From P3,500',
        timeline: '3–7 business days',
        features: [
          'Additional workflow branches',
          'Conditional logic and branching',
          'Data transformation and formatting',
          'Error recovery and retry logic',
        ],
      },
      {
        name: 'Add-On: Custom Integration',
        price: 'From P5,000',
        timeline: '5–10 business days',
        features: [
          'Custom API or webhook development',
          'Event-driven architecture',
          'Dashboard and reporting',
          'Ongoing support via retainer',
        ],
      },
    ],
    notes:
      'Platform fees (Make.com, Zapier, n8n cloud) are borne by the client. Make.com free: 1,000 credits/month. n8n self-hosted: unlimited, free on your VPS. Zapier: 100 tasks/month. I default to free tiers where possible.',
  },
  {
    id: '04',
    title: 'SEO, GEO & Google Business',
    description:
      'Get found by the people who are looking for you. I handle technical SEO, on-page optimisation, Google Business Profile setup, and generative engine optimisation so AI assistants recommend your business.',
    pricingTiers: [
      {
        name: 'GBP Quick Start',
        price: 'P2,500',
        timeline: '3–5 business days',
        features: [
          'Google Business Profile setup or optimisation',
          'Category selection and service area configuration',
          'Business description with keyword targeting',
          'Photo upload and logo optimisation',
          'Review management strategy',
        ],
      },
      {
        name: 'Full Foundation',
        price: 'P4,500',
        timeline: '7–12 business days',
        features: [
          'Everything in GBP Quick Start',
          'Technical SEO audit and fixes',
          'On-page SEO (title tags, meta descriptions, headings)',
          'Schema markup (LocalBusiness, Person, FAQ)',
          'Google Search Console setup',
          'Keyword research (up to 20 target keywords)',
          'Content recommendations for SEO',
          'Competitor analysis',
          '30-day ranking baseline report',
        ],
      },
      {
        name: 'Ongoing SEO Retainer',
        price: 'From P3,500/month',
        timeline: 'Monthly',
        features: [
          'Monthly keyword ranking reports',
          'Content creation recommendations',
          'Backlink monitoring',
          'Technical SEO maintenance',
          'Google Business Profile updates',
          'Quarterly strategy review',
        ],
      },
    ],
    notes:
      'All payment gateway availability should be confirmed at scoping. DPO PayGate and Orange Money are the primary local options for Botswana businesses.',
  },
  {
    id: '05',
    title: 'Retainer & Ongoing Support',
    description:
      'Your systems need care after launch. A retainer means you have someone on call who already knows your codebase — no briefing, no ramp-up, just fixes and features.',
    pricingTiers: [
      {
        name: 'Essential',
        price: 'P2,500/month',
        features: [
          'Up to 2 hours/month',
          'Bug fixes and minor updates',
          'CMS content updates',
          'Uptime monitoring',
          'Monthly health report',
          'Email support with 48-hour response',
        ],
      },
    ],
    notes:
      'Additional hour blocks: P1,500/hour (minimum 2 hours). Hours do not roll over. New scopes beyond retainer hours are quoted separately. Retainer clients receive priority scheduling.',
  },
  {
    id: '06',
    title: 'Advisory & Consulting',
    description:
      'Not every engagement requires a build. Sometimes you need an experienced systems thinker to review your architecture, assess your tech stack, or help you plan your next digital move.',
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
        name: 'Half-Day Working Session',
        price: 'P6,500',
        timeline: '4 hours',
        features: [
          'Focused working session on your project',
          'Hands-on architecture or code review',
          'Live problem-solving and decision-making',
          'Written report with recommendations',
          'Follow-up summary and action items',
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
  {
    id: '07',
    title: 'Boilerplate Products',
    description:
      'Pre-built, production-ready starter kits for common business needs. Buy once, deploy fast, customise to your brand. Perfect for founders who need to validate fast without building from scratch.',
    pricingTiers: [
      {
        name: 'Artisan & Craftmaker Portfolio',
        price: 'From P25,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'Professional Services Firm',
        price: 'From P28,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'Food & Hospitality',
        price: 'From P30,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'Health & Wellness',
        price: 'From P25,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'Events & Experiences',
        price: 'From P20,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'E-commerce',
        price: 'From P35,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'NGO / Non-Profit',
        price: 'From P22,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'Financial Services',
        price: 'From P30,000',
        features: [
          'Built with Next.js + Payload CMS',
          'Responsive design',
          'CMS integration',
          'Payment gateway ready',
          'Documentation included',
        ],
      },
      {
        name: 'Custom Boilerplate',
        price: 'Custom quote',
        features: [
          'Built to your specifications',
          'Your tech stack preferences',
          'Reusable across multiple projects',
          'Documentation and training',
          'Licensed for your exclusive use',
        ],
      },
    ],
    notes:
      'Boilerplates are sold via Gumroad or Dodo Payments. Each purchase includes a license for a single project. Multi-project licenses available on request.',
  },
  {
    id: '08',
    title: 'Free Resources',
    description:
      'Practical guides, checklists, and tools — completely free. Download from Gumroad and start improving your digital presence today.',
    pricingTiers: [
      {
        name: '5 Signs Your Business Is Losing Money to Manual Processes',
        price: 'Free',
        features: [
          'Short guide',
          'Identify costly inefficiencies',
          'Real-world examples',
          'Quick-win fixes',
        ],
      },
      {
        name: 'Digital Systems Health Check',
        price: 'Free',
        features: [
          'Self-assessment scorecard',
          'Rate your current systems',
          'Identify gaps and risks',
          'Prioritised improvement areas',
        ],
      },
      {
        name: 'UX Red Flags Checklist',
        price: 'Free',
        features: [
          'Checklist (15 items)',
          'Common UX mistakes',
          'How to audit your own site',
          'Actionable fixes for each item',
        ],
      },
    ],
    notes:
      'Download from Gumroad — no strings attached. Each free resource is paired with a related paid product in the store.',
  },
]
