import React from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/motion-wrapper'

export default function LegalRestrictionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <Link
            href="/"
            className="text-[#FF4D2E] text-sm font-medium mb-8 inline-block hover:underline"
          >
            &larr; Back to Homepage
          </Link>

          <h1 className="text-4xl md:text-5xl font-normal mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Legal Restrictions &amp; Disclaimers
          </h1>

          <p className="text-[#a3a3a3] text-sm mb-12 italic">Last Updated: April 6, 2026</p>

          <div
            className="prose prose-invert prose-orange max-w-none
            prose-headings:text-white prose-headings:font-medium
            prose-p:text-[#a3a3a3] prose-p:leading-relaxed
            prose-li:text-[#a3a3a3]
            prose-strong:text-white
          "
          >
            <p>
              This page documents important legal and practical restrictions that affect the
              services I deliver. These restrictions arise from platform limitations, regulatory
              environments, and geographic constraints. They are not within my control and should be
              understood before engaging my services.
            </p>

            <h2>1. Payment Gateway Availability</h2>
            <p>
              Not every payment platform operates in every country or accepts every merchant. The
              following reflects the current situation for Botswana-based businesses as of the last
              update date:
            </p>

            <h3>1.1 Unavailable in Botswana</h3>
            <ul>
              <li>
                <strong>Stripe:</strong> Not available to Botswana-registered businesses. Stripe
                does not support merchant accounts in Botswana and cannot be used for local BWP
                settlement. A registered entity in a supported country (US, UK, EU, Australia, etc.)
                is required. <strong>Shopify Payments</strong> (powered by Stripe) is similarly
                unavailable in Botswana.
              </li>
            </ul>

            <h3>1.2 Available for Local BWP Settlement</h3>
            <ul>
              <li>
                <strong>DPO PayGate (Network International):</strong> The primary established local
                gateway. Works with FNB Botswana and Stanbic Bank. Supports Visa, Mastercard,
                American Express, Online EFT, and mobile money. Merchant account required; setup
                involves bank approval. PCI DSS Level 1 compliant. Approval typically takes 5-15
                business days but varies by bank.
              </li>
              <li>
                <strong>Orange Money Web Payments:</strong> Available to registered Orange Money
                merchants in Botswana. Excellent for reaching unbanked and mobile-first customers.
                Registration is managed through Orange Botswana.
              </li>
            </ul>

            <h3>1.3 Available for International Transactions</h3>
            <ul>
              <li>
                <strong>PayPal:</strong> Available for international customer payments. Useful for
                international buyer trust. Does not settle in BWP; funds are held in USD or other
                supported currencies.
              </li>
              <li>
                <strong>Dodo Payments:</strong> Operates as Merchant of Record; handles
                international tax and compliance across 150+ countries and 80+ currencies. Suitable
                for digital products, SaaS, and subscriptions sold internationally. Not a local BWP
                gateway.
              </li>
              <li>
                <strong>Lemon Squeezy:</strong> Merchant of Record for international digital product
                and SaaS sales. Handles tax compliance globally. Not available for local BWP
                settlement.
              </li>
            </ul>

            <p>
              <strong>Important:</strong> All payment gateway integrations require the client to
              hold an active merchant account with the provider. Approval timelines and criteria
              vary by bank and provider and are <strong>outside my control</strong>.
            </p>

            <h2>2. WhatsApp Business API</h2>
            <p>
              WhatsApp Business API integration is offered as an add-on service (P5,000). However,
              the following restrictions apply:
            </p>
            <ul>
              <li>
                <strong>Meta Business verification is required.</strong> This requires valid
                business registration documents and an active Meta Business Manager account.
              </li>
              <li>
                <strong>Approval typically takes 1-7 business days</strong> but can be delayed or
                rejected.
              </li>
              <li>
                <strong>Approval is not guaranteed</strong> and is entirely at Meta&apos;s sole
                discretion.
              </li>
              <li>
                <strong>Common rejection reasons include:</strong> unverified business details,
                non-compliant use cases (e.g., political content, adult content, financial services
                without proper licensing), inconsistencies between submitted documents and Meta
                records, and prior policy violations.
              </li>
              <li>
                <strong>Costs are conversation-based.</strong> WhatsApp charges per conversation
                (marketing, utility, authentication, and service categories priced differently).
                These costs are borne by the client and are separate from my integration fee.
              </li>
            </ul>
            <p>
              <strong>Alternative: WhatsApp Click-to-Chat.</strong> The{' '}
              <code className="text-[#FF4D2E]">wa.me/[number]?text=[message]</code> link requires no
              API, no approval, and no cost. It is included by default in all website builds at no
              extra cost. Users clicking the link are redirected to WhatsApp with a pre-filled
              message.
            </p>

            <h2>3. SMS in Botswana</h2>
            <p>SMS integration has the following limitations for Botswana-based businesses:</p>
            <ul>
              <li>
                <strong>Short codes are not available</strong> in Botswana through major
                international SMS providers (Twilio, AWS SNS).
              </li>
              <li>
                <strong>Outbound SMS is supported</strong> via Twilio and AWS SNS using{' '}
                <strong>alphanumeric sender IDs</strong> (e.g., &quot;YourBrand&quot; instead of a
                phone number).
              </li>
              <li>
                <strong>Two-way SMS is not supported</strong> in Botswana through these providers.
                You can send messages but cannot receive replies to a dedicated number.
              </li>
              <li>
                <strong>Per-message cost</strong> is approximately $0.10 USD to Botswana numbers,
                borne by the client.
              </li>
              <li>
                For two-way SMS requirements, a local Botswana SMS aggregator may be necessary,
                which involves separate contracts and costs.
              </li>
            </ul>

            <h2>4. Merchant Account Requirements</h2>
            <p>
              <strong>
                All payment, SMS, and communication platform integrations require the client to hold
                active accounts
              </strong>{' '}
              with the respective providers. I can guide you through the application process and
              provide documentation support, but I cannot:
            </p>
            <ul>
              <li>Apply for merchant accounts on your behalf.</li>
              <li>Guarantee approval by any provider.</li>
              <li>Expedite approval timelines.</li>
              <li>Act as a proxy merchant of record for local BWP transactions.</li>
            </ul>

            <h2>5. Approval Timelines and Criteria</h2>
            <p>
              Approval processes for payment gateways, WhatsApp Business API, and other regulated
              platforms involve:
            </p>
            <ul>
              <li>Business registration verification.</li>
              <li>Director/owner identity verification.</li>
              <li>Bank account verification.</li>
              <li>Use-case and compliance review.</li>
            </ul>
            <p>
              <strong>
                Timelines and criteria are set by the platform providers and are outside my control.
              </strong>{' '}
              I factor typical approval timelines into project estimates, but delays caused by the
              approval process do not count toward my delivery commitments.
            </p>

            <h2>6. Regulatory Compliance</h2>
            <p>
              For clients operating in regulated industries (financial services, insurance,
              healthcare, legal services):
            </p>
            <ul>
              <li>
                Websites and applications I build are{' '}
                <strong>informational and lead-generation focused only</strong>. They are not built
                to facilitate regulated transactions.
              </li>
              <li>
                The client is responsible for ensuring that content and functionality meet{' '}
                <strong>NBFIRA</strong> (Non-Bank Financial Institutions Regulatory Authority), Bank
                of Botswana, or other applicable regulatory disclosure requirements.
              </li>
              <li>
                Required regulatory disclaimers, compliance copy, and licensing references are the
                client&apos;s responsibility to provide and approve. I format them within the design
                -- content accuracy and legal compliance remain the client&apos;s obligation.
              </li>
              <li>
                I do not provide legal, tax, or regulatory compliance advice. Where compliance is
                required, I recommend engaging a qualified legal professional.
              </li>
            </ul>

            <h2>7. Pricing Accuracy Disclaimer</h2>
            <p>
              All prices published on this website (starting prices, package prices, retainer
              prices) are <strong>starting points and estimates only</strong>. Final pricing is
              confirmed during the scoping process and documented in your proposal.
            </p>
            <p>
              Factors that affect final pricing include: project complexity, number of pages or
              features, third-party integration requirements, content volume, revision rounds beyond
              the included allowance, and any custom functionality not covered in standard packages.
            </p>
            <p>
              Third-party platform costs (hosting, databases, CRMs, payment gateways, SMS, email
              services) are <strong>never included</strong> in my fees and are borne by the client.
            </p>

            <h2>8. Platform Availability Changes</h2>
            <p>
              Platform availability, pricing, features, and policies can change without notice. The
              information on this page is accurate as of the last update date but should be{' '}
              <strong>verified per-project at scoping</strong>. I do not guarantee that any
              third-party platform will remain available, free, or unchanged.
            </p>
            <p>
              If a platform referenced in your proposal becomes unavailable or changes its pricing
              materially before your project begins, I will notify you and propose alternatives.
              This does not constitute a breach of the proposal terms.
            </p>

            <h2>9. Permitted Use of Free Resources</h2>
            <p>
              Free resources available on this website (checklists, guides, templates) are provided
              under a limited, non-exclusive license for personal or internal business use. You may
              not:
            </p>
            <ul>
              <li>Modify or redistribute materials for commercial resale.</li>
              <li>Use materials for any public display without attribution.</li>
              <li>Attempt to decompile or reverse engineer any software or templates.</li>
              <li>Remove any copyright or proprietary notations.</li>
            </ul>

            <h2>10. Contact</h2>
            <p>
              For questions about any legal restriction or disclaimer on this page, contact me at:{' '}
              <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
                edmond.moepswa@gmail.com
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
