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

  const freeResources = products.filter(p => p.type === 'free')
  const paidProducts = products.filter(p => p.type === 'paid')

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
          <section className="mb-24">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center border border-[#FF4D2E]/20">
                <Book className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Strategy & Guides</h2>
            </div>

            <ResourceCards products={freeResources as any} />
          </section>
        )}

        {/* Paid Products Section */}
        {paidProducts.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center border border-[#FF4D2E]/20">
                <Package className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Boilerplate Products</h2>
            </div>

            <ResourceCards products={paidProducts as any} />
          </section>
        )}

        {/* Simplified Newsletter CTA */}
        <section className="mb-24 py-12 border-t border-b border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <p className="text-[#a3a3a3] text-lg leading-relaxed">
                I occasionally write about building BridgeArc and the digital landscape in Botswana.
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
