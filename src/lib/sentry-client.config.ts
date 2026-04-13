import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Setting this option to true will print warning info in case the SDK fails to
  // initialize or send a transaction.
  debug: process.env.NODE_ENV === 'development',
  // Adjust this value based on your traffic in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  // ...
  // Note: If you're using performance monitoring, add this:
  // replaysOnErrorSampleRate: 1.0,
  // If you're not using performance monitoring, you can remove the tracesSampleRate
})
