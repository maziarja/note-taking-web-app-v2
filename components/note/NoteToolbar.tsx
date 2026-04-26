"use client";

import { Editor, useEditorState } from "@tiptap/react";
import {
  BoldIcon,
  ChevronDownIcon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const headingIcons = {
    1: Heading1Icon,
    2: Heading2Icon,
    3: Heading3Icon,
    4: Heading4Icon,
    5: Heading5Icon,
    6: Heading6Icon,
  } as const;

  const activeHeadingLevel = ([1, 2, 3, 4, 5, 6] as const).find(
    (level) => editorState?.[`isH${level}` as keyof typeof editorState],
  );
  const ActiveHeadingIcon = activeHeadingLevel
    ? headingIcons[activeHeadingLevel]
    : null;

  return (
    <div className="border-border bg-card mb-3 flex flex-wrap items-center gap-1 rounded-lg border-b p-2 shadow-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={`hover:bg-muted flex cursor-pointer items-center gap-0.5 rounded-md p-1.5 ${activeHeadingLevel ? "bg-muted" : ""}`}
          >
            {ActiveHeadingIcon ? (
              <ActiveHeadingIcon size={18} className="text-foreground" />
            ) : (
              <span className="text-foreground text-sm font-medium leading-none">
                Aa
              </span>
            )}
            <ChevronDownIcon size={12} className="text-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {([1, 2, 3, 4, 5, 6] as const).map((level) => {
            const Icon = headingIcons[level];
            const isActive =
              editorState?.[`isH${level}` as keyof typeof editorState];
            return (
              <DropdownMenuItem
                key={level}
                className={isActive ? "bg-accent text-accent-foreground" : ""}
                onSelect={() =>
                  editor?.chain().focus().toggleHeading({ level }).run()
                }
              >
                <Icon size={16} />
                Heading {level}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

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
