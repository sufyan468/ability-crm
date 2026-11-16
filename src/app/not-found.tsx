import Link from 'next/link'
import { Empty } from '@/components/ui/primitives'
import { pageTitle, panel, secondaryButton } from '@/components/ui/styles'

export default function NotFound() {
  return <>
    <h1 className={`${pageTitle} mt-2 mb-5`}>Page unavailable</h1>
    <div className={panel}>
      <Empty title="This link couldn’t be opened" action={<Link href="/" className={secondaryButton}>Open directory</Link>}>
        Check the address or return to the contact directory.
      </Empty>
    </div>
  </>
}
