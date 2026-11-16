import { z } from 'zod'
import { contactLimits, practiceAreas, statuses } from '@/constants/contacts'

const statusSchema = z.enum(statuses, { error: 'Choose a status.' })
const practiceAreaSchema = z.enum(practiceAreas, { error: 'Choose a practice area.' })
const savedDateSchema = z.string().refine(value => Number.isFinite(Date.parse(value)))

// Stored records keep the original field format, including empty phone numbers.
export const contactFieldsSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  practice: practiceAreaSchema,
  status: statusSchema,
})

const noteTextSchema = z.string().trim().max(contactLimits.note, {
  error: `Keep the note to ${contactLimits.note.toLocaleString('en-US')} characters or fewer.`,
})
export const intakeNoteSchema = noteTextSchema.min(1, { error: 'Write a note before adding it.' })

export const contactFormSchema = contactFieldsSchema.extend({
  name: z.string().trim()
    .min(1, { error: 'Enter the contact’s full name.' })
    .max(contactLimits.name, { error: 'Keep the name to 120 characters or fewer.' }),
  email: z.string().trim()
    .min(1, { error: 'Enter an email address.' })
    .max(contactLimits.email, { error: 'Keep the email address to 254 characters or fewer.' })
    .pipe(z.email({ error: 'Enter an email address like name@example.com.' })),
  phone: z.string().trim()
    .max(contactLimits.phone, { error: 'Keep the phone number to 40 characters or fewer.' })
    .refine(value => value === '' ||
      (/^\+?[\d ().-]+$/.test(value) && /^\d{7,15}$/.test(value.replace(/\D/g, ''))), {
      error: 'Enter a phone number with 7 to 15 digits.',
    }),
  note: noteTextSchema,
})

const noteSchema = z.object({
  id: z.string(),
  body: z.string(),
  at: savedDateSchema,
})

const activityFields = { id: z.string(), at: savedDateSchema }
const activitySchema = z.discriminatedUnion('kind', [
  z.object({ ...activityFields, kind: z.enum(['created', 'edited', 'note']) }),
  z.object({ ...activityFields, kind: z.literal('moved'), from: statusSchema, to: statusSchema }),
])

export const contactSchema = contactFieldsSchema.extend({
  id: z.string(),
  createdAt: savedDateSchema,
  updatedAt: savedDateSchema,
  notes: z.array(noteSchema),
  activity: z.array(activitySchema),
})

export const storedContactsSchema = z.array(contactSchema)
