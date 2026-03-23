import NoteDetails from "@/components/note/NoteDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="bg-background flex-1 rounded-t-xl">
      <NoteDetails id={id} />
    </div>
  );
}

export default Page;
