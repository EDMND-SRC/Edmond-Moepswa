'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { PHONE_E164 } from '@/lib/constants'
import {
  getExchangeRates,
  detectCurrencyFromCountry,
  convertBWP,
  formatCurrency,
} from '@/lib/currency'
import { getTechIcon } from '@/lib/icon-registry'
import { SERVICE_CATEGORIES } from './data'
import type { PricingTier } from './data'
import QuoteModal from './QuoteModal'
import SummaryDownload from './SummaryDownload'
import type { CalculatorSelections } from './types'
import { CurrencySelector } from '@/components/ui/CurrencySelector'
import { toast } from 'sonner'

// Tech stack associated with each service category
const SERVICE_TECH_STACK: Record<string, string[]> = {
  'web-design': ['Next.js', 'React', 'Tailwind CSS', 'Cloudflare Workers', 'PostHog'],
  'web-apps': ['Next.js', 'React', 'PostgreSQL', 'Cloudflare Workers', 'Dodo Payments'],
  automation: ['Make.com', 'n8n', 'Node.js'],
  seo: ['Google Search Console', 'Google Analytics 4', 'Cloudflare'],
  advisory: ['Notion', 'Figma'],
  retainers: ['Cloudflare', 'PostHog', 'Google Analytics 4'],
}

// Exchange rates are considered fresh for 1 hour
const RATES_FRESHNESS_MS = 60 * 60 * 1000

const STATIC_DISCOUNT_BWP = 500

type DeliveryOption = 'standard' | 'priority' | 'rush' | 'phased'

const DELIVERY_OPTIONS: { value: DeliveryOption; label: string; surcharge: string }[] = [
  { value: 'standard', label: 'Standard', surcharge: 'No surcharge' },
  { value: 'priority', label: 'Priority', surcharge: '+20%' },
  { value: 'rush', label: 'Rush', surcharge: '+35%' },
  { value: 'phased', label: 'Phased', surcharge: 'No surcharge' },
]

const DELIVERY_MULTIPLIER: Record<DeliveryOption, number> = {
  standard: 0,
  priority: 0.2,
  rush: 0.35,
  phased: 0,
}

