'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import {
  Atom,
  Cloud,
  Database,
  Layers3,
  Server,
  SquareTerminal,
  Wind,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

function FigmaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="7" y="3" width="6" height="6" rx="3" />
      <rect x="7" y="9" width="6" height="6" rx="3" />
      <path d="M10 15a3 3 0 1 0 0 6c1.7 0 3-1.3 3-3v-3h-3Z" />
      <path d="M13 3h1a3 3 0 1 1 0 6h-1V3Z" />
      <path d="M13 9h1a3 3 0 1 1 0 6h-1V9Z" />
    </svg>
  )
}

const technologies: { name: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { name: 'React', Icon: Atom },
  { name: 'Next.js', Icon: Layers3 },
  { name: 'TypeScript', Icon: SquareTerminal },
  { name: 'Tailwind CSS', Icon: Wind },
  { name: 'Node.js', Icon: Server },
  { name: 'PostgreSQL', Icon: Database },
  { name: 'Cloudflare', Icon: Cloud },
  { name: 'Docker', Icon: Layers3 },
  { name: 'Figma', Icon: FigmaIcon },
  { name: 'Supabase', Icon: Database },
]

function TechIcon({ Icon, name }: { Icon: ComponentType<SVGProps<SVGSVGElement>>; name: string }) {
  return (
    <div className="group flex items-center justify-center gap-2 text-[#595959] hover:text-[#b0b0b0] transition-colors duration-300 text-sm md:text-base font-medium whitespace-nowrap">
      <Icon
        className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      />
      <span>{name}</span>
    </div>
  )
}

export default function LogoMarquee() {
  const reducedMotion = useReducedMotion()

  // Duplicate 3x for seamless infinite scroll
  const copies = 3
  const duplicated: { idx: number; copy: number }[] = []
  for (let copy = 0; copy < copies; copy++) {
    for (let i = 0; i < technologies.length; i++) {
      duplicated.push({ idx: i, copy })
    }
  }

  return (
    <div className="w-full overflow-hidden bg-[#0a0a0a] py-8 md:py-10 border-t border-white/10">
      <div className="relative flex w-full flex-col md:flex-row items-center justify-center overflow-hidden max-w-[1800px] mx-auto px-6 md:px-10">
        {/* Left Text Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 shrink-0 z-10 bg-[#0a0a0a] pr-8">
          <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
            Tech Stack
          </span>
          <p className="text-[#b0b0b0] text-sm md:text-base font-medium leading-relaxed">
            Technologies I work with
            <br />
            to build &amp; automate your systems
          </p>
        </div>

        {/* Right Marquee Section */}
        <div className="flex w-full md:w-2/3 overflow-hidden relative">
          {/* Gradient Masks for smooth fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

          <motion.div
            className="flex w-max items-center gap-12 md:gap-16"
            animate={reducedMotion ? {} : { x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 50,
            }}
          >
            {duplicated.map(({ idx, copy }) => {
              const tech = technologies[idx]
              return (
                <TechIcon key={`marquee-${copy}-${tech.name}`} Icon={tech.Icon} name={tech.name} />
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
