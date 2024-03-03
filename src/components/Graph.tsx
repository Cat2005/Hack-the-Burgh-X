"use client";

import * as d3 from "d3";
import Script from "next/script";

export default function Graph() {
  return (
    <>
      <div className="bottom-0 w-full h-full" id="container"></div>
      <Script src="https://cdn.jsdelivr.net/npm/d3@7"></Script>
      <Script src="/script.js"></Script>
    </>
  );
}
