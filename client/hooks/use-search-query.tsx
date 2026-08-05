"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/*
  Both the Heading's big glass search box and the Navbar's compact search
  need to represent the *same* query as one fades out and the other fades
  in on scroll. Without this, they're two separate uncontrolled inputs —
  type something in the hero, scroll down, and it's gone from the navbar's
  box. A React Context is the simplest fix since Navbar and Heading are
  siblings rendered from the same layout, not a parent/child pair.

  Wrap whatever layout renders both <Navbar /> and <Heading /> with
  <SearchQueryProvider>, then swap the local `useState` inside your
  existing Search component (app/_components/search.tsx) for
  `useSearchQuery()` too, so all three — this file, Search, and Heading —
  read from one source of truth.
*/

type SearchQueryContextValue = {
  query: string;
  setQuery: (value: string) => void;
};

const SearchQueryContext = createContext<SearchQueryContextValue | undefined>(undefined);

export function SearchQueryProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <SearchQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

export function useSearchQuery() {
  const ctx = useContext(SearchQueryContext);
  if (!ctx) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }
  return ctx;
}