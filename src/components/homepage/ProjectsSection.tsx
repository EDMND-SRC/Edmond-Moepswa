'use client'

import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring, type Variants } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Project as PayloadProject, Media } from '@/payload-types'

interface UIProject {
  id: number
  year: string
  title: string
  description: string
  categories: string[]
  image: string
  link: string
}

const categoryLabels: Record<string, string> = {
  web: 'Digital Platforms & Web',
  automation: 'AI & Business Automation',
  'open-source': 'Open Source Initiatives',
  seo: 'Search & Growth Strategy',
}

const categories = Object.keys(categoryLabels)

const cardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Individual project card component.
 * All hooks are called at the top level — never inside a loop.
 */
const ProjectCard = memo(function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
  reducedMotion,
  onHoverChange,
}: {
  project: UIProject
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  reducedMotion: boolean
  onHoverChange: (hovering: boolean) => void
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  
  // Use MotionValues for tilt to avoid React re-renders on every mouse move
  const mX = useMotionValue(0)
  const mY = useMotionValue(0)
  
  // Smoothen the tilt with a spring
  const tiltX = useSpring(mY, { stiffness: 150, damping: 25 })
  const tiltY = useSpring(mX, { stiffness: 150, damping: 25 })

  const [imageError, setImageError] = useState(false)

  const isFirst = index === 0
  const isLast = index === total - 1

  // Refined ranges for distinct "stacking" effect
  // A card starts coming in early, but the previous one only starts scaling/fading 
  // after the new one has covered a significant portion.
  const step = 1 / total
  const margin = step * 0.2 // Small buffer between card transitions
  
  const startIn = isFirst ? 0 : (index / total) - (step * 0.8)
  const endIn = isFirst ? 0 : index / total
  
  const startFade = isLast ? 1 : (index + 1) / total
  const endFade = isLast ? 1 : ((index + 1) / total) + (step * 0.5)

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
    
    // Direct MotionValue updates bypass React's render cycle
    mX.set((e.clientX - centerX) / (rect.width / 2) * 10)
    mY.set(-(e.clientY - centerY) / (rect.height / 2) * 10)
  }

  const handleMouseLeave = () => {
    mX.set(0)
    mY.set(0)
  }

  return (
    <motion.a
      href={project.link}
      ref={cardRef}
      style={{
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        y: isFirst ? '0%' : y,
        zIndex: index,
        rotateX: reducedMotion ? 0 : tiltX,
        rotateY: reducedMotion ? 0 : tiltY,
        transformPerspective: 1000,
      }}
      initial={isFirst ? { opacity: 1, y: '0%' } : {}}
      whileInView={isFirst ? {} : { opacity: 1, y: '0%' }}
      viewport={{ once: true, margin: '-100px' }}
      className={`absolute w-[calc(100%-3rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-8rem)] max-w-7xl top-0 bottom-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-3xl ${reducedMotion ? 'cursor-auto' : 'cursor-none'}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => {
        onHoverChange(false)
        handleMouseLeave()
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full h-full rounded-3xl overflow-hidden bg-[#111111] border border-white/10 flex flex-col md:flex-row shadow-2xl"
        whileHover={reducedMotion ? {} : { scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Left: Image */}
        <motion.div
          className="w-full md:w-[60%] h-[50%] md:h-full relative overflow-hidden"
          style={{
            scale: reducedMotion ? 1 : kenBurnsScale,
          }}
        >
          {!imageError && project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading={isFirst ? 'eager' : 'lazy'}
              priority={isFirst}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center p-6">
              <span className="text-white/60 text-lg font-medium text-center">{project.title}</span>
            </div>
          )}
        </motion.div>

        {/* Right: Content */}
        <div className="w-full md:w-[40%] h-[50%] md:h-full p-6 md:p-8 lg:p-12 flex flex-col justify-between relative">
          <motion.div variants={childVariants}>
            <p className="text-white/60 font-mono text-xs md:text-sm mb-4">( {project.year} )</p>
          </motion.div>
          <motion.div variants={childVariants}>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight">
              {project.title}
            </h3>
          </motion.div>
          <motion.div variants={childVariants}>
            <p className="text-[#b0b0b0] text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
              {project.description}
            </p>
          </motion.div>

          <motion.div variants={childVariants} className="flex flex-col mt-6 md:mt-8">
            {project.categories.map((category, idx) => (
              <div
                key={idx}
                className="py-3 border-t border-white/10 text-white/80 text-xs md:text-sm"
              >
                {category}
              </div>
            ))}
            <div className="border-t border-white/10"></div>
          </motion.div>
        </div>

        {/* Shadow Overlay for depth during transition */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none z-20"
          style={{ opacity: isLast ? 0 : shadowOpacity }}
        />
      </motion.div>
    </motion.a>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default function ProjectsSection() {
  const [projects, setProjects] = useState<UIProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const containerRef = useRef<HTMLDivElement>(null)

  const hasProjects = projects.length > 0 && !isLoading && !error
  const { scrollYProgress } = useScroll({
    target: hasProjects ? containerRef : undefined,
    offset: ['start start', 'end end'],
  })
  const reducedMotion = useReducedMotion()

  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const fetchProjects = useCallback((signal?: AbortSignal) => {
    setError(false)
    setIsLoading(true)
    // Optimization: Filter out boilerplate on the server
    fetch('/api/projects?where[category][not_equals]=boilerplate&limit=100&depth=1', { signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const payloadData = (data.docs || data.projects || []) as PayloadProject[]
        if (Array.isArray(payloadData) && payloadData.length > 0) {
          const mapped: UIProject[] = payloadData.map((p) => ({
            id: p.id,
            year: p.year || 'N/A',
            title: p.title,
            description: p.description
              ? typeof p.description === 'string'
                ? p.description
                : (
                    p.description.root?.children as Array<{
                      children?: Array<{ text?: string }>
                    }>
                  )
                    ?.map((c) => c.children?.map((cc) => cc.text).join(''))
                    .join('') || ''
              : '',
            categories: p.category ? [categoryLabels[p.category] || p.category] : [],
            image: p.thumbnail ? getMediaUrl(p.thumbnail as Media) : '',
            link: p.link || '#',
          }))
          setProjects(mapped)
        } else {
          setProjects([])
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleCategoryClick = useCallback((cat: string) => {
    if (containerRef.current) {
      // Calculate exact top position of the section
      const topPos = containerRef.current.getBoundingClientRect().top + window.scrollY
      // Instant scroll to top to prevent the browser from snapping unpredictably as the container shrinks
      window.scrollTo({ top: topPos, behavior: 'auto' })
    }
    setActiveCategory(cat)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchProjects(controller.signal)
    return () => controller.abort()
  }, [fetchProjects])

  useEffect(() => {
    let rafId: number
    const updateMousePos = (e: MouseEvent) => {
      if (!isHovering || !cursorRef.current) return
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 48}px, ${e.clientY - 48}px, 0)`
        }
      })
    }
    window.addEventListener('mousemove', updateMousePos)
    return () => {
      window.removeEventListener('mousemove', updateMousePos)
      cancelAnimationFrame(rafId)
    }
  }, [isHovering])

  const filteredProjects = useMemo(() => {
    const noBoilerplate = projects.filter((p) => !p.categories.includes('Boilerplate Products'))
    return activeCategory === 'all'
      ? noBoilerplate
      : noBoilerplate.filter((p) =>
          p.categories.some((cat) => cat.toLowerCase().includes(activeCategory.toLowerCase())),
        )
  }, [projects, activeCategory])

  const N = filteredProjects.length || 1

  if (isLoading) {
    return (
      <section
        id="projects"
        className="bg-[#0a0a0a] text-white border-t border-white/10 relative min-h-screen flex items-center justify-center"
      >
        <div
          className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF4D2E]"
          role="status"
          aria-label="Loading projects"
        >
          <span className="sr-only">Loading projects...</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section
        id="projects"
        className="bg-[#0a0a0a] text-white border-t border-white/10 relative min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-[#b0b0b0] mb-4">Unable to load projects.</p>
          <button
            onClick={() => fetchProjects()}
            className="px-4 py-2 bg-[#FF4D2E] text-white rounded-full text-sm font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section
        id="projects"
        className="bg-[#0a0a0a] text-white border-t border-white/10 relative py-24 md:py-40"
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-10">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Selected Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-6 mb-4">
            Case studies coming soon
          </h2>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl">
            I&apos;m currently preparing detailed project write-ups. In the meantime, feel free to
            <a href="/contact" className="text-[#FF4D2E] hover:underline ml-1">
              get in touch
            </a>
            to discuss your project.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0a0a0a] text-white border-t border-white/10 relative"
      style={{ height: `${N * 100}vh`, position: 'relative' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mb-4 md:mb-6 z-10">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Selected Projects
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mb-6 md:mb-8 z-10 flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
              activeCategory === 'all'
                ? 'bg-[#FF4D2E] text-white'
                : 'bg-white/5 text-[#b0b0b0] border border-white/10 hover:border-white/20 hover:text-white'
            }`}
            aria-pressed={activeCategory === 'all'}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                activeCategory === cat
                  ? 'bg-[#FF4D2E] text-white'
                  : 'bg-white/5 text-[#b0b0b0] border border-white/10 hover:border-white/20 hover:text-white'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-[1800px] mx-auto h-[75vh] flex items-center justify-center">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={N}
              scrollYProgress={scrollYProgress}
              reducedMotion={reducedMotion}
              onHoverChange={setIsHovering}
            />
          ))}
        </div>
      </div>

      {/* Custom Cursor - only for mouse users with motion */}
      {!reducedMotion && isHovering && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-24 h-24 bg-[#FF4D2E] rounded-full pointer-events-none z-50 flex items-center justify-center text-white font-medium mix-blend-normal will-change-transform"
          style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        >
          View
        </div>
      )}
    </section>
  )
}

ProjectsSection.displayName = 'ProjectsSection'
