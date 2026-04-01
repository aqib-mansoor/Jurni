import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  isSearchModalOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  setSearchModalOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearch = () => setIsSearchModalOpen(true);
  const closeSearch = () => setIsSearchModalOpen(false);

  return (
    <SearchContext.Provider value={{ 
      isSearchModalOpen, 
      openSearch, 
      closeSearch, 
      setSearchModalOpen: setIsSearchModalOpen 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
