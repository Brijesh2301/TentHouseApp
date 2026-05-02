import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined,
  TrophyOutlined, UserOutlined, ArrowUpOutlined
} from '@ant-design/icons';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDashboardStats } from '../../utils/api';

const StatCard = ({ icon, label, value, color, delay, sub }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm font-body mb-1">{label}</p>
        <p className={`font-heading text-3xl font-bold ${color}`}>{value}</p>
        {sub && <p className="text-green-500 text-xs mt-1 flex items-center gap-1"><ArrowUpOutlined />{sub}</p>}
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-white bg-gradient-to-br ${color.replace('text-', 'from-').replace('-600', '-400')} to-current`}
        style={{ background: color.includes('gold') ? 'linear-gradient(135deg,#D4AF37,#8B5E3C)' : color.includes('green') ? 'linear-gradient(135deg,#22c55e,#16a34a)' : color.includes('blue') ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#a855f7,#7c3aed)' }}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { icon: <CalendarOutlined />, label: 'Total Bookings', value: stats.stats.totalBookings, color: 'text-gold-600', sub: 'All time', delay: 0.1 },
    { icon: <ClockCircleOutlined />, label: 'Pending Bookings', value: stats.stats.pendingBookings, color: 'text-yellow-600', sub: 'Awaiting review', delay: 0.2 },
    { icon: <CheckCircleOutlined />, label: 'Confirmed', value: stats.stats.confirmedBookings, color: 'text-green-600', sub: 'Ready to go', delay: 0.3 },
    { icon: <TrophyOutlined />, label: 'Completed', value: stats.stats.completedBookings, color: 'text-purple-600', sub: 'Successfully done', delay: 0.4 },
  ] : [];

  return (
    <>
      <Helmet><title>Dashboard | Admin Panel</title></Helmet>
      <AdminLayout title="Dashboard">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-gold-gradient rounded-2xl p-6 text-white">
              <h2 className="font-heading text-2xl font-bold mb-1">Welcome to Admin Panel 👋</h2>
              <p className="text-white/80 text-sm">Here's what's happening with your business today.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map((card) => <StatCard key={card.label} {...card} />)}
            </div>

            {/* Recent bookings + Event types */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-5 flex items-center gap-2">
                  <CalendarOutlined className="text-gold-500" /> Recent Bookings
                </h3>
                {stats?.recentBookings?.length ? (
                  <div className="space-y-3">
                    {stats.recentBookings.map((b, i) => (
                      <motion.div key={b._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gold-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gold-gradient rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {b.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal text-sm">{b.name}</p>
                            <p className="text-gray-500 text-xs">{b.eventType} • {new Date(b.eventDate).toDateString()}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          b.status === 'Confirmed' ? 'bg-green-100 text-green-700'
                          : b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                          : b.status === 'Completed' ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600'
                        }`}>{b.status}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <CalendarOutlined className="text-4xl mb-3" />
                    <p>No bookings yet</p>
                  </div>
                )}
              </div>

              {/* Event Types */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-5 flex items-center gap-2">
                  <UserOutlined className="text-gold-500" /> Event Breakdown
                </h3>
                {stats?.eventTypes?.length ? (
                  <div className="space-y-3">
                    {stats.eventTypes.sort((a, b) => b.count - a.count).map((et) => {
                      const max = Math.max(...stats.eventTypes.map((e) => e.count));
                      const pct = Math.round((et.count / max) * 100);
                      return (
                        <div key={et._id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-charcoal font-semibold">{et._id}</span>
                            <span className="text-gray-500">{et.count}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="h-2 bg-gold-gradient rounded-full" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p>No data yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Dashboard;
