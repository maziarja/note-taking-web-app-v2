"use client";

import { ArchiveIcon, ArchiveRestoreIcon, Trash2Icon } from "lucide-react";
import DeleteNoteDialog from "../shared/DeleteNoteDialog";
import { useNoteUI } from "@/app/_context/NoteUIContext";
import ArchiveNoteDialog from "../shared/ArchiveNoteDialog";
import { useNote } from "@/app/_context/NoteContext";
import { Button } from "../ui/button";

function NoteActions() {
  const { notes } = useNote();
  const { noteId } = useNoteUI();
  const currentNote = notes.find((note) => note.id === noteId);
  const isArchived = currentNote?.isArchived;

  if (!currentNote) return null;
  return (
    <div className="flex h-full flex-col items-center gap-4 border-l p-4">
      {!isArchived ? (
        <ArchiveNoteDialog noteId={noteId} mode="archive">
          <Button
            variant={"outline"}
            size={"xl"}
            aria-label="Delete Note"
            className="cursor-pointer xl:flex xl:w-full xl:items-center xl:justify-center xl:gap-2"
          >
            <ArchiveIcon size={20} />
            <span className="text-preset-4 hidden xl:inline-block">
              Archive Note
            </span>
          </Button>
        </ArchiveNoteDialog>
      ) : (
        <ArchiveNoteDialog noteId={noteId} mode={"restore"}>
          <Button
            variant={"outline"}
            size={"xl"}
            aria-label="Delete Note"
            className="cursor-pointer xl:flex xl:w-full xl:items-center xl:justify-center xl:gap-2"
          >
            <ArchiveRestoreIcon size={20} />
            <span className="text-preset-4 hidden xl:inline-block">
              Restore Note
            </span>
          </Button>
        </ArchiveNoteDialog>
      )}
      <DeleteNoteDialog noteId={noteId}>
        <Button
          variant={"outline"}
          size={"xl"}
          aria-label="Delete Note"
          className="cursor-pointer xl:flex xl:w-full xl:items-center xl:justify-center xl:gap-2"
        >
          <Trash2Icon size={20} />
          <span className="text-preset-4 hidden xl:inline-block">
            Delete Note
          </span>
        </Button>
      </DeleteNoteDialog>
    </div>
  );
}

export default NoteActions;
