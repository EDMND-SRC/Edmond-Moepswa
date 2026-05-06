import * as Sentry from '@sentry/nextjs'

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return error
  }

  return new Error(typeof error === 'string' ? error : 'Unknown server error')
}

export function reportServerError(
  error: unknown,
  context?: { feature?: string; metadata?: Record<string, unknown> },
) {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return
  }

  Sentry.withScope((scope) => {
    if (context?.feature) {
      scope.setTag('feature', context.feature)
    }

    if (context?.metadata) {
      scope.setContext('metadata', context.metadata)
    }

    Sentry.captureException(normalizeError(error))
  })
}
