import Tags from "@/components/desktop/Tags";
import Logo from "@/components/shared/Header";
import { Separator } from "@/components/ui/separator";
import { ArchiveIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

function Default() {
  return (
    <div className="hidden space-y-4 border-r py-3 lg:block">
      <Logo />
      <div className="space-y-2 px-4">
        <div className="space-y-1">
          <Link
            href={"/"}
            className="text-text-mute text-preset-4 flex items-center gap-2 px-3 py-2.5"
          >
            <HomeIcon size={20} />
            <span>All Notes</span>
          </Link>
          <Link
            href={"/"}
            className="text-text-mute text-preset-4 flex items-center gap-2 px-3 py-2.5"
          >
            <ArchiveIcon size={20} />
            <span>Archived Notes</span>
          </Link>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-preset-4 dark: text-neutral-500">Tags</p>
          <Tags />
        </div>
      </div>
    </div>
  );
}

export default Default;
