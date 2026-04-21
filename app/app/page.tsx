import AllNotes from "@/components/home/AllNotes";
import CreateNoteButton from "@/components/shared/CreateNoteButton";
import Container from "@/components/ui/Container";

function Page() {
  return (
    <>
      <Container className="space-y-4">
        <h1 className="text-preset-1">All Notes</h1>
        <AllNotes />
        <CreateNoteButton />
      </Container>
    </>
  );
}

export default Page;
