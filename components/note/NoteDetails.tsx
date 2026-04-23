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
import { updateNote } from "@/app/_actions/note/updateNote";

function NoteDetails() {
  const { notes, dispatch, userAuthenticated } = useNote();
  const { id: noteId } = useParams();
  const { noteId: noteIdForDesktop } = useNoteUI();
  const ids = (noteId as string) || noteIdForDesktop;
  const currentNote = notes.find((note) => note.id === ids);

  const [content, setContent] = useState(currentNote?.content);

  const [title, setTitle] = useState(currentNote?.title);

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
    if (currentNote) setTitle(currentNote.title);
  }, [currentNote]);

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

  async function handleSaveNote() {
    const prevTitle = currentNote?.title;
    const prevContent = currentNote?.content;
    const prevLastEdited = currentNote?.lastEdited;

    if (ids && currentNote) {
      dispatch({
        type: "updated_note_content",
        payload: {
          noteId: ids,
          content: content || currentNote.content,
          title: title || currentNote.title,
          lastEdited: new Date().toLocaleString(),
        },
      });

      try {
        const updatedNote = {
          id: ids,
          title: title || currentNote.title,
          content: content || currentNote.content,
        };

        if (userAuthenticated) await updateNote(updatedNote);

        toast.success("Note saved successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to save. Changes reverted.");

        if (prevContent && prevTitle && prevLastEdited)
          dispatch({
            type: "updated_note_content",
            payload: {
              noteId: ids,
              content: prevContent,
              title: prevTitle,
              lastEdited: prevLastEdited,
            },
          });
      }
    }
  }

  if (!currentNote) return null;
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="lg:hidden">
        <NoteActions
          noteId={currentNote?.id}
          handleSaveNote={handleSaveNote}
          isArchived={currentNote?.isArchived}
        />
      </div>

      <div className="space-y-3">
        <textarea
          className="text-preset-1 field-sizing-content resize-none outline-none"
          value={title}
          key={currentNote.id}
          onChange={(e) => setTitle(e.target.value)}
        />

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
            className="text-preset-5 text-text-secondary h-full text-[16px] ring-0 focus:border-0 focus:outline-none focus-visible:border-none focus-visible:outline-0 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none"
          />
        </ScrollArea>
      </div>

      <div className="mt-auto hidden space-y-4 lg:block">
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
    </div>
  );
}

export default NoteDetails;
