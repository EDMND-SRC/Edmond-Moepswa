import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

const getFAQs = async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'faqs',
    where: {
      isActive: { equals: true },
    },
    sort: 'order',
    limit: 100,
    overrideAccess: false,
  })

  return result.docs
}

export async function GET() {
  try {
    const faqs = await getFAQs()
    return NextResponse.json({ faqs })
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    return NextResponse.json({ faqs: [] }, { status: 500 })
  }
}
