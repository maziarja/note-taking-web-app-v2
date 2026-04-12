import NoteDetails from "@/components/note/NoteDetails";

function Default() {
  return (
    <div className="hidden border-r px-6 py-5 lg:block">
      <NoteDetails isDesktop={true} />
    </div>
  );
}

export default Default;
