import Link from 'next/link'
import {
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

import { LinkedinIcon, InstagramIcon, TwitterIcon } from '@/components/icons/BrandIcons'
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
} from '@/lib/constants'
import LazyCalBooking from '@/components/cal/LazyCalBooking'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'
import FAQSection from '@/components/homepage/FAQSection'
import SubstackIcon from '@/components/icons/SubstackIcon'
import ThreadsIcon from '@/components/icons/ThreadsIcon'
import { getFaqs } from '@/lib/server/faqs'

export default async function ContactPage() {
  const faqs = await getFaqs().catch(() => [])

  return (
    <main id="main-content" className="bg-[#0a0a0a] text-white">
      {/* Hero Banner */}
      <section className="border-b border-white/10">
        <div className="ed-container max-w-4xl px-6 py-24 md:px-10 md:py-32">
          <span className="ed-eyebrow">// Get in Touch</span>
          <h1 className="ed-page-title mt-6 mb-6">
            Tell me what you&apos;re building
          </h1>
          <p className="ed-lead">
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
              <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Free 30-Minute Discovery Call</h2>
              <p className="text-base leading-relaxed text-[#b0b0b0]">
                Pick a time that works for you. No commitment is required; just an honest conversation about your goals and how I can help.
              </p>
            </div>
            <LazyCalBooking
              title="Choose a time that works for you"
              description="The calendar loads only when you ask for it, so the page stays light while still giving you the full booking experience."
              panelId="booking-panel"
            />
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
              A free discovery call to understand your needs and explore how I can help.
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
                  I&apos;ll share ideas from similar projects I&apos;ve done to help you decide on the right fit for your situation.
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
                  investment, and timeline. I&apos;ll help you get clear on the path forward with no pressure to proceed.
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
                  steps. There is no obligation to proceed at any point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection initialFaqs={faqs} />

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
