'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ContactDetails } from '@/components/contacts/ContactDetails'
import { ContactForm } from '@/components/contacts/ContactForm'
import { useWorkspace } from '@/components/layout/Workspace'
import { BackLink, Empty } from '@/components/ui/primitives'
import { pageTitle, panel, secondaryButton } from '@/components/ui/styles'

export function ContactRecord({ editing = false }: { editing?: boolean }) {
  const id = useSearchParams().get('id')
  const { contacts, save } = useWorkspace()
  const contact = contacts.find(item => item.id === id)

  if (!contact) {
    return <>
      <BackLink />
      <h1 className={`${pageTitle} mt-2 mb-5`}>Contact unavailable</h1>
      <div className={panel}>
        <Empty title="This link couldn’t be opened" action={<Link href="/" className={secondaryButton}>Open directory</Link>}>
          The record may belong to a different browser workspace, or the link may be incorrect.
        </Empty>
      </div>
    </>
  }

  return editing
    ? <ContactForm key={contact.id} contact={contact} save={save} />
    : <ContactDetails key={contact.id} contact={contact} save={save} />
}
