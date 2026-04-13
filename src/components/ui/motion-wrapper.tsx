'use client'

import { motion } from 'motion/react'

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
