'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Script from 'next/script'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { WHATSAPP_URL } from '@/lib/constants'
import SkeletonPulse from '@/components/ui/SkeletonPulse'

interface FAQ {
  id: string | number
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
}

interface FAQGroup {
  category: string
  faqs: FAQ[]
}

const categoryLabels: Record<string, string> = {
  general: 'General',
  services: 'Services',
  process: 'Process',
  pricing: 'Pricing',
  technical: 'Technical',
}

const defaultFAQs: FAQ[] = [
  // General
  {
    id: 'default-1',
    question: 'What exactly do you do?',
    answer:
      'I design and build custom websites, web applications, and workflow automations for businesses and institutions. Everything is built from scratch — no templates or page builders. I also handle SEO, Google Business Profile setup, and provide ongoing support through retainer plans.',
    category: 'general',
    order: 1,
    isActive: true,
  },
  {
    id: 'default-2',
    question: 'Do you work with clients outside Botswana?',
    answer:
      "Yes. While I'm based in Gaborone, I work with clients globally. Communication happens via WhatsApp, email, or video calls. Payment for international clients can be processed through Dodo Payments, PayPal, or other international gateways.",
    category: 'general',
    order: 2,
    isActive: true,
  },
  // Services
  {
    id: 'default-3',
    question: 'Do you use templates or themes?',
    answer:
      'No. Every website and application is custom-designed and built from scratch. Your project will look unique — because it is. For clients who need something faster and more affordable, I offer boilerplate products — pre-built starter kits that are then customised to your brand.',
    category: 'services',
    order: 3,
    isActive: true,
  },
  {
    id: 'default-4',
    question: 'What if I need changes after the project is delivered?',
    answer:
      'Every project includes full documentation and a handover session so you can manage your systems independently. For ongoing changes beyond that, I offer retainer plans starting from P2,500/month. You get someone who already knows your codebase on call, with predictable monthly costs. No re-briefing, no ramp-up.',
    category: 'services',
    order: 4,
    isActive: true,
  },
  // Pricing
  {
    id: 'default-5',
    question: 'How does pricing work?',
    answer:
      'Every engagement starts with a free 30-minute discovery call. After understanding your requirements, I send a scoped proposal with transparent pricing within 48 hours. No surprises, no hidden fees. Payment terms are typically 50% deposit to begin, 50% on delivery.',
    category: 'pricing',
    order: 5,
    isActive: true,
  },
  {
    id: 'default-6',
    question: 'Do third-party platform costs count towards your fee?',
    answer:
      'No. Platform fees — for hosting, databases, CRMs, automation tools, email services, analytics, and any third-party service — are borne by the client. My default approach is to design around the best available free tier first, and to recommend a paid upgrade only when your needs genuinely require it. Where a paid tier is necessary, its cost is disclosed at scoping — not after build.',
    category: 'pricing',
    order: 6,
    isActive: true,
  },
  // Process
  {
    id: 'default-7',
    question: 'What happens on the free discovery call?',
    answer:
      "It's a genuine conversation — no pitch. We'll discuss your business, your goals, your current challenges, and what you'd like to build. If we're a fit, I'll send a detailed proposal with transparent pricing within 48 hours. If I'm not the right person for your project, I'll tell you.",
    category: 'process',
    order: 7,
    isActive: true,
  },
  {
    id: 'default-8',
    question: 'How long does a typical project take?',
    answer:
      "It depends on scope. A single-page landing page takes 5-8 business days. A multi-page CMS-powered website takes 10-22 business days. Web applications and boilerplate builds take 15-35+ business days. Timeline estimates are transparent, and the delivery clock pauses during your review periods so you're never rushed.",
    category: 'process',
    order: 8,
    isActive: true,
  },
  // Technical
  {
    id: 'default-9',
    question: 'What platforms and tools do you work with?',
    answer:
      'I build with Next.js, React, TypeScript, and Tailwind CSS. For content management, I use Payload CMS. For databases, PostgreSQL and MongoDB. For automation, Make.com, n8n, and custom API integrations. I integrate with HubSpot CRM, Resend email, Cal.com scheduling, PostHog analytics, and many other platforms. If a tool has an API, I can integrate it.',
    category: 'technical',
    order: 9,
    isActive: true,
  },
  {
    id: 'default-10',
    question: 'Can you integrate WhatsApp Business API?',
    answer:
      "Yes, as an add-on (P5,000). However, the WhatsApp Business API requires Meta Business verification — approval typically takes 1-7 business days but can be rejected for unverified business details or non-compliant use cases. Approval is at Meta's discretion and is not guaranteed. If you cannot obtain verification, the included WhatsApp click-to-chat link remains available at no cost.",
    category: 'technical',
    order: 10,
    isActive: true,
  },
  {
    id: 'default-11',
    question: 'What about payment gateway options for Botswana businesses?',
    answer:
      'Stripe is not available to Botswana-registered businesses. The primary local options are DPO PayGate (works with FNB Botswana and Stanbic Bank) and Orange Money Web Payments. For international sales, Dodo Payments (Merchant of Record) and PayPal are good options. All payment gateway integrations require you to hold an active merchant account with the provider. Approval timelines and criteria vary by bank and provider and are outside my control.',
    category: 'technical',
    order: 11,
    isActive: true,
  },
]

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/faqs', { cache: 'no-store' })
        const data = (await response.json()) as { faqs?: FAQ[] }
        setFaqs(data.faqs || [])
      } catch (error) {
        console.error('Failed to fetch FAQs:', error)
        setFaqs([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  // Use CMS FAQs if available, otherwise fall back to defaults
  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs

  // Group FAQs by category
  const categories = ['all', ...Object.keys(categoryLabels)]
  const groupedFAQs: FAQGroup[] = []

  const filteredFAQs =
    activeCategory === 'all'
      ? displayFAQs
      : displayFAQs.filter((faq) => faq.category === activeCategory)

  // Group by category for display
  const categoryMap = new Map<string, FAQ[]>()
  filteredFAQs.forEach((faq) => {
    if (!categoryMap.has(faq.category)) {
      categoryMap.set(faq.category, [])
    }
    categoryMap.get(faq.category)!.push(faq)
  })

  categoryMap.forEach((categoryFAQs, category) => {
    groupedFAQs.push({
      category,
      faqs: categoryFAQs,
    })
  })

  // Build FAQPage schema.org JSON-LD from displayFAQs
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  if (isLoading) {
    return (
      <section className="bg-[#0a0a0a] text-white py-24 md:py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="space-y-8">
            <SkeletonPulse width="w-32" height="h-4" />
            <SkeletonPulse width="w-3/4" height="h-12" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <SkeletonPulse key={`faq-sk-${i}`} height="h-16" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Always render — defaults are used when CMS returns empty
  return (
    <section id="faq" className="bg-[#0a0a0a] text-white py-24 md:py-32 border-t border-white/10">
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        strategy="afterInteractive"
      />
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
          // Frequently Asked Questions
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6">
            Got questions?
          </h2>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl mx-auto">
            Common questions about working together. If yours isn&apos;t here, just ask.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                activeCategory === category
                  ? 'bg-[#FF4D2E] text-white'
                  : 'bg-white/5 text-[#b0b0b0] hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category === 'all' ? 'All' : categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {groupedFAQs.map(({ category, faqs: categoryFAQs }) => (
            <div key={category} className="space-y-4">
              {/* Category Header (only if not "all") */}
              {activeCategory === 'all' && (
                <h3 className="text-xl font-medium text-white/60 mt-8 mb-4">
                  {categoryLabels[category] || category}
                </h3>
              )}

              {categoryFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden transition-colors hover:border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
                    aria-expanded={expandedId === faq.id}
                  >
                    <span className="text-lg md:text-xl font-medium text-white pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                      transition={
                        reducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeInOut' }
                      }
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-[#b0b0b0]" aria-hidden="true" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedId === faq.id && (
                      <motion.div
                        initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={
                          reducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }
                        }
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8">
                          <p className="text-[#b0b0b0] text-base md:text-lg leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA - Still have questions? */}
        <div className="mt-16 text-center">
          <p className="text-[#b0b0b0] text-lg mb-6">Still have questions?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20bd5a] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Chat with me on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

FAQSection.displayName = 'FAQSection'
