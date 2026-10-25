import { type CollectionEntry, getCollection } from 'astro:content'

export type Post = CollectionEntry<'posts'>

export type SeriesInfo = {
  id: string
  title: string
  short: string
  description: string
  accent: string
}

export const SERIES: Record<string, SeriesInfo> = {
  'frontend-ai-ops': {
    id: 'frontend-ai-ops',
    title: '이직에 바로 먹히는 프론트엔드 AI 실무',
    short: 'Frontend AI Ops',
    description:
      'AI 코딩 시대에 프론트엔드 개발자가 살아남는 방법은 생성이 아니라 검증과 운영입니다. E2E Eval, 온콜 드릴, 공급망 대응, 변경 실패율(CFR) 관리까지 — 면접과 포트폴리오에 바로 쓰는 24편의 운영 플레이북.',
    accent: '#1f6a4d',
  },
}

export function seriesIdOf(slug: string): string | undefined {
  if (slug.startsWith('frontend-ai-')) return 'frontend-ai-ops'
  return undefined
}

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return y + '.' + m + '.' + d
}

export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0] ?? ''
}

/** 대략적 읽기 시간(분). 한국어 글자는 분당 ~500자, 코드블록은 별도 가중. */
export function readingMinutes(body: string): number {
  const FENCE = String.fromCharCode(96, 96, 96)
  const fenceRe = new RegExp(FENCE + '[\\s\\S]*?' + FENCE, 'g')
  const codeChunks = body.match(fenceRe) ?? []
  const withoutCode = body.replace(fenceRe, ' ')
  const korean = (withoutCode.match(/[가-힣]/g) ?? []).length
  const words = (
    withoutCode.replace(/[가-힣]/g, ' ').match(/[A-Za-z0-9_-]+/g) ?? []
  ).length
  const codeLines = codeChunks.reduce((acc, c) => acc + c.split('\n').length, 0)
  const minutes = korean / 500 + words / 220 + codeLines / 60
  return Math.max(1, Math.round(minutes))
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts')
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function getSeriesPosts(posts: Post[], seriesId: string): Post[] {
  return posts
    .filter((p) => seriesIdOf(p.id) === seriesId)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
}

export function getAllSeries(
  posts: Post[]
): Array<SeriesInfo & { count: number }> {
  return Object.values(SERIES)
    .map((s) => ({
      ...s,
      count: posts.filter((p) => seriesIdOf(p.id) === s.id).length,
    }))
    .filter((s) => s.count > 0)
}

/** 태그를 URL 안전 슬러그로 변환 (CI/CD -> CI-CD). 표기는 원본 유지. */
export function tagSlug(tag: string): string {
  return tag.replace(/[^A-Za-z0-9가-힣._-]+/g, '-')
}

export function tagCounts(posts: Post[]): Array<[string, number]> {
  const map = new Map<string, number>()
  for (const p of posts) {
    for (const t of p.data.tags) map.set(t, (map.get(t) ?? 0) + 1)
  }
  return [...map.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  )
}

/** 태그 겹침 개수로 연관 글 선정 */
export function relatedPosts(current: Post, posts: Post[], limit = 3): Post[] {
  const tags = new Set(current.data.tags)
  return posts
    .filter((p) => p.id !== current.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || b.p.data.date.getTime() - a.p.data.date.getTime()
    )
    .slice(0, limit)
    .map((x) => x.p)
}

export function groupByYear(posts: Post[]): Array<[number, Post[]]> {
  const map = new Map<number, Post[]>()
  for (const p of posts) {
    const y = p.data.date.getFullYear()
    const arr = map.get(y) ?? []
    arr.push(p)
    map.set(y, arr)
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0])
}
