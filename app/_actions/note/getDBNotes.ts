"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Notes } from "@/lib/models/Note";
import { notesSchema } from "@/lib/schemas/note";

export async function getDBNotes() {
  try {
    await connectDB();
    const session = await auth();
    const userNotes = await Notes.findOne({ userId: session?.user?.id }).lean();

    if (!userNotes) return;

    const plainDBNotes = userNotes.notes.map((note) => {
      return {
        ...note,
        id: note._id.toString(),
      };
    });
    const validDBNotes = notesSchema.safeParse(plainDBNotes);
    if (!validDBNotes.success) {
      throw new Error(validDBNotes.error.issues[0].message);
    }
    return validDBNotes.data;
  } catch (error) {
    console.error(error);
  }
}
