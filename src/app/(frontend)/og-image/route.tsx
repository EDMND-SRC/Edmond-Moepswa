export function GET(request: Request) {
  return Response.redirect(new URL('/edmond-portrait-hero.webp', request.url), 307)
}
