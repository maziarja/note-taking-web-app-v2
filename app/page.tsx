import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();
  if (session) {
    redirect("/app");
  } else {
    redirect("/auth/login");
  }
}

export default Page;
