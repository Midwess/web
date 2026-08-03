import { type FormEvent, useMemo, useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { Avatar, AvatarGroup } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button as UnifiedButton } from '../../../components/ui/button'
import { IconAction } from '../../../components/ui/icon-action'
import { SectionTitle } from '../../../components/ui/section-title'
import { Surface } from '../../../components/ui/surface'
import { ViewHeading } from '../../../components/ui/view-heading'
import { initialThreads } from '../data'
import type { Message, Thread } from '../types'

export function ChatBlock() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads)
  const [selectedId, setSelectedId] = useState(initialThreads[0].id)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [pinned, setPinned] = useState(false)
  const [invited, setInvited] = useState(false)
  const visibleThreads = useMemo(() => threads.filter((thread) => `${thread.title} ${thread.preview}`.toLowerCase().includes(query.toLowerCase())), [query, threads])
  const selected = threads.find((thread) => thread.id === selectedId) ?? threads[0]

  function selectThread(id: string) {
    setSelectedId(id)
    setThreads((current) => current.map((thread) => thread.id === id ? { ...thread, unread: 0 } : thread))
  }

  function createThread() {
    const id = `thread-${Date.now()}`
    const next: Thread = { id, title: 'Untitled conversation', preview: 'A clean space for the next decision', time: 'Now', unread: 0, tone: 'sage', messages: [{ id: `${id}-1`, author: 'assistant', name: 'Orbit AI', text: 'This is a fresh thread. What should we work through together?', time: 'Now' }] }
    setThreads((current) => [next, ...current])
    setSelectedId(id)
  }

  function send(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    const outgoing: Message = { id: `self-${Date.now()}`, author: 'self', name: 'You', text, time: 'Now' }
    const response: Message = { id: `ai-${Date.now()}`, author: 'assistant', name: 'Orbit AI', text: 'Understood. I’ve connected that request to the active workspace and prepared the next action.', time: 'Now' }
    setThreads((current) => current.map((thread) => thread.id === selected.id ? { ...thread, preview: text, time: 'Now', messages: [...thread.messages, outgoing, response] } : thread))
    setDraft('')
  }

  return <div className="u-view u-chat-view">
    <ViewHeading eyebrow="Communication" title="One place to decide and act" description="Bring people, operational signals, creative work, and your AI partner into the same conversation." action={<UnifiedButton tone="accent" onClick={createThread}><Icon name="plus" size={18} />New conversation</UnifiedButton>} />
    <div className="u-chat-layout">
      <Surface className="u-thread-panel">
        <label className="u-search-field"><Icon name="search" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" /></label>
        <div className="u-thread-list">{visibleThreads.map((thread) => <button key={thread.id} className={thread.id === selected.id ? 'is-active' : ''} onClick={() => selectThread(thread.id)}><span className={`u-thread-symbol u-thread-symbol--${thread.tone}`}>{thread.title[0]}</span><span><b>{thread.title}</b><small>{thread.preview}</small></span><time>{thread.time}</time>{thread.unread > 0 ? <i>{thread.unread}</i> : null}</button>)}</div>
        {visibleThreads.length === 0 ? <div className="u-empty"><b>No conversations found</b><span>Try another search phrase.</span></div> : null}
      </Surface>

      <Surface className="u-conversation-panel">
        <header className="u-conversation-head"><div><span className={`u-thread-symbol u-thread-symbol--${selected.tone}`}>{selected.title[0]}</span><span><b>{selected.title}</b><small><i /> {invited ? '5' : '4'} people · Orbit AI active</small></span></div><div><IconAction label={pinned ? 'Unpin conversation' : 'Pin conversation'} icon="map" aria-pressed={pinned} onClick={() => setPinned((current) => !current)} /><UnifiedButton tone="quiet" size="compact" onClick={() => setInvited((current) => !current)}><Icon name="users" size={18} />{invited ? 'Invited' : 'Invite'}</UnifiedButton></div></header>
        <div className="u-message-scroll" aria-live="polite"><div className="u-day-marker">Today</div>{selected.messages.map((message) => <article className={`u-message u-message--${message.author}`} key={message.id}>{message.author === 'self' ? null : <Avatar name={message.name} color={message.author === 'assistant' ? '#ffd36b' : '#8c89ff'} size="small" />}<div><header><b>{message.name}</b><time>{message.time}</time></header><p>{message.text}</p></div></article>)}</div>
        <div className="u-quick-prompts"><button onClick={() => setDraft('Summarize the current decisions')}>Summarize decisions</button><button onClick={() => setDraft('Create tasks from this conversation')}>Create tasks</button></div>
        <form className="u-message-composer" onSubmit={send}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Message the team or ask Orbit AI…" aria-label="Message" /><UnifiedButton tone="accent" type="submit">Send</UnifiedButton></form>
      </Surface>

      <aside className="u-chat-context">
        <Surface tone="yellow" className="u-context-summary"><span className="u-ai-orb"><Icon name="sparkles" /></span><Badge tone="neutral">AI summary</Badge><h2>Station handover is the key decision.</h2><p>Maya owns the move. Orbit will recheck capacity in 15 minutes.</p><button onClick={() => setDraft('Show me the full operational summary')}>View full summary <Icon name="arrow" size={16} /></button></Surface>
        <Surface className="u-people-block"><SectionTitle title="People" meta="4 in this thread" /><AvatarGroup><Avatar name="Hanna" color="#ff7c6e" size="small" /><Avatar name="Maya" color="#8c89ff" size="small" /><Avatar name="Noah" color="#a9e7f4" size="small" /><Avatar name="Orbit" color="#ffd36b" size="small" /></AvatarGroup></Surface>
        <Surface className="u-files-block"><SectionTitle title="Shared files" meta="2 recent" /><article><span className="u-file-preview u-file-preview--coral">PDF</span><span><b>Service plan.pdf</b><small>2.4 MB · Maya</small></span></article><article><span className="u-file-preview u-file-preview--violet">IMG</span><span><b>Menu selects</b><small>8 images · Noah</small></span></article></Surface>
      </aside>
    </div>
  </div>
}
