import type { CardPostData } from '@/components/Card'
import type { Footer, Header, Page, Product, Redirect, SiteSetting, Testimonial } from '@/payload-types'
import { services as typedServices, type Service } from '@/content/launchServices'

export const launchSnapshotUpdatedAt = '2026-05-04T00:00:00.000Z'

export const launchHeader = {
  navItems: [],
} as unknown as Header

export const launchFooter = {
  navItems: [],
} as unknown as Footer

export const launchSiteSettings = {
  socialLinks: {
    substack: '',
  },
  siteTitle: 'Edmond Moepswa | Web Designer · Full-Stack Developer · Workflow Automation Specialist',
  contactEmail: 'edmond.moepswa@gmail.com',
  contactPhone: '+267 78 692 888',
  whatsappNumber: '+267 78 692 888',
} as unknown as SiteSetting

export const launchPages = [] as unknown as Page[]

export const launchRedirects = [] as unknown as Redirect[]

export const launchProducts = [
  {
    id: 30,
    title: 'How to Brief a Web Designer',
    slug: 'how-to-brief-a-web-designer',
    description:
      'Write a clear web design brief that saves you time, money, and endless back-and-forth with your designer.',
    priceCents: 0,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaYzEq1qzsiDZHrFWb',
    type: 'free',
    category: 'ebook',
    featured: true,
    thumbnail: null,
  },
  {
    id: 29,
    title: 'Website Launch Checklist',
    slug: 'website-launch-checklist',
    description:
      'A complete pre-launch checklist to ensure your website goes live without bugs, missing pages, or embarrassing errors.',
    priceCents: 0,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaYFa2uiHUZPpN7KOA',
    type: 'free',
    category: 'checklist',
    featured: true,
    thumbnail: null,
  },
  {
    id: 28,
    title: '5 Signs Your Website Is Costing You Clients',
    slug: '5-signs-your-website-is-costing-you-clients',
    description:
      'Discover the 5 most common website mistakes that silently drive potential clients away — and how to fix them fast.',
    priceCents: 0,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaY8UNB1GoMOLesz8X',
    type: 'free',
    category: 'guide',
    featured: true,
    thumbnail: null,
  },
  {
    id: 27,
    title: 'Food & Hospitality',
    slug: 'food--hospitality',
    description:
      'Stylish website starter kit for restaurants, cafes, catering businesses, and hospitality brands.',
    priceCents: 5999,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaZL68xGvvpTCMwAcr',
    type: 'paid',
    category: 'boilerplate',
    featured: false,
    thumbnail: null,
  },
  {
    id: 26,
    title: 'Health & Wellness',
    slug: 'health--wellness',
    description:
      'Modern website starter kit for clinics, wellness practitioners, and health service providers.',
    priceCents: 4999,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaZcHLefMoeI7jyZj1',
    type: 'paid',
    category: 'boilerplate',
    featured: false,
    thumbnail: null,
  },
  {
    id: 25,
    title: 'Events & Experiences',
    slug: 'events--experiences',
    description:
      'Event-ready website starter kit for venues, planners, and experience businesses.',
    priceCents: 3999,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaZjlwvNurs3YmCFbJ',
    type: 'paid',
    category: 'boilerplate',
    featured: false,
    thumbnail: null,
  },
  {
    id: 24,
    title: 'E-commerce',
    slug: 'e-commerce',
    description:
      'Full-featured e-commerce starter kit with product listings, cart, checkout, and order management.',
    priceCents: 6999,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaZqUzBh2tvZYMPCKI',
    type: 'paid',
    category: 'boilerplate',
    featured: false,
    thumbnail: null,
  },
  {
    id: 23,
    title: 'NGO / Non-Profit',
    slug: 'ngo--non-profit',
    description:
      'Clean, accessible website starter kit for NGOs, charities, and non-profit organisations.',
    priceCents: 4399,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaZxJIATESTttB9Sy4',
    type: 'paid',
    category: 'boilerplate',
    featured: false,
    thumbnail: null,
  },
  {
    id: 22,
    title: 'Financial Services',
    slug: 'financial-services',
    description:
      'Professional website starter kit designed for financial advisors, accountants, and investment firms.',
    priceCents: 5999,
    currency: 'USD',
    dodoProductId: 'pdt_0Nceaa45LVxvpPmn0JPm3',
    type: 'paid',
    category: 'boilerplate',
    featured: false,
    thumbnail: null,
  },
  {
    id: 21,
    title: 'SaaS Starter',
    slug: 'saas-starter',
    description:
      'Production-ready Next.js starter kit for SaaS products — payments, auth, CMS, and deployment pre-configured.',
    priceCents: 9999,
    currency: 'USD',
    dodoProductId: 'pdt_0NceaaACaY7X4A4qtHoek',
    type: 'paid',
    category: 'boilerplate',
    featured: false,
    thumbnail: null,
  },
  {
    id: 20,
    title: 'WhatsApp AI Chatbot (Make.com Template)',
    slug: 'whatsapp-ai-chatbot-makecom-template',
    description:
      'Production-ready Make.com blueprint to connect OpenAI with WhatsApp via the Cloud API. Includes memory handling and intent routing.',
    priceCents: 4900,
    currency: 'USD',
    dodoProductId: 'pdt_0NdHmFjOP02gm8yLVOHF1',
    type: 'paid',
    category: 'tool',
    featured: false,
    thumbnail: null,
  },
  {
    id: 19,
    title: 'WhatsApp Appointment Reminder (Make.com Template)',
    slug: 'whatsapp-appointment-reminder-makecom-template',
    description:
      'Automatically send WhatsApp reminders 24 hours before any Cal.com or Google Calendar event to reduce no-shows.',
    priceCents: 2900,
    currency: 'USD',
    dodoProductId: 'pdt_0NdHmFtQ9oYzI3PCgpyTt',
    type: 'paid',
    category: 'tool',
    featured: false,
    thumbnail: null,
  },
  {
    id: 18,
    title: 'Automated Booking CRM (Make.com Template)',
    slug: 'automated-booking-crm-makecom-template',
    description:
      'Sync your bookings from Cal.com to Google Sheets, Notion, or HubSpot automatically with full lead attribution tracking.',
    priceCents: 3900,
    currency: 'USD',
    dodoProductId: 'pdt_0NdHmGE7hVcWFg9TwTNKn',
    type: 'paid',
    category: 'tool',
    featured: false,
    thumbnail: null,
  },
] as unknown as Product[]

