import React from 'react'
import { PolicyLayout } from '@/components/PolicyLayout'

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="April 6, 2026">
      <p>
        This Privacy Policy describes how Edmond Moepswa (&quot;I&quot;, &quot;me&quot;, or
        &quot;my&quot;) collects, uses, stores, and protects your personal information when you
        visit this website, engage my services, or download digital products.
      </p>

      <h2>1. Who I Am</h2>
      <p>
        I am an independent software developer and digital services consultant based in Gaborone,
        Botswana. I operate as a sole proprietor. For the purposes of this policy, I am the data
        controller for personal information collected through this website.
      </p>

      <h2>2. Information I Collect</h2>

      <h3>2.1 Information You Provide Directly</h3>
      <ul>
        <li>
          <strong>Contact form submissions:</strong> name, email address, phone number, and message
          content.
        </li>
        <li>
          <strong>Cal.com booking information:</strong> name, email address, phone number, and any
          notes you include when scheduling a discovery call.
        </li>
        <li>
          <strong>Project engagement data:</strong> business information, brand assets, and
          operational details shared during the scoping and delivery process.
        </li>
        <li>
          <strong>Gumroad purchases:</strong> name, email address, and purchase history for digital
          product downloads (processed by Gumroad as merchant of record).
        </li>
        <li>
          <strong>Make.com webhook data:</strong> form submissions, lead data, and automation
          payloads processed through integration workflows.
        </li>
      </ul>

      <h3>2.2 Information Collected Automatically</h3>
      <ul>
        <li>
          <strong>Analytics data:</strong> page views, session duration, referral sources, device
          type, browser type, and approximate geographic location via PostHog and, where enabled,
          Google Analytics 4 (GA4).
        </li>
        <li>
          <strong>Technical logs:</strong> server request logs, error reports, and performance
          metrics collected by Vercel hosting infrastructure.
        </li>
      </ul>

      <h2>3. How I Use Your Information</h2>
      <ul>
        <li>To respond to enquiries submitted through contact forms or Cal.com bookings.</li>
        <li>To scope, deliver, and manage client projects.</li>
        <li>To communicate with you regarding project updates, deliverables, and invoices.</li>
        <li>To analyse website usage and improve the user experience.</li>
        <li>To deliver digital products purchased through Gumroad.</li>
        <li>To comply with applicable legal obligations.</li>
      </ul>

      <h2>4. Legal Basis for Processing</h2>
      <p>
        For visitors from the European Economic Area (EEA), I process personal data under the
        following lawful bases under the GDPR:
      </p>
      <ul>
        <li>
          <strong>Consent:</strong> when you submit a contact form, book a call, or subscribe to a
          mailing list.
        </li>
        <li>
          <strong>Contractual necessity:</strong> when processing is required to deliver services
          under a client engagement.
        </li>
        <li>
          <strong>Legitimate interests:</strong> for website analytics, security monitoring, and
          business improvement, where these interests are not overridden by your rights.
        </li>
      </ul>

      <h2>5. Data Protection in Botswana</h2>
      <p>
        As of the last update date, Botswana does not yet have a comprehensive standalone data
        protection law equivalent to the GDPR. However, data protection obligations arise under:
      </p>
      <ul>
        <li>
          The <strong>Cybercrime and Computer Related Crimes Act (2007)</strong>, which addresses
          unauthorised access to and misuse of electronic data.
        </li>
        <li>
          Sectoral regulations issued by the <strong>Bank of Botswana</strong> and{' '}
          <strong>NBFIRA</strong> that impose data handling requirements on financial services and
          insurance entities.
        </li>
        <li>
          Constitutional protections against unlawful search and seizure, which extend to certain
          forms of data privacy.
        </li>
      </ul>
      <p>
        I design all systems with data protection best practices regardless of minimum legal
        requirements, including secure storage, encrypted transmission, and access controls.
      </p>

      <h2>6. Third-Party Services and Data Sharing</h2>
      <p>
        I use the following third-party services to operate this website and deliver services. Each
        service has its own privacy policy:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (Hosting) -- Server infrastructure, edge network, and
          serverless functions. Vercel is SOC 2 Type II compliant. Data may be processed in the
          United States and other regions where Vercel operates.{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4D2E]"
          >
            Vercel Privacy Policy
          </a>
        </li>
        <li>
          <strong>Cal.com</strong> (Scheduling) -- Discovery call bookings. Processes name, email,
          phone number, and timezone.{' '}
          <a
            href="https://cal.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4D2E]"
          >
            Cal.com Privacy Policy
          </a>
        </li>
        <li>
          <strong>Make.com (Integromat)</strong> (Automation) -- Workflow automation and webhook
          processing. May process form submissions, lead data, and CRM integration payloads.{' '}
          <a
            href="https://www.make.com/en/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4D2E]"
          >
            Make.com Privacy Policy
          </a>
        </li>
        <li>
          <strong>Gumroad, Inc.</strong> (Digital Products) -- Merchant of record for digital
          product sales. Processes payment and customer data.{' '}
          <a
            href="https://gumroad.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4D2E]"
          >
            Gumroad Privacy Policy
          </a>
        </li>
        <li>
          <strong>PostHog Inc.</strong> (Product Analytics) -- Website usage analytics. May collect
          page views, session recordings, and event data.{' '}
          <a
            href="https://posthog.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4D2E]"
          >
            PostHog Privacy Policy
          </a>
        </li>
        <li>
          <strong>Google LLC</strong> (Google Analytics 4, where enabled) -- Website analytics.
          Processes usage data and demographic information.{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4D2E]"
          >
            Google Privacy Policy
          </a>
        </li>
      </ul>
      <p>
        I do not sell personal information to third parties. I do not share client data with other
        clients or use one client&apos;s confidential information in another client&apos;s project.
      </p>

      <h2>7. Cookies</h2>
      <p>I use the following categories of cookies:</p>
      <ul>
        <li>
          <strong>Essential cookies:</strong> required for website functionality (session
          management, security). These cannot be disabled.
        </li>
        <li>
          <strong>Analytics cookies:</strong> PostHog and, where enabled, Google Analytics 4 cookies
          to understand website usage patterns. These help me improve the site experience.
        </li>
        <li>
          <strong>Functional cookies:</strong> Cal.com booking cookies to remember your preferences
          during the scheduling flow.
        </li>
      </ul>
      <p>
        You can control cookies through your browser settings. Disabling analytics cookies will not
        affect core website functionality.
      </p>

      <h2>8. Data Retention</h2>
      <ul>
        <li>
          <strong>Contact form submissions and Cal.com bookings:</strong> retained for 12 months
          from the date of submission, after which they are deleted unless a client relationship is
          established.
        </li>
        <li>
          <strong>Client project data:</strong> retained for the duration of the engagement and for
          24 months thereafter for warranty, support, and reference purposes, unless the client
          requests earlier deletion.
        </li>
        <li>
          <strong>Analytics data:</strong> PostHog data is retained for 12 months. GA4 data is
          retained for 14 months (default setting).
        </li>
        <li>
          <strong>Server logs (Vercel):</strong> retained for 14 days as per Vercel&apos;s default
          retention policy.
        </li>
        <li>
          <strong>Gumroad purchase records:</strong> retained by Gumroad as merchant of record per
          their own retention schedule. I receive minimal purchase data (name, email, product) for
          fulfilment purposes.
        </li>
      </ul>

      <h2>9. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the following rights:</p>
      <ul>
        <li>
          <strong>Right of access:</strong> request a copy of the personal data I hold about you.
        </li>
        <li>
          <strong>Right to rectification:</strong> request correction of inaccurate personal data.
        </li>
        <li>
          <strong>Right to erasure:</strong> request deletion of your personal data, subject to
          legal retention obligations.
        </li>
        <li>
          <strong>Right to restriction:</strong> request that I limit the processing of your
          personal data.
        </li>
        <li>
          <strong>Right to data portability:</strong> request a machine-readable copy of your data.
        </li>
        <li>
          <strong>Right to object:</strong> object to processing based on legitimate interests.
        </li>
      </ul>
      <p>
        To exercise any of these rights, contact me at{' '}
        <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
          edmond.moepswa@gmail.com
        </a>
        . I will respond within 30 days. If you are in the EEA and believe your rights under the
        GDPR have been violated, you have the right to lodge a complaint with your national data
        protection authority.
      </p>

      <h2>10. International Data Transfers</h2>
      <p>
        Because I use cloud-based services (Vercel, Neon, Supabase, Make.com, Gumroad, PostHog,
        Google), your data may be transferred to and processed in countries outside Botswana,
        including the United States and European Union. These transfers are governed by the
        third-party services&apos; own data transfer mechanisms (e.g., EU Standard Contractual
        Clauses). I do not independently transfer data across borders outside of these service
        relationships.
      </p>

      <h2>11. Data Security</h2>
      <p>
        I implement reasonable technical and organisational measures to protect your personal
        information, including: HTTPS encryption for all data in transit, role-based access controls
        on databases, two-factor authentication on all platforms where available, and regular
        security updates on all systems under my control.
      </p>
      <p>
        However, no method of transmission over the internet is 100% secure. I cannot guarantee
        absolute security of your data.
      </p>

      <h2>11.1 Data Breach Notification</h2>
      <p>
        In the event of a personal data breach that is likely to result in a risk to your rights and
        freedoms, I will notify the relevant supervisory authority within 72 hours of becoming aware
        of the breach, as required under GDPR Article 33. If the breach is likely to result in a
        high risk to your rights and freedoms, I will also notify you directly without undue delay
        (GDPR Article 34). Notification will be sent via the email address you provided.
      </p>

      <h2>11.2 Automated Decision-Making and Profiling</h2>
      <p>
        I do not use automated decision-making or profiling techniques that produce legal effects
        concerning you or similarly significantly affect you, as defined under GDPR Article 22. Any
        future use of such techniques will be communicated to you with an updated privacy policy and
        (where required) your explicit consent will be obtained.
      </p>

      <h2>11.3 Right to Withdraw Consent</h2>
      <p>
        Where processing is based on your consent (e.g., marketing communications), you have the
        right to withdraw your consent at any time, in accordance with GDPR Article 7(3).
        Withdrawing consent does not affect the lawfulness of processing based on consent before its
        withdrawal. You can withdraw consent by using the unsubscribe link in any marketing email or
        by contacting me directly at the email address below.
      </p>

      <h2>12. Children&apos;s Privacy</h2>
      <p>
        This website is not directed to individuals under the age of 16. I do not knowingly collect
        personal information from children. If you believe I have inadvertently collected data from
        a child, please contact me and I will delete it promptly.
      </p>

      <h2>13. Changes to This Policy</h2>
      <p>
        I may update this Privacy Policy from time to time. Changes will be posted on this page with
        an updated &quot;Last Updated&quot; date. Material changes will be communicated through a
        notice on the website homepage.
      </p>

      <h2>14. Contact</h2>
      <p>
        For privacy-related enquiries, contact me at:{' '}
        <a href="mailto:edmond.moepswa@gmail.com" className="text-[#FF4D2E]">
          edmond.moepswa@gmail.com
        </a>
      </p>
      <p>
        <strong>Data Controller:</strong> Edmond Moepswa (Sole Proprietor)
        <br />
        <strong>Address:</strong> Gaborone, Botswana
        <br />
        <strong>Phone:</strong> +267 78 692 888
      </p>
      <p>I commit to responding to all privacy enquiries within 30 days.</p>
    </PolicyLayout>
  )
}
