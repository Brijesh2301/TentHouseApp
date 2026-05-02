import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOutlined, PlayCircleOutlined, CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getGallery } from '../utils/api';

const fallback = [
  { _id: '1', url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', title: 'Grand Wedding', category: 'Wedding', type: 'image' },
  { _id: '2', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', title: 'Birthday Setup', category: 'Birthday', type: 'image' },
  { _id: '3', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', title: 'Corporate Event', category: 'Corporate', type: 'image' },
  { _id: '4', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', title: 'Birthday Bash', category: 'Birthday', type: 'image' },
  { _id: '5', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', title: 'Anniversary Night', category: 'Anniversary', type: 'image' },
  { _id: '6', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', title: 'Cultural Event', category: 'Other', type: 'image' },
  { _id: '7', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Wedding Ceremony', category: 'Wedding', type: 'image' },
  { _id: '8', url: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=800&q=80', title: 'Party Lights', category: 'Party', type: 'image' },
  { _id: '9', url: 'https://images.unsplash.com/photo-1561623497-e1e6c527b535?w=800&q=80', title: 'Baby Shower', category: 'Baby Shower', type: 'image' },
];

const categories = ['All', 'Wedding', 'Birthday', 'Corporate', 'Party', 'Baby Shower', 'Anniversary', 'Other'];

const GalleryPage = () => {
  const [gallery, setGallery] = useState(fallback);
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [lbIndex, setLbIndex] = useState(0);

  useEffect(() => {
    getGallery()
      .then((res) => { if (res.data.gallery?.length) setGallery(res.data.gallery); })
      .catch(() => {});
  }, []);

  const filtered = active === 'All' ? gallery : gallery.filter((g) => g.category === active);

  const openLightbox = (item, idx) => {
    setLightbox(item);
    setLbIndex(idx);
  };

  const navigate = (dir) => {
    const newIdx = (lbIndex + dir + filtered.length) % filtered.length;
    setLbIndex(newIdx);
    setLightbox(filtered[newIdx]);
  };

  return (
    <>
      <Helmet>
        <title>Gallery | Tent House & Decoration Services</title>
      </Helmet>

      {/* Hero */}
      <div className="bg-charcoal pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=60')" }} />
        <div className="relative z-10">
          <motion.p whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="font-accent text-gold-400 italic text-xl mb-2">Our Portfolio</motion.p>
          <motion.h1 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} className="font-heading text-4xl md:text-5xl text-white font-bold">
            Event Gallery
          </motion.h1>
          <div className="w-20 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">Browse our portfolio of breathtaking event decorations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold text-sm border-2 transition-all duration-300 ${
                active === cat
                  ? 'bg-gold-500 border-gold-500 text-charcoal'
                  : 'border-gray-300 text-gray-600 hover:border-gold-400'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="relative group cursor-pointer rounded-2xl overflow-hidden break-inside-avoid mb-4"
                onClick={() => openLightbox(item, i)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircleOutlined className="text-5xl text-white drop-shadow-lg" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <EyeOutlined className="text-3xl text-gold-400" />
                  <p className="font-heading text-white text-sm font-bold">{item.title}</p>
                  <span className="text-gold-400 text-xs border border-gold-400 px-3 py-0.5 rounded-full">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📷</p>
            <p className="font-heading text-xl">No images in this category yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white text-3xl hover:text-gold-400 z-10" onClick={() => setLightbox(null)}>
              <CloseOutlined />
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gold-400 z-10 bg-black/30 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
              <LeftOutlined />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gold-400 z-10 bg-black/30 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}>
              <RightOutlined />
            </button>
            <motion.div
              key={lightbox._id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl max-h-[85vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === 'video' ? (
                <video controls autoPlay className="max-h-[80vh] rounded-xl w-full">
                  <source src={lightbox.url} />
                </video>
              ) : (
                <img src={lightbox.url} alt={lightbox.title} className="max-h-[80vh] rounded-xl object-contain mx-auto" />
              )}
              <div className="text-center mt-4">
                <p className="font-heading text-white text-xl">{lightbox.title}</p>
                <p className="text-gold-400 text-sm">{lightbox.category}</p>
                <p className="text-gray-500 text-xs mt-1">{lbIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
