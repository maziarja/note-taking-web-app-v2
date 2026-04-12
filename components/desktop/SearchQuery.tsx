"use client";

import { SettingsIcon } from "lucide-react";
import SearchInput from "../search/SearchInput";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useNoteUI } from "@/app/_context/NoteUIContext";

function SearchQuery() {
  const pathname = usePathname();
  const { tag, isArchivedNotes } = useNoteUI();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div className="flex h-20.25 items-center justify-between border-b pr-6 pl-8">
      <p className="text-preset-1">
        {pathname === "/" && !isArchivedNotes && !tag && !query && "All Notes"}
        {pathname === "/note/createNewNote" && !query && "All Notes"}
        {pathname === "/" && isArchivedNotes && !query && "Archived Notes"}
        {pathname === "/" && tag && !query && (
          <>
            <span className="text-secondary-foreground">Notes Tagged:</span>{" "}
            {tag}{" "}
          </>
        )}
        {pathname.startsWith("/settings") && "Settings"}
        {query && (
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
        <Link
          href={"/settings/color-theme"}
          className="flex items-center justify-center"
        >
          <SettingsIcon className="text-secondary-foreground" />
        </Link>
      </div>
    </div>
  );
}

export default SearchQuery;
