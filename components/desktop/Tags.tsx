"use client";

import { useNote } from "@/app/_context/NoteContext";
import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ChevronRightIcon, TagIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function Tags() {
  const { notes } = useNote();
  const tags = [...new Set(notes.map((note) => note.tags).flat())];
  const pathname = usePathname();
  const router = useRouter();
  const { setTag, tag: tagContext, setIsArchivedNotes } = useNoteUI();

  return (
    <div className="space-y-4 pb-10 md:pb-14">
      {tags.map((tag, i) => (
        <div
          role="button"
          onClick={() => {
            setTag(tag);
            setIsArchivedNotes(false);
            if (pathname !== "/") router.push("/");
          }}
          key={`${tag}-${i}`}
          className={`${tagContext === tag && pathname === "/" ? "bg-secondary" : ""} flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5`}
        >
          <TagIcon
            size={20}
            className={`${tagContext === tag && pathname === "/" ? "text-blue-500" : "text-text-mute"}`}
          />
          <span
            className={`${tagContext === tag} ? "text-foreground" : "text-text-mute"} text-preset-4 capitalize`}
          >
            {tag}
          </span>
          {tagContext === tag && pathname === "/" && (
            <ChevronRightIcon className="ml-auto size-4" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Tags;
