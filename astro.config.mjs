import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
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
    '/posts/frontend-ai-prd-to-ticket-system': '/posts/frontend-ai-harness-and-contracts',
    '/posts/frontend-ai-context-contract-playbook': '/posts/frontend-ai-harness-and-contracts',
    '/posts/frontend-ai-pr-review-agent-guardrails': '/posts/frontend-ai-harness-and-contracts',
    '/posts/frontend-ai-harness-engineering-pr-quality': '/posts/frontend-ai-harness-and-contracts',
    '/posts/frontend-ai-spec-drift-guardrail-playbook': '/posts/frontend-ai-harness-and-contracts',
    '/posts/frontend-ai-debugging-runbook': '/posts/frontend-ai-oncall-runbooks',
    '/posts/frontend-ai-post-deploy-observability-runbook': '/posts/frontend-ai-oncall-runbooks',
    '/posts/frontend-ai-oncall-drill-playbook': '/posts/frontend-ai-oncall-runbooks',
    '/posts/frontend-ai-supply-chain-incident-playbook': '/posts/frontend-ai-oncall-runbooks',
    '/posts/frontend-ai-mcp-incident-triage-playbook': '/posts/frontend-ai-oncall-runbooks',
    '/posts/frontend-ai-migration-rehearsal-playbook': '/posts/frontend-ai-safe-changes',
    '/posts/frontend-ai-change-failure-rate-playbook': '/posts/frontend-ai-safe-changes',
    '/posts/frontend-ai-design-system-safe-rollout-playbook': '/posts/frontend-ai-safe-changes',
    '/posts/frontend-ai-interview-proof-logbook': '/posts/frontend-ai-proof-of-work',
    '/posts/frontend-ai-interview-ready-pr-playbook': '/posts/frontend-ai-proof-of-work',
    '/posts/frontend-ai-hiring-task-runbook': '/posts/frontend-ai-proof-of-work',
    '/posts/frontend-ai-portfolio-impact-metrics-playbook': '/posts/frontend-ai-proof-of-work',
    '/posts/frontend-ai-impact-portfolio-playbook': '/posts/frontend-ai-proof-of-work',
  },
  integrations: [mdx(), sitemap(), pagefind()],
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
