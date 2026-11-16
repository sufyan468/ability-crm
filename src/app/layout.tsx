import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Workspace } from '@/components/layout/Workspace'
import '@/styles/globals.css'

export const metadata: Metadata = {
  description: 'Ability CRM is a client intake workspace for a fictional law firm.',
  icons: { icon: '/ability.svg' },
}

export const viewport: Viewport = { themeColor: '#152e28' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body className="min-w-[280px] bg-canvas font-sans text-sm/normal text-ink [font-synthesis:none] [--focus-ring:var(--color-focus)] [&_svg]:shrink-0 [&_:is(a,button,input,select,textarea):focus-visible]:outline-2 [&_:is(a,button,input,select,textarea):focus-visible]:outline-offset-[3px] [&_:is(a,button,input,select,textarea):focus-visible]:outline-(--focus-ring)"><Workspace>{children}</Workspace></body></html>
}
