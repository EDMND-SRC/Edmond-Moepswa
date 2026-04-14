'use client'

import { useState, useEffect, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import MobileNav from '@/components/ui/MobileNav'
import MagneticButton from '@/components/ui/MagneticButton'
import ThreadsIcon from '@/components/icons/ThreadsIcon'
import SubstackIcon from '@/components/icons/SubstackIcon'

// Brand icons removed from lucide-react v1 — using inline SVGs
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)
import {
  WHATSAPP_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  THREADS_URL,
  SUBSTACK_URL,
  GITHUB_URL,
  CAL_USERNAME,
  CAL_NAMESPACE,
} from '@/lib/constants'

interface HeroSectionProps {
  isScrolled: boolean
}

/** Extracted to call useTransform at top level — avoids Rules of Hooks violation in .map() */
function RippleStrip({
  index,
  scrollY,
  portraitSrc,
}: {
  index: number
  scrollY: MotionValue<number>
  portraitSrc: string
}) {
  const yOffset = useTransform(scrollY, [0, 400], [0, (index - 2) * 12])
  const clipPath = `inset(0 ${100 - (index + 1) * 20}% 0 ${index * 20}%)`
  return (
    <motion.div
      style={{ clipPath, y: yOffset }}
      className="absolute inset-0 z-[1] pointer-events-none"
    >
      <Image
        src={portraitSrc}
        fill
        className="object-cover"
        alt=""
        aria-hidden
        priority={index === 2}
        sizes="(max-width: 768px) 50vw, 20vw"
      />
    </motion.div>
  )
}

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
      <motion.div
        className="absolute inset-0 z-0"
        style={
          reducedMotion
            ? { willChange: 'auto' }
            : {
                filter: filterStyle,
                x: cursorOffset.x,
                y: cursorOffset.y,
                willChange: 'transform, filter',
              }
        }
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {!portraitError && (
          <Image
            src={portraitSrc}
            alt="Edmond Moepswa Portrait"
            fill
            className="object-cover pointer-events-none"
            priority
            loading="eager"
            sizes="100vw"
            quality={90}
            onError={() => setPortraitError(true)}
          />
        )}
        <motion.div
          style={reducedMotion ? { opacity: 0 } : { opacity: rustOpacityValue }}
          className="absolute inset-0 bg-[#FF4D2E] mix-blend-multiply pointer-events-none"
        />
        {/* Split-scroll ripple strips */}
        {!reducedMotion &&
          !portraitError &&
          [0, 1, 2, 3, 4].map((i) => (
            <RippleStrip key={i} index={i} scrollY={scrollY} portraitSrc={portraitSrc} />
          ))}
      </motion.div>

      {/* Scrolling Name Text */}
      <div
        className="absolute inset-0 z-10 flex items-center pointer-events-none overflow-hidden mix-blend-difference"
        aria-hidden="true"
      >
        <motion.div
          className="flex whitespace-nowrap text-white font-bold text-[15vw] tracking-tighter"
          style={{ textShadow: '0 0 1px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.3)' }}
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
            href="/store"
            className="px-3 md:px-4 py-2 rounded-full border border-transparent hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 hover:text-[#FF4D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Store
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
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end w-full mt-24 mix-blend-difference text-white">
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
          {GITHUB_URL && (
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
              aria-label="Edmond Moepswa on GitHub"
            >
              <GithubIcon className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>

        {/* Hero Text */}
        <div className="text-right relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight leading-[1.1]">
            // Systems Thinker
            <br />
            &amp; Builder
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/80 mt-3 md:mt-4 max-w-md md:max-w-lg ml-auto leading-relaxed">
            Web design, development &amp; workflow automation — designed to last.
          </p>
        </div>
      </div>
    </div>
  )
}

HeroSection.displayName = 'HeroSection'
