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
  const gridLines = Array.from({ length: 15 }, (_, i) => i)
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0e1116',
        fontFamily: 'Pretendard',
      },
      children: [
        ...gridLines.map((i) => ({
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: i * 86,
              top: 0,
              width: 1,
              height: '100%',
              background: 'rgba(233,237,244,0.05)',
            },
          },
        })),
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 0,
              top: 0,
              width: 10,
              height: '100%',
              background: 'linear-gradient(180deg, #4d8dff 0%, #7aa9ff 100%)',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: -120,
              top: -120,
              width: 480,
              height: 480,
              borderRadius: 999,
              background:
                'radial-gradient(closest-side, rgba(77,141,255,0.28), rgba(14,17,22,0))',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '72px 84px',
              width: '100%',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'Pretendard',
                    fontSize: 26,
                    letterSpacing: 4,
                    color: '#4d8dff',
                    fontWeight: 600,
                  },
                  children: [
                    { type: 'div', props: { children: 'DEVELOPJIK.DEV' } },
                    { type: 'div', props: { children: opts.kicker } },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: opts.title.length > 40 ? 62 : 74,
                    fontWeight: 700,
                    color: '#e9edf4',
                    lineHeight: 1.28,
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 26,
                    color: '#8a94a6',
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
