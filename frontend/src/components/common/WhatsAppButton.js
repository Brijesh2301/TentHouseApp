// WhatsAppButton.js
import React from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const number = process.env.REACT_APP_WHATSAPP_NUMBER || '919876543210';
  const msg = encodeURIComponent("Hello! I'm interested in your tent house decoration services. Can you help me?");

  return (
    <motion.a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl text-white text-2xl transition-colors"
      title="Chat on WhatsApp"
    >
      <WhatsAppOutlined />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </motion.a>
  );
};

export default WhatsAppButton;
