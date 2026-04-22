"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "../home/NoteCard";
import EmptyStatesArchivedNotes from "./EmptyStatesArchivedNotes";

function ArchivedNotes() {
  const { notes } = useNote();
  const archivedNotes = notes.filter((note) => note.isArchived);

  if (archivedNotes.length === 0) return <EmptyStatesArchivedNotes />;

  const sortedArchivedNotes = archivedNotes.sort(
    (a, b) => +new Date(b.lastEdited) - +new Date(a.lastEdited),
  );

  return (
    <div className="space-y-1 divide-y pb-10 md:pb-14">
      {sortedArchivedNotes.map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}

export default ArchivedNotes;
