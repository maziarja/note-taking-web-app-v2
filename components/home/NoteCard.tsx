import { NoteType } from "@/lib/schemas/note";
import Link from "next/link";

type Props = {
  note: NoteType;
};

function NoteCard({ note }: Props) {
  const lastEdited = new Date(note.lastEdited).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/note/${note.id}`} className="block space-y-3 p-2">
      <p className="text-preset-3">{note.title}</p>
      <div className="inline-flex gap-1">
        {note.tags.map((tag, i) => (
          <div
            key={`${tag}-${i}`}
            className="bg-muted text-preset-6 rounded-sm px-1.5 py-0.5 capitalize"
          >
            {tag}
          </div>
        ))}
      </div>
      <p className="text-preset-6 text-text-mute">{lastEdited}</p>
    </Link>
  );
}

export default NoteCard;
