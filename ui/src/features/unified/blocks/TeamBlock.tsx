import { useState } from 'react'
import { Avatar } from '../../../components/ui/avatar'
import { Badge } from '../../../components/ui/badge'
import { Button as UnifiedButton } from '../../../components/ui/button'
import { Icon } from '../../../components/ui/icon'
import { ProgressBar } from '../../../components/ui/progress'
import { SectionTitle } from '../../../components/ui/section-title'
import { Surface } from '../../../components/ui/surface'
import { ViewHeading } from '../../../components/ui/view-heading'
import { teamMembers as initialTeam } from '../data'
import type { TeamMember } from '../types'

const stages: TeamMember['status'][] = ['On shift', 'Break', 'Arriving']

export function TeamBlock() {
  const [team, setTeam] = useState(initialTeam)

  function addMember() {
    const member: TeamMember = { id: `tm-${Date.now()}`, name: 'New teammate', role: 'Role to assign', shift: '14:00 – 22:00', status: 'Arriving', color: '#ffb45f' }
    setTeam((current) => [...current, member])
  }

  function advance(member: TeamMember) {
    const next = stages[(stages.indexOf(member.status) + 1) % stages.length]
    setTeam((current) => current.map((item) => item.id === member.id ? { ...item, status: next } : item))
  }

  return <div className="u-view u-team-view">
    <ViewHeading eyebrow="People & capacity" title="A calmer way to run the shift" description="See who is here, where capacity is going, and what each person needs next." action={<UnifiedButton tone="accent" onClick={addMember}><Icon name="plus" size={18} />Add teammate</UnifiedButton>} />
    <div className="u-team-summary">
      <Surface tone="violet" className="u-capacity-card"><SectionTitle title="Weekly capacity" meta="All locations" /><div className="u-capacity-number"><strong>87%</strong><Badge tone="neutral">Healthy</Badge></div><div className="u-capacity-days">{[72, 81, 88, 93, 87, 78, 64].map((value, index) => <div key={index}><i style={{ height: `${value}%` }} /><span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span></div>)}</div></Surface>
      <Surface className="u-staffing-card"><SectionTitle title="Staffing health" meta="Live coverage" /><ProgressBar value={92} label="Floor" /><ProgressBar value={78} label="Kitchen" /><ProgressBar value={84} label="Delivery" /><p><span /> Kitchen coverage is the only watch item.</p></Surface>
      <Surface tone="cyan" className="u-shift-note"><Badge tone="neutral">Shift note</Badge><h2>“Keep handovers human.”</h2><p>Orbit summarizes the details, while the team keeps ownership of every decision.</p></Surface>
    </div>
    <div className="u-board" aria-label="Team status board">{stages.map((stage) => <Surface className="u-board-column" key={stage}><SectionTitle title={stage} meta={`${team.filter((member) => member.status === stage).length} people`} /> <div>{team.filter((member) => member.status === stage).map((member) => <article className="u-member-card" key={member.id}><header><Avatar name={member.name} color={member.color} /><Badge tone={stage === 'On shift' ? 'success' : stage === 'Break' ? 'warning' : 'neutral'}>{stage}</Badge></header><h3>{member.name}</h3><p>{member.role}</p><footer><span>{member.shift}</span><button onClick={() => advance(member)}>Move next</button></footer></article>)}</div></Surface>)}</div>
  </div>
}
