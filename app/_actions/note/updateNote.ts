"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Notes } from "@/lib/models/Note";

type UpdatedNoteType = {
  id: string;
  title: string;
  content: string;
};

export async function updateNote(updatedNote: UpdatedNoteType) {
  try {
    await connectDB();

    const session = await auth();
    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    const userNotes = await Notes.findOne({ userId: session?.user?.id });

    if (!userNotes) {
      throw new Error("NOT_FOUND");
    }

    const currentNote = userNotes.notes.id(updatedNote.id);

    if (!currentNote) {
      throw new Error("NOTE_NOT_FOUND");
    }

    currentNote.content = updatedNote.content;
    currentNote.title = updatedNote.title;
    await userNotes.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
