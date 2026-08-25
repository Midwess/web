import { type ChangeEvent, type KeyboardEvent, useId, useMemo, useRef, useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { Avatar } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button as UnifiedButton } from '../../../components/ui/button'
import { IconAction } from '../../../components/ui/icon-action'
import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '../../../components/ui/alert'
import { DemoCard } from './DemoCard'

export const advancedComponentSlugs = new Set(['accordion', 'alert', 'checkbox', 'combobox', 'dialog', 'file-upload', 'calendar', 'rating', 'skeleton', 'stepper', 'switch', 'timeline'])

function AccordionExamples() {
  const [open, setOpen] = useState('staffing')
  const items = [
    { id: 'staffing', title: 'How does capacity forecasting work?', body: 'Orbit combines scheduled team hours, live attendance, reservations, and recent service patterns.' },
    { id: 'alerts', title: 'When will the team receive alerts?', body: 'Only high-value signals are sent immediately. Lower priority changes stay in the daily brief.' },
    { id: 'privacy', title: 'Who can view operational summaries?', body: 'Workspace administrators control access by role, location, and conversation.' },
  ]
  return <div className="u-demo-grid"><DemoCard title="Single accordion" description="One expanded item at a time." code={'<Accordion type="single" collapsible>…</Accordion>'}><div className="u-advanced-accordion">{items.map((item) => <section key={item.id}><button aria-expanded={open === item.id} onClick={() => setOpen((current) => current === item.id ? '' : item.id)}><span>{item.title}</span><Icon name="chevron" size={17} /></button>{open === item.id ? <p>{item.body}</p> : null}</section>)}</div></DemoCard><DemoCard title="Editorial disclosure" description="A bolder Work OS-inspired treatment." code={'<Disclosure tone="accent" title="AI summary">…</Disclosure>'}><article className="u-editorial-disclosure"><Badge tone="neutral">Orbit brief</Badge><h3>The evening shift is ready.</h3><p>Capacity is healthy and one supplier confirmation remains.</p><button onClick={() => setOpen(open === 'brief' ? '' : 'brief')}>{open === 'brief' ? 'Hide details' : 'Show details'}</button>{open === 'brief' ? <small>Oat milk reorder · due before 15:00</small> : null}</article></DemoCard></div>
}

function AlertExamples() {
  const [warningVisible, setWarningVisible] = useState(true)
  return <div className="u-demo-grid"><DemoCard title="Semantic alerts" description="Success, warning, and neutral feedback." code={'<Alert tone="warning"><AlertTitle>Inventory risk</AlertTitle></Alert>'}><div className="u-alert-stack"><Alert tone="success"><AlertIcon><Icon name="check" /></AlertIcon><AlertContent><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your workspace settings are now live.</AlertDescription></AlertContent></Alert>{warningVisible ? <Alert tone="warning" role="alert"><AlertIcon><Icon name="warning" /></AlertIcon><AlertContent><AlertTitle>Inventory risk</AlertTitle><AlertDescription>Oat milk is below the evening safety level.</AlertDescription></AlertContent><AlertAction><IconAction icon="close" label="Dismiss inventory warning" onClick={() => setWarningVisible(false)} /></AlertAction></Alert> : <UnifiedButton size="compact" tone="quiet" onClick={() => setWarningVisible(true)}>Restore warning</UnifiedButton>}<Alert><AlertIcon><Icon name="bell" /></AlertIcon><AlertContent><AlertTitle>Daily brief ready</AlertTitle><AlertDescription>Three decisions were summarized by Orbit AI.</AlertDescription></AlertContent></Alert></div></DemoCard><DemoCard title="Inline banner" description="A high-priority callout with one action." code={'<Alert tone="accent" appearance="prominent">…</Alert>'}><Alert tone="accent" appearance="prominent" role="alert"><AlertIcon><Icon name="sparkles" /></AlertIcon><AlertContent><AlertTitle>{warningVisible ? 'Two signals deserve attention' : 'Signals reviewed'}</AlertTitle><AlertDescription>Kitchen coverage is at 78% and order #1046 is delayed.</AlertDescription></AlertContent><AlertAction><UnifiedButton tone="neutral" size="compact" onClick={() => setWarningVisible((current) => !current)}>{warningVisible ? 'Review signals' : 'Mark unresolved'}</UnifiedButton></AlertAction></Alert></DemoCard></div>
}

