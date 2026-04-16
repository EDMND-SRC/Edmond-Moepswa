import { getPayloadSingleton } from '@/lib/payload'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadSingleton()
    const { searchParams } = req.nextUrl
    
    // Parse limit from query params, default to 10
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : 10
    
    // Parse where filter if provided (basic implementation for category filter)
    // Example: ?where[category][not_equals]=boilerplate
    // In a real app, you might want a more robust query parser, but for this use case 
    // we'll handle the specific filters used by the frontend.
    const whereQuery: any = {}
    
    // Handle category filter specifically as used in ProjectsSection.tsx
    if (searchParams.has('where[category][not_equals]')) {
      whereQuery.category = {
        not_equals: searchParams.get('where[category][not_equals]')
      }
    }

    const result = await payload.find({
      collection: 'projects',
      depth: 1, // Ensure thumbnail (media) is populated
      limit: limit,
      sort: '-createdAt',
      where: whereQuery,
      overrideAccess: false,
    })

    // Diagnostic logging for thumbnails
    const projectsWithThumbnails = result.docs.filter(p => p.thumbnail).length
    console.log(`[API/Projects] Fetched ${result.docs.length} projects. ${projectsWithThumbnails} have thumbnails.`)
    
    // Detailed diagnostic for missing thumbnails
    if (projectsWithThumbnails < result.docs.length) {
      const missing = result.docs.filter(p => !p.thumbnail).map(p => p.title)
      console.warn(`[API/Projects] Missing thumbnails for:`, missing)
    }

    return NextResponse.json({ projects: result.docs })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ projects: [] }, { status: 500 })
  }
}
