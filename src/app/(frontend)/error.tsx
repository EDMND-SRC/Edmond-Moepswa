'use client'
import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
          Something went wrong
        </span>
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Unexpected error</h1>
        <p className="text-[#a3a3a3] text-lg mb-10 leading-relaxed">
          An error occurred while loading this page. Please try refreshing or navigating back to the
          homepage.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#FF4D2E] hover:bg-[#e03a1f] text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-[#FF4D2E]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <RefreshCw className="w-5 h-5" aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Back to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
