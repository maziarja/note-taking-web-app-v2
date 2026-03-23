"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "./NoteCard";

function AllNotes() {
  const { notes } = useNote();

  return (
    <div className="space-y divide-y pb-10 md:pb-14">
      {notes.slice(0, 3).map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} key={note.id} />
        </div>
      ))}
    </div>
  );
}

export default AllNotes;
