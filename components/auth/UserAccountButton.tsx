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

type Props = {
  isLoggedIn: boolean;
};

function UserAccountButton({ isLoggedIn }: Props) {
  const router = useRouter();

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
              <DropdownMenuItem onClick={async () => logout()}>
                <LogOutIcon />
                Logout
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserRoundXIcon />
                Delete account
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
