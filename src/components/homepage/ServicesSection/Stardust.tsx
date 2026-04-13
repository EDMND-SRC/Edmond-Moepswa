'use client'

import { useMemo } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface StardustProps {
  active: boolean
}

interface Particle {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  scale: number
  duration: number
}

export default function Stardust({ active }: StardustProps) {
  const reducedMotion = useReducedMotion()

  const particles = useMemo<Particle[]>(() => {
    if (!active || reducedMotion) return []
    return [...Array(20)].map((_, i) => ({
      id: i,
      startX: (Math.random() - 0.5) * 200,
      startY: -100 - Math.random() * 50,
      endX: (Math.random() - 0.5) * 50 + (Math.random() - 0.5) * 200,
      endY: 100 + Math.random() * 150,
      scale: Math.random() * 1.5 + 0.5,
      duration: 1.5 + Math.random(),
    }))
  }, [active, reducedMotion])

  if (!active || reducedMotion || particles.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            x: particle.startX,
            y: particle.startY,
            scale: particle.scale,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: particle.endX,
            y: particle.endY,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: particle.duration,
            ease: 'easeOut',
            times: [0, 0.2, 0.8, 1],
          }}
          className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
        />
      ))}
    </div>
  )
}
