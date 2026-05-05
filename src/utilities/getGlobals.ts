import type { Config } from '@/payload-types'

import { launchFooter, launchHeader, launchSiteSettings } from '@/content/launchSnapshot'
import { unstable_cache } from 'next/cache.js'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0): Promise<Config['globals'][T]> {
  void depth

  switch (slug) {
    case 'header':
      return launchHeader as Config['globals'][T]
    case 'footer':
      return launchFooter as Config['globals'][T]
    case 'site-settings':
      return launchSiteSettings as Config['globals'][T]
    default:
      throw new Error(`Unsupported launch global: ${String(slug)}`)
  }
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
