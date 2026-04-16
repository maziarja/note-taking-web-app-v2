import AllNotes from "@/components/home/AllNotes";
import BottomNav from "@/components/shared/BottomNav";
import CreateNoteButton from "@/components/shared/CreateNoteButton";
import Logo from "@/components/shared/Header";
import Container from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();
  console.log(session);
  if (!session) redirect("auth/login");
  return (
    <>
      <Logo className="lg:hidden" />
      <Container className="space-y-4">
        <h1 className="text-preset-1">All Notes</h1>
        <AllNotes />
        <CreateNoteButton />
      </Container>
      <BottomNav />
    </>
  );
}

export default Page;
