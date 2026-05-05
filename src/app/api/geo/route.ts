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

/**
 * Server-side geo detection proxy.
 * Avoids CORS issues with ipapi.co by fetching from the server.
 */
export async function GET(request: Request) {
  // Rate limiting (30 requests per minute per IP for geo)
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(ip, 30, 60000)) {
    return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
  }

  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'User-Agent': 'edmond/1.0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (response.ok) {
      const data = (await response.json()) as {
        city?: string | null
        country_code?: string | null
        country_name?: string | null
        region?: string | null
      }
      return NextResponse.json({
        country_code: data.country_code || null,
        country_name: data.country_name || null,
        city: data.city || null,
        region: data.region || null,
      })
    }
  } catch (error) {
    console.error('Geo endpoint error:', error)
  }

  return NextResponse.json({
    country_code: null,
    country_name: null,
    city: null,
    region: null,
  })
}
