'use client'

import { useState, useEffect, type MouseEvent } from 'react'

import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import MobileNav from '@/components/ui/MobileNav'
import MagneticButton from '@/components/ui/MagneticButton'
import ThreadsIcon from '@/components/icons/ThreadsIcon'
import SubstackIcon from '@/components/icons/SubstackIcon'
import { LinkedinIcon, InstagramIcon, TwitterIcon } from '@/components/icons/BrandIcons'

import {
  WHATSAPP_URL,
  LINKEDIN_URL,
  X_URL,
  INSTAGRAM_URL,
  THREADS_URL,
  SUBSTACK_URL,
  CAL_USERNAME,
  CAL_NAMESPACE,
} from '@/lib/constants'


interface HeroSectionProps {
  isScrolled: boolean
}

/** Extracted to call useTransform at top level — avoids Rules of Hooks violation in .map() */


export default function HeroSection({ isScrolled }: HeroSectionProps) {
  const reducedMotion = useReducedMotion()
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 })
  const [portraitError, setPortraitError] = useState(false)

  useEffect(() => {
    const handleResize = () => setCursorOffset({ x: 0, y: 0 })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { scrollY } = useScroll()
  const saturationValue = useTransform(scrollY, [0, 300], [1, 0], { clamp: true })
  const rustOpacityValue = useTransform(scrollY, [200, 600], [0, 0.35], { clamp: true })
  const filterStyle = useTransform(saturationValue, (s: number) => `saturate(${s})`)

  const portraitSrc = '/edmond-portrait-hero.webp'

  const handleHeroMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
    setCursorOffset({ x, y })
  }

  return (
    <div
      className="relative min-h-screen bg-[#e5e5e5] text-[#1a1a1a] overflow-hidden flex flex-col justify-between p-6 md:p-10"
      onMouseMove={handleHeroMouseMove}
    >
      {/* Background Portrait */}
      <div className="absolute inset-0 z-0">
        {!portraitError && (
          <img
            src={portraitSrc}
            alt="Edmond Moepswa Portrait"
            className="object-cover pointer-events-none absolute inset-0 w-full h-full"
            loading="eager"
            decoding="async"
            onError={() => setPortraitError(true)}
          />
        )}
      </div>

      {/* Scrolling Name Text */}
      <div
        className="absolute inset-0 z-10 flex items-center pointer-events-none overflow-hidden mix-blend-difference"
        aria-hidden="true"
      >
        <motion.div
          className="flex whitespace-nowrap text-white font-bold text-[15vw] tracking-tighter"
          animate={reducedMotion ? {} : { x: ['0%', '-50%'] }}
          transition={
            reducedMotion
              ? {}
              : {
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 20,
                }
          }
        >
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
          <span className="pr-16">Edmond Moepswa</span>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="relative z-50 flex justify-center w-full px-4 md:px-0">
        {/* Mobile: Hamburger Menu (centered) */}
        <div className="md:hidden flex justify-end w-full max-w-5xl">
          <MobileNav />
        </div>

        {/* Desktop: Full Nav */}
        <nav className="hidden md:flex w-full max-w-5xl items-center justify-between text-sm md:text-base font-medium text-white p-3 px-4 md:px-6 rounded-full backdrop-blur-xl bg-[#1a1a1a]/40 border border-white/10 shadow-2xl gap-1 md:gap-2">
          <MagneticButton
            as="a"
            href="/"
            className="px-3 md:px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 font-bold hover:text-[#FF4D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Home
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/about"
            className="px-3 md:px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 hover:text-[#FF4D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            About
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/services"
            className="px-3 md:px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 hover:text-[#FF4D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Services
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/contact"
            className="px-3 md:px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 hover:text-[#FF4D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Contact
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/resources"
            className="px-3 md:px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 hover:text-[#FF4D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Resources
          </MagneticButton>
          {!isScrolled && (
            <MagneticButton
              as="button"
              data-cal-namespace={CAL_NAMESPACE}
              data-cal-link={`${CAL_USERNAME}/${CAL_NAMESPACE}`}
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="px-5 py-2.5 md:px-6 md:py-3 bg-white text-black rounded-full font-medium text-sm md:text-base hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
              Book Call
            </MagneticButton>
          )}
        </nav>
      </div>

      {/* Main Content Area (Bottom aligned) */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end w-full mt-24 text-[#1a1a1a]">
        {/* Social Links */}
        <div className="flex flex-col gap-3 mb-12 md:mb-2">

          {LINKEDIN_URL && (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
              aria-label="Edmond Moepswa on LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          )}
          {INSTAGRAM_URL && (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
              aria-label="Edmond Moepswa on Instagram"
            >
              <InstagramIcon className="w-4 h-4" aria-hidden="true" />
              Instagram
            </a>
          )}
          {THREADS_URL && (
            <a
              href={THREADS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
              aria-label="Edmond Moepswa on Threads"
            >
              <ThreadsIcon className="w-4 h-4" aria-hidden="true" />
              Threads
            </a>
          )}
          {X_URL && (
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
              aria-label="Edmond Moepswa on X"
            >
              <TwitterIcon className="w-4 h-4" aria-hidden="true" />
              X
            </a>
          )}

          {SUBSTACK_URL && (
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
              aria-label="Edmond Moepswa on Substack"
            >
              <SubstackIcon className="w-4 h-4" aria-hidden="true" />
              Substack
            </a>
          )}
        </div>

        {/* Hero Text */}
        <div className="text-right relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight leading-[1.1] text-[#C63319]">
            // Systems Thinker
            <br />
            &amp; Builder
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-[#1a1a1a] mt-3 md:mt-4 max-w-md md:max-w-lg ml-auto leading-relaxed font-medium">
            Web design, development &amp; workflow automation — built for handover.
          </p>
        </div>
      </div>
    </div>
  )
}

HeroSection.displayName = 'HeroSection'
