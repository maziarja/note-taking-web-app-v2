import GoogleButton from "@/components/auth/GoogleButton";
import GuestLoginButton from "@/components/auth/GuestLoginButton";
import LoginForm from "@/components/auth/LoginForm";
import LogoIcon from "@/components/shared/LogoIcon";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="bg-background flex flex-col items-center gap-4 rounded-xl border px-4 py-10 shadow-[0_8px_12px_0_#f0f0f099] md:px-8 md:py-12 lg:p-12 dark:shadow-none">
      <LogoIcon />
      <div className="space-y-2 text-center">
        <h1>Welcome to Note</h1>
        <p className="text-preset-5 text-secondary-foreground">
          Please log in to continue
        </p>
      </div>
      <LoginForm />
      <Separator />
      <div className="w-full space-y-4 pt-2 text-center">
        <p className="text-preset-5 text-secondary-foreground">
          Or log in with:
        </p>
        <GoogleButton />
        <GuestLoginButton />
      </div>
      <Separator />
      <p className="text-preset-5 text-secondary-foreground">
        No account yet?{" "}
        <Link href={"/auth/signup"} className="text-foreground">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Page;
