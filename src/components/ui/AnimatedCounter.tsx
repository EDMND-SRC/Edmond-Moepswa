'use client'

import { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reducedMotion) {
      setCount(target)
      return
    }

    // Use IntersectionObserver to trigger animation when in view
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry.isIntersecting) return

        const duration = 2000
        const startTime = Date.now()
        let animFrame = 0
        let mounted = true

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * target))

          if (progress < 1 && mounted) {
            animFrame = requestAnimationFrame(animate)
          }
        }

        animFrame = requestAnimationFrame(animate)
        observer.disconnect()

        return () => {
          mounted = false
          cancelAnimationFrame(animFrame)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [target, reducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
