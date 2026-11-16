import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { ArrowRight, Clock3, FilePenLine, Mail, MessageSquarePlus, Pencil, Phone, Plus } from 'lucide-react'
import { Avatar, BackLink, Empty, ErrorBanner, Eyebrow, StatusBadge } from '@/components/ui/primitives'
import {
  panel, primaryButton, secondaryButton, sectionDescription, sectionTitle, textField,
} from '@/components/ui/styles'
import { contactLimits } from '@/constants/contacts'
import { intakeNoteSchema } from '@/schemas/contact'
import type { Activity, Contact } from '@/types/contact'
import { addNote } from '@/utils/contacts'
import { formatDate, formatTime } from '@/utils/formatDate'

const timestamp = 'mb-[3px] block text-[11px] text-muted'
const recordPanel = `${panel} p-5 max-mobile:p-[15px]`
const recordField = 'grid grid-cols-[100px_minmax(0,1fr)] gap-2 border-t border-line py-2 text-[13px]'
const recordLabel = 'flex items-center gap-1.5 text-muted'

const eventLabels = { created: 'Contact created', edited: 'Contact details updated', note: 'Note added' }
const eventIcons = { created: Plus, edited: FilePenLine, note: MessageSquarePlus, moved: ArrowRight }
function ActivityItem({ event }: { event: Activity }) {
  const Icon = eventIcons[event.kind]
  const date = new Date(event.at)
  return <li className="relative flex items-start gap-2 pb-[15px] text-[13px] last:pb-0 not-last:before:absolute not-last:before:top-[27px] not-last:before:bottom-0 not-last:before:left-[13px] not-last:before:w-px not-last:before:bg-[#dce3d8]">
    <span className="grid size-[27px] flex-none place-items-center rounded-full bg-[#edf1e8] text-[#476550]"><Icon size={15} /></span>
    <div>
      <strong className="font-[650]">{event.kind === 'moved' ? `Moved from ${event.from} to ${event.to}` : eventLabels[event.kind]}</strong>
      <time className={timestamp} dateTime={event.at}>{formatDate(date)} · {formatTime(date)}</time>
    </div>
  </li>
}

export function ContactDetails({ contact, save }: { contact: Contact; save: (contact: Contact) => void }) {
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [announcement, setAnnouncement] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAnnouncement('')
    const result = intakeNoteSchema.safeParse(note)
    if (!result.success) {
      setError(result.error.issues[0].message)
      document.getElementById('note')?.focus()
      return
    }
    try {
      save(addNote(contact, result.data))
      setNote('')
      setError('')
      setAnnouncement('Note added.')
    } catch {
      setError('Could not save the note. Check browser storage and try again.')
    }
  }

  return <>
    <BackLink />
    <section className="mt-1.5 mb-[17px] flex items-center gap-[15px] rounded-[11px] border border-[#dce4d6] bg-[#eaf0e3] p-5 max-mobile:flex-wrap max-mobile:p-[15px]" aria-labelledby="record-title">
      <Avatar contact={contact} large />
      <div className="min-w-0 flex-1">
        <Eyebrow>INTAKE RECORD</Eyebrow>
        <h1 id="record-title" className="my-1.5 font-serif text-[clamp(32px,4vw,48px)] leading-[1.03] tracking-[-.047em] wrap-anywhere">{contact.name}</h1>
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted"><StatusBadge status={contact.status} /><span>{contact.practice}</span></div>
      </div>
      <Link href={{ pathname: '/contacts/edit/', query: { id: contact.id } }} className={`${secondaryButton} max-mobile:ml-auto`}><Pencil size={16} /> Edit contact</Link>
    </section>
    <div className="grid grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] items-start gap-[15px] max-mobile:grid-cols-1">
      <div className="grid gap-[15px]">
        <section className={recordPanel} aria-labelledby="info-title">
          <h2 id="info-title" className={sectionTitle}>Contact information</h2>
          <dl className="mt-3.5">
            <div className={recordField}>
              <dt className={recordLabel}><Mail size={15} /> Email</dt>
              <dd className="wrap-anywhere"><a className="underline underline-offset-[3px]" href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            </div>
            <div className={recordField}>
              <dt className={recordLabel}><Phone size={15} /> Phone</dt>
              <dd className="wrap-anywhere">{contact.phone ? <a className="underline underline-offset-[3px]" href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a> : 'Not provided'}</dd>
            </div>
            <div className={recordField}>
              <dt className={recordLabel}><Clock3 size={15} /> Added</dt>
              <dd><time dateTime={contact.createdAt}>{formatDate(new Date(contact.createdAt))}</time></dd>
            </div>
          </dl>
        </section>
        <section className={recordPanel} aria-labelledby="notes-title">
          <h2 id="notes-title" className={sectionTitle}>Intake notes</h2>
          <p className={sectionDescription}>Keep consultation details and follow-up steps together.</p>
          <form className="mt-[13px] grid justify-items-end gap-2" onSubmit={submit}>
            <label className="sr-only" htmlFor="note">Write an intake note</label>
            <textarea className={`${textField} block resize-y`} id="note" rows={3} maxLength={contactLimits.note} placeholder="Write an intake note…" value={note}
              onChange={event => { setNote(event.target.value); setError('') }} aria-invalid={!!error} aria-describedby={error ? 'note-error' : undefined} />
            {error && <div id="note-error" className="justify-self-stretch"><ErrorBanner className="m-0">{error}</ErrorBanner></div>}
            <button className={primaryButton} type="submit"><Plus size={16} /> Add note</button>
          </form>
          <span className="sr-only" role="status">{announcement}</span>
          {contact.notes.length ? <ul className="mt-[15px]" role="list">{contact.notes.map(item => <li className="border-t border-line pt-[11px] pb-1" key={item.id}>
            <time className={timestamp} dateTime={item.at}>{formatDate(new Date(item.at))} · {formatTime(new Date(item.at))}</time>
            <p className="wrap-anywhere whitespace-pre-wrap">{item.body}</p>
          </li>)}</ul> : <Empty title="No notes yet">Add a note to capture the next step.</Empty>}
        </section>
      </div>
      <section className={recordPanel} aria-labelledby="activity-title">
        <h2 id="activity-title" className={sectionTitle}>Activity timeline</h2>
        <p className={sectionDescription}>Latest changes to this record.</p>
        {contact.activity.length ? <ol className="mt-[15px]" role="list">{contact.activity.map(event => <ActivityItem key={event.id} event={event} />)}</ol>
          : <Empty title="No activity yet">Changes to this record will appear here.</Empty>}
      </section>
    </div>
  </>
}
