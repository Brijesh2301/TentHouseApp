import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SendOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { submitContact } from '../../utils/api';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const contactItems = [
    { icon: <PhoneOutlined />, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: <WhatsAppOutlined />, label: 'WhatsApp', value: '+91 98765 43210', href: `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER || '919876543210'}` },
    { icon: <MailOutlined />, label: 'Email Us', value: 'info@tenthouse.com', href: 'mailto:info@tenthouse.com' },
    { icon: <EnvironmentOutlined />, label: 'Visit Us', value: '123 Event Street, Mumbai 400001', href: '#map' },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="section-subtitle mb-2">Get In Touch</motion.p>
          <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.1 }} className="section-title">
            Contact Us
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Left Info */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -40 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="bg-charcoal rounded-3xl p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-2">Let's Create Something Beautiful</h3>
              <p className="text-gray-400 text-sm mb-8 font-body">We'd love to hear about your event. Reach out to us and let's start planning!</p>

              <div className="space-y-5">
                {contactItems.map((c) => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-gold-500/20 group-hover:bg-gold-500 rounded-xl flex items-center justify-center text-gold-400 group-hover:text-white transition-all duration-300 flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{c.label}</p>
                      <p className="text-white text-sm font-semibold group-hover:text-gold-400 transition-colors">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-1">Working Hours</p>
                <p className="text-white text-sm font-semibold">Mon–Sat: 9:00 AM – 8:00 PM</p>
                <p className="text-gold-400 text-xs">Sunday: By Appointment</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 40 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="input-field" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-field" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">Subject *</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className="input-field" />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your event, date, requirements..." className="input-field resize-none" />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> Sending...</span>
                ) : (
                  <><SendOutlined /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
