import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Home } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const AboutSection = () => {
  const { ref, controls, staggerVariants, itemVariants } = useScrollReveal();

  const highlights = [
    { icon: <Leaf className="w-6 h-6" />, title: "Wide Plant Collection", desc: "Diverse varieties for every need" },
    { icon: <Heart className="w-6 h-6" />, title: "Expert Plant Care", desc: "Nurtured for healthy growth" },
    { icon: <Home className="w-6 h-6" />, title: "Plants for Every Space", desc: "Indoor, outdoor & landscaping" }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-stone-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="flex justify-center mb-4">
              <img 
                src="/images/logo.png" 
                alt="Dev Greenland Logo" 
                className="h-16 w-auto object-contain"
              />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-serif text-stone-900 mb-8">
              About Dev Greenland Nursery
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-stone-600 leading-relaxed font-light">
              Dev Greenland Nursery brings together a diverse collection of plants for homes, gardens, and outdoor spaces. From indoor air-purifiers to fruit-bearing trees, we nurture plants with care so they thrive in your spaces.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {highlights.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-sm text-center border border-stone-100"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="mt-16 bg-stone-200 rounded-3xl h-64 md:h-96 flex items-center justify-center border border-stone-300 border-dashed">
            <p className="text-stone-500 font-medium">Ithe nursery di main photo ave gi</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
