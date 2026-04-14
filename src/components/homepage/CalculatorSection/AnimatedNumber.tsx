'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedNumberProps {
  target: number
  suffix?: string
  className?: string
}

/**
 * SingleDigit — animates one digit from 0 to its target value with a pulse.
 */
function SingleDigit({ digit, delay }: { digit: number; delay: number }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <span className="inline-block w-[0.6em] text-center tabular-nums">{digit}</span>
  }

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <motion.span
      className="inline-flex w-[0.6em] h-[1.1em] text-center tabular-nums overflow-hidden relative"
      initial={{ y: 0 }}
    >
      <motion.div
        className="flex flex-col items-center absolute top-0 w-full"
        initial={{ y: 0 }}
        animate={
          digit > 0
            ? {
                y: [0, `-${digit * 10}%`],
                scale: [1.15, 1],
                color: ['#FF4D2E', 'inherit'],
              }
            : {}
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
          scale: { duration: 0.15, delay: delay + 0.65, ease: 'easeOut' },
          color: { duration: 0.2, delay: delay + 0.6, ease: 'easeOut' },
        }}
      >
        {digits.map((d) => (
          <span key={d} className="h-[1.1em] flex items-center justify-center leading-none">
            {d}
          </span>
        ))}
      </motion.div>
    </motion.span>
  )
}

export default function AnimatedNumber({
  target,
  suffix = '',
  className = '',
}: AnimatedNumberProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
    }
  }, [isInView, hasStarted])

  const digits = useMemo(() => {
    return target.toString().split('').map(Number)
  }, [target])

  const totalDuration = 1000 // ms
  const staggerPerDigit =
    digits.length > 1 ? totalDuration / (digits.length + 2) : totalDuration / 3

  if (reducedMotion || !hasStarted) {
    return (
      <span ref={ref} className={className}>
        {hasStarted ? target.toLocaleString() : '0'}
        {suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className={`flex flex-row items-center ${className}`}>
      {digits.map((digit, i) => {
        const delay = (digits.length - 1 - i) * (staggerPerDigit / 1000)
        return <SingleDigit key={i} digit={digit} delay={delay} />
      })}
      {suffix}
    </span>
  )
}
