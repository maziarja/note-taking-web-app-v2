import CreateNoteButton from "@/components/shared/CreateNoteButton";
import TagSelectedNotes from "@/components/tags/TagSelectedNotes";
import Container from "@/components/ui/Container";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    tag: string;
  }>;
};

async function Page({ params }: Props) {
  const { tag } = await params;

  return (
    <Container>
      <div className="space-y-4">
        <Link
          href={"/app/tags"}
          className="text-secondary-foreground text-preset-5 flex items-center gap-1"
        >
          <ChevronLeftIcon size={18} />
          <span>Go Back</span>
        </Link>
        <h1 className="text-secondary-foreground">
          Notes Tagged:{" "}
          <span className="text-foreground capitalize">{tag}</span>
        </h1>
        <p className="text-preset-5 text-text-mute">
          All notes with the ”Dev” tag are shown here.
        </p>
        <TagSelectedNotes tag={tag} />
      </div>
      <CreateNoteButton />
    </Container>
  );
}

export default Page;
