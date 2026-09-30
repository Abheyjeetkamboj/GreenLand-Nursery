import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-stone-50 pt-20">
      
      {!shouldReduceMotion && (
        <>
          <motion.div 
            variants={floatingVariants}
            animate="animate"
            className="absolute top-1/4 left-1/4 w-24 h-24 opacity-10 pointer-events-none"
            style={{ borderRadius: '50% 0 50% 50%', backgroundColor: 'currentColor', transform: 'rotate(45deg)' }}
          />
          <motion.div 
            variants={floatingVariants}
            animate="animate"
            style={{ borderRadius: '50% 0 50% 50%', backgroundColor: 'currentColor', animationDelay: '1s' }}
            className="absolute bottom-1/4 right-1/4 w-32 h-32 opacity-5 pointer-events-none rotate-[-45deg]"
          />
           <motion.div 
            variants={floatingVariants}
            animate="animate"
            style={{ borderRadius: '50% 0 50% 50%', backgroundColor: 'currentColor', animationDelay: '2s' }}
            className="absolute top-1/2 right-[10%] w-16 h-16 opacity-10 pointer-events-none rotate-[20deg]"
          />
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 leading-tight"
          >
            Bring Nature <span className="text-emerald-300">Home</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-emerald-100/80 mb-10 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Discover our curated collection of indoor, outdoor, fruit, and flowering plants. 
            Nurtured with care at Dev Greenland Nursery to thrive in your space.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#plants"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-medium rounded-full transition-colors duration-300 shadow-lg shadow-emerald-900/20"
            >
              Explore Plants
            </a>
            <a 
              href="#categories"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-emerald-800/50 border border-emerald-400/30 text-emerald-50 font-medium rounded-full transition-all duration-300"
            >
              Browse Categories
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
