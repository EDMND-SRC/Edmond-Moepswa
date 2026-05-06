import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const KNOWN_PUBLIC_PATHS = new Set([
  '/',
  '/about',
  '/cancellation-policy',
  '/contact',
  '/legal-restrictions',
  '/privacy-policy',
  '/refund-policy',
  '/resources',
  '/resources/success',
  '/search',
  '/services',
  '/terms-and-conditions',
])

function createNotFoundHTML(origin: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404: Page not found.</title>
    <meta name="robots" content="noindex" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #0a0a0a;
        --fg: #ffffff;
        --muted: #cfcfcf;
        --accent: #ff4d2e;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--fg);
        background:
          radial-gradient(circle at 50% 50%, rgba(255, 77, 46, 0.18), transparent 34%),
          var(--bg);
      }
      main {
        max-width: 42rem;
        text-align: center;
      }
      p.label {
        margin: 0 0 20px;
        color: var(--accent);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: clamp(3rem, 6vw, 5.25rem);
        line-height: 0.92;
        letter-spacing: -0.04em;
        text-wrap: balance;
      }
      p.body {
        margin: 24px auto 0;
        max-width: 34rem;
        color: var(--muted);
        font-size: 1.05rem;
        line-height: 1.75;
      }
      a.button {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 40px;
        padding: 16px 28px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--fg);
        font-weight: 700;
        text-decoration: none;
        box-shadow: 0 18px 50px rgba(255, 77, 46, 0.25);
      }
    </style>
  </head>
  <body>
    <main>
      <p class="label">404 Error</p>
      <h1>Page not found.</h1>
      <p class="body">
        The page you were trying to reach doesn’t exist, has moved, or was never part of this
        launch build.
      </p>
      <a class="button" href="${origin}/">Back to Homepage</a>
    </main>
  </body>
</html>`
}

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/media') ||
    pathname.startsWith('/favicon') ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/site.webmanifest' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/pages-sitemap.xml' ||
    pathname === '/google75a7bf2c52475f25.html'
  ) {
    return NextResponse.next()
  }

  if (KNOWN_PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next()
  }

  return new NextResponse(createNotFoundHTML(origin), {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
    },
    status: 404,
  })
}

export const config = {
  matcher: ['/((?!.*\\..*).*)'],
}
