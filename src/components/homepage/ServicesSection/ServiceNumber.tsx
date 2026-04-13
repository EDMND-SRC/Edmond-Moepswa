'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Stardust from './Stardust'

interface ServiceNumberProps {
  id: string
}

export default function ServiceNumber({ id }: ServiceNumberProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-30% 0px' })
  const reducedMotion = useReducedMotion()

  return (
    <div className="lg:col-span-5 flex justify-start lg:justify-center relative h-full">
      <div className="sticky top-32 flex items-center justify-center w-full h-fit relative py-10">
        <div ref={ref} className="relative flex items-center justify-center perspective-[1000px]">
          <Stardust active={isInView} />
          <motion.span
            initial={
              reducedMotion
                ? { rotateX: 0, opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                : { rotateX: 80, opacity: 0, scale: 0.5, y: 100, filter: 'blur(10px)' }
            }
            animate={
              reducedMotion
                ? { rotateX: 0, opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                : isInView
                  ? { rotateX: 0, opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                  : { rotateX: -80, opacity: 0, scale: 0.5, y: -100, filter: 'blur(10px)' }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 1.4, type: 'spring', bounce: 0.4, damping: 20 }
            }
            className="text-[150px] md:text-[250px] lg:text-[320px] leading-none font-light tracking-tighter slashed-zero inline-block"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
              color: 'transparent',
              transformStyle: 'preserve-3d',
            }}
          >
            {id}
          </motion.span>
        </div>
      </div>
    </div>
  )
}
