"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "../home/NoteCard";

type Props = {
  tag: string;
};

function TagSelectedNotes({ tag }: Props) {
  const { notes } = useNote();

  const tagSelectedNotes = notes.filter((note) => note.tags.includes(tag));

  const sortedTagSelectedNotes = tagSelectedNotes.sort(
    (a, b) => +new Date(b.lastEdited) - +new Date(a.lastEdited),
  );

  return (
    <div className="space-y-1 divide-y pb-10 md:pb-14">
      {sortedTagSelectedNotes.map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}

export default TagSelectedNotes;
