import { useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { Logo } from '../../../components/ui/logo'
import { Avatar, AvatarGroup } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button as UnifiedButton } from '../../../components/ui/button'
import { ProgressBar } from '../../../components/ui/progress'
import { Surface } from '../../../components/ui/surface'
import { componentCatalog } from './catalog'
import { AdvancedComponentExamples, advancedComponentSlugs } from './AdvancedComponentExamples'
import { DemoCard } from './DemoCard'

function LogoExamples() {
  return <div className="u-demo-grid">
    <DemoCard title="Static mark" description="The exact dimensional Midwess mark for stable brand surfaces." code={'<Logo width={220} />'}><Logo width={220} /></DemoCard>
    <DemoCard title="Golden character motion" description="A cinematic hop with anticipation, squash-and-stretch, follow-through, and φ-derived timing." code={'<Logo motion="trace" width={220} />'}><Logo motion="trace" width={220} /></DemoCard>
  </div>
}

function SelectExamples() {
  const [location, setLocation] = useState('astoria')
  const [status, setStatus] = useState('preparing')
  return <div className="u-demo-grid">
    <DemoCard title="Basic select" description="A single operational choice." code={'<Select defaultValue="astoria" />'}><label className="u-demo-field"><span>Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="astoria">The Daily Grind · Astoria</option><option value="lic">Long Island City</option><option value="rego">Rego Park</option></select><small>Active location: {location}</small></label></DemoCard>
    <DemoCard title="Status select" description="Options paired with semantic status." code={'<Select options={orderStatuses} />'}><label className="u-demo-field"><span>Order status</span><span className={`u-select-status u-select-status--${status}`}><i /><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="preparing">Preparing</option><option value="ready">Ready for pickup</option><option value="attention">Needs attention</option></select></span></label></DemoCard>
    <DemoCard title="Grouped options" description="Related options organized with labels." code={'<SelectGroup label="Operations">…</SelectGroup>'}><label className="u-demo-field"><span>Jump to workspace</span><select defaultValue="orders"><optgroup label="Operations"><option value="orders">Orders</option><option value="inventory">Inventory</option><option value="schedule">Schedule</option></optgroup><optgroup label="People"><option value="team">Team board</option><option value="chat">Conversations</option></optgroup></select></label></DemoCard>
    <DemoCard title="Team assignment" description="People-aware assignment field." code={'<Select placeholder="Assign teammate" />'}><div className="u-assignee-select"><Avatar name="Maya Lopez" color="#8c89ff" size="small" /><select defaultValue="maya"><option value="maya">Maya Lopez · Shift lead</option><option value="avery">Avery Singh · Head chef</option><option value="noah">Noah Kim · Brand manager</option></select></div></DemoCard>
    <DemoCard title="Compact select" description="For dense filters and table toolbars." code={'<Select size="sm" defaultValue="week" />'}><div className="u-demo-inline"><select className="u-select-compact" defaultValue="week"><option value="week">This week</option><option value="month">This month</option></select><select className="u-select-compact" defaultValue="usd"><option value="usd">USD, $</option><option value="eur">EUR, €</option></select></div></DemoCard>
    <DemoCard title="Disabled state" description="Unavailable choices remain understandable." code={'<Select disabled value="automatic" />'}><label className="u-demo-field"><span>Assignment mode</span><select disabled value="automatic" onChange={() => undefined}><option value="automatic">Automatic · managed by Orbit AI</option></select><small>Pause automation to change this setting.</small></label></DemoCard>
  </div>
}

