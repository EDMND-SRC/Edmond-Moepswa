export const toBufferedResponse = async (response: Response): Promise<Response> => {
  const body = response.body ? await response.arrayBuffer() : null

  return new Response(body, {
    headers: new Headers(response.headers),
    status: response.status,
    statusText: response.statusText,
  })
}
