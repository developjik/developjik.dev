import fs from 'node:fs'
import path from 'node:path'
import type { APIRoute, GetStaticPaths } from 'astro'
import satori from 'satori'
import sharp from 'sharp'
import { SITE } from '~/consts'
import { getAllPosts, isoDate } from '~/lib/posts'

const W = 1200
const H = 630

const fontsDir = path.join(
  process.cwd(),
  'node_modules/pretendard/dist/public/static'
)
const regular = fs.readFileSync(path.join(fontsDir, 'Pretendard-Regular.otf'))
const bold = fs.readFileSync(path.join(fontsDir, 'Pretendard-Bold.otf'))

export const getStaticPaths = (async () => {
  const posts = await getAllPosts()
  return [
    { params: { slug: 'index' } },
    ...posts.map((p) => ({ params: { slug: p.id } })),
  ]
}) satisfies GetStaticPaths

function template(opts: { kicker: string; title: string; meta: string }) {
  const paper = '#f9f7f0'
  const ink = '#1d1912'
  const accent = '#1f6a4d'
  const faint = '#918977'
  const line = '#b9b096'
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 84px',
        background: paper,
        fontFamily: 'Pretendard',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { width: '100%', height: 3, background: ink },
                },
              },
              {
                type: 'div',
                props: {
                  style: { width: '100%', height: 1, background: ink },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'Pretendard',
                    fontSize: 24,
                    letterSpacing: 5,
                    color: accent,
                    fontWeight: 600,
                    marginTop: 18,
                  },
                  children: [
                    { type: 'div', props: { children: 'DEVELOPJIK.DEV' } },
                    { type: 'div', props: { children: opts.kicker } },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: opts.title.length > 40 ? 60 : 72,
              fontWeight: 700,
              color: ink,
              lineHeight: 1.3,
              letterSpacing: -1.5,
              maxWidth: 980,
              textWrap: 'wrap',
            },
            children: opts.title,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: `1px solid ${line}`,
                    paddingTop: 22,
                    fontSize: 24,
                    color: faint,
                    fontWeight: 500,
                  },
                  children: [
                    { type: 'div', props: { children: opts.meta } },
                    {
                      type: 'div',
                      props: { children: SITE.url.replace('https://', '') },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug ?? 'index'
  let kicker = 'BLOG'
  let title: string = SITE.title
  let meta = SITE.author + ' · frontend engineering notes'

  if (slug !== 'index') {
    const posts = await getAllPosts()
    const post = posts.find((p) => p.id === slug)
    if (post) {
      kicker = 'POST'
      title = post.data.title
      meta =
        isoDate(post.data.date) +
        (post.data.tags.length
          ? ' · ' + post.data.tags.slice(0, 3).join(' · ')
          : '')
    }
  }

  const svg = await satori(template({ kicker, title, meta }) as never, {
    width: W,
    height: H,
    fonts: [
      { name: 'Pretendard', data: regular, weight: 400, style: 'normal' },
      { name: 'Pretendard', data: bold, weight: 700, style: 'normal' },
    ],
  })

  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
