'use client'
import { useState, useEffect, useRef } from 'react'
import { Calendar, ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { toast, Toaster } from 'sonner'
import dynamic from 'next/dynamic'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import HeroSection from '@/components/homepage/HeroSection'
import IntroSection from '@/components/homepage/IntroSection'
import LogoMarquee from '@/components/ui/logo-marquee'
import ServicesSection from '@/components/homepage/ServicesSection'
import ProjectsSection from '@/components/homepage/ProjectsSection'
import TestimonialsSection from '@/components/homepage/TestimonialsSection'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import MagneticButton from '@/components/ui/MagneticButton'
import { WHATSAPP_URL, CAL_USERNAME, CAL_NAMESPACE } from '@/lib/constants'

// Below-the-fold: code-split with dynamic imports
const CalculatorSection = dynamic(() => import('@/components/homepage/CalculatorSection'), {
  ssr: false,
})
const SubstackFeed = dynamic(
  () => import('@/components/SubstackFeed').then((mod) => ({ default: mod.SubstackFeed })),
  { ssr: false },
)
const HomePageFooter = dynamic(() => import('@/components/homepage/HomePageFooter'), { ssr: false })

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

export default function App() {
  const reducedMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 100)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Footer visibility detection — hide floating buttons when footer is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )
    const el = footerRef.current
    if (el) observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  const showFloatingButtons = isScrolled && !footerInView

  return (
    <>
      <LoadingScreen />
      <main id="main-content" className="font-sans bg-[#0a0a0a]">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* 1. Hero Section */}
        <div id="hero">
          <HeroSection isScrolled={isScrolled} />
        </div>

        {/* 2. Intro Section */}
        <IntroSection />

        {/* 3. Logo Marquee — tech stack showcase */}
        <LogoMarquee />

        {/* 4. Services Section — streamlined descriptions only */}
        <ServicesSection />

        {/* 5. Projects Section — selected work (boilerplate filtered) */}
        <div id="projects" className="relative">
          <ProjectsSection />
        </div>

        {/* 6. Testimonials Section — social proof */}
        <TestimonialsSection />

        {/* 7. Calculator Section — interactive pricing */}
        <CalculatorSection />

        {/* 8. Substack Feed — latest writing */}
        <SubstackFeed />

        {/* 9. Footer */}
        <div ref={footerRef}>
          <HomePageFooter />
        </div>

        {/* Fixed floating buttons — hidden when footer is in view */}
        <AnimatePresence>
          {showFloatingButtons && (
            <>
              <motion.button
                initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-[#FF4D2E] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#FF4D2E]/20 hover:bg-[#e03a1f] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-6 h-6" />
              </motion.button>

              <motion.div
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-3 drop-shadow-2xl"
              >
                <MagneticButton
                  as="button"
                  data-cal-namespace={CAL_NAMESPACE}
                  data-cal-link={`${CAL_USERNAME}/${CAL_NAMESPACE}`}
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  className="px-6 py-4 bg-[#FF4D2E] text-white rounded-full font-medium text-base hover:bg-[#e03a1f] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D2E]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF4D2E]"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Book Call
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#20bd5a] transition-colors cursor-pointer shadow-lg shadow-[#25D366]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="w-7 h-7" aria-hidden="true" />
                </MagneticButton>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Toaster position="bottom-right" theme="dark" />
      </main>
    </>
  )
}
