import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, CloudRain, Snowflake, Cloud, Leaf, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { seasonConfig } from '../data/plants';

const iconMap = {
  Sun: <Sun className="w-8 h-8" />,
  CloudRain: <CloudRain className="w-8 h-8" />,
  Snowflake: <Snowflake className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />,
  Leaf: <Leaf className="w-8 h-8" />
};

const colorMap = {
  amber: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
  teal: 'bg-emerald-50 text-emerald-600',
  green: 'bg-emerald-50 text-emerald-700',
  stone: 'bg-stone-100 text-stone-700'
};

const defaultSeasons = [
  { 
    id: 'summer', 
    seasonKey: 'Summer', 
    name: 'Summer Collection', 
    description: 'Heat-loving plants that thrive in warm sunshine.', 
    icon: 'Sun', 
    color: 'bg-amber-50 text-amber-600',
    path: '/plants?season=Summer'
  },
  { 
    id: 'winter', 
    seasonKey: 'Winter', 
    name: 'Winter Collection', 
    description: 'Cool-season favourites that bloom when temperatures drop.', 
    icon: 'Snowflake', 
    color: 'bg-blue-50 text-blue-600',
    path: '/plants?season=Winter'
  },
  { 
    id: 'monsoon', 
    seasonKey: 'Monsoon', 
    name: 'Monsoon Collection', 
    description: 'Rain-loving plants that flourish during the monsoon.', 
    icon: 'CloudRain', 
    color: 'bg-emerald-50 text-emerald-600',
    path: '/plants?season=Monsoon'
  },
  { 
    id: 'all-season', 
    seasonKey: 'All Season', 
    name: 'All-Season Collection', 
    description: 'Resilient plants that look beautiful throughout the year.', 
    icon: 'Cloud', 
    color: 'bg-stone-100 text-stone-700',
    path: '/plants?season=All+Season'
  }
];

const SeasonalSection = () => {
  const { ref, controls, staggerVariants, itemVariants } = useScrollReveal();
  
  const displaySeasons = seasonConfig && Object.keys(seasonConfig).length > 0
    ? Object.entries(seasonConfig).map(([key, value]) => ({
        id: key.toLowerCase().replace(/\s+/g, '-'),
        seasonKey: key,
        name: value.name || (key === 'All Season' ? 'All-Season Collection' : `${key} Collection`),
        description: value.description,
        icon: value.icon,
        color: colorMap[value.color] || 'bg-emerald-100 text-emerald-600',
        path: `/plants?season=${encodeURIComponent(key)}`
      }))
    : defaultSeasons;

  return (
    <section className="py-14 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3 md:mb-4">Growing With Every Season</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg">
            Nature changes, and so does our collection. Discover plants perfectly suited for the current climate.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="flex md:grid overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none"
        >
          {displaySeasons.map((season) => (
            <motion.div 
              key={season.id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="w-[260px] sm:w-[280px] md:w-auto flex-shrink-0 md:flex-shrink snap-start rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all bg-stone-50 group flex flex-col h-full overflow-hidden"
            >
              <Link
                to={season.path}
                className="p-6 sm:p-8 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-3xl"
                aria-label={`Explore ${season.name}`}
              >
                <div className={`w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 transition-transform group-hover:scale-110 ${season.color}`}>
                  {iconMap[season.icon] || <Sun className="w-8 h-8" />}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-stone-900 mb-2 sm:mb-3">{season.name}</h3>
                <p className="text-stone-500 mb-5 sm:mb-6 text-sm sm:text-base flex-grow">{season.description}</p>
                <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 mt-auto">
                  Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonalSection;
