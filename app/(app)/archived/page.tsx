import ArchivedNotes from "@/components/archived/ArchivedNotes";
import CreateNoteButton from "@/components/shared/CreateNoteButton";
import Container from "@/components/ui/Container";

function Page() {
  return (
    <Container className="space-y-4">
      <div className="space-y-2">
        <h1>Archived Notes</h1>
        <p className="text-preset-5 text-text-mute">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      </div>
      <ArchivedNotes />
      <CreateNoteButton />
    </Container>
  );
}

export default Page;