function CheckboxExamples() {
  const tasks = ['Approve supplier order', 'Confirm campaign crop', 'Prepare shift brief']
  const [checked, setChecked] = useState<string[]>([tasks[0]])
  const toggle = (task: string) => setChecked((current) => current.includes(task) ? current.filter((item) => item !== task) : [...current, task])
  return <div className="u-demo-grid"><DemoCard title="Task checklist" description="Independent task completion state." code={'<Checkbox checked={done} onCheckedChange={setDone} />'}><div className="u-checkbox-list"><header><b>Launch checklist</b><Badge tone="accent">{checked.length}/{tasks.length}</Badge></header>{tasks.map((task) => <label key={task} className={checked.includes(task) ? 'is-checked' : ''}><input type="checkbox" checked={checked.includes(task)} onChange={() => toggle(task)} /><span><Icon name="check" size={13} /></span>{task}</label>)}</div></DemoCard><DemoCard title="Permission choices" description="Checkboxes with supporting descriptions." code={'<CheckboxField label="Export reports" description="…" />'}><div className="u-choice-list"><label><input type="checkbox" defaultChecked /><span><b>Export reports</b><small>Download operational data and summaries.</small></span></label><label><input type="checkbox" /><span><b>Manage team</b><small>Edit roles, schedules, and workspace access.</small></span></label></div></DemoCard></div>
}

function ComboboxExamples() {
  const people = ['Maya Lopez', 'Avery Singh', 'Noah Kim', 'Iris Baker', 'Theo Jones']
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const listboxId = useId()
  const matches = useMemo(() => people.filter((person) => person.toLowerCase().includes(query.toLowerCase())), [query])

  function choose(person: string) {
    setSelected(person)
    setQuery('')
    setOpen(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((current) => event.key === 'ArrowDown'
        ? Math.min(matches.length - 1, current + 1)
        : Math.max(0, current - 1))
    }
    if (event.key === 'Enter' && open && matches[activeIndex]) {
      event.preventDefault()
      choose(matches[activeIndex])
    }
  }

  return <div className="u-demo-grid">
    <DemoCard title="Searchable assignee" description="Filter a longer list before choosing." code={'<Combobox options={team} onValueChange={setAssignee} />'}>
      <div className="u-combobox">
        <label><Icon name="search" size={17} /><input name="assignee" role="combobox" aria-label="Search teammates" aria-autocomplete="list" aria-expanded={open} aria-controls={listboxId} aria-activedescendant={open && matches[activeIndex] ? `${listboxId}-${activeIndex}` : undefined} autoComplete="off" spellCheck={false} value={query} onFocus={() => setOpen(true)} onKeyDown={handleKeyDown} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); setOpen(true) }} placeholder="Search teammates…" /></label>
        {open ? <div id={listboxId} role="listbox" aria-label="Teammates">{matches.length ? matches.map((person, index) => <button id={`${listboxId}-${index}`} role="option" type="button" tabIndex={-1} aria-selected={selected === person} className={activeIndex === index ? 'is-active' : ''} key={person} onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(person)}><Avatar name={person} color={['#ff7c6e', '#8c89ff', '#a9e7f4'][index % 3]} size="small" /><span>{person}</span><small>{index % 2 ? 'Operations' : 'Creative'}</small></button>) : <p className="u-combobox-empty">No teammates found</p>}</div> : null}
        {selected ? <p className="u-combobox-selection">Assigned to <b>{selected}</b><button type="button" aria-label={`Remove ${selected}`} onClick={() => setSelected('')}><Icon name="close" size={14} /></button></p> : null}
      </div>
    </DemoCard>
    <DemoCard title="Native autocomplete" description="A lightweight browser-native option." code={'<input list="locations" />'}><label className="u-demo-field"><span>Location</span><input name="location" autoComplete="address-level2" list="orbit-locations" placeholder="Start typing a location…" /><datalist id="orbit-locations"><option value="Astoria" /><option value="Long Island City" /><option value="Rego Park" /></datalist><small>Uses the platform autocomplete experience.</small></label></DemoCard>
  </div>
}

