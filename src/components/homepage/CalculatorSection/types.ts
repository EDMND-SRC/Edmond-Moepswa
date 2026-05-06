export interface CalculatorSelections {
  service: string
  serviceLabel: string
  tier: string
  tierLabel: string
  tierPriceBWP: number
  delivery: string
  deliveryLabel: string
  deliveryCostBWP: number
  formattedDeliveryCost?: string
  deliveryMultiplier: number
  staticDiscount: boolean
  staticDiscountBWP: number
  formattedStaticDiscount?: string
  estimatedTotalBWP: number
  formattedTotal: string
  formattedBase: string
  currency: string
}

export interface QuotePdfClient {
  email?: string
  name?: string
  phone?: string
}

export interface QuotePdfRequestBody {
  client?: QuotePdfClient
  notes?: string
  scopeTags?: string[]
  selections: CalculatorSelections
}
