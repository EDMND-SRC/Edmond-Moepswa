import { getPayloadSingleton } from '@/lib/payload'
import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

const getFAQs = async () => {
  const payload = await getPayloadSingleton()
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

const getCachedFAQs = () =>
  unstable_cache(async () => getFAQs(), ['faqs'], {
    tags: ['faqs'],
  })

export async function GET() {
  try {
    const faqs = await getCachedFAQs()()
    return NextResponse.json({ faqs })
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    return NextResponse.json({ faqs: [] }, { status: 500 })
  }
}
