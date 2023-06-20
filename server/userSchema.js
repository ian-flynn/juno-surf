const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String, required: true },

  beachCode: { type: String, default: 'temp' },
});

module.exports = mongoose.model('User', userSchema);
