import * as Sentry from '@sentry/nextjs'

export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

  if (!dsn) {
    return
  }

  Sentry.init({
    debug: process.env.NODE_ENV === 'development',
    dsn,
    enabled: true,
    environment: process.env.CLOUDFLARE_ENV || process.env.NODE_ENV,
    sampleRate: 1,
    sendDefaultPii: false,
    tracesSampleRate: 0,
  })
}
