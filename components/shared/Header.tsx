import { auth } from "@/lib/auth";
import UserAccountButton from "../auth/UserAccountButton";
import LogoIcon from "./LogoIcon";

async function Header({ className }: { className?: string }) {
  const session = await auth();
  const isLoggedIn = !!session;

  return (
    <div
      className={`${className} bg-secondary lg:bg-background flex items-center justify-between px-4 py-3 md:px-8 md:py-4 lg:px-4 lg:py-3`}
    >
      <LogoIcon />
      <UserAccountButton isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Header;
