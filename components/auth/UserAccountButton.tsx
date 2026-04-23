"use client";

import { CircleUserRoundIcon, LogOutIcon, UserRoundXIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/app/_actions/auth/logout";
import { useNote } from "@/app/_context/NoteContext";
import DeleteAccountDialog from "./DeleteAccountDialog";
import initialNotes from "@/data.json";

type Props = {
  isLoggedIn: boolean;
};

function UserAccountButton({ isLoggedIn }: Props) {
  const router = useRouter();
  const { dispatch } = useNote();

  async function logoutUser() {
    dispatch({ type: "user_authenticated", payload: false });
    dispatch({ type: "set_notes", payload: initialNotes.notes });
    await logout();
  }

  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon-lg"}>
              <CircleUserRoundIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="shadow-2xl drop-shadow-xl"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={logoutUser}>
                <LogOutIcon />
                Logout
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <DeleteAccountDialog>
                  <div className="flex items-center gap-1.5">
                    <UserRoundXIcon />
                    <span>Delete account</span>
                  </div>
                </DeleteAccountDialog>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => router.push("/auth/login")}
          variant={"outline"}
          size={"icon-lg"}
        >
          <CircleUserRoundIcon />
        </Button>
      )}
    </>
  );
}

export default UserAccountButton;
