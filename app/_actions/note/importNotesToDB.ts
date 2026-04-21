"use server";

import connectDB from "@/lib/database";
import { Note, Notes } from "@/lib/models/Note";
import { NoteType } from "@/lib/schemas/note";

export async function importNotesToDB(notes: NoteType[], userId: string) {
  try {
    await connectDB();
    const newNotes = new Notes({
      userId,
      notes,
    });
    await newNotes.save();
  } catch (error) {
    console.error(error);
  }
}
