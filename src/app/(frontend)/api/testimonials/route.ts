import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'testimonials',
      depth: 0,
      limit: 10,
      overrideAccess: false,
      select: {
        clientName: true,
        clientRole: true,
        content: true,
        rating: true,
        updatedAt: true,
      },
      sort: '-createdAt',
    })

    const testimonials = result.docs.map((doc) => ({
      clientName: doc.clientName ?? '',
      clientRole: doc.clientRole ?? '',
      content: doc.content ?? '',
      id: doc.id,
      rating: doc.rating ?? 5,
      updatedAt: doc.updatedAt,
    }))

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return NextResponse.json({ testimonials: [] }, { status: 500 })
  }
}
