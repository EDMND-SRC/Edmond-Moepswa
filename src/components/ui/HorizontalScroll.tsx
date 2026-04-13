'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // NOTE: First render uses default range -- visual jump expected when ResizeObserver calculates actual range
  const [scrollRange, setScrollRange] = useState(['0%', '-50%'])

  // Dynamically calculate scroll range based on content width
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const updateScrollRange = () => {
      const containerWidth = containerRef.current!.offsetWidth
      const contentWidth = contentRef.current!.scrollWidth
      if (containerWidth > 0 && contentWidth > containerWidth) {
        const overflow = contentWidth - containerWidth
        const percentage = -(overflow / containerWidth) * 100
        setScrollRange(['0%', `${Math.min(percentage, -100)}%`])
      }
    }

    updateScrollRange()

    const observer = new ResizeObserver(updateScrollRange)
    observer.observe(containerRef.current)
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const x = useTransform(scrollYProgress, [0, 1], scrollRange)

  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={contentRef}
          style={{ x }}
          className={`flex gap-6 items-center h-full px-6 md:px-10 ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
