import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import AccessoryGrid from '../components/AccessoryGrid';
import { accessories, searchAccessories } from '../data/accessories';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

const Accessories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAccessories, setFilteredAccessories] = useState(accessories);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Accessories Collection | Dev Greenland Nursery';
  }, []);

  useEffect(() => {
    let result = accessories;
    
    if (searchQuery.trim()) {
      result = searchAccessories(searchQuery.trim());
    }
    
    setFilteredAccessories(result);
  }, [searchQuery]);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 pb-16 bg-[#FAFAF7] px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A3622] mb-4">Our Accessories Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of handcrafted planters, garden water fountains, stands, and outdoor decor.
          </p>
        </div>

        <div className="mb-10 flex flex-col items-center">
          <div className="w-full max-w-xl">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search accessories by name, category, or material..." 
            />
          </div>
        </div>

        {filteredAccessories.length > 0 ? (
          <AccessoryGrid accessories={filteredAccessories} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX size={48} className="text-[#849C82] mb-4 opacity-50" />
            <h3 className="text-2xl font-serif text-[#1A3622] mb-2">
              No accessories found
            </h3>
            <p className="text-gray-600 max-w-md">
              Try adjusting your search to find what you're looking for.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-2 bg-[#1A3622] text-[#FAFAF7] rounded-full hover:bg-[#254A2F] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default Accessories;
