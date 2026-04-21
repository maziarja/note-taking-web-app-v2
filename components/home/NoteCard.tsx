"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import { NoteType } from "@/lib/schemas/note";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  note: NoteType;
  className?: string;
  isDesktop?: boolean;
};

function NoteCard({ note, className, isDesktop }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { setNoteId, setShowCreateNote } = useNoteUI();
  const lastEdited = new Date(note.lastEdited).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function handleClickNoteCard() {
    if (!isDesktop) router.push(`/app/note/${note.id}`);
    if (isDesktop) {
      setNoteId(note.id);
      setShowCreateNote(false);

      if (pathname !== "/app") router.push("/app");
    }
  }

  return (
    <>
      <div
        role="button"
        onClick={handleClickNoteCard}
        className={`${className} block cursor-pointer space-y-3 p-2`}
      >
        <p className="text-preset-3">{note.title}</p>
        <div className="inline-flex gap-1">
          {note?.tags?.length > 0 &&
            note.tags.map((tag, i) => (
              <div
                key={`${tag}-${i}`}
                className="bg-muted text-preset-6 rounded-sm px-1.5 py-0.5 capitalize"
              >
                {tag}
              </div>
            ))}
        </div>
        <p className="text-preset-6 text-text-mute">{lastEdited}</p>
      </div>
    </>
  );
}

export default NoteCard;
