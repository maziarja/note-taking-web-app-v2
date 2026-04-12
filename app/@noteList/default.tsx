import NoteList from "@/components/desktop/NoteList";
import Link from "next/link";

function Default() {
  return (
    <div className="hidden space-y-4 border-r py-5 pr-4 pl-8 lg:block">
      <NoteList />
    </div>
  );
}

export default Default;
