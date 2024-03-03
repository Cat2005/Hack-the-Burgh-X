import Graph from "@/components/Graph";
import { SearchIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-md border">
      <SearchBar />
      <Graph />
    </main>
  );
}

function SearchBar() {
  return (
    <div className="border flex rounded-full px-3 py-2 bg-white items-center gap-2 focus-within:border-[1.5px] focus-within:border-black w-[30rem] absolute top-[20%] left-1/2 -translate-x-1/2">
      <SearchIcon className="w-5 h-5 text-gray-300" />
      <input
        name="search-box"
        className="focus:outline-none w-full"
        placeholder="Search"
      />
    </div>
  );
}
