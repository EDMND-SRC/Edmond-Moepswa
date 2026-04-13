'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    let mounted = true
    let listener: (() => void) | null = null
    const minDisplayTimer = setTimeout(() => {
      if (!mounted) return
      if (document.readyState === 'complete') {
        setIsVisible(false)
      } else {
        listener = () => {
          if (mounted) {
            setIsVisible(false)
          }
        }
        window.addEventListener('load', listener)
      }
    }, 800)
    return () => {
      mounted = false
      clearTimeout(minDisplayTimer)
      if (listener) window.removeEventListener('load', listener)
    }
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[var(--z-cursor)] bg-[#0a0a0a] flex items-center justify-center"
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
                transition={{ duration: 0.8, ease: 'easeOut' }}
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
                    transition={{ duration: 1, ease: 'easeInOut' }}
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
                    transition={{ delay: 0.5, duration: 0.3 }}
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
