import { Suspense } from 'react'
import { ContactRecord } from '@/components/contacts/ContactRecord'
import { Loading } from '@/components/ui/primitives'

export default function EditContactPage() {
  return <Suspense fallback={<Loading />}><ContactRecord editing /></Suspense>
}
