import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const AccessoryCard = ({ accessory }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full"
    >
      <Link 
        to={`/accessory/${accessory.id}`} 
        className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          {!imageError ? (
            <img 
              src={accessory.image || '/images/placeholder.jpg'} 
              alt={accessory.alt || accessory.name}
              onError={() => setImageError(true)}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100 text-emerald-800/30">
              <Layers className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">Image unavailable</span>
            </div>
          )}
          
          {accessory.category && (
            <div 
              className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-emerald-800 shadow-sm max-w-[calc(100%-1.5rem)] truncate pointer-events-none"
              title={accessory.category}
            >
              {accessory.category}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-1 sm:mb-2">
            <h3 className="text-base sm:text-lg font-medium text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
              {accessory.name}
            </h3>
          </div>
          
          <p className="text-xs sm:text-sm text-stone-500 line-clamp-2 mb-3 sm:mb-4 flex-grow">
            {accessory.shortDescription}
          </p>

          <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2 text-stone-400">
              {accessory.price ? (
                <span className="text-xs sm:text-sm font-semibold text-emerald-800">
                  {accessory.price}
                </span>
              ) : (
                <span className="text-xs font-medium text-stone-500 flex items-center gap-1" title="Available at nursery">
                  <Layers className="w-3.5 h-3.5 text-stone-400" />
                  <span>In Nursery</span>
                </span>
              )}
            </div>
            <span className="flex items-center text-xs sm:text-sm font-medium text-emerald-600">
              View Details 
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AccessoryCard;
