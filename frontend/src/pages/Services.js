import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartOutlined, GiftOutlined, TeamOutlined, StarOutlined,
  BulbOutlined, CrownOutlined, GlobalOutlined, HomeOutlined,
  CheckCircleFilled, ArrowRightOutlined
} from '@ant-design/icons';

const services = [
  {
    icon: <HeartOutlined />,
    title: 'Wedding Decoration',
    desc: 'From grand mandap setups to intimate ceremonies, we create breathtaking wedding decorations that reflect your love story. Complete floral arrangements, lighting design, stage setup, and venue transformation.',
    features: ['Mandap & Stage Setup', 'Floral Arrangements', 'Lighting & Draping', 'Entry Arch Decoration', 'Table Centerpieces', 'Phoolon Ki Chaadar'],
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: <GiftOutlined />,
    title: 'Birthday Parties',
    desc: 'Celebrate every milestone with vibrant, themed birthday decorations. From a child\'s dream party to elegant adult celebrations, we design experiences that create lifelong memories.',
    features: ['Custom Theme Setups', 'Balloon Decoration', 'Backdrop Design', 'Cake Table Styling', 'Photo Booth Area', 'Return Gift Setup'],
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: <TeamOutlined />,
    title: 'Corporate Events',
    desc: 'Professional, polished event setups for conferences, product launches, award nights, and team celebrations. We handle everything so you can focus on your business.',
    features: ['Stage & Podium Setup', 'LED Backdrop Screens', 'Conference Decoration', 'Brand Integration', 'Award Ceremony Setup', 'Networking Lounge Decor'],
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: <StarOutlined />,
    title: 'Party Decoration',
    desc: 'Make every party an unforgettable experience. Whether it\'s a house party, pool party, or a large celebration, our creative team designs stunning decor.',
    features: ['Theme-Based Decoration', 'Balloon Art', 'Fairy Light Setup', 'Customized Banners', 'DIY Photo Spots', 'Outdoor Setup'],
    img: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=700&q=80',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: <BulbOutlined />,
    title: 'Baby Shower',
    desc: 'Welcome your little one with adorable and elegant baby shower decorations. Pastel themes, gender reveals, and sweet setups that celebrate new beginnings.',
    features: ['Pastel Theme Decor', 'Gender Reveal Setup', 'Diaper Cake Display', 'Floral Crown Backdrop', 'Baby Photo Frame Wall', 'Sweet Table Setup'],
    img: 'https://images.unsplash.com/photo-1561623497-e1e6c527b535?w=700&q=80',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: <CrownOutlined />,
    title: 'Anniversary',
    desc: 'Celebrate your journey of love with romantic and elegant anniversary setups. Candles, flowers, and personalized touches make every anniversary truly special.',
    features: ['Candle Light Setup', 'Rose Petal Decoration', 'Couple Photo Wall', 'Romantic Table Setup', 'String Light Canopy', 'Personalized Banners'],
    img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80',
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: <GlobalOutlined />,
    title: 'Cultural Events',
    desc: 'Authentic decorations for festivals, pujas, cultural programs, and traditional ceremonies. We respect and honor every tradition with appropriate and beautiful setups.',
    features: ['Festival Decoration', 'Puja Setup', 'Traditional Themes', 'Stage & Backdrop', 'Flower Rangoli', 'Religious Decor'],
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: <HomeOutlined />,
    title: 'Tent House Setup',
    desc: 'Complete tent house installation with premium fabric, elegant draping, lighting, seating arrangements, and full event infrastructure for outdoor and indoor events.',
    features: ['Shamiyana Setup', 'Mandap Tent', 'Lighting Installation', 'Seating Arrangement', 'Generator & Power', 'Sound System Provision'],
    img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&q=80',
    color: 'from-yellow-500 to-amber-600',
  },
];

const Services = () => (
  <>
    <Helmet>
      <title>Our Services | Tent House & Decoration Services</title>
      <meta name="description" content="Explore our complete range of event decoration services including weddings, birthdays, corporate events, and more." />
    </Helmet>

    {/* Hero */}
    <div className="bg-charcoal pt-32 pb-16 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=60')" }} />
      <div className="relative z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-accent text-gold-400 italic text-xl mb-2">What We Offer</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-5xl text-white font-bold">
          Our Services
        </motion.h1>
        <div className="w-20 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Premium event decoration services tailored to your vision and budget</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="space-y-20">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Image */}
            <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80">
                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${svc.color} opacity-20`} />
                <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${svc.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
                  {svc.icon}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <h2 className="font-heading text-3xl font-bold text-charcoal mb-4">{svc.title}</h2>
              <p className="font-body text-gray-600 leading-relaxed mb-6">{svc.desc}</p>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircleFilled className="text-gold-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="btn-gold inline-flex items-center gap-2">
                Book This Service <ArrowRightOutlined />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-24 bg-gold-gradient rounded-3xl p-12 text-center text-white"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Dream Event?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Contact us for a free consultation and let's create something magical together.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/booking" className="bg-white text-gold-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
            Book Now
          </Link>
          <Link to="/contact" className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-gold-600 transition-colors">
            Get Free Quote
          </Link>
        </div>
      </motion.div>
    </div>
  </>
);

export default Services;
