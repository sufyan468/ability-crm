import Link from 'next/link'
import { useState } from 'react'
import { ArrowDownUp, ArrowUpRight, CheckCircle2, ChevronDown, CircleDot, FolderCheck, Plus, Search, UsersRound, X } from 'lucide-react'
import { Avatar, Empty, Eyebrow, StatusBadge } from '@/components/ui/primitives'
import {
  iconButton, identity, identityDetail, identityName, panel, pageTitle, primaryButton,
  secondaryButton, sectionTitle, selectChevron, selectField, selectWrap, statusColors,
} from '@/components/ui/styles'
import { sortOptions, statuses } from '@/constants/contacts'
import type { Contact, Sort, Status } from '@/types/contact'
import { findContacts } from '@/utils/contacts'
import { formatDate } from '@/utils/formatDate'

const metrics = [
  { label: 'Total contacts', status: 'All', icon: UsersRound },
  { label: 'Leads', status: 'Lead', icon: CircleDot },
  { label: 'Active', status: 'Active', icon: CheckCircle2 },
  { label: 'Closed', status: 'Closed', icon: FolderCheck },
] as const

function LedgerArt() {
  return <svg className="pointer-events-none absolute right-0 -bottom-[13%] h-[116%] w-auto [mask-image:linear-gradient(90deg,transparent,black_27%)] max-mobile:right-[-110px] max-mobile:opacity-[.53] max-mobile:[mask-image:linear-gradient(90deg,transparent_23%,black_78%)]" viewBox="0 0 415 210" fill="none" aria-hidden="true">
    <defs><pattern id="ledger-grid" width="23" height="23" patternUnits="userSpaceOnUse"><path d="M23 0H0V23" stroke="#66795d" strokeOpacity=".15" /></pattern></defs>
    <path d="M20 0h395v210H20z" fill="url(#ledger-grid)" />
    <g stroke="#6f8064" strokeWidth="1" opacity=".62">
      <path d="M83 210V117a88 88 0 0 1 176 0v93M96 210V117a75 75 0 0 1 150 0v93M109 210v-93a62 62 0 0 1 124 0v93M122 210v-93a49 49 0 0 1 98 0v93M135 210v-93a36 36 0 0 1 72 0v93M148 210v-93a23 23 0 1 1 46 0v93" />
      <path d="M252 210v-69a61 61 0 0 1 122 0v69m-109 0v-69a48 48 0 0 1 96 0v69m-83 0v-69a35 35 0 0 1 70 0v69m-57 0v-69a22 22 0 0 1 44 0v69" />
      <path d="M171 3v207M313 64v146M70 118h202M245 141h150" strokeDasharray="3 4" />
      <circle cx="171" cy="117" r="3.5" fill="#819075" /><circle cx="313" cy="141" r="3.5" fill="#819075" />
      <path d="M341 41v22m-11-11h22M60 63v14m-7-7h14" />
    </g>
  </svg>
}

