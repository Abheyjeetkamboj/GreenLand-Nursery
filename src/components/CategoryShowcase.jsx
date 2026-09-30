import React from 'react';
import { motion } from 'framer-motion';
import { categoryConfig, plants } from '../data/plants';
import { getPlantsByCategory } from '../utils/plantUtils';
import PlantCard from './PlantCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

const ShowcaseSection = ({ category, index }) => {
  const { ref, controls, variants } = useScrollReveal();
  const categoryPlants = getPlantsByCategory(plants, category.id).slice(0, 3);
  const isEven = index % 2 === 0;

  if (categoryPlants.length === 0) return null;

  return (
    <div className={`py-20 ${category.bgClass || (isEven ? 'bg-emerald-50/50' : 'bg-white')}`} id={`category-${category.id}`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
        >
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">{category.name}</h2>
            <p className="text-stone-600 text-lg">{category.description}</p>
            <Link 
              to={`/plants?category=${category.id}`}
              className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800 transition-colors group"
            >
              View all {category.name} 
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categoryPlants.map(plant => (
                <div key={plant.id} className={categoryPlants.length < 3 ? 'max-w-sm' : ''}>
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
