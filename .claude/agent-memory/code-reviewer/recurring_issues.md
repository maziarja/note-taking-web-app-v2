---
name: Recurring Issues
description: Patterns observed across multiple files that are likely to appear in future code; flag these in reviews
type: project
---

1. **Hardcoded test credentials in forms**: LoginForm.tsx and SignupForm.tsx both have `defaultValues` with real-looking credentials (`mazi@gmail.com` / `mazimazi`). This is a dev convenience that has persisted into committed code.

2. **`mongoose.connect()` not awaited**: `lib/database.ts` line 19 calls `mongoose.connect()` without `await`. The `connected = true` flag is set optimistically, so a race condition exists where queries can fire before the connection is established.

3. **`notes.sort()` mutates state**: `NoteUIContext.tsx` line 33 calls `notes.sort()` directly on the array from context, which mutates the reducer state array in place. Should be `[...notes].sort()`.

4. **`updateNoteSchema` does not include `id`**: The schema validates title/content/lastEdited but the action receives and uses an `id` field that bypasses Zod validation. The raw `updatedNote.id` is passed directly to `userNotes.notes.id()`.

5. **Missing `await` in `signup` server action**: The return type exposes `userId` (MongoDB `_id`) directly to the client, which is then passed to `importNotesToDB` client-side. This couples the client to internal DB identifiers.

6. **`deleteAccount` silent failure**: Returns `undefined` (no `return` in catch) instead of `{ error: ... }`. The calling component checks `result?.success` but a thrown error would make `result` undefined, silently failing with no user feedback.

7. **Duplicate `key` prop**: `AllNotes.tsx` passes `key={note.id}` to both the wrapper `<div>` and the inner `<NoteCard>`. React only uses the outermost key; the inner one is redundant.

8. **`Underline` extension not registered**: NoteToolbar exposes an Underline button and tracks `isUnderline` state, but `NoteDetails` editor only loads `StarterKit` (which does not include Underline). The button will silently do nothing when editing existing notes.

9. **`aria-label` copy/paste error**: `components/desktop/NoteActions.tsx` labels both the Archive and Delete buttons as `"Delete Note"`.

10. **Tag splitting without trimming whitespace**: `CreateNewNote.tsx` splits tags on comma but does not `.trim()` each element, so `"Work, Planning"` produces `["Work", " Planning"]` with a leading space on the second tag.

11. **Unused import**: `SignupForm.tsx` imports `Router` from lucide-react (line 14) — unused.
