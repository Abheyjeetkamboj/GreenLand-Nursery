import React from 'react';
import { getCategories } from '../utils/plantUtils';

const CategoryFilter = ({ 
  plants, 
  categories: customCategories,
  activeFilter, 
  onFilterChange, 
  activeCategory, 
  onCategorySelect,
  wrap = false
}) => {
  const currentActive = activeCategory !== undefined ? activeCategory : (activeFilter || 'All');
  const handleSelect = onCategorySelect || onFilterChange || (() => {});
  const categories = customCategories || ['All', ...getCategories(plants)];

  const cleanStr = (s) => String(s || '').trim().toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
  const curClean = cleanStr(currentActive);

  const checkActive = (cat) => {
    const catClean = cleanStr(cat);
    if (!curClean || curClean === 'all') {
      return catClean === 'all';
    }
    return curClean === catClean || (curClean.length >= 4 && catClean.includes(curClean));
  };

  if (wrap) {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-4xl mx-auto px-2">
        {categories.map((category) => {
          const isActive = checkActive(category);
          
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleSelect(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
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
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex items-center gap-2 md:gap-3 min-w-max px-2">
        {categories.map((category) => {
          const isActive = checkActive(category);
          
          return (
            <button
              key={category}
              type="button"
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
