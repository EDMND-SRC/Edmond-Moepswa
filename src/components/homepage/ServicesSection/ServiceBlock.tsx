'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { convertBWP, getCurrencySymbol } from '@/lib/currency'
import Link from 'next/link'
import type { Service, PricingTier } from './data'
import ServiceNumber from './ServiceNumber'

interface ServiceBlockProps {
  service: Service
  currency: string
  rates: Record<string, number>
  showPricing?: boolean
}

export default function ServiceBlock({
  service,
  currency,
  rates,
  showPricing = true,
}: ServiceBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Close expanded service details on Escape key
  useEffect(() => {
    if (!isExpanded) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  // Subtle parallax for the text content
  const y = useTransform(scrollYProgress, [0, 1], [10, -10])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Parse BWP numeric from price string and convert
  const convertPrice = useCallback(
    (priceStr: string): { display: string; isCustom: boolean } => {
      const lower = priceStr.toLowerCase()
      if (lower.includes('custom')) {
        return { display: 'Custom quote', isCustom: true }
      }
      if (lower === 'free') {
        return { display: 'Free', isCustom: false }
      }

      // Handle range prices like "P1,500 - P3,000" or "P1,500 - P3,000"
      const rangeMatch = priceStr.match(/([Pp]?\s*[\d,]+)\s*[–-]\s*([Pp]?\s*[\d,]+)/)
      if (rangeMatch) {
        const num1 = parseInt(rangeMatch[1].replace(/[^0-9]/g, ''), 10)
        const num2 = parseInt(rangeMatch[2].replace(/[^0-9]/g, ''), 10)
        if (isNaN(num1) || isNaN(num2)) return { display: priceStr, isCustom: false }

        if (currency === 'BWP') {
          return { display: priceStr, isCustom: false }
        }

        const rate = rates[currency] || 1
        const symbol = getCurrencySymbol(currency)
        const converted1 = convertBWP(num1, rate)
        const converted2 = convertBWP(num2, rate)
        const prefix = priceStr.match(/^[^Pp0-9]*/)?.[0] ?? ''
        const suffix = priceStr.match(/[^0-9\s]*$/)?.[0] ?? ''
        const formatted = `${prefix}${symbol}${converted1.toLocaleString()} – ${symbol}${converted2.toLocaleString()}${suffix}`
        return { display: formatted, isCustom: false }
      }

      // Extract numeric value from strings like "P5,000", "From P2,500", "P2,500/month"
      const numericMatch = priceStr.match(/[\d,]+/)
      if (!numericMatch) return { display: priceStr, isCustom: false }

      const bwpValue = parseInt(numericMatch[0].replace(/,/g, ''), 10)
      if (isNaN(bwpValue)) return { display: priceStr, isCustom: false }

      if (currency === 'BWP') {
        return { display: priceStr, isCustom: false }
      }

      const rate = rates[currency] || 1
      const converted = convertBWP(bwpValue, rate)
      const symbol = getCurrencySymbol(currency)

      // Preserve "From"/"from" prefix and "/month" suffix
      const prefixMatch = priceStr.match(/^([^Pp0-9]*)/)
      const prefix = prefixMatch ? prefixMatch[1] : ''
      const suffixMatch = priceStr.match(/(\/\w+)$/)
      const suffix = suffixMatch ? suffixMatch[1] : ''
      const formatted = `${prefix}${symbol}${converted.toLocaleString()}${suffix}`
      return { display: formatted, isCustom: false }
    },
    [currency, rates],
  )

  return (
    <div
      ref={ref}
      className="grid min-h-auto grid-cols-1 items-start gap-6 py-3 md:gap-12 md:py-4 lg:grid-cols-12 lg:gap-14"
      style={{ position: 'relative' }}
    >
      <ServiceNumber id={service.id} />

      {/* Content */}
      <motion.div
        style={reducedMotion ? { opacity } : { y, opacity }}
        className="flex flex-col gap-5 pt-1 md:gap-6 md:pt-4 lg:col-span-7"
      >
        {showPricing ? (
          <>
            <div
              className="flex flex-col gap-6 cursor-pointer group"
              onClick={() => setIsExpanded(!isExpanded)}
              role="button"
              aria-expanded={isExpanded}
              aria-controls={`service-details-${service.id}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsExpanded(!isExpanded)
                }
              }}
            >
              <div className="flex items-center justify-between gap-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter group-hover:text-[#FF4D2E] transition-colors duration-300">
                  {service.title}
                </h3>
                <div className="flex items-center gap-3 bg-white/5 group-hover:bg-white/10 border border-white/10 rounded-full px-5 py-3 transition-colors duration-300 shrink-0 w-fit">
                  <span className="text-sm font-medium text-white uppercase tracking-wider">
                    {isExpanded ? 'Close' : 'View Pricing'}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center text-white shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                </div>
              </div>
              <p className="text-[#b0b0b0] text-lg md:text-xl leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-5">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter">
              {service.title}
            </h3>
            <p className="text-[#b0b0b0] text-lg md:text-xl leading-relaxed max-w-2xl">
              {service.description}
            </p>
            <Link
              href={`/services#service-${service.id}`}
              className="text-[#FF4D2E] text-sm font-medium hover:underline inline-flex items-center gap-2 mt-4"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        {showPricing && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id={`service-details-${service.id}`}
                role="region"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {/* Pricing Tiers */}
                <div className="flex flex-col gap-6 pt-4">
                  {service.pricingTiers.map((tier, tierIndex) => (
                    <div
                      key={tierIndex}
                      className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                          <h4 className="text-xl md:text-2xl font-medium text-white tracking-tight">
                            {tier.name}
                          </h4>
                          {(tier.timeline || tier.revisions) && (
                            <p className="text-[#b0b0b0] text-sm mt-1">
                              {[tier.timeline, tier.revisions].filter(Boolean).join(' | ')}
                            </p>
                          )}
                        </div>
                        <span className="text-2xl md:text-3xl font-bold text-[#FF4D2E] tracking-tight">
                          {convertPrice(tier.price).display}
                        </span>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tier.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3 text-[#b0b0b0] text-sm"
                          >
                            <svg
                              className="w-4 h-4 mt-0.5 shrink-0 text-[#FF4D2E]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {service.notes && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <ExternalLink
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#FF4D2E]"
                        aria-hidden="true"
                      />
                      <p className="text-[#b0b0b0] text-sm leading-relaxed">{service.notes}</p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href="/contact#booking-panel"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                    >
                      Book a Free Discovery Call
                    </Link>
                    <a
                      href="#calculator-section"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                    >
                      Try the Calculator
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  )
}
