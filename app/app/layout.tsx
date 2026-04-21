import GuestBanner from "@/components/auth/GuestBanner";
import BottomNav from "@/components/shared/BottomNav";
import Logo from "@/components/shared/Header";
import { auth } from "@/lib/auth";

async function AppLayout({
  children,
  sidebar,
  noteList,
  noteDetails,
  noteSearch,
  noteActions,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  noteList: React.ReactNode;
  noteDetails: React.ReactNode;
  noteSearch: React.ReactNode;
  noteActions: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      {!session && <GuestBanner />}
      <Logo className="lg:hidden" />
      {children}
      <div className="hidden min-h-dvh lg:grid lg:grid-cols-[210px_1fr] xl:grid-cols-[272px_1fr]">
        {sidebar}
        <div className="flex w-full flex-col">
          <div>{noteSearch}</div>
          <div className="flex h-full w-full">
            <div className="w-67.5 shrink-0 xl:w-72.5">{noteList}</div>
            <div className="flex-1">{noteDetails}</div>
            <div className="w-17.5 shrink-0 xl:w-62.5">{noteActions}</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}

export default AppLayout;
