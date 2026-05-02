import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined, WhatsAppOutlined, SendOutlined } from '@ant-design/icons';
import { submitContact } from '../utils/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const whatsapp = process.env.REACT_APP_WHATSAPP_NUMBER || '919876543210';

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'At least 10 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const contactCards = [
    { icon: <PhoneOutlined />, title: 'Call Us', lines: ['+91 98765 43210', '+91 98765 43211'], href: 'tel:+919876543210', color: 'from-blue-500 to-blue-600' },
    { icon: <WhatsAppOutlined />, title: 'WhatsApp', lines: ['+91 98765 43210', 'Quick Response Guaranteed'], href: `https://wa.me/${whatsapp}`, color: 'from-green-500 to-green-600' },
    { icon: <MailOutlined />, title: 'Email Us', lines: ['info@tenthouse.com', 'bookings@tenthouse.com'], href: 'mailto:info@tenthouse.com', color: 'from-gold-500 to-brown-700' },
    { icon: <ClockCircleOutlined />, title: 'Working Hours', lines: ['Mon–Sat: 9AM – 8PM', 'Sunday: By Appointment'], href: null, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Tent House & Decoration Services</title>
      </Helmet>

      {/* Hero */}
      <div className="bg-charcoal pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=60')" }} />
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-accent text-gold-400 italic text-xl mb-2">Get In Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-5xl text-white font-bold">
            Contact Us
          </motion.h1>
          <div className="w-20 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">We'd love to hear from you. Let's create something magical together.</p>
        </div>
      </div>

      {/* Contact Cards */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {contactCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}>
                {card.href ? (
                  <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    className="block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group">
                    <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <h3 className="font-heading text-base font-bold text-charcoal mb-2">{card.title}</h3>
                    {card.lines.map((l) => <p key={l} className="text-gray-600 text-sm">{l}</p>)}
                  </a>
                ) : (
                  <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                    <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg`}>
                      {card.icon}
                    </div>
                    <h3 className="font-heading text-base font-bold text-charcoal mb-2">{card.title}</h3>
                    {card.lines.map((l) => <p key={l} className="text-gray-600 text-sm">{l}</p>)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
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
                <div className="grid sm:grid-cols-2 gap-5">
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
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell us about your event and requirements..." className="input-field resize-none" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading
                    ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> Sending...</span>
                    : <><SendOutlined /> Send Message</>}
                </motion.button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <EnvironmentOutlined className="text-gold-500" /> Find Us
              </h2>
              <div className="rounded-3xl overflow-hidden shadow-xl h-72 mb-6 bg-gray-200">
                <iframe
                  title="Our Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY || 'YOUR_KEY'}&q=Mumbai,Maharashtra`}
                  allowFullScreen
                />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-heading font-bold text-charcoal text-lg mb-3">Our Office</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-start gap-2"><EnvironmentOutlined className="text-gold-500 mt-0.5" />123 Event Street, Andheri West, Mumbai, Maharashtra 400001</p>
                  <p className="flex items-center gap-2"><PhoneOutlined className="text-gold-500" />+91 98765 43210 / +91 98765 43211</p>
                  <p className="flex items-center gap-2"><MailOutlined className="text-gold-500" />info@tenthouse.com</p>
                </div>
                <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello! I'd like to get a quote.")}`}
                  target="_blank" rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors">
                  <WhatsAppOutlined /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
