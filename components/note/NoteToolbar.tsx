"use client";

import { Editor, useEditorState } from "@tiptap/react";
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
} from "lucide-react";

function NoteToolbar({ editor }: { editor: Editor | null }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold"),
      isH1: ctx.editor?.isActive("heading", { level: 1 }),
      isH2: ctx.editor?.isActive("heading", { level: 2 }),
      isH3: ctx.editor?.isActive("heading", { level: 3 }),
      isH4: ctx.editor?.isActive("heading", { level: 4 }),
      isH5: ctx.editor?.isActive("heading", { level: 5 }),
      isH6: ctx.editor?.isActive("heading", { level: 6 }),
    }),
  });

  return (
    <div className="mb-2 flex items-center">
      <button
        className={`hover:bg-muted cursor-pointer rounded-xl p-1 ${editorState?.isH1 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1Icon size={18} className="text-foreground" />
      </button>
      <button
        className={`hover:bg-muted cursor-pointer rounded-xl p-1 ${editorState?.isH2 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2Icon size={18} className="text-foreground" />
      </button>
      <button
        className={`hover:bg-muted cursor-pointer rounded-xl p-1 ${editorState?.isH3 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3Icon size={18} className="text-foreground" />
      </button>
      <button
        className={`hover:bg-muted cursor-pointer rounded-xl p-1 ${editorState?.isH4 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4Icon size={18} className="text-foreground" />
      </button>
      <button
        className={`hover:bg-muted cursor-pointer rounded-xl p-1 ${editorState?.isH5 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 5 }).run()
        }
      >
        <Heading5Icon size={18} className="text-foreground" />
      </button>
      <button
        className={`hover:bg-muted cursor-pointer rounded-xl p-1 ${editorState?.isH6 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 6 }).run()
        }
      >
        <Heading6Icon size={18} className="text-foreground" />
      </button>

      <button
        className={`hover:bg-muted cursor-pointer rounded-xl p-1 ${editorState?.isBold ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <BoldIcon size={16} className="text-foreground" />
      </button>
    </div>
  );
}

export default NoteToolbar;
