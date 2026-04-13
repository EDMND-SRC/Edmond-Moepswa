import React from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/motion-wrapper'

export default function RefundPolicyPage() {
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
            Refund &amp; Dispute Policy
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
            <h2>1. Overview</h2>
            <p>
              Due to the custom, service-based nature of my work and the digital nature of products
              sold, the following refund policy applies to all engagements. By engaging my services
              or purchasing digital products, you acknowledge and accept these terms.
            </p>

            <h2>2. Service-Based Projects -- Deposit Policy</h2>
            <p>
              Every project begins with a <strong>50% deposit</strong>, which secures your spot in
              the production schedule and covers initial scoping, design, and development kickoff.
            </p>
            <p>
              <strong>Deposits are non-refundable once work has commenced.</strong> &quot;Work
              commences&quot; means I have begun scoping, wireframing, designing, or developing your
              project after receiving the deposit and signed proposal.
            </p>
            <p>
              If the project is cancelled <em>before</em> any work has begun (i.e., within 48 hours
              of deposit payment and before I have started any project activity), a full refund will
              be issued.
            </p>

            <h2>3. Cancellation by Edmond</h2>
            <p>
              If I (Edmond) cancel the project for any reason -- including unavailability, scope
              disagreement, or inability to deliver -- you will receive a{' '}
              <strong>full refund of your deposit</strong>, less the value of any work already
              delivered and accepted by you.
            </p>

            <h2>4. Cancellation by Client Mid-Project</h2>
            <p>If you cancel after work has commenced, the following applies:</p>
            <ul>
              <li>
                The deposit is <strong>retained</strong> to compensate for time and resources
                already invested.
              </li>
              <li>
                Any work completed beyond the deposit value will be{' '}
                <strong>invoiced pro-rata</strong> at the hourly or milestone rate specified in your
                proposal.
              </li>
              <li>
                You will be billed for all work completed up to the cancellation date, regardless of
                whether the deliverables are accepted.
              </li>
            </ul>
            <p>
              Upon settlement of all outstanding invoices, all completed work and source files will
              be transferred to you in accordance with the Cancellation Policy.
            </p>

            <h2>5. Digital Products (Boilerplates, Templates, Guides)</h2>
            <p>
              Boilerplate products, templates, guides, checklists, and other digital downloads are{' '}
              <strong>non-refundable once delivered or downloaded</strong>.
            </p>
            <p>
              Because these products are digital goods that can be copied, retained, and used
              indefinitely, refunds cannot be processed after delivery has occurred. This is
              consistent with standard practice for digital product sales.
            </p>
            <p>
              If you experience a technical issue with digital product delivery (e.g., broken
              download link, corrupted file), please contact me directly at{' '}
              <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
                edmond.moepswa@gmail.com
              </a>{' '}
              and I will resolve it promptly -- either by re-delivering the product or issuing a
              refund if the issue cannot be resolved.
            </p>

            <h2>6. Retainer Services</h2>
            <p>
              Retainer fees are billed <strong>monthly in advance</strong>. The following applies to
              retainer refunds:
            </p>
            <ul>
              <li>
                If a retainer is cancelled mid-month, the current month&apos;s fee is{' '}
                <strong>non-refundable</strong>.
              </li>
              <li>
                <strong>Unused hours do not roll over</strong> to the next billing period and are
                not refundable.
              </li>
              <li>
                New scope items that exceed retainer hours are quoted separately and billed
                independently of the retainer fee.
              </li>
            </ul>

            <h2>6.1 EU Right of Withdrawal (Digital Products)</h2>
            <p>
              If you are a consumer in the European Union, you have the right to withdraw from this
              contract within 14 days without giving any reason, in accordance with EU Directive
              2011/83/EU. The withdrawal period expires 14 days after the day of conclusion of the
              contract.
            </p>
            <p>
              <strong>Exemption for digital products:</strong> If you expressly consent to the
              performance of the digital product beginning before the end of the 14-day withdrawal
              period, and you acknowledge that you will lose your right of withdrawal once the
              contract is fully performed (e.g., a digital download is delivered), you will no
              longer be able to exercise the right of withdrawal. This consent is obtained at the
              point of purchase for all digital products.
            </p>
            <p>
              To exercise the right of withdrawal, you must inform me of your decision by sending a
              clear statement (e.g., a letter sent by email) to edmond.moepswa@gmail.com before the
              14-day period expires.
            </p>

            <h2>7. Refund Processing</h2>
            <p>
              Where a refund is applicable under this policy, it will be processed within{' '}
              <strong>14 business days</strong> of the refund being agreed or determined. Refunds
              will be issued using the same payment method used for the original transaction, unless
              otherwise agreed.
            </p>

            <h2>8. Dispute Resolution</h2>
            <p>All disputes are resolved through the following process:</p>
            <ol>
              <li>
                <strong>Good-faith negotiation:</strong> I encourage clients to contact me directly
                at{' '}
                <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
                  edmond.moepswa@gmail.com
                </a>{' '}
                to resolve any issues. I commit to responding to all service-related concerns within
                48 business hours.
              </li>
              <li>
                <strong>Mediation:</strong> If good-faith negotiation does not resolve the dispute
                within 30 days, the matter shall be submitted to mediation in Gaborone, Botswana,
                before any court proceedings.
              </li>
              <li>
                <strong>Governing law:</strong> If mediation does not resolve the dispute, the
                matter shall be handled under the laws of the Republic of Botswana.
              </li>
            </ol>

            <h2>9. Contact</h2>
            <p>
              For refund or dispute enquiries, contact me at:{' '}
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