function ButtonExamples() {
  const [result, setResult] = useState('Choose an action')
  const [saved, setSaved] = useState(false)
  return <div className="u-demo-grid">
    <DemoCard title="Action hierarchy" description="Accent, neutral, quiet, and destructive actions." code={'<Button tone="accent">Create order</Button>'}><div className="u-demo-stack"><div className="u-demo-inline"><UnifiedButton tone="accent" onClick={() => setResult('Order created')}>Create order</UnifiedButton><UnifiedButton tone="neutral" onClick={() => setResult('Changes saved')}>Save changes</UnifiedButton><UnifiedButton tone="quiet" onClick={() => setResult('Preview opened')}>Preview</UnifiedButton></div><Badge tone="accent">{result}</Badge></div></DemoCard>
    <DemoCard title="Buttons with icons" description="Icons reinforce an already clear label." code={'<Button><Icon name="sparkles" />Ask Orbit AI</Button>'}><div className="u-demo-stack"><div className="u-demo-inline"><UnifiedButton tone="accent" onClick={() => setResult('Orbit AI opened')}><Icon name="sparkles" size={18} />Ask Orbit AI</UnifiedButton><UnifiedButton tone="quiet" onClick={() => setResult('Teammate added')}><Icon name="plus" size={18} />Add teammate</UnifiedButton></div><Badge tone="accent">{result}</Badge></div></DemoCard>
    <DemoCard title="Compact actions" description="Dense but still comfortable at 38px." code={'<Button size="compact">View report</Button>'}><div className="u-demo-stack"><div className="u-demo-inline"><UnifiedButton size="compact" tone="neutral" onClick={() => setResult('Report opened')}>View report</UnifiedButton><UnifiedButton size="compact" tone="quiet" onClick={() => setResult('Action dismissed')}>Dismiss</UnifiedButton></div><Badge tone="accent">{result}</Badge></div></DemoCard>
    <DemoCard title="Loading outcome" description="Action feedback without layout movement." code={'<Button aria-busy={saving}>Saving…</Button>'}><UnifiedButton tone="neutral" aria-live="polite" onClick={() => setSaved((current) => !current)}>{saved ? 'Saved ✓' : 'Save workspace'}</UnifiedButton></DemoCard>
  </div>
}

function InputExamples() {
  const [email, setEmail] = useState('hanna@example.com')
  return <div className="u-demo-grid">
    <DemoCard title="Text field" description="Label, control, and supporting text." code={'<Field label="Email" description="Used for alerts" />'}><label className="u-demo-field"><span>Email address</span><input value={email} onChange={(event) => setEmail(event.target.value)} /><small>Used for operational alerts.</small></label></DemoCard>
    <DemoCard title="Search input" description="A focused entry point for large collections." code={'<SearchField placeholder="Search orders" />'}><label className="u-demo-search"><Icon name="search" size={18} /><input placeholder="Search orders, guests, or items…" /></label></DemoCard>
    <DemoCard title="Validation state" description="Explain the problem next to the field." code={'<Field invalid error="Enter a venue name" />'}><label className="u-demo-field is-invalid"><span>Venue name</span><input placeholder="Enter venue name" /><small>A venue name is required.</small></label></DemoCard>
    <DemoCard title="Textarea" description="Long-form input with a practical default size." code={'<Textarea placeholder="Add a handover note" />'}><label className="u-demo-field"><span>Handover note</span><textarea placeholder="Add the context the next shift needs…" /></label></DemoCard>
  </div>
}

function BadgeExamples() {
  return <div className="u-demo-grid"><DemoCard title="Semantic statuses" code={'<Badge tone="success">Connected</Badge>'}><div className="u-demo-inline"><Badge tone="success">Connected</Badge><Badge tone="warning">Attention</Badge><Badge tone="accent">In progress</Badge><Badge tone="violet">AI assisted</Badge><Badge>Draft</Badge></div></DemoCard><DemoCard title="Operational counters" code={'<Badge>12 live</Badge>'}><div className="u-demo-inline"><Badge tone="accent">12 live</Badge><Badge tone="warning">3 delayed</Badge><Badge tone="success">24 ready</Badge></div></DemoCard></div>
}

function AvatarExamples() {
  return <div className="u-demo-grid"><DemoCard title="Fallback initials" code={'<Avatar name="Hanna Lee" color="coral" />'}><div className="u-demo-inline"><Avatar name="Hanna Lee" color="#ff7c6e" size="small" /><Avatar name="Maya Lopez" color="#8c89ff" /><Avatar name="Avery Singh" color="#a9e7f4" size="large" /></div></DemoCard><DemoCard title="Avatar group" code={'<AvatarGroup><Avatar name="Hanna Lee" /></AvatarGroup>'}><div className="u-demo-stack"><AvatarGroup><Avatar name="Hanna Lee" color="#ff7c6e" size="small" /><Avatar name="Maya Lopez" color="#8c89ff" size="small" /><Avatar name="Noah Kim" color="#a9e7f4" size="small" /><Avatar name="Orbit AI" color="#ffd36b" size="small" /></AvatarGroup><span className="u-demo-caption">4 people in this conversation</span></div></DemoCard></div>
}

