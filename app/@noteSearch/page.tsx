import SearchQuery from "@/components/desktop/SearchQuery";
import { Suspense } from "react";

function Page() {
  return (
    <div className="hidden lg:block">
      <Suspense fallback={null}>
        <SearchQuery />
      </Suspense>
    </div>
  );
}

export default Page;
