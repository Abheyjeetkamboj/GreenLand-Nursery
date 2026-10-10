import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAccessoryById, getAccessoriesByCategory } from '../data/accessories';
import { motion } from 'framer-motion';
import { ChevronLeft, Layers, Ruler, MapPin, CheckCircle } from 'lucide-react';
import AccessoryGrid from '../components/AccessoryGrid';

const AccessoryDetail = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState(null);
  const [relatedAccessories, setRelatedAccessories] = useState([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    const found = getAccessoryById(id);
    if (found) {
      setAccessory(found);
      document.title = `${found.name} | Dev Greenland Nursery`;
      
      const related = getAccessoriesByCategory(found.category)
        .filter(item => item && item.id !== found.id)
        .slice(0, 4);
      setRelatedAccessories(related);
    } else {
      setAccessory(null);
      setRelatedAccessories([]);
      document.title = 'Accessory Not Found | Dev Greenland Nursery';
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!accessory) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-[#FAFAF7] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-serif text-[#1A3622] mb-4">Accessory Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the accessory you're looking for.</p>
        <Link 
          to="/accessories" 
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
          <Link to="/accessories" className="hover:text-[#1A3622] transition-colors">Accessories</Link>
          <span>/</span>
          <span className="text-[#1A3622] font-medium">{accessory.name}</span>
        </div>

        <Link 
          to="/accessories" 
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
            {!imageError && accessory.image ? (
              <img 
                src={accessory.image} 
                alt={accessory.alt || accessory.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100 text-emerald-800/40 p-6 text-center">
                <Layers className="w-16 h-16 mb-3 text-emerald-600/50" />
                <span className="text-base font-medium text-stone-600">{accessory.name}</span>
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
                {accessory.category}
              </span>
              {accessory.material && (
                <span className="px-3 py-1 bg-white border border-[#E8EFE8] text-gray-600 text-sm font-medium rounded-full">
                  {accessory.material}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-[#1A3622] mb-3">{accessory.name}</h1>
            
            {accessory.price && (
              <p className="text-2xl font-serif text-emerald-800 font-semibold mb-4">
                {accessory.price}
              </p>
            )}

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {accessory.description || accessory.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-[#E8EFE8]">
              {accessory.material && (
                <div className="flex items-start space-x-3">
                  <Layers className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#1A3622]">Material / Finish</h4>
                    <p className="text-sm text-gray-600">{accessory.material}</p>
                  </div>
                </div>
              )}
              {accessory.dimensions && (
                <div className="flex items-start space-x-3">
                  <Ruler className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#1A3622]">Dimensions</h4>
                    <p className="text-sm text-gray-600">{accessory.dimensions}</p>
                  </div>
                </div>
              )}
              {accessory.usage && (
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-[#849C82] flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#1A3622]">Recommended Use</h4>
                    <p className="text-sm text-gray-600">{accessory.usage}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-[#1A3622]">Availability</h4>
                  <p className="text-sm text-gray-600">Available at Nursery</p>
                </div>
              </div>
            </div>

            {accessory.tags && accessory.tags.length > 0 && (
              <div className="mb-10">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {accessory.tags.map(tag => (
                    <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href={`https://wa.me/919914900057?text=${encodeURIComponent(`Hi Dev Greenland Nursery, I would like to inquire about ${accessory.name} (${accessory.id}). Is it currently available?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Inquire on WhatsApp
                </a>
                <a 
                  href="/#contact"
                  className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-[#1A3622] font-medium rounded-xl transition-colors text-center"
                >
                  Visit Nursery
                </a>
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">Available for pickup & delivery from Dev Greenland Nursery, Jalalabad</p>
            </div>
          </motion.div>
        </div>

        {/* Related Accessories */}
        {relatedAccessories.length > 0 && (
          <div className="border-t border-gray-200 pt-16 mt-16">
            <h2 className="text-3xl font-serif text-[#1A3622] mb-10 text-center">More {accessory.category}</h2>
            <AccessoryGrid accessories={relatedAccessories} />
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default AccessoryDetail;

