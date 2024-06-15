import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [results, setResults] = useState([]);

    return (
        <SearchContext.Provider value={{
            query, setQuery,
            searchTerm, setSearchTerm,
            hasSearched, setHasSearched,
            results, setResults
        }}>
            {children}
        </SearchContext.Provider>
    );
};