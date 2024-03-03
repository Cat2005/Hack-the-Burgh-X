import Graph from "@/components/Graph";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-md border">
      <SearchBar />
      {/* <Graph /> */}
    </main>
  );
}
