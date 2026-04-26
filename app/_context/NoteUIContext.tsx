"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useNote } from "./NoteContext";
import { usePathname, useRouter } from "next/navigation";

type NoteUIContext = {
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  noteId: string;
  noteMode: "allNotes" | "archivedNotes" | "";
  setNoteMode: React.Dispatch<
    React.SetStateAction<"allNotes" | "archivedNotes" | "">
  >;
  setNoteId: React.Dispatch<React.SetStateAction<string>>;
  showCreateNote: boolean;
  setShowCreateNote: React.Dispatch<React.SetStateAction<boolean>>;
  showSettings: "color-theme" | "font-theme" | "";
  setShowSettings: React.Dispatch<
    React.SetStateAction<"color-theme" | "font-theme" | "">
  >;
  noteState(state: "all" | "archived" | "tag", tag?: string): void;
};

const NoteUIContext = createContext<NoteUIContext | undefined>(undefined);

export function NoteUIProvider({ children }: { children: React.ReactNode }) {
  const { notes } = useNote();
  const pathname = usePathname();
  const router = useRouter();
  const [tag, setTag] = useState("");

  const sortedNotes = useMemo(
    () => [...notes].sort((a, b) => +new Date(b.lastEdited) - +new Date(a.lastEdited)),
    [notes],
  );

  const [noteId, setNoteId] = useState(sortedNotes[0]?.id);
  const [noteMode, setNoteMode] = useState<"allNotes" | "archivedNotes" | "">(
    "allNotes",
  );
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [showSettings, setShowSettings] = useState<
    "color-theme" | "font-theme" | ""
  >("");

  function noteState(state: "all" | "archived" | "tag", tag?: string) {
    if (state === "all") {
      setTag("");
      setNoteMode("allNotes");
      setShowSettings("");
    }
    if (state === "archived") {
      setTag("");
      setNoteMode("archivedNotes");
      setShowSettings("");
    }
    if (state === "tag") {
      if (tag) setTag(tag);
      setNoteMode("");
      setShowSettings("");
    }
    if (pathname !== "/app") router.push("/app");
  }

  return (
    <NoteUIContext.Provider
      value={{
        tag,
        setTag,
        noteId,
        setNoteId,
        setNoteMode,
        noteMode,
        showCreateNote,
        setShowCreateNote,
        setShowSettings,
        showSettings,
        noteState,
      }}
    >
      {children}
    </NoteUIContext.Provider>
  );
}

export const useNoteUI = () => {
  const context = useContext(NoteUIContext);

  if (!context) {
    throw new Error("NoteUI context was used outside of NoteUI provider");
  }
  return context;
};
