import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  // IE redirect removed — Internet Explorer is no longer supported.
  return []
}
