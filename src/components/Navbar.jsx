import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Plants', path: '/#plants' },
    { name: 'Categories', path: '/#categories' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' }
  ];

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  const isTransparent = (location.pathname === '/' || location.pathname === '') && !isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent py-5' 
          : 'bg-stone-50/90 backdrop-blur-md shadow-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <Leaf className={`w-6 h-6 transition-colors duration-300 ${
            isTransparent 
              ? 'text-emerald-400 group-hover:text-emerald-300' 
              : 'text-emerald-700 group-hover:text-emerald-600'
          }`} />
          <span className={`text-xl font-medium tracking-tight transition-colors duration-300 ${
            isTransparent 
              ? 'text-white group-hover:text-stone-200' 
              : 'text-emerald-950 group-hover:text-emerald-800'
          }`}>
            Dev Greenland
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors duration-300 ${
                isTransparent 
                  ? 'text-white/90 hover:text-emerald-300' 
                  : 'text-emerald-900/80 hover:text-emerald-700'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 z-50 relative transition-colors duration-300 ${
            isOpen 
              ? 'text-emerald-950' 
              : isTransparent 
                ? 'text-white hover:text-emerald-300' 
                : 'text-emerald-950 hover:text-emerald-800'
          }`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-stone-50 z-40 flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  custom={i}
                  variants={linkVariants}
                  onClick={closeMenu}
                  className="text-2xl font-medium text-emerald-950 hover:text-emerald-700"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
