/**
 * Seed Script — Demo Content for Portfolio
 *
 * Run: npx tsx seed.ts
 *
 * Creates realistic demo content across all Payload CMS collections:
 * - Projects (8 portfolio items)
 * - Testimonials (9 client testimonials)
 * - FAQs (19 FAQs across 5 categories)
 *
 * All content is based on Edmond Moepswa's actual professional profile.
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Project, Faq } from './src/payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load .env.local BEFORE importing payload config
// (ES module imports are hoisted, so we must load env here first)
dotenv.config({ path: path.resolve(dirname, '.env.local') })

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Please configure .env.local')
    process.exit(1)
  }

  // Dynamic import must happen after dotenv loads
  const { getPayload } = await import('payload')
  const { default: config } = await import('./src/payload.config')

  console.log('🌱 Seeding demo content...')

  const payload = await getPayload({ config })

  // ─── 1. Projects ─────────────────────────────────────────────────────────────

  type ProjectSeed = Omit<Project, 'id' | 'updatedAt' | 'createdAt' | 'description'> & {
    description?: Record<string, unknown>
  }

  const projects: ProjectSeed[] = [
    {
      title: 'Morning Dew Café — Website Redesign',
      slug: 'morning-dew-cafe',
      category: 'websites' as const,
      year: '2019',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'My first self-initiated web project. As General Manager of Morning Dew café in Canberra, I recognised that our online visibility was costing us foot traffic. I designed and built the website from scratch — improving our Google presence, displaying our menu, and building customer loyalty through an online ordering system.',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'The site maintained a 4.4 average Google review rating and reduced takeaway wait times by 40% through the integrated phone ordering system. This project sparked my transition from hospitality management into digital services.',
                },
              ],
            },
          ],
        },
      },
      link: '#',
      featured: true,
    },
    {
      title: 'HSNV Group — Risk Management Dashboard',
      slug: 'hsnv-risk-dashboard',
      category: 'applications' as const,
      year: '2025',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: "As Risk & Insurance Manager at HSNV Group, I identified a critical gap in how the company tracked insurance portfolios across multiple construction projects. I built an internal dashboard that consolidated Contractors All Risk, Professional Indemnity, Public Liability, Employer's Liability, and Motor Fleet policies into a single view.",
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'Features included automated renewal alerts, claims tracking, NBFIRA compliance reporting, and a document repository for policy certificates. The system reduced policy lapse incidents to zero and saved 12+ hours per month on manual tracking.',
                },
              ],
            },
          ],
        },
      },
      link: '#',
      featured: true,
    },
    {
      title: 'Gaborone Artisan Marketplace',
      slug: 'gaborone-artisan-marketplace',
      category: 'applications' as const,
      year: '2026',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'A concept marketplace platform for Botswana-based artisans — carpenters, metalworkers, jewellers, and fabric designers — to showcase their work and receive commission enquiries directly.',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'Built with Next.js and Payload CMS, featuring a visual portfolio with CMS-powered lightbox, product/commission enquiry form routed to HubSpot CRM, Google Maps integration, WhatsApp click-to-chat, and Keystatic CMS for gallery updates. Payment integration supports DPO PayGate for local BWP settlement and Orange Money for mobile-first customers.',
                },
              ],
            },
          ],
        },
      },
      link: '#',
      featured: true,
    },
    {
      title: 'Lead-to-Client Automation Pipeline',
      slug: 'lead-client-automation',
      category: 'automation' as const,
      year: '2026',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'End-to-end lead management automation built with Make.com for a financial advisory firm in Gaborone. The pipeline captures leads from website forms, Cal.com bookings, and Google Business Profile enquiries, then routes them through a qualification workflow.',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'High-value leads (>P15,000 estimated project value) trigger an immediate email to the advisory team and a personalised follow-up to the prospect. All leads are logged in HubSpot CRM with enrichment data. The system processes 40-60 leads per month, reducing response time from 4 hours to under 15 minutes.',
                },
              ],
            },
          ],
        },
      },
      link: '#',
      featured: false,
    },
    {
      title: 'SaaS Boilerplate — Subscription Management Platform',
      slug: 'saas-boilerplate-subscriptions',
      category: 'products' as const,
      year: '2026',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'A production-ready SaaS starter kit built with Next.js 16, Payload CMS, PostgreSQL (Neon), and Drizzle ORM. Designed for founders who need to validate a subscription product fast without building from scratch.',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'Features include Clerk authentication, role-based access control, Dodo Payments integration for subscription billing (with adaptive currency across 80+ currencies), admin dashboard with PostHog analytics, Resend email integration for transactional emails, and a production deployment pipeline to Cloudflare Workers. Available for purchase as a boilerplate product.',
                },
              ],
            },
          ],
        },
      },
      link: '#',
      featured: true,
    },
    {
      title: 'Botswana Construction Co. — Corporate Website',
      slug: 'botswana-construction-website',
      category: 'websites' as const,
      year: '2026',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'A 7-page corporate website for a Botswana-based construction firm, replacing their outdated 2018 site. The new design communicates trust, professionalism, and capability — critical for a company bidding on multi-million-pula government tenders.',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'Pages include: Home, About, Services Portfolio, Project Gallery, Team, Blog, and Contact. CMS integration via Payload CMS allows the marketing team to update project photos and team profiles without developer support. Technical SEO setup achieved a 97/100 Lighthouse score. WhatsApp click-to-chat integration for immediate enquiry.',
                },
              ],
            },
          ],
        },
      },
      link: '#',
      featured: false,
    },
    {
      title: 'Gaborone Food Hub — Restaurant Booking & Pre-Order System',
      slug: 'gaborone-food-hub',
      category: 'websites' as const,
      year: '2026',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'A website and pre-order system for a Gaborone-based catering business. The site communicates their menu professionally, handles inbound booking and pre-order enquiries, and builds a direct communication channel with customers — reducing reliance on food delivery platforms for discovery.',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'Features include a CMS-managed menu with full photo gallery, pre-order form with date/time selector and party size, catering event enquiry flow with event brief fields, WhatsApp click-to-chat, and Cal.com integration for booking. Email reminders via Resend for upcoming bookings. Google Maps embed for venue location.',
                },
              ],
            },
          ],
        },
      },
      link: '#',
      featured: false,
    },
    {
      title: 'Open Source — Payload CMS Boilerplate for Botswana SMEs',
      slug: 'payload-cms-botswana-sme',
      category: 'products' as const,
      year: '2026',
      description: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'An open-source Payload CMS starter kit specifically configured for Botswana-based small and medium enterprises. Pre-configured with local payment gateway integrations (DPO PayGate, Orange Money), WhatsApp Business API setup, Google Business Profile embed, and technical SEO baseline.',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  text: 'Stack: Next.js 16, TypeScript, Tailwind CSS, Payload CMS, PostgreSQL (Neon), Drizzle ORM, Resend, PostHog. Deployed on Cloudflare Workers via OpenNext. Available on GitHub under MIT license at github.com/edmnd-src.',
                },
              ],
            },
          ],
        },
      },
      link: 'https://github.com/edmnd-src',
      featured: true,
    },
  ]

  console.log('📦 Creating projects...')
  for (const project of projects) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'projects',
        data: project as Omit<Project, 'id' | 'updatedAt' | 'createdAt'>,
      })
      console.log(`  ✓ ${project.title}`)
    } else {
      console.log(`  ⊘ ${project.title} (exists)`)
    }
  }

  // ─── 2. Testimonials — SKIPPED ────────────────────────────────────────────────
  // Testimonials are CMS-managed and should only contain real client feedback.
  // Do not seed fabricated testimonials. Add real ones here when you have them.

  console.log('💬 Skipping testimonials — add real client feedback when available.')

  // ─── 3. FAQs ─────────────────────────────────────────────────────────────────

  const faqs: Omit<Faq, 'id' | 'updatedAt' | 'createdAt'>[] = [
    // General
    {
      question: 'What exactly do you do?',
      answer:
        'I design and build custom websites, web applications, and workflow automations for businesses and institutions. Everything is built from scratch — no templates or page builders. I also handle SEO, Google Business Profile setup, and provide ongoing support through retainer plans. My background spans hospitality management, financial planning, corporate risk & insurance, and now full-time software development — which means I approach every project with genuine business understanding, not just technical skill.',
      category: 'general' as const,
      order: 1,
      isActive: true,
    },
    {
      question: 'Do you work with clients outside Botswana?',
      answer:
        "Yes. While I'm based in Gaborone, I work with clients globally. Communication happens via WhatsApp, email, or video calls. For international clients, payment can be processed through Dodo Payments (Merchant of Record with adaptive currency across 150+ countries), PayPal, or other international gateways. All of my builds are deployed on Cloudflare's global network, so performance is excellent regardless of your location.",
      category: 'general' as const,
      order: 2,
      isActive: true,
    },
    {
      question: 'What makes you different from other web developers?',
      answer:
        "I've stood on both sides of the desk. I've managed P&L statements in a café kitchen, structured insurance portfolios for multi-million-pula construction projects, and advised on intergenerational wealth — before writing a single line of production code. This means I don't just build what you ask for; I build what your business actually needs. You get full documentation, full ownership, and nothing locked behind a retainer.",
      category: 'general' as const,
      order: 3,
      isActive: true,
    },

    // Services
    {
      question: 'Do you use templates or themes?',
      answer:
        'No. Every website and application is custom-designed and built from scratch. Your project will look unique — because it is. For clients who need something faster and more affordable, I offer boilerplate products — pre-built starter kits (Next.js + Payload CMS + PostgreSQL) that are then customised to your brand, content, and workflow. These are not templates; they are production-ready foundations with market-specific features already integrated.',
      category: 'services' as const,
      order: 10,
      isActive: true,
    },
    {
      question: 'What platforms and tools do you work with?',
      answer:
        'I build with Next.js, React, TypeScript, and Tailwind CSS. For content management, I use Payload CMS or Keystatic. For databases, PostgreSQL (Neon, Supabase) with Drizzle ORM. For automation, Make.com and n8n. I integrate with HubSpot CRM, Resend email, Cal.com scheduling, PostHog analytics, and many other platforms. For payments, I support DPO PayGate and Orange Money (local Botswana), Dodo Payments and PayPal (international). If a tool has an API, I can integrate it.',
      category: 'services' as const,
      order: 11,
      isActive: true,
    },
    {
      question: 'Can you integrate WhatsApp Business API?',
      answer:
        "Yes, as an add-on (P5,000). However, the WhatsApp Business API requires Meta Business verification — approval typically takes 1–7 business days but can be rejected for unverified business details, non-compliant use cases, or inconsistencies between submitted documents and Meta records. Approval is at Meta's discretion and is not guaranteed. If you cannot obtain verification, the included WhatsApp click-to-chat link (free in all builds) remains available as a simple alternative — no API, no approval, no cost.",
      category: 'services' as const,
      order: 12,
      isActive: true,
    },

    // Process
    {
      question: 'What happens on the free discovery call?',
      answer:
        "It's a genuine conversation — no pitch. We'll discuss your business, your goals, your current challenges, and what you'd like to build. I'll ask questions about your audience, your competitors, your existing tools, and your budget. If we're a fit, I'll send a detailed proposal with transparent pricing within 48 hours. If I'm not the right person for your project, I'll tell you and point you in the right direction. The call is free, 30 minutes, and bookable directly through my calendar.",
      category: 'process' as const,
      order: 20,
      isActive: true,
    },
    {
      question: 'How long does a typical project take?',
      answer:
        "It depends on scope. A single-page landing page takes 5–8 business days. A multi-page CMS-powered website takes 10–22 business days. Web applications and boilerplate builds take 15–35+ business days. Timeline estimates are transparent and included in every proposal. Importantly, the delivery clock pauses during your review periods — so you're never rushed to approve designs or test builds. You get the time you need to give proper feedback.",
      category: 'process' as const,
      order: 21,
      isActive: true,
    },
    {
      question: 'What if I need changes after the project is delivered?',
      answer:
        'Every project includes full documentation and a handover session so you can manage your systems independently. For ongoing changes beyond that, I offer retainer plans starting from P2,500/month. You get someone who already knows your codebase on call, with predictable monthly costs. No re-briefing, no ramp-up.',
      category: 'process' as const,
      order: 22,
      isActive: true,
    },

    // Pricing
    {
      question: 'How does pricing work?',
      answer:
        'Every engagement starts with a free 30-minute discovery call. After understanding your requirements, I send a scoped proposal with transparent pricing within 48 hours. No surprises, no hidden fees. Payment terms are typically 50% deposit to begin, 50% on delivery. All third-party platform costs (hosting, databases, CRMs, automation tools, email services, analytics) are borne by the client — I always design around the best available free tier first.',
      category: 'pricing' as const,
      order: 30,
      isActive: true,
    },
    {
      question: 'Do third-party platform costs count towards your fee?',
      answer:
        'No. Platform fees — for hosting (Cloudflare Workers, Netlify), databases (Supabase, Neon), CRMs (HubSpot), automation tools (Make.com, n8n), email services (Resend, Beehiiv), analytics (PostHog, GA4), and any third-party service — are borne by the client. This is standard industry practice. My default approach is to design around the best available free tier first, and to recommend a paid upgrade only when your needs genuinely require it. Where a paid tier is necessary, its cost is disclosed at scoping — not after build.',
      category: 'pricing' as const,
      order: 31,
      isActive: true,
    },
    {
      question: 'What payment gateway options are available?',
      answer:
        'For Botswana-based businesses: DPO PayGate (works with FNB Botswana and Stanbic Bank) and Orange Money Web Payments are the primary options. For international sales: Dodo Payments (Merchant of Record, handles tax/compliance across 150+ countries), PayPal, and Lemon Squeezy are available. Stripe is not available to Botswana-registered businesses. All payment gateway integrations require you to hold an active merchant account with the provider. Approval timelines and criteria vary by bank and provider and are outside my control.',
      category: 'pricing' as const,
      order: 32,
      isActive: true,
    },

    // Technical
    {
      question: 'Do you offer ongoing SEO support?',
      answer:
        'Yes. Every build includes a technical SEO foundation: meta tags, Open Graph, XML sitemap, robots.txt, and structured data. For ongoing SEO, I offer a retainer starting from P3,500/month (minimum 3 months) that includes monthly keyword ranking reports, content recommendations, backlink monitoring, technical SEO maintenance, Google Business Profile updates, and quarterly strategy reviews. I also offer a one-time Full Foundation package at P4,500 for clients who need a comprehensive SEO setup without an ongoing commitment.',
      category: 'technical' as const,
      order: 40,
      isActive: true,
    },
    {
      question: 'What about accessibility and performance?',
      answer:
        "Every build targets WCAG AA compliance: proper colour contrast ratios, keyboard navigation, screen reader support, focus-visible indicators, and reduced motion support for users with vestibular conditions. Performance targets: Lighthouse scores above 90 across all categories (Performance, Accessibility, Best Practices, SEO). I use Next.js's built-in optimisations: image optimisation, font optimisation, code splitting, and server-side rendering where appropriate.",
      category: 'technical' as const,
      order: 41,
      isActive: true,
    },
    {
      question: 'Can you work with my existing tools and CRM?',
      answer:
        'Absolutely. If a tool has an API or webhook support, I can integrate it. Common integrations include HubSpot CRM, Google Sheets (as a lightweight CRM), Beehiiv or Brevo for email marketing, Cal.com for scheduling, PostHog for analytics, Better Stack for uptime monitoring, and Twilio or AWS SNS for SMS notifications. I always start by auditing your existing tool stack and designing the build around what you already use — avoiding unnecessary migration costs.',
      category: 'technical' as const,
      order: 42,
      isActive: true,
    },
    {
      question: 'Do you prefer working with established businesses or startups?',
      answer:
        'I work with both, and the engagement looks slightly different for each. Established businesses usually have existing systems, brand guidelines, and stakeholder approval processes -- so my focus is on integration, minimal disruption, and delivering within your governance framework. Startups typically need more guidance on scope prioritisation, lean MVP thinking, and choosing platforms that scale without over-investing upfront. I adjust my approach accordingly. For startups, I tend to recommend boilerplate products or phased builds to validate quickly. For established businesses, I invest more time in audit, stakeholder alignment, and detailed scoping. Either way, the discovery call is the same: I listen first, recommend second.',
      category: 'general' as const,
      order: 50,
      isActive: true,
    },
    {
      question: 'How do you handle data security and hosting?',
      answer:
        'All websites and applications I build are deployed on Cloudflare, which provides automatic HTTPS, DDoS protection, and global edge delivery. Databases are hosted on Neon or Supabase (PostgreSQL), both of which provide encryption at rest, automated backups, and role-based access control. I never store client data on personal devices or unencrypted storage. For clients with specific data residency requirements (e.g., EU GDPR), I can configure hosting regions accordingly. I do not act as a data processor -- your hosting accounts, database accounts, and analytics accounts are all in your name. I manage them on your behalf during the project and hand over full access on completion. I also recommend enabling two-factor authentication on all platforms and provide a security checklist during handover.',
      category: 'technical' as const,
      order: 51,
      isActive: true,
    },
    {
      question: 'Who owns the source code and intellectual property?',
      answer:
        'Full intellectual property transfers to the client upon final payment. Until the balance is settled, I retain ownership of all deliverables, source code, and design assets. After payment, you own everything: the website, the application, the custom code, the design files, and the documentation. I retain a non-exclusive right to display the project in my portfolio and case studies -- this is standard practice for any professional developer and helps future clients evaluate my work. If you require a non-disclosure agreement or want the project excluded from my portfolio, we can discuss this during scoping. For boilerplate products, you receive a perpetual, non-exclusive license to use the starter kit in your own projects -- you cannot resell or redistribute the boilerplate itself as a competing product.',
      category: 'general' as const,
      order: 52,
      isActive: true,
    },
    {
      question: "What happens if you're unavailable during a project?",
      answer:
        'I take project continuity seriously. Every build is documented in real-time -- not as an afterthought -- so if something unexpected happens, your project is not held hostage by undocumented code. All source code is committed to a Git repository that you have access to from day one. If I become unavailable for any reason, another qualified developer can pick up the project from the documentation and codebase. For larger projects (15+ business days), I maintain a project status document that tracks decisions, architecture notes, and open items. I also recommend that clients maintain their own copies of all credentials and platform access. In the unlikely event that I need to step away from an active project, I will provide written notice, deliver all completed work, and either refund the deposit (if the project cannot continue) or transition the project to a developer I trust. This has never happened, but I believe in planning for it.',
      category: 'process' as const,
      order: 53,
      isActive: true,
    },
  ]

  console.log('❓ Creating FAQs...')
  for (const faq of faqs) {
    const existing = await payload.find({
      collection: 'faqs',
      where: { question: { equals: faq.question } },
    })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'faqs', data: faq })
      console.log(`  ✓ ${faq.question}`)
    } else {
      console.log(`  ⊘ ${faq.question} (exists)`)
    }
  }

  console.log('\n✅ Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
