// testimonialRoutes.js
const express = require('express');
const router = express.Router();
const {
  createTestimonial, getApprovedTestimonials, getAllTestimonials,
  updateTestimonial, deleteTestimonial
} = require('../controllers/testimonialController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createTestimonial);
router.get('/', getApprovedTestimonials);
router.get('/all', protect, adminOnly, getAllTestimonials);
router.put('/:id', protect, adminOnly, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

module.exports = router;
