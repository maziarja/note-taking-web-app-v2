"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import Link from "next/link";

function EmptyStatesArchivedNotes() {
  const { setShowCreateNote } = useNoteUI();
  return (
    <div className="bg-secondary rounded-lg border p-2">
      <p className="text-preset-5">
        No notes have been archive yet. Move notes here for safekeeping, or{" "}
        <Link
          className="underline underline-offset-2 lg:hidden"
          href={"/app/note/createNewNote"}
        >
          create a new note.
        </Link>
      </p>
      <button
        onClick={() => {
          setShowCreateNote(true);
        }}
        className="text-preset-5 hidden underline underline-offset-2 lg:inline-block"
      >
        create a new note.
      </button>
    </div>
  );
}

export default EmptyStatesArchivedNotes;
