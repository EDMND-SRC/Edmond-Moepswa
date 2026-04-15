import {
  CheckCircle2,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import { LinkedinIcon, TwitterIcon } from '@/components/icons/BrandIcons'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#111111] rounded-3xl p-8 md:p-16 border border-white/10 relative overflow-hidden text-center">
          <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-3xl md:text-5xl font-medium tracking-tighter mb-6">
            Everything is set!
          </h1>
          <p className="text-[#a3a3a3] text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto">
            Your resources have been processed. You should receive an email shortly with your access link.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <a
              href="https://www.linkedin.com/in/edmond-moepswa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all group"
            >
              <Linkedin className="w-6 h-6 text-[#0077B5]" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Let's connect</p>
                <p className="text-xs text-[#a3a3a3]">Follow for daily updates</p>
              </div>
            </a>
            <a
              href="https://twitter.com/edmond_moepswa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all group"
            >
              <Twitter className="w-6 h-6 text-[#1DA1F2]" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Follow on X</p>
                <p className="text-xs text-[#a3a3a3]">Short-form tech tips</p>
              </div>
            </a>
          </div>

          <div className="pt-12 border-t border-white/5">
            <h2 className="text-xl font-medium mb-4">Want to move faster?</h2>
            <p className="text-[#a3a3a3] mb-8">
              Book a free strategy session to discuss your specific project needs.
            </p>
            <a
              href="https://cal.com/edmond-moepswa/strategy-session"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF4D2E] hover:bg-[#FF4D2E]/90 text-white px-8 py-4 rounded-full font-medium transition-all group"
            >
              Book Discovery Call
              <Calendar className="w-4 h-4" />
            </a>
          </div>

          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF4D2E]/5 blur-[120px] -z-10" />
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/resources"
            className="text-[#a3a3a3] hover:text-white transition-colors inline-flex items-center gap-2 text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Resources
          </Link>
        </div>
      </div>
    </div>
  )
}
