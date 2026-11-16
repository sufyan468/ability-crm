import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { ChevronDown, Save } from 'lucide-react'
import { z } from 'zod'
import { BackLink, ErrorBanner } from '@/components/ui/primitives'
import {
  panel, pageHeading, pageTitle, primaryButton, secondaryButton, sectionDescription,
  sectionTitle, selectChevron, selectField, selectWrap, textField,
} from '@/components/ui/styles'
import { contactLimits, practiceAreas, statuses } from '@/constants/contacts'
import { contactFormSchema } from '@/schemas/contact'
import type { Contact, ContactFormValues } from '@/types/contact'
import { editContact, newContact } from '@/utils/contacts'

const blankFields: ContactFormValues = { name: '', email: '', phone: '', practice: 'Other', status: 'Lead', note: '' }
type FieldErrors = Partial<Record<keyof ContactFormValues, string[]>>

function Field({ label, id, error, children, optional = false }: { label: string; id: string; error?: string; children: ReactNode; optional?: boolean }) {
  return <div className="grid content-start gap-[5px]"><label className="text-[13px] font-[650]" htmlFor={id}>{label} {optional && <small className="ml-1 text-[11px] font-[450] text-muted">Optional</small>}</label>{children}
    {error && <span id={id + '-error'} className="text-xs text-error">{error}</span>}
  </div>
}

export function ContactForm({ contact, save }: { contact?: Contact; save: (contact: Contact) => void }) {
  const router = useRouter()
  const prefix = useId()
  const [fields, setFields] = useState<ContactFormValues>(() => contact
    ? { name: contact.name, email: contact.email, phone: contact.phone, practice: contact.practice, status: contact.status, note: '' }
    : { ...blankFields })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [saveError, setSaveError] = useState('')
  const back = contact ? { pathname: '/contacts/view/', query: { id: contact.id } } : '/'

  function change<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setFields(previous => ({ ...previous, [key]: value }))
    if (errors[key]) {
      const result = contactFormSchema.shape[key].safeParse(value)
      setErrors(previous => ({ ...previous, [key]: result.success ? undefined : result.error.issues.map(issue => issue.message) }))
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaveError('')
    const result = contactFormSchema.safeParse(fields)
    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors)
      const first = result.error.issues[0]?.path[0]
      if (typeof first === 'string') document.getElementById(prefix + first)?.focus()
      return
    }
    setErrors({})
    const { note, ...contactFields } = result.data
    try {
      const next = contact ? editContact(contact, contactFields) : newContact(contactFields, note)
      if (next !== contact) save(next)
      const query = new URLSearchParams({ id: next.id })
      router.replace(`/contacts/view/?${query}`)
    } catch {
      setSaveError('The contact could not be saved. Your entries are still here; check browser storage and try again.')
    }
  }

  function fieldError(key: keyof ContactFormValues) {
    return {
      'aria-invalid': !!errors[key]?.length,
      'aria-describedby': errors[key]?.length ? prefix + key + '-error' : undefined,
    }
  }

  function input(key: 'name' | 'email' | 'phone', label: string, type: string, placeholder: string) {
    const id = prefix + key
    return <Field id={id} label={label} optional={key === 'phone'} error={errors[key]?.[0]}>
      <input className={textField} id={id} type={type} value={fields[key]} onChange={event => change(key, event.target.value)} required={key !== 'phone'} maxLength={contactLimits[key]}
        autoComplete={key === 'phone' ? 'tel' : key} placeholder={placeholder} {...fieldError(key)} />
    </Field>
  }

  return <>
    <BackLink href={back}>{contact ? 'Back to contact' : 'Back to contacts'}</BackLink>
    <div className={`${pageHeading} mb-[21px] pt-0.5 pb-px`}><div><h1 className={`${pageTitle} mt-[9px] mb-2`}>{contact ? 'Edit contact' : 'New contact'}</h1><p className="text-[#465749]">{contact ? `Update the intake record for ${contact.name}.` : 'Record a new inquiry for the intake team.'}</p></div></div>
    <form className={`${panel} max-w-[730px]`} noValidate onSubmit={submit}>
      <div className="p-5 max-mobile:p-[15px]">
        <div className="mb-[18px]">
          <h2 className={sectionTitle}>Contact information</h2>
          <p className={sectionDescription}>Full name and email are required.</p>
        </div>
        {saveError && <ErrorBanner>{saveError}</ErrorBanner>}
        <div className="grid grid-cols-2 gap-4 max-mobile:grid-cols-1">
          {input('name', 'Full name', 'text', 'e.g. Jordan Lee')}
          {input('email', 'Email address', 'email', 'e.g. jordan@example.com')}
          {input('phone', 'Phone number', 'tel', 'e.g. +1 (212) 555-0100')}
          <Field label="Practice area" id={prefix + 'practice'} error={errors.practice?.[0]}>
            <div className={selectWrap}>
              <select className={selectField} id={prefix + 'practice'} value={fields.practice} onChange={event => change('practice', event.target.value as ContactFormValues['practice'])} {...fieldError('practice')}>
                {practiceAreas.map(area => <option key={area}>{area}</option>)}
              </select>
              <ChevronDown className={selectChevron} size={16} />
            </div>
          </Field>
          <Field label="Status" id={prefix + 'status'} error={errors.status?.[0]}>
            <div className={selectWrap}>
              <select className={selectField} id={prefix + 'status'} value={fields.status} onChange={event => change('status', event.target.value as ContactFormValues['status'])} {...fieldError('status')}>
                {statuses.map(status => <option key={status}>{status}</option>)}
              </select>
              <ChevronDown className={selectChevron} size={16} />
            </div>
          </Field>
          {!contact && <div className="col-span-full">
            <Field label="Intake note" id={prefix + 'note'} error={errors.note?.[0]} optional>
              <textarea className={`${textField} block resize-y`} id={prefix + 'note'} value={fields.note} onChange={event => change('note', event.target.value)} rows={4} maxLength={contactLimits.note}
                placeholder="How they reached us, what they need, or next steps…" {...fieldError('note')} />
            </Field>
          </div>}
        </div>
      </div>
      <footer className="flex justify-end gap-2 border-t border-line px-5 py-[13px] max-mobile:px-[15px] max-mobile:py-3"><Link className={secondaryButton} href={back}>Cancel</Link><button className={primaryButton} type="submit"><Save size={16} />{contact ? 'Save changes' : 'Create contact'}</button></footer>
    </form>
  </>
}
