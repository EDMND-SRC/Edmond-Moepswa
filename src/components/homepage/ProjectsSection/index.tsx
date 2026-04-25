'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProjectsSectionClient } from './ProjectsSectionClient'
import type { ProjectItem } from './types'

function extractDescription(description: unknown): string {
  if (!description) return ''
  if (typeof description === 'string') return description
  const root = (description as Record<string, unknown>)?.root as
    | Record<string, unknown>
    | undefined
  const children = root?.children as
    | Array<{ children?: Array<{ text?: string }> }>
    | undefined
  if (!children) return ''
  return children.map((c) => c.children?.map((cc) => cc.text).join('')).join('')
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchProjects = useCallback((signal?: AbortSignal) => {
    setError(false)
    setIsLoading(true)
    fetch('/api/projects?limit=100', { signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const docs = data.docs || []
        if (Array.isArray(docs) && docs.length > 0) {
          const mapped: ProjectItem[] = docs.map((p: Record<string, unknown>) => ({
            id: p.id as number,
            year: (p.year as string) || 'N/A',
            title: p.title as string,
            description: extractDescription(p.description),
            category: p.category as string,
            thumbnail:
              p.thumbnail && typeof p.thumbnail === 'object' ? (p.thumbnail as ProjectItem['thumbnail']) : null,
            link: (p.link as string) || '#',
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

  useEffect(() => {
    const controller = new AbortController()
    fetchProjects(controller.signal)
    return () => controller.abort()
  }, [fetchProjects])

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
            I'm currently preparing detailed project write-ups. In the meantime, feel free to
            <a href="/contact" className="text-[#FF4D2E] hover:underline ml-1">
              get in touch
            </a>{' '}
            to discuss your project.
          </p>
        </div>
      </section>
    )
  }

  return <ProjectsSectionClient projects={projects} />
}
