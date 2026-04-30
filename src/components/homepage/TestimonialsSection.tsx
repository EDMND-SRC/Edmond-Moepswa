'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'


// ─── PLACEHOLDER TESTIMONIALS ───
// These are fictional testimonials based on seeded project data.
// Replace with real client testimonials as they become available.

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  content: string
  project: string
  initials: string
  avatarPath: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Raymond C.',
    role: 'Owner',
    location: 'Canberra, Australia',
    content:
      'The online ordering system cut our morning rush wait times in half. Before, we had 15-20 people lined up during the 7-9am peak. Now most orders come through before customers arrive. The site also helped us push our catering side — three corporate accounts reached out through the website in the first month.',
    project: 'Website Redesign',
    initials: 'RC',
    avatarPath: '/avatars/avatar-raymond-c.webp',
  },
  {
    id: 2,
    name: 'Thabo N.',
    role: 'Managing Director',
    location: 'Gaborone, Botswana',
    content:
      'We were tracking insurance renewals on spreadsheets across 12 active construction projects. Edmond built us a dashboard that flags expiring policies 90 days out, shows compliance status at a glance, and auto-generates reports for NBFIRA audits. What stood out was that he understood the insurance products first — CAR, PI, PL — before writing a single line of code.',
    project: 'Risk Management Dashboard',
    initials: 'TN',
    avatarPath: '/avatars/avatar-thabo-n.webp',
  },
  {
    id: 3,
    name: 'Amara K.',
    role: 'Founder',
    location: 'Johannesburg, South Africa',
    content:
      "We were manually routing leads from our website to three different team members based on service type — and people were falling through the cracks. Edmond set up an automated pipeline on Make.com that detects intent from the contact form, assigns the right team member, sends a personalised reply, and logs everything to our CRM. Setup took four days. We haven't lost a lead since.",
    project: 'Lead Automation Pipeline',
    initials: 'AK',
    avatarPath: '/avatars/avatar-amara-k.webp',
  },
  {
    id: 4,
    name: 'David O.',
    role: 'Co-founder',
    location: 'Lagos, Nigeria',
    content:
      "We needed a subscription management platform with Dodo Payments integration, user tier management, and an analytics dashboard — in three weeks. Edmond's boilerplate had 80% of what we needed out of the box. He customised the payment flows, wired up our specific webhook events, and documented everything. We launched on time.",
    project: 'SaaS Boilerplate',
    initials: 'DO',
    avatarPath: '/avatars/avatar-david-o.webp',
  },
]

/**
 * ColorRevealText — splits text into words and animates each word's color
 * from muted to active with staggered delays. Used for testimonial quotes.
 */
function ColorRevealText({ text }: { text: string }) {
  const reducedMotion = useReducedMotion()
  const words = text.split(/(\s+)/)

  if (reducedMotion) {
    return <span className="text-[#b0b0b0]">&ldquo;{text}&rdquo;</span>
  }

  return (
    <>
      <span className="text-[#595959]">&ldquo;</span>
      {words.map((word, i) => {
        if (word.match(/^\s+$/)) {
          return <span key={i}>{word}</span>
        }
        return (
          <motion.span
            key={i}
            initial={{ color: '#595959' }}
            animate={{ color: '#e5e5e5' }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="inline"
          >
            {word}
          </motion.span>
        )
      })}
      <span className="text-[#595959]">&rdquo;</span>
    </>
  )
}

export default function TestimonialsSection() {
  const reducedMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(!reducedMotion)
  const [avatarError, setAvatarError] = useState(false)

  // Auto-rotate
  useEffect(() => {
    if (!isPlaying || reducedMotion) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPlaying, reducedMotion])

  // Reset avatar error state when testimonial changes
  useEffect(() => {
    setAvatarError(false)
  }, [currentIndex])

  if (testimonials.length === 0) return null

  const goTo = (index: number) => {
    setCurrentIndex(((index % testimonials.length) + testimonials.length) % testimonials.length)
  }

  const goNext = () => goTo(currentIndex + 1)
  const goPrev = () => goTo(currentIndex - 1)

  const current = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      className="bg-[#0a0a0a] text-white py-24 md:py-40 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
          // Client Testimonials
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter mt-6 mb-16">
          What they say about working with me
        </h2>

        {/* Testimonial Card */}
        <div
          className="relative min-h-[320px] md:min-h-[280px]"
          aria-live="polite"
          aria-labelledby="testimonial-heading"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, rotateY: reducedMotion ? 0 : -15 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: reducedMotion ? 0 : 15 }}
              transition={{ duration: reducedMotion ? 0 : 0.4 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                  {avatarError ? (
                    <span className="text-lg font-medium text-[#b0b0b0]">{current.initials}</span>
                  ) : (
                    <img
                      src={current.avatarPath}
                      alt={`Portrait of ${current.name}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                      onError={() => setAvatarError(true)}
                      decoding="async"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <blockquote className="text-base md:text-lg leading-relaxed mb-6">
                  <ColorRevealText text={current.content} />
                </blockquote>

                <div>
                  <h3 id="testimonial-heading" className="text-white font-medium">
                    {current.name}
                  </h3>
                  <p className="text-[#b0b0b0] text-sm">
                    {current.role} &middot; {current.location}
                  </p>
                  <p className="text-[#FF4D2E] text-xs mt-1">Project: {current.project}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-12">
          {/* Dots */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Testimonial ${i + 1}: ${t.name}`}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors min-w-[10px] min-h-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] ${
                  i === currentIndex ? 'bg-[#FF4D2E]' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Pause/Play — hidden when prefers-reduced-motion */}
            {!reducedMotion && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full text-[#b0b0b0] hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                aria-label={isPlaying ? 'Pause rotation' : 'Resume rotation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}

            {/* Prev/Next */}
            <button
              onClick={goPrev}
              className="p-2 rounded-full text-[#b0b0b0] hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="p-2 rounded-full text-[#b0b0b0] hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

TestimonialsSection.displayName = 'TestimonialsSection'
