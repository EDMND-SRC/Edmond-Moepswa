'use client'

import { useState } from 'react'
import React from 'react'
import { getTechIcon } from '@/lib/icon-registry'

const EXPANDED_CATEGORIES = [
  {
    title: 'Core Development',
    technologies: [
      'TypeScript',
      'Next.js',
      'React',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Three.js',
      'Cloudflare Workers',
    ],
  },
  {
    title: 'Backend & Database',
    technologies: [
      'PostgreSQL',
      'Neon (Serverless PostgreSQL)',
      'Drizzle ORM',
      'Keystatic',
      'Cloudflare R2',
    ],
  },
  {
    title: 'Automation',
    technologies: ['Make.com', 'n8n'],
  },
]

const COLLAPSED_CATEGORIES = [
  {
    title: 'Authentication',
    technologies: ['Clerk', 'Kinde', 'Auth0'],
  },
  {
    title: 'Payments',
    technologies: [
      'DPO PayGate',
      'Orange Money',
      'Dodo Payments',
      'Lemon Squeezy',
      'Paddle',
      'Gumroad',
      'Shopify',
    ],
  },
  {
    title: 'Email & Messaging',
    technologies: ['Resend', 'AWS SES', 'Customer.io'],
  },
  {
    title: 'SMS',
    technologies: ['Twilio', 'AWS SNS'],
  },
  {
    title: 'Scheduling',
    technologies: ['Cal.com'],
  },
  {
    title: 'Monitoring',
    technologies: ['Cloudflare', 'Better Stack'],
  },
  {
    title: 'Analytics & Product Intelligence',
    technologies: ['PostHog', 'Amplitude'],
  },
  {
    title: 'SEO & GEO',
    technologies: [
      'Google Search Console',
      'Google Analytics 4',
      'Google Business Profile',
      'Ahrefs Webmaster Tools',
      'schema.org',
    ],
  },
  {
    title: 'Storage & CDN',
    technologies: ['Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare R2', 'AWS S3'],
  },
  {
    title: 'Testing',
    technologies: ['Vitest', 'Playwright'],
  },
]

const collapsedSummary = `And ${COLLAPSED_CATEGORIES.length} more categories including ${COLLAPSED_CATEGORIES.map((c) => c.title).join(', ')}`

/**
 * TechCategory — memoized to avoid re-rendering when unrelated state changes.
 * Each tech pill shows an icon (if available) alongside the technology name.
 */
const MemoizedTechCategory = React.memo(function TechCategory({
  title,
  technologies,
}: {
  title: string
  technologies: string[]
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF4D2E] mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => {
          const Icon = getTechIcon(tech)
          return (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 text-sm bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white hover:border-white/20 transition-colors duration-200"
            >
              {Icon && <Icon className="w-4 h-4 shrink-0 opacity-70" aria-hidden="true" />}
              {tech}
            </span>
          )
        })}
      </div>
    </div>
  )
})
MemoizedTechCategory.displayName = 'TechCategory'

export default function TechStackSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="md:w-1/3">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-4">
              Tools & Technologies
            </h2>
          </div>
          <div className="md:w-2/3 flex flex-col gap-8">
            {EXPANDED_CATEGORIES.map((category) => (
              <MemoizedTechCategory key={category.title} {...category} />
            ))}

            {/* Collapsed section with toggle */}
            {!isExpanded && (
              <div className="flex flex-col gap-4">
                <p className="text-[#b0b0b0] text-sm">{collapsedSummary}</p>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="self-start inline-flex items-center gap-2 text-sm font-medium text-[#FF4D2E] border border-[#FF4D2E]/30 rounded-full px-5 py-2.5 hover:bg-[#FF4D2E]/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  Show all technologies
                  <svg
                    className="w-4 h-4 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {isExpanded && (
              <div>
                {COLLAPSED_CATEGORIES.map((category) => (
                  <MemoizedTechCategory key={category.title} {...category} />
                ))}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="self-start inline-flex items-center gap-2 text-sm font-medium text-[#b0b0b0] border border-white/20 rounded-full px-5 py-2.5 hover:border-white/40 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  Show less
                  <svg
                    className="w-4 h-4 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
