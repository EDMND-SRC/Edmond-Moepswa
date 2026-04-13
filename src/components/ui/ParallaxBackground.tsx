'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Parallax Background Layers (4D)
 * Subtle geometric shapes that move at different speeds on scroll
 */
interface ParallaxBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export default function ParallaxBackground({ children, className = '' }: ParallaxBackgroundProps) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -10])

  if (reducedMotion) {
    return <div className={`relative min-h-full ${className}`}>{children}</div>
  }

  return (
    <div ref={containerRef} className={`relative min-h-full ${className}`}>
      {/* Background layer 1 - Grid pattern (slowest) */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="w-full h-full opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Background layer 2 - Rust accent lines (medium) */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg className="absolute top-20 right-10 w-64 h-64" viewBox="0 0 100 100">
          <line x1="0" y1="50" x2="100" y2="50" stroke="#FF4D2E" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#FF4D2E" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Background layer 3 - Dot pattern (fastest) */}
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, #FF4D2E 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

ParallaxBackground.displayName = 'ParallaxBackground'
