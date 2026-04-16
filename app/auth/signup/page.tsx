import GoogleButton from "@/components/auth/GoogleButton";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
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
        <h1>Create Your Account</h1>
        <p className="text-preset-5 text-secondary-foreground">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </div>
      <SignupForm />
      <Separator />
      <div className="w-full space-y-4 pt-2 text-center">
        <p className="text-preset-5 text-secondary-foreground">
          Or log in with:
        </p>
        <GoogleButton />
      </div>
      <Separator />
      <p className="text-preset-5 text-secondary-foreground">
        Already have an account?{" "}
        <Link href={"/auth/login"} className="text-foreground">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Page;
