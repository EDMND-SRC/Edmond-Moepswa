import { NextRequest, NextResponse } from 'next/server'
import { launchPages } from '@/content/launchSnapshot'

export async function GET(req: NextRequest) {
  try {
    const limitParam = req.nextUrl.searchParams.get('limit')
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 100
    const limit = Number.isNaN(parsedLimit) ? 100 : Math.max(1, Math.min(1000, parsedLimit))
    const docs = launchPages.slice(0, limit).map((page) => ({
      meta: page.meta ?? null,
      publishedAt: page.publishedAt ?? null,
      slug: page.slug ?? null,
      title: page.title ?? null,
      updatedAt: page.updatedAt ?? null,
    }))

    return NextResponse.json({
      docs,
      hasNextPage: false,
      hasPrevPage: false,
      limit,
      nextPage: null,
      page: 1,
      pagingCounter: docs.length > 0 ? 1 : 0,
      prevPage: null,
      totalDocs: docs.length,
      totalPages: docs.length > 0 ? 1 : 0,
    })
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
