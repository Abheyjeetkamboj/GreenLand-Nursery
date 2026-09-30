import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Snowflake, Cloud } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { seasonConfig } from '../data/plants';

const iconMap = {
  Sun: <Sun className="w-8 h-8" />,
  CloudRain: <CloudRain className="w-8 h-8" />,
  Snowflake: <Snowflake className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />
};

const SeasonalSection = () => {
  const { ref, controls, staggerVariants, itemVariants } = useScrollReveal();
  
  const seasons = Object.entries(seasonConfig || {}).map(([key, value]) => ({
    id: key,
    ...value
  }));

  const displaySeasons = seasons.length > 0 ? seasons : [
    { id: 'summer', name: 'Summer', description: 'Sun-loving plants that thrive in warmth.', icon: 'Sun', color: 'bg-amber-50 text-amber-600' },
    { id: 'winter', name: 'Winter', description: 'Hardy varieties resilient to cold.', icon: 'Snowflake', color: 'bg-blue-50 text-blue-600' },
    { id: 'monsoon', name: 'Monsoon', description: 'Moisture-loving greens perfect for rain.', icon: 'CloudRain', color: 'bg-emerald-50 text-emerald-600' },
    { id: 'all', name: 'All Season', description: 'Evergreen beauties for year-round joy.', icon: 'Cloud', color: 'bg-stone-100 text-stone-600' }
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Growing With Every Season</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Nature changes, and so does our collection. Discover plants perfectly suited for the current climate.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displaySeasons.map((season) => (
            <motion.div 
              key={season.id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all cursor-pointer bg-stone-50 group`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${season.color || 'bg-emerald-100 text-emerald-600'}`}>
                {iconMap[season.icon] || <Sun className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-3">{season.name}</h3>
              <p className="text-stone-500 mb-6">{season.description}</p>
              <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                Explore Collection <span className="text-lg leading-none">&rarr;</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonalSection;
