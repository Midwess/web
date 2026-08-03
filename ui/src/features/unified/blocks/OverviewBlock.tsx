import { useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { Avatar, AvatarGroup } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button as UnifiedButton } from '../../../components/ui/button'
import { ProgressBar } from '../../../components/ui/progress'
import { SectionTitle } from '../../../components/ui/section-title'
import { Surface } from '../../../components/ui/surface'
import { ViewHeading } from '../../../components/ui/view-heading'
import { useBasePath, withBasePath } from '../../../lib/base-path'
import type { UnifiedView } from '../types'

const chart = [42, 64, 52, 78, 68, 92, 74]
const tasks = ['Approve supplier order', 'Review spring menu crops', 'Confirm evening handover']

export function OverviewBlock({ onNavigate }: { onNavigate: (view: UnifiedView) => void }) {
  const basePath = useBasePath()
  const [completed, setCompleted] = useState<string[]>([tasks[2]])
  const toggleTask = (task: string) => setCompleted((current) => current.includes(task) ? current.filter((item) => item !== task) : [...current, task])

  return <div className="u-view u-overview-view">
    <ViewHeading eyebrow="Sunday, 2 August" title="Good afternoon, Hanna" description="Your operation is moving well. Two signals deserve attention before the evening shift." action={<UnifiedButton tone="accent" onClick={() => onNavigate('chat')}><Icon name="sparkles" size={18} />Ask Orbit AI</UnifiedButton>} />

    <div className="u-metric-grid">
      <Surface tone="coral" className="u-metric-card"><span>Gross revenue</span><strong>$24,860</strong><footer><Badge tone="neutral">+12.4%</Badge><small>vs last Sunday</small></footer></Surface>
      <Surface tone="violet" className="u-metric-card"><span>Orders today</span><strong>184</strong><footer><Badge tone="neutral">28 live</Badge><small>12 min avg.</small></footer></Surface>
      <Surface tone="sage" className="u-metric-card"><span>Team capacity</span><strong>87%</strong><footer><AvatarGroup><Avatar name="Maya" color="#ff7c6e" size="small" /><Avatar name="Noah" color="#8c89ff" size="small" /><Avatar name="Avery" color="#a9e7f4" size="small" /></AvatarGroup><small>14 on shift</small></footer></Surface>
      <Surface tone="cyan" className="u-metric-card"><span>Guest sentiment</span><strong>4.8</strong><footer><Badge tone="success">Excellent</Badge><small>91 responses</small></footer></Surface>
    </div>

    <div className="u-overview-grid">
      <Surface tone="base" className="u-revenue-block">
        <SectionTitle title="Revenue pulse" meta="Last seven days" action={<UnifiedButton tone="quiet" size="compact" onClick={() => onNavigate('orders')}>View orders</UnifiedButton>} />
        <div className="u-chart-summary"><div><small>Net revenue</small><strong>$156,900.67</strong></div><Badge tone="success">+7.5%</Badge></div>
        <div className="u-bar-chart" aria-label="Revenue over the last seven days">{chart.map((height, index) => <div key={height + index}><i style={{ height: `${height}%` }} className={index === 5 ? 'is-active' : ''} /><span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span></div>)}</div>
      </Surface>

      <Surface tone="yellow" className="u-ai-brief">
        <div className="u-ai-brief-head"><span className="u-ai-orb"><Icon name="sparkles" /></span><Badge tone="neutral">Live brief</Badge></div>
        <h2>Protect the evening flow</h2>
        <p>Move one prep cook to cold station at 17:30 and approve the oat milk reorder before 15:00.</p>
        <div className="u-ai-brief-art"><img src={withBasePath('/restaurant/mascot-group.png', basePath)} width="1024" height="1024" alt="Restaurant operations crew" /></div>
        <UnifiedButton tone="neutral" onClick={() => onNavigate('chat')}>Open assistant</UnifiedButton>
      </Surface>

      <Surface className="u-flow-block">
        <SectionTitle title="Today’s flow" meta="4 upcoming moments" />
        <ol className="u-timeline">
          <li><time>14:30</time><span><b>Supplier delivery</b><small>Back entrance · Maya</small></span><Badge tone="accent">Next</Badge></li>
          <li><time>16:00</time><span><b>Team handover</b><small>Main floor · 8 people</small></span></li>
          <li><time>17:30</time><span><b>Evening service</b><small>Forecast: 84 covers</small></span></li>
        </ol>
      </Surface>

      <Surface className="u-task-block">
        <SectionTitle title="Focus list" meta={`${completed.length} of ${tasks.length} complete`} />
        <div className="u-task-list">{tasks.map((task) => <label key={task} className={completed.includes(task) ? 'is-complete' : ''}><input type="checkbox" checked={completed.includes(task)} onChange={() => toggleTask(task)} /><span>{task}</span></label>)}</div>
        <ProgressBar value={Math.round((completed.length / tasks.length) * 100)} label="Daily progress" />
      </Surface>
    </div>
  </div>
}
