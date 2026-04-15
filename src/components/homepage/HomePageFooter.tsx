'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  LINKEDIN_URL,
  X_URL,
  INSTAGRAM_URL,
  THREADS_URL,
  SUBSTACK_URL,
  GITHUB_URL,
} from '@/lib/constants'

import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  ThreadsIcon,
} from '@/components/icons/BrandIcons'

const SubstackIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 6H2l10.5 12L22 6zm0-2H2v2l10.5 12L22 6V4z" />
  </svg>
)

export default function HomePageFooter() {
  const reducedMotion = useReducedMotion()
  const [portraitError, setPortraitError] = useState(false)

  return (
    <footer className="relative bg-[#e5e5e5] text-[#1a1a1a]">
      {/* ── Visual Area: Portrait + Scroll Text (full screen) ── */}
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Background Portrait (Flipped horizontally) */}
        <div className="absolute inset-0">
          {portraitError ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
          ) : (
            <Image
              src="/edmond-portrait-hero.webp"
              alt="Edmond Moepswa Portrait"
              fill
              className="object-cover pointer-events-none"
              style={{ transform: 'scaleX(-1)' }}
              sizes="100vw"
              onError={() => setPortraitError(true)}
            />
          )}
        </div>

        {/* Scrolling "Reach Out" Text */}
        <Link
          href="/contact"
          className="absolute inset-0 z-10 flex items-center pointer-events-auto overflow-hidden mix-blend-difference"
        >
          <motion.div
            className="flex whitespace-nowrap text-white font-bold text-[15vw] tracking-tighter cursor-pointer"
            animate={reducedMotion ? {} : { x: ['0%', '-50%'] }}
            transition={
              reducedMotion
                ? {}
                : {
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 15,
                  }
            }
            whileHover={reducedMotion ? {} : { color: '#FF4D2E', scale: 1.05 }}
          >
            <span className="pr-16">Reach Out</span>
            <span className="pr-16">Reach Out</span>
            <span className="pr-16">Reach Out</span>
            <span className="pr-16">Reach Out</span>
            <span className="pr-16">Reach Out</span>
            <span className="pr-16">Reach Out</span>
          </motion.div>
        </Link>
      </div>

      {/* ── Bottom Bar: Everything centered ── */}
      <div className="relative bg-[#1a1a1a] text-white">
        <div className="flex flex-col items-center gap-6 py-8 md:py-10 px-4">
          {/* Nav Links */}
          <nav
            className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-white/70"
            aria-label="Footer navigation"
          >
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/services', label: 'Services' },
              { href: '/contact', label: 'Contact' },
              { href: '/resources', label: 'Resources' },
            ].map((link, i, arr) => (
              <span key={link.href} className="inline-flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded px-1 py-0.5"
                >
                  {link.label}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-white/20 mx-2 select-none" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Attribution */}
          <div className="text-center text-white/50 leading-relaxed">
            <p>Made with 🧡 in Gaborone, Botswana.</p>
            <p className="text-white/30">&copy; {new Date().getFullYear()} Edmond Moepswa.</p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-3 text-white/40 text-xs">
            <Link
              href="/privacy-policy"
              className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
            >
              Privacy
            </Link>
            <span className="text-white/20" aria-hidden="true">
              ·
            </span>
            <Link
              href="/refund-policy"
              className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
            >
              Refunds
            </Link>
            <span className="text-white/20" aria-hidden="true">
              ·
            </span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded"
            >
              Terms
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-1" aria-label="Social media links">
            {[
              { href: LINKEDIN_URL, icon: LinkedinIcon, label: 'LinkedIn' },
              { href: GITHUB_URL, icon: GithubIcon, label: 'GitHub' },
              { href: X_URL, icon: TwitterIcon, label: 'X' },
              { href: INSTAGRAM_URL, icon: InstagramIcon, label: 'Instagram' },
              { href: THREADS_URL, icon: ThreadsIcon, label: 'Threads' },
              { href: SUBSTACK_URL, icon: SubstackIcon, label: 'Substack' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href || '#'}
                target={social.href ? '_blank' : undefined}
                rel={social.href ? 'noopener noreferrer' : undefined}
                className="p-2 text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] rounded min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label={`Edmond Moepswa on ${social.label}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

HomePageFooter.displayName = 'HomePageFooter'
