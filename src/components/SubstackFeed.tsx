'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { SUBSTACK_URL } from '@/lib/constants'

interface SubstackPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
}

export const SubstackFeed = () => {
  const [posts, setPosts] = useState<SubstackPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/substack')
        // NOTE: API route uses unstable_cache — client fetch respects Next.js caching.
        if (!res.ok) {
          setError(true)
          return
        }
        const data = await res.json()
        // Empty array means feed is disabled (URL set to '#')
        if (data.length === 0) {
          setError(true)
          return
        }
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF4D2E]"></div>
      </div>
    )

  // When feed is unavailable, show fallback with subscribe link
  if (error) {
    return (
      <section className="bg-[#0a0a0a] py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <div className="mb-14">
            <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em]">
              // Latest Writing
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mt-6 tracking-tight">
              Writing on systems, code &amp; business
            </h2>
            <p className="text-[#b0b0b0] mt-6 max-w-xl text-lg leading-relaxed mx-auto md:mx-0">
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

  if (posts.length === 0) return null

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center md:text-left">
        <div className="mb-14">
          <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em]">
            // Latest Writing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mt-6 tracking-tight">
            Writing on systems, code & business
          </h2>
          <p className="text-[#b0b0b0] mt-6 max-w-xl text-lg leading-relaxed mx-auto md:mx-0">
            Insights on building technology that lasts, automation, and the Botswana tech scene —
            delivered via Substack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-[#111111] rounded-2xl p-8 border border-white/5 hover:border-[#FF4D2E]/40 transition-all duration-300 group cursor-pointer flex flex-col shadow-2xl"
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
              <div className="mt-8 flex items-center gap-2 text-[#FF4D2E] text-sm font-bold group-hover:gap-3 transition-all">
                Read on Substack <span className="text-lg">→</span>
              </div>
            </motion.a>
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
