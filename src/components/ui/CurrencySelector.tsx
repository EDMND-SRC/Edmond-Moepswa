'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SUPPORTED_CURRENCIES } from '@/lib/currency'

interface CurrencySelectorProps {
  selectedCurrency: string
  onCurrencyChange: (code: string) => void
  rates: Record<string, number>
  selectId?: string
}

export function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
  rates,
  selectId = 'currency-select',
}: CurrencySelectorProps) {
  const reducedMotion = useReducedMotion()
  const availableCurrencies = SUPPORTED_CURRENCIES.filter(
    (c) => c.code === 'BWP' || rates[c.code],
  )

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <label htmlFor={selectId} className="text-xs text-[#b0b0b0]">
        Display currency:
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="appearance-none bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-8 text-base text-white cursor-pointer min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] hover:bg-white/10 transition-colors"
          aria-label="Select display currency"
        >
          {availableCurrencies.map((c) => (
            <option key={c.code} value={c.code} className="bg-[#1a1a1a] text-white">
              {c.symbol} {c.code}
            </option>
          ))}
        </select>
        <svg
          className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#b0b0b0]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {selectedCurrency !== 'BWP' && (
        <motion.p
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          className="text-[10px] text-[#b0b0b0]/60 w-full"
        >
          Prices shown in {selectedCurrency} are approximate conversions. Final pricing in BWP.
        </motion.p>
      )}
    </div>
  )
}

CurrencySelector.displayName = 'CurrencySelector'
