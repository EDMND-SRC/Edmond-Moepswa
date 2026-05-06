import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

if (process.env.SENTRY_PERSONAL_TOKEN && !process.env.SENTRY_AUTH_TOKEN) {
  process.env.SENTRY_AUTH_TOKEN = process.env.SENTRY_PERSONAL_TOKEN
}

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const IMAGE_REMOTE_BASE_URLS = Array.from(
  new Set([NEXT_PUBLIC_SERVER_URL, 'http://localhost:3000', 'http://127.0.0.1:3000']),
)

const nextConfig: NextConfig = {
  // Disable source maps in production — saves 5-10s on build output
  productionBrowserSourceMaps: false,
  outputFileTracingIncludes: {
    '/*': [
      'node_modules/.pnpm/drizzle-kit@*/node_modules/drizzle-kit/**/*',
      'node_modules/.pnpm/pg-cloudflare@*/node_modules/pg-cloudflare/**/*',
    ],
  },

  images: {
    // Generate 2 quality variants instead of just full-size — saves 3-8s
    qualities: [75, 100],
    remotePatterns: [
      ...IMAGE_REMOTE_BASE_URLS.map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      'drizzle-kit/api': './src/lib/cloudflare/drizzle-kit-runtime-stub.ts',
    }

    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Enable top-level await for ESM compatibility
    webpackConfig.experiments = {
      ...webpackConfig.experiments,
      topLevelAwait: true,
    }

    // Externalize developer-icons — prevents all 60 icons from being bundled
    // Only icons actually used at runtime will be loaded
    if (typeof webpackConfig.externals === 'undefined') {
      webpackConfig.externals = []
    }
    if (Array.isArray(webpackConfig.externals)) {
      webpackConfig.externals.push('developer-icons')
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  typescript: {
    ignoreBuildErrors: true,
  },

  // Turbopack config for dev — also enabled for production via CLI flag
  turbopack: {
    root: path.resolve(dirname),
    resolveAlias: {
      'drizzle-kit/api': './src/lib/cloudflare/drizzle-kit-runtime-stub.ts',
    },
  },
}

void initOpenNextCloudflareForDev()

export default withSentryConfig(nextConfig, {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
  telemetry: false,
  webpack: {
    reactComponentAnnotation: {
      enabled: false,
    },
    treeshake: {
      removeDebugLogging: true,
    },
  },
  widenClientFileUpload: false,
})
