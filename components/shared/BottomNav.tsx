"use client";

import {
  ArchiveIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TagIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="divide-secondary bg-background fixed bottom-0 flex w-full border-t px-4 py-3 shadow-[0_-4px_6px_0_#f0f0f099] md:divide-x lg:hidden dark:shadow-[0_-5px_6px_0_#00000080]">
      <div className="w-full">
        <Link
          href={"/app"}
          className={`${pathname === "/app" ? "text-primary bg-accent dark:bg-neutral-700" : "stroke-secondary-foreground"} flex w-full max-w-20 flex-col items-center gap-1 justify-self-center rounded-sm py-1`}
        >
          <HomeIcon />
          <span className="text-preset-6 hidden md:block">Home</span>
        </Link>
      </div>
      <div className="w-full">
        <Link
          href={"/app/search"}
          className={`${pathname === "/app/search" ? "text-primary bg-accent dark:bg-neutral-700" : "text-secondary-foreground"} flex w-full max-w-20 flex-col items-center gap-1 justify-self-center rounded-sm py-1`}
        >
          <SearchIcon />
          <span className="text-preset-6 hidden md:block">Search</span>
        </Link>
      </div>
      <div className="w-full">
        <Link
          href={"/app/archived"}
          className={`${pathname === "/app/archived" ? "text-primary bg-accent dark:bg-neutral-700" : "text-secondary-foreground"} flex w-full max-w-20 flex-col items-center gap-1 justify-self-center rounded-sm py-1`}
        >
          <ArchiveIcon />
          <span className="text-preset-6 hidden md:block">Archived</span>
        </Link>
      </div>
      <div className="w-full">
        <Link
          href={"/app/tags"}
          className={`${pathname === "/app/tags" ? "text-primary bg-accent dark:bg-neutral-700" : "text-secondary-foreground"} flex w-full max-w-20 flex-col items-center gap-1 justify-self-center rounded-sm py-1`}
        >
          <TagIcon />
          <span className="text-preset-6 hidden md:block">Tags</span>
        </Link>
      </div>
      <div className="w-full">
        <Link
          href={"/app/settings"}
          className={`${pathname === "/app/settings" ? "text-primary bg-accent dark:bg-neutral-700" : "text-secondary-foreground"} flex w-full max-w-20 flex-col items-center gap-1 justify-self-center rounded-sm py-1`}
        >
          <SettingsIcon />
          <span className="text-preset-6 hidden md:block">Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;
