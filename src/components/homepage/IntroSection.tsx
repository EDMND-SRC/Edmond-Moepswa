'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ---------------------------------------------------------------------------
// ScrollColorReveal — wraps text in a scroll-driven color reveal.
// Supports "emphasis phrases" that get a 3-stage animation:
//   dark gray (#595959) → brand orange (#FF4D2E) → white (#FFFFFF)
// Regular words get a 2-stage animation:
//   dark gray (#595959) → white (#FFFFFF)
// ---------------------------------------------------------------------------

interface EmphasisPhrase {
  text: string
}

function ScrollColorRevealParagraph({
  text,
  wordOffset,
  totalWords,
  emphasisPhrases = [],
  className = '',
}: {
  text: string
  wordOffset: number
  totalWords: number
  emphasisPhrases?: EmphasisPhrase[]
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 15%'],
  })

  // Build an ordered list of "tokens" — either a plain word or part of an emphasis phrase.
  // We replace each emphasis phrase in the text with a marker, then split into words.
  const tokens: Array<{ type: 'emphasis' | 'plain'; word: string }> = []
  let remaining = text

  // Build a map of emphasis phrase positions
  const emphasisRanges: Array<{ start: number; end: number; phrase: EmphasisPhrase }> = []
  for (const phrase of emphasisPhrases) {
    const idx = remaining.indexOf(phrase.text)
    if (idx !== -1) {
      emphasisRanges.push({ start: idx, end: idx + phrase.text.length, phrase })
    }
  }

  // Tokenize: walk through the text, splitting into words and tagging emphasis words
  const allWords = text.split(/(\s+)/)
  let charPos = 0
  for (const segment of allWords) {
    const isWhitespace = /^\s+$/.test(segment)
    const segStart = charPos
    const segEnd = charPos + segment.length
    charPos = segEnd

    if (isWhitespace) {
      tokens.push({ type: 'plain', word: segment })
      continue
    }

    // Check if this word is inside any emphasis range
    const inEmphasis = emphasisRanges.some((r) => segStart >= r.start && segEnd <= r.end)

    tokens.push({ type: inEmphasis ? 'emphasis' : 'plain', word: segment })
  }

  // Count only non-whitespace emphasis and plain words for offset calculation
  const nonWsTokens = tokens.filter((t) => !/^\s+$/.test(t.word))

  if (reducedMotion) {
    return (
      <p className={className} ref={ref}>
        {text}
      </p>
    )
  }

  return (
    <p className={className} ref={ref}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token.word)) {
          return <span key={i}>{token.word}</span>
        }

        // Calculate this token's position among non-whitespace tokens
        const nonWsIndex = nonWsTokens.indexOf(token)
        const globalIndex = wordOffset + nonWsIndex
        const progress = globalIndex / totalWords
        const rangeWidth = 0.5 / totalWords

        if (token.type === 'emphasis') {
          // 3-stage: dark gray → brand orange → light gray
          const start = progress
          const mid = start + rangeWidth * 0.5
          const end = start + rangeWidth
          const color = useTransform(
            scrollYProgress,
            [start, mid, end],
            ['#595959', '#FF4D2E', '#FFFFFF'],
          )
          return (
            <motion.span key={i} style={{ color }} className="inline">
              {token.word}
            </motion.span>
          )
        }

        // 2-stage: dark gray → light gray
        const start = progress
        const end = start + rangeWidth
        const color = useTransform(scrollYProgress, [start, end], ['#595959', '#FFFFFF'])
        return (
          <motion.span key={i} style={{ color }} className="inline">
            {token.word}
          </motion.span>
        )
      })}
    </p>
  )
}

// ---------------------------------------------------------------------------
// HeadingWord — individual word in the heading with hover magnification.
// Surrounding words dim to opacity 0.5 via group-hover CSS.
// Respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

