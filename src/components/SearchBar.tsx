"use client";

import { search } from "@/lib/embedding";
import { SearchIcon } from "lucide-react";
import { useRef } from "react";
import { FormEvent } from "react";

export default function SearchBar() {
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current) return;
    const query = ref.current.value;
    ref.current.value = "";

    const res = await search(query)
    console.log(res)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border flex rounded-full px-3 py-2 bg-white items-center gap-2 focus-within:border-[1.5px] focus-within:border-black w-[30rem] absolute top-[20%] left-1/2 -translate-x-1/2"
    >
      <SearchIcon className="w-5 h-5 text-gray-300" />
      <input
        ref={ref}
        name="search-box"
        className="focus:outline-none w-full"
        placeholder="Search"
      />
    </form>
  );
}
