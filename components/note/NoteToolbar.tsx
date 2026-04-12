"use client";

import { Editor, useEditorState } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MessageSquareQuoteIcon,
  SquareCodeIcon,
  UnderlineIcon,
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
      isBlockquote: ctx.editor?.isActive("blockquote"),
      isItalic: ctx.editor?.isActive("italic"),
      isUnderline: ctx.editor?.isActive("underline"),
      isOrderList: ctx.editor?.isActive("orderedList"),
      isBulletList: ctx.editor?.isActive("bulletList"),
      isCode: ctx.editor?.isActive("code"),
      isCodeBlock: ctx.editor?.isActive("codeBlock"),
    }),
  });

  return (
    <div className="border-border bg-card mb-3 flex flex-wrap items-center gap-1 rounded-lg border-b p-2 shadow-sm">
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isH1 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1Icon size={18} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isH2 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2Icon size={18} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isH3 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3Icon size={18} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isH4 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4Icon size={18} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isH5 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 5 }).run()
        }
      >
        <Heading5Icon size={18} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isH6 ? "bg-muted" : ""}`}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 6 }).run()
        }
      >
        <Heading6Icon size={18} className="text-foreground" />
      </button>

      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isBold ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <BoldIcon size={16} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isItalic ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon size={16} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isUnderline ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={16} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isCode ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleCode().run()}
      >
        <CodeIcon size={16} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isBulletList ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <ListIcon size={16} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isOrderList ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon size={16} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isCodeBlock ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        <SquareCodeIcon size={16} className="text-foreground" />
      </button>
      <button
        type="button"
        className={`hover:bg-muted cursor-pointer rounded-md p-1.5 ${editorState?.isBlockquote ? "bg-muted" : ""}`}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        <MessageSquareQuoteIcon size={16} className="text-foreground" />
      </button>
    </div>
  );
}

export default NoteToolbar;
