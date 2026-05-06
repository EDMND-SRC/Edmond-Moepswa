import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF4D2E] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl text-center">
        <p className="ed-label mb-5">404 Error</p>
        <h1 className="ed-page-title text-balance">Page not found.</h1>
        <p className="ed-body mt-6 text-balance text-[#cfcfcf]">
          The page you were trying to reach doesn&apos;t exist, has moved, or was never part of
          this launch build.
        </p>
        <Link href="/" className="ed-button-primary mt-10 inline-flex px-8 py-4">
          <Home className="h-5 w-5" aria-hidden="true" />
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
