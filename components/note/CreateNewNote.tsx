"use client";

import { ChevronLeft, ClockIcon, TagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import NoteToolbar from "./NoteToolbar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ScrollArea } from "../ui/scroll-area";
import { Placeholder } from "@tiptap/extensions";
import { useState } from "react";
import { useNote } from "@/app/_context/NoteContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNoteUI } from "@/app/_context/NoteUIContext";

function CreateNewNote({ isDesktop = false }) {
  const [content, setContent] = useState("");
  const { dispatch } = useNote();
  const { setNoteId } = useNoteUI();
  const router = useRouter();
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing your note here...",
      }),
    ],
    content: content || "",

    parseOptions: {
      preserveWhitespace: "full",
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  function handleSubmitForm(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const tags = formData.get("tags") as string;
    const formattedTags = tags.split(",");

    if (title.trim() === "" || tags.trim() === "" || content.trim() === "") {
      toast.error("Please add a title, tags, and note content before saving.");
      return;
    }
    // const id = crypto.randomUUID();
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    dispatch({
      type: "added_note",
      payload: {
        id,
        title,
        content,
        lastEdited: new Date().toDateString(),
        isArchived: false,
        tags: formattedTags,
      },
    });

    toast.success("Note saved successfully!");
    setNoteId(id);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmitForm} className="space-y-3">
      {!isDesktop && (
        <div className="flex items-center justify-between border-b pb-3">
          <button
            type="button"
            onClick={router.back}
            className="text-secondary-foreground text-preset-5 flex cursor-pointer items-center gap-1"
          >
            <ChevronLeft className="size-4.5" />
            <span>Go Back</span>
          </button>
          <div className="text-preset-5 flex items-center gap-4">
            <button
              type="button"
              onClick={router.back}
              className="text-secondary-foreground cursor-pointer"
            >
              Cancel
            </button>
            <button type="submit" className="cursor-pointer text-blue-500">
              Save Note
            </button>
          </div>
        </div>
      )}
      <input
        name="title"
        className="text-preset-2 placeholder:text-foreground outline-none"
        placeholder="Enter a title..."
      />
      <div>
        <div className="text-preset-6 text-text-mute flex items-center gap-4 py-1">
          <div className="flex w-28.75 items-center gap-1.5">
            <TagIcon size={16} />
            <span>Tags</span>
          </div>
          <div className="flex grow items-center gap-1.5">
            <textarea
              name="tags"
              className="text-preset-6 w-full resize-none outline-none"
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
            />
          </div>
        </div>
        <div className="text-preset-6 text-text-mute flex items-center gap-4 py-1">
          <div className="flex w-28.75 items-center gap-1.5">
            <ClockIcon size={16} />
            <span>Last edited</span>
          </div>
          <p className="text-muted-foreground">Not yet saved</p>
        </div>
      </div>
      <Separator />
      <NoteToolbar editor={editor} />
      <ScrollArea className="h-[calc(100vh-400px)] w-full">
        <EditorContent
          editor={editor}
          placeholder="Start typing your note here..."
          className="text-preset-5 text-text-secondary h-full text-balance ring-0 focus:border-0 focus:outline-none focus-visible:border-none focus-visible:outline-0 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none"
        />
      </ScrollArea>

      {isDesktop && (
        <div className="mt-auto space-y-4">
          <Separator />
          <div className="space-x-4">
            <Button
              type="submit"
              size={"xl"}
              className="text-preset-4! cursor-pointer"
            >
              Save Note
            </Button>
            <Button
              type="button"
              size={"xl"}
              variant={"secondary"}
              className="text-preset-4! cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

export default CreateNewNote;