function DialogExamples() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const confirmRef = useRef<HTMLDialogElement>(null)
  const [confirmed, setConfirmed] = useState(false)
  return <div className="u-demo-grid"><DemoCard title="Edit dialog" description="A focused form using the native dialog element." code={'<Dialog><DialogContent>…</DialogContent></Dialog>'}><div className="u-demo-stack"><UnifiedButton tone="accent" onClick={() => dialogRef.current?.showModal()}>Edit workspace</UnifiedButton><dialog className="u-dialog" ref={dialogRef} aria-labelledby="edit-workspace-title"><form method="dialog"><header><span><b id="edit-workspace-title">Edit workspace</b><small>Update the public workspace details.</small></span><button type="submit" value="cancel" aria-label="Close dialog"><Icon name="close" /></button></header><label>Name<input name="workspace-name" autoComplete="organization" defaultValue="The Daily Grind" /></label><label>Description<textarea name="workspace-description" defaultValue="Restaurant operations and creative workspace." /></label><footer><UnifiedButton type="submit" tone="quiet" value="cancel">Cancel</UnifiedButton><UnifiedButton type="submit" tone="accent" value="default">Save changes</UnifiedButton></footer></form></dialog></div></DemoCard><DemoCard title="Confirmation dialog" description="A clear decision with safe cancellation." code={'<ConfirmDialog title="Archive project?" />'}><div className="u-demo-stack"><UnifiedButton tone="danger" onClick={() => confirmRef.current?.showModal()}>Archive project</UnifiedButton>{confirmed ? <Badge tone="warning">Project archived</Badge> : null}<dialog className="u-dialog u-dialog--compact" ref={confirmRef} aria-labelledby="archive-project-title"><form method="dialog"><h3 id="archive-project-title">Archive this project?</h3><p>The team can restore it later from workspace settings.</p><footer><UnifiedButton type="submit" tone="quiet" value="cancel">Keep project</UnifiedButton><UnifiedButton type="submit" tone="danger" value="default" onClick={() => setConfirmed(true)}>Archive</UnifiedButton></footer></form></dialog></div></DemoCard></div>
}

function FileUploadExamples() {
  const [filename, setFilename] = useState('')
  function pickFile(event: ChangeEvent<HTMLInputElement>) { setFilename(event.target.files?.[0]?.name ?? '') }
  return <div className="u-demo-grid"><DemoCard title="File dropzone" description="A generous input with immediate feedback." code={'<FileUpload accept="image/*" onFilesChange={setFiles} />'}><label className="u-dropzone"><input name="campaign-image" type="file" accept="image/png,image/jpeg,image/webp" onChange={pickFile} /><span className="u-ai-orb"><Icon name={filename ? 'check' : 'plus'} /></span><b>{filename || 'Choose a campaign image'}</b><small aria-live="polite">{filename ? 'Ready to upload' : 'PNG, JPG, or WebP up to 10 MB'}</small></label></DemoCard><DemoCard title="Compact attachment" description="For chat composers and forms." code={'<FileButton onFileChange={setFile}>Attach file</FileButton>'}><div className="u-file-row"><span className="u-file-preview u-file-preview--coral">PDF</span><span><b>{filename || 'Service plan.pdf'}</b><small aria-live="polite">{filename ? 'Selected now' : '2.4 MB · Maya'}</small></span><label><input name="replacement-file" type="file" onChange={pickFile} />Replace file</label></div></DemoCard></div>
}

