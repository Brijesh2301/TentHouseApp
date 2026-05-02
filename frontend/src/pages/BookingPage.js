import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CalendarOutlined, UserOutlined, PhoneOutlined, MailOutlined,
  EnvironmentOutlined, TeamOutlined, DollarOutlined, SendOutlined
} from '@ant-design/icons';
import { createBooking } from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const eventTypes = ['Wedding', 'Birthday', 'Corporate Event', 'Party', 'Baby Shower', 'Anniversary', 'Cultural Event', 'Other'];
const budgets = ['Under ₹50K', '₹50K-₹1L', '₹1L-₹2L', '₹2L-₹5L', 'Above ₹5L'];
const serviceOptions = ['Tent Setup', 'Floral Decoration', 'Lighting', 'Stage Setup', 'Catering Arrangement', 'Photography', 'Sound System', 'Entry Decor', 'Table Decoration', 'Backdrop'];

const BookingPage = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: '',
    eventType: '', eventDate: '', location: '', guestCount: '',
    budget: '', services: [], specialRequests: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const toggleService = (svc) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(svc) ? f.services.filter((s) => s !== svc) : [...f.services, svc],
    }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Required';
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.phone) e.phone = 'Required';
    }
    if (s === 2) {
      if (!form.eventType) e.eventType = 'Required';
      if (!form.eventDate) e.eventDate = 'Required';
      if (!form.location.trim()) e.location = 'Required';
      if (!form.guestCount || isNaN(form.guestCount)) e.guestCount = 'Valid number required';
      if (!form.budget) e.budget = 'Required';
    }
    return e;
  };

  const nextStep = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(step + 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBooking(form);
      setSubmitted(true);
      toast.success('Booking submitted! We will contact you soon.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-24">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-charcoal mb-3">Booking Received!</h2>
          <p className="text-gray-600 mb-2">Thank you, <strong>{form.name}</strong>! We've received your booking request.</p>
          <p className="text-gray-500 text-sm mb-8">Our team will contact you within 24 hours at <strong>{form.phone}</strong> to confirm availability.</p>
          <div className="bg-gold-50 border border-gold-200 rounded-2xl p-4 text-left text-sm space-y-2 mb-8">
            <p><strong>Event:</strong> {form.eventType}</p>
            <p><strong>Date:</strong> {new Date(form.eventDate).toDateString()}</p>
            <p><strong>Location:</strong> {form.location}</p>
            <p><strong>Budget:</strong> {form.budget}</p>
          </div>
          <a href="/" className="btn-gold">Back to Home</a>
        </motion.div>
      </div>
    );
  }

  const steps = ['Personal Info', 'Event Details', 'Services'];

  return (
    <>
      <Helmet>
        <title>Book Now | Tent House & Decoration Services</title>
      </Helmet>

      {/* Hero */}
      <div className="bg-charcoal pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=60')" }} />
        <div className="relative z-10">
          <motion.p whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="font-accent text-gold-400 italic text-xl mb-2">Reserve Your Date</motion.p>
          <motion.h1 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} className="font-heading text-4xl md:text-5xl text-white font-bold">
            Book Your Event
          </motion.h1>
          <div className="w-20 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-12 gap-0">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-gold-500 text-charcoal' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <p className={`text-xs mt-1.5 font-semibold ${step === i + 1 ? 'text-gold-600' : 'text-gray-400'}`}>{s}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 h-0.5 mb-5 transition-all duration-500 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                  <UserOutlined className="text-gold-500" /> Personal Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Full Name *</label>
                    <div className="relative">
                      <UserOutlined className="absolute left-3 top-3.5 text-gray-400" />
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-field pl-9" />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Email *</label>
                    <div className="relative">
                      <MailOutlined className="absolute left-3 top-3.5 text-gray-400" />
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-field pl-9" />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <PhoneOutlined className="absolute left-3 top-3.5 text-gray-400" />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field pl-9" />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Event Details */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                  <CalendarOutlined className="text-gold-500" /> Event Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Event Type *</label>
                    <select name="eventType" value={form.eventType} onChange={handleChange} className="input-field">
                      <option value="">Select event type</option>
                      {eventTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Event Date *</label>
                    <div className="relative">
                      <CalendarOutlined className="absolute left-3 top-3.5 text-gray-400" />
                      <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]} className="input-field pl-9" />
                    </div>
                    {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">Venue Location *</label>
                  <div className="relative">
                    <EnvironmentOutlined className="absolute left-3 top-3.5 text-gray-400" />
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Full venue address or area" className="input-field pl-9" />
                  </div>
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Expected Guests *</label>
                    <div className="relative">
                      <TeamOutlined className="absolute left-3 top-3.5 text-gray-400" />
                      <input name="guestCount" type="number" value={form.guestCount} onChange={handleChange} placeholder="e.g. 200" className="input-field pl-9" min="1" />
                    </div>
                    {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Budget Range *</label>
                    <div className="relative">
                      <DollarOutlined className="absolute left-3 top-3.5 text-gray-400" />
                      <select name="budget" value={form.budget} onChange={handleChange} className="input-field pl-9">
                        <option value="">Select budget</option>
                        {budgets.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Services */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
                  Services & Preferences
                </h2>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Required Services (select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {serviceOptions.map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => toggleService(svc)}
                        className={`px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                          form.services.includes(svc)
                            ? 'bg-gold-500 border-gold-500 text-charcoal'
                            : 'border-gray-200 text-gray-600 hover:border-gold-300'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">Special Requests / Notes</label>
                  <textarea
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any special requirements, theme ideas, or additional details..."
                    className="input-field resize-none"
                  />
                </div>

                {/* Summary */}
                <div className="bg-gold-50 border border-gold-200 rounded-2xl p-4 text-sm space-y-1">
                  <p className="font-heading font-bold text-charcoal mb-2">Booking Summary</p>
                  <p><strong>Name:</strong> {form.name}</p>
                  <p><strong>Event:</strong> {form.eventType} | {new Date(form.eventDate).toDateString()}</p>
                  <p><strong>Location:</strong> {form.location}</p>
                  <p><strong>Guests:</strong> {form.guestCount} | <strong>Budget:</strong> {form.budget}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 gap-4">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="btn-outline-gold flex-1">
                  ← Back
                </button>
              ) : <div />}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="btn-gold flex-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                ) : step < 3 ? 'Continue →' : <><SendOutlined /> Submit Booking</>}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default BookingPage;
