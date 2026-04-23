"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Notes } from "@/lib/models/Note";
import { createNoteSchema } from "@/lib/schemas/note";

type NewNoteType = {
  title: string;
  content: string;
  tags: string[];
  lastEdited: string;
  isArchived: boolean;
};

export async function createNote(newNote: NewNoteType) {
  try {
    await connectDB();
    const session = await auth();

    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    const userNotes = await Notes.findOne({ userId: session.user?.id });

    if (!userNotes) {
      throw new Error("NOT_FOUND");
    }

    const validNewNote = createNoteSchema.safeParse(newNote);

    if (!validNewNote.success) {
      throw new Error(validNewNote.error.issues[0].message);
    }

    userNotes.notes.push(validNewNote.data);
    await userNotes.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
