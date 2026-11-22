import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // 시리즈 ID. 미지정 시 lib/posts.ts의 slug 접두사 폴백이 적용된다.
    series: z.string().optional(),
  }),
})

export const collections = { posts }
