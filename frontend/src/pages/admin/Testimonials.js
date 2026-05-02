import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StarFilled, StarOutlined, CheckOutlined, DeleteOutlined,
  PlusOutlined, CloseOutlined
} from '@ant-design/icons';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllTestimonials, updateTestimonial, deleteTestimonial, createTestimonial } from '../../utils/api';
import toast from 'react-hot-toast';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'Client', email: '', rating: 5, review: '', eventType: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await getAllTestimonials();
      setTestimonials(res.data.testimonials);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleApprove = async (id, current) => {
    try {
      await updateTestimonial(id, { isApproved: !current });
      toast.success(!current ? 'Testimonial approved' : 'Approval removed');
      fetchTestimonials();
    } catch { toast.error('Failed to update'); }
  };

  const handleFeatured = async (id, current) => {
    try {
      await updateTestimonial(id, { isFeatured: !current });
      toast.success(!current ? 'Marked as featured' : 'Removed from featured');
      fetchTestimonials();
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Deleted successfully');
      fetchTestimonials();
    } catch { toast.error('Failed to delete'); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) { toast.error('Name and review are required'); return; }
    setSubmitting(true);
    try {
      await createTestimonial({ ...form, isApproved: true });
      toast.success('Testimonial added!');
      setAddModal(false);
      setForm({ name: '', role: 'Client', email: '', rating: 5, review: '', eventType: '' });
      fetchTestimonials();
    } catch { toast.error('Failed to add testimonial'); }
    finally { setSubmitting(false); }
  };

  const filtered = testimonials.filter((t) => {
    if (filter === 'approved') return t.isApproved;
    if (filter === 'pending') return !t.isApproved;
    if (filter === 'featured') return t.isFeatured;
    return true;
  });

  return (
    <>
      <Helmet><title>Testimonials | Admin Panel</title></Helmet>
      <AdminLayout title="Testimonials Management">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              {[['all', 'All'], ['approved', 'Approved'], ['pending', 'Pending'], ['featured', 'Featured']].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    filter === val ? 'bg-gold-500 border-gold-500 text-charcoal' : 'border-gray-300 text-gray-600 hover:border-gold-400 bg-white'
                  }`}>
                  {label}
                  <span className="ml-2 bg-white/30 px-1.5 py-0.5 rounded-full text-xs">
                    {val === 'all' ? testimonials.length
                      : val === 'approved' ? testimonials.filter((t) => t.isApproved).length
                      : val === 'pending' ? testimonials.filter((t) => !t.isApproved).length
                      : testimonials.filter((t) => t.isFeatured).length}
                  </span>
                </button>
              ))}
            </div>
            <button onClick={() => setAddModal(true)} className="btn-gold flex items-center gap-2">
              <PlusOutlined /> Add Testimonial
            </button>
          </div>

          {/* List */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-10 h-10 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md text-gray-400">
              <StarOutlined className="text-5xl mb-3" />
              <p className="font-heading text-lg">No testimonials found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((t, i) => (
                <motion.div key={t._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {t.name[0].toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <h4 className="font-heading font-bold text-charcoal">{t.name}</h4>
                          <span className="text-gray-500 text-sm">• {t.role}</span>
                          {t.eventType && <span className="bg-gold-100 text-gold-700 text-xs px-2 py-0.5 rounded-full">{t.eventType}</span>}
                          {t.isApproved && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><CheckOutlined />Approved</span>}
                          {t.isFeatured && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><StarFilled className="text-xs" />Featured</span>}
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[...Array(5)].map((_, idx) => (
                            <StarFilled key={idx} className={`text-sm ${idx < t.rating ? 'text-gold-500' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed italic">"{t.review}"</p>
                        <p className="text-gray-400 text-xs mt-2">{new Date(t.createdAt).toDateString()}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button onClick={() => handleApprove(t._id, t.isApproved)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors text-sm ${
                          t.isApproved ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500'
                        }`} title={t.isApproved ? 'Remove approval' : 'Approve'}>
                        <CheckOutlined />
                      </button>
                      <button onClick={() => handleFeatured(t._id, t.isFeatured)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors text-sm ${
                          t.isFeatured ? 'bg-gold-100 text-gold-600 hover:bg-gold-200' : 'bg-gray-100 text-gray-400 hover:bg-gold-50 hover:text-gold-500'
                        }`} title={t.isFeatured ? 'Remove featured' : 'Mark featured'}>
                        {t.isFeatured ? <StarFilled /> : <StarOutlined />}
                      </button>
                      <button onClick={() => handleDelete(t._id)}
                        className="w-9 h-9 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors text-sm"
                        title="Delete">
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Add Modal */}
        <AnimatePresence>
          {addModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setAddModal(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-bold text-charcoal">Add Testimonial</h3>
                  <button onClick={() => setAddModal(false)} className="text-gray-400 hover:text-gray-600"><CloseOutlined /></button>
                </div>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-1.5">Name *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Client name" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-1.5">Role</label>
                      <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="Bride, Groom, Client..." className="input-field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-1.5">Event Type</label>
                      <input value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                        placeholder="Wedding, Birthday..." className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-1.5">Rating</label>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })}>
                            <StarFilled className={`text-xl ${r <= form.rating ? 'text-gold-500' : 'text-gray-200'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Review *</label>
                    <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })}
                      rows={4} placeholder="Client's testimonial..." className="input-field resize-none" />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={submitting} className="btn-gold w-full flex items-center justify-center gap-2">
                    {submitting ? <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> : <PlusOutlined />}
                    Add Testimonial
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AdminLayout>
    </>
  );
};

export default AdminTestimonials;
