'use client'

import { useState, useRef, useMemo, memo } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ImageMedia } from '@/components/Media/ImageMedia'
import type { ProjectItem } from './types'

const categoryLabels: Record<string, string> = {
  websites: 'Websites',
  applications: 'Web Applications',
  automation: 'Automation & Systems',
  products: 'Products & Boilerplates',
}

const categoryKeys = Object.keys(categoryLabels)

/* ------------------------------------------------------------------ */
//  ProjectCard — scroll-linked stacking card with hover tilt
/* ------------------------------------------------------------------ */

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
  reducedMotion,
}: {
  project: ProjectItem
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const mX = useMotionValue(0)
  const mY = useMotionValue(0)
  const tiltX = useSpring(mY, { stiffness: 150, damping: 25 })
  const tiltY = useSpring(mX, { stiffness: 150, damping: 25 })

  const step = 1 / total
  const startIn = (index / total) - step * 0.8
  const endIn = index / total
  const startFade = (index + 1) / total
  const endFade = (index + 1) / total + step * 0.5

  const scale = useTransform(scrollYProgress, [startFade, endFade], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [startFade, endFade], [1, 0])
  const y = useTransform(scrollYProgress, [startIn, endIn], ['120%', '0%'])
  const shadowOpacity = useTransform(scrollYProgress, [startFade, endFade], [0.1, 0.4])
  const kenBurnsScale = useTransform(scrollYProgress, [startFade, endIn], [1, 1.15])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mX.set(((e.clientX - centerX) / (rect.width / 2)) * 10)
    mY.set((-(e.clientY - centerY) / (rect.height / 2)) * 10)
  }

  const handleMouseLeave = () => {
    mX.set(0)
    mY.set(0)
  }

  const isFirst = index === 0
  const categoryLabel = categoryLabels[project.category] || project.category

  return (
    <motion.a
      href={project.link}
      ref={cardRef}
      style={{
        scale,
        opacity,
        y: isFirst ? '0%' : y,
        zIndex: project.id,
        rotateX: reducedMotion ? 0 : tiltX,
        rotateY: reducedMotion ? 0 : tiltY,
        transformPerspective: 1000,
      }}
      className="absolute w-[calc(100%-3rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-8rem)] max-w-7xl top-0 bottom-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-3xl"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        if (project.link === '#') {
          e.preventDefault()
        }
      }}
    >
      <motion.div
        className="w-full h-full rounded-3xl overflow-hidden bg-[#111111] border border-white/10 flex flex-col md:flex-row shadow-2xl"
        whileHover={reducedMotion ? {} : { scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Left: Image */}
        <motion.div
          className="w-full md:w-[60%] h-[50%] md:h-full relative overflow-hidden"
          style={{ scale: reducedMotion ? 1 : kenBurnsScale }}
        >
          {project.thumbnail ? (
            <ImageMedia
              resource={project.thumbnail}
              fill
              pictureClassName="w-full h-full block"
              imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={isFirst}
              loading={isFirst ? 'eager' : 'lazy'}
              size="(max-width: 768px) 100vw, 60vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white/60 text-2xl font-medium">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Right: Content */}
        <div className="w-full md:w-[40%] h-[50%] md:h-full p-6 md:p-8 lg:p-12 flex flex-col justify-between relative">
          <div>
            <p className="text-white/60 font-mono text-xs md:text-sm mb-4">{project.year}</p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight">
              {project.title}
            </h3>
            <p className="text-[#b0b0b0] text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col mt-6 md:mt-8">
            <div className="py-3 border-t border-white/10 text-white/80 text-xs md:text-sm">
              {categoryLabel}
            </div>
            <div className="border-t border-white/10" />
            <div className="py-3 text-[#FF4D2E] text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View case study →
            </div>
          </div>
        </div>

        {/* Shadow Overlay for depth during transition */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none z-20"
          style={{ opacity: shadowOpacity }}
        />
      </motion.div>
    </motion.a>
  )
})

ProjectCard.displayName = 'ProjectCard'

/* ------------------------------------------------------------------ */
//  StaticCard — used in reduced-motion mode
/* ------------------------------------------------------------------ */

