import { useEffect } from 'react';
import { useAnimation, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export const useScrollReveal = (options = { once: true, margin: "-50px" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, options);
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!options.once) {
      controls.start("hidden");
    }
  }, [isInView, controls, options.once]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return { ref, controls, variants, staggerVariants, itemVariants, isInView };
};
