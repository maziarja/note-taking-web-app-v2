import { Alert, AlertDescription } from "@/components/ui/alert";

export default function GuestBanner() {
  return (
    <Alert className="animate-pulse rounded-none border-x-0 border-t-0 text-center">
      <AlertDescription>
        You're in guest mode. Changes aren't saved.{" "}
        <span className="hidden md:inline">Sign in to keep your notes</span>
      </AlertDescription>
    </Alert>
  );
}
