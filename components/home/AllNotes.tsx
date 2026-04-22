"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "./NoteCard";
import EmptyStatesAllNotes from "../note/EmptyStatesAllNotes";

function AllNotes() {
  const { notes } = useNote();

  if (notes.length < 1) return <EmptyStatesAllNotes />;

  const sortedAllNotes = notes.sort(
    (a, b) => +new Date(b.lastEdited) - +new Date(a.lastEdited),
  );

  return (
    <div className="space-y-1 divide-y pb-10 md:pb-14">
      {sortedAllNotes.map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} key={note.id} />
        </div>
      ))}
    </div>
  );
}

export default AllNotes;
