import connectDB from "@/lib/database";
import { Notes } from "@/lib/models/Note";
import { NoteType } from "@/lib/schemas/note";

export async function importNotesToDB(notes: NoteType[], userId: string) {
  try {
    await connectDB();
    const newNotes = new Notes({
      userId,
      notes,
    });
    await newNotes.save();

    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
