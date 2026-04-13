import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome back, Edmond!</h4>
      </Banner>
      Here&apos;s what you can manage:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Projects</strong> — Add, edit, or reorder project showcase items. Each project
          supports a thumbnail, rich-text description, category, and external link.
        </li>
        <li>
          <strong>Testimonials</strong> — Manage client testimonials with names, roles, ratings, and
          content. Replace seeded placeholders with real client quotes as they come in.
        </li>
        <li>
          <strong>FAQs</strong> — Organise frequently asked questions by category (General,
          Services, Process, Pricing, Technical) and control display order.
        </li>
        <li>
          <strong>Leads</strong> — Review inbound leads captured from the contact form, pricing
          calculator, and Cal.com booking widget.
        </li>
        <li>
          <strong>Services</strong> — Update service descriptions, pricing tiers, and add-ons for
          all eight service categories.
        </li>
        <li>
          <strong>Site Settings</strong> — Update contact details, social links, and site-wide
          configuration from the Globals section.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