function TabsExamples() {
  const [tab, setTab] = useState('Overview')
  return <div className="u-demo-grid"><DemoCard title="Segmented tabs" code={'<Tabs defaultValue="overview">…</Tabs>'}><div className="u-demo-stack"><div className="u-segmented">{['Overview', 'Activity', 'Details'].map((item) => <button className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div><span className="u-demo-caption">Showing {tab.toLowerCase()} content.</span></div></DemoCard><DemoCard title="Underline navigation" code={'<Tabs variant="underline" />'}><div className="u-underline-tabs">{['Messages', 'Files', 'Tasks'].map((item) => <button className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div></DemoCard></div>
}

function ProgressExamples() {
  const [value, setValue] = useState(72)
  return <div className="u-demo-grid"><DemoCard title="Labeled progress" code={'<Progress value={72} label="Setup progress" />'}><div className="u-demo-stack"><ProgressBar value={value} label="Setup progress" /><input aria-label="Change progress" type="range" min="0" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} /></div></DemoCard><DemoCard title="Capacity group" code={'<ProgressGroup values={capacity} />'}><div className="u-demo-stack"><ProgressBar value={92} label="Floor" /><ProgressBar value={78} label="Kitchen" /><ProgressBar value={84} label="Delivery" /></div></DemoCard></div>
}

function CardExamples() {
  const [open, setOpen] = useState(false)
  return <div className="u-demo-grid"><DemoCard title="Editorial surfaces" code={'<Surface tone="coral">…</Surface>'}><div className="u-demo-mini-grid"><Surface tone="coral"><small>Revenue</small><strong>$24,860</strong></Surface><Surface tone="violet"><small>Orders</small><strong>184</strong></Surface><Surface tone="cyan"><small>Sentiment</small><strong>4.8</strong></Surface></div></DemoCard><DemoCard title="AI recommendation" code={'<Surface tone="yellow">…</Surface>'}><Surface tone="yellow" className="u-demo-recommendation"><Badge tone="neutral">Orbit AI</Badge><h3>Protect the evening flow</h3><p>{open ? 'Maya owns the station move. Orbit will check capacity again at 17:45.' : 'Move one prep cook to cold station at 17:30.'}</p><UnifiedButton tone="neutral" size="compact" onClick={() => setOpen((current) => !current)}>{open ? 'Close plan' : 'Open plan'}</UnifiedButton></Surface></DemoCard></div>
}

function renderExamples(slug: string) {
  if (slug === 'logo') return <LogoExamples />
  if (advancedComponentSlugs.has(slug)) return <AdvancedComponentExamples slug={slug} />
  if (slug === 'button') return <ButtonExamples />
  if (slug === 'input') return <InputExamples />
  if (slug === 'badge') return <BadgeExamples />
  if (slug === 'avatar') return <AvatarExamples />
  if (slug === 'tabs') return <TabsExamples />
  if (slug === 'progress') return <ProgressExamples />
  if (slug === 'card') return <CardExamples />
  return <SelectExamples />
}

export function ComponentsCatalogPage({ slug }: { slug: string }) {
  const item = componentCatalog.find((entry) => entry.slug === slug) ?? componentCatalog[0]
  return <main className="u-catalog-main" id="main-content" tabIndex={-1}><div className="u-catalog-breadcrumb"><span>Components</span><Icon name="chevron" size={14} /><b>{item.label}</b></div><header className="u-catalog-heading"><div><h1>{item.label}</h1><p>{item.description} Built from semantic tokens, keyboard-friendly HTML, and reusable React composition.</p></div><Badge tone="accent">{item.count} examples</Badge></header>{renderExamples(item.slug)}<section className="u-doc-copy"><h2>Usage guidance</h2><p>Use the simplest control that communicates the task. Keep labels specific, preserve comfortable targets, and avoid presenting static information as an action.</p><h3>Design language</h3><p>Neutral controls sit on calm charcoal or paper surfaces. Every rounded rectangle uses a continuous G2-style squircle corner; true circles and capsules stay round. Orange is reserved for primary decisions, while coral, violet, cyan, sage, and yellow communicate category and context.</p></section></main>
}
