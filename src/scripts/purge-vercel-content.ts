import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Faq, Project } from '../payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '../..')

dotenv.config({ path: path.join(rootDir, '.env') })
dotenv.config({ override: true, path: path.join(rootDir, '.env.local') })

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
type ProjectDescription = NonNullable<Project['description']>

const applyChanges = process.argv.includes('--apply')

const projectDescriptionReplacements = new Map<string, string>([
  [
    'Features include Clerk authentication, role-based access control, Dodo Payments integration for subscription billing (with adaptive currency across 80+ currencies), admin dashboard with PostHog analytics, Resend email integration for transactional emails, and full deployment pipeline to Vercel. Available for purchase as a boilerplate product.',
    'Features include Clerk authentication, role-based access control, Dodo Payments integration for subscription billing (with adaptive currency across 80+ currencies), admin dashboard with PostHog analytics, Resend email integration for transactional emails, and a production deployment pipeline to Cloudflare Workers. Available for purchase as a boilerplate product.',
  ],
  [
    'Stack: Next.js 16, TypeScript, Tailwind CSS, Payload CMS, PostgreSQL (Neon), Drizzle ORM, Resend, PostHog. Deployed on Vercel with one-click setup. Available on GitHub under MIT license at github.com/edmnd-src.',
    'Stack: Next.js 16, TypeScript, Tailwind CSS, Payload CMS, PostgreSQL (Neon), Drizzle ORM, Resend, PostHog. Deployed on Cloudflare Workers via OpenNext. Available on GitHub under MIT license at github.com/edmnd-src.',
  ],
])

const faqAnswerReplacements: Readonly<Record<string, string>> = {
  'Do you work with clients outside Botswana?':
    "Yes. While I'm based in Gaborone, I work with clients globally. Communication happens via WhatsApp, email, or video calls. For international clients, payment can be processed through Dodo Payments (Merchant of Record with adaptive currency across 150+ countries), PayPal, or other international gateways. All of my builds are deployed on Cloudflare's global network, so performance is excellent regardless of your location.",
  'Do third-party platform costs count towards your fee?':
    'No. Platform fees — for hosting (Cloudflare Workers, Netlify), databases (Supabase, Neon), CRMs (HubSpot), automation tools (Make.com, n8n), email services (Resend, Beehiiv), analytics (PostHog, GA4), and any third-party service — are borne by the client. This is standard industry practice. My default approach is to design around the best available free tier first, and to recommend a paid upgrade only when your needs genuinely require it. Where a paid tier is necessary, its cost is disclosed at scoping — not after build.',
  'How do you handle data security and hosting?':
    'All websites and applications I build are deployed on Cloudflare, which provides automatic HTTPS, DDoS protection, and global edge delivery. Databases are hosted on Neon or Supabase (PostgreSQL), both of which provide encryption at rest, automated backups, and role-based access control. I never store client data on personal devices or unencrypted storage. For clients with specific data residency requirements (e.g., EU GDPR), I can configure hosting regions accordingly. I do not act as a data processor -- your hosting accounts, database accounts, and analytics accounts are all in your name. I manage them on your behalf during the project and hand over full access on completion. I also recommend enabling two-factor authentication on all platforms and provide a security checklist during handover.',
}

function isJsonObject(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function replaceJsonStrings(
  value: JsonValue,
  replacements: ReadonlyMap<string, string>,
): { changed: boolean; value: JsonValue } {
  if (typeof value === 'string') {
    const nextValue = replacements.get(value)

    return nextValue
      ? {
          changed: nextValue !== value,
          value: nextValue,
        }
      : { changed: false, value }
  }

  if (Array.isArray(value)) {
    let changed = false
    const nextValue = value.map((entry) => {
      const replacedEntry = replaceJsonStrings(entry, replacements)
      changed ||= replacedEntry.changed
      return replacedEntry.value
    })

    return { changed, value: nextValue }
  }

  if (!isJsonObject(value)) {
    return { changed: false, value }
  }

  let changed = false
  const nextEntries = Object.entries(value).map(([key, entry]) => {
    const replacedEntry = replaceJsonStrings(entry, replacements)
    changed ||= replacedEntry.changed
    return [key, replacedEntry.value] as const
  })

  return {
    changed,
    value: Object.fromEntries(nextEntries),
  }
}

async function loadPayload() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Configure .env.local before running this script.')
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')

  return getPayload({ config })
}

async function updateProjectDescription(
  payload: Awaited<ReturnType<typeof loadPayload>>,
  slug: string,
) {
  const result = await payload.find({
    collection: 'projects',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const [project] = result.docs

  if (!project) {
    console.log(`- project ${slug}: not found`)
    return
  }

  if (!project.description) {
    console.log(`- project ${slug}: no description to update`)
    return
  }

  const replacement = replaceJsonStrings(project.description as JsonValue, projectDescriptionReplacements)

  if (!replacement.changed) {
    console.log(`- project ${slug}: already clean`)
    return
  }

  if (!applyChanges) {
    console.log(`- project ${slug}: would update description`)
    return
  }

  await payload.update({
    collection: 'projects',
    data: {
      description: replacement.value as ProjectDescription,
    },
    id: project.id,
  })

  console.log(`- project ${slug}: updated description`)
}

async function updateFaqAnswer(
  payload: Awaited<ReturnType<typeof loadPayload>>,
  question: string,
  answer: string,
) {
  const result = await payload.find({
    collection: 'faqs',
    limit: 1,
    where: {
      question: {
        equals: question,
      },
    },
  })

  const [faq] = result.docs

  if (!faq) {
    console.log(`- faq ${question}: not found`)
    return
  }

  if (faq.answer === answer) {
    console.log(`- faq ${question}: already clean`)
    return
  }

  if (!applyChanges) {
    console.log(`- faq ${question}: would update answer`)
    return
  }

  await payload.update({
    collection: 'faqs',
    data: {
      answer: answer as Faq['answer'],
    },
    id: faq.id,
  })

  console.log(`- faq ${question}: updated answer`)
}

async function main() {
  const payload = await loadPayload()

  console.log(`${applyChanges ? 'Applying' : 'Dry run for'} project-facing Vercel content purge...`)

  await updateProjectDescription(payload, 'saas-boilerplate-subscriptions')
  await updateProjectDescription(payload, 'payload-cms-botswana-sme')

  for (const [question, answer] of Object.entries(faqAnswerReplacements)) {
    await updateFaqAnswer(payload, question, answer)
  }

  console.log('Vercel content purge complete.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
