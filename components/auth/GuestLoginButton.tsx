"use client";

import { useNote } from "@/app/_context/NoteContext";
import { useRouter } from "next/navigation";

function GuestLoginButton() {
  const router = useRouter();
  const { reloadNotes } = useNote();

  return (
    <button
      onClick={() => {
        reloadNotes();
        router.push("/app");
      }}
      className="text-preset-4 text-secondary-foreground underline-offset-2 hover:underline"
    >
      Continue as a guest
    </button>
  );
}

export default GuestLoginButton;
