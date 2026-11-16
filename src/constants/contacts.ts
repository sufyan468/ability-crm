export const contactLimits = { name: 120, email: 254, phone: 40, note: 2000 } as const
export const statuses = ['Lead', 'Active', 'Closed'] as const
export const practiceAreas = ['Business law', 'Employment', 'Estate planning', 'Family law', 'Immigration', 'Real estate', 'Other'] as const
export const sortOptions = [
  { value: 'recent', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'Name: A–Z' },
  { value: 'za', label: 'Name: Z–A' },
] as const
