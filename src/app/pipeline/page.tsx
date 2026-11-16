'use client'

import { Pipeline } from '@/components/contacts/Pipeline'
import { useWorkspace } from '@/components/layout/Workspace'
import type { Status } from '@/types/contact'
import { editContact } from '@/utils/contacts'

export default function PipelinePage() {
  const { contacts, save } = useWorkspace()

  function moveContact(id: string, status: Status) {
    const contact = contacts.find(item => item.id === id)
    if (!contact) throw new Error('Contact unavailable')
    save(editContact(contact, { ...contact, status }))
  }

  return <Pipeline contacts={contacts} move={moveContact} />
}
