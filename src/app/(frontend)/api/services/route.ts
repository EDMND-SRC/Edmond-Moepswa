import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

const getServices = async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    depth: 0,
    limit: 20,
    sort: 'title',
    overrideAccess: false,
  })
  return result.docs
}

export async function GET() {
  try {
    const services = await getServices()
    return NextResponse.json({ services })
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json({ services: [] }, { status: 500 })
  }
}
