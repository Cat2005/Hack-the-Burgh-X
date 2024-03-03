'use client'
import { useSearch } from '@/context/SearchContext'
import React, { useEffect, useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import DocumentView from './DocumentView';


export const Thumbnails = (props: {}) => {
  const [results, setResults] = useSearch();
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
  return (
    <div className="flex gap-2 w-full h-full">
      {results?.map((result, index) => {
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
      {selectedDoc !== null && (
        <DocumentView documentName={results![selectedDoc]!.name} documentTags={results![selectedDoc]!.tags} documentUrl={results![selectedDoc]!.url} comments={[]} />
      )}
    </div>
  )
}
