'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const storageKey = 'edmond-loading-screen-seen'
    if (typeof window === 'undefined') {
      return
    }

    if (window.sessionStorage.getItem(storageKey) === '1') {
      setIsVisible(false)
      return
    }

    const minDisplayMs = reducedMotion ? 120 : 180
    const maxDisplayMs = reducedMotion ? 180 : 320
    const startTime = performance.now()
    let dismissed = false
    let dismissTimer = 0
    let safetyTimer = 0

    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      const elapsed = performance.now() - startTime
      const remaining = Math.max(0, minDisplayMs - elapsed)

      dismissTimer = window.setTimeout(() => {
        setIsVisible(false)
        window.sessionStorage.setItem(storageKey, '1')
      }, remaining)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
      safetyTimer = window.setTimeout(dismiss, maxDisplayMs)
    }

    return () => {
      window.removeEventListener('load', dismiss)
      window.clearTimeout(dismissTimer)
      window.clearTimeout(safetyTimer)
    }
  }, [reducedMotion])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-[var(--z-cursor)] bg-[#0a0a0a] flex items-center justify-center pointer-events-none"
        >
          {reducedMotion ? (
            <div className="w-16 h-16 border-2 border-[#FF4D2E] border-t-transparent rounded-full" />
          ) : (
            <>
              {/* The Notch - brand identity shape */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.42, ease: 'easeOut' }}
                className="relative w-16 h-20"
              >
                {/* Rectangle with 45-degree cut from bottom-right */}
                <svg viewBox="0 0 64 80" className="w-full h-full">
                  <motion.path
                    d="M8,4 L56,4 L56,52 L32,76 L8,52 Z"
                    fill="none"
                    stroke="#FF4D2E"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  <motion.text
                    x="32"
                    y="45"
                    textAnchor="middle"
                    fill="#FF4D2E"
                    fontSize="24"
                    fontWeight="bold"
                    fontFamily="Archivo, sans-serif"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.18, duration: 0.16 }}
                  >
                    e
                  </motion.text>
                </svg>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
