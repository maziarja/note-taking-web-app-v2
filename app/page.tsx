import AllNotes from "@/components/home/AllNotes";
import BottomNav from "@/components/shared/BottomNav";
import CreateNoteButton from "@/components/shared/CreateNoteButton";
import Logo from "@/components/shared/Header";
import Container from "@/components/ui/Container";
import connectDB from "@/lib/database";

async function Page() {
  connectDB();
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
