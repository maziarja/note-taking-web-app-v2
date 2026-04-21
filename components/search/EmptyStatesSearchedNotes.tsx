"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import Link from "next/link";

function EmptyStatesSearchedNotes() {
  const { setShowCreateNote } = useNoteUI();
  return (
    <div className="bg-secondary rounded-lg border p-2">
      <p className="text-preset-5">
        No notes match your search. Try a different keyword or{" "}
        <Link
          href={"/app/note/createNewNote"}
          className="underline underline-offset-2 lg:hidden"
        >
          create a new note.
        </Link>
        <button
          onClick={() => {
            setShowCreateNote(true);
          }}
          className="hidden underline underline-offset-2 lg:inline-block"
        >
          create a new note.
        </button>
      </p>
    </div>
  );
}

export default EmptyStatesSearchedNotes;
