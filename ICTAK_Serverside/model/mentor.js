const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Mentor Schema
const mentorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    // required: true
  },
  projectTopic: {
    type: [String], // Changed to an array of strings
    required: true
  }
});

// Create and export Mentor model
const Mentor = mongoose.model('mentor', mentorSchema); // Note the uppercase 'M'
module.exports = Mentor;
