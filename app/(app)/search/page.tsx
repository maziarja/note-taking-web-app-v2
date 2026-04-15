import NotesSearchResults from "@/components/search/NotesSearchResults";
import SearchInput from "@/components/search/SearchInput";
import CreateNoteButton from "@/components/shared/CreateNoteButton";
import Container from "@/components/ui/Container";
import { Suspense } from "react";

function Page() {
  return (
    <Container className="space-y-4">
      <h1>Search</h1>
      <Suspense fallback={<p>loading...</p>}>
        <SearchInput />
        <NotesSearchResults />
      </Suspense>
      <CreateNoteButton />
    </Container>
  );
}

export default Page;
