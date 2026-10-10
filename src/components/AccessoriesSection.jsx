import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { accessories } from '../data/accessories';
import AccessoryCard from './AccessoryCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const AccessoriesSection = ({ isEven = true }) => {
  const { ref, controls, variants } = useScrollReveal();
  
  // Pick up to 6 featured accessories for mobile swipe rail; desktop strictly shows 3
  const featuredAccessories = accessories
    .filter(item => item.featured)
    .slice(0, 6);

  if (featuredAccessories.length === 0) return null;

  return (
    <section 
      className={`py-14 md:py-20 ${isEven ? 'bg-emerald-50/50' : 'bg-white'}`} 
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center w-full min-w-0`}
        >
          <div className="w-full lg:w-1/3 space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Garden Accessories</h2>
            <p className="text-stone-600 text-base md:text-lg">
              Explore handcrafted stone planters, tranquil water fountains, plant stands, and nursery essentials to complement your greenery.
            </p>
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <Link 
                to="/accessories"
                className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800 transition-colors group"
              >
                View all Garden Accessories 
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
              <span className="text-xs text-stone-400 md:hidden flex items-center gap-1 font-medium">
                Swipe &rarr;
              </span>
            </div>
          </div>

          <div className="w-full lg:w-2/3 min-w-0">
            {/* Mobile: Horizontal swipeable rail (Flipkart-style). Desktop: exact 3-column grid */}
            <div className="flex md:grid overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 gap-4 md:gap-6 md:grid-cols-3 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
              {featuredAccessories.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`w-[250px] sm:w-[280px] md:w-auto flex-shrink-0 md:flex-shrink snap-start ${
                    idx >= 3 ? 'md:hidden' : ''
                  }`}
                >
                  <AccessoryCard accessory={item} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccessoriesSection;
