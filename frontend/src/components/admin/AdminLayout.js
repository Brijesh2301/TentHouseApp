import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DashboardOutlined, CalendarOutlined, PictureOutlined,
  StarOutlined, MessageOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined, LogoutOutlined, UserOutlined, HomeOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <DashboardOutlined /> },
  { path: '/admin/bookings', label: 'Bookings', icon: <CalendarOutlined /> },
  { path: '/admin/gallery', label: 'Gallery', icon: <PictureOutlined /> },
  { path: '/admin/testimonials', label: 'Testimonials', icon: <StarOutlined /> },
  { path: '/admin/contacts', label: 'Contacts', icon: <MessageOutlined /> },
];

const AdminLayout = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-charcoal flex flex-col fixed top-0 left-0 h-screen z-50 overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 min-h-[72px]">
          <div className="w-9 h-9 bg-gold-gradient rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-heading font-bold">T</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <p className="font-heading text-white font-bold text-sm leading-none">Tent House</p>
                <p className="text-gold-400 text-xs">Admin Panel</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive ? 'bg-gold-500 text-charcoal' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}>
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="font-semibold text-sm whitespace-nowrap">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-3 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all">
            <HomeOutlined className="text-lg flex-shrink-0" />
            <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm">View Site</motion.span>}</AnimatePresence>
          </Link>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400">
            <UserOutlined className="text-lg flex-shrink-0" />
            <AnimatePresence>{!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm truncate">
                {user?.name}
              </motion.span>
            )}</AnimatePresence>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
            <LogoutOutlined className="text-lg flex-shrink-0" />
            <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm">Logout</motion.span>}</AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-[240px]'}`}>
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setCollapsed(!collapsed)}
              className="text-gray-500 hover:text-charcoal text-xl transition-colors">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <h1 className="font-heading text-xl font-bold text-charcoal">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-charcoal leading-none">{user?.name}</p>
              <p className="text-xs text-gold-600">Administrator</p>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
