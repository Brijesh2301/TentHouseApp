import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartOutlined, GiftOutlined, TeamOutlined, StarOutlined,
  SmileOutlined, CrownOutlined, GlobalOutlined, ArrowRightOutlined
} from '@ant-design/icons';

const services = [
  {
    icon: <HeartOutlined />,
    title: 'Wedding Decoration',
    desc: 'Breathtaking mandap setups, floral arrangements, lighting, and complete venue transformation for your perfect wedding day.',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  },
  {
    icon: <GiftOutlined />,
    title: 'Birthday Parties',
    desc: 'Themed birthday celebrations with balloon decorations, custom setups, and memorable experiences for all ages.',
    color: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
  },
  {
    icon: <TeamOutlined />,
    title: 'Corporate Events',
    desc: 'Professional event setups for conferences, product launches, team parties, and business celebrations.',
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80',
  },
  {
    icon: <StarOutlined />,
    title: 'Party Decoration',
    desc: 'Vibrant and creative decoration for all types of parties — from intimate gatherings to large celebrations.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    img: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=400&q=80',
  },
  {
    icon: <SmileOutlined />,
    title: 'Baby Shower',
    desc: 'Adorable and elegant baby shower setups with pastel themes, balloons, and sweet decorative details.',
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
    img: 'https://images.unsplash.com/photo-1561623497-e1e6c527b535?w=400&q=80',
  },
  {
    icon: <CrownOutlined />,
    title: 'Anniversary',
    desc: 'Romantic anniversary setups with candles, flowers, and personalized decorations to celebrate your love.',
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80',
  },
  {
    icon: <GlobalOutlined />,
    title: 'Cultural Events',
    desc: 'Authentic and vibrant decorations for festivals, cultural programs, and traditional ceremonies.',
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
  },
  {
    icon: <HeartOutlined />,
    title: 'Tent House Setup',
    desc: 'Complete tent house installation with elegant fabric, lighting, seating, and full event infrastructure.',
    color: 'from-gold-500 to-brown-700',
    bg: 'bg-amber-50',
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ServicesSection = () => (
  <section className="py-24 bg-cream">
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          className="section-subtitle mb-2"
        >
          What We Offer
        </motion.p>
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          Our Premium Services
        </motion.h2>
        <div className="gold-divider" />
        <motion.p
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto mt-4 font-body"
        >
          From intimate gatherings to grand celebrations, we bring your vision to life with expert craftsmanship and attention to detail.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((svc) => (
          <motion.div
            key={svc.title}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={svc.img}
                alt={svc.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${svc.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
              <div className={`absolute top-4 left-4 w-10 h-10 bg-gradient-to-br ${svc.color} rounded-xl flex items-center justify-center text-white text-lg shadow-lg`}>
                {svc.icon}
              </div>
            </div>
            {/* Content */}
            <div className="p-5">
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">{svc.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-body mb-4">{svc.desc}</p>
              <Link
                to="/services"
                className="text-gold-600 font-semibold text-sm flex items-center gap-1 hover:gap-3 transition-all duration-300"
              >
                Learn More <ArrowRightOutlined />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        className="text-center mt-12"
      >
        <Link to="/services" className="btn-gold">
          View All Services
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;