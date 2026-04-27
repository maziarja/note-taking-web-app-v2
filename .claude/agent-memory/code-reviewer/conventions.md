---
name: Codebase Conventions
description: Established patterns in the note-taking app that should not be flagged as anti-patterns in reviews
type: project
---

All DB calls happen exclusively in `app/_actions/` server actions — this is intentional and should not be moved.

Optimistic UI pattern: dispatch reducer action first, call server action, rollback on catch. This is used consistently in CreateNewNote, DeleteNoteDialog, ArchiveNoteDialog, and NoteDetails.

Zod validation happens inside server actions (not just on the client), using `safeParse` with `validUser.error.issues[0].message` for error extraction.

NoteContext uses `useReducer` with a typed `Action` union. NoteUIContext uses `useState` for transient UI. SessionContext is a thin client-side mirror of the server session.

Notes data model: single `Notes` document per user with an embedded `notes` subdocument array. Queried with `Notes.findOne({ userId })` then subdocument `id()` for individual note lookups.

`lastEdited` is stored as a locale string (not ISO), generated client-side with `new Date().toLocaleString()`. This is intentional (per commit history) but has locale-consistency implications.

Root layout (`app/layout.tsx`) pre-fetches session and DB notes in parallel and passes them to NoteProvider to avoid client-side loading state on first render.

Font preference stored in localStorage and applied via inline script in `<head>` to avoid FOUC.

Color theme uses next-themes with `class` strategy.

Parallel routes under `/app`: `@sidebar`, `@noteList`, `@noteDetails`, `@noteSearch`, `@noteActions`.

Desktop view uses NoteUIContext `noteId` to identify the active note; mobile uses Next.js route param `[id]`. NoteDetails handles both via `useParams() || noteIdForDesktop`.
