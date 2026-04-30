import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { canTransformMediaURL, getMediaTransformURL } from './getMediaTransformURL'
import { getMediaUrl } from './getMediaUrl'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/og-image'

  if (image && typeof image === 'object' && 'url' in image) {
    const imageURL = getMediaUrl(image.url)

    if (imageURL) {
      url = canTransformMediaURL(imageURL)
        ? getMediaTransformURL({
            baseURL: serverUrl,
            fit: 'cover',
            height: 630,
            sourceURL: imageURL,
            width: 1200,
          })
        : imageURL
    }
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
