import { PlusIcon } from "lucide-react";
import Link from "next/link";

function CreateNoteButton() {
  return (
    <Link
      href={"/app/note/createNewNote"}
      className="bg-primary text-neutral-0 fixed right-4 bottom-18 flex size-12 items-center justify-center rounded-full shadow-[0_7px_11px_0_#cacfd8b3] md:bottom-23 dark:shadow-[0_7px_11px_0_#0000004d]"
    >
      <PlusIcon />
    </Link>
  );
}

export default CreateNoteButton;
