import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface SearchContextType {
  searchQuery: string;
  searchResults: Product[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Advanced search function optimized for Pakistani jewelry and watch terms
  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Search terms common in Pakistani market
    const searchTerms = query.toLowerCase().split(' ');
    
    const results = SAMPLE_PRODUCTS.filter(product => {
      const searchableText = `
        ${product.name} 
        ${product.description} 
        ${product.category} 
        ${product.subcategory}
        ${product.tags?.join(' ') || ''}
        ${product.material || ''}
        ${product.brand || ''}
      `.toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });

    // Sort by relevance (exact matches first, then partial matches)
    const sortedResults = results.sort((a, b) => {
      const aExactMatch = a.name.toLowerCase().includes(query.toLowerCase());
      const bExactMatch = b.name.toLowerCase().includes(query.toLowerCase());
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      return 0;
    });

    setSearchResults(sortedResults);
    setIsSearching(false);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const contextValue: SearchContextType = {
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    performSearch,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};