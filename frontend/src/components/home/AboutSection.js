import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleFilled, TrophyOutlined, SmileOutlined, ClockCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const features = [
  { icon: <TrophyOutlined />, title: '13+ Years Experience', desc: 'Over a decade of creating magical events across Mumbai and Maharashtra.' },
  { icon: <SmileOutlined />, title: '500+ Happy Clients', desc: 'Thousands of satisfied customers who trust us with their most special moments.' },
  { icon: <ClockCircleOutlined />, title: 'On-Time Delivery', desc: 'We guarantee setup completion before your event starts. Always.' },
  { icon: <SafetyCertificateOutlined />, title: 'Quality Assured', desc: 'Premium materials, professional team, and meticulous attention to detail.' },
];

const whyUs = [
  'Custom designs tailored to your vision and budget',
  'End-to-end event management support',
  'Transparent pricing with no hidden costs',
  'Free consultation and venue visit',
  'Large inventory of props, lights & décor items',
  'Experienced and dedicated decoration team',
];

const AboutSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
              alt="About us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 bg-gold-gradient rounded-xl flex items-center justify-center text-white text-2xl font-heading font-bold flex-shrink-0">13</div>
                <div>
                  <p className="font-heading font-bold text-charcoal text-lg leading-tight">Years of Excellence</p>
                  <p className="text-gray-500 text-sm">Creating unforgettable celebrations</p>
                </div>
              </div>
            </div>
          </div>
          {/* Floating stat */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-6 -right-6 bg-gold-500 text-white rounded-2xl p-4 shadow-xl text-center"
          >
            <p className="font-heading text-3xl font-bold">500+</p>
            <p className="text-xs font-body">Events Done</p>
          </motion.div>
        </motion.div>

        {/* Content side */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-subtitle mb-2">About Us</p>
          <h2 className="section-title mb-4">
            Crafting Dreams Into <span className="text-gold-500">Reality</span>
          </h2>
          <div className="w-16 h-1 bg-gold-gradient rounded-full mb-6" />
          <p className="font-body text-gray-600 leading-relaxed mb-4">
            At <strong className="text-charcoal">Tent House & Decoration Services</strong>, we believe every celebration deserves to be extraordinary. Since 2010, we've been transforming spaces into magical experiences across Mumbai and Maharashtra.
          </p>
          <p className="font-body text-gray-600 leading-relaxed mb-8">
            Our passionate team of decorators, designers, and event specialists work tirelessly to understand your vision and bring it to life — whether it's an intimate family gathering or a grand wedding for 1000+ guests.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {whyUs.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm font-body text-gray-700">
                <CheckCircleFilled className="text-gold-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Link to="/about" className="btn-gold inline-flex">
            Learn More About Us
          </Link>
        </motion.div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="text-center p-6 rounded-2xl bg-cream border border-gold-100 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gold-gradient rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
              {f.icon}
            </div>
            <h4 className="font-heading text-base font-bold text-charcoal mb-2">{f.title}</h4>
            <p className="text-gray-600 text-xs font-body leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
