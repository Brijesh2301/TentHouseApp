import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseOutlined, EyeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { getGallery } from '../../utils/api';

const fallbackImages = [
  { _id: 1, url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80', title: 'Grand Wedding', category: 'Wedding', type: 'image' },
  { _id: 2, url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', title: 'Birthday Bash', category: 'Birthday', type: 'image' },
  { _id: 3, url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80', title: 'Corporate Gala', category: 'Corporate', type: 'image' },
  { _id: 4, url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80', title: 'Birthday Celebration', category: 'Birthday', type: 'image' },
  { _id: 5, url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', title: 'Cultural Fest', category: 'Other', type: 'image' },
  { _id: 6, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', title: 'Anniversary Night', category: 'Anniversary', type: 'image' },
];

const GalleryPreview = () => {
  const [images, setImages] = useState(fallbackImages);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    getGallery({ featured: true })
      .then((res) => {
        if (res.data.gallery?.length) setImages(res.data.gallery.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="font-accent text-xl text-gold-400 italic mb-2">
            Our Portfolio
          </motion.p>
          <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-5xl text-white font-bold">
            Moments We've Created
          </motion.h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto my-4 rounded-full" />
          <motion.p whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-xl mx-auto">
            A glimpse into the magical experiences we've crafted for our clients
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${i === 0 ? 'md:row-span-2' : ''}`}
              style={{ height: i === 0 ? '420px' : '200px' }}
              onClick={() => setLightbox(item)}
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                  {item.type === 'video' ? (
                    <PlayCircleOutlined className="text-4xl text-gold-400" />
                  ) : (
                    <EyeOutlined className="text-3xl text-gold-400" />
                  )}
                  <p className="font-heading text-sm font-bold">{item.title}</p>
                  <span className="text-gold-400 text-xs border border-gold-400 px-2 py-0.5 rounded-full">{item.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="text-center mt-12">
          <Link to="/gallery" className="btn-gold">
            View Full Gallery
          </Link>
        </motion.div>
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
            <button
              className="absolute top-6 right-6 text-white text-3xl hover:text-gold-400 transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <CloseOutlined />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-[85vh] mx-4"
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPreview;
