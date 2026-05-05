import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { searchLaunchDocuments } from '@/content/launchSnapshot'

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
  const mappedPosts = normalizedQuery ? searchLaunchDocuments(normalizedQuery) : []

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
