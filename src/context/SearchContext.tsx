"use client";

import { createContext, useContext, useState } from "react";
import type { SearchResults } from "@/lib/embedding";

type SearchContextType = [
  results: SearchResults | null,
  setResults: (results: SearchResults) => void,
  loading: boolean,
  setLoading: (loading: boolean) => void
];

const searchContext = createContext<SearchContextType | undefined>(undefined);

const useSearch = () => {
  const context = useContext(searchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// poll for search results

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <searchContext.Provider value={[results, setResults, loading, setLoading]}>
      {children}
    </searchContext.Provider>
  );
}

export { useSearch, SearchProvider };
