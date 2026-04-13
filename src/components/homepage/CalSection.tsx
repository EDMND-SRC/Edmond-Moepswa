'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Skeleton } from '@/components/ui/skeleton'
import { CAL_USERNAME, CAL_NAMESPACE } from '@/lib/constants'
import { toast } from 'sonner'

/**
 * Sends the Cal.com booking webhook with retry logic (up to 3 attempts with exponential backoff).
 * Returns true if the webhook was sent successfully, false otherwise.
 */
async function sendBookingWebhookWithRetry(data: unknown, maxRetries = 3): Promise<boolean> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/cal-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        return true
      }

      const errorBody = await response.text().catch(() => 'Unknown error')
      console.warn(
        `[CalSection] Webhook attempt ${attempt + 1}/${maxRetries + 1} failed: ${response.status} - ${errorBody}`,
      )
    } catch (error) {
      console.warn(`[CalSection] Webhook attempt ${attempt + 1}/${maxRetries + 1} failed:`, error)
    }

    // Don't wait after the last attempt
    if (attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 1000 // 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  return false
}

export default function CalSection() {
  const [isCalLoaded, setIsCalLoaded] = useState(false)

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', {
        styles: { branding: { brandColor: '#FF4D2E' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
        hideBranding: true,
        // hideBranding is a valid Cal.com option not yet reflected in types
      } as Record<string, unknown>)

      cal('on', {
        action: 'bookingSuccessful',
        callback: async (e: any) => {
          const success = await sendBookingWebhookWithRetry(e.detail)

          if (!success) {
            if (process.env.NODE_ENV === 'development') {
              console.error(
                '[CalSection] Booking webhook failed after all retry attempts. Booking data:',
                JSON.stringify(e.detail, null, 2),
              )
            }
            toast.error(
              'Booking confirmation failed to sync. Your booking was successful, but our team may not have been notified yet. Please contact us directly to confirm.',
              { duration: 8000 },
            )
          }
        },
      })

      // Mark as loaded after Cal.com API is initialized
      setIsCalLoaded(true)
    })()
  }, [])

  return (
    <section
      id="contact"
      className="bg-[#0a0a0a] text-white py-24 md:py-40 border-t border-white/10"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
          // Book a Free Discovery Call
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6">
            Let&apos;s discuss your project
          </h2>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl mx-auto">
            Book a free 30-minute discovery call to discuss your goals, challenges, and how I can
            help you build something that lasts. No commitment — just an honest conversation.
          </p>
          <p className="text-[#888888] text-sm md:text-base max-w-xl mx-auto mt-4">
            We&apos;ll discuss your project, goals, and constraints. No pitch — just a genuine
            conversation to understand what you need. If we&apos;re a fit, I&apos;ll send a proposal
            within 48 hours.
          </p>
        </div>
        <div className="bg-[#111111] rounded-3xl p-4 md:p-8 border border-white/10 relative overflow-hidden min-h-[600px]">
          {/* Skeleton Loading State */}
          {!isCalLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-4 md:p-8 space-y-6"
            >
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-2/3" />
              <div className="grid grid-cols-7 gap-2 pt-8">
                {Array.from({ length: 35 }).map((_, i) => (
                  <Skeleton key={`cal-day-${i}`} className="h-16 w-full" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Cal.com Embed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isCalLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={isCalLoaded ? 'relative' : 'absolute inset-0 pointer-events-none'}
          >
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={`${CAL_USERNAME}/${CAL_NAMESPACE}`}
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{
                layout: 'month_view',
                useSlotsViewOnSmallScreen: 'true',
                notes:
                  "Hi Edmond! I'd like to discuss [Website Redesign / New Web App / Branding]. My estimated budget is [Budget] and I'm hoping to launch by [Date].",
                phone: '+267',
              }}
            />
          </motion.div>

          {/* Cover Cal.com branding strip */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#111111] z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

CalSection.displayName = 'CalSection'
