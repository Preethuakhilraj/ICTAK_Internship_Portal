const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Project Schema
const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // stack:  {
  //   type: String,
  //   required: true
  // },
  duration:  {
    type: String,
    required: true
  }
});

// Create and export Project model
const Project = mongoose.model('project', projectSchema); // Note the uppercase 'P'
module.exports = Project;

