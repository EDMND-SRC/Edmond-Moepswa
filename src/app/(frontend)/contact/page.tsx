import Link from 'next/link'
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Users,
  FileText,
  Lightbulb,
  X,
} from 'lucide-react'

// Brand icons removed from lucide-react v1
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)
import {
  PHONE_DISPLAY,
  PHONE_E164,
  EMAIL,
  LOCATION,
  WHATSAPP_URL,
  LINKEDIN_URL,
  X_URL,
  INSTAGRAM_URL,
  THREADS_URL,
  SUBSTACK_URL,
  GITHUB_URL,
} from '@/lib/constants'
import CalEmbed from '@/components/cal/CalEmbed'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'
import FAQSection from '@/components/homepage/FAQSection'
import SubstackIcon from '@/components/icons/SubstackIcon'
import ThreadsIcon from '@/components/icons/ThreadsIcon'

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-[#0a0a0a] text-white">
      {/* Hero Banner */}
      <section className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-6 mb-6">
            Tell me what you&apos;re building
          </h1>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl leading-relaxed">
            Book a free 30-minute discovery call or reach out directly. I respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content: Cal.com + Contact Details */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Cal.com Embed — takes full width on left */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-6 mb-8">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tighter">
                Free 30-Minute Discovery Call
              </h2>
              <p className="text-[#b0b0b0] text-base leading-relaxed">
                Pick a time that works for you. No commitment -- just an honest conversation about
                your goals and how I can help.
              </p>
            </div>
            <div className="bg-[#111111] rounded-3xl p-4 md:p-6 border border-white/10 overflow-hidden">
              <CalEmbed />
            </div>
          </div>

          {/* Contact Details — sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Direct Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF4D2E] mb-4">
                Direct Contact
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/${PHONE_E164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                >
                  <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0" />
                  <div>
                    <span className="text-white text-sm font-medium group-hover:text-[#FF4D2E] transition-colors">
                      WhatsApp
                    </span>
                    <p className="text-[#b0b0b0] text-xs">{PHONE_DISPLAY}</p>
                  </div>
                </a>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                >
                  <Phone className="w-5 h-5 text-[#FF4D2E] shrink-0" />
                  <div>
                    <span className="text-white text-sm font-medium group-hover:text-[#FF4D2E] transition-colors">
                      Phone
                    </span>
                    <p className="text-[#b0b0b0] text-xs">{PHONE_DISPLAY}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                >
                  <Mail className="w-5 h-5 text-[#FF4D2E] shrink-0" />
                  <div>
                    <span className="text-white text-sm font-medium group-hover:text-[#FF4D2E] transition-colors">
                      Email
                    </span>
                    <p className="text-[#b0b0b0] text-xs break-all">{EMAIL}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 min-h-[44px]">
                  <MapPin className="w-5 h-5 text-[#b0b0b0] shrink-0" />
                  <div>
                    <span className="text-white text-sm font-medium">Location</span>
                    <p className="text-[#b0b0b0] text-xs">{LOCATION}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF4D2E] mb-4">
                Social
              </h3>
              <div className="flex flex-col gap-3">
                {LINKEDIN_URL && (
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#b0b0b0] hover:text-white transition-colors min-h-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                  >
                    <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
                {X_URL && (
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#b0b0b0] hover:text-white transition-colors min-h-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />X (Twitter)
                  </a>
                )}
                {INSTAGRAM_URL && (
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#b0b0b0] hover:text-white transition-colors min-h-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                  >
                    <InstagramIcon className="w-4 h-4" aria-hidden="true" />
                    Instagram
                  </a>
                )}
                {THREADS_URL && (
                  <a
                    href={THREADS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#b0b0b0] hover:text-white transition-colors min-h-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                  >
                    <ThreadsIcon className="w-4 h-4" aria-hidden="true" />
                    Threads
                  </a>
                )}
                {SUBSTACK_URL && (
                  <a
                    href={SUBSTACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#b0b0b0] hover:text-white transition-colors min-h-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                  >
                    <SubstackIcon className="w-4 h-4" aria-hidden="true" />
                    Substack
                  </a>
                )}
                {GITHUB_URL && (
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#b0b0b0] hover:text-white transition-colors min-h-[44px] px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
                  >
                    <GithubIcon className="w-4 h-4" aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Direct Message
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-4 mb-6">
              Or send a message directly
            </h2>
            <p className="text-[#b0b0b0] text-lg max-w-xl mx-auto leading-relaxed">
              Tell me about your project, timeline, and budget. I&apos;ll respond within 24 hours.
            </p>
          </div>
          <div className="bg-[#111111] rounded-3xl p-6 md:p-8 border border-white/10">
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* What Happens on the Discovery Call */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Discovery Call
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-4 mb-6">
              What happens on the call
            </h2>
            <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto leading-relaxed">
              A free, no-obligation 30-minute conversation to understand your needs and explore how
              I can help.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">1. Understand Your Situation</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  Tell me about your business, your challenges, and what you&apos;re trying to
                  achieve. I listen more than I talk.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">2. Explore Possibilities</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  I&apos;ll share ideas based on similar projects I&apos;ve done -- what works, what
                  doesn&apos;t, and what might be a fit for you.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">3. Outline a Plan</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  If there&apos;s a fit, I&apos;ll outline a recommended approach, ballpark
                  investment, and timeline. No pressure -- just clarity.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">4. Follow-Up Within 48 Hours</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  You&apos;ll receive a written summary of our conversation and any recommended next
                  steps. Zero obligation to proceed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Response Time Expectations */}
      <section className="py-16 md:py-20 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
            <Clock className="w-5 h-5 shrink-0 text-[#FF4D2E] mt-0.5" />
            <div>
              <h3 className="text-white font-medium mb-2">Response Time Expectations</h3>
              <p className="text-[#b0b0b0] text-sm leading-relaxed">
                <strong className="text-white">WhatsApp / Phone:</strong> Typically within 2-4 hours
                during business hours (Central Africa Time, UTC+2, Mon-Fri).
                <br />
                <strong className="text-white">Email:</strong> Within 24 hours, often sooner.
                <br />
                <strong className="text-white">Social DMs:</strong> Within 24-48 hours.
                <br />
                <strong className="text-white">Weekends:</strong> I may not respond until the
                following business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="text-[#FF4D2E] text-sm font-medium hover:underline inline-flex items-center gap-2"
          >
            ← Back to Homepage
          </Link>
        </div>
      </section>
    </main>
  )
}
