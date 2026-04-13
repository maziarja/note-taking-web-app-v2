import CreateNewNote from "@/components/note/CreateNewNote";
import { Suspense } from "react";

function Page() {
  return (
    <div className="hidden border-r px-6 py-5 lg:block">
      <Suspense fallback={null}>
        <CreateNewNote isDesktop={true} />
      </Suspense>
    </div>
  );
}

export default Page;
