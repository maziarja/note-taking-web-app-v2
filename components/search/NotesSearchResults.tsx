"use client";

import { useNote } from "@/app/_context/NoteContext";
import { useSearchParams } from "next/navigation";
import NoteCard from "../home/NoteCard";
import Link from "next/link";

function NotesSearchResults() {
  const searchParams = useSearchParams();
  const { notes } = useNote();
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
    return (
      <div className="bg-secondary rounded-lg border p-2">
        <p className="text-preset-5">
          No notes match your search. Try a different keyword or{" "}
          <Link href={"/"} className="underline underline-offset-2">
            create a new note.
          </Link>
        </p>
      </div>
    );
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
