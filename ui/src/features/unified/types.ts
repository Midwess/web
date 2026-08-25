export type UnifiedView = 'overview' | 'chat' | 'orders' | 'team' | 'library'

export type Message = {
  id: string
  author: 'assistant' | 'self' | 'teammate'
  name: string
  text: string
  time: string
}

export type Thread = {
  id: string
  title: string
  preview: string
  time: string
  unread: number
  tone: 'coral' | 'violet' | 'cyan' | 'sage'
  messages: Message[]
}

export type OrderStatus = 'Preparing' | 'Ready' | 'Attention'

export type Order = {
  id: string
  guest: string
  items: string
  total: string
  status: OrderStatus
  eta: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  shift: string
  status: 'On shift' | 'Break' | 'Arriving'
  color: string
}