function HeadingWord({ word, reducedMotion }: { word: string; reducedMotion: boolean }) {
  if (reducedMotion) {
    return <span className="inline-block">{word}</span>
  }

  return (
    <motion.span
      className="inline-block group-hover:opacity-50 transition-opacity duration-200 hover:!opacity-100 mr-[0.25em] last:mr-0"
      initial={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{ transformOrigin: 'center center' }}
    >
      {word}
    </motion.span>
  )
}

// ---------------------------------------------------------------------------
// IntroSection
// ---------------------------------------------------------------------------

export default function IntroSection() {
  const reducedMotion = useReducedMotion()

  const heading =
    "I've been on both sides of the desk. Now I design and build systems that hold up."
  const headingWordsArr = heading.split(' ')

  const p1Text =
    'I spent a decade on the other side of the desk before I wrote my first line of production code. I ran and managed hospitality operations in Canberra; I gave financial advice and built portfolios for HNW clients in Sydney; I built risk and insurance functions from zero for a construction project management company in Gaborone.'

  const p2Text =
    'Each role required the same thing: understand how the business actually makes decisions, then build the systems and tools to help it make better ones. I did that for cafes and restaurants, for private wealth clients, for a construction project management company, and for a football club. That club just earned promotion to the Botswana Premier League. I learned more about building systems that hold up in those roles than in any formal training.'

  const p3Text =
    'Today, I operate BridgeArc Digital from Gaborone. I build websites, web apps, and workflow automations for businesses that need things that work properly and keep working. Every project ships with documentation and complete ownership.'

  const p1Words = p1Text.split(/(\s+)/).filter((w: string) => !/^\s+$/.test(w)).length
  const p2Words = p2Text.split(/(\s+)/).filter((w: string) => !/^\s+$/.test(w)).length
  const p3Words = p3Text.split(/(\s+)/).filter((w: string) => !/^\s+$/.test(w)).length
  const totalWords = p1Words + p2Words + p3Words

  return (
    <section id="intro" className="bg-[#0a0a0a] text-white px-6 md:px-10 py-24 md:py-40">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Section Label */}
        <div className="md:col-span-3 lg:col-span-2">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Intro
          </span>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 lg:col-span-10 flex flex-col gap-10">
          {/* Heading — brand orange, hover magnification */}
          <div className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tighter text-[#FF4D2E] group">
            {headingWordsArr.map((word, i) => (
              <HeadingWord key={i} word={word} reducedMotion={reducedMotion} />
            ))}
          </div>

          {/* Paragraph 1 — Geist Variable, scroll color reveal */}
          <ScrollColorRevealParagraph
            text={p1Text}
            wordOffset={0}
            totalWords={totalWords}
            emphasisPhrases={[{ text: 'the other side of the desk' }, { text: 'from zero' }]}
            className="text-[#595959] text-lg md:text-xl leading-relaxed max-w-3xl font-normal"
          />

          {/* Paragraph 2 — Geist Variable, scroll color reveal */}
          <ScrollColorRevealParagraph
            text={p2Text}
            wordOffset={p1Words}
            totalWords={totalWords}
            emphasisPhrases={[
              { text: 'understand how the business actually makes decisions' },
              { text: 'just earned promotion to the Botswana Premier League' },
              { text: 'systems that hold up' },
            ]}
            className="text-[#595959] text-lg md:text-xl leading-relaxed max-w-3xl font-normal"
          />

          {/* Paragraph 3 — Geist Variable, scroll color reveal */}
          <ScrollColorRevealParagraph
            text={p3Text}
            wordOffset={p1Words + p2Words}
            totalWords={totalWords}
            emphasisPhrases={[
              { text: 'work properly and keep working' },
              { text: 'complete ownership' },
            ]}
            className="text-[#595959] text-lg md:text-xl leading-relaxed max-w-3xl font-normal"
          />

          {/* CTA */}
          <Link
            href="/about"
            className="text-[#FF4D2E] text-sm italic hover:underline inline-flex items-center gap-2 mt-2 font-normal"
          >
            Read my full story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

IntroSection.displayName = 'IntroSection'
