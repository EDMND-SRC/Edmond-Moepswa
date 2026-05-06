'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Calendar, Sparkles, TrendingUp } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

const Step1UI = () => (
  <div className="w-full max-w-[280px] bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
    <div className="flex justify-between items-center mb-6">
      <div className="w-10 h-10 rounded-full bg-[#FF4D2E]/20 flex items-center justify-center text-[#FF4D2E]">
        <Calendar className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 w-3/4 bg-white/10 rounded-md" />
      <div className="h-4 w-1/2 bg-white/5 rounded-md" />
    </div>
    <div className="mt-6 grid grid-cols-4 gap-2">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded-md ${i === 3 ? 'bg-[#FF4D2E]' : 'bg-white/5'}`}
        />
      ))}
    </div>
    <div className="mt-6 h-10 w-full bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 rounded-lg flex items-center justify-center">
      <span className="text-[#FF4D2E] text-sm font-medium">Confirm Time</span>
    </div>
  </div>
)

const Step2UI = () => (
  <div className="w-full max-w-[300px] relative z-10 group-hover:scale-105 transition-transform duration-500">
    <div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#FF4D2E]/20 to-transparent rounded-full blur-2xl" />
    <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative z-20">
      <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <div className="p-5 font-mono text-xs text-white/60 space-y-2">
        <div className="flex gap-4">
          <span className="text-pink-400">import</span> <span className="text-white/90">AI</span>{' '}
          <span className="text-pink-400">from</span>{' '}
          <span className="text-green-400">&apos;@/core&apos;</span>;
        </div>
        <div className="flex gap-4">
          <span className="text-pink-400">const</span> <span className="text-blue-400">system</span>{' '}
          <span className="text-pink-400">=</span> <span className="text-yellow-400">new</span>{' '}
          <span className="text-white/90">AI</span>();
        </div>
        <div className="h-2" />
        <div className="flex gap-4">
          <span className="text-blue-400">system</span>.
          <span className="text-yellow-400">optimize</span>({'{'}
        </div>
        <div className="flex gap-4 pl-4">
          <span className="text-white/90">performance:</span>{' '}
          <span className="text-orange-400">true</span>,
        </div>
        <div className="flex gap-4 pl-4">
          <span className="text-white/90">design:</span>{' '}
          <span className="text-green-400">&apos;flawless&apos;</span>
        </div>
        <div className="flex gap-4">{'}'});</div>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 bg-[#222] border border-white/10 rounded-lg p-3 shadow-xl z-30 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
        <Sparkles className="w-4 h-4" aria-hidden="true" />
      </div>
      <div>
        <div className="text-xs font-medium text-white/90">Generated</div>
        <div className="text-[10px] text-white/40">0.2s elapsed</div>
      </div>
    </div>
  </div>
)

const Step3UI = () => (
  <div className="w-full max-w-[300px] flex flex-col gap-4 relative z-10 group-hover:scale-105 transition-transform duration-500">
    <div className="flex gap-4">
      <div className="flex-1 bg-[#1a1a1a] rounded-xl border border-white/10 p-4 shadow-xl">
        <div className="text-white/40 text-xs mb-1">Conversion</div>
        <div className="text-xl font-medium text-white">+24%</div>
        <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-[70%]" />
        </div>
      </div>
      <div className="flex-1 bg-[#1a1a1a] rounded-xl border border-white/10 p-4 shadow-xl">
        <div className="text-white/40 text-xs mb-1">Speed</div>
        <div className="text-xl font-medium text-white">0.8s</div>
        <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-[90%]" />
        </div>
      </div>
    </div>
    <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-5 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium text-white/90">Growth Trend</div>
        <TrendingUp className="w-4 h-4 text-[#FF4D2E]" aria-hidden="true" />
      </div>
      <div className="flex items-end gap-2 h-24">
        {[40, 30, 50, 45, 70, 65, 90].map((height, i) => (
          <div key={`bar-${height}-${i}`} className="flex-1 bg-white/5 rounded-t-sm relative group">
            <div
              className={`absolute bottom-0 left-0 w-full rounded-t-sm transition-all duration-500 ${i === 6 ? 'bg-[#FF4D2E]' : 'bg-white/20'}`}
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const Step4UI = () => (
  <div className="w-full max-w-[300px] bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4D2E] to-transparent opacity-50" />
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-white font-medium text-sm">Project Live</div>
          <div className="text-white/40 text-xs">All systems operational</div>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
        <span className="text-white/60 text-sm">Uptime</span>
        <span className="text-green-400 font-mono text-sm">99.9%</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
        <span className="text-white/60 text-sm">Load Time</span>
        <span className="text-blue-400 font-mono text-sm">0.4s</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
        <span className="text-white/60 text-sm">SEO Score</span>
        <span className="text-purple-400 font-mono text-sm">100/100</span>
      </div>
    </div>
  </div>
)

const Step5UI = ({ reducedMotion }: { reducedMotion?: boolean }) => (
  <div className="w-full max-w-[300px] bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4D2E] to-transparent opacity-50" />
    <div className="flex justify-between items-center mb-6">
      <div className="text-white/80 text-sm font-medium">System Performance</div>
      <div className="text-green-400 text-xs font-mono">+98%</div>
    </div>
    <div className="relative w-32 h-32 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#FF4D2E"
          strokeWidth="8"
          strokeDasharray="251.2"
          initial={reducedMotion ? { strokeDashoffset: 251.2 * 0.02 } : { strokeDashoffset: 251.2 }}
          whileInView={reducedMotion ? {} : { strokeDashoffset: 251.2 * 0.02 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-white">98</span>
        <span className="text-[10px] text-white/50 tracking-widest">SCORE</span>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={reducedMotion ? { width: '95%' } : { width: 0 }}
          whileInView={reducedMotion ? {} : { width: '95%' }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1 }}
        />
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-purple-500"
          initial={reducedMotion ? { width: '92%' } : { width: 0 }}
          whileInView={reducedMotion ? {} : { width: '92%' }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  </div>
)

interface ProcessStep {
  id: string
  title: string
  description: string
  visual: React.ReactNode
}

const processSteps: ProcessStep[] = [
  {
    id: '1',
    title: 'Discovery Call',
    description:
      'We start with a free 30-minute discovery call to understand your business, goals, and target audience. From there, I prepare a scoped proposal with transparent pricing — no surprises, no hidden fees.',
    visual: <Step1UI />,
  },
  {
    id: '2',
    title: 'Design & Prototyping',
    description:
      'Strategy becomes wireframes, then high-fidelity designs. I iterate based on your feedback until it feels right. The timeline clock pauses during review periods.',
    visual: <Step2UI />,
  },
  {
    id: '3',
    title: 'Development & Testing',
    description:
      'I build the designs with tested, documented code and test across devices. Every build ships with a handover session so you can manage it yourself.',
    visual: <Step3UI />,
  },
  {
    id: '4',
    title: 'Deployment & Handover',
    description:
      'I handle the technical setup, configure analytics and monitoring, and run a training session so you can manage your systems independently. Full source files and documentation included.',
    visual: <Step4UI />,
  },
  {
    id: '5',
    title: 'Ongoing Support',
    description:
      'After launch, things will need updating. Retainers lock in someone who already knows the codebase — predictable monthly cost, no re-briefing, no waiting for availability.',
    visual: <Step5UI />,
  },
]

export default function ProcessSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="process"
      className="bg-[#0a0a0a] text-white py-24 md:py-40 border-t border-white/10"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
          // How it Works
        </span>
      </div>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6 max-w-3xl">
            How we work together
          </h2>
          <p className="text-[#b0b0b0] text-base md:text-lg max-w-2xl">
            Every project follows the same process. Timeline estimates are transparent; the delivery
            clock pauses during your review periods so you&apos;re never rushed.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="flex flex-col gap-24">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch relative group"
              >
                {/* Line for this row (and gap) */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-[19px] md:left-[23px] top-[40px] md:top-[48px] bottom-[-6rem] w-[2px] bg-white/10 hidden md:block" />
                )}
                {/* Mobile line */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-[19px] top-[40px] bottom-[-6rem] w-[2px] bg-white/10 md:hidden" />
                )}

                {/* Left Side */}
                <div className="flex gap-6 md:gap-8">
                  {/* Number */}
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-xl flex items-center justify-center font-medium text-lg md:text-xl z-10">
                    {step.id}
                  </div>

                  {/* Text */}
                  <div className="pt-1 md:pt-2">
                    <h3 className="text-2xl md:text-3xl font-medium mb-3 md:mb-4">{step.title}</h3>
                    <p className="text-[#b0b0b0] text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 aspect-square md:aspect-[4/3] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                  {step.id === '5' ? <Step5UI reducedMotion={reducedMotion} /> : step.visual}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - Ready to Start? */}
        <div className="text-center pt-24 mt-12 border-t border-white/10">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter mb-6">
            Ready to start your project?
          </h3>
          <p className="text-[#b0b0b0] text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s talk about what you&apos;re building.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact#booking-panel"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              Book a Free Discovery Call
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20bd5a] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

ProcessSection.displayName = 'ProcessSection'
