import { NextResponse } from 'next/server'
import { launchSnapshotUpdatedAt, launchTestimonials } from '@/content/launchSnapshot'

export async function GET() {
  try {
    const testimonials = launchTestimonials.map((doc) => ({
      clientName: doc.clientName ?? '',
      clientRole: doc.clientRole ?? '',
      content: doc.content ?? '',
      id: doc.id,
      rating: doc.rating ?? 5,
      updatedAt: launchSnapshotUpdatedAt,
    }))

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return NextResponse.json({ testimonials: [] }, { status: 500 })
  }
}
