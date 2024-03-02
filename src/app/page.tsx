import SearchResult from "@/components/SearchResult";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-md border">
      <div className="border flex rounded-full px-3 py-2 bg-white items-center gap-2 focus-within:border-[1.5px] focus-within:border-black w-80">
        <SearchIcon className="w-5 h-5 text-gray-300" />
        <input
          name="search-box"
          className="focus:outline-none w-full"
          placeholder="Search"
        />
      </div>
    </main>
  );
}
