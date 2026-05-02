const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.create({
    name: 'Admin',
    email: 'admin@tenthouse.com',
    password: 'Admin@1234',
    role: 'admin'
  });
  console.log('✅ Admin created!');
  process.exit();
}).catch(err => {
  console.log('❌ Error:', err.message);
  process.exit(1);
});