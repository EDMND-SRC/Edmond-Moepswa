export function normalizeMediaPath(value: string): string {
  if (!value) return value

  const trimmed = value.trim()

  if (!trimmed) return trimmed

  if (trimmed.startsWith('/api/media/file/')) {
    return trimmed.replace('/api/media/file/', '/media/')
  }

  try {
    const url = new URL(trimmed)

    if (url.pathname.startsWith('/api/media/file/')) {
      url.pathname = url.pathname.replace('/api/media/file/', '/media/')
      return url.toString()
    }
  } catch {
    return trimmed
  }

  return trimmed
}
