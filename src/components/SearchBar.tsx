"use client";

import { useSearch } from "@/context/SearchContext";
import { search } from "@/lib/embedding";
import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { FormEvent } from "react";

export default function SearchBar() {
  const ref = useRef<HTMLInputElement>(null);
  const [results, setResults] = useSearch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current) return;
    const query = ref.current.value.trim();

    if (!query) return;

    const res = await search(query);
    setResults(res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="z-10 font-medium border-2 flex rounded-full px-3 py-2 bg-white items-center gap-2 focus-within:border-2 focus-within:border-neutral-400 w-[30rem] absolute top-[15%] left-1/2 -translate-x-1/2 shadow-sm"
    >
      <SearchIcon className="w-8 h-8 text-gray-400" />
      <input
        ref={ref}
        name="search-box"
        className="focus:outline-none w-full text-3xl placeholder-gray-400"
        placeholder="Search"
      />
    </form>
  );
}
