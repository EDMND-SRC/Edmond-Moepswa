import { ExternalLink } from 'lucide-react'
import { SUBSTACK_URL } from '@/lib/constants'
import { getSubstackPosts } from '@/lib/server/substack'

export async function SubstackFeed() {
  let posts: Awaited<ReturnType<typeof getSubstackPosts>> = []

  try {
    posts = await getSubstackPosts(3)
  } catch (error) {
    console.error('Failed to fetch Substack posts:', error)
  }

  if (posts.length === 0) {
    return (
      <section className="ed-shell border-t border-white/5 px-6 py-24 md:px-10">
        <div className="ed-container max-w-5xl text-center md:text-left">
          <div className="mb-14">
            <span className="ed-eyebrow">// Latest Writing</span>
            <h2 className="ed-section-title mt-6">Writing on systems, code &amp; business</h2>
            <p className="ed-lead mx-auto mt-6 md:mx-0">
              Insights on building technology that lasts, automation, and the Botswana tech scene —
              delivered via Substack.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111111] p-12 text-center">
            <p className="text-[#b0b0b0] text-lg leading-relaxed mb-6">
              Newsletter feed unavailable — subscribe directly on Substack.
            </p>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF4D2E] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e0442a] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
            >
              Subscribe on Substack
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="ed-shell border-t border-white/5 px-6 py-24 md:px-10">
      <div className="ed-container max-w-5xl text-center md:text-left">
        <div className="mb-14">
          <span className="ed-eyebrow">// Latest Writing</span>
          <h2 className="ed-section-title mt-6">Writing on systems, code &amp; business</h2>
          <p className="ed-lead mx-auto mt-6 md:mx-0">
            Insights on building technology that lasts, automation, and the Botswana tech scene —
            delivered via Substack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-white/5 bg-[#111111] p-8 shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:border-[#FF4D2E]/40"
            >
              <div className="mb-4 text-xs text-[#666] font-medium uppercase tracking-widest">
                {new Date(post.pubDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <h3 className="text-white font-medium text-xl mb-4 leading-tight group-hover:text-[#FF4D2E] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#b0b0b0] text-sm flex-1 leading-relaxed line-clamp-3">
                {post.contentSnippet}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#FF4D2E] transition-all group-hover:gap-3">
                Read on Substack <span className="text-lg">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-12 flex justify-center md:justify-start">
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF4D2E] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e0442a] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
          >
            Subscribe on Substack
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
