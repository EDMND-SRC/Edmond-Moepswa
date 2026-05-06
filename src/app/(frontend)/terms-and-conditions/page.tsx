import React from 'react'
import { PolicyLayout } from '@/components/PolicyLayout'

export default function TermsAndConditionsPage() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="April 6, 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing this website, submitting an enquiry, or engaging my services, you agree
        to be bound by these Terms & Conditions. All project engagements are subject to a
        written proposal or statement of work that references these terms. If any term in a
        proposal conflicts with these terms, the proposal term prevails for that specific
        engagement only.
      </p>

      <h2>2. Scope of Services</h2>
      <p>I provide the following services:</p>
      <ul>
        <li>
          <strong>Custom Web Design & Development:</strong> bespoke websites, web
          applications, and CMS-powered platforms built with Next.js, React, TypeScript, and
          Tailwind CSS.
        </li>
        <li>
          <strong>Workflow Automation:</strong> business process automation using Make.com,
          n8n, and API integrations (CRM, email, scheduling, analytics).
        </li>
        <li>
          <strong>SEO / GEO:</strong> technical search engine optimisation, Google Business
          Profile setup, structured data, keyword strategy, and ongoing ranking monitoring.
        </li>
        <li>
          <strong>Retainer Services:</strong> ongoing maintenance, support, content updates,
          and feature development on a monthly subscription basis.
        </li>
        <li>
          <strong>Advisory Services:</strong> technical consulting, pricing strategy, product
          scoping, and technology stack recommendations.
        </li>
        <li>
          <strong>Boilerplate Products:</strong> pre-built starter kits (Next.js + Cloudflare
          Workers + PostgreSQL) customised to client requirements for rapid MVP delivery.
        </li>
      </ul>

      <h2>3. Engagement Process</h2>
      <p>Every project follows this process:</p>
      <ol>
        <li>
          <strong>Discovery Call (free, 30 minutes):</strong> we discuss your business, goals,
          challenges, and requirements. No commitment required.
        </li>
        <li>
          <strong>Proposal:</strong> within 48 hours of the discovery call, I send a scoped
          proposal with transparent pricing, timeline estimates, and deliverables.
        </li>
        <li>
          <strong>Deposit:</strong> upon accepting the proposal, a 50% deposit is required to
          secure your spot in the production schedule and begin work.
        </li>
        <li>
          <strong>Delivery:</strong> I design, build, and deliver the project according to the
          scoped proposal, with agreed review checkpoints.
        </li>
        <li>
          <strong>Final Payment:</strong> the remaining 50% balance is due upon delivery,
          before final deployment or source code handover.
        </li>
        <li>
          <strong>Handover:</strong> documentation, training session, and transfer of all
          credentials and access.
        </li>
      </ol>

      <h2>4. Payment Terms</h2>
      <p>
        <strong>Deposit:</strong> a 50% deposit is required to begin work. This secures your
        spot in the production schedule and covers initial scoping, design, and development
        kickoff.
      </p>
      <p>
        <strong>Balance:</strong> the remaining 50% is due on delivery -- when the final
        project files have been transferred or the website has been launched and approved.
      </p>
      <p>
        <strong>Currency:</strong> all pricing is in Botswana Pula (BWP) unless otherwise
        stated.
      </p>
      <p>
        <strong>Payment methods:</strong> bank transfer (FNB Botswana), DPO PayGate, Orange
        Money, PayPal, or Dodo Payments. Specific payment methods will be confirmed in your
        proposal.
      </p>
      <p>
        <strong>Late payment:</strong> invoices unpaid after 14 days from the due date may
        result in suspension of services, withholding of deliverables, or project cancellation
        in accordance with the Cancellation Policy.
      </p>

      <h2>5. Third-Party Platform Costs</h2>
      <p>
        All third-party platform costs are <strong>borne by the client</strong>. This includes
        hosting (Cloudflare Workers, Netlify), databases (Neon, Supabase), CRMs (HubSpot),
        automation
        tools (Make.com, n8n), email services (Resend, Beehiiv), analytics (PostHog, GA4),
        payment gateways, SMS services, and any other external service.
      </p>
      <p>
        I follow a <strong>free-tier-first policy</strong>: I always design around the best
        available free tier first, and recommend a paid upgrade only when your requirements
        demand it. Where a paid tier is necessary, its cost is disclosed at scoping -- not
        after build.
      </p>

      <h2>6. Delivery Timeline</h2>
      <p>
        Delivery timelines are estimates based on typical project complexity and are included
        in every proposal. <strong>The delivery timeline clock pauses during client review periods.</strong> Delays caused by client feedback cycles, content provision, asset delivery, or
        third-party platform approval processes do not count toward the original delivery
        estimate.
      </p>
      <p>
        Payment gateway approval timelines (DPO PayGate, Orange Money, PayPal, Dodo Payments)
        and WhatsApp Business API approval (Meta Business verification) are <strong>outside my control</strong> and are factored into timeline estimates as
        dependencies, not guaranteed delivery dates.
      </p>

      <h2>7. Revision Policy</h2>
      <p>
        <strong>2 rounds of revisions</strong> are included with every project. A
        &quot;round&quot; means one consolidated batch of changes requested and submitted
        together. Additional revision rounds are quoted separately based on scope and
        complexity.
      </p>
      <p>
        Revision rounds apply to design and content -- not to changes in project scope.
        Requests that fundamentally change the agreed scope (new features, additional pages
        beyond proposal, new integrations) are treated as change requests and quoted
        separately.
      </p>

      <h2>8. Intellectual Property</h2>
      <p>
        All work is custom -- no templates or themes are used (unless a boilerplate build,
        which is explicitly disclosed at scoping). Source files and complete documentation are
        included with every project.
      </p>
      <p>
        <strong>Intellectual property transfers to the client upon full payment.</strong> Until the balance is settled in full, I retain ownership of all deliverables, source
        code, and design assets.
      </p>
      <p>
        <strong>Portfolio rights:</strong> I retain a non-exclusive, perpetual right to
        display completed projects in my portfolio, case studies, and marketing materials. If
        you require a non-disclosure agreement or want the project excluded from my portfolio,
        this can be negotiated during scoping.
      </p>
      <p>
        For <strong>boilerplate products</strong>, you receive a perpetual, non-exclusive
        license to use the starter kit in your own projects. You may not resell or
        redistribute the boilerplate itself as a competing product.
      </p>

      <h2>9. Warranty and Support</h2>
      <p>
        Every project includes a <strong>30-day post-launch warranty</strong> covering bug
        fixes and issues directly attributable to my work. This warranty covers:
      </p>
      <ul>
        <li>Broken functionality caused by errors in my code.</li>
        <li>Visual regressions or layout issues not caused by client modifications.</li>
        <li>Integration failures with third-party services that were working at launch.</li>
      </ul>
      <p>The warranty does not cover:</p>
      <ul>
        <li>Issues caused by client modifications to code or configuration.</li>
        <li>
          Third-party service outages or API changes (e.g., Meta, Google, payment gateways).
        </li>
        <li>New features or scope additions requested after launch.</li>
        <li>
          Performance issues caused by client-uploaded content (e.g., unoptimised images).
        </li>
      </ul>
      <p>
        For ongoing support beyond the warranty period, retainer plans are available starting
        from P2,500/month.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        I will not be liable for any indirect, incidental, special, or consequential damages
        arising out of the use or inability to use my services or deliverables, including but
        not limited to loss of revenue, loss of data, business interruption, or loss of
        goodwill.
      </p>
      <p>
        My <strong>total aggregate liability</strong> is limited to the amount paid by the
        client for the specific engagement giving rise to the claim.
      </p>
      <p>
        I do not guarantee specific business outcomes (e.g., increased revenue, specific
        search engine rankings, conversion rates). SEO and GEO services improve technical
        foundations and visibility -- actual ranking and traffic outcomes depend on market
        conditions, competition, and algorithm changes outside my control.
      </p>

      <h2>11. Payment Gateway Disclaimers</h2>
      <p>
        <strong>DPO PayGate</strong> is the primary local payment gateway for Botswana-based
        businesses, working with FNB Botswana and Stanbic Bank. Merchant account approval is
        subject to the bank&apos;s own criteria and timelines.
      </p>
      <p>
        <strong>Orange Money Web Payments</strong> are available to registered Orange Money
        merchants in Botswana. Registration and approval are managed by Orange Botswana.
      </p>
      <p>
        <strong>PayPal</strong> is available for international payments but does not settle in
        BWP.
      </p>
      <p>
        <strong>Stripe is NOT available</strong> to Botswana-registered businesses as of 2025.
        A registered entity in a supported country (US, UK, EU, etc.) is required to use
        Stripe.
      </p>
      <p>
        All payment gateway integrations require the <strong>client to hold an active merchant account</strong> with the provider. Approval timelines and criteria vary by bank and provider and are outside my control.
      </p>

      <h2>12. WhatsApp Business API Disclaimer</h2>
      <p>
        WhatsApp Business API integration requires <strong>Meta Business verification</strong>. Approval typically takes 1-7 business days but is <strong>not guaranteed</strong>. Approval is at Meta&apos;s sole discretion and may be rejected for unverified business details, non-compliant use cases, or inconsistencies between submitted documents and Meta records.
      </p>
      <p>
        If verification is not obtained, the <strong>WhatsApp click-to-chat link</strong> (free in all builds) remains available as a simple alternative -- no API, no approval, no cost.
      </p>

      <h2>13. Client Responsibilities</h2>
      <p>Clients are responsible for:</p>
      <ul>
        <li>Providing accurate and complete information required for the project.</li>
        <li>
          Providing timely feedback (within the review periods specified in the proposal).
        </li>
        <li>
          Providing brand assets (logos, colour guides, fonts) and content (copy, images) as
          agreed in the proposal.
        </li>
        <li>
          Setting up and maintaining active merchant accounts with payment gateway providers.
        </li>
        <li>
          Ensuring their business complies with applicable regulatory requirements (NBFIRA,
          industry-specific regulations).
        </li>
      </ul>

      <h2>14. Governing Law</h2>
      <p>
        These terms are governed by the laws of the <strong>Republic of Botswana</strong>. Any
        disputes shall be resolved through good-faith negotiation before escalation. If
        negotiation does not resolve the dispute, the matter shall be submitted to mediation
        in Gaborone, Botswana, before any court proceedings.
      </p>

      <h2>15. Force Majeure</h2>
      <p>
        Neither party shall be liable for any failure or delay in performance under these
        terms (except payment obligations) due to causes beyond their reasonable control,
        including but not limited to: acts of God, war, terrorism, civil unrest, government
        action, labour disputes, pandemics, natural disasters, power outages, internet
        infrastructure failures, or third-party service provider outages (including Cloudflare,
        Neon, or payment gateway downtime). If a force majeure event continues for more than
        30 days, either party may terminate the engagement, with the Client paying for all
        work completed up to the termination date.
      </p>

      <h2>16. Severability</h2>
      <p>
        If any provision of these terms is found to be invalid, illegal, or unenforceable by a
        court of competent jurisdiction, the remaining provisions shall remain in full force
        and effect. The invalid or unenforceable provision shall be modified to the minimum
        extent necessary to make it valid and enforceable while preserving the original intent
        of the parties.
      </p>

      <h2>17. Data Processing Agreement (EU Clients)</h2>
      <p>
        For clients in the European Union, where I process personal data on behalf of the
        Client, a separate Data Processing Agreement (DPA) in compliance with GDPR Article 28
        will be executed prior to commencing work. The DPA outlines the scope, purpose, and
        duration of data processing, as well as the rights and obligations of both parties
        regarding data protection.
      </p>

      <h2>18. Entire Agreement</h2>
      <p>
        These Terms & Conditions, together with the project-specific proposal and any
        mutually agreed addenda, constitute the entire agreement between the parties. Any
        prior discussions, representations, or understandings are superseded by these terms.
      </p>

      <h2>19. Contact</h2>
      <p>
        For questions about these Terms & Conditions, contact me at:{' '}
        <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
          edmond.moepswa@gmail.com
        </a>
      </p>
    </PolicyLayout>
  )
}
