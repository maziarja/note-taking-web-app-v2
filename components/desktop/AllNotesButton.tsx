"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function AllNotesButton() {
  const pathname = usePathname();
  const { tag, noteMode, noteState } = useNoteUI();

  return (
    <div
      role="button"
      onClick={() => noteState("all")}
      className={`${noteMode === "allNotes" && !tag && pathname === "/app" ? "bg-secondary" : ""} text-text-mute text-preset-4 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5`}
    >
      <HomeIcon
        size={20}
        className={`${noteMode === "allNotes" && pathname === "/app" && !tag ? "text-blue-500" : "text-text-mute"}`}
      />
      <span>All Notes</span>
      {noteMode === "allNotes" && !tag && pathname === "/app" && (
        <ChevronRightIcon className="ml-auto size-4" />
      )}
    </div>
  );
}

export default AllNotesButton;
