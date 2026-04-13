'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import { Send, Loader2, Check } from 'lucide-react'
import confetti from 'canvas-confetti'

// ─── Types ────────────────────────────────────────────────────────────────────

type FormFields = {
  name: string
  email: string
  company: string
  projectType: string
  budgetRange: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const PROJECT_TYPES = [
  'Website Design',
  'Web Application',
  'Workflow Automation',
  'SEO/GEO',
  'Boilerplate Build',
  'Advisory/Consulting',
  'Other',
] as const

const BUDGET_RANGES = [
  'Under P5,000',
  'P5,000 - P15,000',
  'P15,000 - P30,000',
  'P30,000+',
  'Not sure yet',
] as const

const INITIAL_STATE: FormFields = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budgetRange: '',
  message: '',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeadCaptureForm() {
  const [form, setForm] = useState<FormFields>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!form.projectType) newErrors.projectType = 'Project type is required'
    if (!form.budgetRange) newErrors.budgetRange = 'Budget range is required'
    return newErrors
  }, [form])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
      // Clear error on change
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof FormFields]
        return next
      })
    },
    [],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const validationErrors = validate()

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setIsSubmitting(true)

      try {
        const response = await fetch('/api/make-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workflow: 'lead-capture',
            data: {
              ...form,
              timestamp: new Date().toISOString(),
              source: 'contact-page-form',
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit')
        }

        toast.success('Message sent! I will get back to you within 24 hours.')
        setForm(INITIAL_STATE)
        setErrors({})
        setIsSubmitted(true)
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF4D2E', '#FF4D2E', '#25D366'],
        })
      } catch {
        toast.error('Something went wrong. Please try again or reach out on WhatsApp.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [form, validate],
  )

  const inputBaseClasses =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder:text-[#666] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-name" className="text-sm text-[#b0b0b0]">
          Name <span className="text-[#FF4D2E]">*</span>
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={`${inputBaseClasses} ${errors.name ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-400 text-xs" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-email" className="text-sm text-[#b0b0b0]">
          Email <span className="text-[#FF4D2E]">*</span>
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`${inputBaseClasses} ${errors.email ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-400 text-xs" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Company */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-company" className="text-sm text-[#b0b0b0]">
          Company <span className="text-[#666] font-normal">(optional)</span>
        </label>
        <input
          id="lead-company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder="Your company name"
          className={inputBaseClasses}
          disabled={isSubmitting}
        />
      </div>

      {/* Project Type */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-project-type" className="text-sm text-[#b0b0b0]">
          Project Type <span className="text-[#FF4D2E]">*</span>
        </label>
        <div className="relative">
          <select
            id="lead-project-type"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={`${inputBaseClasses} appearance-none pr-10 cursor-pointer ${errors.projectType ? 'border-red-500' : ''}`}
            disabled={isSubmitting}
          >
            <option value="" className="bg-[#1a1a1a]">
              Select a project type
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#1a1a1a]">
                {type}
              </option>
            ))}
          </select>
          <svg
            className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.projectType && (
          <p className="text-red-400 text-xs" role="alert">
            {errors.projectType}
          </p>
        )}
      </div>

      {/* Budget Range */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-budget" className="text-sm text-[#b0b0b0]">
          Budget Range <span className="text-[#FF4D2E]">*</span>
        </label>
        <div className="relative">
          <select
            id="lead-budget"
            name="budgetRange"
            value={form.budgetRange}
            onChange={handleChange}
            className={`${inputBaseClasses} appearance-none pr-10 cursor-pointer ${errors.budgetRange ? 'border-red-500' : ''}`}
            disabled={isSubmitting}
          >
            <option value="" className="bg-[#1a1a1a]">
              Select your budget range
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range} className="bg-[#1a1a1a]">
                {range}
              </option>
            ))}
          </select>
          <svg
            className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.budgetRange && (
          <p className="text-red-400 text-xs" role="alert">
            {errors.budgetRange}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-message" className="text-sm text-[#b0b0b0]">
          Message <span className="text-[#666] font-normal">(optional)</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project, timeline, or any specific requirements..."
          rows={4}
          className={`${inputBaseClasses} resize-none`}
          disabled={isSubmitting}
        />
      </div>

      {/* Submit */}
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            layoutId="formSubmitBtn"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-green-500 text-white rounded-full font-medium min-h-[44px]"
          >
            <Check className="w-4 h-4" aria-hidden="true" />
            Message Sent!
          </motion.div>
        ) : (
          <motion.button
            layoutId="formSubmitBtn"
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                Send Message
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-green-400 text-sm text-center"
          >
            Thank you! I will review your message and get back to you within 24 hours.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
