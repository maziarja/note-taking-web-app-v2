"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import NoteDetails from "../note/NoteDetails";
import CreateNewNote from "../note/CreateNewNote";
import FontTheme from "../settings/FontTheme";
import ColorTheme from "../settings/ColorTheme";

function NoteDetailsContainer() {
  const { showCreateNote, showSettings } = useNoteUI();

  if (showCreateNote) return <CreateNewNote />;
  if (showSettings === "font-theme") return <FontTheme />;
  if (showSettings === "color-theme") return <ColorTheme />;

  return <NoteDetails />;
}

export default NoteDetailsContainer;
