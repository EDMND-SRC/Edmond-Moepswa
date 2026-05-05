export async function GET(): Promise<Response> {
  return new Response('Live preview is disabled for this launch build', { status: 404 })
}
