const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String },
    role: { type: String, default: 'Client' },
    avatar: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    eventType: { type: String },
    isApproved: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
