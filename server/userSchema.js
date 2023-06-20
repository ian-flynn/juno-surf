import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  beachCode: { type: String, default: 'temp' },
});

module.exports = mongoose.model('User', userSchema);
