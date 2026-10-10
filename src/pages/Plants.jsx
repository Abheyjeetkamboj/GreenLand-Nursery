import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PlantGrid from '../components/PlantGrid';
import { getPlantsByCategory, getPlantsBySeason, searchPlants, normalizeSeasonKey } from '../utils/plantUtils';
import { plants } from '../data/plants';
import { motion } from 'framer-motion';
import { SearchX, Calendar } from 'lucide-react';

const Plants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { season: routeSeason } = useParams();

  // 1. Single source of truth directly from route & URL parameters
  const activeSeason = routeSeason || searchParams.get('season') || searchParams.get('collection') || 'All';
  const activeCategory = searchParams.get('category') || 'All';

  // 2. Controlled search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 3. Synchronous filter calculation — instant response, zero state lag, zero blank flashes
  const filteredPlants = useMemo(() => {
    let result = plants;

    // 1. Season filter
    if (activeSeason && activeSeason !== 'All') {
      result = getPlantsBySeason(result, activeSeason);
    }

    // 2. Category filter
    if (activeCategory && activeCategory !== 'All') {
      result = getPlantsByCategory(result, activeCategory);
    }

    // 3. Search query
    if (searchQuery.trim()) {
      result = searchPlants(result, searchQuery.trim());
    }

    return result;
  }, [activeSeason, activeCategory, searchQuery]);

  const handleCategorySelect = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (!category || category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleSeasonSelect = (season) => {
    const newParams = new URLSearchParams(searchParams);
    if (!season || season === 'All') {
      newParams.delete('season');
      newParams.delete('collection');
    } else {
      newParams.set('season', season);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  // Determine collection heading and subtitle
  const isSeasonalCollection = activeSeason && activeSeason !== 'All';
  const normalizedSeason = normalizeSeasonKey(activeSeason);

  const getHeadingInfo = () => {
    if (isSeasonalCollection) {
      if (normalizedSeason === 'summer') {
        return {
          badge: 'Summer Collection',
          title: 'Summer Plant Collection',
          subtitle: 'Heat-loving plants, tropical fruit saplings, and sun-loving blooms nurtured for warm summer days.'
        };
      }
      if (normalizedSeason === 'winter') {
        return {
          badge: 'Winter Collection',
          title: 'Winter Plant Collection',
          subtitle: 'Cool-season favourites, vibrant floribunda roses, dahlias, and hardy varieties that flourish in cold weather.'
        };
      }
      if (normalizedSeason === 'monsoon') {
        return {
          badge: 'Monsoon Collection',
          title: 'Monsoon Plant Collection',
          subtitle: 'Moisture-loving greens, fragrant tuberoses, and rain-washed flowering varieties that thrive in high humidity.'
        };
      }
      if (normalizedSeason === 'all-season') {
        return {
          badge: 'All-Season Collection',
          title: 'All-Season Plant Collection',
          subtitle: 'Resilient evergreen houseplants, bonsais, and hardy foliage varieties that stay vibrant all year round.'
        };
      }
      return {
        badge: `${activeSeason} Collection`,
        title: `${activeSeason} Plant Collection`,
        subtitle: 'Hand-picked nursery selections suitable for this climate and season.'
      };
    }

    if (activeCategory && activeCategory !== 'All') {
      return {
        badge: activeCategory,
        title: `${activeCategory}`,
        subtitle: `Discover our curated collection of ${activeCategory.toLowerCase()} for your home and garden.`
      };
    }

    return {
      badge: 'Complete Nursery Catalog',
      title: 'Our Plant Collection',
      subtitle: 'Discover our carefully curated selection of premium plants for your home and garden.'
    };
  };

  const headingInfo = getHeadingInfo();

  useEffect(() => {
    document.title = `${headingInfo.title} | Dev Greenland Nursery`;
  }, [headingInfo.title]);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 pb-16 bg-[#FAFAF7] px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          {isSeasonalCollection && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5" />
              {headingInfo.badge}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A3622] mb-4">
            {headingInfo.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            {headingInfo.subtitle}
          </p>

          {/* Active collection filter pills & return to all plants */}
          {isSeasonalCollection && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs md:text-sm font-medium shadow-sm">
                <span>Filtered by: <strong>{headingInfo.badge}</strong> ({filteredPlants.length} plants)</span>
                <button
                  type="button"
                  onClick={() => handleSeasonSelect('All')}
                  className="w-4 h-4 rounded-full bg-emerald-200 hover:bg-emerald-300 text-emerald-900 flex items-center justify-center text-[10px] transition-colors"
                  title="Remove season filter"
                  aria-label="Remove season filter"
                >
                  ✕
                </button>
              </span>

              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs md:text-sm font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-4 transition-colors"
              >
                View Complete Plant Collection
              </button>
            </div>
          )}
        </div>

        {/* Search & Category Filter */}
        <div className="mb-10 flex flex-col items-center gap-8">
          <div className="w-full max-w-xl">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search plants by name, category, or care type..." 
            />
          </div>
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategorySelect={handleCategorySelect} 
          />
        </div>

        {/* Plant Grid or Empty State */}
        {filteredPlants.length > 0 ? (
          <PlantGrid plants={filteredPlants} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-stone-100 p-8">
            <SearchX size={48} className="text-[#849C82] mb-4 opacity-50" />
            <h3 className="text-2xl font-serif text-[#1A3622] mb-2">No plants found</h3>
            <p className="text-gray-600 max-w-md text-sm md:text-base">
              {isSeasonalCollection 
                ? `No plants in the ${headingInfo.badge} match your current category or search criteria.`
                : "Try adjusting your search query or filter options to discover more plants."}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button 
                type="button"
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-[#1A3622] text-[#FAFAF7] rounded-full text-sm font-medium hover:bg-[#254A2F] transition-colors shadow-sm"
              >
                View Complete Plant Collection
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default Plants;
