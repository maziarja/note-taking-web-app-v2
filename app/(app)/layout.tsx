import BottomNav from "@/components/shared/BottomNav";
import Logo from "@/components/shared/Header";

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Logo className="lg:hidden" />
      {children}
      <BottomNav />
    </>
  );
}

export default AppLayout;
