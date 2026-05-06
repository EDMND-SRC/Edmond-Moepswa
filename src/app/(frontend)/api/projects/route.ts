import { NextRequest, NextResponse } from 'next/server'
import { getProjects } from '@/lib/server/projects'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    // Parse and validate limit
    const limitParam = searchParams.get('limit')
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 100
    const limit = Number.isNaN(parsedLimit) ? 100 : Math.max(1, Math.min(1000, parsedLimit))

    const category = searchParams.get('category')
    const docs = await getProjects({ category, limit })

    return NextResponse.json({ docs })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ docs: [] }, { status: 500 })
  }
}
