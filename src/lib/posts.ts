import { type CollectionEntry, getCollection } from 'astro:content'

export type Post = CollectionEntry<'posts'>

export type SeriesInfo = {
  id: string
  title: string
  short: string
  description: string
  accent: string
  /** 완결 목표 편수. 미지정 시 count를 목표로 한다(항상 완결). */
  goal?: number
}

export const SERIES: Record<string, SeriesInfo> = {
  'frontend-ai-ops': {
    id: 'frontend-ai-ops',
    title: '이직에 바로 먹히는 프론트엔드 AI 실무',
    short: 'Frontend AI Ops',
    description:
      'AI 코딩 시대에 프론트엔드 개발자가 살아남는 방법은 생성이 아니라 검증과 운영입니다. E2E Eval, 온콜 드릴, 공급망 대응, 변경 실패율(CFR) 관리까지 — 면접과 포트폴리오에 바로 쓰는 운영 플레이북.',
    accent: '#1f6a4d',
    // 2026-11 시리즈 통합: 24편 원문을 5편 통합편으로 재편(완결 목표 5편)
    goal: 5,
  },
  'javascript-engine': {
    id: 'javascript-engine',
    title: '자바스크립트 엔진 완전정복',
    short: 'JS Engine',
    description:
      '스코프와 호이스팅부터 this 바인딩, 프로토타입, 이벤트 루프, 비동기 처리까지 — 자바스크립트가 실제로 돌아가는 방식을 엔진 관점에서 하나씩 완전히 정리하는 시리즈.',
    accent: '#c4a018',
  },
  'aws-fundamentals': {
    id: 'aws-fundamentals',
    title: '프론트엔드 개발자를 위한 AWS 입문',
    short: 'AWS Basics',
    description:
      'IAM 계정 설계부터 EC2, Lambda, API Gateway, 데이터베이스 선택, CloudWatch 관찰까지 — 프론트엔드 개발자가 서비스를 직접 배포하고 운영하기 위해 필요한 AWS 최소 지식 세트.',
    accent: '#d97e30',
  },
  'git-workflows': {
    id: 'git-workflows',
    title: 'Git 브랜칭 전략 완전정복',
    short: 'Git Workflows',
    description:
      'Git Flow, GitHub Flow, GitLab Flow, 트렁크 기반 개발까지 — 각 브랜칭 전략이 어떤 팀 상황에서 태어났고 언제 선택해야 하는지 비교하며 정리하는 시리즈.',
    accent: '#4d8dff',
  },
  'ai-coding-tools': {
    id: 'ai-coding-tools',
    title: 'AI 코딩 도구 관측소',
    short: 'AI Coding Tools',
    description:
      'Claude Code, Codex, Cursor, 오픈소스 로컬 모델까지 — 매달 바뀌는 AI 코딩 도구 생태계를 실무 워크플로 관점에서 관측하고 비교하는 시리즈.',
    accent: '#c4f542',
  },
  'web-performance': {
    id: 'web-performance',
    title: '웹 성능 실전 가이드',
    short: 'Web Perf',
    description:
      'HTTP 캐싱, 폰트 로딩, INP, Lighthouse CI 예산 게이트까지 — 사용자가 체감하는 성능을 측정하고 릴리즈를 막아주는 실전 성능 공학.',
    accent: '#e05252',
  },
  'react-deep': {
    id: 'react-deep',
    title: 'React 19와 동시성 렌더링',
    short: 'React Deep',
    description:
      'React 19 Actions, 폼 처리, 동시성 렌더링, Error Boundary까지 — React의 최신 렌더링 모델을 바닥부터 이해하는 심층 노트.',
    accent: '#57c7d4',
  },
  'state-management': {
    id: 'state-management',
    title: 'React 상태관리 설계 노트',
    short: 'State',
    description:
      'Zustand와 Redux, 서버 상태와 클라이언트 상태의 경계, React Query/TanStack Query 설계까지 — 상태를 어디에 둘 것인가에 대한 실무 판단 노트.',
    accent: '#a78bfa',
  },
  'nextjs-notes': {
    id: 'nextjs-notes',
    title: 'Next.js App Router 실전 노트',
    short: 'Next.js',
    description:
      'Pages Router와 App Router의 선택, 서버·클라이언트 컴포넌트 경계, React Compiler 적용까지 — Next.js로 서비스를 만들며 남긴 실전 기록.',
    accent: '#9ca3af',
  },
  'build-logs': {
    id: 'build-logs',
    title: '사이드 프로젝트 구축기',
    short: 'Build Logs',
    description:
      '블로그 마이그레이션, spec-studio, 검색 엔진, 에이전트 데스크, 데이터 리포까지 — 실제로 배포한 사이드 프로젝트를 만들며 배운 것들의 구축 로그.',
    accent: '#8fbf6a',
  },
  'local-first-ai': {
    id: 'local-first-ai',
    title: '로컬 우선 AI 엔지니어링',
    short: 'Local-first AI',
    description:
      '진실의 원천을 어디에 두고, 상태를 누가 소유하고, 품질을 무엇으로 판정할 것인가 — Damon·spec-studio·sqlite-graph-mcp를 만들며 코드와 측정값으로만 정리한 세 원칙과, 임베딩 대신 결정적 그래프를 고른 검색 설계의 기록.',
    accent: '#a8557a',
    // 3편(프론트엔드·UI 검증) 발행 완료 — 2026-11-24 완결
    goal: 3,
  },
}

export function seriesIdOf(slug: string): string | undefined {
  // 시리즈 통합편 + 시리즈 소속 실무 글만. 연말 회고(year-review)는 시리즈가 아니다.
  if (slug.startsWith('frontend-ai-') && !slug.endsWith('-year-review'))
    return 'frontend-ai-ops'
  return undefined
}

/** 글의 시리즈 ID — 프론트매터 series 우선, 미지정 시 slug 접두사 폴백. */
export function seriesOf(post: Post): string | undefined {
  return post.data.series ?? seriesIdOf(post.id)
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
    .filter((p) => seriesOf(p) === seriesId)
    .sort(
      (a, b) =>
        (a.data.seriesPart ?? Number.MAX_SAFE_INTEGER) -
          (b.data.seriesPart ?? Number.MAX_SAFE_INTEGER) ||
        a.data.date.getTime() - b.data.date.getTime()
    )
}

export function getAllSeries(
  posts: Post[]
): Array<SeriesInfo & { count: number }> {
  return Object.values(SERIES)
    .map((s) => ({
      ...s,
      // 프론트매터 series 우선(seriesOf) — 접두사 폴백만으론 통합편/신규 시리즈를 못 잡는다.
      count: posts.filter((p) => seriesOf(p) === s.id).length,
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
