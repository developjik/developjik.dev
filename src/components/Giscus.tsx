import { useEffect, useRef, useState } from 'react'

const enabled = import.meta.env.PUBLIC_ENABLE_COMMENTS === 'true'
const repo = import.meta.env.PUBLIC_GISCUS_REPO ?? 'developjik/developjik.dev'
const repoId = import.meta.env.PUBLIC_GISCUS_REPO_ID
const categoryId = import.meta.env.PUBLIC_GISCUS_CATEGORY_ID

function currentTheme(): string {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export default function Giscus() {
  const host = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled || !repoId || !categoryId || !host.current) return
    const s = document.createElement('script')
    s.src = 'https://giscus.app/client.js'
    s.async = true
    s.crossOrigin = 'anonymous'
    s.setAttribute('data-repo', repo)
    s.setAttribute('data-repo-id', repoId)
    s.setAttribute('data-category', 'Announcements')
    s.setAttribute('data-category-id', categoryId)
    s.setAttribute('data-mapping', 'pathname')
    s.setAttribute('data-strict', '1')
    s.setAttribute('data-reactions-enabled', '1')
    s.setAttribute('data-emit-metadata', '0')
    s.setAttribute('data-input-position', 'top')
    s.setAttribute('data-theme', currentTheme())
    s.setAttribute('data-lang', 'ko')
    s.setAttribute('data-loading', 'lazy')
    host.current.appendChild(s)
    setReady(true)

    const postTheme = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe.giscus-frame'
      )
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: currentTheme() } } },
        'https://giscus.app'
      )
    }
    const mo = new MutationObserver(postTheme)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => mo.disconnect()
  }, [])

  if (!enabled || !repoId || !categoryId) return null

  return (
    <section
      className="comments-section mt-16 border-t border-line pt-10"
      aria-label="댓글"
    >
      <p className="kicker mb-2">Comments</p>
      <h2 className="font-display mb-6 text-xl font-bold">댓글</h2>
      <div ref={host} className="giscus-wrap" />
      {ready ?? null}
    </section>
  )
}
