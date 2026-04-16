import { Media } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL or Media object to ensure proper formatting
 * @param media The original URL string or Media object
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (
  media: string | Media | null | undefined,
  cacheTag?: string | null,
): string => {
  if (!media) return ''

  let url: string
  if (typeof media === 'object' && 'url' in media && media.url) {
    url = media.url
  } else if (typeof media === 'string') {
    url = media
  } else {
    return ''
  }

  if (!url) return ''

  // Fix Payload 3.x internal URLs if served from public/media
  if (url.startsWith('/api/media/file/')) {
    url = url.replace('/api/media/file/', '/media/')
  }

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
