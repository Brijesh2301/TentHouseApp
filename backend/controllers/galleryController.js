const Gallery = require('../models/Gallery');
const { cloudinary } = require('../config/cloudinary');

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const { title, description, category, tags } = req.body;
    const isVideo = req.file.mimetype?.startsWith('video/');
    const media = await Gallery.create({
      title: title || req.file.originalname,
      description,
      url: req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`,
      publicId: req.file.filename || req.file.public_id,
      type: isVideo ? 'video' : 'image',
      category: category || 'Other',
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      uploadedBy: req.user?._id,
    });
    res.status(201).json({ success: true, media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const { category, type, featured } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (type) filter.type = type;
    if (featured) filter.isFeatured = true;
    const gallery = await Gallery.find(filter).sort('-createdAt');
    res.json({ success: true, count: gallery.length, gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateMedia = async (req, res) => {
  try {
    const media = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!media) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Gallery.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: 'Not found' });
    if (media.publicId && process.env.CLOUDINARY_CLOUD_NAME) {
      await cloudinary.uploader.destroy(media.publicId, {
        resource_type: media.type === 'video' ? 'video' : 'image',
      });
    }
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Media deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
