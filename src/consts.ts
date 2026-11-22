export const SITE = {
  name: 'developjik',
  title: 'developjik — 에이전트 시대의 프론트엔드 엔지니어',
  description:
    '프론트엔드 엔지니어 developjik의 기술 블로그. AI 에이전트 시대의 프론트엔드 실무, 운영 플레이북, 웹 플랫폼 engineering 노트.',
  // developjik.dev 도메인은 구매하지 않기로 확정 — canonical·og:image·RSS·sitemap 기준 URL은
  // 실제로 서빙되는 Vercel 프로덕션 URL을 쓴다.
  url: 'https://developjik-nextra-blog.vercel.app',
  author: 'developjik',
  // 문의 채널은 GitHub 이슈로 통일(푸터 안내 문구와 동일). developjik.dev 도메인 미보유로
  // 메일 주소는 표기하지 않는다.
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
