import type { ArchiveBlock as ArchiveBlockType, Project } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

function projectToCardPostData(project: Project) {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    meta: project.meta
      ? {
          title: project.meta.title ?? null,
          description: project.meta.description ?? null,
          image: null,
        }
      : null,
    categories: [],
  }
}

export const ArchiveBlock: React.FC<
  ArchiveBlockType & {
    id?: string
    disableInnerContainer?: boolean
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: ReturnType<typeof projectToCardPostData>[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedPosts = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      overrideAccess: false,
    })

    posts = fetchedPosts.docs.map(projectToCardPostData)
  } else {
    if (selectedDocs?.length) {
      posts = selectedDocs
        .map((post) => {
          if (typeof post.value === 'object' && post.value !== null) {
            return projectToCardPostData(post.value as Project)
          }
          return null
        })
        .filter((p): p is NonNullable<typeof p> => p !== null)
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
