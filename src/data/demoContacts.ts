import type { Contact, PracticeArea, Status } from '@/types/contact'

const examples: [string, string, PracticeArea, Status, number, string][] = [
  ['Eleanor Hayes', 'eleanor.hayes', 'Estate planning', 'Active', 14, 'Requested a review of her current will and a checklist for the first appointment.'],
  ['Marcus Chen', 'marcus.chen', 'Business law', 'Lead', 13, 'Referred by an existing client. Would like to discuss an operating agreement before the end of the month.'],
  ['Amelia Brooks', 'amelia.brooks', 'Family law', 'Active', 12, 'Prefers a phone consultation on weekday mornings.'],
  ['Theo Mitchell', 'theo.mitchell', 'Real estate', 'Closed', 11, 'Confirmed receipt of the closing packet. No further follow-up scheduled.'],
  ['Priya Shah', 'priya.shah', 'Employment', 'Lead', 10, 'Sent the intake questionnaire. Follow up after she has had a chance to gather her documents.'],
  ['Julian Rivera', 'julian.rivera', 'Immigration', 'Active', 9, 'Initial consultation booked. Bring the document checklist to the call.'],
  ['Nadia Farouk', 'nadia.farouk', 'Business law', 'Lead', 8, 'Asked about a review of a supplier agreement.'],
  ['Owen Wallace', 'owen.wallace', 'Estate planning', 'Closed', 7, 'Final appointment completed and file closed.'],
]

export const demoContacts: Contact[] = examples.map(([name, email, practice, status, day, body], index) => {
  const id = email.replace('.', '-')
  const createdAt = new Date(2026, 10, day - 2, 10).toISOString()
  const at = new Date(2026, 10, day, 14, 30).toISOString()
  const activity: Contact['activity'] = [
    { id: id + '-note-event', at, kind: 'note' },
    { id: id + '-created', at: createdAt, kind: 'created' },
  ]
  if (status !== 'Lead') activity.splice(1, 0, { id: id + '-move', at, kind: 'moved', from: 'Lead', to: status })
  return {
    id, name, email: email + '@example.com', practice, status,
    phone: '+1 (212) 555-' + String(100 + index).padStart(4, '0'),
    createdAt, updatedAt: at, activity, notes: [{ id: id + '-note', body, at }],
  }
})
