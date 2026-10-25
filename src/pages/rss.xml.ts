import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { SITE } from '~/consts'
import { getAllPosts } from '~/lib/posts'

export async function GET(context: APIContext) {
  const posts = await getAllPosts()
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: '/posts/' + p.id,
      categories: p.data.tags,
    })),
    customData: '<language>ko</language>',
  })
}
