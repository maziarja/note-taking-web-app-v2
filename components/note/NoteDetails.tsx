"use client";

import { useNote } from "@/app/_context/NoteContext";
import NoteActions from "./NoteActions";
import { ClockIcon, LoaderIcon, TagIcon } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NoteToolbar from "./NoteToolbar";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useNoteUI } from "@/app/_context/NoteUIContext";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

type Props = {
  isDesktop?: boolean;
};

function NoteDetails({ isDesktop = false }: Props) {
  const { notes, dispatch } = useNote();
  const { id: noteId } = useParams();
  const { noteId: noteIdForDesktop } = useNoteUI();
  const ids = (noteId as string) || noteIdForDesktop;
  const currentNote = notes.find((note) => note.id === ids);

  const [content, setContent] = useState(currentNote?.content);

  const lastEdited = currentNote?.lastEdited as string;

  const formattedLastEdited = new Date(lastEdited).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: content || "",
    parseOptions: {
      preserveWhitespace: "full",
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  useEffect(() => {
    if (editor && currentNote)
      editor.commands.setContent(currentNote?.content, {
        emitUpdate: false,
        parseOptions: {
          preserveWhitespace: "full",
        },
        errorOnInvalidContent: true,
      });
  }, [editor, currentNote?.content]);

  function handleSaveNote() {
    if (ids && content) {
      dispatch({
        type: "updated_note_content",
        id: ids,
        payload: content,
      });
      toast.success("Note saved successfully!");
    }
  }
  if (!currentNote) return null;
  return (
    <div className="flex h-full flex-col gap-3">
      {!isDesktop && (
        <NoteActions
          noteId={currentNote?.id}
          handleSaveNote={handleSaveNote}
          isArchived={currentNote?.isArchived}
        />
      )}
      <div className="space-y-3">
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
          {currentNote?.isArchived && (
            <div className="text-preset-6 text-text-mute flex items-center gap-4 py-1">
              <div className="flex w-28.75 items-center gap-1.5">
                <LoaderIcon size={16} />
                <span>Status</span>
              </div>
              <div className="flex grow items-center gap-1.5">
                <span>Archived</span>
              </div>
            </div>
          )}
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

        <NoteToolbar editor={editor} />
        <ScrollArea className="h-[calc(100vh-400px)] w-full">
          <EditorContent
            key={currentNote?.id}
            editor={editor}
            className="text-preset-5 text-text-secondary h-full ring-0 focus:border-0 focus:outline-none focus-visible:border-none focus-visible:outline-0 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none"
          />
        </ScrollArea>
      </div>

      {isDesktop && (
        <div className="mt-auto space-y-4">
          <Separator />
          <div className="space-x-4">
            <Button
              onClick={handleSaveNote}
              size={"xl"}
              className="text-preset-4! cursor-pointer"
            >
              Save Note
            </Button>
            <Button
              size={"xl"}
              variant={"secondary"}
              className="text-preset-4! cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteDetails;
