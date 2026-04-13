'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import {
  React,
  NextJs,
  TypeScript,
  TailwindCSS,
  NodeJs,
  PostgreSQL,
  VercelDark,
  Docker,
  Figma,
  Supabase,
} from 'developer-icons'
import type { ComponentType, SVGProps } from 'react'

const technologies: { name: string; Icon: ComponentType<SVGProps<SVGElement>> }[] = [
  { name: 'React', Icon: React },
  { name: 'Next.js', Icon: NextJs },
  { name: 'TypeScript', Icon: TypeScript },
  { name: 'Tailwind CSS', Icon: TailwindCSS },
  { name: 'Node.js', Icon: NodeJs },
  { name: 'PostgreSQL', Icon: PostgreSQL },
  { name: 'Vercel', Icon: VercelDark },
  { name: 'Docker', Icon: Docker },
  { name: 'Figma', Icon: Figma },
  { name: 'Supabase', Icon: Supabase },
]

function TechIcon({ Icon, name }: { Icon: ComponentType<SVGProps<SVGElement>>; name: string }) {
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
