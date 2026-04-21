"use client";

import { useNote } from "@/app/_context/NoteContext";
import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ChevronRightIcon, TagIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

function Tags() {
  const { notes } = useNote();
  const tags = [...new Set(notes.map((note) => note.tags).flat())];
  const pathname = usePathname();
  const router = useRouter();
  const { tag: tagContext, noteState } = useNoteUI();

  //
  return (
    <>
      {notes.length > 0 && (
        <p className="text-preset-4 dark: text-neutral-500">Tags</p>
      )}
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="space-y-4 pb-10 md:pb-14">
          {tags.map((tag, i) => (
            <div
              role="button"
              onClick={() => noteState("tag", tag)}
              key={`${tag}-${i}`}
              className={`${tagContext === tag && pathname === "/app" ? "bg-secondary" : ""} flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5`}
            >
              <TagIcon
                size={20}
                className={`${tagContext === tag && pathname === "/app" ? "text-blue-500" : "text-text-mute"}`}
              />
              <span
                className={`${tagContext === tag} ? "text-foreground" : "text-text-mute"} text-preset-4 capitalize`}
              >
                {tag}
              </span>
              {tagContext === tag && pathname === "/app" && (
                <ChevronRightIcon className="ml-auto size-4" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

export default Tags;
