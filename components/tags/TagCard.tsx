"use client";

import { useNote } from "@/app/_context/NoteContext";
import { TagIcon } from "lucide-react";
import Link from "next/link";

function TagCard() {
  const { notes } = useNote();
  const tags = [...new Set(notes.map((note) => note.tags).flat())];
  return (
    <div className="space-y-4 divide-y pb-10 md:pb-14">
      {tags.map((tag, i) => (
        <Link
          href={`/tags/${tag}`}
          key={`${tag}-${i}`}
          className="text-text-mute flex items-center gap-2 pb-4"
        >
          <TagIcon size={20} />
          <span className="text-preset-4 capitalize">{tag}</span>
        </Link>
      ))}
    </div>
  );
}

export default TagCard;
