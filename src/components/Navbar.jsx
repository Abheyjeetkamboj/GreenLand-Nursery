import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, MessageCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open, and restore on close/unmount
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Plants', path: '/#plants' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Categories', path: '/#categories' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' }
  ];

  const menuVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -15 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 + i * 0.05, duration: 0.25 }
    })
  };

  const isTransparent = (location.pathname === '/' || location.pathname === '') && !isScrolled;

  const handleLinkClick = (e, path) => {
    closeMenu();
    if (path.includes('#')) {
      const hash = path.split('#')[1];
      if (location.pathname === '/' || location.pathname === '') {
        e.preventDefault();
        requestAnimationFrame(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
          ? 'bg-transparent py-5'
          : 'bg-stone-50/90 backdrop-blur-md shadow-sm py-3'
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center group" onClick={closeMenu} aria-label="Dev Greenland Nursery">
            <img 
              src={isTransparent ? "/images/logo-light.png" : "/images/logo.png"}
              alt="Dev Greenland Nursery"
              className={`${
                isTransparent ? 'h-14 md:h-16' : 'h-10 md:h-11'
              } w-auto object-contain transition-all duration-300`}
            />
          </Link>

          {/* Desktop Nav — 100% UNCHANGED */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`text-sm font-medium transition-colors duration-300 ${isTransparent
                  ? 'text-white/90 hover:text-emerald-300'
                  : 'text-emerald-900/80 hover:text-emerald-700'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            className={`md:hidden p-2 z-50 relative transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg ${isOpen
              ? 'text-emerald-950'
              : isTransparent
                ? 'text-white hover:text-emerald-300'
                : 'text-emerald-950 hover:text-emerald-800'
              }`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay via React Portal — mounts directly at document.body to avoid backdrop-filter containing block trap */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-nav-portal"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 z-[9999] bg-stone-50 md:hidden flex flex-col h-[100dvh] overflow-hidden"
            >
              {/* Top Navigation Bar in Overlay */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200/80 bg-stone-50 flex-shrink-0">
                <Link to="/" onClick={closeMenu} className="flex items-center" aria-label="Dev Greenland Nursery">
                  <img 
                    src="/images/logo.png" 
                    alt="Dev Greenland Nursery" 
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-2 -mr-1 rounded-full text-emerald-950 hover:bg-stone-200/60 active:bg-stone-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Nav Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        to={link.path}
                        onClick={(e) => handleLinkClick(e, link.path)}
                        className="flex items-center justify-between py-4 text-xl font-medium text-emerald-950 hover:text-emerald-700 active:text-emerald-800 border-b border-stone-100 transition-colors"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-4 h-4 text-emerald-600/70" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Bottom Contact & Address Card */}
                <div className="pt-6 mt-6 border-t border-stone-200/70 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-stone-600">
                    <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Dev Greenland Nursery, Jalalabad, Punjab, 152024</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <a
                      href="tel:+919914900057"
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm active:bg-emerald-800 transition-colors text-center"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Nursery
                    </a>
                    <a
                      href="https://wa.me/919914900057"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-300 active:bg-emerald-100 transition-colors text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Navbar;

