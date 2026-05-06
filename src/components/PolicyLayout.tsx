import React from 'react'
import Link from 'next/link'

interface PolicyLayoutProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="ed-shell px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#FF4D2E] hover:underline">
          ← Back to Homepage
        </Link>

        <h1 className="ed-page-title mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          {title}
        </h1>

        {lastUpdated && <p className="mb-12 text-sm italic text-[#8a8a8a]">Last Updated: {lastUpdated}</p>}

        <div className="ed-prose">{children}</div>
      </div>
    </div>
  )
}
