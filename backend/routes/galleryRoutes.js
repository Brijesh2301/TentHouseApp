const express = require('express');
const router = express.Router();
const { uploadMedia, getGallery, updateMedia, deleteMedia } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload, localUpload } = require('../config/cloudinary');

const getUploadMiddleware = () => {
  if (process.env.CLOUDINARY_CLOUD_NAME) return upload.single('media');
  return localUpload.single('media');
};

router.get('/', getGallery);
router.post('/', protect, adminOnly, getUploadMiddleware(), uploadMedia);
router.put('/:id', protect, adminOnly, updateMedia);
router.delete('/:id', protect, adminOnly, deleteMedia);

module.exports = router;
