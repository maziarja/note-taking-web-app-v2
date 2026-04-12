import UserAccountButton from "../auth/UserAccountButton";
import LogoIcon from "./LogoIcon";

function Header({ className }: { className?: string }) {
  return (
    <div
      className={`${className} bg-secondary lg:bg-background flex items-center justify-between px-4 py-3 md:px-8 md:py-4 lg:px-4 lg:py-3`}
    >
      <LogoIcon />
      <UserAccountButton />
    </div>
  );
}

export default Header;
