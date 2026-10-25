# developjik.dev — 에이전트 시대의 프론트엔드 블로그

Astro 5 + Tailwind CSS 4 + MDX로 구축된 정적 개발자 블로그.
GitHub 프로필과 통일된 브랜드(#0e1116 / #4d8dff), Pretendard + Space Grotesk + JetBrains Mono 타이포그래피.

## 스택

- **Astro 5** — 콘텐츠 컬렉션(glob loader) + 정적 생성 (241 pages)
- **MDX** — 포스트 60편 (frontmatter: title / date / description / tags)
- **Tailwind CSS 4** — CSS-first 토큰 디자인 시스템 (src/styles/global.css)
- **Pagefind** — 전문 검색 + ⌘K 커맨드 팔레트
- **Shiki** — 코드 하이라이팅 (github-light / github-dark-dimmed 듀얼 테마)
- **satori + sharp** — 포스트별 OG 이미지 자동 생성 (1200×630)
- **Giscus** — GitHub Discussions 댓글 (환경변수로 활성화)

## 주요 기능

- 다크/라이트 테마 (system 우선, ?theme= 파라미터 지원, FOUC 없음)
- 시리즈 페이지 — frontend-ai-* 24편을 '이직에 바로 먹히는 프론트엔드 AI 실무'로 자동 그룹핑 (EP 넘버링, 이전/다음 편, 진행 바)
- ⌘K / Ctrl+K / / 커맨드 팔레트 (pagefind 전문 검색, 키보드 내비게이션)
- 전체 글 페이지 실시간 필터 (텍스트 + 태그 칩)
- 아카이브 타임라인, 태그 인덱스, 스크롤 리빌, 읽기 진행 바, TOC 액티브 트래킹
- 뷰 트랜지션(Astro ClientRouter), 모바일 완전 대응
- RSS(/rss.xml), sitemap, robots, JSON-LD(BlogPosting/WebSite/Blog)

## 개발

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # dist/ 생성 (pagefind 인덱싱 포함)
pnpm preview    # 프로덕션 프리뷰
pnpm check      # biome + astro check
```

## 포스트 작성

src/content/posts/<slug>.mdx 형식:

```mdx
---
title: '포스트 제목'
date: '2026-01-23'
description: '한 줄 요약'
tags: ['태그1', '태그2']
---

본문…
```

- slug이 frontend-ai- 로 시작하면 시리즈에 자동 포함
- OG 이미지(/og/<slug>.png)는 빌드 시 자동 생성

## 댓글(Giscus) 설정

.env 파일:

```bash
PUBLIC_ENABLE_COMMENTS=true
PUBLIC_GISCUS_REPO=developjik/nextra-blog
PUBLIC_GISCUS_REPO_ID=R_kgDO...
PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDO...
```

값이 없으면 댓글 섹션은 렌더링되지 않습니다.

## 프로젝트 구조

```
src/
├── content.config.ts      # zod 스키마 (posts 컬렉션)
├── content/posts/         # MDX 포스트 60편
├── consts.ts              # 사이트 설정, 대표 글
├── lib/posts.ts           # 쿼리·시리즈·태그·읽기시간 유틸
├── styles/global.css      # 디자인 토큰 + 컴포넌트 CSS
├── layouts/               # BaseLayout
├── components/            # Header/Footer/CommandPalette/PostCard/Toc/Giscus…
└── pages/                 # index, posts, tags, series, archives, about, 404, rss, og
```

## 배포

완전 정적(dist/)이므로 Vercel / Netlify / Cloudflare Pages 어디든 가능.
사이트 URL은 astro.config.mjs의 site과 src/consts.ts의 SITE.url로 관리.

## 라이선스

MIT
