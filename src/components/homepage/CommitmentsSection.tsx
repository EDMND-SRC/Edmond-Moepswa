'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  FileCheck,
  KeyRound,
  MessageSquareOff,
  Clock,
  LockOpen,
  Wrench,
} from 'lucide-react'

interface Commitment {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
}

const commitments: Commitment[] = [
  {
    icon: MessageSquareOff,
    title: "I'll tell you if your idea won't work",
    body: "Before you pay for it. If your approach is wrong for your business, I'll say so and suggest something better. You don't need another yes-person.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    body: "Source code, databases, design files, documentation — all handed over at the end. No vendor lock-in, no 'call me if you need changes.' It's yours.",
  },
  {
    icon: FileCheck,
    title: "Full documentation, every time",
    body: "Not a README you'll never read. Actual documentation: how your system works, how to update it, where things are configured, and what to do when something breaks.",
  },
  {
    icon: Clock,
    title: "The review clock pauses",
    body: "When I send you designs or a build to test, the delivery timeline stops until you've had time to review properly. No rushing. No 'approve in 24 hours or the deadline slips.'",
  },
  {
    icon: LockOpen,
    title: "Free tiers first, always",
    body: "I'll design around free plans for hosting, databases, CRMs, and automation tools. If you need to upgrade, I'll tell you why — and what you're getting for the money.",
  },
  {
    icon: Wrench,
    title: "I build around your actual workflow",
    body: "Not the one you think you should have. The one your team actually uses. That means fewer workarounds, less resistance to adoption, and systems people actually use.",
  },
]

export default function CommitmentsSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="commitments"
      className="bg-[#0a0a0a] text-white py-24 md:py-40 border-t border-white/10"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
          // What You Can Count On
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6">
            No surprises. No lock-in.
          </h2>
          <p className="text-[#b0b0b0] text-base md:text-lg max-w-2xl">
            These aren't marketing promises. They're the rules I work by. Every client gets the same treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {commitments.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: reducedMotion ? 0 : i * 0.08, duration: 0.4 }}
                className="group flex gap-5 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-colors"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center group-hover:bg-[#FF4D2E]/15 transition-colors">
                  <Icon className="w-5 h-5 text-[#FF4D2E]" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#b0b0b0] text-sm md:text-base leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

CommitmentsSection.displayName = 'CommitmentsSection'