export const launchTestimonials = [
  {
    id: 9,
    clientName: 'Tshepo L.',
    clientRole: "CEO, Gaborone Digital Agency . Gaborone, Botswana",
    content:
      "We engaged Edmond on a three-month advisory retainer when we were repositioning our own agency's service offering. He reviewed our pricing models, helped us structure a tiered retainer product for our clients, and advised on the tech stack for a multi-tenant platform we're building. His perspective is unusual -- he's run businesses, managed corporate risk, and now builds software at a professional level. He sees angles that pure technologists miss. The retainer paid for itself when his advice on structuring our pricing helped us close a P180,000 annual contract. I'd recommend him to any founder who needs a sounding board with genuine operational experience.",
    rating: 5,
  },
  {
    id: 8,
    clientName: 'Dineo M.',
    clientRole: 'Co-founder, PulaPay Fintech . Gaborone, Botswana',
    content:
      "We bought Edmond's SaaS boilerplate to validate a subscription product idea and it saved us at least six weeks of development time. The starter kit came with Clerk auth, role-based access control, Dodo Payments for subscription billing, and a clean admin dashboard. We had our MVP live in nine days -- including customising the branding and adding our own onboarding flow. The documentation was thorough and when we hit a snag with the Drizzle ORM migrations, Edmond hopped on a 20-minute call and walked us through the fix. For any Botswana-based startup that needs to move fast, this boilerplate is a genuine shortcut.",
    rating: 5,
  },
  {
    id: 7,
    clientName: 'Sarah T.',
    clientRole: 'Director, Outback Financial Planning . Sydney, Australia',
    content:
      "Edmond set up our SEO foundation back in 2024 and we've been on a retainer with him for eight months now. In the first quarter, our Google Business Profile enquiries went up 35% and we started ranking on page one for three of our target keywords in western Sydney. What I appreciate most is the quarterly strategy review -- he doesn't just send a ranking report and disappear. He looks at our content pipeline, suggests blog topics based on search volume trends, and flags technical issues before they become problems. The retainer gives us predictable costs and someone who actually understands how our site is built. Worth every cent.",
    rating: 5,
  },
  {
    id: 6,
    clientName: 'Oarabile D.',
    clientRole: 'Operations Manager, Kgalagadi Logistics . Gaborone, Botswana',
    content:
      "We were drowning in manual work -- lead enquiries coming in from our website form, Google Business Profile, and three different WhatsApp numbers, all going into a shared spreadsheet that nobody updated consistently. Edmond built us a Make.com pipeline that captures every lead, scores it by estimated value, and routes high-priority enquiries to the right person within 15 minutes. In the first month we processed 52 leads with zero missed follow-ups. The real win was the automated HubSpot logging -- our sales team stopped spending 30 minutes a day on data entry. He came in, mapped our actual workflow on a whiteboard, and built exactly that. No overselling, no unnecessary tools.",
    rating: 5,
  },
  {
    id: 5,
    clientName: 'Lerato S.',
    clientRole: 'Marketing Manager . Construction Firm . Gaborone, Botswana',
    content:
      'Edmond redesigned our corporate website and the difference is night and day. Our old site looked like it was built in 2018 -- because it was. The new site communicates professionalism and capability, which matters when we\'re bidding on government tenders worth millions of pula. The CMS integration means our team can update project photos and team profiles without calling a developer. He delivered on time, on budget, and with zero surprises.',
    rating: 5,
  },
  {
    id: 4,
    clientName: 'James R.',
    clientRole: 'Senior Financial Adviser . Sydney, Australia',
    content:
      'I worked with Edmond during his time in financial planning in Sydney. He has an exceptional ability to break down complex financial structures into clear, actionable strategies. What impressed me most was his attention to detail -- every Record of Advice and Statement of Advice he produced was thorough, compliant, and client-ready without revision. He brings the same rigour to his software development work. A genuinely reliable professional.',
    rating: 5,
  },
  {
    id: 3,
    clientName: 'Mpho K.',
    clientRole: 'Founder, Gaborone Catering Co. . Gaborone, Botswana',
    content:
      "Before working with Edmond, we relied entirely on WhatsApp and word-of-mouth for bookings. He built us a professional website with a pre-order system, event enquiry forms, and automated email reminders. Our booking volume increased by 60% in the first three months, and we've cut no-shows in half thanks to the reminder system. He understood our business from the first conversation -- you can tell he's run a business himself.",
    rating: 5,
  },
  {
    id: 2,
    clientName: 'Thabo N.',
    clientRole: 'Managing Director, HSNV Group . Gaborone, Botswana',
    content:
      "Edmond joined us as Risk & Insurance Manager and within months had built an internal dashboard that replaced spreadsheets for tracking insurance across six active construction projects. The system eliminated policy lapses, automated NBFIRA compliance reporting, and gave us real-time visibility into our risk exposure. He didn't just manage the function -- he built the systems that made it run. A rare combination of operational discipline and technical skill.",
    rating: 5,
  },
  {
    id: 1,
    clientName: 'Kagiso M.',
    clientRole: 'Owner, Morning Dew Cafe . Canberra, Australia',
    content:
      'Edmond built our website when he was managing the cafe -- not because anyone asked him to, but because he could see we were losing customers who couldn\'t find us online. The site paid for itself within the first month through increased foot traffic and takeaway orders. He has this rare ability to see a business problem and solve it with technology. Years later, I still recommend him to anyone who needs a website that actually works.',
    rating: 5,
  },
] as unknown as Testimonial[]

