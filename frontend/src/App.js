import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import ProtectedRoute from './components/common/ProtectedRoute';
import PageLoader from './components/common/PageLoader';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/GalleryPage'));
const Booking = lazy(() => import('./pages/BookingPage'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBookings = lazy(() => import('./pages/admin/Bookings'));
const AdminGallery = lazy(() => import('./pages/admin/GalleryAdmin'));
const AdminTestimonials = lazy(() => import('./pages/admin/Testimonials'));
const AdminContacts = lazy(() => import('./pages/admin/Contacts'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><AdminBookings /></ProtectedRoute>} />
                <Route path="/admin/gallery" element={<ProtectedRoute adminOnly><AdminGallery /></ProtectedRoute>} />
                <Route path="/admin/testimonials" element={<ProtectedRoute adminOnly><AdminTestimonials /></ProtectedRoute>} />
                <Route path="/admin/contacts" element={<ProtectedRoute adminOnly><AdminContacts /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
