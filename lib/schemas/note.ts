import z from "zod";

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
  lastEdited: z.string(),
  isArchived: z.boolean(),
});

export const notesSchema = z.array(noteSchema);

export type NoteType = z.infer<typeof noteSchema>;

export const createNoteSchema = z.object({
  title: z.string().max(100).min(1),
  tags: z.array(z.string()).max(50).min(1),
  content: z.string().max(1000).min(1),
  lastEdited: z.string(),
  isArchived: z.boolean(),
});

export const updateNoteSchema = z.object({
  title: z.string().max(100).min(1),
  content: z.string().max(1000).min(1),
  lastEdited: z.string(),
});
