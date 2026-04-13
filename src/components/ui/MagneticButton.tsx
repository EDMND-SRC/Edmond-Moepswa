'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Magnetic Button (6A)
 * Buttons that slightly follow your cursor when hovering nearby
 * Creates a premium, "alive" feel that increases engagement
 */
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a' | 'div'
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  'aria-label'?: string
  'data-cal-namespace'?: string
  'data-cal-link'?: string
  'data-cal-config'?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as = 'button',
  href,
  onClick,
  target,
  rel,
  'aria-label': ariaLabel,
  'data-cal-namespace': dataCalNamespace,
  'data-cal-link': dataCalLink,
  'data-cal-config': dataCalConfig,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const renderInner = () => {
    const dataAttrs = {
      'data-cal-namespace': dataCalNamespace,
      'data-cal-link': dataCalLink,
      'data-cal-config': dataCalConfig,
    }
    const commonProps = {
      className,
      onClick,
      target,
      rel,
      'aria-label': ariaLabel,
      ...dataAttrs,
    }

    if (as === 'a' && href) {
      return (
        <a href={href} {...commonProps}>
          {children}
        </a>
      )
    }

    if (as === 'div') {
      return (
        <div
          role="button"
          tabIndex={0}
          {...commonProps}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClick?.()
            }
          }}
        >
          {children}
        </div>
      )
    }

    return <button {...commonProps}>{children}</button>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: position.x, y: position.y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {renderInner()}
    </motion.div>
  )
}

MagneticButton.displayName = 'MagneticButton'
