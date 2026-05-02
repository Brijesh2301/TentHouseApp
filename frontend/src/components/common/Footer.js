import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneOutlined, MailOutlined, EnvironmentOutlined,
  FacebookOutlined, InstagramOutlined, YoutubeOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const Footer = () => {
  const whatsapp = process.env.REACT_APP_WHATSAPP_NUMBER || '919876543210';

  return (
    <footer className="bg-charcoal text-white">
      {/* CTA Band */}
      <div className="bg-gold-gradient py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            className="font-heading text-3xl md:text-4xl text-white font-bold mb-3"
          >
            Ready to Make Your Event Unforgettable?
          </motion.h2>
          <p className="text-white/80 font-body mb-6 text-lg">
            Let us transform your vision into a magical celebration
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="bg-white text-gold-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Book Now
            </Link>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-gold-600 transition-colors flex items-center gap-2"
            >
              <WhatsAppOutlined /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">T</span>
            </div>
            <div>
              <p className="font-heading font-bold text-white text-lg leading-none">Tent House</p>
              <p className="text-gold-400 text-xs font-accent italic">& Decoration Services</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Creating magical moments and unforgettable celebrations since 2010. Your dream event is our passion.
          </p>
          <div className="flex gap-4 mt-5">
            {[
              { icon: <FacebookOutlined />, href: '#' },
              { icon: <InstagramOutlined />, href: '#' },
              { icon: <YoutubeOutlined />, href: '#' },
              { icon: <WhatsAppOutlined />, href: `https://wa.me/${whatsapp}` },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors text-white">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-white text-lg font-bold mb-5 pb-2 border-b border-gold-600">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'Services', 'Gallery', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-gold-400 transition-colors text-sm flex items-center gap-2">
                  <span className="text-gold-500">›</span> {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading text-white text-lg font-bold mb-5 pb-2 border-b border-gold-600">Our Services</h4>
          <ul className="space-y-2">
            {['Wedding Decoration', 'Birthday Parties', 'Corporate Events', 'Baby Showers', 'Anniversary', 'Cultural Events'].map((s) => (
              <li key={s}>
                <Link to="/services" className="text-gray-400 hover:text-gold-400 transition-colors text-sm flex items-center gap-2">
                  <span className="text-gold-500">›</span> {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-white text-lg font-bold mb-5 pb-2 border-b border-gold-600">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <EnvironmentOutlined className="text-gold-500 mt-0.5 flex-shrink-0" />
              <span>123 Event Street, Mumbai, Maharashtra 400001</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <PhoneOutlined className="text-gold-500 flex-shrink-0" />
              <a href="tel:+919876543210" className="text-gray-400 hover:text-gold-400 transition-colors">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <MailOutlined className="text-gold-500 flex-shrink-0" />
              <a href="mailto:info@tenthouse.com" className="text-gray-400 hover:text-gold-400 transition-colors">info@tenthouse.com</a>
            </li>
          </ul>
          <div className="mt-5 p-3 bg-white/5 rounded-xl text-xs text-gray-500">
            <p className="text-gold-400 font-semibold mb-1">Working Hours</p>
            <p>Mon–Sat: 9:00 AM – 8:00 PM</p>
            <p>Sunday: By Appointment Only</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 px-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Tent House & Decoration Services. All rights reserved.</p>
        <p className="mt-1 text-xs">Designed with ❤️ for memorable celebrations</p>
      </div>
    </footer>
  );
};

export default Footer;
