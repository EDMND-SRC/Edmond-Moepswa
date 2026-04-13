import { getPayloadSingleton } from '@/lib/payload'
import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

const getTestimonials = async () => {
  const payload = await getPayloadSingleton()
  const result = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: 10,
    sort: '-createdAt',
    overrideAccess: false,
  })
  return result.docs
}

const getCachedTestimonials = () =>
  unstable_cache(async () => getTestimonials(), ['testimonials'], {
    tags: ['testimonials'],
  })

export async function GET() {
  try {
    const testimonials = await getCachedTestimonials()()
    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return NextResponse.json({ testimonials: [] }, { status: 500 })
  }
}
