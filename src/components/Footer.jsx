import React from 'react';
// import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react';
import { Leaf } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { categoryConfig } from '../data/plants';

const Footer = () => {
  const categories = Object.values(categoryConfig || {}).map(c => c.name);

  return (
    <footer className="bg-[#1a2e1a] text-stone-100 pt-16 pb-8 border-t border-emerald-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-7 h-7 text-emerald-400" />
              <span className="text-2xl font-serif tracking-tight text-white">Dev Greenland</span>
            </div>
            <p className="text-emerald-200/80 text-sm leading-relaxed max-w-xs">
              Nurturing nature for your spaces. A diverse collection of healthy, thriving plants for every environment.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-emerald-200/80">
              <li><a href="/#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="/#plants" className="hover:text-emerald-400 transition-colors">All Plants</a></li>
              <li><a href="/#categories" className="hover:text-emerald-400 transition-colors">Categories</a></li>
              <li><a href="/#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="/#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Plant Categories</h4>
            <ul className="space-y-3 text-sm text-emerald-200/80">
              {categories.slice(0, 5).map((cat, i) => (
                <li key={i}><a href={`/plants`} className="hover:text-emerald-400 transition-colors">{cat}</a></li>
              ))}
              {categories.length > 5 && <li><a href="/plants" className="text-emerald-400 hover:text-emerald-300">View All...</a></li>}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Connect</h4>
            <ul className="space-y-3 text-sm text-emerald-200/80 mb-6">
              <li>Dev GreenLand Nursery, Jalalabad,Punjab,152024</li>
              <li>9914900057</li>
              
            </ul>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-colors text-white">
                <FaInstagram className="w-5 h-5" />
                
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-colors text-white">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-colors text-white">
                <FaTwitter className="w-5 h-5" />
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
