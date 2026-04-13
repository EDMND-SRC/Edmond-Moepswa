'use client'

import { useState, useCallback } from 'react'
import { AlertTriangle, ClipboardCheck, FileText, Loader2, ExternalLink } from 'lucide-react'

interface FreeResource {
  title: string
  desc: string
  icon: typeof AlertTriangle
  tag: string
  /** Dodo product ID — set after products are created in Dodo dashboard */
  dodoProductId?: string
  /** Legacy Gumroad URL — fallback until Dodo products are configured */
  legacyUrl?: string
}

const freeResources: FreeResource[] = [
  {
    title: '5 Signs Your Website Is Costing You Clients',
    desc: 'Discover the 5 most common website mistakes that silently drive potential clients away -- and how to fix them fast.',
    icon: AlertTriangle,
    tag: 'PDF Guide',
    dodoProductId: undefined, // Set after creating product in Dodo
    legacyUrl: 'https://edmnd.gumroad.com/l/bgbgoq',
  },
  {
    title: 'Website Launch Checklist',
    desc: 'A complete pre-launch checklist to ensure your website goes live without bugs, missing pages, or embarrassing errors.',
    icon: ClipboardCheck,
    tag: 'Checklist',
    dodoProductId: undefined,
    legacyUrl: 'https://edmnd.gumroad.com/l/fwruno',
  },
  {
    title: 'How to Brief a Web Designer',
    desc: 'Write a clear web design brief that saves you time, money, and endless back-and-forth with your designer.',
    icon: FileText,
    tag: 'E-book',
    dodoProductId: undefined,
    legacyUrl: 'https://edmnd.gumroad.com/l/legyuk',
  },
]

export function ResourceCards() {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleResourceClick = useCallback(async (resource: FreeResource) => {
    // If Dodo product ID is set, use Dodo checkout
    if (resource.dodoProductId) {
      setLoadingId(resource.title)
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: resource.dodoProductId }),
        })

        if (!res.ok) {
          throw new Error('Failed to start checkout')
        }

        const { url } = await res.json()
        if (url) {
          window.location.href = url
          return
        }
      } catch {
        // Fall through to legacy URL if Dodo checkout fails
      } finally {
        setLoadingId(null)
      }
    }

    // Fallback: track via webhook then open legacy URL
    if (resource.legacyUrl) {
      const payload = JSON.stringify({
        workflow: 'resource-download',
        data: { resource: resource.title, timestamp: new Date().toISOString() },
      })

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/make-webhook', payload)
      } else {
        fetch('/api/make-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }

      const link = document.createElement('a')
      link.href = resource.legacyUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.click()
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {freeResources.map((item) => {
        const IconComponent = item.icon
        const isLoading = loadingId === item.title
        const hasDodoProduct = !!item.dodoProductId

        return (
          <button
            key={item.title}
            onClick={() => handleResourceClick(item)}
            disabled={isLoading}
            aria-label={`Download free ${item.tag}: ${item.title}`}
            className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 hover:border-[#FF4D2E]/40 hover:-translate-y-2 transition-all duration-300 group shadow-2xl text-left min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-white/5"
          >
            <IconComponent className="w-8 h-8 text-[#FF4D2E] mb-6" aria-hidden="true" />
            <span className="text-[#FF4D2E] text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
              {item.tag} &middot; Free
            </span>
            <h3 className="text-white font-medium text-xl mb-4 leading-tight group-hover:text-[#FF4D2E] transition-colors">
              {item.title}
            </h3>
            <p className="text-[#b0b0b0] text-sm flex-1 leading-relaxed">{item.desc}</p>
            <div className="mt-8 flex items-center gap-2 text-[#FF4D2E] text-sm font-bold group-hover:gap-3 transition-all">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Loading...
                </>
              ) : (
                <>
                  Download Free
                  <span className="text-lg">&rarr;</span>
                  {hasDodoProduct && (
                    <ExternalLink className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
                  )}
                </>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
