# Ability CRM

A small CRM for the fictional Alder & Lane intake team. It ships with eight fictional contacts so a reviewer can explore the workflow immediately.

**Run locally:** With Node 20.19+ or 22.12+, run `npm ci` then `npm run dev`. Run `npm run build` to type-check and export the site to `out/`. Serve that folder with any static web server.

**Deploy on Vercel.** Import the GitHub repository and use the Next.js preset.

**Tech stack.** Next.js App Router with React and TypeScript, Tailwind CSS via PostCSS, Zod for validation, and Lucide React for icons.

**Structure and state.** Screens live in `components/contacts`, with shared contact types in `types` and demo records in `data`. The record and edit pages read the contact ID from the query string, which keeps direct links working on a static host. React Context shares the `useContacts` hook across routes, and the UI updates after the write to `localStorage` succeeds.

**UI decisions.** Tailwind utilities handle layout, controls, responsive tables, and drag feedback. The directory makes names, practice areas and intake status easy to scan. The status totals also filter the list. The board uses the native HTML Drag and Drop API and includes a Move to menu for touch and keyboard. The record places contact details and intake notes alongside the activity timeline. On small screens the board and record stack, and the directory prioritizes names and status.

**Tradeoff.** Browser storage keeps the demo lightweight and survives refreshes. Data stays in one browser profile and can be cleared; use fictional information only. For a real team, I would replace storage with an authenticated shared backend and record who made each change.

**AI use.** I used AI as a development assistant to help implement the CRM. I also used AI to generate the SVG illustrations and the Ability CRM app logo.
