const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createBooking, getBookings, getBookingById,
  updateBooking, deleteBooking, getMyBookings, getDashboardStats
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const bookingValidation = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone required'),
  body('eventType').notEmpty().withMessage('Event type required'),
  body('eventDate').notEmpty().withMessage('Event date required'),
  body('location').notEmpty().withMessage('Location required'),
  body('guestCount').isNumeric().withMessage('Guest count must be a number'),
  body('budget').notEmpty().withMessage('Budget required'),
];



router.post('/', bookingValidation, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, adminOnly, getBookingById);
router.put('/:id', protect, adminOnly, updateBooking);
router.delete('/:id', protect, adminOnly, deleteBooking);

module.exports = router;