export function Directory({ contacts }: { contacts: Contact[] }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Status | 'All'>('All')
  const [sort, setSort] = useState<Sort>('recent')
  const results = findContacts(contacts, query, status, sort)

  function clearFilters() { setQuery(''); setStatus('All') }

  const cell = 'px-3 py-2 max-mobile:px-1.5'
  const firstCell = 'pl-4 max-mobile:w-[72%] max-mobile:pl-[11px]'
  const lastCell = 'hidden w-[6%] min-w-[38px] pr-2.5 pl-0 text-right min-mobile:table-cell'

  return <>
    <section className="relative grid min-h-[191px] items-center overflow-hidden rounded-[13px] border border-[#dce3d3] bg-[linear-gradient(110deg,#eef1e5_15%,#e0e8d6_100%)] text-[#233b2d] max-mobile:min-h-[157px]" aria-labelledby="page-title">
      <LedgerArt />
      <div className="relative px-8 py-[27px] max-mobile:px-[17px] max-mobile:py-5">
        <Eyebrow>INTAKE DIRECTORY</Eyebrow>
        <h1 id="page-title" className={`${pageTitle} mt-2 mb-[9px]`}>Contacts</h1>
        <p className="text-[#465749] max-mobile:max-w-[255px]">From first inquiry to closed file, keep every contact in view.</p>
      </div>
    </section>
    <div className="mt-4 grid grid-cols-4 gap-[13px] max-mobile:mt-[9px] max-mobile:grid-cols-2 max-mobile:gap-2" aria-label="Contact totals">
      {metrics.map(({ label, status: filter, icon: Icon }) => <button type="button" key={filter}
        className="flex min-h-[77px] min-w-0 items-center gap-3 rounded-[10px] border border-line bg-paper px-[15px] py-[13px] text-left hover:border-[#9eb2a3] aria-pressed:border-[#8ea692] aria-pressed:shadow-[inset_0_-2px_#d8e4d6] max-compact:gap-2 max-compact:px-2.5 max-mobile:min-h-[61px] max-mobile:py-[9px]"
        aria-pressed={status === filter} onClick={() => setStatus(filter)}>
        <span className={`grid size-[38px] flex-none place-items-center rounded-[9px] max-compact:size-8 ${filter === 'All' ? 'bg-[#ecf0e8] text-[#315845]' : statusColors[filter]}`}>
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <span className="grid gap-0.5">
          <span className="text-xs font-[550] text-muted">{label}</span>
          <strong className="text-[23px]/[1.03] font-[650] tracking-[-.03em] tabular-nums max-mobile:text-[21px]">
            {filter === 'All' ? contacts.length : contacts.filter(contact => contact.status === filter).length}
          </strong>
        </span>
      </button>)}
    </div>
    <section className="mt-[29px] max-mobile:mt-[21px]" aria-labelledby="directory-title">
      <div className="mb-3.5 flex items-end justify-between gap-3 max-mobile:items-center">
        <div>
          <h2 id="directory-title" className={`${sectionTitle} max-mobile:text-[17px]`}>Contact directory</h2>
          <p className="mt-1 text-[13px] text-muted max-mobile:text-xs max-narrow:hidden">Search and manage your intake records.</p>
        </div>
        <Link className={primaryButton} href="/contacts/new/"><Plus size={18} /> New contact</Link>
      </div>
      <div className={panel}>
        <div className="flex justify-between gap-3 border-b border-line px-3.5 py-3 max-mobile:flex-col max-mobile:gap-2 max-mobile:p-2.5">
          <div className="flex w-[min(100%,315px)] min-w-0 items-center gap-2 rounded-[7px] border border-field bg-white px-2.5 text-[#536459] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus max-mobile:w-full">
            <Search size={18} />
            <input className="min-h-[38px] w-full min-w-0 bg-transparent text-[13px] placeholder:text-[#68736a] focus-visible:outline-none! max-mobile:text-base [&::-webkit-search-cancel-button]:hidden"
              type="search" aria-label="Search contacts" placeholder="Search contacts…" value={query} onChange={event => setQuery(event.target.value)} />
            {query && <button type="button" className={iconButton} onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
          </div>
          <div className="flex gap-2">
            <div className={`${selectWrap} max-mobile:min-w-0 max-mobile:flex-1`}>
              <select className={`${selectField} max-mobile:text-ellipsis`} aria-label="Filter by status" value={status} onChange={event => setStatus(event.target.value as Status | 'All')}>
                <option value="All">All statuses</option>
                {statuses.map(item => <option key={item}>{item}</option>)}
              </select>
              <ChevronDown className={selectChevron} size={15} />
            </div>
            <div className={`${selectWrap} max-mobile:min-w-0 max-mobile:flex-[1.15]`}>
              <ArrowDownUp className="pointer-events-none absolute left-[9px] text-[#59675d] max-mobile:hidden" size={15} />
              <select className={`${selectField} min-mobile:w-[190px] min-mobile:pl-[30px] max-mobile:text-ellipsis`} aria-label="Sort contacts" value={sort} onChange={event => setSort(event.target.value as Sort)}>
                {sortOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
              </select>
              <ChevronDown className={selectChevron} size={15} />
            </div>
          </div>
        </div>
        {results.length ? <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-[#f3f4ee] text-[11px] font-bold tracking-[.035em] text-[#4e5e53]">
            <tr>
              <th className={`${cell} ${firstCell} w-[36%]`} scope="col">Name</th>
              <th className={`${cell} w-[22%] max-mobile:hidden`} scope="col">Practice area</th>
              <th className={`${cell} w-[16%] max-mobile:w-[28%]`} scope="col">Status</th>
              <th className={`${cell} w-[20%] max-mobile:hidden`} scope="col">Last updated</th>
              <th className={`${lastCell} py-2`} scope="col"><span className="sr-only">Open record</span></th>
            </tr>
          </thead>
          <tbody>{results.map(contact => <tr key={contact.id} className="text-[13px] text-[#4c5950] [&>td]:h-[62px] [&>td]:border-t [&>td]:border-[#ebede5] [&>td]:wrap-anywhere hover:[&>td]:bg-[#fafbf6]">
            <td className={`${cell} ${firstCell}`}>
              <Link className={identity} href={{ pathname: '/contacts/view/', query: { id: contact.id } }}>
                <Avatar contact={contact} />
                <span className="min-w-0"><strong className={identityName}>{contact.name}</strong><small className={identityDetail}>{contact.email}</small></span>
              </Link>
            </td>
            <td className={`${cell} max-mobile:hidden`}>{contact.practice}</td>
            <td className={cell}><StatusBadge status={contact.status} /></td>
            <td className={`${cell} max-mobile:hidden`}><time dateTime={contact.updatedAt}>{formatDate(new Date(contact.updatedAt))}</time></td>
            <td className={lastCell}><Link className={iconButton} href={{ pathname: '/contacts/view/', query: { id: contact.id } }} aria-label={`Open ${contact.name}`}><ArrowUpRight size={17} /></Link></td>
          </tr>)}</tbody>
        </table> : contacts.length ? <Empty title="No matching contacts" action={<button className={secondaryButton} onClick={clearFilters}>Clear filters</button>}>Try another search or choose a different status.</Empty> :
          <Empty title="No contacts yet" action={<Link className={secondaryButton} href="/contacts/new/">Create the first contact</Link>}>Add a contact when a new inquiry comes in.</Empty>}
        <footer className="border-t border-line px-4 py-[11px] text-xs text-muted" role="status">Showing {results.length} of {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}</footer>
      </div>
    </section>
  </>
}
