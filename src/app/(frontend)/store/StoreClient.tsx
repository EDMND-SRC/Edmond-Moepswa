'use client'

import { useState, useCallback } from 'react'
import { Download, ShoppingCart, ExternalLink, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export interface DodoProduct {
  id: string
  name: string
  description: string
  priceCents: number
  currency: string
  type: 'one_time' | 'subscription'
  pwywEnabled: boolean
  pwywMinCents: number
  pwywSuggestedCents: number
  imageUrl: string | null
  taxCategory: string
}

export function StoreClient({ initialProducts }: { initialProducts: DodoProduct[] }) {
  const [products] = useState<DodoProduct[]>(initialProducts)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const handleCheckout = useCallback(async (productId: string, amount?: number) => {
    setCheckoutError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, amount }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Checkout failed')
      }

      const { url } = await res.json()
      if (url) {
        window.location.href = url
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'Failed to start checkout')
    }
  }, [])

  if (products.length === 0) {
    return (
      <main id="main-content" className="bg-[#0a0a0a] text-white">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-4xl px-6 md:px-10 py-24 md:py-32">
            <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
              // Store
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6">
              Boilerplate Products &amp; Free Resources
            </h1>
            <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl leading-relaxed">
              Products are being configured. Please check back soon.
            </p>
          </div>
        </section>
      </main>
    )
  }

  const freeProducts = products.filter((p) => p.priceCents === 0)
  const paidProducts = products.filter((p) => p.priceCents > 0)

  return (
    <main id="main-content" className="bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-24 md:py-32">
          <span className="text-[#FF4D2E] font-medium tracking-wider text-sm md:text-base">
            // Store
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6">
            Boilerplate Products &amp; Free Resources
          </h1>
          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-2xl leading-relaxed">
            I build production-ready starter kits and free resources to help you build faster.
            All prices include international tax compliance.
          </p>
        </div>
      </section>

      {/* Checkout Error */}
      {checkoutError && (
        <section className="border-b border-red-500/20 bg-red-500/5">
          <div className="mx-auto max-w-4xl px-6 md:px-10 py-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm">{checkoutError}</p>
            </div>
          </div>
        </section>
      )}

      {/* Free Products */}
      {freeProducts.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tighter mb-2">
              Free Resources
            </h2>
            <p className="text-[#b0b0b0] text-sm mb-10 max-w-xl">
              Download free guides or pay what you want if you find the material valuable.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {freeProducts.map((product) => (
                <ProductCard key={product.id} product={product} onCheckout={handleCheckout} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Paid Products */}
      {paidProducts.length > 0 && (
        <section className="border-t border-white/10 py-24 md:py-32 px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tighter mb-2">
              Boilerplate Products
            </h2>
            <p className="text-[#b0b0b0] text-sm mb-10 max-w-xl">
              Buy these production-ready kits once, deploy them fast, and customise them to your brand.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paidProducts.map((product) => (
                <ProductCard key={product.id} product={product} onCheckout={handleCheckout} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Adaptive Currency Note */}
      <section className="border-t border-white/10 py-16 px-6 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-medium text-white mb-2">Adaptive Currency</h2>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  Prices automatically display in your local currency. Pay in 70+ currencies with
                  real-time exchange rates. All prices include international tax compliance via
                  Dodo Payments (Merchant of Record).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Note */}
      <section className="border-t border-white/10 py-16 md:py-20 px-6 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#FF4D2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <div>
                <h2 className="text-lg font-medium text-white mb-2">Secure Checkout</h2>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  All purchases are processed securely via{' '}
                  <a
                    href="https://dodopayments.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF4D2E] underline underline-offset-2 hover:text-[#FF4D2E]/80"
                  >
                    Dodo Payments
                  </a>
                  . Dodo handles international tax compliance as a Merchant of Record — you receive
                  the product instantly after payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function formatPrice(cents: number, currency: string): string {
  if (cents === 0) return 'Free'
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : `${currency} `
  return `${symbol}${(cents / 100).toFixed(2)}`
}

function ProductCard({ product, onCheckout }: { product: DodoProduct; onCheckout: (productId: string, amount?: number) => Promise<void> }) {
  const [loading, setLoading] = useState(false)
  const [customAmount, setCustomAmount] = useState<number | ''>(product.pwywSuggestedCents ? product.pwywSuggestedCents / 100 : '')

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const amountCents = typeof customAmount === 'number' ? Math.round(customAmount * 100) : undefined
      await onCheckout(product.id, amountCents)
    } catch {
      // Error handled in parent
    } finally {
      setLoading(false)
    }
  }

  const displayPrice = product.pwywEnabled
    ? (typeof customAmount === 'number' ? formatPrice(Math.round(customAmount * 100), product.currency) : 'Pay what you want')
    : formatPrice(product.priceCents, product.currency)

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-6 md:p-8 transition-all hover:border-white/20 hover:-translate-y-1">
      {product.pwywEnabled && product.priceCents === 0 && (
        <span className="absolute -top-3 right-6 rounded-full bg-[#FF4D2E] px-3 py-1 text-xs font-semibold tracking-wide text-white">
          Pay What You Want
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
          {product.name}
        </h3>
        <p className="mt-2 text-2xl md:text-3xl font-bold text-[#FF4D2E] tracking-tight">
          {displayPrice}
        </p>
      </div>

      <p className="text-[#b0b0b0] text-sm leading-relaxed mb-6 flex-1">
        {product.description}
      </p>

      {/* PWYW Amount Input */}
      {product.pwywEnabled && product.priceCents === 0 && (
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <label className="block text-xs text-[#b0b0b0] mb-2" htmlFor={`amount-${product.id}`}>
            {product.pwywMinCents > 0
              ? `Minimum: ${formatPrice(product.pwywMinCents, product.currency)}`
              : 'Enter any amount (or leave at 0 for free)'}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-white text-lg font-medium">$</span>
            <input
              id={`amount-${product.id}`}
              type="number"
              min="0"
              step="0.01"
              value={customAmount}
              onChange={(e) => {
                const val = e.target.value
                setCustomAmount(val === '' ? '' : parseFloat(val))
              }}
              className="w-full bg-transparent text-white text-lg font-medium border-b border-white/20 focus:border-[#FF4D2E] outline-none py-1"
              placeholder="0.00"
            />
          </div>
          {product.pwywSuggestedCents > 0 && (
            <button
              onClick={() => setCustomAmount(product.pwywSuggestedCents / 100)}
              className="mt-2 text-xs text-[#FF4D2E] hover:text-[#FF4D2E]/80 transition-colors"
            >
              Suggested: {formatPrice(product.pwywSuggestedCents, product.currency)}
            </button>
          )}
        </div>
      )}

      <div className="mt-auto">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-[#0a0a0a] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#FF4D2E] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Redirecting...
            </>
          ) : product.pwywEnabled && product.priceCents === 0 ? (
            <>
              <Download className="h-4 w-4" aria-hidden="true" />
              {typeof customAmount === 'number' && customAmount > 0 ? 'Pay & Download' : 'Get Free'}
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Buy Now
            </>
          )}
          <ExternalLink className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
