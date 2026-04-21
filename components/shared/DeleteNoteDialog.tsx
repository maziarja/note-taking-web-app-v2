"use client";
import { deleteNote } from "@/app/_actions/note/deleteNote";
import { useNote } from "@/app/_context/NoteContext";
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
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  noteId: string | undefined;
};

function DeleteNoteDialog({ children, noteId }: Props) {
  const router = useRouter();
  const { notes, dispatch, userAuthenticated } = useNote();

  async function handleDeleteNote() {
    const noteToDelete = notes.find((note) => note.id === noteId);

    if (noteId) dispatch({ type: "deleted_note", payload: noteId });

    try {
      if (userAuthenticated && noteId) await deleteNote(noteId);

      router.push("/app");
      toast.success("Note permanently deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Changes reverted.");

      if (noteToDelete)
        dispatch({ type: "restore_deleted_note", payload: noteToDelete });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex items-start gap-4">
          <div className="bg-secondary rounded-lg p-2">
            <Trash2Icon className="text-secondary-foreground shrink-0" />
          </div>
          <div className="space-y-1.5 text-left">
            <AlertDialogTitle className="text-preset-3!">
              Delete Note
            </AlertDialogTitle>
            <AlertDialogDescription className="text-preset-5 text-text-mute">
              Are you sure you want to permanently delete this note? This action
              cannot be undone.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size={"xl"} variant={"secondary"}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            size={"xl"}
            variant={"destructive"}
            onClick={handleDeleteNote}
          >
            Delete Note
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNoteDialog;
