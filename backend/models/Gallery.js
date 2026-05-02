const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    url: { type: String, required: true },
    publicId: { type: String },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    category: {
      type: String,
      enum: ['Wedding', 'Birthday', 'Corporate', 'Party', 'Baby Shower', 'Anniversary', 'Other'],
      default: 'Other',
    },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
