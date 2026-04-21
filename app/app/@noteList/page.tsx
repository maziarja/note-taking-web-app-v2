import NoteListContainer from "@/components/desktop/NoteListContainer";

async function Page() {
  return (
    <div className="hidden h-full space-y-4 border-r py-5 pr-4 pl-8 lg:block">
      <NoteListContainer />
    </div>
  );
}

export default Page;
