"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "../home/NoteCard";
import EmptyStatesArchivedNotes from "./EmptyStatesArchivedNotes";

function ArchivedNotes() {
  const { sortedNotes } = useNote();
  const archivedNotes = sortedNotes.filter((note) => note.isArchived);

  if (archivedNotes.length === 0) return <EmptyStatesArchivedNotes />;

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
