'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ScrollTextRevealProps {
  children: string
  className?: string
  wordByWord?: boolean
}

/** Extracted component — calls useTransform at top level to avoid Rules of Hooks violation */
function RevealSpan({
  text,
  index,
  total,
  isWord,
  scrollYProgress,
}: {
  text: string
  index: number
  total: number
  isWord: boolean
  scrollYProgress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(scrollYProgress, [start * 0.8, end * 0.8 + 0.2], [0.15, 1])
  const key = isWord ? `word-${index}-${text.slice(0, 5)}` : `char-${index}`
  return (
    <motion.span key={key} style={{ opacity }} className="inline-block mr-[0.25em]">
      {text}
    </motion.span>
  )
}

export default function ScrollTextReveal({
  children,
  className = '',
  wordByWord = true,
}: ScrollTextRevealProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.5'],
  })

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  if (wordByWord) {
    const words = children.split(' ')
    return (
      <div ref={ref} className={className}>
        {words.map((word, i) => (
          <RevealSpan
            key={`word-${i}-${word.slice(0, 5)}`}
            text={word}
            index={i}
            total={words.length}
            isWord
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    )
  }

  // Character by character
  const chars = children.split('')
  return (
    <div ref={ref} className={className}>
      {chars.map((char, i) => (
        <RevealSpan
          key={`char-${i}`}
          text={char}
          index={i}
          total={chars.length}
          isWord={false}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}
