"use client";

import { useSearch } from "@/context/SearchContext";
import { cn } from "@/lib/utils";
import * as d3 from "d3";
import Script from "next/script";

export default function Graph() {
  return (
    <>
      <div
        className="absolute w-full h-[80%] bottom-0 left-1/2 -translate-x-1/2"
        id="container"
      ></div>
      <Script src="https://cdn.jsdelivr.net/npm/d3@7"></Script>
      <Script src="/script.js"></Script>
    </>
  );
}
