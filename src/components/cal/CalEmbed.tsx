'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Skeleton } from '@/components/ui/skeleton'
import { CAL_USERNAME, CAL_NAMESPACE, EMAIL, WHATSAPP_URL } from '@/lib/constants'

/**
 * Cal.com UI configuration — mirrors UiConfig from @calcom/embed-core.
 * Imported indirectly since embed-core is a transitive dependency.
 */
interface CalUiConfig {
  hideEventTypeDetails?: boolean
  theme?: 'dark' | 'light' | 'auto' | null
  styles?: {
    body?: { background?: string }
    eventTypeListItem?: { background?: string; color?: string; backgroundColor?: string }
    enabledDateButton?: { background?: string; color?: string; backgroundColor?: string }
    disabledDateButton?: { background?: string; color?: string; backgroundColor?: string }
    availabilityDatePicker?: { background?: string; color?: string; backgroundColor?: string }
    align?: 'left'
    branding?: { brandColor?: string }
  }
  layout?: 'month_view' | 'week_view' | 'column_view'
  hideBranding?: boolean
  cssVarsPerTheme?: Record<'dark' | 'light', Record<string, string>>
  colorScheme?: string | null
}

interface CalBookingEvent {
  detail: Record<string, unknown>
}

export default function CalEmbed() {
  const [isCalLoaded, setIsCalLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let timedOut = false
    const timer = setTimeout(() => {
      if (!isCalLoaded) {
        timedOut = true
        setHasError(true)
      }
    }, 10000) // 10-second timeout

    ;(async function () {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE })
        if (timedOut) return

        cal('ui', {
          styles: { branding: { brandColor: '#FF4D2E' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
          hideBranding: true,
        } as CalUiConfig)

        cal('on', {
          action: 'bookingSuccessful',
          // NOTE: We cannot call /api/cal-webhook here because it requires CRON_SECRET auth.
          // The Cal.com client-side callback has no way to securely pass the server secret.
          // TODO: Use a Cal.com webhook configured server-side, or a dedicated unauthenticated tracking endpoint.
          callback: (_e: CalBookingEvent) => {
            console.log('[CalEmbed] Booking successful event received.')
          },
        })

        setIsCalLoaded(true)
      } catch (err) {
        if (!timedOut) {
          console.error('Cal.com embed failed:', err)
          setHasError(true)
        }
      }
    })()

    return () => {
      timedOut = true
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="relative overflow-hidden min-h-[600px]">
      {/* Error Fallback */}
      {hasError && !isCalLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <p className="text-[#b0b0b0] text-lg mb-6">Booking system temporarily unavailable</p>
          <p className="text-[#b0b0b0] text-sm mb-6">Book directly via email or WhatsApp:</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF4D2E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e0442a] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              Email: {EMAIL}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Skeleton Loading State */}
      {!isCalLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 p-4 md:p-8 space-y-6"
        >
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-2/3" />
          <div className="grid grid-cols-7 gap-2 pt-8">
            {/* 35 cells covers 5 weeks — sufficient for most months. Cal.com handles overflow. */}
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
      {/* NOTE: This overlay hides Cal.com branding. Verify this complies with your Cal.com plan terms. */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#111111] z-10 pointer-events-none" />
    </div>
  )
}
