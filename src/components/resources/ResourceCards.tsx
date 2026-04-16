'use client'

import { useState, useCallback } from 'react'
import { 
  Loader2, 
  ExternalLink,
  Download,
  ShoppingCart,
  BookOpen
} from 'lucide-react'
import * as DevIcons from 'developer-icons'
import type { Product } from '@/payload-types'
import type { ComponentType } from 'react'

// Map category slugs to branding icons
const iconMap: Record<string, ComponentType<any>> = {
  guide: DevIcons.Markdown,
  checklist: DevIcons.Bash,
  ebook: DevIcons.Notion,
  boilerplate: DevIcons.NextJs,
  tool: DevIcons.ViteJS,
}

interface ResourceCardsProps {
  products: Product[]
}

export function ResourceCards({ products }: ResourceCardsProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const handleResourceClick = useCallback(async (product: Product) => {
    setLoadingId(product.id)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.dodoProductId }),
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
      // Error handling can be added here
    } finally {
      setLoadingId(null)
    }
  }, [])

  if (products.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((item) => {
        const IconComponent = iconMap[item.category] || BookOpen
        const isLoading = loadingId === item.id
        const isFree = item.type === 'free'
        const priceLabel = isFree ? 'Free' : `$${((item.priceCents ?? 0) / 100).toFixed(2)}`

        return (
          <button
            key={item.id}
            onClick={() => handleResourceClick(item)}
            disabled={isLoading}
            aria-label={`${isFree ? 'Download' : 'Buy'} ${item.title}`}
            className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 hover:border-[#FF4D2E]/40 hover:-translate-y-2 transition-all duration-300 group shadow-2xl text-left flex flex-col min-h-full min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-white/5"
          >
            <IconComponent className="w-8 h-8 text-[#FF4D2E] mb-6" aria-hidden="true" />
            <span className="text-[#FF4D2E] text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
              {item.category} &middot; {priceLabel}
            </span>
            <h3 className="text-white font-medium text-xl mb-4 leading-tight group-hover:text-[#FF4D2E] transition-colors">
              {item.title}
            </h3>
            <p className="text-[#b0b0b0] text-sm flex-1 leading-relaxed mb-8">
              {item.description}
            </p>
            <div className="mt-auto flex items-center justify-between gap-2 text-[#FF4D2E] text-sm font-bold transition-all">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Redirecting...
                </span>
              ) : (
                <>
                  <span className="flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    {isFree ? 'Get Free' : 'Buy Now'}
                    <span className="text-lg">&rarr;</span>
                  </span>
                  {isFree ? (
                    <Download className="h-4 w-4 opacity-40" aria-hidden="true" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 opacity-40" aria-hidden="true" />
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
