import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AccessoryCard from './AccessoryCard';
import { Search } from 'lucide-react';

const AccessoryGrid = ({ accessories, title, subtitle, emptyMessage }) => {
  const shouldReduceMotion = useReducedMotion();

  if (!accessories || accessories.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-stone-900 mb-2">
          {emptyMessage?.title || "No accessories found"}
        </h3>
        <p className="text-stone-500 max-w-md">
          {emptyMessage?.description || "We couldn't find any accessories matching your current filters. Try adjusting your search criteria."}
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

  const gridKey = accessories.map(a => a.id).slice(0, 8).join('-');

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-8 md:mb-12 text-center">
          {title && <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">{title}</h2>}
          {subtitle && <p className="text-stone-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <motion.div 
        key={gridKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        {accessories.map((accessory) => (
          <motion.div key={accessory.id} variants={itemVariants}>
            <AccessoryCard accessory={accessory} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AccessoryGrid;

