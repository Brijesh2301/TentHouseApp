import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GalleryPreview from '../components/home/GalleryPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

const Home = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate">
    <Helmet>
      <title>Tent House & Decoration Services | Premium Event Decoration</title>
      <meta name="description" content="Transform your events with premium tent house and decoration services. Weddings, birthdays, corporate events, and more. Book now!" />
    </Helmet>
    <Hero />
    <ServicesSection />
    <AboutSection />
    <GalleryPreview />
    <TestimonialsSection />
    <ContactSection />
  </motion.div>
);

export default Home;
