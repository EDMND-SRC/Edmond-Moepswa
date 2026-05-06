'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUp, Calendar } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import { WHATSAPP_URL } from '@/lib/constants'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

export default function HomePageChrome({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 120)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    let footerObserver: IntersectionObserver | null = null
    let domObserver: MutationObserver | null = null

    const attachFooterObserver = () => {
      const footer = document.querySelector<HTMLElement>('[data-home-footer]')

      if (!footer) {
        return false
      }

      footerObserver?.disconnect()
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          setFooterInView(entry.isIntersecting)
        },
        { rootMargin: '0px 0px -96px 0px', threshold: 0 },
      )

      footerObserver.observe(footer)
      return true
    }

    if (!attachFooterObserver()) {
      domObserver = new MutationObserver(() => {
        if (attachFooterObserver()) {
          domObserver?.disconnect()
        }
      })

      domObserver.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      footerObserver?.disconnect()
      domObserver?.disconnect()
    }
  }, [])

  const showFloatingButtons = isScrolled && !footerInView

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />

      <main id="main-content" className="font-sans bg-[#0a0a0a]">
        {children}
      </main>

      <AnimatePresence>
        {showFloatingButtons && (
          <>
            <motion.button
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              transition={{ duration: reducedMotion ? 0 : 0.18, ease: 'easeOut' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 left-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF4D2E] text-white shadow-2xl shadow-[#FF4D2E]/20 transition-colors hover:bg-[#e03a1f]"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="h-6 w-6" aria-hidden="true" />
            </motion.button>

            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: reducedMotion ? 0 : 0.18, ease: 'easeOut' }}
              className="fixed bottom-8 right-8 z-50 flex items-center gap-3 drop-shadow-2xl"
            >
              <Link
                href="/contact#booking-panel"
                data-testid="floating-book-call"
                className="ed-button-primary px-6 py-4 shadow-lg shadow-[#FF4D2E]/30"
              >
                <Calendar className="h-5 w-5" aria-hidden="true" />
                Book Call
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-7 w-7" aria-hidden="true" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