function CalendarExamples() {
  const [day, setDay] = useState(18)
  const [month, setMonth] = useState(8)
  const monthDate = new Date(2026, month - 1, 1)
  const selectedDate = new Date(2026, month - 1, day)
  const monthName = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(monthDate)
  const shortMonth = new Intl.DateTimeFormat(undefined, { month: 'short' }).format(monthDate).toUpperCase()
  const selectedLabel = new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric' }).format(selectedDate)
  const days = Array.from({ length: new Date(2026, month, 0).getDate() }, (_, index) => index + 1)
  return <div className="u-demo-grid"><DemoCard title="Date calendar" description="Compact single-date selection." code={'<Calendar mode="single" selected={date} />'}><div className="u-calendar"><header><button type="button" aria-label="Previous month" disabled={month === 7} onClick={() => { setMonth((current) => Math.max(7, current - 1)); setDay(1) }}>‹</button><b aria-live="polite">{monthName}</b><button type="button" aria-label="Next month" disabled={month === 9} onClick={() => { setMonth((current) => Math.min(9, current + 1)); setDay(1) }}>›</button></header><div className="u-calendar-week" aria-hidden="true">{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((name) => <span key={name}>{name}</span>)}</div><div className="u-calendar-days" role="grid" aria-label={monthName}>{days.map((date) => {
    const dateLabel = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(2026, month - 1, date))
    return <button type="button" role="gridcell" key={date} aria-label={dateLabel} aria-pressed={day === date} className={day === date ? 'is-selected' : date === 22 ? 'has-event' : ''} onClick={() => setDay(date)}>{date}</button>
  })}</div><p aria-live="polite">Selected: <b>{selectedLabel}</b></p></div></DemoCard><DemoCard title="Schedule date" description="Date context paired with an event." code={'<CalendarCard date={selectedDate} event={event} />'}><article className="u-date-card"><div><span>{shortMonth}</span><strong>{day}</strong></div><span><Badge tone="violet">Creative</Badge><b>Geex campaign review</b><small>10:15 · 4 attendees</small></span></article></DemoCard></div>
}

function RatingExamples() {
  const [rating, setRating] = useState(4)
  return <div className="u-demo-grid"><DemoCard title="Star rating" description="Interactive guest sentiment input." code={'<Rating value={rating} onValueChange={setRating} />'}><div className="u-rating"><div>{[1, 2, 3, 4, 5].map((value) => <button aria-label={`Rate ${value} stars`} aria-pressed={rating === value} onClick={() => setRating(value)} key={value}>{value <= rating ? '★' : '☆'}</button>)}</div><p><b>{rating}.0</b> · {rating >= 4 ? 'Excellent experience' : 'Thanks for the feedback'}</p></div></DemoCard><DemoCard title="Quality score" description="Read-only rating with context." code={'<Rating readOnly value={4.8} />'}><div className="u-quality-score"><strong>4.8</strong><span>★★★★★</span><small>Based on 91 guest responses</small></div></DemoCard></div>
}

function SkeletonExamples() {
  const [loading, setLoading] = useState(true)
  return <div className="u-demo-grid"><DemoCard title="Content skeleton" description="Preserves the shape of a message card." code={'{loading ? <MessageSkeleton /> : <Message /> }'}><div className="u-demo-stack"><UnifiedButton size="compact" tone="quiet" onClick={() => setLoading((current) => !current)}>{loading ? 'Show content' : 'Show loading'}</UnifiedButton>{loading ? <div className="u-skeleton-card"><i /><span><i /><i /><i /></span></div> : <div className="u-loaded-card"><Avatar name="Orbit AI" color="#ffd36b" /><span><b>Orbit AI</b><p>The daily brief is ready for review.</p></span></div>}</div></DemoCard><DemoCard title="Dashboard skeleton" description="A multi-card loading composition." code={'<DashboardSkeleton cards={3} />'}><div className="u-skeleton-grid">{[1, 2, 3].map((item) => <div key={item}><i /><i /><i /></div>)}</div></DemoCard></div>
}

