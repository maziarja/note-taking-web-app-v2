"use client";

import { useNoteUI } from "@/app/_context/NoteUIContext";
import { ChevronRightIcon, SunIcon, TypeIcon } from "lucide-react";
import Link from "next/link";

function Settings() {
  const { setShowCreateNote, setShowSettings, showSettings } = useNoteUI();

  return (
    <div className="space-y-2">
      <Link
        href={"/app/settings/color-theme"}
        className={`text-preset-4 flex items-center gap-2 rounded-md p-2 py-2 lg:hidden`}
      >
        <SunIcon size={20} />
        <span>Color Theme</span>
        <ChevronRightIcon className={`ml-auto hidden size-4 md:inline-block`} />
      </Link>
      <Link
        href={"/app/settings/font-theme"}
        className={`text-preset-4 flex items-center gap-2 rounded-md p-2 py-2 lg:hidden`}
      >
        <TypeIcon size={20} />
        <span>Font Theme</span>
        <ChevronRightIcon className={`ml-auto hidden size-4 md:inline-block`} />
      </Link>
      <button
        onClick={() => {
          setShowSettings("color-theme");
          setShowCreateNote(false);
        }}
        className={`text-preset-4 hidden w-full items-center gap-2 rounded-md p-2 py-2 lg:flex ${showSettings === "color-theme" ? "bg-secondary" : ""}`}
      >
        <SunIcon size={20} />
        <span>Color Theme</span>
        <ChevronRightIcon
          className={`ml-auto hidden size-4 md:inline-block ${showSettings === "color-theme" ? "" : "lg:hidden"}`}
        />
      </button>
      <button
        onClick={() => {
          setShowSettings("font-theme");
          setShowCreateNote(false);
        }}
        className={`text-preset-4 hidden w-full items-center gap-2 rounded-md p-2 py-2 lg:flex ${showSettings === "font-theme" ? "bg-secondary" : ""}`}
      >
        <TypeIcon size={20} />
        <span>Font Theme</span>
        <ChevronRightIcon
          className={`ml-auto hidden size-4 md:inline-block ${showSettings === "font-theme" ? "" : "lg:hidden"}`}
        />
      </button>
    </div>
  );
}

export default Settings;
