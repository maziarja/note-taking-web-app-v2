import SearchQuery from "@/components/desktop/SearchQuery";
import { Suspense } from "react";

function Default() {
  return (
    <div className="hidden lg:block">
      <Suspense fallback={<p>loading...</p>}>
        <SearchQuery />
      </Suspense>
    </div>
  );
}

export default Default;
