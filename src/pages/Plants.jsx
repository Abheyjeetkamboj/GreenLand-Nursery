import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PlantGrid from '../components/PlantGrid';
import { filterPlants, searchPlants } from '../utils/plantUtils';
import { plants } from '../data/plants';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

const Plants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredPlants, setFilteredPlants] = useState(plants);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = plants;
    
    if (searchQuery) {
      result = searchPlants(result, searchQuery);
    }
    
    if (activeCategory !== 'All') {
      result = result.filter(plant => 
        plant.category === activeCategory || plant.subcategory === activeCategory
      );
    }
    
    setFilteredPlants(result);
  }, [searchQuery, activeCategory]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

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
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A3622] mb-4">Our Plant Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium plants for your home and garden.
          </p>
        </div>

        <div className="mb-10 flex flex-col items-center gap-8">
          <div className="w-full max-w-xl">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategorySelect={handleCategorySelect} 
          />
        </div>

        {filteredPlants.length > 0 ? (
          <PlantGrid plants={filteredPlants} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX size={48} className="text-[#849C82] mb-4 opacity-50" />
            <h3 className="text-2xl font-serif text-[#1A3622] mb-2">No plants found</h3>
            <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                handleCategorySelect('All');
              }}
              className="mt-6 px-6 py-2 bg-[#1A3622] text-[#FAFAF7] rounded-full hover:bg-[#254A2F] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default Plants;
