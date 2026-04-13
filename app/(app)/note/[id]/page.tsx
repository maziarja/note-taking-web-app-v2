export const dynamic = "force-dynamic";

import NoteDetails from "@/components/note/NoteDetails";
import Container from "@/components/ui/Container";

async function Page() {
  return (
    <Container>
      <NoteDetails />
    </Container>
  );
}

export default Page;
