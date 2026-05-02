import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleFilled, TrophyOutlined, HeartOutlined, StarFilled } from '@ant-design/icons';

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & Chief Designer', img: 'https://i.pravatar.cc/200?img=11', exp: '15+ Years' },
  { name: 'Priya Sharma', role: 'Creative Director', img: 'https://i.pravatar.cc/200?img=47', exp: '10+ Years' },
  { name: 'Amit Patel', role: 'Head of Operations', img: 'https://i.pravatar.cc/200?img=33', exp: '8+ Years' },
  { name: 'Sunita Rao', role: 'Lead Decorator', img: 'https://i.pravatar.cc/200?img=23', exp: '12+ Years' },
];

const milestones = [
  { year: '2010', event: 'Founded Tent House & Decoration Services in Mumbai' },
  { year: '2013', event: 'Expanded to corporate event decoration' },
  { year: '2016', event: 'Completed our 200th wedding decoration' },
  { year: '2019', event: 'Opened second office in Pune' },
  { year: '2021', event: 'Launched premium luxury event packages' },
  { year: '2024', event: '500+ events completed with 4.9★ average rating' },
];

const About = () => (
  <>
    <Helmet>
      <title>About Us | Tent House & Decoration Services</title>
    </Helmet>

    {/* Hero */}
    <div className="bg-charcoal pt-32 pb-16 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=60')" }} />
      <div className="relative z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-accent text-gold-400 italic text-xl mb-2">Our Story</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-5xl text-white font-bold">
          About Us
        </motion.h1>
        <div className="w-20 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
      </div>
    </div>

    {/* Story */}
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="relative rounded-3xl overflow-hidden h-[480px] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" alt="Our Story" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gold-gradient rounded-xl flex items-center justify-center text-white text-xl">
                  <TrophyOutlined />
                </div>
                <div>
                  <p className="font-heading font-bold text-charcoal text-lg">Trusted Since 2010</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => <StarFilled key={i} className="text-gold-500 text-xs" />)}
                    <span className="text-xs text-gray-500 ml-1">4.9/5 from 500+ clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-subtitle mb-2">Who We Are</p>
          <h2 className="section-title mb-4">Creating Memories <span className="text-gold-500">Since 2010</span></h2>
          <div className="w-16 h-1 bg-gold-gradient rounded-full mb-6" />
          <p className="font-body text-gray-600 leading-relaxed mb-4">
            Tent House & Decoration Services was born from a simple yet powerful belief: every celebration deserves to be extraordinary. Founded in 2010 by Rajesh Kumar, our journey began with a small team of passionate decorators and one vision — to transform ordinary spaces into magical experiences.
          </p>
          <p className="font-body text-gray-600 leading-relaxed mb-6">
            Over 13+ years, we've grown into one of Mumbai's most trusted event decoration companies, having transformed over 500 events ranging from intimate birthday gatherings to grand weddings of 2000+ guests. Our team of 25+ skilled professionals brings creativity, precision, and passion to every single event.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {['Expert Team of 25+ Professionals', 'Premium Decoration Materials', 'On-Time Delivery Guaranteed', 'Free Pre-Event Consultation', 'Transparent Pricing', '24/7 Event Support'].map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircleFilled className="text-gold-500 flex-shrink-0 mt-0.5" />{item}
              </p>
            ))}
          </div>
          <Link to="/booking" className="btn-gold inline-flex items-center gap-2">
            <HeartOutlined /> Work With Us
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-charcoal">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: '500+', label: 'Events Completed' },
          { value: '13+', label: 'Years Experience' },
          { value: '25+', label: 'Team Members' },
          { value: '4.9★', label: 'Average Rating' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <p className="font-heading text-4xl font-bold text-gold-400 mb-1">{s.value}</p>
            <p className="text-gray-400 text-sm font-body">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="section-subtitle mb-2">The People Behind The Magic</p>
          <h2 className="section-title">Meet Our Team</h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }} className="text-center group">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <img src={member.img} alt={member.name} className="w-full h-full rounded-full object-cover ring-4 ring-gold-100 group-hover:ring-gold-400 transition-all duration-300" />
                <div className="absolute bottom-1 right-1 bg-gold-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">{member.exp}</div>
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal">{member.name}</h3>
              <p className="text-gold-600 text-sm font-body">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 bg-cream">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="section-subtitle mb-2">Our Journey</p>
          <h2 className="section-title">Milestones</h2>
          <div className="gold-divider" />
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gold-200" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 relative">
                <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg z-10">
                  {m.year.slice(2)}
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md flex-1">
                  <p className="text-gold-600 font-bold text-sm">{m.year}</p>
                  <p className="text-charcoal font-body text-sm">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default About;
