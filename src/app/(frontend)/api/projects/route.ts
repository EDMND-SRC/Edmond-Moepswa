import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

const VALID_CATEGORIES = ['websites', 'applications', 'automation', 'products']

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { searchParams } = req.nextUrl

    // Parse and validate limit
    const limitParam = searchParams.get('limit')
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 100
    const limit = Number.isNaN(parsedLimit) ? 100 : Math.max(1, Math.min(1000, parsedLimit))

    const whereQuery: { category?: { equals: string } } = {}

    // Support exact category filter: ?category=websites
    const category = searchParams.get('category')
    if (category && VALID_CATEGORIES.includes(category)) {
      whereQuery.category = { equals: category }
    }

    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      sort: '-createdAt',
      where: whereQuery,
      overrideAccess: false,
    })

    // Diagnostic logging for thumbnails
    const projectsWithThumbnails = result.docs.filter((p) => p.thumbnail).length
    console.log(
      `[API/Projects] Fetched ${result.docs.length} projects. ${projectsWithThumbnails} have thumbnails.`,
    )

    if (projectsWithThumbnails < result.docs.length) {
      const missing = result.docs.filter((p) => !p.thumbnail).map((p) => p.title)
      console.warn(`[API/Projects] Missing thumbnails for:`, missing)
    }

    return NextResponse.json({ docs: result.docs })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ docs: [] }, { status: 500 })
  }
}
