import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  SearchOutlined, EditOutlined, DeleteOutlined,
  CalendarOutlined, EyeOutlined, FilterOutlined
} from '@ant-design/icons';
import AdminLayout from '../../components/admin/AdminLayout';
import { getBookings, updateBooking, deleteBooking } from '../../utils/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Confirmed: 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-purple-100 text-purple-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const STATUSES = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (filterStatus) params.status = filterStatus;
      const res = await getBookings(params);
      setBookings(res.data.bookings);
      setTotal(res.data.total);
    } catch {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [page, filterStatus]);

  const handleStatusUpdate = async (id, status) => {
    setUpdating(true);
    try {
      await updateBooking(id, { status });
      toast.success('Status updated successfully');
      fetchBookings();
      if (selectedBooking?._id === id) {
        setSelectedBooking((prev) => ({ ...prev, status }));
      }
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteBooking(id);
      toast.success('Booking deleted');
      fetchBookings();
      if (modalOpen) setModalOpen(false);
    } catch {
      toast.error('Failed to delete booking');
    }
  };

  const filtered = bookings.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.email?.toLowerCase().includes(search.toLowerCase()) ||
    b.eventType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Bookings | Admin Panel</title></Helmet>
      <AdminLayout title="Bookings Management">
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <SearchOutlined className="absolute left-3 top-3 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, event type..."
                className="input-field pl-9 py-2.5"
              />
            </div>
            <div className="flex items-center gap-2">
              <FilterOutlined className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                className="input-field py-2.5 min-w-[160px]"
              >
                <option value="">All Statuses</option>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Total: <strong>{total}</strong> bookings
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <CalendarOutlined className="text-5xl mb-3" />
                <p className="font-heading text-lg">No bookings found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {['Client', 'Event Type', 'Date', 'Location', 'Guests', 'Budget', 'Status', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((b, i) => (
                      <motion.tr key={b._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-gold-50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-semibold text-charcoal">{b.name}</p>
                            <p className="text-gray-500 text-xs">{b.email}</p>
                            <p className="text-gray-500 text-xs">{b.phone}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-charcoal">{b.eventType}</td>
                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                          {new Date(b.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4 text-gray-600 max-w-[150px] truncate">{b.location}</td>
                        <td className="px-5 py-4 text-center text-gray-600">{b.guestCount}</td>
                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{b.budget}</td>
                        <td className="px-5 py-4">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusUpdate(b._id, e.target.value)}
                            disabled={updating}
                            className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[b.status]}`}
                          >
                            {STATUSES.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setSelectedBooking(b); setModalOpen(true); }}
                              className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <EyeOutlined />
                            </button>
                            <button
                              onClick={() => handleDelete(b._id)}
                              className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <DeleteOutlined />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {total > 10 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Page {page} of {Math.ceil(total / 10)}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold disabled:opacity-40 hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 10)}
                    className="px-4 py-2 rounded-lg bg-gold-500 text-charcoal text-sm font-semibold disabled:opacity-40 hover:bg-gold-600 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {modalOpen && selectedBooking && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-charcoal">{selectedBooking.name}</h3>
                  <p className="text-gray-500 text-sm">{selectedBooking.email} • {selectedBooking.phone}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[selectedBooking.status]}`}>
                  {selectedBooking.status}
                </span>
              </div>

              <div className="space-y-3 text-sm mb-6">
                {[
                  ['Event Type', selectedBooking.eventType],
                  ['Event Date', new Date(selectedBooking.eventDate).toDateString()],
                  ['Location', selectedBooking.location],
                  ['Guest Count', selectedBooking.guestCount],
                  ['Budget', selectedBooking.budget],
                  ['Booked On', new Date(selectedBooking.createdAt).toDateString()],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3 py-2 border-b border-gray-100">
                    <span className="text-gray-500 w-28 flex-shrink-0 font-medium">{label}</span>
                    <span className="text-charcoal font-semibold">{value}</span>
                  </div>
                ))}
                {selectedBooking.services?.length > 0 && (
                  <div className="py-2 border-b border-gray-100">
                    <p className="text-gray-500 font-medium mb-2">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBooking.services.map((s) => (
                        <span key={s} className="bg-gold-100 text-gold-700 text-xs px-2 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedBooking.specialRequests && (
                  <div className="py-2">
                    <p className="text-gray-500 font-medium mb-1">Special Requests</p>
                    <p className="text-charcoal">{selectedBooking.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <select
                  value={selectedBooking.status}
                  onChange={(e) => handleStatusUpdate(selectedBooking._id, e.target.value)}
                  className="input-field flex-1 py-2.5"
                >
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => handleDelete(selectedBooking._id)}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <DeleteOutlined /> Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminBookings;
