'use client'

import { motion } from 'motion/react'
import { AlertTriangle, ClipboardCheck, FileText } from 'lucide-react'
import type { LucideProps } from 'lucide-react'

interface Resource {
  title: string
  desc: string
  icon: React.ComponentType<LucideProps>
  tag: string
  url: string
}

const freeResources: Resource[] = [
  {
    title: '5 Signs Your Business Is Losing Money to Manual Processes',
    desc: 'A short guide to identifying costly manual processes that could be automated in your business.',
    icon: AlertTriangle,
    tag: 'Short guide',
    url: 'https://edmnd.gumroad.com/l/bgbgoq',
  },
  {
    title: 'Digital Systems Health Check',
    desc: 'A self-assessment scorecard for evaluating the health of your current digital infrastructure.',
    icon: ClipboardCheck,
    tag: 'Self-assessment scorecard',
    url: 'https://edmnd.gumroad.com/l/fwruno',
  },
  {
    title: 'UX Red Flags Checklist',
    desc: 'Common UX mistakes that cost conversions — 15 red flags to check on your own site today.',
    icon: FileText,
    tag: 'Checklist (15 items)',
    url: 'https://edmnd.gumroad.com/l/legyuk',
  },
]

const handleResourceClick = (resourceTitle: string, url: string) => {
  // Fire-and-forget tracking
  const payload = JSON.stringify({
    workflow: 'gumroad-download',
    data: { resource: resourceTitle, timestamp: new Date().toISOString() },
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/make-webhook', payload)
  } else {
    // Fallback if sendBeacon not available
    fetch('/api/make-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  }

  // Use <a> element click instead of window.open to avoid popup blockers
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.click()
}

export default function FreeResourcesSection() {
  return (
    <section id="resources" className="bg-[#0a0a0a] py-24 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center md:text-left">
        <div className="mb-14">
          <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em]">
            // Free Resources
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mt-6 tracking-tight">
            Download free guides
          </h2>
          <p className="text-[#b0b0b0] mt-6 max-w-xl text-lg leading-relaxed mx-auto md:mx-0">
            Practical guides and checklists. Free, no sign-up required.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freeResources.map((item, i) => {
            const IconComponent = item.icon
            return (
              <motion.button
                key={item.title}
                onClick={() => handleResourceClick(item.title, item.url)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(194, 112, 62, 0.15)',
                }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Download free ${item.tag}: ${item.title}`}
                className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 hover:border-[#FF4D2E]/40 transition-all duration-300 group cursor-pointer flex flex-col shadow-2xl text-left min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <IconComponent className="w-8 h-8 text-[#FF4D2E] mb-6" aria-hidden="true" />
                </motion.div>
                <span className="text-[#FF4D2E] text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                  {item.tag} &middot; Free
                </span>
                <h3 className="text-white font-medium text-xl mb-4 leading-tight group-hover:text-[#FF4D2E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#b0b0b0] text-sm flex-1 leading-relaxed">{item.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[#FF4D2E] text-sm font-bold group-hover:gap-3 transition-all">
                  Download Free{' '}
                  <motion.span
                    className="text-lg inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    &rarr;
                  </motion.span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

FreeResourcesSection.displayName = 'FreeResourcesSection'
