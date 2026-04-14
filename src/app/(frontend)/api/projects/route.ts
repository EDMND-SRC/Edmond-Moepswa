import { getPayloadSingleton } from '@/lib/payload'
import { NextResponse } from 'next/server'

const getProjects = async () => {
  const payload = await getPayloadSingleton()
  const result = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 10,
    sort: '-createdAt',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      category: true,
      thumbnail: true,
      featured: true,
      description: true,
      year: true,
      link: true,
    },
  })
  return result.docs
}

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ projects: [] }, { status: 500 })
  }
}
