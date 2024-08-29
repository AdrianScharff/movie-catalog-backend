const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, default: 'CUSTOMER' },
  password: { type: String, required: true },
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel