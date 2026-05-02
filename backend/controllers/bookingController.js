const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

const sendBookingEmail = async (booking) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    // To client
    await transporter.sendMail({
      from: `"Tent House & Decor" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: `Booking Confirmed - ${booking.eventType} on ${new Date(booking.eventDate).toDateString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B5E3C, #D4AF37); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Booking Received! 🎉</h1>
          </div>
          <div style="padding: 30px; background: #fff;">
            <p>Dear <strong>${booking.name}</strong>,</p>
            <p>Thank you for choosing <strong>Tent House & Decoration Services</strong>! We have received your booking request.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #f9f9f9;"><td style="padding: 10px; border: 1px solid #ddd;"><strong>Event Type</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${booking.eventType}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>Event Date</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${new Date(booking.eventDate).toDateString()}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 10px; border: 1px solid #ddd;"><strong>Location</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${booking.location}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>Guests</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${booking.guestCount}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 10px; border: 1px solid #ddd;"><strong>Budget</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${booking.budget}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>Status</strong></td><td style="padding: 10px; border: 1px solid #ddd; color: #f59e0b;"><strong>${booking.status}</strong></td></tr>
            </table>
            <p>Our team will review your request and contact you within 24 hours to confirm availability and discuss details.</p>
            <p style="color: #8B5E3C;"><strong>📞 Call us: +91 98765 43210</strong></p>
            <p>Warm regards,<br><strong>Tent House & Decoration Services Team</strong></p>
          </div>
        </div>
      `,
    });

    // To admin
    await transporter.sendMail({
      from: `"Tent House System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking: ${booking.eventType} - ${booking.name}`,
      html: `<p>New booking from <strong>${booking.name}</strong> (${booking.email}) for <strong>${booking.eventType}</strong> on ${new Date(booking.eventDate).toDateString()}. Budget: ${booking.budget}.</p><p>Login to admin panel to manage this booking.</p>`,
    });
  } catch (err) {
    console.error('Email send error:', err.message);
  }
};

exports.createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const bookingData = { ...req.body };
    if (req.user) bookingData.user = req.user._id;

    const booking = await Booking.create(bookingData);
    sendBookingEmail(booking); // async, don't await
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { status, eventType, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (eventType) filter.eventType = eventType;

    const bookings = await Booking.find(filter)
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filter);
    res.json({ success: true, bookings, total, pages: Math.ceil(total / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email phone');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });
    const completedBookings = await Booking.countDocuments({ status: 'Completed' });
    const recentBookings = await Booking.find().sort('-createdAt').limit(5);
    const eventTypes = await Booking.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
    ]);
    res.json({
      success: true,
      stats: { totalBookings, pendingBookings, confirmedBookings, completedBookings },
      recentBookings,
      eventTypes,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
