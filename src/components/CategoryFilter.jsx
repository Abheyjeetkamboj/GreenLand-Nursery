import React from 'react';
import { getCategories } from '../utils/plantUtils';

const CategoryFilter = ({ 
  plants, 
  activeFilter, 
  onFilterChange, 
  activeCategory, 
  onCategorySelect 
}) => {
  const currentActive = activeCategory !== undefined ? activeCategory : (activeFilter || 'All');
  const handleSelect = onCategorySelect || onFilterChange || (() => {});
  const categories = ['All', ...getCategories(plants)];

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex items-center gap-2 md:gap-3 min-w-max px-2">
        {categories.map((category) => {
          const isActive = currentActive === category || (!currentActive && category === 'All') || (currentActive === '' && category === 'All');
          
          return (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isActive 
                  ? 'bg-emerald-700 text-white shadow-md' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
              aria-pressed={isActive}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
