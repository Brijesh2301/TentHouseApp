import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined,
  DashboardOutlined, PhoneOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-heading font-bold text-lg">T</span>
            </div>
            <div>
              <p className="font-heading font-bold text-charcoal text-lg leading-none">Tent House</p>
              <p className="text-gold-600 text-xs font-accent italic">& Decoration Services</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link font-body text-sm font-semibold tracking-wide ${
                  isActive(link.path) ? 'text-gold-500' : scrolled ? 'text-charcoal' : 'text-charcoal'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <button onClick={() => navigate('/admin')} className="flex items-center gap-1 text-sm text-charcoal hover:text-gold-500 transition-colors">
                    <DashboardOutlined /> Admin
                  </button>
                )}
                <div className="flex items-center gap-2 text-sm text-charcoal">
                  <UserOutlined className="text-gold-500" />
                  <span className="font-semibold">{user.name.split(' ')[0]}</span>
                </div>
                <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1">
                  <LogoutOutlined /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-semibold text-charcoal hover:text-gold-500 transition-colors flex items-center gap-1">
                <UserOutlined /> Login
              </Link>
            )}
            <Link to="/booking" className="btn-gold text-sm py-2 px-6">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-charcoal text-2xl p-2"
          >
            {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gold-100 shadow-xl"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-semibold text-base py-2 border-b border-gray-100 ${
                    isActive(link.path) ? 'text-gold-500' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 text-gold-600 font-semibold mt-2">
                <PhoneOutlined /> +91 98765 43210
              </div>
              <Link to="/booking" className="btn-gold text-center mt-2">
                Book Now
              </Link>
              {user ? (
                <button onClick={logout} className="text-red-500 font-semibold text-left">
                  <LogoutOutlined /> Logout
                </button>
              ) : (
                <Link to="/login" className="text-charcoal font-semibold flex items-center gap-1">
                  <UserOutlined /> Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
