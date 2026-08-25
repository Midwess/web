import { type FormEvent, type MouseEvent, useEffect, useState } from 'react'
import { Icon } from '../../components/ui/icon'
import { BlocksCatalogPage } from './docs/BlocksCatalogPage'
import { componentCatalog, blockCatalog, type CatalogSection } from './docs/catalog'
import { ComponentsCatalogPage } from './docs/ComponentsCatalogPage'
import { DocsSidebar } from './docs/DocsSidebar'
import { BasePathProvider, normalizeBasePath, withBasePath, withoutBasePath } from '../../lib/base-path'
import './unified.css'

type CatalogRoute = { section: CatalogSection; slug: string }
export type UnifiedTheme = 'dark' | 'light'
export type UnifiedSessionProps = {
  basePath?: string
  initialPath?: string
  initialTheme?: UnifiedTheme
}

function readRoute(pathname: string, basePath: string): CatalogRoute {
  const [section, slug] = withoutBasePath(pathname, basePath).split('/').filter(Boolean)
  if (section === 'blocks') return { section: 'blocks', slug: blockCatalog.some((item) => item.slug === slug) ? slug : blockCatalog[0].slug }
  return { section: 'components', slug: componentCatalog.some((item) => item.slug === slug) ? slug : componentCatalog[0].slug }
}

function readTheme(search: string): UnifiedTheme {
  return new URLSearchParams(search).get('theme') === 'light' ? 'light' : 'dark'
}

function findSearchDestination(value: string): CatalogRoute | null {
  const query = value.trim().toLowerCase()
  if (!query) return null
  const component = componentCatalog.find((item) => `${item.label} ${item.description}`.toLowerCase().includes(query))
  if (component) return { section: 'components', slug: component.slug }
  const block = blockCatalog.find((item) => `${item.label} ${item.description}`.toLowerCase().includes(query))
  return block ? { section: 'blocks', slug: block.slug } : null
}

export function UnifiedSession({ basePath, initialPath, initialTheme = 'dark' }: UnifiedSessionProps = {}) {
  const normalizedBasePath = normalizeBasePath(basePath)
  const defaultPath = withBasePath('/components/select', normalizedBasePath)
  const [route, setRoute] = useState<CatalogRoute>(() => readRoute(
    initialPath ?? (typeof window === 'undefined' ? defaultPath : window.location.pathname),
    normalizedBasePath,
  ))
  const [theme, setTheme] = useState<UnifiedTheme>(initialTheme)
  const [query, setQuery] = useState('')
  const [layout, setLayout] = useState<'grid' | 'single'>('grid')

  useEffect(() => {
    const handlePopState = () => setRoute(readRoute(window.location.pathname, normalizedBasePath))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [normalizedBasePath])

  useEffect(() => {
    setTheme(readTheme(window.location.search))
  }, [])

  useEffect(() => {
    const color = theme === 'dark' ? '#20211f' : '#f4f6f2'
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', color)
    document.documentElement.style.colorScheme = theme
    return () => {
      document.documentElement.style.colorScheme = 'dark'
      document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', '#20211f')
    }
  }, [theme])

  function navigate(section: CatalogSection, slug: string) {
    const next = { section, slug }
    const themeSearch = theme === 'light' ? '?theme=light' : ''
    window.history.pushState(next, '', `${withBasePath(`/${section}/${slug}`, normalizedBasePath)}${themeSearch}`)
    setRoute(next)
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  function routeHref(section: CatalogSection, slug: string) {
    const themeSearch = theme === 'light' ? '?theme=light' : ''
    return `${withBasePath(`/${section}/${slug}`, normalizedBasePath)}${themeSearch}`
  }

  function followRoute(event: MouseEvent<HTMLAnchorElement>, section: CatalogSection, slug: string) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(section, slug)
  }

  function search(event: FormEvent) {
    event.preventDefault()
    const destination = findSearchDestination(query)
    if (destination) {
      navigate(destination.section, destination.slug)
      setQuery('')
    }
  }

  const toggleTheme = () => setTheme((current) => {
    const next = current === 'dark' ? 'light' : 'dark'
    const url = new URL(window.location.href)
    if (next === 'light') url.searchParams.set('theme', 'light')
    else url.searchParams.delete('theme')
    window.history.replaceState(window.history.state, '', url)
    return next
  })

  return <BasePathProvider basePath={normalizedBasePath}><div className="unified-session orbit-ui" data-unified-theme={theme} data-orbit-theme={theme} data-doc-layout={layout}>
    <a className="u-skip-link" href="#main-content">Skip to main content</a>
    <header className="u-doc-header">
      <a className="u-doc-brand" href={routeHref('components', 'select')} onClick={(event) => followRoute(event, 'components', 'select')}><span>O</span><strong>ORBIT UI</strong></a>
      <nav aria-label="Documentation"><a className={route.section === 'components' && route.slug !== 'card' ? 'is-active' : ''} aria-current={route.section === 'components' && route.slug !== 'card' ? 'page' : undefined} href={routeHref('components', route.section === 'components' && route.slug !== 'card' ? route.slug : 'select')} onClick={(event) => followRoute(event, 'components', route.section === 'components' && route.slug !== 'card' ? route.slug : 'select')}>Components</a><a className={route.section === 'blocks' ? 'is-active' : ''} aria-current={route.section === 'blocks' ? 'page' : undefined} href={routeHref('blocks', route.section === 'blocks' ? route.slug : 'dashboard')} onClick={(event) => followRoute(event, 'blocks', route.section === 'blocks' ? route.slug : 'dashboard')}>Blocks</a><a className={route.section === 'components' && route.slug === 'card' ? 'is-active' : ''} aria-current={route.section === 'components' && route.slug === 'card' ? 'page' : undefined} href={routeHref('components', 'card')} onClick={(event) => followRoute(event, 'components', 'card')}>Foundations</a></nav>
      <button className="u-doc-theme" onClick={toggleTheme} aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} /></button>
    </header>

    <div className="u-doc-toolbar">
      <div className="u-doc-toolbar-label"><Icon name={route.section === 'components' ? 'layers' : 'bag'} size={18} /><span>{route.section === 'components' ? 'Component catalog' : 'Block library'}</span></div>
      <form onSubmit={search}><Icon name="search" size={18} /><input name="catalog-search" type="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components and blocks…" aria-label="Search components and blocks" /><kbd>↵</kbd></form>
      <div className="u-doc-layout-toggle" aria-label="Preview layout"><button className={layout === 'grid' ? 'is-active' : ''} aria-label="Grid previews" aria-pressed={layout === 'grid'} onClick={() => setLayout('grid')}><Icon name="layers" size={17} /></button><button className={layout === 'single' ? 'is-active' : ''} aria-label="Single column previews" aria-pressed={layout === 'single'} onClick={() => setLayout('single')}><Icon name="calendar" size={17} /></button></div>
    </div>

    <div className="u-doc-body">
      <DocsSidebar section={route.section} slug={route.slug} onNavigate={followRoute} routeHref={routeHref} />
      {route.section === 'components' ? <ComponentsCatalogPage slug={route.slug} /> : <BlocksCatalogPage slug={route.slug} theme={theme} onTheme={toggleTheme} onNavigate={(slug) => navigate('blocks', slug)} />}
    </div>
  </div></BasePathProvider>
}
