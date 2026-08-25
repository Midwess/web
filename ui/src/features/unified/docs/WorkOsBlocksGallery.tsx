import { type FormEvent, useMemo, useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { useBasePath, withBasePath } from '../../../lib/base-path'
import { DemoCard } from './DemoCard'

const workThreads = [
  { id: 'animation', title: '3D animation for Geex', preview: 'Campaign assets and reactions', unread: 3, image: '/work-os/editorial-01.jpeg' },
  { id: 'monday', title: 'Monday Coffee', preview: 'Brand direction and references', unread: 0, image: '/work-os/editorial-02.jpeg' },
  { id: 'editorial', title: 'Editorial selects', preview: 'Final crop review', unread: 1, image: '/work-os/editorial-02.jpeg' },
]

function CreativeChatDemo() {
  const basePath = useBasePath()
  const [messages, setMessages] = useState(['The campaign needs one clear moment of energy.', 'These two selects feel strongest. Let’s use both.'])
  const [draft, setDraft] = useState('')
  function send(event: FormEvent) { event.preventDefault(); const message = draft.trim(); if (!message) return; setMessages((current) => [...current, message]); setDraft('') }
  return <div className="u-wo-chat-demo"><header><div><span className="u-wo-avatar">A</span><span><b>3D animation for Geex</b><small><i /> Writing…</small></span></div><strong>Work OS</strong></header><div className="u-wo-chat-feed" aria-live="polite"><div className="u-wo-incoming"><span className="u-wo-avatar">G</span><p>Can we turn this direction into a short launch video?</p></div><figure><img src={withBasePath('/work-os/editorial-01.jpeg', basePath)} width="1152" height="864" alt="Editorial beauty campaign close-up" /><img src={withBasePath('/work-os/editorial-02.jpeg', basePath)} width="1152" height="864" alt="Editorial headphone portrait" /><figcaption><span>🔥 13</span><span>🥲 8</span><span>✦ Selected</span></figcaption></figure>{messages.map((message, index) => <p className="u-wo-self" key={`${message}-${index}`}>{message}</p>)}</div><form onSubmit={send}><input name="work-os-message" autoComplete="off" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Text message…" aria-label="Work OS message" /><button type="submit">Send message</button></form></div>
}

function ConversationListDemo() {
  const basePath = useBasePath()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(workThreads[0].id)
  const visible = useMemo(() => workThreads.filter((thread) => thread.title.toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="u-wo-thread-demo"><header><div><strong><span>All</span> Chats</strong><small>4 teammates online</small></div><label><Icon name="search" size={17} /><input name="chat-search" type="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chats…" /></label></header><div className="u-wo-people"><span>E</span><span>P</span><span>W</span><span>+</span></div><div className="u-wo-thread-list">{visible.map((thread) => <button key={thread.id} className={selected === thread.id ? 'is-active' : ''} aria-pressed={selected === thread.id} onClick={() => setSelected(thread.id)}><img src={withBasePath(thread.image, basePath)} width="1152" height="864" loading="lazy" decoding="async" alt="" /><span><b>{thread.title}</b><small>{thread.preview}</small></span>{thread.unread > 0 ? <i>{thread.unread}</i> : null}</button>)}</div></div>
}

function EditorialGalleryDemo() {
  const basePath = useBasePath()
  const [selected, setSelected] = useState<'beauty' | 'portrait'>('beauty')
  const image = selected === 'beauty' ? withBasePath('/work-os/editorial-01.jpeg', basePath) : withBasePath('/work-os/editorial-02.jpeg', basePath)
  return <div className="u-wo-gallery-demo"><header><span>Creative files</span><b>Campaign 04</b></header><div className="u-wo-gallery-stage"><img src={image} width="1152" height="864" loading="lazy" decoding="async" alt={selected === 'beauty' ? 'Selected beauty campaign asset' : 'Selected portrait campaign asset'} /><span>Selected · 01</span></div><div className="u-wo-gallery-thumbs"><button className={selected === 'beauty' ? 'is-active' : ''} aria-pressed={selected === 'beauty'} onClick={() => setSelected('beauty')}><img src={withBasePath('/work-os/editorial-01.jpeg', basePath)} width="1152" height="864" loading="lazy" decoding="async" alt="Choose beauty campaign asset" /></button><button className={selected === 'portrait' ? 'is-active' : ''} aria-pressed={selected === 'portrait'} onClick={() => setSelected('portrait')}><img src={withBasePath('/work-os/editorial-02.jpeg', basePath)} width="1152" height="864" loading="lazy" decoding="async" alt="Choose portrait campaign asset" /></button></div></div>
}

function AiSummaryDemo() {
  const [playing, setPlaying] = useState(false)
  return <div className="u-wo-summary-demo"><header><div><strong>AI Summary</strong><small>All messages</small></div><span>✦</span></header><p>Geex approved both editorial selects. The next action is a 12-second launch cut with a fast opening frame.</p><div className={playing ? 'u-wo-wave is-playing' : 'u-wo-wave'} aria-hidden="true">{[16, 30, 22, 42, 18, 35, 25, 46, 31, 20, 39, 25, 17, 34, 23].map((height, index) => <i style={{ height }} key={`${height}-${index}`} />)}</div><footer><button aria-pressed={playing} onClick={() => setPlaying((current) => !current)}>{playing ? 'Pause' : 'Play summary'}</button><time>{playing ? '0:08' : '0:19'}</time></footer></div>
}

function UtilityWidgetsDemo() {
  const basePath = useBasePath()
  const tasks = ['Confirm campaign crop', 'Send launch brief', 'Book studio review']
  const [done, setDone] = useState<string[]>([tasks[0]])
  const [running, setRunning] = useState(false)
  return <div className="u-wo-widget-grid"><section className="u-wo-timer"><header><b>Timer</b><small>Campaign 04</small></header><strong>08<br />45<small>00</small></strong><button aria-pressed={running} onClick={() => setRunning((current) => !current)}>{running ? 'Pause project' : 'Start project'}</button></section><section className="u-wo-tasks"><header><b>Tasks</b><small>{done.length}/{tasks.length}</small></header>{tasks.map((task) => <label key={task} className={done.includes(task) ? 'is-done' : ''}><input type="checkbox" checked={done.includes(task)} onChange={() => setDone((current) => current.includes(task) ? current.filter((item) => item !== task) : [...current, task])} />{task}</label>)}</section><section className="u-wo-apps"><header><b>Connected apps</b><small>5 active</small></header><div><span>G</span><span>↗</span><span>••</span><span>✥</span><span>N</span></div></section><section className="u-wo-docs"><header><b>Docs</b><small>24–27 April</small></header><div><img src={withBasePath('/work-os/editorial-01.jpeg', basePath)} width="1152" height="864" alt="Campaign document preview" /><img src={withBasePath('/work-os/editorial-02.jpeg', basePath)} width="1152" height="864" alt="Portrait document preview" /></div><strong>Japan Meetup</strong></section></div>
}

function TodayWidgetDemo() {
  const [joined, setJoined] = useState(false)
  return <div className="u-wo-today-demo"><header><strong>Today</strong><span>2 August</span></header><div className="u-wo-time-orbit"><span>Next meeting</span><b>10:15</b><small>00:30:12</small></div><div className="u-wo-meeting"><span className="u-wo-avatar">G</span><span><b>Geex creative review</b><small>4 people · 30 min</small></span><button aria-pressed={joined} onClick={() => setJoined((current) => !current)}>{joined ? 'Joined' : 'Join'}</button></div></div>
}

export function WorkOsBlocksGallery() {
  return <div className="u-demo-grid u-workos-gallery">
    <DemoCard className="u-demo-card--workos u-demo-card--workos-wide" title="Creative chat" description="Scrollable media-rich team conversation" code={'<CreativeChat assets={campaignAssets} />'}><CreativeChatDemo /></DemoCard>
    <DemoCard className="u-demo-card--workos" title="Conversation list" description="Search, people, previews, and unread state" code={'<ConversationList threads={threads} />'}><ConversationListDemo /></DemoCard>
    <DemoCard className="u-demo-card--workos" title="Editorial gallery" description="Real campaign imagery with selection state" code={'<EditorialGallery assets={campaignAssets} />'}><EditorialGalleryDemo /></DemoCard>
    <DemoCard className="u-demo-card--workos" title="AI audio summary" description="High-signal orange assistant card" code={'<AiSummary duration="0:19" />'}><AiSummaryDemo /></DemoCard>
    <DemoCard className="u-demo-card--workos u-demo-card--workos-wide" title="Utility widgets" description="Timer, tasks, apps, and documents" code={'<UtilityGrid timer tasks apps documents />'}><UtilityWidgetsDemo /></DemoCard>
    <DemoCard className="u-demo-card--workos" title="Today & meeting" description="Time-focused schedule widget" code={'<TodayWidget nextMeeting={meeting} />'}><TodayWidgetDemo /></DemoCard>
  </div>
}
