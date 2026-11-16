import { AlertCircle, ArrowLeft, BookOpen } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'
import type { ReactNode } from 'react'
import { panel, statusColors } from '@/components/ui/styles'
import type { Contact, Status } from '@/types/contact'

const avatarColors = [
  'bg-[#ede7f3] text-[#654873]',
  'bg-[#f4eadb] text-[#7a522b]',
  'bg-[#e4eddf] text-[#385845]',
  'bg-[#e4edf2] text-[#3e6272]',
  'bg-[#f5e6e4] text-[#824c47]',
]

export function Avatar({ contact, large = false }: { contact: Contact; large?: boolean }) {
  const initials = contact.name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => Array.from(part)[0]).join('').toUpperCase()
  const color = Array.from(contact.name).reduce((sum, char) => sum + (char.codePointAt(0) ?? 0), 0) % avatarColors.length
  const size = large ? 'size-[62px] text-lg shadow-[0_0_0_1px_#0001]' : 'size-9 text-[11px]'
  return <span aria-hidden="true" className={`grid flex-none place-items-center rounded-full font-[750] tracking-[.015em] ${avatarColors[color]} ${size}`}>{initials}</span>
}

export function StatusBadge({ status, large = false }: { status: Status; large?: boolean }) {
  const size = large ? 'px-[9px] py-1 text-[13px]' : 'px-2 py-[3px] text-[11px]'
  return <span className={`inline-flex min-h-[22px] items-center gap-[5px] rounded-full font-[650] whitespace-nowrap ${statusColors[status]} ${size}`}>
    <i className="size-[5px] rounded-full bg-current" />{status}
  </span>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-[7px] text-[10px] font-[750] tracking-[.15em] text-[#465c48]">
    <span className="size-1.5 rounded-full bg-[#658266]" />{children}
  </div>
}

export function Empty({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return <div className="grid justify-items-center gap-1.5 px-4 py-[30px] text-center">
    <span className="mb-[3px] grid size-[39px] place-items-center rounded-[9px] bg-[#edf1e8] text-[#476550]"><BookOpen size={21} /></span>
    <h3 className="text-[15px] font-bold">{title}</h3>
    <p className="text-[13px] text-muted">{children}</p>
    {action && <div className="mt-1.5">{action}</div>}
  </div>
}

export function ErrorBanner({ children, className = 'mb-[13px]' }: { children: ReactNode; className?: string }) {
  return <div className={`flex items-start gap-[9px] rounded-lg border border-[#ebcfc6] bg-[#fbefeb] px-3.5 py-3 text-[13px] text-error [&_p]:mt-1 [&_p]:mb-[9px] ${className}`} role="alert">
    <AlertCircle size={19} /><div>{children}</div>
  </div>
}

export function Loading() {
  const row = 'h-11 rounded-md bg-[#edf0e7] motion-safe:animate-pulse'
  return <div className={`${panel} grid gap-[11px] p-[18px]`} role="status">
    <span className="sr-only">Loading workspace</span>
    <div className={row} /><div className={`${row} w-[86%]`} /><div className={`${row} w-[72%]`} />
  </div>
}

export function BackLink({ href = '/', children = 'Back to contacts' }: { href?: LinkProps['href']; children?: ReactNode }) {
  return <Link className="mb-[7px] inline-flex min-h-[34px] items-center gap-1.5 text-[13px] font-[650] text-[#3e5c4b] hover:underline hover:underline-offset-4" href={href}>
    <ArrowLeft size={16} />{children}
  </Link>
}
