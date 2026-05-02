import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
      className="w-16 h-16 border-4 border-gold-200 border-t-gold-500 rounded-full mb-6"
    />
    <motion.p
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="font-heading text-gold-600 text-xl italic"
    >
      Preparing your experience...
    </motion.p>
  </div>
);

export default PageLoader;
