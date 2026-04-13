import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

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

  const parser = new Parser()
  try {
    const feed = await parser.parseURL(SUBSTACK_FEED_URL)
    const posts = feed.items.slice(0, 3).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet?.slice(0, 150) + '...',
    }))
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching Substack feed:', error)
    return NextResponse.json([], { status: 500 })
  }
}
