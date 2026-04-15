"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  isDesktop?: boolean;
};

function SearchInput({ isDesktop = false }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  function handleChangeInput(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const value = e.target.value;
    if (value) {
      params?.set("query", value);
    } else {
      params?.delete("query");
    }
    router.push(`?${params?.toString()}`);
  }

  return (
    <>
      <InputGroup>
        <InputGroupInput
          onChange={handleChangeInput}
          defaultValue={query || ""}
          className="text-preset-5 capitalize"
          placeholder="Search by title, content, or tags..."
        />
        <InputGroupAddon>
          <SearchIcon className="size-5" />
        </InputGroupAddon>
      </InputGroup>

      {query && !isDesktop && (
        <p className="text-preset-5 text-text-mute">
          All notes matching ”{<span className="capitalize">{query}</span>}” are
          displayed below.
        </p>
      )}
    </>
  );
}

export default SearchInput;
