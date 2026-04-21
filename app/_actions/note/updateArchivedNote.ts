"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Notes } from "@/lib/models/Note";

export async function updateArchivedNote(id: string, isArchived: boolean) {
  try {
    await connectDB();
    const session = await auth();
    if (!session) throw new Error("UNAUTHORIZED");
    const userNotes = await Notes.findOne({ userId: session?.user?.id });

    if (!userNotes) {
      throw new Error("NOT_FOUND");
    }

    const currentNote = userNotes.notes.id(id);

    if (!currentNote) throw new Error("NOTE_NOT_FOUND");

    currentNote.isArchived = isArchived;

    await userNotes.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
