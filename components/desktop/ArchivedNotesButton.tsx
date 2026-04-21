"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ArchiveIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function ArchivedNotesButton() {
  const pathname = usePathname();
  const { noteMode, noteState } = useNoteUI();
  return (
    <div
      role="button"
      onClick={() => noteState("archived")}
      className={`${noteMode === "archivedNotes" && pathname === "/app" ? "bg-secondary" : ""} text-text-mute text-preset-4 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5`}
    >
      <ArchiveIcon
        size={20}
        className={`${noteMode === "archivedNotes" && pathname === "/app" ? "text-blue-500" : "text-text-mute"}`}
      />
      <span>Archived Notes</span>
      {noteMode === "archivedNotes" && pathname === "/app" && (
        <ChevronRightIcon className="ml-auto size-4" />
      )}
    </div>
  );
}

export default ArchivedNotesButton;
