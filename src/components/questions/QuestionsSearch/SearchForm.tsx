import { useRouter } from "next/router";
import { useState } from "react";
import {useQuestionsWithMetadataSearch} from "@/lib/questions/questions";

export default function SearchForm({ query }: any) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(query);
  const { mutate } = useQuestionsWithMetadataSearch(query);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    await router.push({ query: { query: searchText } }, undefined, { shallow: true });
    await mutate();
  };

  return (
    <>
      <form className="relative w-full mb-8" onSubmit={handleFormSubmit}>
        <input
          name="query"
          className="w-full rounded text-night-0 px-4 py-1"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
      </form>
    </>
  );
}
