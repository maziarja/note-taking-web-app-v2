"use client";

import { ArchiveIcon, ArchiveRestoreIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useNote } from "@/app/_context/NoteContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  noteId: string | undefined;
  mode: "archive" | "restore";
};

function ArchiveNoteDialog({ children, noteId, mode }: Props) {
  const { dispatch } = useNote();
  const router = useRouter();

  function handleToggleRestoreNote() {
    if (noteId) dispatch({ type: "toggled_restore_note", payload: noteId });
    if (mode === "archive") {
      toast.success("Note archived.", {
        action: {
          label: "Archived Notes",
          onClick: () => router.push("/archived"),
        },
      });
    }
    if (mode === "restore") {
      toast.success("Note restored to active notes.", {
        action: {
          label: "All Notes",
          onClick: () => router.push("/"),
        },
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex items-start gap-4">
          <div className="bg-secondary rounded-lg p-2">
            {mode === "archive" ? (
              <ArchiveIcon className="text-secondary-foreground shrink-0" />
            ) : (
              <ArchiveRestoreIcon className="text-secondary-foreground shrink-0" />
            )}
          </div>
          <div className="space-y-1.5 text-left">
            <AlertDialogTitle className="text-preset-3!">
              {mode === "archive" ? "Archive" : "Restore"} Note
            </AlertDialogTitle>
            <AlertDialogDescription className="text-preset-5 text-text-mute">
              Are you sure you want to restore this note?
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size={"xl"} variant={"secondary"}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction size={"xl"} onClick={handleToggleRestoreNote}>
            {mode === "archive" ? "Archive Note" : "Restore Note"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ArchiveNoteDialog;
