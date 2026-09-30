import React from 'react';
import { getFeaturedPlants } from '../utils/plantUtils';
import PlantGrid from './PlantGrid';
import { plants } from '../data/plants';

const FeaturedPlants = () => {
  const featured = getFeaturedPlants(plants).slice(0, 4);

  return (
    <section id="featured" className="py-20 md:py-28 bg-stone-50">
      <div className="container mx-auto px-4 md:px-6">
        <PlantGrid 
          plants={featured} 
          title="Our Finest Collection" 
          subtitle="Hand-picked selections nurtured with exceptional care at our nursery."
        />
        <div className="mt-12 text-center">
          <a 
            href="/plants" 
            className="inline-flex items-center justify-center px-8 py-3 border border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-medium rounded-full transition-colors duration-300"
          >
            View All Plants
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlants;