export const launchServices: Service[] = typedServices

type LaunchSearchDocument = CardPostData & {
  searchText: string
}

const launchStaticSearchDocuments: LaunchSearchDocument[] = [
  {
    id: 'home',
    href: '/',
    slug: 'home',
    title: 'Edmond Moepswa',
    meta: {
      title: 'Edmond Moepswa',
      description:
        'Web designer, full-stack developer, and workflow automation specialist in Gaborone, Botswana.',
      image: null,
    },
    categories: null,
    searchText:
      'edmond moepswa home web designer full-stack developer workflow automation gaborone botswana',
  },
  {
    id: 'about',
    href: '/about',
    slug: 'about',
    title: 'About',
    meta: {
      title: 'About Edmond Moepswa',
      description: 'Background, experience, and working approach.',
      image: null,
    },
    categories: null,
    searchText: 'about edmond moepswa background experience financial planning software systems',
  },
  {
    id: 'contact',
    href: '/contact',
    slug: 'contact',
    title: 'Contact',
    meta: {
      title: 'Contact Edmond Moepswa',
      description: 'Get in touch about a website, application, or automation project.',
      image: null,
    },
    categories: null,
    searchText: 'contact discovery call website application automation project quote',
  },
  {
    id: 'services',
    href: '/services',
    slug: 'services',
    title: 'Services',
    meta: {
      title: 'Services & Pricing',
      description: 'Web design, web applications, workflow automation, SEO, support, and advisory.',
      image: null,
    },
    categories: null,
    searchText:
      'services pricing web design development applications workflow automation seo support advisory',
  },
  {
    id: 'resources',
    href: '/resources',
    slug: 'resources',
    title: 'Resources',
    meta: {
      title: 'Resources',
      description: 'Starter kits, guides, checklists, and digital assets.',
      image: null,
    },
    categories: null,
    searchText: 'resources guides checklists starter kits boilerplates products downloads',
  },
  {
    id: 'privacy-policy',
    href: '/privacy-policy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    meta: {
      title: 'Privacy Policy',
      description: 'Privacy and data handling policy.',
      image: null,
    },
    categories: null,
    searchText: 'privacy policy data handling personal information',
  },
  {
    id: 'terms-and-conditions',
    href: '/terms-and-conditions',
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    meta: {
      title: 'Terms and Conditions',
      description: 'Commercial terms, ownership, and usage conditions.',
      image: null,
    },
    categories: null,
    searchText: 'terms and conditions ownership intellectual property commercial terms',
  },
  {
    id: 'refund-policy',
    href: '/refund-policy',
    slug: 'refund-policy',
    title: 'Refund Policy',
    meta: {
      title: 'Refund Policy',
      description: 'Refund terms for services and digital products.',
      image: null,
    },
    categories: null,
    searchText: 'refund policy deposits digital products boilerplates',
  },
  {
    id: 'cancellation-policy',
    href: '/cancellation-policy',
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    meta: {
      title: 'Cancellation Policy',
      description: 'Cancellation terms for active engagements.',
      image: null,
    },
    categories: null,
    searchText: 'cancellation policy project engagement scope cancellations',
  },
  {
    id: 'legal-restrictions',
    href: '/legal-restrictions',
    slug: 'legal-restrictions',
    title: 'Legal Restrictions',
    meta: {
      title: 'Legal Restrictions',
      description: 'Availability, payment, and legal limitations.',
      image: null,
    },
    categories: null,
    searchText: 'legal restrictions botswana payments stripe dodo paygate availability',
  },
]

