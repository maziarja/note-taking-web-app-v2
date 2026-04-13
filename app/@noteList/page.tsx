import NoteList from "@/components/desktop/NoteList";

async function Page() {
  return (
    <div className="hidden space-y-4 border-r py-5 pr-4 pl-8 lg:block">
      <NoteList />
    </div>
  );
}

export default Page;
