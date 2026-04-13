/**
 * Technology Icon Registry — Static imports from developer-icons.
 *
 * BUNDLE NOTE: ~60 icons are statically imported to keep the services page
 * as a Server Component. All icons share the same visual style via the
 * developer-icons package. The icon registry maps technology names to their
 * corresponding SVG components.
 *
 * Icon mappings updated:
 * - 'Drizzle ORM' -> PostgreSQL (not Prisma)
 * - Amplitude -> Hotjar (not Datadog)
 * - 'Payload CMS' -> Notion (not GraphQL)
 * - No 'Better Stack' mapping (removed)
 * - PostHog -> Grafana
 */

import type { ComponentType, SVGProps } from 'react'
import {
  // Languages
  TypeScript,
  JavaScript,
  // Frontend
  React,
  NextJs,
  TailwindCSS,
  ThreeJsDark,
  ViteJS,
  FramerDark,
  VueJs,
  SvelteJS,
  MaterialUI,
  ChakraUI,
  RadixUI,
  ShadcnUI,
  HeadlessUI,
  Sass,
  CSS3,
  HTML5,
  Redux,
  ReactQuery,
  ReactRouter,
  // Backend
  VercelDark,
  NodeJs,
  ExpressJsDark,
  FastAPI,
  Django,
  NestJS,
  Supabase,
  Firebase,
  AWS,
  GoogleCloud,
  Netlify,
  Railway,
  Render,
  FlyIo,
  Heroku,
  // Database
  PostgreSQL,
  MySQL,
  MongoDB,
  Redis,
  Prisma,
  // Auth
  Auth0,
  Clerk,
  // Email
  ReSend,
  // SMS
  WhatsApp,
  // Analytics
  Grafana,
  Hotjar,
  // Storage
  Cloudflare,
  // Testing
  Playwright,
  Vitest,
  Jest,
  // DevOps
  Docker,
  GitHubDark,
  Git,
  ESLint,
  Prettier,
  Zod,
  // Design
  Figma,
  // Productivity
  Notion,
  Slack,
  Discord,
  Jira,
  VisualStudioCode,
  // AI
  OpenAI,
  ClaudeAI,
  // Browsers
  Chrome,
  Firefox,
  Safari,
  Edge,
  // Social
  LinkedIn,
  Instagram,
  XDark,
  YouTube,
  Telegram,
  // Others
  WordPress,
  GraphQL,
} from 'developer-icons'

type IconComponent = ComponentType<SVGProps<SVGElement>>

// Icon registry mapping technology names to static icon components
export const ICON_REGISTRY: Record<string, IconComponent> = {
  // Languages
  TypeScript,
  JavaScript,
  // Frontend
  React,
  'Next.js': NextJs,
  'Tailwind CSS': TailwindCSS,
  'Three.js': ThreeJsDark,
  Vite: ViteJS,
  'Framer Motion': FramerDark,
  Vue: VueJs,
  'Vue.js': VueJs,
  Svelte: SvelteJS,
  'Svelte.js': SvelteJS,
  'Material UI': MaterialUI,
  'Chakra UI': ChakraUI,
  'Radix UI': RadixUI,
  'shadcn/ui': ShadcnUI,
  'Headless UI': HeadlessUI,
  Sass,
  CSS: CSS3,
  HTML: HTML5,
  Redux,
  'React Query': ReactQuery,
  'React Router': ReactRouter,
  // Backend
  Vercel: VercelDark,
  'Node.js': NodeJs,
  'Express.js': ExpressJsDark,
  FastAPI,
  Django,
  NestJS,
  Supabase,
  Firebase,
  AWS,
  'Google Cloud': GoogleCloud,
  Netlify,
  Railway,
  Render,
  'Fly.io': FlyIo,
  Heroku,
  // Database
  PostgreSQL,
  Neon: PostgreSQL,
  'Neon (Serverless PostgreSQL)': PostgreSQL,
  MySQL,
  MongoDB,
  Redis,
  Prisma,
  'Drizzle ORM': PostgreSQL,
  // Auth
  Auth0,
  Clerk,
  Kinde: Clerk,
  // Email
  Resend: ReSend,
  'AWS SES': AWS,
  'Customer.io': ReSend,
  // SMS
  Twilio: WhatsApp,
  // Analytics
  PostHog: Grafana,
  Amplitude: Hotjar,
  // SEO
  'Google Search Console': GoogleCloud,
  'Google Analytics 4': GoogleCloud,
  'Google Business Profile': GoogleCloud,
  'Ahrefs Webmaster Tools': GoogleCloud,
  'schema.org': GoogleCloud,
  // Storage
  Cloudflare,
  'Cloudflare Pages': Cloudflare,
  'Cloudflare Workers': Cloudflare,
  'Cloudflare R2': Cloudflare,
  'AWS S3': AWS,
  // Testing
  Playwright,
  Vitest,
  Jest,
  // DevOps
  Docker,
  GitHub: GitHubDark,
  Git,
  ESLint,
  Prettier,
  Zod,
  // Design
  Figma,
  // Productivity
  Notion,
  Slack,
  Discord,
  Jira,
  'VS Code': VisualStudioCode,
  // AI
  OpenAI,
  Claude: ClaudeAI,
  // Browsers
  Chrome,
  Firefox,
  Safari,
  Edge,
  // Social
  WhatsApp,
  LinkedIn,
  Instagram,
  Twitter: XDark,
  X: XDark,
  YouTube,
  Telegram,
  // Others
  WordPress,
  GraphQL,
  'Payload CMS': Notion,
  Keystatic: Notion,
  'Make.com': Notion,
  n8n: Notion,
  'DPO PayGate': GraphQL,
  'Orange Money': GraphQL,
  'Dodo Payments': GraphQL,
  'Lemon Squeezy': GraphQL,
  Paddle: GraphQL,
  Gumroad: GraphQL,
  Shopify: GraphQL,
  'AWS SNS': AWS,
  'Cal.com': Notion,
  Sentry: GraphQL,
  HubSpot: GraphQL,
  Stripe: GraphQL,
}

