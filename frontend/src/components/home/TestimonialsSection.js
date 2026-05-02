import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarFilled, LeftOutlined, RightOutlined, CommentOutlined } from '@ant-design/icons';
import { getTestimonials } from '../../utils/api';

const fallback = [
  { _id: 1, name: 'Priya Sharma', role: 'Bride', rating: 5, review: 'The team at Tent House transformed our wedding venue into an absolute paradise! Every detail was perfect, from the floral arrangements to the lighting. We received so many compliments from our guests. Highly recommended!', eventType: 'Wedding', avatar: 'https://i.pravatar.cc/100?img=47' },
  { _id: 2, name: 'Rahul Mehta', role: 'Event Manager', rating: 5, review: "We've worked with Tent House for multiple corporate events and they never disappoint. Professional team, creative ideas, and always on time. Our clients are always impressed!", eventType: 'Corporate Event', avatar: 'https://i.pravatar.cc/100?img=12' },
  { _id: 3, name: 'Anita Verma', role: 'Happy Client', rating: 5, review: "My daughter's birthday party was a dream come true! The princess theme they created was magical. She couldn't stop smiling. Worth every penny!", eventType: 'Birthday', avatar: 'https://i.pravatar.cc/100?img=23' },
  { _id: 4, name: 'Vikram Singh', role: 'Groom', rating: 5, review: 'Exceptional service! They worked within our budget and still delivered beyond our expectations. The mandap decoration was stunning and the whole wedding setup was perfect.', eventType: 'Wedding', avatar: 'https://i.pravatar.cc/100?img=33' },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(fallback);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    getTestimonials()
      .then((res) => { if (res.data.testimonials?.length >= 2) setTestimonials(res.data.testimonials); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => { navigate(1); }, 5000);
    return () => clearInterval(timer);
  }, [current, testimonials.length]);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-40" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="section-subtitle mb-2">
            Client Love
          </motion.p>
          <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.1 }} className="section-title">
            What Our Clients Say
          </motion.h2>
          <div className="gold-divider" />
        </div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={t._id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center mx-4 relative"
            >
              <CommentOutlined className="text-5xl text-gold-200 absolute top-6 left-8" />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <StarFilled key={i} className="text-gold-500 text-xl" />
                ))}
              </div>

              {/* Review */}
              <p className="font-accent text-xl md:text-2xl text-charcoal italic leading-relaxed mb-8 max-w-2xl mx-auto">
                "{t.review}"
              </p>

              {/* Avatar + Name */}
              <div className="flex flex-col items-center gap-3">
                {t.avatar && (
                  <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-gold-200" />
                )}
                <div>
                  <p className="font-heading text-lg font-bold text-charcoal">{t.name}</p>
                  <p className="text-gold-600 text-sm font-body">{t.role} • {t.eventType}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white border-2 border-gold-300 hover:bg-gold-500 hover:border-gold-500 hover:text-white text-gold-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-md">
              <LeftOutlined />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-gold-500 scale-125' : 'bg-gold-200'}`}
              />
            ))}
            <button onClick={() => navigate(1)} className="w-12 h-12 bg-white border-2 border-gold-300 hover:bg-gold-500 hover:border-gold-500 hover:text-white text-gold-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-md">
              <RightOutlined />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
