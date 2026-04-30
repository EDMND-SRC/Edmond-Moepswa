// Adaptive Currency Conversion
// Display-only currency toggle — no checkout integration.
// Base prices are in BWP. Converted to visitor's detected currency at display time.

export interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  countryCodes: string[]
}

// Supported currencies with country mappings for geo-detection
export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'BWP', symbol: 'P', name: 'Botswana Pula', countryCodes: ['BW'] },
  { code: 'USD', symbol: '$', name: 'US Dollar', countryCodes: ['US'] },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    countryCodes: [
      'DE',
      'FR',
      'IT',
      'ES',
      'NL',
      'BE',
      'AT',
      'PT',
      'IE',
      'FI',
      'GR',
      'LU',
      'MT',
      'CY',
      'EE',
      'LV',
      'LT',
      'SK',
      'SI',
    ],
  },
  { code: 'GBP', symbol: '£', name: 'British Pound', countryCodes: ['GB'] },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', countryCodes: ['ZA'] },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', countryCodes: ['AU'] },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', countryCodes: ['CA'] },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', countryCodes: ['IN'] },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', countryCodes: ['NG'] },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', countryCodes: ['KE'] },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', countryCodes: ['GH'] },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', countryCodes: ['AE'] },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', countryCodes: ['SG'] },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', countryCodes: ['JP'] },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', countryCodes: ['CN'] },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', countryCodes: ['BR'] },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', countryCodes: ['MX'] },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', countryCodes: ['CH'] },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', countryCodes: ['NZ'] },
]

// Country code to currency mapping for quick lookup
const COUNTRY_TO_CURRENCY = new Map<string, string>()
SUPPORTED_CURRENCIES.forEach((currency) => {
  currency.countryCodes.forEach((code) => {
    COUNTRY_TO_CURRENCY.set(code, currency.code)
  })
})

const CACHE_KEY = 'currency_rates'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

interface CachedRates {
  rates: Record<string, number>
  timestamp: number
  base: string
}

/**
 * Detect currency from country code returned by the geo lookup service.
 */
export function detectCurrencyFromCountry(countryCode: string | undefined): string {
  if (!countryCode) return 'BWP'
  return COUNTRY_TO_CURRENCY.get(countryCode.toUpperCase()) || 'BWP'
}

/**
 * Get cached exchange rates or fetch fresh ones
 * Rates are BWP → target currency (e.g., 1 BWP = X USD)
 */
export async function getExchangeRates(): Promise<Record<string, number>> {
  // Check cache first (client-side localStorage)
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const parsed: CachedRates = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return parsed.rates
        }
      } catch {
        // Invalid cache, fetch fresh
      }
    }
  }

  // Fetch fresh rates from free API
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/BWP')
    const data = (await response.json()) as { rates?: Record<string, number> }
    const rates: Record<string, number> = data.rates || {}

    // Cache in localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const cache: CachedRates = {
        rates,
        timestamp: Date.now(),
        base: 'BWP',
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
    }

    return rates
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error)
    // Return fallback rates (approximate as of early 2026)
    return {
      USD: 0.073,
      EUR: 0.067,
      GBP: 0.058,
      ZAR: 1.35,
      AUD: 0.11,
      CAD: 0.1,
      INR: 6.35,
      NGN: 112,
      KES: 9.4,
      GHS: 1.1,
      AED: 0.27,
      SGD: 0.1,
      JPY: 11.2,
      CNY: 0.53,
      BRL: 0.42,
      MXN: 1.45,
      CHF: 0.065,
      NZD: 0.12,
    }
  }
}

/**
 * Convert a BWP amount to target currency
 */
export function convertBWP(amount: number, rate: number): number {
  return Math.round(amount * rate * 100) / 100
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode)
  const symbol = currency?.symbol || ''

  // For large round numbers, don't show decimals
  if (amount >= 100) {
    return `${symbol}${amount.toLocaleString()}`
  }
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

/**
 * Get currency symbol for a currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  const currency = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode)
  return currency?.symbol || ''
}
