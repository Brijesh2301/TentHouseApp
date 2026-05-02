import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
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
      <Helmet><title>Login | Tent House & Decoration Services</title></Helmet>
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Logo */}
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
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm mb-8">Sign in to your account to continue</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Email Address</label>
                <div className="relative">
                  <MailOutlined className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" className="input-field pl-9" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1.5">Password</label>
                <div className="relative">
                  <LockOutlined className="absolute left-3 top-3.5 text-gray-400" />
                  <input name="password" type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={handleChange} placeholder="••••••••" className="input-field pl-9 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Demo credentials hint */}
              <div className="bg-gold-50 border border-gold-200 rounded-xl p-3 text-xs text-gray-600">
                <p className="font-semibold text-gold-700 mb-1">Demo Credentials:</p>
                <p>Admin: admin@tenthouse.com / admin123</p>
                <p>User: user@tenthouse.com / user123</p>
              </div>

              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> Signing in...</>
                  : 'Sign In'}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold-600 font-semibold hover:text-gold-700">Create one</Link>
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

export default Login;
