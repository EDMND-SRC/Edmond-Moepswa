'use client'

import { motion } from 'motion/react'

interface SkeletonPulseProps {
  className?: string
  width?: string
  height?: string
}

export default function SkeletonPulse({
  className = '',
  width = 'w-full',
  height = 'h-4',
}: SkeletonPulseProps) {
  return (
    <motion.div
      className={`${width} ${height} bg-white/5 rounded-lg ${className}`}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      // Visual-only skeleton — no role="status" to avoid conflicting with aria-hidden
      aria-hidden="true"
    />
  )
}
