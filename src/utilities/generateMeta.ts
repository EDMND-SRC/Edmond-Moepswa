import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Page> | null }): Promise<Metadata> => {
  const { doc } = args

  // Page.meta doesn't have an image field in the generated types, but it may be populated
  // from search/collection metadata. Safely extract it without `as any`.
  const metaImage =
    typeof (doc?.meta as Record<string, unknown>)?.image === 'object'
      ? ((doc?.meta as Record<string, unknown>)?.image as Media)
      : undefined
  const ogImage = getImageURL(metaImage)

  const title = doc?.meta?.title
    ? `${doc?.meta?.title} | Edmond Moepswa`
    : 'Edmond Moepswa — Web Designer & Developer'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
