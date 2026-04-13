import { getPayloadSingleton } from '@/lib/payload'
import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

const getServices = async () => {
  const payload = await getPayloadSingleton()
  const result = await payload.find({
    collection: 'services',
    depth: 0,
    limit: 20,
    sort: 'title',
    overrideAccess: false,
  })
  return result.docs
}

const getCachedServices = () =>
  unstable_cache(async () => getServices(), ['services'], {
    tags: ['services'],
  })

export async function GET() {
  try {
    const services = await getCachedServices()()
    return NextResponse.json({ services })
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json({ services: [] }, { status: 500 })
  }
}
