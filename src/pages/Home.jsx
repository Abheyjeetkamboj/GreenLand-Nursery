import React from 'react';
import Hero from '../components/Hero';
import FeaturedPlants from '../components/FeaturedPlants';
import CategoryShowcase from '../components/CategoryShowcase';
import SeasonalSection from '../components/SeasonalSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FAFAF7]"
    >
      <Hero />
      <div id="plants" className="scroll-mt-20">
        <FeaturedPlants />
      </div>
      <div id="categories" className="scroll-mt-20">
        <CategoryShowcase />
      </div>
      <div id="seasonal" className="scroll-mt-20">
        <SeasonalSection />
      </div>
      <div id="about" className="scroll-mt-20">
        <AboutSection />
      </div>
      <div id="contact" className="scroll-mt-20">
        <ContactSection />
      </div>
    </motion.main>
  );
};

export default Home;
