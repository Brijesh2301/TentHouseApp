import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadOutlined, DeleteOutlined, StarOutlined, StarFilled,
  PictureOutlined,  CloseOutlined
} from '@ant-design/icons';
import AdminLayout from '../../components/admin/AdminLayout';
import { getGallery, uploadMedia, updateMedia, deleteMedia } from '../../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Corporate', 'Party', 'Baby Shower', 'Anniversary', 'Other'];

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [uploadModal, setUploadModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'Other', tags: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const params = filter !== 'All' ? { category: filter } : {};
      const res = await getGallery(params);
      setGallery(res.data.gallery);
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { toast.error('Please select a file'); return; }
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setUploading(true);
    try {
      const data = new FormData();
      data.append('media', file);
      data.append('title', form.title);
      data.append('description', form.description);
      data.append('category', form.category);
      data.append('tags', form.tags);
      await uploadMedia(data);
      toast.success('Media uploaded successfully!');
      setUploadModal(false);
      setForm({ title: '', description: '', category: 'Other', tags: '' });
      setFile(null);
      setPreview(null);
      fetchGallery();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggleFeatured = async (id, current) => {
    try {
      await updateMedia(id, { isFeatured: !current });
      toast.success(!current ? 'Marked as featured' : 'Removed from featured');
      fetchGallery();
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media item?')) return;
    try {
      await deleteMedia(id);
      toast.success('Deleted successfully');
      fetchGallery();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <>
      <Helmet><title>Gallery | Admin Panel</title></Helmet>
      <AdminLayout title="Gallery Management">
        <div className="space-y-6">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    filter === cat ? 'bg-gold-500 border-gold-500 text-charcoal' : 'border-gray-300 text-gray-600 hover:border-gold-400 bg-white'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <button onClick={() => setUploadModal(true)}
              className="btn-gold flex items-center gap-2">
              <UploadOutlined /> Upload Media
            </button>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-10 h-10 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-20 text-gray-400 bg-white rounded-2xl shadow-md">
              <PictureOutlined className="text-5xl mb-3" />
              <p className="font-heading text-lg">No media found</p>
              <p className="text-sm mt-1">Upload your first image or video</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {gallery.map((item, i) => (
                  <motion.div key={item._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.04 }}
                    className="group relative rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square"
                  >
                    {item.type === 'video' ? (
                      <video src={item.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100">
                      <div className="flex justify-between">
                        <span className="bg-gold-500 text-charcoal text-xs font-bold px-2 py-0.5 rounded-full">{item.category}</span>
                        <button onClick={() => toggleFeatured(item._id, item.isFeatured)}
                          className={`text-xl ${item.isFeatured ? 'text-gold-400' : 'text-white'} hover:text-gold-400 transition-colors`}>
                          {item.isFeatured ? <StarFilled /> : <StarOutlined />}
                        </button>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm truncate mb-2">{item.title}</p>
                        <button onClick={() => handleDelete(item._id)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <DeleteOutlined /> Delete
                        </button>
                      </div>
                    </div>

                    {/* Featured badge */}
                    {item.isFeatured && (
                      <div className="absolute top-2 left-2 bg-gold-500 text-charcoal text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <StarFilled className="text-xs" /> Featured
                      </div>
                    )}
                    {/* Type badge */}
                    {item.type === 'video' && (
                      <div className="absolute top-2 right-2 bg-charcoal/80 text-white text-xs px-2 py-0.5 rounded-full">VIDEO</div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {uploadModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setUploadModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-bold text-charcoal">Upload Media</h3>
                  <button onClick={() => setUploadModal(false)} className="text-gray-400 hover:text-gray-600 text-xl"><CloseOutlined /></button>
                </div>

                <form onSubmit={handleUpload} className="space-y-4">
                  {/* File Drop */}
                  <label className="block w-full border-2 border-dashed border-gold-300 rounded-2xl p-6 text-center cursor-pointer hover:border-gold-500 hover:bg-gold-50 transition-all">
                    {preview ? (
                      <div className="relative">
                        {file?.type.startsWith('video/') ? (
                          <video src={preview} className="max-h-32 mx-auto rounded-xl" muted />
                        ) : (
                          <img src={preview} alt="preview" className="max-h-32 mx-auto rounded-xl object-cover" />
                        )}
                        <p className="text-xs text-gray-500 mt-2 truncate">{file?.name}</p>
                      </div>
                    ) : (
                      <>
                        <UploadOutlined className="text-3xl text-gold-400 mb-2" />
                        <p className="text-sm font-semibold text-gray-600">Click to select image or video</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, MP4, MOV (max 50MB)</p>
                      </>
                    )}
                    <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
                  </label>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Title *</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Grand Wedding Decoration" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                      {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Tags (comma separated)</label>
                    <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      placeholder="wedding, flowers, mandap" className="input-field" />
                  </div>

                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={uploading} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70">
                    {uploading
                      ? <><span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> Uploading...</>
                      : <><UploadOutlined /> Upload</>}
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

export default GalleryAdmin;
