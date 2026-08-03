import { type MouseEvent, useMemo, useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { blockCatalog, componentCatalog, type CatalogSection } from './catalog'

export function DocsSidebar({ section, slug, onNavigate, routeHref }: { section: CatalogSection; slug: string; onNavigate: (event: MouseEvent<HTMLAnchorElement>, section: CatalogSection, slug: string) => void; routeHref: (section: CatalogSection, slug: string) => string }) {
  const [query, setQuery] = useState('')
  const groups = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return [
      { section: 'components' as const, label: 'Components', items: componentCatalog.filter((item) => item.label.toLowerCase().includes(normalized)) },
      { section: 'blocks' as const, label: 'Blocks', items: blockCatalog.filter((item) => item.label.toLowerCase().includes(normalized)) },
    ].filter((group) => group.items.length > 0)
  }, [query])

  return <aside className="u-doc-sidebar">
    <label className="u-doc-filter"><Icon name="search" size={17} /><input name="catalog-filter" type="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter catalog…" /></label>
    <nav aria-label="Catalog navigation">{groups.map((group) => <section key={group.section}><h2>{group.label}</h2>{group.items.map((item) => {
      const active = section === group.section && slug === item.slug
      return <a key={item.slug} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={routeHref(group.section, item.slug)} onClick={(event) => onNavigate(event, group.section, item.slug)}><Icon name={item.icon} size={16} /><span>{item.label}</span><small>{item.count}</small></a>
    })}</section>)}</nav>
  </aside>
}
