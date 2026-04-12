"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ArchiveIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function ArchivedNotesButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { isArchivedNotes, setIsArchivedNotes, setTag } = useNoteUI();
  return (
    <div
      role="button"
      onClick={() => {
        setIsArchivedNotes(true);
        setTag("");
        if (pathname !== "/") router.push("/");
      }}
      className={`${isArchivedNotes && pathname === "/" ? "bg-secondary" : ""} text-text-mute text-preset-4 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5`}
    >
      <ArchiveIcon
        size={20}
        className={`${isArchivedNotes && pathname === "/" ? "text-blue-500" : "text-text-mute"}`}
      />
      <span>Archived Notes</span>
      {isArchivedNotes && pathname === "/" && (
        <ChevronRightIcon className="ml-auto size-4" />
      )}
    </div>
  );
}

export default ArchivedNotesButton;
