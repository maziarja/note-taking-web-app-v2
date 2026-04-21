import CreateNoteButton from "@/components/shared/CreateNoteButton";
import TagCard from "@/components/tags/TagCard";
import Container from "@/components/ui/Container";

function Page() {
  return (
    <Container className="space-y-4">
      <h1>Tags</h1>
      <TagCard />
      <CreateNoteButton />
    </Container>
  );
}

export default Page;
