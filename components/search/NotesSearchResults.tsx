"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "../home/NoteCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EmptyStatesSearchedNotes from "./EmptyStatesSearchedNotes";

function NotesSearchResults() {
  const { notes } = useNote();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const notesSearchResults = query
    ? notes.filter(
        (note) =>
          note.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase()),
          ) ||
          note.content.toLowerCase().includes(query.toLowerCase()) ||
          note.title.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  if (query && notesSearchResults.length === 0) {
    return <EmptyStatesSearchedNotes />;
  }

  return (
    <div className="space-y-1 divide-y pb-10 md:pb-14">
      {notesSearchResults.map((note) => (
        <div key={note.id} className="py-1">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}

export default NotesSearchResults;
