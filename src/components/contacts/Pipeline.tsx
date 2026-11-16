import Link from 'next/link'
import { useState, type DragEvent } from 'react'
import { ArrowUpRight, ChevronDown, GripVertical, Plus } from 'lucide-react'
import { Avatar, Empty, ErrorBanner, Eyebrow, StatusBadge } from '@/components/ui/primitives'
import {
  compactSelectField, identity, identityDetail, identityName, panel, pageHeading,
  pageTitle, primaryButton, secondaryButton, selectChevron, selectWrap,
} from '@/components/ui/styles'
import { statuses } from '@/constants/contacts'
import type { Contact, Status } from '@/types/contact'
import { findContacts } from '@/utils/contacts'

const descriptions: Record<Status, string> = {
  Lead: 'New inquiries and initial consultations.',
  Active: 'Contacts with work in progress.',
  Closed: 'Completed or no longer proceeding.',
}
const laneBorder = {
  Lead: 'border-t-[#cda866]',
  Active: 'border-t-[#7d9d83]',
  Closed: 'border-t-[#9ca5b6]',
} satisfies Record<Status, string>

const contactDragType = 'application/x-ability-contact'

export function Pipeline({ contacts, move }: { contacts: Contact[]; move: (id: string, status: Status) => void }) {
  const [error, setError] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const [dragged, setDragged] = useState<{ id: string; status: Status } | null>(null)
  const [target, setTarget] = useState<Status | null>(null)
  const ordered = findContacts(contacts, '', 'All', 'recent')

  function relocate(contact: Contact, status: Status, restoreFocus = false) {
    if (contact.status === status) return
    setError('')
    setAnnouncement('')
    try {
      move(contact.id, status)
      setAnnouncement(`${contact.name} moved to ${status}.`)
      if (restoreFocus) requestAnimationFrame(() => document.getElementById(`move-${contact.id}`)?.focus())
    } catch {
      setError(`Could not move ${contact.name}. Check browser storage and try again.`)
    }
  }

  function startDrag(event: DragEvent<HTMLElement>, contact: Contact) {
    event.dataTransfer.setData(contactDragType, contact.id)
    event.dataTransfer.effectAllowed = 'move'
    setDragged({ id: contact.id, status: contact.status })
  }

  function endDrag() {
    setDragged(null)
    setTarget(null)
  }

  function dragOver(event: DragEvent<HTMLElement>, status: Status) {
    if (!dragged || dragged.status === status || !event.dataTransfer.types.includes(contactDragType)) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setTarget(status)
  }

  function drop(event: DragEvent<HTMLElement>, status: Status) {
    if (!dragged || !event.dataTransfer.types.includes(contactDragType)) return
    event.preventDefault()
    const id = event.dataTransfer.getData(contactDragType)
    const contact = id === dragged.id ? contacts.find(item => item.id === id) : undefined
    endDrag()
    if (contact) relocate(contact, status)
  }

  return <>
    <div className={`${pageHeading} mb-6 pt-[9px] pb-px`}>
      <div>
        <Eyebrow>INTAKE WORKFLOW</Eyebrow>
        <h1 className={`${pageTitle} mt-[9px] mb-2`}>Pipeline</h1>
        <p className="text-[#465749]">Track each contact from inquiry through closure.</p>
      </div>
      <Link className={primaryButton} href="/contacts/new/"><Plus size={18} /> New contact</Link>
    </div>
    <div role="status" className="sr-only">{announcement}</div>
    {error && <ErrorBanner>{error}</ErrorBanner>}
    {!!contacts.length && <p className="-mt-2 mb-[13px] flex items-center gap-[5px] text-[13px] text-muted pointer-coarse:hidden"><GripVertical size={16} /> Drag a card to another column, or use its Move to menu.</p>}
    {!contacts.length && <div className={`${panel} mb-[15px]`}>
      <Empty title="The pipeline is empty" action={<Link href="/contacts/new/" className={secondaryButton}>Create the first contact</Link>}>New contacts appear here under their selected status.</Empty>
    </div>}
    <div role="group" aria-label="Contact pipeline" className="grid grid-cols-3 gap-[15px] max-mobile:grid-cols-1 max-mobile:gap-2.5">
      {statuses.map(status => {
        const items = ordered.filter(contact => contact.status === status)
        return <section
          className={`min-h-[157px] overflow-hidden rounded-[11px] border border-line border-t-[3px] bg-[#eff1eb] data-[drop-target=true]:bg-[#e3eddf] data-[drop-target=true]:outline-2 data-[drop-target=true]:outline-offset-[-2px] data-[drop-target=true]:outline-focus ${laneBorder[status]}`}
          aria-labelledby={`lane-${status}`} key={status}
          data-drop-target={target === status}
          onDragOver={event => dragOver(event, status)}
          onDragLeave={event => {
            if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
            setTarget(current => current === status ? null : current)
          }}
          onDrop={event => drop(event, status)}>
          <div className="px-[13px] pt-3.5 pb-[11px]">
            <h2 id={`lane-${status}`} className="flex items-center gap-[7px] font-[660]">
              <StatusBadge status={status} large /><span className="text-xs text-muted">{items.length}</span>
            </h2>
            <p className="mt-[5px] text-xs text-muted">{descriptions[status]}</p>
          </div>
          <div className="grid gap-2 px-[9px] pb-[9px]">
            {items.length ? items.map(contact => <article
              className="grid cursor-grab gap-[11px] rounded-lg border border-line bg-paper p-[11px] shadow-[0_1px_1px_#213b2810] data-[dragging=true]:cursor-grabbing data-[dragging=true]:opacity-[.48]"
              key={contact.id} draggable
              data-dragging={dragged?.id === contact.id} onDragStart={event => startDrag(event, contact)} onDragEnd={endDrag}>
              <div className="flex items-center gap-1.5">
                <GripVertical className="text-muted pointer-coarse:hidden" size={16} data-drag-handle aria-hidden="true" />
                <Link href={{ pathname: '/contacts/view/', query: { id: contact.id } }} draggable={false} className={`${identity} flex-1`}>
                  <Avatar contact={contact} />
                  <span className="min-w-0"><strong className={identityName}>{contact.name}</strong><small className={identityDetail}>{contact.practice}</small></span>
                  <ArrowUpRight size={16} className="ml-auto text-muted" />
                </Link>
              </div>
              <div className={selectWrap}>
                <select className={compactSelectField} id={`move-${contact.id}`} aria-label={`Move ${contact.name} to a different status`} value="" onChange={event => relocate(contact, event.target.value as Status, true)}>
                  <option value="" disabled>Move to…</option>{statuses.filter(next => next !== status).map(next => <option key={next}>{next}</option>)}
                </select>
                <ChevronDown className={selectChevron} size={15} />
              </div>
            </article>) : <p className="rounded-[7px] border border-dashed border-[#bac5b8] px-2 py-[19px] text-center text-xs text-muted">No {status.toLowerCase()} contacts.</p>}
          </div>
        </section>
      })}
    </div>
  </>
}
