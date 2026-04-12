import NoteDetails from "@/components/note/NoteDetails";

function Page() {
  return (
    <div className="hidden border-r px-6 lg:block">
      <NoteDetails isDesktop={true} />
    </div>
  );
}

export default Page;
