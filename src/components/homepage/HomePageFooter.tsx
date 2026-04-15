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

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6-.024 12.18 0h.014c2.711.02 5.01.746 6.853 2.153 1.717 1.31 2.855 3.186 3.365 5.575.512 2.4-.058 4.875-.255 5.649-.574 2.256-2.238 3.525-2.772 3.888a13.04 13.04 0 0 1-1.328 2.354c.935-.12 1.871-.502 2.575-1.143.94-.854 1.344-2.172 1.2-3.919-.13-1.588-.94-2.865-2.348-3.719-1.292-.785-2.87-1.157-4.574-1.083-1.867.082-3.466.693-4.745 1.815-1.465 1.287-2.232 3.1-2.282 5.401-.05 2.308.7 4.246 2.232 5.763 1.46 1.446 3.42 2.18 5.833 2.18.786 0 1.552-.07 2.283-.211a11.01 11.01 0 0 0 1.815-.559v.001c-.783 1.575-2.194 2.712-4.217 3.394-1.456.49-3.028.737-4.673.737Zm.014-12.91c1.15-.037 2.195.196 3.108.693.852.465 1.345 1.098 1.468 1.885.096.608-.03 1.176-.373 1.688-.31.464-.79.843-1.43 1.128-.655.292-1.407.438-2.237.438-.818 0-1.557-.146-2.202-.435-.648-.29-1.13-.685-1.436-1.17-.34-.54-.495-1.138-.46-1.778.035-.636.238-1.197.602-1.668.37-.478.875-.84 1.503-1.075a5.02 5.02 0 0 1 1.457-.306Z" />
  </svg>
)

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
              {
                href: LINKEDIN_URL,
                icon: (p: { className?: string }) => (
                  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                label: 'LinkedIn',
              },
              {
                href: GITHUB_URL,
                icon: (p: { className?: string }) => (
                  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                ),
                label: 'GitHub',
              },
              { href: X_URL, icon: XIcon, label: 'X' },
              {
                href: INSTAGRAM_URL,
                icon: (p: { className?: string }) => (
                  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                ),
                label: 'Instagram',
              },
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
