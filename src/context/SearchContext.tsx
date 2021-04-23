import { createContext, useCallback, useState, FC } from "react";
import useNotes from "../firebase/hooks/useNotes";
import Note from "../interfaces/note.interface";

export const SearchContext = createContext<{
  searchTerm?: string;
  setSearchTerm: (q: string) => void;
  searchResults: Note[];
}>({
  searchTerm: "",
  setSearchTerm: (_) => {},
  searchResults: [],
});

export const SearchProvider: FC = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const { search } = useNotes();

  const changeSearchTerm = useCallback(
    (q) => {
      setSearchTerm(q.trim());
      setSearchResults(search(q.trim()));
    },
    [search]
  );

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm: changeSearchTerm, searchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};
