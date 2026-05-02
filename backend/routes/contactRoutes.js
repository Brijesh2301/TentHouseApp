const express = require('express');
const router = express.Router();
const { submitContact, getContacts, markAsRead, deleteContact } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', protect, adminOnly, getContacts);
router.put('/:id/read', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteContact);

module.exports = router;
