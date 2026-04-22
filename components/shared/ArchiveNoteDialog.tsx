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
import { updateArchivedNote } from "@/app/_actions/note/updateArchivedNote";
import { useNoteUI } from "@/app/_context/NoteUIContext";

type Props = {
  children: React.ReactNode;
  noteId: string | undefined;
  mode: "archive" | "restore";
  isDesktop?: boolean;
};

function ArchiveNoteDialog({
  children,
  noteId,
  mode,
  isDesktop = false,
}: Props) {
  const { dispatch, userAuthenticated } = useNote();
  const { noteState } = useNoteUI();
  const router = useRouter();

  async function handleToggleRestoreNote() {
    const nextArchivedState = mode === "archive";
    try {
      if (mode === "archive" && noteId) {
        dispatch({
          type: "set_archived_note",
          payload: { noteId, isArchived: true },
        });

        if (userAuthenticated) await updateArchivedNote(noteId, true);

        toast.success("Note archived.", {
          action: {
            label: "Archived Notes",
            onClick: () => {
              isDesktop ? noteState("archived") : router.push("/app/archived");
            },
          },
        });
      }

      if (mode === "restore" && noteId) {
        dispatch({
          type: "set_archived_note",
          payload: { noteId, isArchived: false },
        });

        if (userAuthenticated) await updateArchivedNote(noteId, false);

        toast.success("Note restored to active notes.", {
          action: {
            label: "All Notes",
            onClick: () => {
              isDesktop ? noteState("all") : router.push("/app");
            },
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed. Changes reverted.");
      // rollback for optimistic UI
      if (noteId)
        dispatch({
          type: "set_archived_note",
          payload: { noteId, isArchived: !nextArchivedState },
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
