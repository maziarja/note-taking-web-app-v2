import CreateNewNote from "@/components/note/CreateNewNote";
import Container from "@/components/ui/Container";
import { Suspense } from "react";

function Page() {
  return (
    <Container className="rounded-t-none">
      <CreateNewNote />
    </Container>
  );
}

export default Page;
