import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { marked } from 'marked'
import { SITE } from '~/consts'
import { getAllPosts, readingMinutes } from '~/lib/posts'

export async function GET(context: APIContext) {
  const posts = await getAllPosts()
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((p) => {
      const url = new URL('/posts/' + p.id, SITE.url).href
      const minutes = readingMinutes(p.body ?? '')
      // 풀피드(content:encoded) — 본문 마크다운을 HTML로 렌더. import/JSX는 전부
      // 코드펜스 내부이므로 순수 마크다운 렌더로 안전하다(2026-11 실증).
      const bodyHtml = marked.parse(p.body ?? '', { async: false })
      const footer = `<p style="margin-top:24px;font-size:13px;color:#888">
<a href="${url}">원문에서 읽기</a> · ${minutes}분 읽기 · <a href="${SITE.github}">developjik</a>
</p>`
      return {
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.date,
        link: url,
        categories: p.data.tags,
        content: `<div style="max-width:42rem;line-height:1.75">${bodyHtml}${footer}</div>`,
      }
    }),
    customData: '<language>ko</language>',
  })
}
