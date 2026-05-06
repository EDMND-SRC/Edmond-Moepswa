import { withPostgresClient } from '@/lib/server/postgres'
import type { Media } from '@/types/content'
import { normalizeMediaPath } from '@/utilities/normalizeMediaPath'

const VALID_CATEGORIES = ['websites', 'applications', 'automation', 'products'] as const

type ValidCategory = (typeof VALID_CATEGORIES)[number]

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

export interface PublicProject {
  category: string
  description: string
  id: number
  link: string | null
  thumbnail: Media | null
  title: string
  year: string
}

function toNumber(value: number | string | null | undefined): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    return Number.isNaN(parsed) ? null : parsed
  }

  return null
}

function toUpdatedAt(value: Date | string | null | undefined) {
  if (value instanceof Date) return value.toISOString()
  return typeof value === 'string' ? value : ''
}

function normalizeProjectLink(link: string | null | undefined) {
  const trimmed = typeof link === 'string' ? link.trim() : ''

  if (!trimmed || trimmed === '#') {
    return null
  }

  if (trimmed.startsWith('/')) {
    return trimmed
  }

  try {
    const url = new URL(trimmed)
    if (url.hostname === 'github.com') {
      const pathParts = url.pathname.split('/').filter(Boolean)
      if (pathParts.length <= 1) {
        return null
      }
    }
    return url.toString()
  } catch {
    return null
  }
}

export async function getProjects(options?: {
  category?: string | null
  limit?: number
}): Promise<PublicProject[]> {
  const requestedLimit = options?.limit ?? 100
  const limit = Math.max(1, Math.min(1000, requestedLimit))
  const category =
    options?.category && VALID_CATEGORIES.includes(options.category as ValidCategory)
      ? (options.category as ValidCategory)
      : null

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

    if (category) {
      queryValues.push(category)
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
        id: toNumber(thumbnail.id) ?? 0,
        mimeType: thumbnail.mime_type ?? '',
        updatedAt: toUpdatedAt(thumbnail.updated_at),
        url: normalizeMediaPath(thumbnail.url ?? ''),
        width: toNumber(thumbnail.width),
      } satisfies Media,
    ]),
  )

  return result.rows.map((doc) => {
    const thumbnailId = toNumber(doc.thumbnail_id)

    return {
      category: doc.category ?? '',
      description: doc.description ?? '',
      id: toNumber(doc.id) ?? 0,
      link: normalizeProjectLink(doc.link),
      thumbnail: thumbnailId === null ? null : (thumbnailById.get(thumbnailId) ?? null),
      title: doc.title ?? '',
      year: doc.year ?? '',
    }
  })
}
