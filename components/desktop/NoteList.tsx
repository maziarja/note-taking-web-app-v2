"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteCard from "../home/NoteCard";
import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Separator } from "../ui/separator";
import React from "react";
import { useSearchParams } from "next/navigation";

function NoteList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const { notes } = useNote();
  const { tag, noteId, isArchivedNotes, setNoteId } = useNoteUI();

  const tagSelectedNotes = notes.filter((note) => note.tags.includes(tag));

  const archivedNotes = notes.filter((note) => note.isArchived);

  const queryNotes = query
    ? notes.filter(
        (note) =>
          note.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase()),
          ) ||
          note.content.toLowerCase().includes(query.toLowerCase()) ||
          note.title.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  let selectedNotes = notes;
  if (tag) selectedNotes = tagSelectedNotes;
  if (isArchivedNotes) selectedNotes = archivedNotes;
  if (query) selectedNotes = queryNotes;

  const sortedSelectedNotes = selectedNotes.sort(
    (a, b) => +new Date(b.lastEdited) - +new Date(a.lastEdited),
  );

  return (
    <>
      <Link
        onClick={() => setNoteId("")}
        href={"/note/createNewNote"}
        className="bg-primary text-preset-4 text-primary-foreground inline-block w-full rounded-lg px-4 py-3 text-center"
      >
        + Create New Note
      </Link>
      <ScrollArea className="h-[calc(100vh-175px)]">
        <div className="space-y-4">
          {tag && (
            <p className="text-preset-5 text-text-mute">
              All notes with the "{tag}" tag are shown here
            </p>
          )}
          <div className="space-y-1 rounded-2xl">
            {sortedSelectedNotes.map((note, i) => (
              <React.Fragment key={note.id}>
                <div
                  className={`cursor-pointer rounded-md p-2 ${noteId === note.id ? "bg-secondary" : ""}`}
                >
                  <NoteCard note={note} isDesktop={true} className="px-0" />
                </div>
                {i < notes.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

export default NoteList;
