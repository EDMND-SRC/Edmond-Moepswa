'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [transitionKey, setTransitionKey] = useState(0)

  useEffect(() => {
    setTransitionKey((current) => current + 1)
  }, [pathname])

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0.14, scaleX: 0 }}
          animate={{ opacity: 0, scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-x-0 top-0 z-[10000] h-[2px] origin-left bg-[#FF4D2E] pointer-events-none"
        />
      </AnimatePresence>
    </>
  )
}
