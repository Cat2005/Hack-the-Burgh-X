import Graph from "@/components/Graph";
import SearchBar from "@/components/SearchBar";
import { DropZone } from "@/components/upload";

export default function Home() {
  return (
    <DropZone>
      <main className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-xl border shadow-sm">
        <SearchBar />
        <Graph />
      </main>
    </DropZone>
  );
}
