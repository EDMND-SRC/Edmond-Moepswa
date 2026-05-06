import { NextResponse } from 'next/server'
import { getFaqs } from '@/lib/server/faqs'

export async function GET() {
  try {
    const faqs = await getFaqs()
    return NextResponse.json({ faqs })
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    return NextResponse.json({ faqs: [] }, { status: 500 })
  }
}
