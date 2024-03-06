"use client";
import { useSearch } from "@/context/SearchContext";
import React, { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import DocumentView from "./DocumentView";
import { search } from "@/lib/embedding";
import { motion } from "framer-motion";

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
              <p className="text-sm overflow-ellipsis truncate">{r.name}</p>
            </button>
          ))}
      </div>

      {results !== null && (
        <motion.div
          transition={{ duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-[40rem] h-[10rem] bg-neutral-300 blur-2xl rounded-3xl top-[25%] left-1/2 absolute -translate-x-1/2"
        ></motion.div>
      )}

      {selectedDoc !== null && results !== null && (
        <DocumentView
          close={() => setSelectedDoc(null)}
          results={results?.results[selectedDoc]}
        ></DocumentView>
      )}
    </div>
  );
};
