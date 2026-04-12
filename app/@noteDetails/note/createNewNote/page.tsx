import CreateNewNote from "@/components/note/CreateNewNote";

function Page() {
  return (
    <div className="hidden border-r px-6 py-5 lg:block">
      <CreateNewNote isDesktop={true} />
    </div>
  );
}

export default Page;
