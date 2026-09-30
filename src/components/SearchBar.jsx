import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search plants by name, category, or type..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full">
        <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 bg-white border border-stone-200 rounded-full text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm"
          aria-label="Search plants"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 text-stone-400 hover:text-stone-600 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
