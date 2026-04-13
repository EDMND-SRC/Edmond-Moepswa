import Link from 'next/link'
import { Mail, Wrench } from 'lucide-react'
import { SUBSTACK_URL } from '@/lib/constants'
import { ResourceCards } from '@/components/resources/ResourceCards'

export default function ResourcesPage() {
  return (
    <main id="main-content" className="bg-[#0a0a0a] text-white">
      {/* Hero Banner */}
      <section className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Free Resources
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-6 mb-6">
            Download free guides &amp; tools
          </h1>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl leading-relaxed">
            Practical resources to help you build a better digital presence. Completely free -- no
            strings attached.
          </p>
        </div>
      </section>

      {/* Free Resources Grid */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <ResourceCards />
        </div>
      </section>

      {/* Coming Soon: Tools & Calculators */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
            <Wrench className="w-8 h-8 text-[#FF4D2E]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mb-6">
            Tools &amp; Calculators
          </h2>
          <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            Coming soon: interactive tools to help you estimate project costs, calculate ROI on your
            website, and plan your digital strategy.
          </p>
          <span className="text-[#b0b0b0]/50 text-sm">Watch this space</span>
        </div>
      </section>

      {/* Substack Subscription CTA */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-[#FF4D2E]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mb-6">
            Stay in the loop
          </h2>
          <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Subscribe to my Substack newsletter for insights on web design, development, workflow
            automation, and building a digital services business in Africa.
          </p>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Subscribe on Substack
            <span className="text-lg">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="text-[#FF4D2E] text-sm font-medium hover:underline inline-flex items-center gap-2"
          >
            &larr; Back to Homepage
          </Link>
        </div>
      </section>
    </main>
  )
}
