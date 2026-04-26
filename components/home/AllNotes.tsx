"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "./NoteCard";
import EmptyStatesAllNotes from "../note/EmptyStatesAllNotes";

function AllNotes() {
  const { notes } = useNote();

  if (notes.length < 1) return <EmptyStatesAllNotes />;

  return (
    <div className="space-y-1 divide-y pb-10 md:pb-14">
      {notes.map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}

export default AllNotes;