const launchServiceSearchDocuments: LaunchSearchDocument[] = launchServices.map((service) => ({
  id: `service-${service.id}`,
  href: `/services#service-${service.id}`,
  slug: service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title: service.title,
  meta: {
    title: service.title,
    description: service.description,
    image: null,
  },
  categories: null,
  searchText: [
    service.title,
    service.description,
    service.notes ?? '',
    ...service.pricingTiers.map((tier) => [tier.name, tier.price, tier.timeline ?? '', ...tier.features].join(' ')),
  ]
    .join(' ')
    .toLowerCase(),
}))

const launchProductSearchDocuments: LaunchSearchDocument[] = launchProducts.map((product) => ({
  id: `product-${product.id}`,
  href: '/resources',
  slug: product.slug ?? null,
  title: product.title ?? null,
  meta: {
    title: product.title ?? null,
    description: product.description ?? null,
    image: null,
  },
  categories: null,
  searchText: [
    product.title ?? '',
    product.description ?? '',
    product.category ?? '',
    product.type ?? '',
    product.slug ?? '',
  ]
    .join(' ')
    .toLowerCase(),
}))

const launchTestimonialSearchDocuments: LaunchSearchDocument[] = launchTestimonials.map((testimonial) => ({
  id: `testimonial-${testimonial.id}`,
  href: '/#testimonials',
  slug: `testimonial-${testimonial.id}`,
  title: testimonial.clientName ?? null,
  meta: {
    title: testimonial.clientName ?? null,
    description: testimonial.content ?? null,
    image: null,
  },
  categories: null,
  searchText: [testimonial.clientName ?? '', testimonial.clientRole ?? '', testimonial.content ?? '']
    .join(' ')
    .toLowerCase(),
}))

const launchSearchDocuments: LaunchSearchDocument[] = [
  ...launchStaticSearchDocuments,
  ...launchServiceSearchDocuments,
  ...launchProductSearchDocuments,
  ...launchTestimonialSearchDocuments,
]

const launchStaticRoutes = [
  '/',
  '/about',
  '/cancellation-policy',
  '/contact',
  '/legal-restrictions',
  '/privacy-policy',
  '/refund-policy',
  '/resources',
  '/search',
  '/services',
  '/terms-and-conditions',
]

export function getLaunchPageBySlug(slug: string): Partial<Page> | null {
  return launchPages.find((page) => page.slug === slug) ?? null
}

export function getLaunchRedirectByFrom(pathname: string): Redirect | null {
  return launchRedirects.find((redirect) => redirect.from === pathname) ?? null
}

export function getLaunchDocument(collection: string, idOrSlug: string): Partial<Page> | null {
  if (collection !== 'pages') {
    return null
  }

  return (
    launchPages.find((page) => page.slug === idOrSlug || String(page.id ?? '') === idOrSlug) ?? null
  )
}

export function searchLaunchDocuments(query: string): CardPostData[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return launchSearchDocuments
    .filter((doc) => doc.searchText.includes(normalizedQuery))
    .slice(0, 12)
    .map(({ searchText, ...doc }) => doc)
}

export function getLaunchSitemapEntries(siteUrl: string) {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl

  const staticEntries = launchStaticRoutes.map((route) => ({
    loc: route === '/' ? `${baseUrl}/` : `${baseUrl}${route}`,
    lastmod: launchSnapshotUpdatedAt,
  }))

  const pageEntries = launchPages
    .filter((page) => Boolean(page.slug))
    .map((page) => ({
      loc: page.slug === 'home' ? `${baseUrl}/` : `${baseUrl}/${page.slug}`,
      lastmod: page.updatedAt || launchSnapshotUpdatedAt,
    }))

  return [...staticEntries, ...pageEntries]
}
