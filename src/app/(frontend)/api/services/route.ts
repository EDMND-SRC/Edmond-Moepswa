import { NextResponse } from 'next/server'
import { launchServices } from '@/content/launchSnapshot'

export async function GET() {
  try {
    return NextResponse.json({ services: launchServices })
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json({ services: [] }, { status: 500 })
  }
}
