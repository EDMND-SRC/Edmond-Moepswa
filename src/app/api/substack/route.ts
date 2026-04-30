import { NextResponse } from 'next/server'

// ── Rate limiter ──────────────────────────────────────────────────────────────

const rateLimit = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + windowMs })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

const SUBSTACK_FEED_URL = process.env.SUBSTACK_FEED_URL || 'https://edmnd.substack.com/feed'

export async function GET(request: Request) {
  // Rate limiting (5 requests per minute per IP for substack)
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(ip, 5, 60000)) {
    return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
  }

  // If the feed URL is explicitly disabled (set to '#' or empty string in env),
  // return empty array to trigger client-side fallback.
  const envFeedUrl = process.env.SUBSTACK_FEED_URL
  if (envFeedUrl === '#' || envFeedUrl === '') {
    return NextResponse.json([])
  }

  try {
    const response = await fetch(SUBSTACK_FEED_URL)
    if (!response.ok) throw new Error('Failed to fetch feed')
    const xml = await response.text()

    // Simple XML extraction for Substack RSS items
    const items = xml.split('<item>').slice(1)
    const posts = items.slice(0, 3).map((item) => {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || item.match(/<title>(.*?)<\/title>/)?.[1] || ''
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || ''
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
      const contentSnippet = (item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || item.match(/<description>(.*?)<\/description>/)?.[1] || '').replace(/<[^>]*>?/gm, '').slice(0, 150) + '...'
      
      return { title, link, pubDate, contentSnippet }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching Substack feed:', error)
    return NextResponse.json([], { status: 500 })
  }
}
