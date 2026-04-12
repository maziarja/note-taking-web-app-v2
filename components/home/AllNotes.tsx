"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "./NoteCard";

function AllNotes() {
  const { notes } = useNote();

  return (
    <div className="space-y-1 divide-y pb-10 md:pb-14">
      {notes.map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} key={note.id} />
        </div>
      ))}
    </div>
  );
}

export default AllNotes;
