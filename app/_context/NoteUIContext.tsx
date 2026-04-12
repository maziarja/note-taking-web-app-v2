"use client";

import { createContext, useContext, useState } from "react";
import { useNote } from "./NoteContext";

type NoteUIContext = {
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  noteId: string;
  setNoteId: React.Dispatch<React.SetStateAction<string>>;
  isArchivedNotes: boolean;
  setIsArchivedNotes: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteUIContext = createContext<NoteUIContext | undefined>(undefined);

export function NoteUIProvider({ children }: { children: React.ReactNode }) {
  const { notes } = useNote();
  const [tag, setTag] = useState("");
  const [noteId, setNoteId] = useState(notes[0].id);
  const [isArchivedNotes, setIsArchivedNotes] = useState(false);

  return (
    <NoteUIContext.Provider
      value={{
        tag,
        setTag,
        noteId,
        setNoteId,
        isArchivedNotes,
        setIsArchivedNotes,
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
