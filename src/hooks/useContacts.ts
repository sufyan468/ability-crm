import { useEffect, useState } from 'react'
import type { Contact } from '@/types/contact'
import { loadContacts, persistContacts } from '@/utils/contactStorage'

type LoadState =
  | { phase: 'loading' }
  | { phase: 'ready'; contacts: Contact[] }
  | { phase: 'error'; message: string }

export function useContacts() {
  const [state, setState] = useState<LoadState>({ phase: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (state.phase !== 'loading') return
    try {
      setState({ phase: 'ready', contacts: loadContacts() })
    } catch {
      setState({ phase: 'error', message: 'Your browser could not read the workspace. Check that site storage is available, then try again.' })
    }
  }, [attempt, state.phase])

  function retry() {
    setState({ phase: 'loading' })
    setAttempt(value => value + 1)
  }

  function save(contact: Contact) {
    if (state.phase !== 'ready') throw new Error('The workspace is not ready.')
    const exists = state.contacts.some(item => item.id === contact.id)
    const contacts = exists
      ? state.contacts.map(item => item.id === contact.id ? contact : item)
      : [contact, ...state.contacts]
    // Commit the UI update only after persistence succeeds.
    persistContacts(contacts)
    setState({ phase: 'ready', contacts })
  }

  return { state, retry, save }
}
