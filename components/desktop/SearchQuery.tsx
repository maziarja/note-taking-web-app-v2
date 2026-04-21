"use client";

import { SettingsIcon } from "lucide-react";
import SearchInput from "../search/SearchInput";
import { usePathname, useSearchParams } from "next/navigation";
import { useNoteUI } from "@/app/_context/NoteUIContext";

function SearchQuery() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const pathname = usePathname();
  const {
    tag,
    setShowSettings,
    noteMode,
    setNoteId,
    setNoteMode,
    showSettings,
    setTag,
    setShowCreateNote,
  } = useNoteUI();

  function handleClickSettings() {
    setShowSettings("color-theme");
    setShowCreateNote(false);
    setNoteMode("");
    setTag("");
    setNoteId("");
  }

  return (
    <div className="flex h-20.25 items-center justify-between border-b pr-6 pl-8">
      <p className="text-preset-1">
        {pathname === "/app" &&
          noteMode === "allNotes" &&
          !tag &&
          !query &&
          !showSettings &&
          "All Notes"}
        {pathname === "/app" &&
          noteMode === "archivedNotes" &&
          !query &&
          "Archived Notes"}
        {pathname === "/app" && tag && !query && (
          <>
            <span className="text-secondary-foreground">Notes Tagged:</span>{" "}
            {tag}{" "}
          </>
        )}
        {showSettings && "Settings"}
        {query && !showSettings && (
          <>
            <span className="text-secondary-foreground">
              Showing results for:
            </span>{" "}
            {<span className="capitalize">{query}</span>}{" "}
          </>
        )}
      </p>
      <div className="flex items-center gap-5">
        <div className="w-75">
          <SearchInput isDesktop={true} />
        </div>
        <button
          onClick={handleClickSettings}
          className="flex items-center justify-center"
        >
          <SettingsIcon className="text-secondary-foreground" />
        </button>
      </div>
    </div>
  );
}

export default SearchQuery;
