import type { Metadata } from 'next'

import { generateMeta } from '@/utilities/generateMeta'
import { getLaunchPageBySlug, getLaunchRedirectByFrom, launchPages } from '@/content/launchSnapshot'
import { notFound, redirect } from 'next/navigation'
import React, { cache } from 'react'

export const revalidate = 3600

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  return launchPages
    .filter((page) => page.slug !== 'home')
    .map((page) => ({ slug: page.slug }))
}

function resolveRedirectTarget(pathname: string) {
  const redirectEntry = getLaunchRedirectByFrom(pathname)

  if (!redirectEntry?.to) {
    return null
  }

  if (redirectEntry.to.url) {
    return redirectEntry.to.url
  }

  const referenceValue = redirectEntry.to.reference?.value

  if (typeof referenceValue === 'object' && referenceValue.slug) {
    return referenceValue.slug === 'home' ? '/' : `/${referenceValue.slug}`
  }

  return null
}

const queryPageBySlug = cache(async (slug: string) => {
  return getLaunchPageBySlug(slug)
})

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug(decodedSlug)

  if (!page) {
    const redirectTarget = resolveRedirectTarget(`/${decodedSlug}`)

    if (redirectTarget) {
      redirect(redirectTarget)
    }

    notFound()
  }

  return (
    <article className="container pt-24 pb-24">
      <div className="max-w-3xl space-y-6">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF4D2E]">Snapshot Page</p>
        <h1 className="text-4xl md:text-5xl tracking-tight">{page.title}</h1>
        {page.meta?.description ? (
          <p className="text-lg text-muted-foreground leading-relaxed">{page.meta.description}</p>
        ) : null}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  return generateMeta({ doc: await queryPageBySlug(decodedSlug) })
}
