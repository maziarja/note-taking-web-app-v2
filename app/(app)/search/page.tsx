import NotesSearchResults from "@/components/search/NotesSearchResults";
import SearchInput from "@/components/search/SearchInput";
import CreateNoteButton from "@/components/shared/CreateNoteButton";
import Container from "@/components/ui/Container";

function Page() {
  return (
    <Container className="space-y-4">
      <h1>Search</h1>
      <SearchInput />
      <NotesSearchResults />
      <CreateNoteButton />
    </Container>
  );
}

export default Page;
