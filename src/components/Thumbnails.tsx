"use client";
import { useSearch } from "@/context/SearchContext";
import React, { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import DocumentView from "./DocumentView";
import { search } from "@/lib/embedding";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(() => {
    console.log("Default useInterval callback, unreachable");
  });

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export const Thumbnails = (props: {}) => {
  const [results, setResults, loading, setLoading] = useSearch();
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  return (
    <div className="absolute top-[25%]">
      <div className="flex gap-3">
        {!loading &&
          results?.results.map((r, i) => (
            <button
              className="z-50 w-[10rem] overflow-ellipsis"
              key={`document-${i}`}
              onClick={() => setSelectedDoc(i)}
            >
              <img
                src={r.thumbnail}
                alt={"TES"}
                className="rounded-md object-cover w-[10rem] h-[10rem] border bg-white"
              />
              <p className="overflow-ellipsis">{r.name}</p>
            </button>
          ))}
      </div>
      {selectedDoc !== null && results !== null && (
        <DocumentView results={results?.results[selectedDoc]}></DocumentView>
      )}
    </div>
  );
};
