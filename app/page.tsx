import AllNotes from "@/components/home/AllNotes";

function Page() {
  return (
    <div className="bg-background flex-1 space-y-4 rounded-t-lg px-4 py-5 md:px-8 md:py-6 lg:hidden">
      <h1 className="text-preset-1">All Notes</h1>
      <AllNotes />
    </div>
  );
}

export default Page;
