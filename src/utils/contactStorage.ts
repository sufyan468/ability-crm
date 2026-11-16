import { demoContacts } from "@/data/demoContacts";
import { storedContactsSchema } from "@/schemas/contact";
import type { Contact } from "@/types/contact";

// Keep the original key so the brand rename preserves saved contacts.
const STORAGE_KEY = "ability.intake.v1";

export function loadContacts(): Contact[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === null ? demoContacts : storedContactsSchema.parse(JSON.parse(raw));
}

export function persistContacts(contacts: Contact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}
