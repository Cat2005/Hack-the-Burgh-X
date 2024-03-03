"use client";

import { useSearch } from "@/context/SearchContext";
import { cn } from "@/lib/utils";
import * as d3 from "d3";
import Script from "next/script";

export default function Graph() {
  const [results, setResults] = useSearch();
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-2 w-full h-full absolute">
        <div
          className={cn(
            "transition-all w-full h-full",
            results !== null && "left-"
          )}
          id="container"
        ></div>
        {results !== null && <div className="bg-red-100 h-full">hello</div>}
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/d3@7"></Script>
      <Script src="/script.js"></Script>
    </>
  );
}
