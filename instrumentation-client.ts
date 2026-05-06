import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    debug: process.env.NODE_ENV === 'development',
    dsn,
    enabled: true,
    environment: process.env.NODE_ENV,
    sampleRate: 1,
    sendDefaultPii: false,
    tracesSampleRate: 0,
  })
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
