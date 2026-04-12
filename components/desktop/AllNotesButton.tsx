"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function AllNotesButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { setTag, setIsArchivedNotes, isArchivedNotes, tag } = useNoteUI();

  return (
    <div
      role="button"
      onClick={() => {
        setTag("");
        setIsArchivedNotes(false);
        if (pathname !== "/") router.push("/");
      }}
      className={`${!isArchivedNotes && !tag && pathname === "/" ? "bg-secondary" : ""} text-text-mute text-preset-4 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5`}
    >
      <HomeIcon
        size={20}
        className={`${!isArchivedNotes && pathname === "/" && !tag ? "text-blue-500" : "text-text-mute"}`}
      />
      <span>All Notes</span>
      {!isArchivedNotes && !tag && pathname === "/" && (
        <ChevronRightIcon className="ml-auto size-4" />
      )}
    </div>
  );
}

export default AllNotesButton;
