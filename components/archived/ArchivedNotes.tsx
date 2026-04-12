"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "../home/NoteCard";
import Link from "next/link";

function ArchivedNotes() {
  const { notes } = useNote();
  const archivedNotes = notes.filter((note) => note.isArchived);

  if (archivedNotes.length === 0)
    return (
      <div className="bg-secondary rounded-lg border p-2">
        <p className="text-preset-5">
          No notes have been archive yet. Move notes here for safekeeping, or{" "}
          <Link
            className="underline underline-offset-2"
            href={"/note/createNewNote"}
          >
            create a new note.
          </Link>
        </p>
      </div>
    );

  return (
    <div className="space-y-1 divide-y pb-10 md:pb-14">
      {archivedNotes.map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}

export default ArchivedNotes;
