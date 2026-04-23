"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Notes } from "@/lib/models/Note";

export async function deleteNote(noteId: string) {
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

    const currentNote = userNotes.notes.id(noteId);

    if (!currentNote) {
      throw new Error("NOTE_NOT_FOUND");
    }

    currentNote.deleteOne();

    await userNotes.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
