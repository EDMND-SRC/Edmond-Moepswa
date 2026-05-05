export type AppID = number

export interface Media {
  alt: string
  createdAt?: string
  filename?: string | null
  filesize?: number | null
  focalX?: number | null
  focalY?: number | null
  height?: number | null
  id: AppID
  mimeType?: string | null
  thumbnailURL?: string | null
  updatedAt?: string
  url?: string | null
  width?: number | null
}

export interface PageMeta {
  description?: string | null
  image?: Media | null
  title?: string | null
}

export interface Page {
  createdAt?: string
  href?: string | null
  id: AppID
  meta?: PageMeta | null
  publishedAt?: string | null
  slug: string
  title: string
  updatedAt: string
}

export interface CMSLinkField {
  appearance?: 'default' | 'inline' | 'link' | 'outline' | null
  label: string
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: AppID | Page
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export interface Header {
  navItems: Array<{
    id?: string | null
    link: CMSLinkField
  }>
}

export interface Footer {
  navItems: Array<{
    id?: string | null
    link: CMSLinkField
  }>
}

export interface SiteSetting {
  contactEmail?: string
  contactPhone?: string
  siteTitle: string
  socialLinks?: {
    substack?: string
    [key: string]: string | undefined
  }
  whatsappNumber?: string
}

export interface Redirect {
  createdAt?: string
  from: string
  id: AppID
  to?: {
    reference?: {
      relationTo: 'pages'
      value: AppID | Page
    } | null
    type?: 'custom' | 'reference' | null
    url?: string | null
  }
  updatedAt?: string
}

export interface Product {
  category: 'boilerplate' | 'checklist' | 'ebook' | 'guide' | 'tool'
  createdAt?: string
  currency?: string | null
  description: string
  dodoProductId: string
  featured?: boolean | null
  generateSlug?: boolean | null
  id: AppID
  priceCents?: number | null
  slug: string
  thumbnail?: Media | null
  title: string
  type: 'free' | 'paid'
  updatedAt?: string
}

export interface Testimonial {
  clientName: string
  clientRole?: string | null
  content: string
  id: AppID
  rating?: number | null
  updatedAt?: string
}

export interface Lead {
  budgetRange?: string | null
  company?: string | null
  createdAt?: string
  email: string
  id: AppID
  message?: string | null
  metadata?: Record<string, unknown> | null
  name?: string | null
  phone?: string | null
  projectType?: string | null
  source: 'calculator' | 'contact'
  status?: 'closed' | 'contacted' | 'new' | 'qualified' | null
  updatedAt?: string
}

export interface Order {
  amount?: number | null
  createdAt?: string
  currency?: string | null
  customerEmail: string
  dodoPaymentId: string
  dodoSubscriptionId?: string | null
  id: AppID
  metadata?: Record<string, unknown> | null
  productId?: string | null
  productName?: string | null
  status: 'cancelled' | 'failed' | 'refunded' | 'succeeded'
  updatedAt?: string
}

export interface Config {
  collections: {
    faqs: unknown
    leads: Lead
    media: Media
    orders: Order
    pages: Page
    products: Product
    projects: unknown
    redirects: Redirect
    services: unknown
    testimonials: Testimonial
  }
  db: {
    defaultIDType: number
  }
  globals: {
    footer: Footer
    header: Header
    'site-settings': SiteSetting
  }
}
