'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { Shell } from '@/components/layout/Shell'
import { ErrorBanner, Loading } from '@/components/ui/primitives'
import { secondaryButton } from '@/components/ui/styles'
import { useContacts } from '@/hooks/useContacts'
import type { Contact } from '@/types/contact'

type WorkspaceState = {
  contacts: Contact[]
  save: (contact: Contact) => void
}

const WorkspaceContext = createContext<WorkspaceState | null>(null)

export function Workspace({ children }: { children: ReactNode }) {
  const { state, retry, save } = useContacts()

  return <Shell>
    {state.phase === 'loading' && <Loading />}
    {state.phase === 'error' && <ErrorBanner>
      <strong>Workspace unavailable</strong>
      <p>{state.message}</p>
      <button className={secondaryButton} onClick={retry}>Try again</button>
    </ErrorBanner>}
    {state.phase === 'ready' &&
      <WorkspaceContext.Provider value={{ contacts: state.contacts, save }}>
        {children}
      </WorkspaceContext.Provider>}
  </Shell>
}

export function useWorkspace() {
  const workspace = useContext(WorkspaceContext)
  if (!workspace) throw new Error('CRM pages must be rendered inside the workspace.')
  return workspace
}
