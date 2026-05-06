'use client'

import { useRef, useState, useEffect } from 'react'
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
  const [stardustActive, setStardustActive] = useState(false)

  useEffect(() => {
    if (isInView && !reducedMotion) {
      const timer = setTimeout(() => {
        setStardustActive(true)
      }, 420)
      return () => clearTimeout(timer)
    } else if (isInView && reducedMotion) {
      setStardustActive(true)
    } else {
      setStardustActive(false)
    }
  }, [isInView, reducedMotion])

  return (
    <div className="lg:col-span-5 flex justify-start lg:justify-center relative h-full">
      <div className="sticky top-32 flex items-center justify-center w-full h-fit relative py-10">
        <div ref={ref} className="relative flex items-center justify-center perspective-[1000px]">
          <Stardust active={stardustActive} />
          <motion.span
            initial={
              reducedMotion
                ? { rotateX: 0, opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                : { rotateX: -720, opacity: 0, scale: 0.5, y: -200, filter: 'blur(10px)' }
            }
            animate={
              reducedMotion
                ? { rotateX: 0, opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                : isInView
                  ? { rotateX: [-720, -360, 0], opacity: [0, 1, 1], scale: [0.5, 0.8, 1], y: [-200, 50, 0], filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'] }
                  : { rotateX: -720, opacity: 0, scale: 0.5, y: -200, filter: 'blur(10px)' }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.78, ease: 'easeOut', times: [0, 0.58, 1] }
            }
            className="text-[150px] md:text-[250px] lg:text-[320px] leading-none font-light tracking-tighter slashed-zero inline-block origin-center"
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
