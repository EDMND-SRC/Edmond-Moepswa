import type { Media } from '@/types/content'

export interface HomepageProjectHighlight {
  category: 'applications' | 'automation' | 'products' | 'websites'
  description: string
  id: number
  link: string | null
  thumbnail: Media
  title: string
  year: string
}

function media(
  id: number,
  url: string,
  alt: string,
  width: number,
  height: number,
): Media {
  return {
    alt,
    height,
    id,
    mimeType: 'image/webp',
    url,
    width,
  }
}

export const HOMEPAGE_PROJECT_HIGHLIGHTS: HomepageProjectHighlight[] = [
  {
    category: 'products',
    description:
      'An open-source Payload CMS starter kit specifically configured for Botswana-based small and medium enterprises. Pre-configured with local payment gateway integrations, WhatsApp Business API setup, Google Business Profile embed, and a technical SEO baseline.',
    id: 25,
    link: null,
    thumbnail: media(
      2501,
      '/media/project-open-source-cms-3.webp',
      'Open Source CMS Tools thumbnail',
      1408,
      768,
    ),
    title: 'Open Source — Payload CMS Boilerplate for Botswana SMEs',
    year: '2026',
  },
  {
    category: 'websites',
    description:
      'A website and pre-order system for a Gaborone-based catering business. The site communicates the menu professionally, handles inbound booking and pre-order enquiries, and reduces reliance on food delivery platforms for discovery.',
    id: 24,
    link: null,
    thumbnail: media(
      2401,
      '/media/project-food-hub-3.webp',
      'Food Hub Platform thumbnail',
      1408,
      768,
    ),
    title: 'Gaborone Food Hub — Restaurant Booking & Pre-Order System',
    year: '2026',
  },
  {
    category: 'websites',
    description:
      'A 7-page corporate website for a Botswana-based construction firm, replacing their outdated 2018 site with a more trustworthy, capable, and proposal-ready digital presence.',
    id: 23,
    link: null,
    thumbnail: media(
      2301,
      '/media/project-construction-website-3.webp',
      'Construction Company Website thumbnail',
      1200,
      800,
    ),
    title: 'Botswana Construction Co. — Corporate Website',
    year: '2026',
  },
  {
    category: 'products',
    description:
      'A production-ready SaaS starter kit built with Next.js, PostgreSQL, and Dodo Payments for founders who need to validate a subscription product without starting from scratch.',
    id: 22,
    link: null,
    thumbnail: media(
      2201,
      '/media/project-saas-boilerplate-3.webp',
      'SaaS Boilerplate thumbnail',
      1200,
      800,
    ),
    title: 'SaaS Boilerplate — Subscription Management Platform',
    year: '2026',
  },
  {
    category: 'automation',
    description:
      'End-to-end lead management automation built with Make.com for a financial advisory firm in Gaborone, routing enquiries from forms, bookings, and Google Business Profile into a qualification workflow.',
    id: 21,
    link: null,
    thumbnail: media(
      2101,
      '/media/project-automation-pipeline-3.webp',
      'Lead Automation Pipeline thumbnail',
      1380,
      752,
    ),
    title: 'Lead-to-Client Automation Pipeline',
    year: '2026',
  },
  {
    category: 'applications',
    description:
      'A concept marketplace platform for Botswana-based artisans to showcase their work and receive commission enquiries directly through a focused, mobile-first browsing experience.',
    id: 20,
    link: null,
    thumbnail: media(
      2001,
      '/media/project-artisan-marketplace-3.webp',
      'Artisan E-commerce Platform thumbnail',
      1200,
      800,
    ),
    title: 'Gaborone Artisan Marketplace',
    year: '2026',
  },
  {
    category: 'applications',
    description:
      'An internal dashboard built to consolidate insurance portfolios across multiple construction projects, giving management one view of policy coverage, renewals, and compliance exposure.',
    id: 19,
    link: null,
    thumbnail: media(
      1901,
      '/media/project-hsnv-risk-3.webp',
      'HSNV Risk Management Dashboard thumbnail',
      1264,
      848,
    ),
    title: 'HSNV Group — Risk Management Dashboard',
    year: '2025',
  },
  {
    category: 'websites',
    description:
      'A self-initiated hospitality website redesign that improved discoverability, communicated the café offering more clearly, and helped turn online visibility into real foot traffic.',
    id: 18,
    link: null,
    thumbnail: media(
      1801,
      '/media/project-morning-dew-cafe-3.webp',
      'Morning Dew Cafe thumbnail',
      1200,
      800,
    ),
    title: 'Morning Dew Café — Website Redesign',
    year: '2019',
  },
]
