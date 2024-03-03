'use client'
import { useSearch } from '@/context/SearchContext'
import React, { useEffect, useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';


export const Thumbnails = (props: {}) => {
  const [results, setResults] = useSearch();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  return (
    <div className="flex gap-2 w-full h-full">
      {results?.map((result) => {
        return (
          // paper aspect ratio
          <AspectRatio ratio={9 / 16} key={result.documentId} className='w-60 h-60'>
            <img
              src={result.thumbnail}
              alt={"TES"}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        )
      }
      )}
    </div>
  )
}
