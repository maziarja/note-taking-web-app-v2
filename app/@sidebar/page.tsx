import AllNotes from "@/components/desktop/AllNotesButton";
import ArchivedNotes from "@/components/desktop/ArchivedNotesButton";
import Tags from "@/components/desktop/Tags";

import Logo from "@/components/shared/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function Page() {
  return (
    <div className="hidden space-y-4 border-r py-3 lg:block">
      <Logo />
      <div className="space-y-2 px-4">
        <div className="space-y-1">
          <AllNotes />
          <ArchivedNotes />
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-preset-4 dark: text-neutral-500">Tags</p>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <Tags />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default Page;
