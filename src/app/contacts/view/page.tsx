import { Suspense } from 'react'
import { ContactRecord } from '@/components/contacts/ContactRecord'
import { Loading } from '@/components/ui/primitives'

export default function ContactPage() {
  return <Suspense fallback={<Loading />}><ContactRecord /></Suspense>
}
