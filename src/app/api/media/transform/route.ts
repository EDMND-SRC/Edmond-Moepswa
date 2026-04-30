const ALLOWED_FITS = new Set(['contain', 'cover', 'scale-down'])
const PARAMETER_PATTERN = /^\d+$/

const getPositiveInteger = (
  value: string | null,
  { max, min = 1 }: { max?: number; min?: number } = {},
): number | undefined => {
  if (!value || !PARAMETER_PATTERN.test(value)) {
    return undefined
  }

  const parsedValue = Number.parseInt(value, 10)

  if (!Number.isFinite(parsedValue) || parsedValue < min) {
    return undefined
  }

  if (typeof max === 'number' && parsedValue > max) {
    return undefined
  }

  return parsedValue
}

const getAllowedHosts = (requestURL: URL): Set<string> => {
  const hosts = new Set([requestURL.hostname])

  for (const envURL of [process.env.NEXT_PUBLIC_SERVER_URL, process.env.R2_PUBLIC_URL]) {
    if (!envURL) {
      continue
    }

    try {
      hosts.add(new URL(envURL).hostname)
    } catch {
      // Ignore malformed environment values and continue using safe defaults.
    }
  }

  return hosts
}

const resolveSourceURL = (requestURL: URL, sourceValue: string): URL => {
  if (sourceValue.startsWith('/')) {
    return new URL(sourceValue, requestURL)
  }

  return new URL(sourceValue)
}

export async function GET(request: Request) {
  const requestURL = new URL(request.url)
  const sourceValue = requestURL.searchParams.get('src')

  if (!sourceValue) {
    return new Response('Missing src parameter', { status: 400 })
  }

  const sourceURL = resolveSourceURL(requestURL, sourceValue)

  if (sourceURL.pathname.startsWith('/api/media/transform')) {
    return new Response('Recursive transform requests are not allowed', { status: 400 })
  }

  const allowedHosts = getAllowedHosts(requestURL)

  if (!allowedHosts.has(sourceURL.hostname)) {
    return new Response('Disallowed media host', { status: 400 })
  }

  const fitParam = requestURL.searchParams.get('fit')
  const fit = fitParam && ALLOWED_FITS.has(fitParam) ? fitParam : 'scale-down'
  const width = getPositiveInteger(requestURL.searchParams.get('w'))
  const height = getPositiveInteger(requestURL.searchParams.get('h'))
  const quality = getPositiveInteger(requestURL.searchParams.get('q'), { max: 100 }) ?? 85

  const forwardHeaders = new Headers()
  const acceptHeader = request.headers.get('accept')

  if (acceptHeader) {
    forwardHeaders.set('accept', acceptHeader)
  }

  const transformRequestInit = {
    headers: forwardHeaders,
    cf: {
      image: {
        fit,
        format: 'auto',
        height,
        quality,
        width,
      },
    },
  } as RequestInit & {
    cf: {
      image: {
        fit: string
        format: string
        height?: number
        quality: number
        width?: number
      }
    }
  }

  const transformedResponse = await fetch(sourceURL, transformRequestInit)

  if (!transformedResponse.ok && !transformedResponse.redirected && transformedResponse.status !== 304) {
    return fetch(sourceURL, { headers: forwardHeaders })
  }

  const responseHeaders = new Headers(transformedResponse.headers)
  responseHeaders.set('Cache-Control', 'public, max-age=31536000, immutable')

  return new Response(transformedResponse.body, {
    headers: responseHeaders,
    status: transformedResponse.status,
    statusText: transformedResponse.statusText,
  })
}
