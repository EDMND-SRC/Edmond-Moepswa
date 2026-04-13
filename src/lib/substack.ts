import Parser from 'rss-parser'

export const SUBSTACK_FEED_URL = process.env.SUBSTACK_FEED_URL || 'https://edmnd.substack.com/feed'

export async function getSubstackPosts() {
  const parser = new Parser()
  try {
    const feed = await parser.parseURL(SUBSTACK_FEED_URL)
    return feed.items.slice(0, 3).map((item) => {
      const snippet = item.contentSnippet || ''
      const truncated = snippet.slice(0, 150)
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        contentSnippet: snippet.length > 150 ? truncated + '...' : truncated,
      }
    })
  } catch (error) {
    console.error('Error fetching Substack feed:', error)
    return []
  }
}
