'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import MobileNav from '@/components/ui/MobileNav'
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
} from '@/lib/constants'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/resources', label: 'Resources' },
]

export default function HeroSection() {
  const reducedMotion = useReducedMotion()
  const [portraitError, setPortraitError] = useState(false)
  const portraitSrc = '/edmond-portrait-hero.webp'

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#e5e5e5] p-6 text-[#1a1a1a] md:p-10">
      {/* Background Portrait */}
      <div className="absolute inset-0 z-0">
        {!portraitError && (
          <Image
            src={portraitSrc}
            alt="Edmond Moepswa Portrait"
            className="pointer-events-none object-cover"
            fill
            priority
            sizes="100vw"
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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-3 py-2 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-[#FF4D2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-4"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact#booking-panel"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-6 md:py-3 md:text-base"
          >
            <Calendar className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
            Book Call
          </Link>
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
          <p className="mt-3 ml-auto max-w-md text-base font-medium leading-relaxed text-[#1a1a1a] md:mt-4 md:max-w-lg md:text-lg lg:text-xl">
            Web design, development &amp; workflow automation — built for handover.
          </p>
        </div>
      </div>
    </div>
  )
}

HeroSection.displayName = 'HeroSection'
