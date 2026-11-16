'use client'

import { ContactForm } from '@/components/contacts/ContactForm'
import { useWorkspace } from '@/components/layout/Workspace'

export default function NewContactPage() {
  const { save } = useWorkspace()
  return <ContactForm save={save} />
}