const StaticCard = memo(function StaticCard({ project }: { project: ProjectItem }) {
  const categoryLabel = categoryLabels[project.category] || project.category

  return (
    <a
      href={project.link}
      className="group block rounded-3xl overflow-hidden bg-[#111111] border border-white/10 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      <div className="w-full aspect-[16/10] relative overflow-hidden">
        {project.thumbnail ? (
          <ImageMedia
            resource={project.thumbnail}
            fill
            pictureClassName="w-full h-full block"
            imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            size="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
            <span className="text-white/60 text-2xl font-medium">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 md:p-8">
        <p className="text-white/60 font-mono text-xs mb-2">{project.year}</p>
        <h3 className="text-xl md:text-2xl font-medium text-white mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-[#b0b0b0] text-sm leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>
        <span className="text-[#FF4D2E] text-xs font-medium">{categoryLabel}</span>
      </div>
    </a>
  )
})

StaticCard.displayName = 'StaticCard'

/* ------------------------------------------------------------------ */
//  ProjectsSectionClient
/* ------------------------------------------------------------------ */

export function ProjectsSectionClient({ projects }: { projects: ProjectItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat)
    // Defer scroll until after React commits the DOM height change
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })
  }

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const key of categoryKeys) {
      counts[key] = projects.filter((p) => p.category === key).length
    }
    return counts
  }, [projects])

  const N = filteredProjects.length
  const resultText =
    N === 0
      ? 'No projects in this category'
      : `Showing ${N} project${N !== 1 ? 's' : ''}`

  /* ── Reduced motion: static grid ── */
  if (reducedMotion) {
    return (
      <section
        id="projects"
        className="bg-[#0a0a0a] text-white border-t border-white/10 relative py-24 md:py-32"
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-10">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base block mb-6">
            // Selected Projects
          </span>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <FilterPill
              label="All"
              count={projects.length}
              active={activeCategory === 'all'}
              onClick={() => handleCategoryClick('all')}
            />
            {categoryKeys.map((key) => (
              <FilterPill
                key={key}
                label={categoryLabels[key]}
                count={categoryCounts[key]}
                active={activeCategory === key}
                disabled={categoryCounts[key] === 0}
                onClick={() => handleCategoryClick(key)}
              />
            ))}
          </div>

          {/* aria-live */}
          <div aria-live="polite" className="sr-only">
            {resultText}
          </div>

          {/* Cards grid */}
          {N === 0 ? (
            <EmptyState onReset={() => handleCategoryClick('all')} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StaticCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    )
  }

  /* ── Standard: sticky scroll stack ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0a0a0a] text-white border-t border-white/10 relative"
      style={{ height: `${Math.max(N, 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mb-4 md:mb-6 z-10">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Selected Projects
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mb-6 md:mb-8 z-10 flex flex-wrap gap-2">
          <FilterPill
            label="All"
            count={projects.length}
            active={activeCategory === 'all'}
            onClick={() => handleCategoryClick('all')}
          />
          {categoryKeys.map((key) => (
            <FilterPill
              key={key}
              label={categoryLabels[key]}
              count={categoryCounts[key]}
              active={activeCategory === key}
              disabled={categoryCounts[key] === 0}
              onClick={() => handleCategoryClick(key)}
            />
          ))}
        </div>

        {/* aria-live */}
        <div aria-live="polite" className="sr-only">
          {resultText}
        </div>

        <div className="relative w-full max-w-[1800px] mx-auto h-[75vh] flex items-center justify-center">
          {N === 0 ? (
            <EmptyState onReset={() => handleCategoryClick('all')} />
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    index={i}
                    total={N}
                    scrollYProgress={scrollYProgress}
                    reducedMotion={reducedMotion}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
//  Sub-components
/* ------------------------------------------------------------------ */

function FilterPill({
  label,
  count,
  active,
  disabled,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
        disabled
          ? 'opacity-40 cursor-not-allowed bg-white/5 text-[#b0b0b0] border border-white/10'
          : active
            ? 'bg-[#FF4D2E] text-white'
            : 'bg-white/5 text-[#b0b0b0] border border-white/10 hover:border-white/20 hover:text-white'
      }`}
      aria-pressed={active}
      aria-disabled={disabled}
    >
      {label} <span className="opacity-60">({count})</span>
    </button>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      <p className="text-[#b0b0b0] text-lg mb-4">No projects in this category.</p>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-[#FF4D2E] text-white rounded-full text-sm font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      >
        Show all projects
      </button>
    </div>
  )
}
