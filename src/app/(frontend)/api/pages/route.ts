import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const limitParam = req.nextUrl.searchParams.get('limit')
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 100
    const limit = Number.isNaN(parsedLimit) ? 100 : Math.max(1, Math.min(1000, parsedLimit))

    const result = await payload.find({
      collection: 'pages',
      depth: 0,
      limit,
      overrideAccess: false,
      pagination: true,
      sort: '-updatedAt',
      select: {
        meta: true,
        publishedAt: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    return NextResponse.json(
      {
        docs: [],
        hasNextPage: false,
        hasPrevPage: false,
        limit: 0,
        nextPage: null,
        page: 1,
        pagingCounter: 0,
        prevPage: null,
        totalDocs: 0,
        totalPages: 0,
      },
      { status: 500 },
    )
  }
}
