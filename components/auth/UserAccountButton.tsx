"use client";

import { CircleUserRoundIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function UserAccountButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/auth/login")}
      variant={"outline"}
      size={"icon-lg"}
    >
      <CircleUserRoundIcon />
    </Button>
  );
}

export default UserAccountButton;