export default function CalculatorSection() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldInitRates, setShouldInitRates] = useState(false)

  // Core selection state
  const [selectedService, setSelectedService] = useState<string>('web-design')
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('standard')
  const [staticDiscount, setStaticDiscount] = useState(false)

  // Currency state
  const [selectedCurrency, setSelectedCurrency] = useState<string>('BWP')
  const [rates, setRates] = useState<Record<string, number>>({ BWP: 1 })
  const [ratesFetchedAt, setRatesFetchedAt] = useState<number>(0)
  const [ratesError, setRatesError] = useState<string | null>(null)

  // Modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showSummaryDownload, setShowSummaryDownload] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || shouldInitRates) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldInitRates(true)
          observer.disconnect()
        }
      },
      { rootMargin: '280px 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [shouldInitRates])

  // Fetch exchange rates only once the calculator is close to view
  useEffect(() => {
    if (!shouldInitRates) return

    async function init() {
      let fetchedRates: Record<string, number> = { BWP: 1 }
      try {
        fetchedRates = await getExchangeRates()
        setRates(fetchedRates)
        setRatesFetchedAt(Date.now())
        setRatesError(null)
      } catch {
        setRatesError('Unable to fetch exchange rates. Showing BWP prices.')
        setRates({ BWP: 1 })
      }

      try {
        const geoRes = await fetch('/api/geo')
        const geoData = (await geoRes.json()) as { country_code?: string | null }
        const detected = detectCurrencyFromCountry(geoData.country_code || undefined)
        if (detected !== 'BWP' && fetchedRates[detected]) {
          setSelectedCurrency(detected)
        }
      } catch {
        // Silent fallback to BWP
      }
    }
    init()
  }, [shouldInitRates])

  // Reset tier when service changes
  useEffect(() => {
    setSelectedTier(null)
    setStaticDiscount(false)
  }, [selectedService])

  const currentService = SERVICE_CATEGORIES.find((s) => s.id === selectedService)
  const selectedTierData = useMemo(() => {
    if (!currentService || !selectedTier) return null
    return currentService.tiers.find((t) => t.name === selectedTier) || null
  }, [currentService, selectedTier])

  const rate = rates[selectedCurrency]
  const ratesAreStale = rate === undefined || rate === 0
  const ratesAreOld = ratesFetchedAt > 0 && Date.now() - ratesFetchedAt > RATES_FRESHNESS_MS

  const formatPrice = useCallback(
    (priceBWP: number | null): string => {
      if (priceBWP === null) return 'Custom quote'
      if (selectedCurrency === 'BWP') {
        return `P${priceBWP.toLocaleString()}`
      }
      const effectiveRate = ratesAreStale ? 1 : rate
      const converted = convertBWP(priceBWP, effectiveRate)
      return formatCurrency(converted, selectedCurrency)
    },
    [selectedCurrency, ratesAreStale, rate],
  )

  // ─── Price Calculations ─────────────────────────────────────────────────────
  const basePrice = selectedTierData?.priceBWP ?? 0

  const subtotal = basePrice
  const deliveryMultiplier = DELIVERY_MULTIPLIER[deliveryOption]
  const deliveryCost = subtotal * deliveryMultiplier
  const staticDiscountValue = staticDiscount ? STATIC_DISCOUNT_BWP : 0
  const total = subtotal + deliveryCost - staticDiscountValue

  const formattedTotal =
    selectedCurrency === 'BWP'
      ? `P${total.toLocaleString()}`
      : formatCurrency(convertBWP(total, ratesAreStale ? 1 : rate), selectedCurrency)

  const formattedBase =
    selectedCurrency === 'BWP'
      ? `P${basePrice.toLocaleString()}`
      : formatCurrency(convertBWP(basePrice, ratesAreStale ? 1 : rate), selectedCurrency)
  const formattedDeliveryCost =
    selectedCurrency === 'BWP'
      ? `P${deliveryCost.toLocaleString()}`
      : formatCurrency(convertBWP(deliveryCost, ratesAreStale ? 1 : rate), selectedCurrency)
  const formattedStaticDiscount =
    selectedCurrency === 'BWP'
      ? `P${staticDiscountValue.toLocaleString()}`
      : formatCurrency(convertBWP(staticDiscountValue, ratesAreStale ? 1 : rate), selectedCurrency)

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleWhatsAppShare = () => {
    const message = `Hi Edmond, I've configured a project estimate on your site:

Service: ${currentService?.label ?? 'Not selected'}
Tier: ${selectedTierData?.name ?? 'Not selected'} (${formattedBase})
Delivery: ${DELIVERY_OPTIONS.find((d) => d.value === deliveryOption)?.label ?? 'Standard'}${staticDiscount ? `\nSimplified-site discount: -${formattedStaticDiscount}` : ''}
Estimated Total: ${formattedTotal}

I'd like to discuss this. Are you available for a discovery call?`

    window.open(`https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`, '_blank')
    toast.success('Opening WhatsApp...')
  }

  // Build selections object for modals
  const selections = useMemo<CalculatorSelections>(() => {
    return {
      service: selectedService,
      serviceLabel: currentService?.label ?? '',
      tier: selectedTier ?? '',
      tierLabel: selectedTierData?.name ?? '',
      tierPriceBWP: basePrice,
      deliveryCostBWP: deliveryCost,
      formattedDeliveryCost,
      delivery: deliveryOption,
      deliveryLabel: DELIVERY_OPTIONS.find((d) => d.value === deliveryOption)?.label ?? '',
      deliveryMultiplier,
      staticDiscount,
      staticDiscountBWP: staticDiscountValue,
      formattedStaticDiscount,
      estimatedTotalBWP: total,
      formattedTotal,
      formattedBase,
      currency: selectedCurrency,
    }
  }, [
    selectedService,
    currentService,
    selectedTier,
    selectedTierData,
    basePrice,
    deliveryOption,
    deliveryCost,
    formattedDeliveryCost,
    deliveryMultiplier,
    staticDiscount,
    staticDiscountValue,
    formattedStaticDiscount,
    total,
    formattedTotal,
    formattedBase,
    selectedCurrency,
  ])

  const techStack = SERVICE_TECH_STACK[selectedService] ?? []

  if (
    process.env.NODE_ENV === 'development' &&
    selectedService &&
    !SERVICE_TECH_STACK[selectedService]
  ) {
    console.warn(
      `[CalculatorSection] No tech stack defined for service category "${selectedService}". ` +
        'Add an entry to SERVICE_TECH_STACK to show relevant technology badges.',
    )
  }

  return (
    <section
      id="calculator-section"
      ref={sectionRef}
      className="bg-[#0a0a0a] border-t border-white/10 py-16 md:py-28 px-4 md:px-16 w-full"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section Label */}
        <div className="mb-12 md:mb-20">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Service Pricing Calculator
          </span>
        </div>

        {/* Currency Selector */}
        <div className="mb-8">
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
            rates={rates}
          />
        </div>

        {/* Exchange rate status indicators */}
        {(ratesError || ratesAreOld) && (
          <div className="mb-6 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-400 text-xs">
            {ratesError || (
              <>Exchange rates may be stale. Prices shown use the last fetched rates.</>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. Service Type Radio Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <label
                  key={cat.id}
                  className={`relative flex items-center justify-center px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 min-h-[44px] text-sm font-medium ${
                    selectedService === cat.id
                      ? 'border-[#FF4D2E] bg-[#FF4D2E]/10 text-[#FF4D2E]'
                      : 'border-white/10 bg-white/[0.02] text-[#b0b0b0] hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <input
                    type="radio"
                    name="service-category"
                    className="sr-only"
                    checked={selectedService === cat.id}
                    onChange={() => setSelectedService(cat.id)}
                  />
                  <span className="text-center">{cat.label}</span>
                </label>
              ))}
            </div>

            {/* 2. Tier Selector */}
            <AnimatePresence mode="wait">
              {currentService && (
                <motion.div
                  key={`tiers-${currentService.id}`}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {currentService.tiers.map((tier: PricingTier, i: number) => {
                    const isSelected = selectedTier === tier.name

                    return (
                      <button
                        key={`${currentService.id}-${tier.name}-${i}`}
                        type="button"
                        onClick={() => setSelectedTier(tier.name)}
                        className={`flex flex-col text-left border rounded-2xl p-6 transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] ${
                          isSelected
                            ? 'border-[#FF4D2E] bg-[#FF4D2E]/5 ring-1 ring-[#FF4D2E]/30'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <h4 className="text-lg font-medium text-white tracking-tight mb-1">
                          {tier.name}
                        </h4>
                        {tier.timeline && (
                          <p className="text-[#b0b0b0] text-xs mb-4">{tier.timeline}</p>
                        )}
                        <div
                          className="text-2xl font-bold text-[#FF4D2E] tracking-tight mb-4 min-h-[2.5rem] flex items-end"
                          aria-live="polite"
                        >
                          {tier.priceBWP !== null ? (
                            <span className={ratesAreStale ? "text-lg text-[#b0b0b0]" : ""}>
                              {formatPrice(tier.priceBWP)}
                            </span>
                          ) : (
                            <span className="text-lg text-[#b0b0b0]">Custom quote</span>
                          )}
                        </div>
                        <ul className="flex flex-col gap-2 mt-auto">
                          {tier.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-[#b0b0b0] text-xs"
                            >
                              <svg
                                className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#FF4D2E]"
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
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. Delivery Timeline */}
            <AnimatePresence mode="wait">
              {selectedTier && (
                <motion.div
                  key={`delivery-${selectedService}`}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-base font-medium text-white tracking-tight">
                    Delivery timeline
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {DELIVERY_OPTIONS.map((opt) => {
                      const isActive = deliveryOption === opt.value
                      return (
                        <label
                          key={opt.value}
                          className={`relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 min-h-[44px] ${
                            isActive
                              ? 'border-[#FF4D2E] bg-[#FF4D2E]/10 text-[#FF4D2E]'
                              : 'border-white/10 bg-white/[0.02] text-[#b0b0b0] hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <input
                            type="radio"
                            name="delivery-option"
                            className="sr-only"
                            checked={isActive}
                            onChange={() => setDeliveryOption(opt.value)}
                          />
                          <span className="text-sm font-medium text-center">{opt.label}</span>
                          <span className="text-xs text-center opacity-70">{opt.surcharge}</span>
                        </label>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 5. Static Mode Discount */}
            <AnimatePresence mode="wait">
              {selectedTier && (
                <motion.div
                  key={`discount-${selectedService}`}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3 }}
                >
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={staticDiscount}
                      onChange={(e) => setStaticDiscount(e.target.checked)}
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                        staticDiscount
                          ? 'bg-green-500 border-green-500'
                          : 'border-white/20 bg-white/5'
                      }`}
                      aria-hidden="true"
                    >
                      {staticDiscount && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-green-400">
                      I prefer a static, zero-motion website — <strong>P500 reduction</strong>
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN — Sticky Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
              {/* Tech Stack */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <h4 className="text-sm font-medium text-[#b0b0b0] mb-3">
                  Built with modern technologies
                </h4>
                {techStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => {
                      const Icon = getTechIcon(tech)
                      return (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-white"
                        >
                          {Icon && (
                            <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden="true" />
                          )}
                          {tech}
                        </span>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-[#b0b0b0] text-xs">Technology details available on request.</p>
                )}
              </div>

              <h3 className="text-xl font-medium text-white tracking-tight mb-4">
                Your Service Package
              </h3>

              {/* Live Summary */}
              <div className="flex flex-col gap-3 mb-6">
                {/* Base service + tier */}
                {selectedTierData ? (
                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <span className="text-white font-medium">{currentService?.label}</span>
                      <span className="text-[#b0b0b0] block text-xs">{selectedTierData.name}</span>
                    </div>
                    <span className="text-white tabular-nums">
                      {selectedTierData.priceBWP !== null
                        ? formatPrice(selectedTierData.priceBWP)
                        : 'Custom'}
                    </span>
                  </div>
                ) : (
                  <p className="text-[#b0b0b0] text-xs">Select a service and tier above.</p>
                )}

                {/* Delivery */}
                {selectedTier && (
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                    <span className="text-[#b0b0b0]">
                      Delivery: {DELIVERY_OPTIONS.find((d) => d.value === deliveryOption)?.label}
                    </span>
                    <span className="text-white tabular-nums">
                      {deliveryCost > 0 ? formatPrice(deliveryCost) : 'Included'}
                    </span>
                  </div>
                )}

                {/* Static discount */}
                {staticDiscount && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-green-400">Static website discount</span>
                    <span className="text-green-400 tabular-nums">
                      −{formatPrice(STATIC_DISCOUNT_BWP)}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                  <span className="text-[#b0b0b0] text-sm">Estimated Total</span>
                  <span className="text-2xl font-bold text-[#FF4D2E] tracking-tight tabular-nums">
                    {selectedTierData ? formattedTotal : '—'}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/contact#booking-panel"
                  className="w-full py-3.5 px-6 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] inline-flex items-center justify-center"
                >
                  Book a Free Discovery Call
                </Link>
                <button
                  onClick={() => {
                    if (!selectedTier) {
                      toast.error('Please select a service tier first.')
                      return
                    }
                    setShowQuoteModal(true)
                  }}
                  className="w-full py-3.5 px-6 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors min-h-[44px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                >
                  Request Formal Quote
                </button>
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full py-3.5 px-6 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors min-h-[44px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                >
                  Send via WhatsApp
                </button>
                <button
                  onClick={() => {
                    if (!selectedTier) {
                      toast.error('Please select a service tier first.')
                      return
                    }
                    setShowSummaryDownload(true)
                  }}
                  className="w-full py-3.5 px-6 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors min-h-[44px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                >
                  Download Summary
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[#b0b0b0] text-xs leading-relaxed">
                  <strong className="text-white">Prefer email?</strong>
                  <br />
                  <a
                    href="mailto:edmond.moepswa@gmail.com"
                    className="text-[#FF4D2E] hover:underline"
                  >
                    edmond.moepswa@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        selections={selections}
      />

      {/* Summary Download Modal */}
      <SummaryDownload
        isOpen={showSummaryDownload}
        onClose={() => setShowSummaryDownload(false)}
        selections={selections}
      />
    </section>
  )
}

CalculatorSection.displayName = 'CalculatorSection'
