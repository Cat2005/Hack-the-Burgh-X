"use client";

import { createContext, useContext, useState } from "react";
import type { SearchResults } from "@/lib/embedding";

type SearchContextType = [
  results: SearchResults | null,
  setResults: (results: SearchResults) => void
];

const searchContext = createContext<SearchContextType | undefined>(undefined);

const useSearch = () => {
  const context = useContext(searchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<SearchResults | null>(null);
  return (
    <searchContext.Provider value={[results, setResults]}>
      {children}
    </searchContext.Provider>
  );
}

export { useSearch, SearchProvider };
