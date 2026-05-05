'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { X, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency, convertBWP } from '@/lib/currency'
import type { CalculatorSelections } from './types'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  selections: CalculatorSelections
}

const SCOPE_OPTIONS = [
  {
    id: 'existing-redesign',
    label: 'I have an existing site that needs a redesign / refresh',
    value: 'existing-redesign',
  },
  {
    id: 'starting-from-scratch',
    label: "I'm starting from scratch — no site yet",
    value: 'starting-from-scratch',
  },
  {
    id: 'urgent-timeline',
    label: 'I need this urgently (within 2 weeks)',
    value: 'urgent-timeline',
  },
  { id: 'flexible-timeline', label: 'I have a flexible timeline', value: 'flexible-timeline' },
  {
    id: 'fixed-budget',
    label: 'I have a fixed budget I need to work within',
    value: 'fixed-budget',
  },
  {
    id: 'comparing-providers',
    label: "I'm comparing multiple providers",
    value: 'comparing-providers',
  },
  { id: 'ongoing-support', label: 'I need ongoing support after launch', value: 'ongoing-support' },
  { id: 'content-help', label: 'I need help with content (copy, photos)', value: 'content-help' },
  {
    id: 'system-integrations',
    label: 'I need my site to integrate with existing systems (CRM, POS, etc.)',
    value: 'system-integrations',
  },
  { id: 'multilingual', label: 'I need multi-language support', value: 'multilingual' },
  {
    id: 'ecommerce-payments',
    label: 'I need e-commerce / payment processing',
    value: 'ecommerce-payments',
  },
]

export default function QuoteModal({ isOpen, onClose, selections }: QuoteModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [scopeTags, setScopeTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isOpen, onClose])

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('')
      setEmail('')
      setPhone('')
      setNotes('')
      setScopeTags([])
      setError('')
      setIsSubmitting(false)
    }
  }, [isOpen])

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    if (e.key === 'Escape') onClose()
  }

  const toggleScopeTag = (value: string) => {
    setScopeTags((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Name is required')
      return
    }
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }
    if (selections.estimatedTotalBWP < 2000) {
      setError('For projects under P2,000, a discovery call is the fastest way to get started.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/make-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow: 'calculator-quote',
          data: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            scopeTags,
            notes: notes.trim(),
            service: selections.service,
            tier: selections.tier,
            tierPriceBWP: selections.tierPriceBWP,
            addons: selections.addons,
            addonsSubtotalBWP: selections.addonsSubtotalBWP,
            delivery: selections.delivery,
            deliveryMultiplier: selections.deliveryMultiplier,
            staticDiscount: selections.staticDiscount,
            staticDiscountBWP: selections.staticDiscountBWP,
            estimatedTotalBWP: selections.estimatedTotalBWP,
            currency: selections.currency,
            timestamp: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      toast.success('Quote request sent! I will be in touch within 24 hours.')
      onClose()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format currency for summary display
  const formatCurrencyValue = (bwp: number) => {
    if (selections.currency === 'BWP') return `P${bwp.toLocaleString()}`
    return formatCurrency(convertBWP(bwp, 1), selections.currency)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 md:pt-16 overflow-y-auto"
        onClick={onClose}
        onKeyDown={handleKeyDown}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={
            reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }
          }
          animate={reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] mb-8"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#b0b0b0] hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <h3 id="quote-modal-title" className="text-xl font-medium text-white tracking-tight mb-6">
            Request Formal Quote
          </h3>

          {/* 1. Service Package Summary (read-only card) */}
          <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="text-sm font-medium text-[#b0b0b0] mb-2">Service Package Summary</h4>
            <div className="flex justify-between items-start text-sm mb-2">
              <div>
                <span className="text-white font-medium">{selections.serviceLabel}</span>
                <span className="text-[#b0b0b0] block text-xs">{selections.tierLabel}</span>
              </div>
              <span className="text-white tabular-nums">
                {formatCurrencyValue(selections.tierPriceBWP)}
              </span>
            </div>

            {selections.addons.length > 0 && (
              <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
                {selections.addons.map((addon) => (
                  <div key={addon.id} className="flex justify-between items-center text-xs">
                    <span className="text-[#b0b0b0]">
                      {addon.name}
                      {addon.qty > 1 ? ` × ${addon.qty}` : ''}
                    </span>
                    <span className="text-white tabular-nums">
                      {formatCurrencyValue(addon.priceBWP * addon.qty)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {selections.deliveryMultiplier > 0 && (
              <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5 mt-1">
                <span className="text-[#b0b0b0]">Delivery: {selections.deliveryLabel}</span>
                <span className="text-white tabular-nums">
                  {formatCurrencyValue(selections.deliveryCostBWP)}
                </span>
              </div>
            )}

            {selections.staticDiscount && (
              <div className="flex justify-between items-center text-xs mt-1">
                <span className="text-green-400">Static website discount</span>
                <span className="text-green-400 tabular-nums">
                  −{formatCurrencyValue(selections.staticDiscountBWP)}
                </span>
              </div>
            )}

            <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-end">
              <span className="text-[#b0b0b0] text-sm">Estimated Total</span>
              <span className="text-lg font-bold text-[#FF4D2E] tabular-nums">
                {selections.formattedTotal}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {/* 2. Project Scope Options */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-white">Project Scope</h4>
              <p className="text-[#b0b0b0] text-xs mb-1">Select any that apply:</p>
              <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {SCOPE_OPTIONS.map((opt) => {
                  const checked = scopeTags.includes(opt.value)
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        checked ? 'bg-[#FF4D2E]/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleScopeTag(opt.value)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                          checked ? 'bg-[#FF4D2E] border-[#FF4D2E]' : 'border-white/20 bg-white/5'
                        }`}
                        aria-hidden="true"
                      >
                        {checked && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="text-xs text-white">{opt.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* 3. Your Notes */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-notes" className="text-sm text-[#b0b0b0]">
                Your Notes <span className="text-[#666]">(optional)</span>
              </label>
              <textarea
                id="quote-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell me about your project, timeline, or any special requirements..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#666] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:border-transparent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              />
            </div>

            {/* 4. Your Details */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-name" className="text-sm text-[#b0b0b0]">
                  Name <span className="text-[#FF4D2E]">*</span>
                </label>
                <input
                  id="quote-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError('')
                  }}
                  placeholder="Your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder:text-[#666] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-invalid={!!error}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-email" className="text-sm text-[#b0b0b0]">
                  Email <span className="text-[#FF4D2E]">*</span>
                </label>
                <input
                  id="quote-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder:text-[#666] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-invalid={!!error}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-phone" className="text-sm text-[#b0b0b0]">
                  Phone <span className="text-[#666]">(optional)</span>
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+267 ..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder:text-[#666] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs" role="alert">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Submit Quote Request
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
