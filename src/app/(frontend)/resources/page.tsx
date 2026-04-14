import React from 'react'
import {
  Book,
  ExternalLink,
  Mail,
} from 'lucide-react'
import Link from 'next/link'
import { ResourceCards } from '@/components/resources/ResourceCards'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base uppercase">
            // Resources
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-6 mb-6">
            Free guides for your next project
          </h1>
          <p className="text-[#a3a3a3] text-lg md:text-xl max-w-2xl leading-relaxed">
            Checklists and planning documents I use with clients. Download them, no email required.
          </p>
        </div>

        {/* Free Guides & Strategy Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center border border-[#FF4D2E]/20">
              <Book className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Strategy & Guides</h2>
          </div>

          <ResourceCards />
        </section>

        {/* Substack Newsletter CTA */}
        <section className="bg-[#111111] rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden mb-24">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-2xl bg-[#FF4D2E]/10 flex items-center justify-center border border-[#FF4D2E]/20 mb-6">
                <Mail className="w-6 h-6 text-[#FF4D2E]" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-4">
                The BridgeArc Digital Review
              </h3>
              <p className="text-[#a3a3a3] text-lg leading-relaxed mb-8">
                I write about building and running a digital services business from Botswana.
                Occasional, not weekly.
              </p>
              <a
                href="https://edmnd.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF4D2E] hover:bg-[#FF4D2E]/90 text-white px-8 py-4 rounded-full font-medium transition-all group"
              >
                Join the list
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="hidden md:block w-48 h-48 opacity-10">
              <Mail className="w-full h-full text-[#FF4D2E] rotate-12" />
            </div>
          </div>

          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4D2E]/5 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF4D2E]/5 blur-[100px] -z-10" />
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
