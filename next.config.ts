import { withPayload } from '@payloadcms/next/withPayload'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const nextConfig: NextConfig = {
  // Disable source maps in production — saves 5-10s on build output
  productionBrowserSourceMaps: false,

  images: {
    // Generate 2 quality variants instead of just full-size — saves 3-8s
    qualities: [75, 100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
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

  // Turbopack config for dev — also enabled for production via CLI flag
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withSentryConfig(withPayload(nextConfig, { devBundleServerPackages: false }), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  org: process.env.SENTRY_ORG || 'edmond-moepswa',
  project: process.env.SENTRY_PROJECT || 'edmond-moepswa-website',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically tree-shake Sentry debug statements in production
  telemetry: false,

  // Important: don't fail the build if source map upload fails
  sourcemaps: {
    disable: true,
  },
})
