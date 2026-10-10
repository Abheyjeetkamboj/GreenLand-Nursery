import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { categoryConfig } from '../data/plants';

const Footer = () => {
  const categories = Object.values(categoryConfig || {}).map(c => c.name);

  return (
    <footer className="bg-[#1a2e1a] text-stone-100 pt-16 pb-8 border-t border-emerald-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/images/logo-light.png" 
                alt="Dev Greenland Nursery" 
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-emerald-200/80 text-sm leading-relaxed max-w-xs">
              Nurturing nature for your spaces. A diverse collection of healthy, thriving plants for every environment.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-emerald-200/80">
              <li><a href="/#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><Link to="/plants" className="hover:text-emerald-400 transition-colors">All Plants</Link></li>
              <li><Link to="/accessories" className="hover:text-emerald-400 transition-colors">Garden Accessories</Link></li>
              <li><a href="/#categories" className="hover:text-emerald-400 transition-colors">Categories</a></li>
              <li><a href="/#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="/#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Plant Categories</h4>
            <ul className="space-y-3 text-sm text-emerald-200/80">
              {categories.slice(0, 5).map((cat, i) => (
                <li key={i}><Link to="/plants" className="hover:text-emerald-400 transition-colors">{cat}</Link></li>
              ))}
              {categories.length > 5 && <li><Link to="/plants" className="text-emerald-400 hover:text-emerald-300">View All...</Link></li>}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Connect</h4>
            <ul className="space-y-3 text-sm text-emerald-200/80 mb-6">
              <li>Dev GreenLand Nursery, Jalalabad, Punjab,152024</li>
              <li>9914900057</li>
              
            </ul>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/dev.nursery.57" target="_blank" className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-colors text-white">
                <FaInstagram className="w-5 h-5" />
                
              </a>
              <a href="https://www.facebook.com/share/1EeJ28aypk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-colors text-white" aria-label="Facebook">
                <FaFacebook className="w-5 h-5" />
              </a>
              
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-emerald-200/60">
          <p>© 2026 Dev Greenland Nursery. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
