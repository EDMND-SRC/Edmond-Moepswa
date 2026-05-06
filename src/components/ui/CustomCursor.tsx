'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const CURSOR_PREF_KEY = 'edmond-custom-cursor-enabled'

/**
 * Custom Cursor (6B)
 * Context-aware cursor that changes based on what it's hovering over.
 * DISABLED BY DEFAULT for accessibility — users must opt in via localStorage.
 * Set `localStorage.setItem('edmond-custom-cursor-enabled', 'true')` to enable.
 */
type CursorState = 'default' | 'view' | 'link' | 'text'

export default function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const isTouchDevice = useMemo(
    () =>
      typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    [],
  )

  const supportsFinePointer = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
    [],
  )

  // Check localStorage for opt-in preference
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(CURSOR_PREF_KEY) : null
      setIsEnabled(stored === 'true')
    } catch {
      setIsEnabled(false)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion || !isEnabled || isTouchDevice || !supportsFinePointer) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.closest('[data-cursor="view"]')) {
        setCursorState('view')
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorState('link')
      } else if (target.closest('p:not(.nav-text), h1, h2')) {
        setCursorState('text')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [reducedMotion, isEnabled, isTouchDevice, supportsFinePointer])

  if (reducedMotion || !isEnabled || !isVisible || isTouchDevice || !supportsFinePointer) return null

  const cursorSizes = {
    default: { width: 12, height: 12, scale: 1 },
    view: { width: 96, height: 96, scale: 1 },
    link: { width: 24, height: 24, scale: 1 },
    text: { width: 2, height: 24, scale: 1 },
  }

  const size = cursorSizes[cursorState]

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 bg-[#FF4D2E] rounded-full pointer-events-none z-[var(--z-cursor)] mix-blend-difference"
        animate={{
          x: position.x - size.width / 2,
          y: position.y - size.height / 2,
          width: size.width,
          height: size.height,
          borderRadius: cursorState === 'text' ? '0' : '50%',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        aria-hidden="true"
      />

      {/* Context label for "view" state */}
      {cursorState === 'view' && (
        <motion.div
          className="fixed top-0 left-0 bg-[#FF4D2E] text-white rounded-full pointer-events-none z-[var(--z-cursor)] flex items-center justify-center font-medium text-sm"
          animate={{
            x: position.x - 48,
            y: position.y - 48,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
          aria-hidden="true"
        >
          View
        </motion.div>
      )}

      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 border border-[#FF4D2E]/30 rounded-full pointer-events-none z-[var(--z-cursor)]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          width: 40,
          height: 40,
          scale: cursorState === 'link' ? 1.5 : 1,
          opacity: cursorState === 'text' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, mass: 0.5 }}
        aria-hidden="true"
      />
    </>
  )
}

CustomCursor.displayName = 'CustomCursor'
