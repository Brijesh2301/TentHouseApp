import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone || form.phone.length < 10) e.phone = 'Valid phone number required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <>
      <Helmet><title>Register | Tent House & Decoration Services</title></Helmet>
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-heading font-bold text-xl">T</span>
              </div>
              <div className="text-left">
                <p className="font-heading font-bold text-charcoal text-xl leading-none">Tent House</p>
                <p className="text-gold-600 text-xs font-accent italic">& Decoration Services</p>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-1">Create Account</h2>
            <p className="text-gray-500 text-sm mb-8">Join us and start planning your dream event</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Full Name</label>
                <div className="relative">
                  <UserOutlined className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-field pl-9" />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Email Address</label>
                <div className="relative">
                  <MailOutlined className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-field pl-9" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Phone Number</label>
                <div className="relative">
                  <PhoneOutlined className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field pl-9" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Password</label>
                <div className="relative">
                  <LockOutlined className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="password" type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={handleChange} placeholder="Min. 6 characters" className="input-field pl-9 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Confirm Password</label>
                <div className="relative">
                  <LockOutlined className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="confirmPassword" type={showPass ? 'text' : 'password'} value={form.confirmPassword}
                    onChange={handleChange} placeholder="Re-enter password" className="input-field pl-9" />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> Creating account...</>
                  : 'Create Account'}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-600 font-semibold hover:text-gold-700">Sign in</Link>
            </p>
          </motion.div>

          <p className="text-center text-xs text-gray-400 mt-6">
            <Link to="/" className="hover:text-gold-500 transition-colors">← Back to Home</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
