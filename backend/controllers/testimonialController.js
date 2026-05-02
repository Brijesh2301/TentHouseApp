const Testimonial = require('../models/Testimonial');

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort('-createdAt');
    res.json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort('-createdAt');
    res.json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
