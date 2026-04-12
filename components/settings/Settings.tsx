"use client";

import {
  ChevronRightIcon,
  LockKeyholeIcon,
  LogOutIcon,
  SunIcon,
  TypeIcon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

function Settings() {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <Link
        href={"/settings/color-theme"}
        className={`text-preset-4 flex items-center gap-2 rounded-md p-2 py-2 ${pathname === "/settings/color-theme" ? "bg-secondary" : ""}`}
      >
        <SunIcon size={20} />
        <span>Color Theme</span>
        <ChevronRightIcon
          className={`ml-auto hidden size-4 md:inline-block ${pathname === "/settings/color-theme" ? "" : "lg:hidden"}`}
        />
      </Link>
      <Link
        href={"/settings/font-theme"}
        className={`text-preset-4 flex items-center gap-2 rounded-md p-2 py-2 ${pathname === "/settings/font-theme" ? "bg-secondary" : ""}`}
      >
        <TypeIcon size={20} />
        <span>Font Theme</span>
        <ChevronRightIcon
          className={`ml-auto hidden size-4 md:inline-block ${pathname === "/settings/font-theme" ? "" : "lg:hidden"}`}
        />
      </Link>
      <Link
        href={"/settings/change-password"}
        className={`text-preset-4 flex items-center gap-2 rounded-md p-2 py-2 ${pathname === "/settings/change-password" ? "bg-secondary" : ""}`}
      >
        <LockKeyholeIcon size={20} />
        <span>Change Password</span>
        <ChevronRightIcon
          className={`ml-auto hidden size-4 md:inline-block ${pathname === "/settings/change-password" ? "" : "lg:hidden"}`}
        />
      </Link>
      <Separator />
      <button className="text-preset-4 flex cursor-pointer items-center gap-2 rounded-md p-2 py-2">
        <LogOutIcon size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Settings;
