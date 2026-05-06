export interface SubstackPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
}

const DEFAULT_SUBSTACK_FEED_URL = 'https://edmnd.substack.com/feed'

function stripMarkup(value: string) {
  return value.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()
}

function extractTag(item: string, tag: string) {
  return (
    item.match(new RegExp(`<${tag}><!\\[CDATA\\[(.*?)\\]\\]><\\/${tag}>`))?.[1] ||
    item.match(new RegExp(`<${tag}>(.*?)<\\/${tag}>`))?.[1] ||
    ''
  )
}

export async function getSubstackPosts(limit = 3): Promise<SubstackPost[]> {
  const envFeedUrl = process.env.SUBSTACK_FEED_URL

  if (envFeedUrl === '#' || envFeedUrl === '') {
    return []
  }

  const feedUrl = envFeedUrl || DEFAULT_SUBSTACK_FEED_URL
  const response = await fetch(feedUrl, {
    next: { revalidate: 1800, tags: ['substack-feed'] },
  })

  if (!response.ok) {
    throw new Error(`Substack feed returned ${response.status}`)
  }

  const xml = await response.text()
  const items = xml.split('<item>').slice(1)

  return items.slice(0, limit).map((item) => ({
    contentSnippet: `${stripMarkup(extractTag(item, 'description')).slice(0, 150)}...`,
    link: extractTag(item, 'link'),
    pubDate: extractTag(item, 'pubDate'),
    title: extractTag(item, 'title'),
  }))
}
