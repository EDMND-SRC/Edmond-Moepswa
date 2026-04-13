import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// ISR: Revalidate search results every hour
export const revalidate = 3600
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  contains: query,
                },
              },
              {
                'meta.description': {
                  contains: query,
                },
              },
              {
                'meta.title': {
                  contains: query,
                },
              },
              {
                slug: {
                  contains: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  const mappedPosts: CardPostData[] = posts.docs.map((doc) => ({
    slug: doc.slug ?? null,
    title: doc.title ?? null,
    meta: doc.meta
      ? {
          title: doc.meta.title ?? null,
          description: doc.meta.description ?? null,
          image: doc.meta.image ?? null,
        }
      : null,
    categories: doc.categories?.map((cat) => ({ title: cat.title ?? null })) ?? null,
  }))

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {mappedPosts.length > 0 ? (
        <CollectionArchive posts={mappedPosts} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | Edmond Moepswa`,
  }
}
