import type { Order, TeamMember, Thread } from './types'

export const initialThreads: Thread[] = [
  {
    id: 'ops', title: 'Service operations', preview: 'Two signals need your attention', time: 'Now', unread: 2, tone: 'coral',
    messages: [
      { id: 'ops-1', author: 'assistant', name: 'Orbit AI', text: 'Good afternoon, Hanna. Astoria is pacing 12% above forecast, but the cold station is approaching capacity.', time: '12:42' },
      { id: 'ops-2', author: 'teammate', name: 'Maya', text: 'I can move one prep cook over after the next ticket clears.', time: '12:44' },
      { id: 'ops-3', author: 'self', name: 'You', text: 'Perfect. Keep the handover lightweight and update the service board.', time: '12:45' },
      { id: 'ops-4', author: 'assistant', name: 'Orbit AI', text: 'Done. The board is updated and I will check station load again in 15 minutes.', time: '12:46' },
    ],
  },
  {
    id: 'launch', title: 'Spring menu launch', preview: 'Campaign assets are ready to review', time: '11:20', unread: 0, tone: 'violet',
    messages: [
      { id: 'launch-1', author: 'teammate', name: 'Noah', text: 'The spring menu photos and launch copy are ready for one final pass.', time: '11:18' },
      { id: 'launch-2', author: 'assistant', name: 'Orbit AI', text: 'I grouped all assets by channel and highlighted two crops that need approval.', time: '11:20' },
    ],
  },
  {
    id: 'inventory', title: 'Inventory watch', preview: 'Oat milk is below the safety level', time: '09:35', unread: 1, tone: 'cyan',
    messages: [
      { id: 'inventory-1', author: 'assistant', name: 'Orbit AI', text: 'Oat milk will fall below the safety level before the evening shift. Reorder 18 units?', time: '09:35' },
    ],
  },
  {
    id: 'leadership', title: 'Leadership sync', preview: 'Weekly notes and decisions', time: 'Mon', unread: 0, tone: 'sage',
    messages: [
      { id: 'leadership-1', author: 'teammate', name: 'Avery', text: 'I added the staffing notes and decisions from Monday’s sync.', time: 'Monday' },
    ],
  },
]

export const initialOrders: Order[] = [
  { id: '#1048', guest: 'Avery Stone', items: '2 × Salmon bowl, Citrus soda', total: '$48.50', status: 'Preparing', eta: '8 min' },
  { id: '#1047', guest: 'Mia Chen', items: 'Miso toast, Flat white', total: '$24.00', status: 'Ready', eta: 'Now' },
  { id: '#1046', guest: 'Theo Martin', items: '3 × Daily plate, Tea', total: '$72.25', status: 'Attention', eta: '12 min' },
  { id: '#1045', guest: 'Zoe Wilson', items: 'Seasonal salad, Lemonade', total: '$31.80', status: 'Preparing', eta: '6 min' },
  { id: '#1044', guest: 'Luca Hayes', items: 'Chef burger, Fries', total: '$28.40', status: 'Ready', eta: 'Now' },
]

export const teamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'Maya Lopez', role: 'Shift lead', shift: '08:00 – 16:00', status: 'On shift', color: '#ff7c6e' },
  { id: 'tm-2', name: 'Noah Kim', role: 'Brand manager', shift: '09:00 – 17:00', status: 'On shift', color: '#8c89ff' },
  { id: 'tm-3', name: 'Avery Singh', role: 'Head chef', shift: '12:00 – 20:00', status: 'Break', color: '#a9e7f4' },
  { id: 'tm-4', name: 'Iris Baker', role: 'Floor host', shift: '13:00 – 21:00', status: 'Arriving', color: '#d4e4d9' },
  { id: 'tm-5', name: 'Theo Jones', role: 'Prep cook', shift: '14:00 – 22:00', status: 'Arriving', color: '#ffd36b' },
]
