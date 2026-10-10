import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PlantCard from './PlantCard';
import { Search } from 'lucide-react';

const PlantGrid = ({ plants, title, subtitle, horizontalOnMobile = false }) => {
  const shouldReduceMotion = useReducedMotion();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 16 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  // Derive key to re-trigger smooth staggered animation on filter change
  const gridKey = plants.map(p => p.id).slice(0, 8).join('-');

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-8 md:mb-12 text-center">
          {title && <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3 md:mb-4">{title}</h2>}
          {subtitle && <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg">{subtitle}</p>}
        </div>
      )}

      {horizontalOnMobile ? (
        <motion.div 
          key={gridKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex md:grid overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none"
        >
          {plants.map((plant, idx) => (
            <motion.div 
              key={plant.id} 
              variants={itemVariants}
              className={`w-[250px] sm:w-[280px] md:w-auto flex-shrink-0 md:flex-shrink snap-start ${
                idx >= 4 ? 'md:hidden' : ''
              }`}
            >
              <PlantCard plant={plant} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          key={gridKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {plants.map((plant) => (
            <motion.div key={plant.id} variants={itemVariants}>
              <PlantCard plant={plant} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PlantGrid;
