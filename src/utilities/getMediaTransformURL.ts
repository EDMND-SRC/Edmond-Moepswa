import { getServerSideURL } from './getURL'

type MediaTransformFit = 'contain' | 'cover' | 'scale-down'

interface MediaTransformOptions {
  baseURL?: string
  cacheTag?: string | null
  fit?: MediaTransformFit
  height?: number
  quality?: number
  sourceURL: string
  width?: number
}

const NON_TRANSFORMABLE_EXTENSIONS = new Set(['.gif', '.svg', '.svgz'])

const isAbsoluteURL = (value: string) => /^https?:\/\//i.test(value)

const getExtension = (value: string) => {
  const pathname = isAbsoluteURL(value) ? new URL(value).pathname : value
  const lastDotIndex = pathname.lastIndexOf('.')

  if (lastDotIndex === -1) {
    return ''
  }

  return pathname.slice(lastDotIndex).toLowerCase()
}

export const canTransformMediaURL = (sourceURL: string): boolean => {
  if (!sourceURL || sourceURL.includes('/api/media/transform')) {
    return false
  }

  return !NON_TRANSFORMABLE_EXTENSIONS.has(getExtension(sourceURL))
}

export const getMediaTransformURL = ({
  baseURL = getServerSideURL(),
  cacheTag,
  fit = 'scale-down',
  height,
  quality = 85,
  sourceURL,
  width,
}: MediaTransformOptions): string => {
  const routeURL = new URL('/api/media/transform', baseURL)

  routeURL.searchParams.set('src', sourceURL)

  if (width) {
    routeURL.searchParams.set('w', String(width))
  }

  if (height) {
    routeURL.searchParams.set('h', String(height))
  }

  routeURL.searchParams.set('fit', fit)
  routeURL.searchParams.set('q', String(quality))

  if (cacheTag) {
    routeURL.searchParams.set('v', cacheTag)
  }

  return routeURL.toString()
}
