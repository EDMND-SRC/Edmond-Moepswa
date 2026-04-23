import './globals.css'
import type { Metadata } from 'next'
import SkipToContent from '@/components/ui/SkipToContent'
import PageTransition from '@/components/ui/PageTransition'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import { Suspense } from 'react'
import { PostHogPageview } from '@/lib/posthog-provider'
import '@/lib/sentry-client.config' // Initialize Sentry client-side
import {
  LINKEDIN_URL,
  INSTAGRAM_URL,
  SUBSTACK_URL,
  X_URL,
  THREADS_URL,
} from '@/lib/constants'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://edmond-moepswa.vercel.app'
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-LLR99YRCV1'

export const metadata: Metadata = {
  title: {
    default:
      'Edmond Moepswa — Web Designer · Full-Stack Developer · Workflow Automation Specialist',
    template: '%s | Edmond Moepswa',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
      {
        rel: 'icon',
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  description:
    'Edmond Moepswa — Web Designer, Full-Stack Developer & Workflow Automation Specialist in Gaborone, Botswana. Custom websites, web apps, and workflow automation built for handover. From P&L statements to production code. Free 30-minute discovery call.',
  keywords: [
    'web designer',
    'web developer',
    'workflow automation',
    'Gaborone',
    'Botswana',
    'Edmond Moepswa',
    'Next.js',
    'Payload CMS',
    'web applications',
    'SEO',
    'automation specialist',
  ],
  authors: [{ name: 'Edmond Moepswa', url: 'https://edmondmoepswa.com' }],
  creator: 'Edmond Moepswa',
  publisher: 'Edmond Moepswa',
  metadataBase: new URL(SERVER_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SERVER_URL,
    title: 'Edmond Moepswa — Systems Thinker & Builder',
    description:
      'Web design, development & workflow automation — built for handover. From P&L statements to production code.',
    siteName: 'Edmond Moepswa',
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: 'Edmond Moepswa — Web Designer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edmond Moepswa — Systems Thinker & Builder',
    description: 'Web design, development & workflow automation — built for handover.',
    creator: '@edmondmoepswa',
    images: ['/og-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SERVER_URL}/#person`,
      name: 'Edmond Moepswa',
      url: SERVER_URL,
      jobTitle: 'Web Designer, Full-Stack Developer & Workflow Automation Specialist',
      description:
        'Web design, development & workflow automation — built for handover. From P&L statements to production code.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gaborone',
        addressCountry: 'BW',
      },
      knowsLanguage: ['English', 'Setswana'],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Canberra',
      },
      sameAs: [LINKEDIN_URL, INSTAGRAM_URL, SUBSTACK_URL, X_URL, THREADS_URL].filter(
        (url): url is string => url !== '' && url !== '#',
      ),
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SERVER_URL}/#localbusiness`,
      name: 'Edmond Moepswa — Web Design & Development',
      description: 'Custom websites, web apps, and workflow automation built for handover.',
      url: SERVER_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gaborone',
        addressCountry: 'BW',
      },
      priceRange: '$$',
      knowsAbout: [
        'Web Design',
        'Web Development',
        'Workflow Automation',
        'SEO',
        'Payload CMS',
        'Next.js',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SERVER_URL}/#website`,
      url: SERVER_URL,
      name: 'Edmond Moepswa Portfolio',
      description:
        'Portfolio of Edmond Moepswa — Web Designer, Full-Stack Developer & Workflow Automation Specialist.',
      publisher: {
        '@id': `${SERVER_URL}/#person`,
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0a0a0a] text-white">
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <Suspense fallback={null}>
            <PostHogPageview />
          </Suspense>
          <SkipToContent />
          <PageTransition>
            <div id="main-content">{children}</div>
          </PageTransition>
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            strategy="afterInteractive"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
