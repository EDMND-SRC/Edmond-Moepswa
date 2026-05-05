import { NextRequest, NextResponse } from 'next/server'
import { withPostgresClient } from '@/lib/server/postgres'

const VALID_CATEGORIES = ['websites', 'applications', 'automation', 'products']

type ProjectRow = {
  id: number | string
  title: string | null
  category: string | null
  year: string | null
  description: string | null
  thumbnail_id: number | string | null
  link: string | null
}

type MediaRow = {
  id: number | string
  alt: string | null
  url: string | null
  width: number | string | null
  height: number | string | null
  mime_type: string | null
  updated_at: Date | string | null
}

function toNumber(value: number | string | null | undefined): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    return Number.isNaN(parsed) ? null : parsed
  }

  return null
}

function toUpdatedAt(value: Date | string | null | undefined): string {
  if (value instanceof Date) {
    return value.toISOString()
  }

  return typeof value === 'string' ? value : ''
}

export async function GET(req: NextRequest) {
  try {
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

    const { result, thumbnails } = await withPostgresClient(async (client) => {
      const queryValues: Array<number | string> = []
      let projectQuery = `
        select
          id,
          title,
          category,
          year,
          description #>> '{root,children,0,children,0,text}' as description,
          thumbnail_id,
          link
        from projects
      `

      if (whereQuery.category?.equals) {
        queryValues.push(whereQuery.category.equals)
        projectQuery += ` where category = $${queryValues.length}`
      }

      queryValues.push(limit)
      projectQuery += ` order by created_at desc limit $${queryValues.length}`

      const result = (await client.query<ProjectRow>(projectQuery, queryValues)) as {
        rows: ProjectRow[]
      }

      const thumbnailIds = Array.from(
        new Set(
          result.rows.flatMap((row) => {
            const thumbnailId = toNumber(row.thumbnail_id)
            return thumbnailId === null ? [] : [thumbnailId]
          }),
        ),
      )

      const thumbnails =
        thumbnailIds.length > 0
          ? ((await client.query<MediaRow>(
              `
                select
                  id,
                  alt,
                  url,
                  width,
                  height,
                  mime_type,
                  updated_at
                from media
                where id = any($1::int[])
              `,
              [thumbnailIds],
            )) as { rows: MediaRow[] })
          : { rows: [] as MediaRow[] }

      return { result, thumbnails }
    })

    const thumbnailById = new Map(
      thumbnails.rows.map((thumbnail) => [
        toNumber(thumbnail.id),
        {
          alt: thumbnail.alt ?? '',
          height: toNumber(thumbnail.height),
          mimeType: thumbnail.mime_type ?? '',
          updatedAt: toUpdatedAt(thumbnail.updated_at),
          url: thumbnail.url ?? '',
          width: toNumber(thumbnail.width),
        },
      ]),
    )

    const docs = result.rows.map((doc) => {
      const thumbnailId = toNumber(doc.thumbnail_id)

      return {
        category: doc.category ?? '',
        description: doc.description ?? '',
        id: toNumber(doc.id) ?? 0,
        link: doc.link ?? '#',
        thumbnail: thumbnailId === null ? null : (thumbnailById.get(thumbnailId) ?? null),
        title: doc.title ?? '',
        year: doc.year ?? '',
      }
    })

    return NextResponse.json({ docs })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ docs: [] }, { status: 500 })
  }
}
