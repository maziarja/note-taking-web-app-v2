"use client";

import { ArchiveIcon, ChevronLeft, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

function NoteActions() {
  const router = useRouter();

  return (
    <div className="text-preset-5 flex items-center justify-between border-b pb-3">
      <div className="text-secondary-foreground flex items-center gap-1">
        <ChevronLeft className="size-4.5" />
        <span onClick={router.back}>Go Back</span>
      </div>
      <div className="text-secondary-foreground flex items-center gap-4">
        <Trash2Icon className="size-4.5" />
        <ArchiveIcon className="size-4.5" />
        <button>Cancel</button>
        <button className="text-blue-500">Save Note</button>
      </div>
    </div>
  );
}

export default NoteActions;
