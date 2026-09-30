import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Plants from './pages/Plants';
import PlantDetail from './pages/PlantDetail';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const NotFound = () => (
  <div className="min-h-screen pt-32 pb-16 bg-[#FAFAF7] flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-6xl font-serif text-[#1A3622] mb-4">404</h1>
    <h2 className="text-2xl font-serif text-[#1A3622] mb-4">Page Not Found</h2>
    <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
    <a href="/" className="px-6 py-3 bg-[#1A3622] text-[#FAFAF7] rounded-full hover:bg-[#254A2F] transition-colors">
      Return Home
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen text-[#1A3622] bg-[#FAFAF7]">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plants" element={<Plants />} />
              <Route path="/plant/:id" element={<PlantDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
