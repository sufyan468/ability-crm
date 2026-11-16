import type { z } from 'zod'
import type { sortOptions } from '@/constants/contacts'
import type { contactFieldsSchema, contactFormSchema, contactSchema } from '@/schemas/contact'

export type ContactFields = z.infer<typeof contactFieldsSchema>
export type ContactFormValues = z.input<typeof contactFormSchema>
export type Contact = z.infer<typeof contactSchema>
export type Status = ContactFields['status']
export type PracticeArea = ContactFields['practice']
export type Activity = Contact['activity'][number]
export type Sort = (typeof sortOptions)[number]['value']
