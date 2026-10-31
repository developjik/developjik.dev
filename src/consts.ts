export const SITE = {
  name: 'developjik',
  title: 'developjik — 에이전트 시대의 프론트엔드 엔지니어',
  description:
    '프론트엔드 엔지니어 developjik의 기술 블로그. AI 에이전트 시대의 프론트엔드 실무, 운영 플레이북, 웹 플랫폼 engineering 노트.',
  url: 'https://developjik.dev',
  author: 'developjik',
  email: 'developjik@developjik.dev',
  github: 'https://github.com/developjik',
  repo: 'https://github.com/developjik/developjik.dev',
  since: 2024,
  locale: 'ko_KR',
} as const

// 홈에 고정으로 띄울 대표 글 (최신 시리즈 플래그십 + 스테디셀러)
export const FEATURED_POSTS = [
  'frontend-ai-change-failure-rate-playbook',
  'model-context-protocol-guide',
  'javascript-event-loop-understanding',
] as const
