'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
]

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleClose = () => setIsOpen(false)

  // Focus trap
  useEffect(() => {
    if (!isOpen || !navRef.current) return

    // Focus the close button first
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }

      if (e.key !== 'Tab') return

      const focusableElements = navRef.current!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  return (
    <div className="md:hidden relative z-50">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          className="relative w-5 h-5"
          variants={{
            open: { rotate: 45 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Top line */}
          <motion.span
            className="absolute left-0 top-1/2 w-full h-0.5 bg-white rounded-full origin-center"
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: { y: 0, rotate: 90 },
              closed: { y: -4, rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
          />
          {/* Bottom line */}
          <motion.span
            className="absolute left-0 top-1/2 w-full h-0.5 bg-white rounded-full origin-center"
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: { y: 0, rotate: 90 },
              closed: { y: 4, rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              ref={navRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-4 left-4 right-4 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Close button inside panel */}
              <div className="flex justify-end p-4 pb-2">
                <button
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex flex-col px-4 pb-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="flex items-center min-h-[44px] px-4 py-3 text-white text-base font-medium rounded-xl hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Book Call CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.1 }}
                  className="mt-2 pt-4 border-t border-white/10"
                >
                  <Link
                    href="/contact#booking-panel"
                    onClick={handleClose}
                    className="w-full flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#FF4D2E] text-white rounded-xl font-medium text-base hover:bg-[#e03a1f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                  >
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                    Book a Free Discovery Call
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
