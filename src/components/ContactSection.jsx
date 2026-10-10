import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { useScrollReveal } from '../hooks/useScrollReveal';

const ContactSection = () => {
  const { ref, controls, staggerVariants, itemVariants } = useScrollReveal();

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4 md:mb-6">Visit Our Nursery</h2>
          <p className="text-base md:text-lg text-stone-600">
            We'd love to help you find the perfect plants. Reach out to us or visit in person.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-100 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 mb-2">Call Us</h3>
            <p className="text-stone-500 mb-6 flex-grow">9914900057</p>
            <a href="tel:+919914900057" className="w-full py-2.5 bg-emerald-50 text-emerald-700 font-medium rounded-full hover:bg-emerald-100 active:bg-emerald-200 transition-colors">
              Call Nursery
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-100 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 mb-2">WhatsApp</h3>
            <p className="text-stone-500 mb-6 flex-grow">9914900057</p>
            <a href="https://wa.me/919914900057" target="_blank" rel="noreferrer" className="w-full py-2.5 bg-emerald-50 text-emerald-700 font-medium rounded-full hover:bg-emerald-100 active:bg-emerald-200 transition-colors">
              Chat Now
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-100 text-center flex flex-col items-center lg:col-span-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 mb-2">Location</h3>
            <p className="text-stone-500 mb-6 flex-grow max-w-sm">Dev GreenLand Nursery, Jalalabad, Punjab, 152024</p>
            <a href="https://maps.app.goo.gl/4yRTn4LJN7MTdhs56" target="_blank" rel="noreferrer" className="px-8 py-2.5 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 active:bg-emerald-800 transition-colors">
              Get Directions
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
        >
      
         
          {/* <a href="https://www.instagram.com/dev.nursery.57?stkn=bG0zZDI3dDJub2Ns" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors">
            
            <FaInstagram className="w-5 h-5" /> dev.nursery.57
          </a> */}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
