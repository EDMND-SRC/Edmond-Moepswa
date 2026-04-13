'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'resources', label: 'Resources' },
]

export default function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveIndex(i)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (reducedMotion) return null

  return (
    <nav
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center justify-end"
          aria-label={section.label}
        >
          <span className="absolute right-8 px-2 py-1 bg-[#18181B] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {section.label}
          </span>
          <motion.div
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-3 h-3 bg-[#FF4D2E]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
            animate={i === activeIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.4 }}
          />
        </a>
      ))}
    </nav>
  )
}
