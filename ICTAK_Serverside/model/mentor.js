const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define Mentor Schema
const mentorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  role: {
    type: String,
    required: true
  },
  projectTopic: {
    type: [String], // Changed to an array of strings
    required: true
  }
=======

  // projectTopic: {
  //   type: [String], // Changed to an array of strings
  //   required: true
  // }
  projectTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
>>>>>>> 7bb62c633e2e0eca63fbb43608a09c84015c0018
});

// Pre-save middleware to hash the password before saving
mentorSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare input password with hashed password
mentorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export Mentor model
const Mentor = mongoose.model('mentor', mentorSchema); // Note the uppercase 'M'
module.exports = Mentor;
