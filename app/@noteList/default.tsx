import NoteList from "@/components/desktop/NoteList";
import { Suspense } from "react";

function Default() {
  return (
    <div className="hidden space-y-4 border-r py-5 pr-4 pl-8 lg:block">
      <Suspense fallback={<p>loading...</p>}>
        <NoteList />
      </Suspense>
    </div>
  );
}

export default Default;
