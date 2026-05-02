import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  MessageOutlined, CheckOutlined, DeleteOutlined,
  MailOutlined, PhoneOutlined, EyeOutlined
} from '@ant-design/icons';
import AdminLayout from '../../components/admin/AdminLayout';
import { getContacts, markContactRead, deleteContact } from '../../utils/api';
import toast from 'react-hot-toast';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getContacts();
      setContacts(res.data.contacts);
    } catch {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleRead = async (id) => {
    try {
      await markContactRead(id);
      fetchContacts();
      if (selected?._id === id) setSelected((prev) => ({ ...prev, isRead: true }));
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteContact(id);
      toast.success('Message deleted');
      fetchContacts();
      if (selected?._id === id) setSelected(null);
    } catch { toast.error('Failed to delete'); }
  };

  const openMessage = async (contact) => {
    setSelected(contact);
    if (!contact.isRead) await handleRead(contact._id);
  };

  const filtered = contacts.filter((c) => {
    if (filter === 'unread') return !c.isRead;
    if (filter === 'read') return c.isRead;
    return true;
  });

  return (
    <>
      <Helmet><title>Contacts | Admin Panel</title></Helmet>
      <AdminLayout title="Contact Messages">
        <div className="flex gap-6 h-[calc(100vh-180px)]">
          {/* Sidebar list */}
          <div className="w-80 flex-shrink-0 flex flex-col">
            {/* Filter tabs */}
            <div className="flex gap-2 mb-4">
              {[['all', 'All'], ['unread', 'Unread'], ['read', 'Read']].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    filter === val ? 'bg-gold-500 text-charcoal' : 'bg-white text-gray-600 hover:bg-gold-50'
                  }`}>
                  {label}
                  {val === 'unread' && (
                    <span className="ml-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full inline-flex items-center justify-center">
                      {contacts.filter((c) => !c.isRead).length || ''}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Contact list */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="w-8 h-8 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <MessageOutlined className="text-4xl mb-2" />
                  <p className="text-sm">No messages</p>
                </div>
              ) : (
                filtered.map((contact, i) => (
                  <motion.div key={contact._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => openMessage(contact)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                      selected?._id === contact._id
                        ? 'bg-gold-50 border-gold-300 shadow-md'
                        : contact.isRead
                          ? 'bg-white border-gray-100 hover:border-gold-200'
                          : 'bg-blue-50 border-blue-200 hover:border-gold-300'
                    }`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {!contact.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                        <p className="font-semibold text-charcoal text-sm truncate">{contact.name}</p>
                      </div>
                      <p className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xs text-gold-600 font-medium truncate mb-1">{contact.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{contact.message}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Message detail */}
          <div className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden">
            {selected ? (
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-charcoal">{selected.subject}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        From: <strong>{selected.name}</strong> • {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!selected.isRead && (
                        <button onClick={() => handleRead(selected._id)}
                          className="w-9 h-9 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg flex items-center justify-center transition-colors" title="Mark as read">
                          <CheckOutlined />
                        </button>
                      )}
                      <button onClick={() => handleDelete(selected._id)}
                        className="w-9 h-9 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors" title="Delete">
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4">
                  <a href={`mailto:${selected.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold-600 transition-colors">
                    <MailOutlined className="text-gold-500" /> {selected.email}
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold-600 transition-colors">
                      <PhoneOutlined className="text-gold-500" /> {selected.phone}
                    </a>
                  )}
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    selected.isRead ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selected.isRead ? 'Read' : 'Unread'}
                  </span>
                </div>

                {/* Message */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-charcoal leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>

                {/* Quick reply */}
                <div className="p-6 border-t border-gray-100">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="btn-gold inline-flex items-center gap-2">
                    <MailOutlined /> Reply via Email
                  </a>
                  {selected.phone && (
                    <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${selected.name}, thank you for contacting Tent House & Decoration Services.`)}`}
                      target="_blank" rel="noreferrer"
                      className="ml-3 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm">
                      WhatsApp Reply
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <EyeOutlined className="text-6xl mb-4 text-gray-300" />
                <p className="font-heading text-xl text-gray-400">Select a message to view</p>
                <p className="text-sm mt-2">Click any message from the list to read it</p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminContacts;
