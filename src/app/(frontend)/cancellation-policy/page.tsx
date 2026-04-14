import React from 'react'
import { PolicyLayout } from '@/components/PolicyLayout'

export default function CancellationPolicyPage() {
  return (
    <PolicyLayout title="Cancellation Policy" lastUpdated="April 6, 2026">
      <h2>1. Client Cancellation Rights</h2>
      <p>
        You may cancel a service-based project at <strong>any time</strong> with written
        notice via email to{' '}
        <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
          edmond.moepswa@gmail.com
        </a>
        . There is no penalty for cancellation -- you are never locked into a project.
      </p>

      <h2>2. Financial Settlement Upon Cancellation</h2>
      <p>Upon cancellation, the following applies:</p>
      <ul>
        <li>
          <strong>
            Work completed up to the cancellation date will be invoiced pro-rata.
          </strong>{' '}
          The 50% deposit is non-refundable once work has commenced (see Refund Policy).
        </li>
        <li>
          If the value of completed work <strong>exceeds the deposit</strong>, the difference
          will be invoiced separately and is payable within 14 days.
        </li>
        <li>
          If the value of completed work is <strong>less than the deposit</strong>, the
          deposit is retained in full and no additional payment is required.
        </li>
      </ul>
      <p>
        &quot;Work completed&quot; is measured against the milestones and deliverables
        specified in your proposal. Partial milestones are valued proportionally.
      </p>

      <h2>3. Timeline Clock Pauses During Client Review</h2>
      <p>
        The <strong>delivery timeline clock pauses during client review periods</strong>.
        Delays caused by slow feedback, delayed content provision, or late asset delivery do
        not count toward the original delivery estimate.
      </p>
      <p>
        This is not a cancellation -- it is a <strong>timeline adjustment</strong>. The
        project remains active, and work resumes once your feedback or content is received.
      </p>
      <p>
        If review delays extend beyond <strong>30 consecutive days</strong> without any
        communication, I reserve the right to cancel the project in accordance with Section 4
        below.
      </p>

      <h2>4. Cancellation by Edmond</h2>
      <p>I may cancel a project under the following circumstances:</p>
      <ul>
        <li>
          <strong>Client unresponsiveness:</strong> if the client is unresponsive for{' '}
          <strong>30 or more consecutive days</strong> after proposal delivery or after a
          milestone has been submitted for review.
        </li>
        <li>
          <strong>Scope creep without agreement:</strong> if the client repeatedly requests
          work beyond the scoped proposal and refuses to approve a change request.
        </li>
        <li>
          <strong>Non-payment:</strong> if invoices remain unpaid for 14+ days beyond the due
          date.
        </li>
      </ul>
      <p>
        In all cases, I will issue <strong>written notice of intent to cancel</strong> with a{' '}
        <strong>7-day grace period</strong> for the client to respond or resolve the issue.
      </p>
      <p>If I cancel the project:</p>
      <ul>
        <li>
          A <strong>full refund of the deposit</strong> will be issued, less any work already
          delivered and accepted by the client.
        </li>
        <li>All completed work and source files will be transferred to the client.</li>
      </ul>

      <h2>5. Deliverables Upon Cancellation</h2>
      <p>For cancelled projects, the following will be delivered:</p>
      <ul>
        <li>
          <strong>Source files and documentation up to the last completed milestone.</strong>{' '}
          This includes all work paid for (either through deposit or pro-rata invoicing).
        </li>
        <li>
          All credentials and platform access that were created or configured during the
          project.
        </li>
        <li>
          A handover document summarising the project state, what has been completed, and what
          remains.
        </li>
      </ul>
      <p>
        No further work will be performed after cancellation. Any remaining unpaid invoices
        remain payable.
      </p>

      <h2>6. Retainer Cancellation</h2>
      <p>
        Retainers may be cancelled with <strong>30 days&apos; written notice</strong> via
        email. The following applies:
      </p>
      <ul>
        <li>
          The current billing period is <strong>non-refundable</strong>.
        </li>
        <li>
          Any <strong>unused hours within the period do not roll over</strong> and are not
          refundable.
        </li>
        <li>
          Work in progress at the time of cancellation will be completed and delivered before
          the retainer end date, or invoiced pro-rata if incomplete.
        </li>
      </ul>

      <h2>7. Re-Engagement Policy</h2>
      <p>
        If you cancel a project and wish to re-engage later, you are welcome to do so. 
        There are no penalties or reinstatement fees if you decide to come back.
      </p>
      <p>
        Re-engagement follows the standard process: a discovery call (which may be abbreviated
        if circumstances have not changed significantly), an updated proposal reflecting the
        current project state, and a new deposit to resume work.
      </p>
      <p>
        I understand that business priorities shift, budgets change, and timing is not always
        right. A cancelled project today may be the right project six months from now.
      </p>

      <h2>8. Discovery Call &amp; Rescheduling</h2>
      <p>If you need to reschedule a discovery call or project kickoff:</p>
      <ul>
        <li>
          <strong>More than 24 hours notice:</strong> no penalty. Reschedule using the link in
          your confirmation email.
        </li>
        <li>
          <strong>Less than 24 hours notice or no-show:</strong> a rescheduling fee may apply
          at my discretion. Repeated no-shows may result in cancellation of the engagement.
        </li>
      </ul>

      <h2>9. Contact</h2>
      <p>
        For cancellation enquiries, contact me at:{' '}
        <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
          edmond.moepswa@gmail.com
        </a>
      </p>
    </PolicyLayout>
  )
}
