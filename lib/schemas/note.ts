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
