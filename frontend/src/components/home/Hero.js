import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarOutlined, StarFilled, PhoneOutlined } from '@ant-design/icons';

const Hero = () => {
  const whatsapp = process.env.REACT_APP_WHATSAPP_NUMBER || '919876543210';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-64 h-64 border border-gold-400/20 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-28 right-28 w-48 h-48 border border-gold-400/30 rounded-full hidden lg:block"
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/40 backdrop-blur-sm text-gold-300 px-5 py-2 rounded-full text-sm font-body mb-6"
        >
          <StarFilled className="text-gold-400" />
          <span>Premium Event Decoration Services</span>
          <StarFilled className="text-gold-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-4"
        >
          Create{' '}
          <span className="text-shimmer">Magical</span>
          <br />
          Moments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-accent text-xl md:text-2xl text-white/80 italic mb-4 max-w-2xl mx-auto"
        >
          Transforming your dreams into extraordinary celebrations
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-body text-white/60 text-base mb-10 max-w-xl mx-auto"
        >
          Weddings • Birthdays • Corporate Events • Baby Showers • Anniversaries
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Link to="/booking" className="btn-gold flex items-center gap-2 text-base">
            <CalendarOutlined /> Book Your Event
          </Link>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-charcoal font-bold px-8 py-3 rounded-full transition-all duration-300 text-base"
          >
            <PhoneOutlined /> Call Us Now
          </a>
          <Link to="/gallery" className="btn-outline-gold text-base border-gold-400">
            View Our Work
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {[
            { value: '500+', label: 'Events Done' },
            { value: '13+', label: 'Years Experience' },
            { value: '4.9★', label: 'Client Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-gold-400">{stat.value}</p>
              <p className="font-body text-white/60 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
