import React from 'react';
import { motion } from 'framer-motion';
import PlantCard from './PlantCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Search } from 'lucide-react';

const PlantGrid = ({ plants, title, subtitle }) => {
  const { ref, controls, staggerVariants, itemVariants } = useScrollReveal();

  if (!plants || plants.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-stone-900 mb-2">No plants found</h3>
        <p className="text-stone-500 max-w-md">
          We couldn't find any plants matching your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-8 md:mb-12 text-center">
          {title && <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">{title}</h2>}
          {subtitle && <p className="text-stone-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <motion.div 
        ref={ref}
        variants={staggerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        {plants.map((plant) => (
          <motion.div key={plant.id} variants={itemVariants}>
            <PlantCard plant={plant} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlantGrid;
