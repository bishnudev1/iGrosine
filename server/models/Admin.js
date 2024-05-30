const mongoose = require('mongoose');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures each email is unique
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now // Sets default value to current date/time
  }
});

// Create the Admin model using the schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
