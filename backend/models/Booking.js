const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: {
      type: String,
      required: true,
      enum: ['Wedding', 'Birthday', 'Corporate Event', 'Party', 'Baby Shower', 'Anniversary', 'Cultural Event', 'Other'],
    },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    guestCount: { type: Number, required: true },
    budget: { type: String, required: true, enum: ['Under ₹50K', '₹50K-₹1L', '₹1L-₹2L', '₹2L-₹5L', 'Above ₹5L'] },
    services: [{ type: String }],
    specialRequests: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    adminNotes: { type: String },
    totalAmount: { type: Number },
    whatsappNotified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
