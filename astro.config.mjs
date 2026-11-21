import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://developjik-nextra-blog.vercel.app',
  trailingSlash: 'never',
  // 시리즈 통합(2026-11): 통합편이 대체한 원문의 301 리다이렉트(개발/프리뷰용).
  // 프로덕션의 실제 301은 vercel.json이 처리한다.
  redirects: {
    '/posts/frontend-ai-code-review-playbook': '/posts/frontend-ai-quality-gates',
    '/posts/frontend-ai-e2e-evals-playbook': '/posts/frontend-ai-quality-gates',
    '/posts/frontend-ai-ui-regression-playbook': '/posts/frontend-ai-quality-gates',
    '/posts/frontend-ai-delivery-scorecard-playbook': '/posts/frontend-ai-quality-gates',
    '/posts/frontend-ai-release-readiness-checklist': '/posts/frontend-ai-quality-gates',
    '/posts/frontend-ai-browser-testing-release-gate-playbook': '/posts/frontend-ai-quality-gates',
  },
  integrations: [mdx(), react(), sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: false,
    },
  },
});
