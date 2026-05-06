import Link from 'next/link'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { getProjects } from '@/lib/server/projects'

const CATEGORY_LABELS: Record<string, string> = {
  applications: 'Web Applications',
  automation: 'Automation & Systems',
  products: 'Products & Boilerplates',
  websites: 'Websites',
}

function ProjectCard({
  project,
  priority,
}: {
  project: Awaited<ReturnType<typeof getProjects>>[number]
  priority: boolean
}) {
  const cardBody = (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] transition-colors duration-200 hover:border-white/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#171717]">
        {project.thumbnail ? (
          <ImageMedia
            resource={project.thumbnail}
            fill
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            pictureClassName="block h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            size="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-medium text-white/40">
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[#8a8a8a]">
          <span>{project.year}</span>
          <span className="text-[#FF4D2E]">
            {CATEGORY_LABELS[project.category] ?? project.category}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-medium tracking-tight text-white md:text-[1.7rem]">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#b0b0b0] md:text-base">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  )

  if (!project.link) {
    return <div>{cardBody}</div>
  }

  const isExternal = project.link.startsWith('http://') || project.link.startsWith('https://')

  if (isExternal) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        {cardBody}
      </a>
    )
  }

  return <Link href={project.link}>{cardBody}</Link>
}

export default async function ProjectsSection() {
  const projects = await getProjects({ limit: 15 })

  if (projects.length === 0) {
    return (
      <section id="projects" className="ed-shell border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
        <div className="ed-wide-container">
          <span className="ed-eyebrow">// Selected Projects</span>
          <h2 className="ed-section-title mt-6">Selected work is on the way</h2>
          <p className="ed-lead mt-4">
            I&apos;m preparing a cleaner highlight reel here. In the meantime, feel free to{' '}
            <Link href="/contact" className="text-[#FF4D2E] hover:underline">
              get in touch
            </Link>{' '}
            to talk through relevant work.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="ed-shell border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
      <div className="ed-wide-container">
        <div className="mb-14 max-w-3xl">
          <span className="ed-eyebrow">// Selected Projects</span>
          <h2 className="ed-section-title mt-6">A finite set of highlights, not an endless feed.</h2>
          <p className="ed-lead mt-6 max-w-2xl">
            These are the projects I want on the homepage: a tighter visual snapshot of the kind of
            systems, interfaces, and digital products I build.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index < 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
