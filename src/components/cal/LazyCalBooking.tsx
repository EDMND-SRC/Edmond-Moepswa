'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Calendar, ExternalLink, Mail, MessageSquare } from 'lucide-react'
import { CAL_NAMESPACE, CAL_USERNAME, EMAIL, WHATSAPP_URL } from '@/lib/constants'

const CalEmbed = dynamic(() => import('@/components/cal/CalEmbed'), {
  ssr: false,
  loading: () => (
    <div className="ed-card flex min-h-[520px] items-center justify-center border-dashed bg-[#111111]/80 p-8 text-center text-[#8a8a8a]">
      Loading booking calendar…
    </div>
  ),
})

interface LazyCalBookingProps {
  title: string
  description: string
  panelId?: string
}

export default function LazyCalBooking({
  title,
  description,
  panelId = 'booking-panel',
}: LazyCalBookingProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === `#${panelId}`) {
        setIsOpen(true)
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [panelId])

  const calHref = `https://cal.com/${CAL_USERNAME}/${CAL_NAMESPACE}`

  return (
    <div id={panelId} className="ed-card overflow-hidden bg-[#111111] p-5 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <span className="ed-eyebrow">// Booking</span>
            <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">{title}</h3>
            <p className="text-sm leading-relaxed text-[#b0b0b0] md:text-base">{description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setIsOpen(true)} className="ed-button-primary">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {isOpen ? 'Calendar loaded' : 'Load calendar'}
            </button>

            <a
              href={calHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-button-secondary"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open booking page
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D2E]" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-white">Prefer email?</p>
                <p className="text-xs leading-relaxed text-[#8a8a8a]">{EMAIL}</p>
              </div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D2E]" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-white">Prefer WhatsApp?</p>
                <p className="text-xs leading-relaxed text-[#8a8a8a]">
                  Message me directly if you want to skip the calendar.
                </p>
              </div>
            </a>
          </div>
        </div>

        {isOpen ? (
          <div className="min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f]">
            <CalEmbed />
          </div>
        ) : (
          <div className="ed-card flex min-h-[520px] flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(255,77,46,0.12),transparent_38%),#0d0d0d] p-8">
            <div className="space-y-4">
              <span className="ed-eyebrow text-[10px]">Fastest path</span>
              <h4 className="text-2xl font-medium tracking-tight text-white">
                Load the calendar only when you need it.
              </h4>
              <p className="text-sm leading-relaxed text-[#a3a3a3]">
                The schedule stays out of the critical rendering path until you ask for it, so the
                page feels faster without removing the booking experience.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">What to expect on the call</p>
              <ul className="space-y-2 text-sm leading-relaxed text-[#b0b0b0]">
                <li>• We clarify what you’re building and what success looks like.</li>
                <li>• I’ll tell you if the brief is over-scoped, under-scoped, or unclear.</li>
                <li>• If there’s a fit, the next step is a formal scope and quote.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
