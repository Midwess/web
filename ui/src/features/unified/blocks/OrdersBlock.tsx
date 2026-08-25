import { useMemo, useState } from 'react'
import { Icon } from '../../../components/ui/icon'
import { Badge } from '../../../components/ui/badge'
import { Button as UnifiedButton } from '../../../components/ui/button'
import { SectionTitle } from '../../../components/ui/section-title'
import { Surface } from '../../../components/ui/surface'
import { ViewHeading } from '../../../components/ui/view-heading'
import { initialOrders } from '../data'
import type { Order, OrderStatus } from '../types'

type Filter = 'All' | OrderStatus

export function OrdersBlock() {
  const [orders, setOrders] = useState(initialOrders)
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const filters: Filter[] = ['All', 'Preparing', 'Ready', 'Attention']
  const visibleOrders = useMemo(() => orders.filter((order) => (filter === 'All' || order.status === filter) && `${order.id} ${order.guest} ${order.items}`.toLowerCase().includes(query.toLowerCase())), [filter, orders, query])

  function addOrder() {
    const nextNumber = 1049 + orders.length
    const next: Order = { id: `#${nextNumber}`, guest: 'New walk-in', items: 'Order details pending', total: '$0.00', status: 'Preparing', eta: '15 min' }
    setOrders((current) => [next, ...current])
  }

  function toggleSelected(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function markReady() {
    setOrders((current) => current.map((order) => selected.includes(order.id) ? { ...order, status: 'Ready', eta: 'Now' } : order))
    setSelected([])
  }

  return <div className="u-view u-orders-view">
    <ViewHeading eyebrow="Live service" title="Orders, without the clutter" description="A responsive list view for scanning, filtering, selecting, and updating operational work." action={<UnifiedButton tone="accent" onClick={addOrder}><Icon name="plus" size={18} />New order</UnifiedButton>} />
    <div className="u-list-stats"><Surface tone="coral"><span>In progress</span><strong>{orders.filter((order) => order.status === 'Preparing').length}</strong><small>12 min average</small></Surface><Surface tone="sage"><span>Ready</span><strong>{orders.filter((order) => order.status === 'Ready').length}</strong><small>Pickup counter</small></Surface><Surface tone="yellow"><span>Needs attention</span><strong>{orders.filter((order) => order.status === 'Attention').length}</strong><small>Review now</small></Surface></div>
    <Surface className="u-orders-table">
      <SectionTitle title="Order queue" meta={`${visibleOrders.length} visible orders`} action={selected.length > 0 ? <UnifiedButton tone="accent" size="compact" onClick={markReady}>Mark {selected.length} ready</UnifiedButton> : undefined} />
      <div className="u-table-tools"><div className="u-segmented" aria-label="Filter orders">{filters.map((item) => <button className={filter === item ? 'is-active' : ''} aria-pressed={filter === item} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="u-search-field"><Icon name="search" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders" /></label></div>
      <div className="u-table" role="table" aria-label="Orders">
        <div className="u-table-row u-table-head" role="row"><span /><span>Order</span><span>Guest</span><span>Items</span><span>Status</span><span>ETA</span><span>Total</span></div>
        {visibleOrders.map((order) => <div className={selected.includes(order.id) ? 'u-table-row is-selected' : 'u-table-row'} role="row" key={order.id}><label className="u-checkbox"><input type="checkbox" checked={selected.includes(order.id)} onChange={() => toggleSelected(order.id)} /><span /></label><b>{order.id}</b><span>{order.guest}</span><span className="u-order-items">{order.items}</span><Badge tone={order.status === 'Ready' ? 'success' : order.status === 'Attention' ? 'warning' : 'violet'}>{order.status}</Badge><span>{order.eta}</span><strong>{order.total}</strong></div>)}
      </div>
      {visibleOrders.length === 0 ? <div className="u-empty"><b>No matching orders</b><span>Clear the search or choose another status.</span></div> : null}
    </Surface>
  </div>
}
