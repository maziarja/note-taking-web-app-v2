"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteActions from "./NoteActions";
import { ClockIcon, TagIcon } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NoteToolbar from "./NoteToolbar";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  id: string;
};

function NoteDetails({ id }: Props) {
  const { notes } = useNote();
  const currentNote = notes.find((note) => note.id === Number(id));

  const lastEdited = currentNote?.lastEdited as string;
  const formattedLastEdited = new Date(lastEdited).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: currentNote?.content || "",
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

  return (
    <div className="space-y-3 px-4 py-5">
      <NoteActions />

      <p className="text-preset-1">{currentNote?.title}</p>

      <div className="space-y-1">
        <div className="text-preset-6 text-text-mute flex items-center gap-4 py-1">
          <div className="flex w-28.75 items-center gap-1.5">
            <TagIcon size={16} />
            <span>Tags</span>
          </div>
          <div className="flex grow items-center gap-1.5">
            <span>Dev, React</span>
          </div>
        </div>
        <div className="text-preset-6 text-text-mute flex items-center gap-4 py-1">
          <div className="flex w-28.75 items-center gap-1.5">
            <ClockIcon size={16} />
            <span>Last edited</span>
          </div>
          <div className="flex grow items-center gap-1.5">
            <span>{formattedLastEdited}</span>
          </div>
        </div>
      </div>
      <hr />

      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <NoteToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className="text-preset-5 text-text-secondary h-full bg-red-200 ring-0 focus:border-0 focus:outline-none focus-visible:border-none focus-visible:outline-0 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none"
        />
      </ScrollArea>
    </div>
  );
}

export default NoteDetails;
