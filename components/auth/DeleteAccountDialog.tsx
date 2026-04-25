"use client";

import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAccount } from "@/app/_actions/auth/deleteAccount";
import { logout } from "@/app/_actions/auth/logout";
import { useNote } from "@/app/_context/NoteContext";
import initialNotes from "@/data.json";

export default function DeleteAccountDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dispatch } = useNote();

  async function handleDeleteAccount() {
    const result = await deleteAccount();

    if (result?.success) {
      dispatch({ type: "user_authenticated", payload: false });
      dispatch({ type: "set_notes", payload: initialNotes.notes });
      await logout();
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your account and all associated data
            will be permanently deleted. You will not be able to recover
            anything once this is done.{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size={"lg"} variant="outline">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            size={"lg"}
            onClick={handleDeleteAccount}
            variant="destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
