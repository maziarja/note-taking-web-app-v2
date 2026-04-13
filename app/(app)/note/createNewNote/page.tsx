// import CreateNewNote from "@/components/note/CreateNewNote";
import Container from "@/components/ui/Container";
import { Suspense } from "react";

function Page() {
  return (
    <Container className="rounded-t-none">
      <Suspense fallback={<p>loading...</p>}>
        {/* <CreateNewNote /> */}
      </Suspense>
    </Container>
  );
}

export default Page;