// Cache for resolved icon components (null means a previous miss)
const iconCache = new Map<string, IconComponent | null>()

// Pre-compiled regex matchers for word-boundary matching
const keyMatchers: Array<[string, RegExp]> = Object.entries(ICON_REGISTRY).map(
  ([key]) =>
    [key, new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')] as [
      string,
      RegExp,
    ],
)

/**
 * Get an icon component for a technology name.
 * Matching: exact -> case-insensitive -> word-boundary regex.
 * Returns null if no match found.
 */
export function getTechIcon(techName: string): IconComponent | null {
  const trimmed = techName.trim()
  if (!trimmed) return null

  // Check cache
  if (iconCache.has(trimmed)) {
    return iconCache.get(trimmed) ?? null
  }

  // Level 1: Exact match
  if (ICON_REGISTRY[trimmed]) {
    iconCache.set(trimmed, ICON_REGISTRY[trimmed])
    return ICON_REGISTRY[trimmed]
  }

  // Level 2: Case-insensitive match
  const lowerName = trimmed.toLowerCase()
  for (const [key, component] of Object.entries(ICON_REGISTRY)) {
    if (key.toLowerCase() === lowerName) {
      iconCache.set(trimmed, component)
      return component
    }
  }

  // Level 3: Word-boundary regex match
  for (const [_key, regex] of keyMatchers) {
    if (regex.test(trimmed)) {
      const component = ICON_REGISTRY[_key]
      iconCache.set(trimmed, component)
      return component
    }
  }

  // Cache the miss
  iconCache.set(trimmed, null)
  return null
}

/**
 * TechIcon component with automatic fallback to text.
 * Renders an icon when found; otherwise falls back to the technology name as text.
 */
interface TechIconProps {
  tech: string
  showLabel?: boolean
  fallbackToText?: boolean
  className?: string
}

export function TechIcon({
  tech,
  showLabel = false,
  fallbackToText = true,
  className = '',
  ...props
}: TechIconProps) {
  const trimmed = tech.trim()
  if (!trimmed) {
    if (fallbackToText && showLabel) {
      return <span className={className}>&nbsp;</span>
    }
    return null
  }

  const Icon = getTechIcon(trimmed)

  if (!Icon) {
    if (fallbackToText && showLabel) {
      return <span className={className}>{trimmed}</span>
    }
    return null
  }

  if (showLabel) {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{trimmed}</span>
      </span>
    )
  }

  const { className: _cn, ...restProps } = props as Record<string, unknown>
  return (
    <Icon
      className={`w-4 h-4 shrink-0 ${className}`}
      aria-label={trimmed}
      {...(restProps as SVGProps<SVGElement>)}
    />
  )
}

TechIcon.displayName = 'TechIcon'
