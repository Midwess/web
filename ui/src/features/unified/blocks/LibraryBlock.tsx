import { useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { Avatar, AvatarGroup } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button as UnifiedButton } from '../../../components/ui/button'
import { IconAction } from '../../../components/ui/icon-action'
import { ProgressBar } from '../../../components/ui/progress'
import { SectionTitle } from '../../../components/ui/section-title'
import { Surface } from '../../../components/ui/surface'
import { ViewHeading } from '../../../components/ui/view-heading'

export function LibraryBlock({ theme, onTheme }: { theme: 'dark' | 'light'; onTheme: () => void }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [notifications, setNotifications] = useState(true)
  const [toast, setToast] = useState('')

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  return <div className="u-view u-library-view">
    <ViewHeading eyebrow="Design system" title="Components made to compose" description="The merged language uses generous geometry, editorial color, clear hierarchy, and controls with an obvious purpose." action={<UnifiedButton tone="accent" onClick={onTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />Use {theme === 'dark' ? 'light' : 'dark'} theme</UnifiedButton>} />
    <div className="u-library-grid">
      <Surface className="u-library-card u-library-colors"><SectionTitle title="Color tokens" meta="Semantic, theme-aware surfaces" /><div>{['canvas', 'surface', 'raised', 'ink', 'muted', 'coral', 'violet', 'cyan', 'sage', 'yellow', 'orange'].map((token) => <span key={token}><i className={`u-swatch u-swatch--${token}`} /><small>{token}</small></span>)}</div></Surface>
      <Surface className="u-library-card"><SectionTitle title="Actions" meta="Every control has a clear outcome" /><div className="u-component-row"><UnifiedButton tone="accent" onClick={() => showToast('Primary action complete')}>Primary action</UnifiedButton><UnifiedButton tone="neutral" onClick={() => showToast('Saved to workspace')}>Save changes</UnifiedButton><UnifiedButton tone="quiet" onClick={() => showToast('Preview opened')}>Preview</UnifiedButton><UnifiedButton tone="danger" onClick={() => showToast('Draft removed')}>Remove draft</UnifiedButton><IconAction label="Search library" icon="search" onClick={() => showToast('Search focused')} /></div></Surface>
      <Surface className="u-library-card"><SectionTitle title="Statuses & people" meta="Compact signals, generous targets" /><div className="u-component-stack"><div className="u-component-row"><Badge tone="success">Connected</Badge><Badge tone="warning">Attention</Badge><Badge tone="accent">In progress</Badge><Badge tone="violet">AI assisted</Badge><Badge>Draft</Badge></div><div className="u-component-row"><Avatar name="Hanna Lee" color="#ff7c6e" /><Avatar name="Maya Lopez" color="#8c89ff" /><AvatarGroup><Avatar name="Noah" color="#a9e7f4" size="small" /><Avatar name="Avery" color="#d4e4d9" size="small" /><Avatar name="Iris" color="#ffd36b" size="small" /></AvatarGroup></div></div></Surface>
      <Surface className="u-library-card"><SectionTitle title="Inputs" meta="Calm defaults and visible focus" /><div className="u-form-demo"><label><span>Workspace name</span><input defaultValue="The Daily Grind" /></label><label><span>Service mode</span><select defaultValue="Live operations"><option>Live operations</option><option>Planning</option><option>Review</option></select></label><label className="u-switch-row"><span><b>Smart notifications</b><small>Only surface high-value signals</small></span><input type="checkbox" checked={notifications} onChange={() => setNotifications((current) => !current)} /></label></div></Surface>
      <Surface className="u-library-card"><SectionTitle title="Navigation" meta="Tabs and progress" /><div className="u-component-stack"><div className="u-segmented">{['Overview', 'Activity', 'Details'].map((tab) => <button key={tab} className={activeTab === tab ? 'is-active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><p className="u-tab-result">Showing the <strong>{activeTab.toLowerCase()}</strong> state.</p><ProgressBar value={72} label="Setup progress" /></div></Surface>
      <Surface tone="coral" className="u-library-card u-example-card"><Badge tone="neutral">Featured block</Badge><h2>Revenue is up 12.4%</h2><p>A high-signal card pairs one strong number with just enough context and one clear next step.</p><UnifiedButton tone="neutral" onClick={() => showToast('Revenue report opened')}>Open report</UnifiedButton></Surface>
      <Surface tone="yellow" className="u-library-card u-empty-card"><span className="u-ai-orb"><Icon name="sparkles" /></span><h2>Nothing needs attention</h2><p>This empty state reassures the user and offers an intentional next action.</p><UnifiedButton tone="neutral" onClick={() => showToast('All activity opened')}>View all activity</UnifiedButton></Surface>
    </div>
    {toast ? <div className="u-toast" role="status"><Icon name="check" size={18} />{toast}</div> : null}
  </div>
}
