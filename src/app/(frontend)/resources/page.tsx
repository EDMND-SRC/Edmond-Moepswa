import React from 'react'
import {
  Book,
  ExternalLink,
  Package,
} from 'lucide-react'
import Link from 'next/link'
import { ResourceCards } from '@/components/resources/ResourceCards'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function ResourcesPage() {
  const payload = await getPayload({ config })
  
  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1,
    sort: '-createdAt',
  })

  // Safe cast since we know the shape from Payload
  const typedProducts = products as any[]

  const freeResources = typedProducts.filter(p => p.type === 'free')
  const paidProducts = typedProducts.filter(p => p.type === 'paid')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mb-16">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base uppercase">
            // Resources
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-6 mb-6">
            Digital assets to help you build faster
          </h1>
          <p className="text-[#a3a3a3] text-lg md:text-xl max-w-2xl leading-relaxed">
            I build production-ready starter kits and share the planning documents I use with clients.
          </p>
        </div>

        {/* Free Guides & Strategy Section */}
        {freeResources.length > 0 && (
          <section className="mb-24" aria-labelledby="free-resources-heading">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center border border-[#FF4D2E]/20">
                <Book className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <h2 id="free-resources-heading" className="text-2xl md:text-3xl font-medium tracking-tight">Strategy &amp; Guides</h2>
            </div>

            <ResourceCards products={freeResources as any} />
          </section>
        )}

        {/* Paid Industry Starter Kits Section */}
        {paidProducts.length > 0 && (
          <section className="mb-24" aria-labelledby="starter-kits-heading">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center border border-[#FF4D2E]/20">
                <Package className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <h2 id="starter-kits-heading" className="text-2xl md:text-3xl font-medium tracking-tight">Industry Starter Kits</h2>
            </div>
            <p className="text-[#a3a3a3] text-base mb-10 max-w-2xl leading-relaxed">
              Production-ready Next.js codebases pre-configured for specific industries. Buy once, build faster.
            </p>

            <ResourceCards products={paidProducts as any} />
          </section>
        )}

        {/* AI-Powered Business Tools — Coming Soon */}
        <section className="mb-24" aria-labelledby="ai-tools-heading">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.777-1.372 2.588l-2.8-.4m0 0a1.5 1.5 0 01-1.658-1.494V19.5" />
              </svg>
            </div>
            <h2 id="ai-tools-heading" className="text-2xl md:text-3xl font-medium tracking-tight text-white/60">AI-Powered Business Tools</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-3 py-1">Coming Soon</span>
          </div>
          <p className="text-[#a3a3a3] text-base mb-10 max-w-2xl leading-relaxed">
            A set of free tools I&apos;m building to help Botswana businesses make better decisions — faster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 flex flex-col opacity-70"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <span className="text-white/30 text-xs font-bold">{tool.icon}</span>
                </div>
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                  {tool.category} &middot; Free Tool
                </span>
                <h3 className="text-white/60 font-medium text-xl mb-4 leading-tight">{tool.name}</h3>
                <p className="text-[#b0b0b0]/60 text-sm flex-1 leading-relaxed mb-8">{tool.description}</p>
                <div className="mt-auto flex items-center gap-2 text-white/20 text-sm font-bold">
                  <span>Coming Soon</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-24 py-12 border-t border-b border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <p className="text-[#a3a3a3] text-lg leading-relaxed">
                I occasionally write about my work and the digital landscape in Botswana.
              </p>
            </div>
            <a
              href="https://edmnd.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FF4D2E] font-medium hover:gap-3 transition-all group"
            >
              Join the list
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-[#FF4D2E] text-sm font-medium hover:underline inline-flex items-center gap-2"
          >
            &larr; Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Coming Soon AI Tools — no external brand names, built by Edmond individually
// ---------------------------------------------------------------------------
const AI_TOOLS = [
  {
    id: 'marketing-scanner',
    name: 'Website Marketing Scanner',
    description:
      'Enter your business URL and get an instant marketing score — with specific wins and fixes across copy, SEO, conversion, and social proof.',
    category: 'Marketing',
    icon: '📊',
  },
  {
    id: 'contract-guardian',
    name: 'Contract Guardian',
    description:
      'Paste a contract and get a plain-English summary with Red/Yellow/Green risk flags on every clause — so you know what you\'re signing.',
    category: 'Legal',
    icon: '📋',
  },
  {
    id: 'ads-intelligence',
    name: 'Ads Intelligence Tool',
    description:
      'Enter your business type and goals, and get a complete ad strategy: audience personas, platform mix, copy variants, and budget benchmarks.',
    category: 'Advertising',
    icon: '🎯',
  },
] as const
