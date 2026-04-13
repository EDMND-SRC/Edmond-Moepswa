import { StoreClient, type DodoProduct } from './StoreClient'

export const revalidate = 60 // Revalidate every 60 seconds

async function getProducts(): Promise<DodoProduct[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://edmond-moepswa.vercel.app'
    const res = await fetch(`${baseUrl}/api/dodo-products`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      return data.products || []
    }
  } catch {
    // Products unavailable — return empty
  }
  return []
}

export default async function StorePage() {
  const products = await getProducts()

  return <StoreClient initialProducts={products} />
}
