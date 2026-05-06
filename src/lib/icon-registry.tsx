import type { ComponentType, SVGProps } from 'react'
import {
  Atom,
  BarChart3,
  Blocks,
  Bot,
  Braces,
  CheckCheck,
  Cloud,
  Code2,
  Container,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Layers3,
  Link,
  Mail,
  MessageCircle,
  NotebookPen,
  PenTool,
  Server,
  ShieldCheck,
  ShoppingCart,
  TestTube2,
  Wind,
} from 'lucide-react'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export const ICON_REGISTRY: Record<string, IconComponent> = {
  TypeScript: Code2,
  JavaScript: FileCode2,
  React: Atom,
  'Next.js': Layers3,
  'Tailwind CSS': Wind,
  'Three.js': Blocks,
  Vite: Layers3,
  'Framer Motion': Wind,
  Vue: Atom,
  'Vue.js': Atom,
  Svelte: Atom,
  'Svelte.js': Atom,
  'Material UI': Blocks,
  'Chakra UI': Blocks,
  'Radix UI': Blocks,
  'shadcn/ui': Blocks,
  'Headless UI': Blocks,
  Sass: Wind,
  CSS: Wind,
  HTML: FileCode2,
  Redux: Layers3,
  'React Query': Database,
  'React Router': Link,
  'Node.js': Server,
  'Express.js': Server,
  FastAPI: Server,
  Django: Server,
  NestJS: Server,
  Supabase: Database,
  Firebase: Database,
  AWS: Cloud,
  'Google Cloud': Cloud,
  Netlify: Cloud,
  Railway: Cloud,
  Render: Cloud,
  'Fly.io': Cloud,
  Heroku: Cloud,
  PostgreSQL: Database,
  Neon: Database,
  'Neon (Serverless PostgreSQL)': Database,
  MySQL: Database,
  MongoDB: Database,
  Redis: Database,
  Prisma: Database,
  'Drizzle ORM': Database,
  Auth0: ShieldCheck,
  Clerk: ShieldCheck,
  Kinde: ShieldCheck,
  Resend: Mail,
  'AWS SES': Mail,
  'Customer.io': Mail,
  Twilio: MessageCircle,
  'AWS SNS': MessageCircle,
  WhatsApp: MessageCircle,
  Telegram: MessageCircle,
  PostHog: BarChart3,
  Amplitude: BarChart3,
  Hotjar: BarChart3,
  'Better Stack': BarChart3,
  'Google Search Console': BarChart3,
  'Google Analytics 4': BarChart3,
  'Google Business Profile': BarChart3,
  'Ahrefs Webmaster Tools': BarChart3,
  'schema.org': Braces,
  Cloudflare: Cloud,
  'Cloudflare Pages': Cloud,
  'Cloudflare Workers': Cloud,
  'Cloudflare R2': Cloud,
  'AWS S3': Cloud,
  Playwright: TestTube2,
  Vitest: TestTube2,
  Jest: TestTube2,
  Docker: Container,
  GitHub: GitBranch,
  Git: GitBranch,
  ESLint: CheckCheck,
  Prettier: CheckCheck,
  Zod: CheckCheck,
  Figma: PenTool,
  Notion: NotebookPen,
  Slack: MessageCircle,
  Discord: MessageCircle,
  Jira: NotebookPen,
  'VS Code': FileCode2,
  OpenAI: Bot,
  Claude: Bot,
  Chrome: Globe,
  Firefox: Globe,
  Safari: Globe,
  Edge: Globe,
  LinkedIn: Link,
  Instagram: Link,
  Twitter: Link,
  X: Link,
  YouTube: Link,
  WordPress: Globe,
  GraphQL: Braces,
  Keystatic: NotebookPen,
  'Make.com': NotebookPen,
  n8n: NotebookPen,
  'DPO PayGate': ShoppingCart,
  'Orange Money': ShoppingCart,
  'Dodo Payments': ShoppingCart,
  'Lemon Squeezy': ShoppingCart,
  Paddle: ShoppingCart,
  Gumroad: ShoppingCart,
  Shopify: ShoppingCart,
  HubSpot: Link,
  Stripe: ShoppingCart,
  'Cal.com': Link,
}

const iconCache = new Map<string, IconComponent | null>()
const keyMatchers: Array<[string, RegExp]> = Object.entries(ICON_REGISTRY).map(([key]) => [
  key,
  new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
])

export function getTechIcon(techName: string): IconComponent | null {
  const trimmed = techName.trim()

  if (!trimmed) {
    return null
  }

  if (iconCache.has(trimmed)) {
    return iconCache.get(trimmed) ?? null
  }

  const exactMatch = ICON_REGISTRY[trimmed]

  if (exactMatch) {
    iconCache.set(trimmed, exactMatch)
    return exactMatch
  }

  const lowerName = trimmed.toLowerCase()

  for (const [key, component] of Object.entries(ICON_REGISTRY)) {
    if (key.toLowerCase() === lowerName) {
      iconCache.set(trimmed, component)
      return component
    }
  }

  for (const [key, regex] of keyMatchers) {
    if (regex.test(trimmed)) {
      const component = ICON_REGISTRY[key]

      iconCache.set(trimmed, component)
      return component
    }
  }

  iconCache.set(trimmed, null)
  return null
}

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

  const { className: _className, ...restProps } = props as SVGProps<SVGSVGElement>

  return (
    <Icon
      className={`w-4 h-4 shrink-0 ${className}`}
      aria-label={trimmed}
      {...restProps}
    />
  )
}

TechIcon.displayName = 'TechIcon'
