import type { Contact, ContactFields, Sort, Status } from '@/types/contact'

export function newContact(fields: ContactFields, note = ''): Contact {
  const at = new Date().toISOString()
  const contact: Contact = {
    ...fields, id: crypto.randomUUID(), createdAt: at, updatedAt: at, notes: [],
    activity: [{ id: crypto.randomUUID(), at, kind: 'created' }],
  }
  return note ? addNote(contact, note, at) : contact
}

export function editContact(contact: Contact, fields: ContactFields): Contact {
  const at = new Date().toISOString()
  const { name, email, phone, practice, status } = contact
  const edited = name !== fields.name || email !== fields.email || phone !== fields.phone || practice !== fields.practice
  if (!edited && status === fields.status) return contact
  const activity = [...contact.activity]
  if (edited) activity.unshift({ id: crypto.randomUUID(), at, kind: 'edited' })
  if (status !== fields.status) activity.unshift({ id: crypto.randomUUID(), at, kind: 'moved', from: status, to: fields.status })
  return { ...contact, ...fields, updatedAt: at, activity }
}

export function addNote(contact: Contact, body: string, at = new Date().toISOString()): Contact {
  return {
    ...contact, updatedAt: at,
    notes: [{ id: crypto.randomUUID(), body, at }, ...contact.notes],
    activity: [{ id: crypto.randomUUID(), at, kind: 'note' }, ...contact.activity],
  }
}

export function findContacts(contacts: Contact[], query: string, status: Status | 'All', sort: Sort) {
  const terms = query.trim().toLowerCase().split(/\s+/)
  const matches = contacts.filter(contact => {
    const haystack = [contact.name, contact.email, contact.phone, contact.practice].join(' ').toLowerCase()
    return (status === 'All' || contact.status === status) && terms.every(term => haystack.includes(term))
  })
  return matches.sort((a, b) => {
    if (sort === 'az' || sort === 'za') return a.name.localeCompare(b.name) * (sort === 'az' ? 1 : -1)
    return a.updatedAt.localeCompare(b.updatedAt) * (sort === 'oldest' ? 1 : -1)
  })
}
