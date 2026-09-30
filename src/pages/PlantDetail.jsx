import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlantById, getPlantsByCategory } from '../utils/plantUtils';
import { motion } from 'framer-motion';
import { ChevronLeft, Sun, Droplets, Ruler, Heart, Flower2, Leaf } from 'lucide-react';
import PlantGrid from '../components/PlantGrid';

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    const foundPlant = getPlantById(id);
    if (foundPlant) {
      setPlant(foundPlant);
      document.title = `${foundPlant.name} | Dev Greenland Nursery`;
      
      const related = getPlantsByCategory(foundPlant.category)
        .filter(p => p && p.id !== foundPlant.id)
        .slice(0, 4);
      setRelatedPlants(related);
    } else {
      setPlant(null);
      setRelatedPlants([]);
      document.title = 'Plant Not Found | Dev Greenland Nursery';
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!plant) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-[#FAFAF7] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-serif text-[#1A3622] mb-4">Plant Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the plant you're looking for.</p>
        <Link 
          to="/plants" 
          className="px-6 py-3 bg-[#1A3622] text-[#FAFAF7] rounded-full hover:bg-[#254A2F] transition-colors"
        >
          Explore Our Collection
        </Link>
      </div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-[#FAFAF7]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Breadcrumb & Back */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 pt-4">
          <Link to="/" className="hover:text-[#1A3622] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/plants" className="hover:text-[#1A3622] transition-colors">Plants</Link>
          <span>/</span>
          <span className="text-[#1A3622] font-medium">{plant.name}</span>
        </div>

        <Link 
          to="/plants" 
          className="inline-flex items-center text-[#4A5D23] hover:text-[#1A3622] font-medium mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to collection
        </Link>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-stone-100 flex items-center justify-center relative"
          >
            {!imageError && plant.image ? (
              <img 
                src={plant.image} 
                alt={plant.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100 text-emerald-800/40 p-6 text-center">
                <Leaf className="w-16 h-16 mb-3 text-emerald-600/50" />
                <span className="text-base font-medium text-stone-600">{plant.name}</span>
                <span className="text-xs text-stone-400 mt-1">Image unavailable</span>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-[#E8EFE8] text-[#1A3622] text-sm font-medium rounded-full">
                {plant.category}
              </span>
              {plant.subcategory && (
                <span className="px-3 py-1 bg-white border border-[#E8EFE8] text-gray-600 text-sm font-medium rounded-full">
                  {plant.subcategory}
                </span>
              )}
              {plant.season && (
                <span className="px-3 py-1 bg-[#F4F1E1] text-[#7A6A33] text-sm font-medium rounded-full">
                  {plant.season}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-[#1A3622] mb-2">{plant.name}</h1>
            {plant.botanicalName && (
              <p className="text-xl text-gray-500 italic font-serif mb-6">{plant.botanicalName}</p>
            )}

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {plant.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-[#E8EFE8]">
              <div className="flex items-start space-x-3">
                <Sun className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#1A3622]">Sunlight</h4>
                  <p className="text-sm text-gray-600">{plant.sunlight}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Droplets className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#1A3622]">Watering</h4>
                  <p className="text-sm text-gray-600">{plant.watering}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Ruler className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#1A3622]">Height</h4>
                  <p className="text-sm text-gray-600">{plant.height || 'Varies'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#1A3622]">Care Level</h4>
                  <p className="text-sm text-gray-600">{plant.careLevel || 'Moderate'}</p>
                </div>
              </div>
              {plant.floweringSeason && (
                <div className="flex items-start space-x-3 col-span-2">
                  <Flower2 className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#1A3622]">Flowering Season</h4>
                    <p className="text-sm text-gray-600">{plant.floweringSeason}</p>
                  </div>
                </div>
              )}
            </div>

            {plant.tags && plant.tags.length > 0 && (
              <div className="mb-10">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {plant.tags.map(tag => (
                    <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto">
              <a 
                href="/#contact"
                className="inline-block w-full text-center px-8 py-4 bg-[#1A3622] text-[#FAFAF7] font-medium rounded-xl hover:bg-[#254A2F] transition-colors shadow-md hover:shadow-lg"
              >
                Inquire About This Plant
              </a>
              <p className="text-center text-sm text-gray-500 mt-3">Visit our nursery to purchase</p>
            </div>
          </motion.div>
        </div>

        {/* Related Plants */}
        {relatedPlants.length > 0 && (
          <div className="border-t border-gray-200 pt-16 mt-16">
            <h2 className="text-3xl font-serif text-[#1A3622] mb-10 text-center">More {plant.category}</h2>
            <PlantGrid plants={relatedPlants} />
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default PlantDetail;
