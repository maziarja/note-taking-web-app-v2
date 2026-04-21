"use client";

import { Suspense } from "react";
import NoteList from "./NoteList";
import { useNoteUI } from "@/app/_context/NoteUIContext";
import Settings from "../settings/Settings";

function NoteListContainer() {
  const { showSettings } = useNoteUI();

  return (
    <>
      {showSettings ? (
        <Settings />
      ) : (
        <Suspense fallback={<p>loading...</p>}>
          <NoteList />
        </Suspense>
      )}
    </>
  );
}

export default NoteListContainer;
