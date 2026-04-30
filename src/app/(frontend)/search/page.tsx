import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CardPostData } from '@/components/Card'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// ISR: Revalidate search results every hour
export const revalidate = 3600
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const normalizedQuery = query?.trim().toLowerCase() ?? ''

  const searchResults = normalizedQuery
    ? await (await getPayload({ config: configPromise })).find({
        collection: 'search',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: '-updatedAt',
        select: {
          doc: true,
          meta: true,
          slug: true,
          title: true,
        },
        pagination: false,
      })
    : { docs: [] }

  const filteredDocs = normalizedQuery
    ? searchResults.docs.filter((doc) => {
        return [doc.title, doc.meta?.title, doc.meta?.description, doc.slug].some((value) => {
          return typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)
        })
      })
    : searchResults.docs

  const mappedPosts: CardPostData[] = filteredDocs.slice(0, 12).map((doc) => {
    const href =
      doc.doc.relationTo === 'pages'
        ? doc.slug === 'home'
          ? '/'
          : doc.slug
            ? `/${doc.slug}`
            : null
        : null

    return {
      categories: null,
      href,
      id: doc.id,
      meta: doc.meta
        ? {
            description: doc.meta.description ?? null,
            image: doc.meta.image ?? null,
            title: doc.meta.title ?? null,
          }
        : null,
      slug: doc.slug ?? null,
      title: doc.title ?? null,
    }
  })

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
