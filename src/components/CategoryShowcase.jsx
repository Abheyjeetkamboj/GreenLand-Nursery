import React from 'react';
import { motion } from 'framer-motion';
import { categoryConfig, plants } from '../data/plants';
import { getPlantsByCategory } from '../utils/plantUtils';
import PlantCard from './PlantCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

const ShowcaseSection = ({ category, index }) => {
  const { ref, controls, variants } = useScrollReveal();
  // Fetch up to 6 plants for mobile swipeable rail; desktop will strictly show 3
  const allCategoryPlants = getPlantsByCategory(plants, category.id);
  const categoryPlants = allCategoryPlants.slice(0, 6);
  const isEven = index % 2 === 0;

  if (categoryPlants.length === 0) return null;

  return (
    <div className={`py-14 md:py-20 ${category.bgClass || (isEven ? 'bg-emerald-50/50' : 'bg-white')}`} id={`category-${category.id}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center w-full min-w-0`}
        >
          <div className="w-full lg:w-1/3 space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">{category.name}</h2>
            <p className="text-stone-600 text-base md:text-lg">{category.description}</p>
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <Link 
                to={`/plants?category=${category.id}`}
                className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800 transition-colors group"
              >
                View all {category.name} 
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
              
            </div>
          </div>

          <div className="w-full lg:w-2/3 min-w-0">
            {/* Mobile: Horizontal swipeable rail (Flipkart-style). Desktop: exact 3-column grid */}
            <div className="flex md:grid overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 gap-4 md:gap-6 md:grid-cols-3 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
              {categoryPlants.map((plant, idx) => (
                <div 
                  key={plant.id} 
                  className={`w-[250px] sm:w-[280px] md:w-auto flex-shrink-0 md:flex-shrink snap-start ${
                    idx >= 3 ? 'md:hidden' : ''
                  }`}
                >
                  <PlantCard plant={plant} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CategoryShowcase = () => {
  const categories = Object.entries(categoryConfig || {}).map(([key, value]) => ({
    id: key,
    name: key,
    ...value
  }));

  if (categories.length === 0) return null;

  return (
    <section id="categories" className="flex flex-col">
      {categories.map((cat, index) => (
        <ShowcaseSection key={cat.id} category={cat} index={index} />
      ))}
    </section>
  );
};

export default CategoryShowcase;