function StepperExamples() {
  const steps = ['Workspace', 'Team', 'Review']
  const [step, setStep] = useState(0)
  return <div className="u-demo-grid"><DemoCard title="Onboarding stepper" description="Guided progress with explicit next and back actions." code={'<Stepper value={step} onValueChange={setStep}>…</Stepper>'}><div className="u-stepper"><ol>{steps.map((item, index) => <li className={index === step ? 'is-active' : index < step ? 'is-complete' : ''} key={item}><span>{index < step ? <Icon name="check" size={14} /> : index + 1}</span><b>{item}</b></li>)}</ol><section><Badge tone="accent">Step {step + 1} of {steps.length}</Badge><h3>{steps[step]}</h3><p>{step === 0 ? 'Name the workspace and choose its primary location.' : step === 1 ? 'Invite the people who will collaborate here.' : 'Confirm the setup before publishing.'}</p></section><footer><UnifiedButton tone="quiet" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</UnifiedButton><UnifiedButton tone="accent" onClick={() => setStep((current) => current === steps.length - 1 ? 0 : current + 1)}>{step === steps.length - 1 ? 'Start over' : 'Continue'}</UnifiedButton></footer></div></DemoCard><DemoCard title="Compact progress steps" description="A quiet summary for short workflows." code={'<StepProgress current={2} total={4} />'}><div className="u-compact-steps"><span><i className="is-complete" /><i className="is-complete" /><i className="is-active" /><i /></span><b>Upload assets</b><small>Step 3 of 4</small></div></DemoCard></div>
}

function SwitchExamples() {
  const [smart, setSmart] = useState(true)
  const [digest, setDigest] = useState(false)
  return <div className="u-demo-grid"><DemoCard title="Settings switches" description="Immediate preferences with clear context." code={'<Switch checked={enabled} onCheckedChange={setEnabled} />'}><div className="u-switch-list"><label><span><b>Smart notifications</b><small>Only surface high-value signals.</small></span><input type="checkbox" checked={smart} onChange={() => setSmart((current) => !current)} /></label><label><span><b>Weekly digest</b><small>Receive a summary every Monday.</small></span><input type="checkbox" checked={digest} onChange={() => setDigest((current) => !current)} /></label></div></DemoCard><DemoCard title="Feature switch" description="An expressive Work OS-inspired setting." code={'<FeatureSwitch label="Orbit AI" />'}><div className={smart ? 'u-feature-switch is-on' : 'u-feature-switch'}><span className="u-ai-orb"><Icon name="sparkles" /></span><span><b>Orbit AI assistant</b><small>{smart ? 'Active across this workspace' : 'Paused for this workspace'}</small></span><button aria-pressed={smart} onClick={() => setSmart((current) => !current)}>{smart ? 'On' : 'Off'}</button></div></DemoCard></div>
}

function TimelineExamples() {
  return <div className="u-demo-grid"><DemoCard title="Activity timeline" description="A sequential operational history." code={'<Timeline events={activity} />'}><ol className="u-activity-timeline"><li><i className="u-timeline-accent" /><span><time>12:46</time><b>Orbit updated the service board</b><small>Capacity will be checked again in 15 minutes.</small></span></li><li><i className="u-timeline-violet" /><span><time>12:44</time><b>Maya accepted the station move</b><small>Cold station · Evening preparation</small></span></li><li><i /><span><time>12:42</time><b>Capacity warning detected</b><small>Astoria is pacing 12% above forecast.</small></span></li></ol></DemoCard><DemoCard title="Milestone timeline" description="Horizontal progress for a campaign." code={'<Milestones items={campaignSteps} />'}><div className="u-milestones">{['Direction', 'Production', 'Review', 'Launch'].map((item, index) => <div className={index < 2 ? 'is-complete' : index === 2 ? 'is-active' : ''} key={item}><i>{index < 2 ? <Icon name="check" size={13} /> : index + 1}</i><b>{item}</b><small>{['Done', 'Done', 'Today', 'Aug 18'][index]}</small></div>)}</div></DemoCard></div>
}

export function AdvancedComponentExamples({ slug }: { slug: string }) {
  if (slug === 'accordion') return <AccordionExamples />
  if (slug === 'alert') return <AlertExamples />
  if (slug === 'checkbox') return <CheckboxExamples />
  if (slug === 'combobox') return <ComboboxExamples />
  if (slug === 'dialog') return <DialogExamples />
  if (slug === 'file-upload') return <FileUploadExamples />
  if (slug === 'calendar') return <CalendarExamples />
  if (slug === 'rating') return <RatingExamples />
  if (slug === 'skeleton') return <SkeletonExamples />
  if (slug === 'stepper') return <StepperExamples />
  if (slug === 'switch') return <SwitchExamples />
  return <TimelineExamples />
}
