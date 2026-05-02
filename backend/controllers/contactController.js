const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }
    const contact = await Contact.create({ name, email, phone, subject, message });

    // Auto-reply email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: `"Tent House & Decor" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `We received your message - ${subject}`,
        html: `<p>Dear ${name},</p><p>Thank you for contacting us! We have received your message and will get back to you within 24 hours.</p><p>Your message: <em>${message}</em></p><p>Regards,<br>Tent House & Decoration Services</p>`,
      });
    } catch (e) {
      console.error('Auto-reply failed:', e.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!', contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.json({ success: true, contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
