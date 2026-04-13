'use client'

import { motion, useScroll } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Scroll Progress Indicator (11A)
 * Thin rust-colored line at top of viewport showing scroll progress
 */
export default function ScrollProgress() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  if (reducedMotion) return null

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-[#FF4D2E] origin-left z-[9999]"
      aria-hidden="true"
    />
  )
}

ScrollProgress.displayName = 'ScrollProgress'
