import Link from 'next/link'
import { Calendar, ExternalLink, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { getTechIcon } from '@/lib/icon-registry'
import { CAL_USERNAME, CAL_NAMESPACE } from '@/lib/constants'
import CalEmbed from '@/components/cal/CalEmbed'
import ProcessSection from '@/components/homepage/ProcessSection'
import { services, extractTechFromFeature, type Service } from './data'

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      id={`service-${service.id}`}
      className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]"
    >
      <div className="p-6 md:p-8 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[#FF4D2E] text-sm font-bold tracking-wider">{service.id}</span>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
            {service.title}
          </h3>
        </div>
        <p className="text-[#b0b0b0] text-base leading-relaxed">{service.description}</p>
      </div>
      <div className="p-6 md:p-8 flex flex-col gap-6">
        {service.pricingTiers.map((tier) => (
          <div
            key={`${service.id}-${tier.name}`}
            className="border border-white/10 rounded-xl p-5 md:p-6 bg-white/[0.02]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h4 className="text-lg md:text-xl font-medium text-white">{tier.name}</h4>
                {tier.timeline && <p className="text-[#b0b0b0] text-sm mt-1">{tier.timeline}</p>}
              </div>
              <span className="text-xl md:text-2xl font-bold text-[#FF4D2E] tracking-tight">
                {tier.price}
              </span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tier.features.map((feature) => {
                // Try to extract technology name from feature text and show icon
                const techMatch = extractTechFromFeature(feature)
                const Icon = techMatch ? getTechIcon(techMatch) : null

                return (
                  <li key={feature} className="flex items-start gap-2 text-[#b0b0b0] text-sm">
                    {Icon ? (
                      <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-60" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#FF4D2E]" />
                    )}
                    {feature}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        {service.notes && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#FF4D2E]" />
            <p className="text-[#b0b0b0] text-sm leading-relaxed">{service.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main id="main-content" className="bg-[#0a0a0a] text-white">
      {/* Hero Banner */}
      <section className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Services & Pricing
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-6 mb-6">
            Transparent pricing for every service
          </h1>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl leading-relaxed">
            From landing pages to full-scale platforms, every engagement includes thorough documentation and a complete handover session.
          </p>
        </div>
      </section>

      {/* Platform Availability Notes */}
      <section className="py-16 md:py-20 px-6 md:px-10 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tighter mb-8">
            Platform Availability & Fees
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">
                  Payment Gateway Availability (Botswana)
                </h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  <strong className="text-white">Available:</strong> DPO PayGate, Orange Money, Dodo
                  Payments, PayPal
                </p>
                <p className="text-[#b0b0b0] text-sm leading-relaxed mt-1">
                  <strong className="text-red-400">Unavailable in Botswana:</strong> Stripe. If you
                  require Stripe integration, you will need a registered entity in a supported
                  country (US, UK, EU, etc.).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
              <Info className="w-5 h-5 shrink-0 text-[#FF4D2E] mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">Platform Fees & Free Tiers</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  All third-party platform fees are borne by the client. I default to free tiers
                  first:
                </p>
                <ul className="text-[#b0b0b0] text-sm leading-relaxed mt-2 flex flex-col gap-1">
                  <li>• Make.com: 1,000 operations/month free</li>
                  <li>• n8n self-hosted: Unlimited, free on your VPS</li>
                  <li>• Zapier: 100 tasks/month free</li>
                  <li>• Cloudflare Workers: Free plan available for low-traffic deployments</li>
                  <li>• Supabase: Free tier includes 500MB database</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">WhatsApp API Approval Risk</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  WhatsApp Business API requires Meta approval for your business phone number and
                  message templates. Approval is not guaranteed and can take 1–4 weeks. I will guide
                  you through the application, but the final decision rests with Meta. Alternative
                  channels (SMS, Telegram, email) are available as fallbacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Design Add-Ons */}
      <section className="py-16 md:py-20 px-6 md:px-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tighter mb-4">
            Web Design & Development — Add-Ons
          </h2>
          <p className="text-[#b0b0b0] text-base leading-relaxed mb-8">
            Available on top of any configuration. Final pricing confirmed at scoping.
          </p>

          {/* Scale */}
          <h3 className="text-lg font-medium text-white mb-4">Scale</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: 'Additional inner page',
                price: '+P1,800/page',
                notes: 'About, Services, Team, Contact, etc.',
              },
              {
                name: 'Blog / news module',
                price: '+P3,500',
                notes: 'CMS-powered; client updates content',
              },
              {
                name: 'Portfolio / case study module',
                price: '+P2,000',
                notes: 'Grid or carousel; linked to CMS',
              },
              {
                name: 'Team / staff directory',
                price: '+P2,000',
                notes: 'Filterable profiles; CMS-editable',
              },
            ].map((addon) => (
              <div
                key={addon.name}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="text-white text-sm font-medium">{addon.name}</span>
                  <p className="text-[#b0b0b0] text-xs mt-0.5">{addon.notes}</p>
                </div>
                <span className="text-[#FF4D2E] text-sm font-medium whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          {/* Design & Content */}
          <h3 className="text-lg font-medium text-white mb-4">Design &amp; Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: 'Scroll animations & micro-interactions',
                price: '+P3,000',
                notes: 'Entrance reveals, parallax, hover states',
              },
              {
                name: 'Custom illustration / icon set',
                price: 'from +P3,500',
                notes: 'Bespoke visual assets',
              },
              {
                name: 'Brand design system',
                price: '+P3,500',
                notes: 'Typography, colour tokens, component library',
              },
              {
                name: 'Professional copywriting',
                price: '+P2,500/3 pages',
                notes: 'Conversion-oriented copy; not AI-generated',
              },
            ].map((addon) => (
              <div
                key={addon.name}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="text-white text-sm font-medium">{addon.name}</span>
                  <p className="text-[#b0b0b0] text-xs mt-0.5">{addon.notes}</p>
                </div>
                <span className="text-[#FF4D2E] text-sm font-medium whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          {/* Static Mode Discount */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20 mb-8">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-white font-medium mb-1">Static Mode Discount</h4>
              <p className="text-[#b0b0b0] text-sm leading-relaxed">
                Clients who prefer a static, zero-motion design (no animations) receive a{' '}
                <strong className="text-green-400">P500 reduction</strong> on the project total.
                Specify at scoping.
              </p>
            </div>
          </div>

          {/* Brand Design System — Standalone Add-On */}
          <div className="border border-white/10 rounded-xl p-5 md:p-6 bg-white/[0.02] mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h4 className="text-lg md:text-xl font-medium text-white">Brand Design System</h4>
                <p className="text-[#b0b0b0] text-sm mt-1">
                  Standalone brand identity package (logo system, colour palette, typography system,
                  design tokens, and documented brand guidelines) available as an add-on for any
                  Foundation build.
                </p>
              </div>
              <span className="text-xl md:text-2xl font-bold text-[#FF4D2E] tracking-tight">
                P3,500
              </span>
            </div>
          </div>

          {/* Functionality */}
          <h3 className="text-lg font-medium text-white mb-4">Functionality</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: 'Booking / scheduling integration',
                price: '+P2,500',
                notes: 'Cal.com embed or custom booking logic',
              },
              {
                name: 'E-commerce / payment integration',
                price: 'from +P9,000',
                notes: 'DPO, Orange Money, Dodo, PayPal',
              },
              {
                name: 'Member area / gated content',
                price: '+P5,000',
                notes: 'Login-protected pages or client portal',
              },
              {
                name: 'Multilingual setup',
                price: '+P3,500/language',
                notes: 'i18n-ready architecture',
              },
              { name: 'Live chat integration', price: '+P1,800', notes: 'Crisp or Intercom' },
            ].map((addon) => (
              <div
                key={addon.name}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="text-white text-sm font-medium">{addon.name}</span>
                  <p className="text-[#b0b0b0] text-xs mt-0.5">{addon.notes}</p>
                </div>
                <span className="text-[#FF4D2E] text-sm font-medium whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          {/* Communication */}
          <h3 className="text-lg font-medium text-white mb-4">Communication</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: 'WhatsApp API integration',
                price: '+P5,000',
                notes: 'Requires Meta Business verification — not guaranteed',
              },
              {
                name: 'SMS notifications (Twilio/AWS SNS)',
                price: '+P3,500',
                notes: 'Outbound only; ~$0.10 USD/msg',
              },
              { name: 'Telegram bot / channel', price: '+P2,500', notes: 'No approval required' },
            ].map((addon) => (
              <div
                key={addon.name}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="text-white text-sm font-medium">{addon.name}</span>
                  <p className="text-[#b0b0b0] text-xs mt-0.5">{addon.notes}</p>
                </div>
                <span className="text-[#FF4D2E] text-sm font-medium whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          {/* Growth & Performance */}
          <h3 className="text-lg font-medium text-white mb-4">Growth &amp; Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: 'Cookie consent & compliance',
                price: '+P1,500',
                notes: 'GDPR-compliant banner',
              },
              {
                name: 'Uptime & performance monitoring',
                price: '+P1,500',
                notes: 'Better Stack; monthly reports',
              },
            ].map((addon) => (
              <div
                key={addon.name}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="text-white text-sm font-medium">{addon.name}</span>
                  <p className="text-[#b0b0b0] text-xs mt-0.5">{addon.notes}</p>
                </div>
                <span className="text-[#FF4D2E] text-sm font-medium whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Options */}
          <h3 className="text-lg font-medium text-white mb-4">Delivery Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Priority delivery', price: '+20%', notes: 'Timeline reduced ~30%' },
              { name: 'Rush delivery', price: '+35%', notes: 'Timeline reduced ~50%' },
              {
                name: 'Phased delivery',
                price: 'No surcharge',
                notes: 'Handed over in agreed stages',
              },
            ].map((addon) => (
              <div
                key={addon.name}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <span className="text-white text-sm font-medium">{addon.name}</span>
                  <p className="text-[#b0b0b0] text-xs mt-0.5">{addon.notes}</p>
                </div>
                <span className="text-[#FF4D2E] text-sm font-medium whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Timeline Methodology */}
      <section className="py-16 md:py-20 px-6 md:px-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tighter mb-8">
            Delivery Timeline Methodology
          </h2>
          <div className="flex flex-col gap-4 text-[#b0b0b0] text-base leading-relaxed">
            <p>
              All timelines are estimates based on typical project complexity. Actual delivery
              depends on:
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#FF4D2E] mt-0.5" />
                <span>
                  <strong className="text-white">Scope clarity:</strong> Well-defined requirements
                  move faster. Discovery calls help align expectations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#FF4D2E] mt-0.5" />
                <span>
                  <strong className="text-white">Client review periods:</strong> The delivery
                  timeline clock pauses during client review periods. Faster feedback = faster
                  delivery.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#FF4D2E] mt-0.5" />
                <span>
                  <strong className="text-white">Content readiness:</strong> Having copy, images,
                  and brand assets ready before kickoff accelerates the build.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#FF4D2E] mt-0.5" />
                <span>
                  <strong className="text-white">Third-party dependencies:</strong> Payment gateway
                  setup, domain registration, and hosting configuration can add time.
                </span>
              </li>
            </ul>
            <p className="mt-4">
              <strong className="text-white">Priority delivery (+20%):</strong> Your project jumps
              the queue with dedicated daily work blocks.
              <br />
              <strong className="text-white">Rush delivery (+35%):</strong> Weekend and evening work
              to hit aggressive deadlines.
              <br />
              <strong className="text-white">Phased delivery (no surcharge):</strong> Large projects
              split into deliverable milestones. Recommended for complex builds.
            </p>
          </div>
        </div>
      </section>

      {/* Free Tier Maximisation Policy */}
      <section className="py-16 md:py-20 px-6 md:px-10 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tighter mb-6">
            Free Tier Maximisation Policy
          </h2>
          <p className="text-[#b0b0b0] text-base leading-relaxed mb-6">
            I believe in keeping your running costs as low as possible. Every system I build is
            designed to maximise free tiers before recommending paid upgrades:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { platform: 'Make.com', free: '1,000 ops/month', paid: 'From $9/month' },
              {
                platform: 'n8n (self-hosted)',
                free: 'Unlimited',
                paid: 'VPS cost only (~$5/month)',
              },
              { platform: 'Zapier', free: '100 tasks/month', paid: 'From $19.99/month' },
              { platform: 'Supabase', free: '500MB DB, 1GB bandwidth', paid: 'From $25/month' },
              {
                platform: 'Cloudflare Workers',
                free: 'Free plan available',
                paid: 'Workers Paid from $5/month',
              },
              { platform: 'Resend', free: '3,000 emails/month', paid: 'From $20/month' },
              { platform: 'HubSpot', free: 'CRM, 1M contacts', paid: 'From $15/month (Starter)' },
              { platform: 'PostHog', free: '1M events/month', paid: 'From $0 (open-source)' },
            ].map((item) => (
              <div
                key={item.platform}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500 mt-0.5" />
                <div>
                  <span className="text-white text-sm font-medium">{item.platform}</span>
                  <p className="text-[#b0b0b0] text-xs mt-1">
                    Free: {item.free}{' '}
                    {item.paid !== 'VPS cost only (~$5/month)' && `· Paid: ${item.paid}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Catalogue */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          <div>
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Service Catalogue
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-4">
              Choose your service
            </h2>
          </div>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Next Steps
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mt-4 mb-6">
              Not sure which service you need?
            </h2>
            <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute discovery call to discuss your goals. I&apos;ll recommend the right approach, even if it&apos;s not one of my services.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              data-cal-namespace={CAL_NAMESPACE}
              data-cal-link={`${CAL_USERNAME}/${CAL_NAMESPACE}`}
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Free Discovery Call
            </button>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              Browse Free Resources
            </Link>
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
