"use client";

import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  ChevronLeft,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteNoteDialog from "../shared/DeleteNoteDialog";
import ArchiveNoteDialog from "../shared/ArchiveNoteDialog";

type Props = {
  noteId: string | undefined;
  handleSaveNote: () => void;
  isArchived: boolean | undefined;
};

function NoteActions({ noteId, isArchived, handleSaveNote }: Props) {
  const router = useRouter();

  return (
    <div className="text-preset-5 flex items-center justify-between border-b pb-3">
      <button
        onClick={router.back}
        className="text-secondary-foreground flex cursor-pointer items-center gap-1"
      >
        <ChevronLeft className="size-4.5" />
        <span>Go Back</span>
      </button>
      <div className="text-secondary-foreground flex items-center gap-4">
        <DeleteNoteDialog noteId={noteId}>
          <button
            aria-label="open delete note dialog"
            className="cursor-pointer"
          >
            <Trash2Icon className="size-4.5" />
          </button>
        </DeleteNoteDialog>
        {!isArchived ? (
          <ArchiveNoteDialog noteId={noteId} mode={"archive"}>
            <button
              aria-label="open restore note dialog"
              className="cursor-pointer"
            >
              <ArchiveIcon className="size-4.5" />
            </button>
          </ArchiveNoteDialog>
        ) : (
          <ArchiveNoteDialog noteId={noteId} mode={"restore"}>
            <button>
              <ArchiveRestoreIcon className="size-4.5" />
            </button>
          </ArchiveNoteDialog>
        )}
        <button onClick={router.back} className="cursor-pointer">
          Cancel
        </button>
        <button
          onClick={handleSaveNote}
          className="cursor-pointer text-blue-500"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

export default NoteActions;
