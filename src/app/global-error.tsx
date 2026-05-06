'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FF4D2E]">
            Unexpected error
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight">
            Something went wrong while rendering this page.
          </h1>
          <button
            className="rounded-full bg-[#FF4D2E] px-6 py-3 font-semibold text-white"
            onClick={() => reset()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
