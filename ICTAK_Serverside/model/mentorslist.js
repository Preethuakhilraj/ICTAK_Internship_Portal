const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  projectTopic: {
    type: String,
    required: true,
  },
});

const mentorslist = mongoose.model('mentorslist', MentorSchema);
module.exports = mentorslist;