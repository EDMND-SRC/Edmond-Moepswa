import Link from 'next/link'
import {
  Calendar,
  BookOpen,
  Award,
  Code2,
  Building2,
  Coffee,
  TrendingUp,
  Shield,
} from 'lucide-react'
import { CAL_USERNAME, CAL_NAMESPACE } from '@/lib/constants'
import CalEmbed from '@/components/cal/CalEmbed'
import TechStackSection from '@/components/about/TechStackSection'
import ScrollTextReveal from '@/components/ui/ScrollTextReveal'
import CommitmentsSection from '@/components/homepage/CommitmentsSection'

export default function AboutPage() {
  return (
    <main id="main-content" className="bg-[#0a0a0a] text-white">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // About Edmond
          </span>
          <ScrollTextReveal className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-6 mb-6">
            A systems thinker who understands P&Ls, risk, and production code.
          </ScrollTextReveal>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From Canberra hospitality to Botswana boardrooms, I now focus on building digital systems
            built for handover.
          </p>
        </div>
      </section>

      {/* Full Biography — 4 Acts */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-12">
            <ScrollTextReveal className="text-[#b0b0b0] text-base md:text-lg leading-relaxed">
              Edmond learned systems thinking the hard way: by being the person who had to fix
              things when they broke. At 2am in a Canberra caf&eacute;. While reviewing insurance
              portfolios for multi-million-pula construction projects. While building websites for
              businesses that needed them to survive. The pattern recognition came from standing in
              every room — from kitchen to boardroom — and watching where things fell apart.
            </ScrollTextReveal>

            {/* Act I */}
            <div className="flex gap-6 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-wider">
                    Act I
                  </span>
                  <span className="text-[#b0b0b0] text-sm">4+ years</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                  Canberra Hospitality Career
                </h3>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  While studying Finance and Financial Planning at the University of Canberra,
                  Edmond worked his way through four venues in Australian hospitality — progressing
                  from all-rounder to Head Barista to General Manager. He placed{' '}
                  <strong className="text-white">
                    4th nationally in the AMP University Challenge
                  </strong>
                  , a competitive financial planning and investment management competition.
                </p>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  As General Manager of Morning Dew, he built the cafe&apos;s website from scratch.
                  Nobody asked him to — he just saw that they needed one. That period taught him
                  what small business owners actually deal with: managing staff, reading P&L
                  statements in real time, and optimising cash flow when there&apos;s no safety net.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Asili', 'Espresso Room', 'Morning Dew (Head Barista & GM)', 'Artisan'].map(
                    (venue) => (
                      <span
                        key={venue}
                        className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[#b0b0b0]"
                      >
                        {venue}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Act II */}
            <div className="flex gap-6 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-wider">
                    Act II
                  </span>
                  <span className="text-[#b0b0b0] text-sm">3+ years</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                  Financial Planning
                </h3>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  In Sydney, Edmond worked within the Australian financial planning framework —
                  advising on asset allocation, risk, and intergenerational wealth structures. The
                  work demanded precision. A single poorly structured recommendation could cost a
                  client their retirement.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Bravium', 'Fiducian Financial Services', 'Profile Financial Services'].map(
                    (firm) => (
                      <span
                        key={firm}
                        className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[#b0b0b0]"
                      >
                        {firm}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Act III */}
            <div className="flex gap-6 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-wider">
                    Act III
                  </span>
                  <span className="text-[#b0b0b0] text-sm">1+ years</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                  HSNV Group — Risk & Insurance Manager
                </h3>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  In 2024, Edmond returned to Botswana and took on the role of Risk & Insurance
                  Manager at <strong className="text-white">HSNV Group</strong>, one of the
                  country&apos;s leading construction project management and property development
                  firms.
                </p>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  He managed insurance portfolios spanning Contractors All Risk, Professional
                  Indemnity, Public Liability, and Motor Fleet; built a corporate employee benefits
                  program from scratch; maintained regulatory compliance with NBFIRA; and led due
                  diligence for land and investment property acquisitions.
                </p>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  During his tenure, the MD of HSNV Group gave Edmond a direct assignment: take on
                  operational oversight of Tonota FC, a First Division North football club the group
                  had acquired. He assessed operations across players, staff, management, and the
                  fanbase, and put recommendations into action. Tonota FC was promoted to the
                  Botswana Premier League in March 2026.
                </p>
              </div>
            </div>

            {/* Act IV */}
            <div className="flex gap-6 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FF4D2E]/10 border border-[#FF4D2E]/20 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-[#FF4D2E]" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-wider">
                    Act IV
                  </span>
                  <span className="text-[#b0b0b0] text-sm">Present</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                  Independent Builder — Full-Time
                </h3>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  Today, Edmond operates through BridgeArc Digital — a digital services practice that builds
                  websites, web applications, and workflow automations for businesses and
                  institutions.
                </p>
                <p className="text-[#b0b0b0] text-base leading-relaxed">
                  He studies the business first, writes the code second. Every project ships with
                  full documentation and a handover session — you own it, you run it, you're not
                  dependent on him to change a headline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            <div className="md:w-1/3">
              <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
                // Credentials
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-4">
                Qualifications & Experience
              </h2>
            </div>
            <div className="md:w-2/3 flex flex-col gap-8">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">University of Canberra</h3>
                  <p className="text-[#b0b0b0] text-sm">Finance & Financial Planning</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Graduate Diploma in Business Management
                  </h3>
                  <p className="text-[#b0b0b0] text-sm">University of Canberra</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#FF4D2E]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    AMP University Challenge — 4th Place National
                  </h3>
                  <p className="text-[#b0b0b0] text-sm">
                    Competitive financial planning and investment management
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">NBFIRA Compliance Experience</h3>
                  <p className="text-[#b0b0b0] text-sm">
                    Non-Bank Financial Institutions Regulatory Authority, Botswana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Philosophy
          </span>
          <ScrollTextReveal className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tighter mt-8 mb-8 leading-tight">
            &ldquo;If you understand how a business makes money, you can build technology that helps
            it make more.&rdquo;
          </ScrollTextReveal>
          <p className="text-[#b0b0b0] text-lg leading-relaxed max-w-2xl mx-auto">
            BridgeArc Digital was born from a simple observation: most businesses don&apos;t need more features; they
            need more clarity. They need systems they can actually manage.
          </p>
        </div>
      </section>

      {/* Commitments Section */}
      <CommitmentsSection />

      {/* CTA with Cal.com Embed */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Next Steps
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-4 mb-6">
              Schedule a discovery call
            </h2>
            <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute discovery call to discuss your goals and challenges. No commitment is required, just an honest conversation about how I can help.
            </p>
          </div>
          <div className="bg-[#111111] rounded-3xl p-4 md:p-8 border border-white/10 overflow-hidden">
            <CalEmbed />
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
