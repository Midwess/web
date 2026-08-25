import { Icon } from '../../../components/ui/icon'
import { Badge } from '../../../components/ui/badge'
import { ChatBlock } from '../blocks/ChatBlock'
import { LibraryBlock } from '../blocks/LibraryBlock'
import { OrdersBlock } from '../blocks/OrdersBlock'
import { OverviewBlock } from '../blocks/OverviewBlock'
import { TeamBlock } from '../blocks/TeamBlock'
import type { UnifiedView } from '../types'
import { blockCatalog } from './catalog'
import { DemoCard } from './DemoCard'
import { WorkOsBlocksGallery } from './WorkOsBlocksGallery'

const codeBySlug: Record<string, string> = {
  dashboard: "import { OverviewBlock } from './blocks/OverviewBlock'\n\n<OverviewBlock onNavigate={setView} />",
  chat: "import { ChatBlock } from './blocks/ChatBlock'\n\n<ChatBlock />",
  list: "import { OrdersBlock } from './blocks/OrdersBlock'\n\n<OrdersBlock />",
  team: "import { TeamBlock } from './blocks/TeamBlock'\n\n<TeamBlock />",
  'component-library': "import { LibraryBlock } from './blocks/LibraryBlock'\n\n<LibraryBlock theme={theme} onTheme={toggleTheme} />",
}

export function BlocksCatalogPage({ slug, theme, onTheme, onNavigate }: { slug: string; theme: 'dark' | 'light'; onTheme: () => void; onNavigate: (slug: string) => void }) {
  const item = blockCatalog.find((entry) => entry.slug === slug) ?? blockCatalog[0]
  const navigateFromOverview = (view: UnifiedView) => onNavigate(view === 'chat' ? 'chat' : view === 'orders' ? 'list' : 'dashboard')
  const preview = item.slug === 'chat' ? <ChatBlock />
    : item.slug === 'list' ? <OrdersBlock />
      : item.slug === 'team' ? <TeamBlock />
        : item.slug === 'component-library' ? <LibraryBlock theme={theme} onTheme={onTheme} />
          : <OverviewBlock onNavigate={navigateFromOverview} />

  return <main className="u-catalog-main u-block-catalog" id="main-content" tabIndex={-1}><div className="u-catalog-breadcrumb"><span>Blocks</span><Icon name="chevron" size={14} /><b>{item.label}</b></div><header className="u-catalog-heading"><div><h1>{item.label}</h1><p>{item.description} Each block is composed from the same primitives and remains fully interactive inside the preview.</p></div><Badge tone="accent">{item.count} patterns</Badge></header>{item.slug === 'work-os' ? <WorkOsBlocksGallery /> : <DemoCard className="u-demo-card--block" title={`${item.label} block`} description="Responsive product composition" code={codeBySlug[item.slug]}>{preview}</DemoCard>}<section className="u-doc-copy"><h2>Composition notes</h2><p>This block owns only its local interaction state. Theme, navigation, and product-level orchestration stay at the documentation shell level so the block can be reused in another application.</p></section></main>
}
