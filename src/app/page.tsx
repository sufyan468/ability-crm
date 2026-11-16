'use client'

import { Directory } from '@/components/contacts/Directory'
import { useWorkspace } from '@/components/layout/Workspace'

export default function ContactsPage() {
  const { contacts } = useWorkspace()
  return <Directory contacts={contacts} />
}
