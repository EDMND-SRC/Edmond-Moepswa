import { getServerSideSitemap } from 'next-sitemap'
import { getLaunchSitemapEntries } from '@/content/launchSnapshot'
import { unstable_cache } from 'next/cache.js'
import { toBufferedResponse } from '@/utilities/toBufferedResponse'

const getPagesSitemap = unstable_cache(
  async () => {
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    return getLaunchSitemapEntries(SITE_URL)
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return toBufferedResponse(await getServerSideSitemap(sitemap))
}
