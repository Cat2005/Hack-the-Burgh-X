'use client'
import { useSearch } from '@/context/SearchContext'
import React, { useEffect, useRef, useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import DocumentView from './DocumentView';
import { search } from '@/lib/embedding';


export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(() => {
    console.log('Default useInterval callback, unreachable');
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
  const [results, setResults] = useSearch();
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  useInterval(async () => {
    if (results === null) return;
    console.log('polling for new search results');
    setResults(await search(results!.query));
  }, 2000);

  return (
    <div className="flex gap-2 w-full h-full">
      {results?.results.map((result, index) => {
        return (
          // paper aspect ratio
          <AspectRatio ratio={9 / 16} key={result.documentId} className='w-60 h-60'
            onClick={() => {
              setSelectedDoc(index)
            }}
          >
            <img
              src={result.thumbnail}
              alt={"TES"}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        )
      }
      )}
      {selectedDoc !== null && results !== null && (
        <DocumentView results={results.results[selectedDoc]} />
      )}
    </div>
  )
}
