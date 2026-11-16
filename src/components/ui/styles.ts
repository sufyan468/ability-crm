import type { Status } from '@/types/contact'

const button = 'inline-flex min-h-[41px] items-center justify-center gap-[7px] whitespace-nowrap rounded-[7px] border px-[13px] py-2 text-[13px]/[1.3] font-[650]'

export const primaryButton = `${button} border-forest bg-forest text-[#fcfff7] hover:border-[#345a49] hover:bg-[#345a49]`
export const secondaryButton = `${button} border-[#dce1d8] bg-paper text-[#314c3d] hover:border-[#8ea692] hover:bg-[#f2f5ee]`
export const panel = 'rounded-[11px] border border-line bg-paper'
export const pageTitle = 'font-serif text-[clamp(38px,4vw,56px)] leading-[1.03] font-normal tracking-[-.047em] wrap-anywhere'
export const sectionTitle = 'text-[19px]/[1.23] font-[660] tracking-[-.024em]'
export const sectionDescription = 'mt-1 text-[13px] text-muted'
export const pageHeading = 'flex items-end justify-between gap-3 max-narrow:flex-wrap'
export const iconButton = 'inline-grid size-8 shrink-0 place-items-center rounded-md text-[#506258] hover:bg-[#ecf0e8] hover:text-forest'
export const identity = 'group flex w-fit max-w-full min-w-0 items-center gap-2.5 rounded-md text-ink'
export const identityName = 'block text-[13px] font-[670] wrap-anywhere group-hover:underline group-hover:underline-offset-[3px]'
export const identityDetail = 'mt-0.5 block text-[11px] text-muted wrap-anywhere'
export const selectWrap = 'relative flex items-center'
export const selectChevron = 'pointer-events-none absolute right-[9px] text-[#59675d]'
const select = 'w-full appearance-none rounded-[7px] border border-field bg-white pr-[29px] pl-2.5 text-[13px] aria-invalid:border-[#a6493c] max-mobile:text-base'
export const selectField = `${select} min-h-10 py-2`
export const compactSelectField = `${select} min-h-9 py-1.5`
export const textField = 'min-h-10 w-full rounded-[7px] border border-field bg-white px-2.5 py-[9px] text-sm placeholder:text-[#68736a] aria-invalid:border-[#a6493c] max-mobile:text-base'

export const statusColors = {
  Lead: 'bg-[#f8eed8] text-[#775213]',
  Active: 'bg-[#e7f0e4] text-[#3b634e]',
  Closed: 'bg-[#eceef2] text-[#535b6d]',
} satisfies Record<Status, string>
