const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  referenceMaterial: {
    type: String,
    required: true
  },
  postedDate: {
    type: Date,
    required: true
  },
   status: {
    type: String,
    required: true
  },
  url: { // Ensure this field is present
    type: String,
    required: true
  }
});


const reference= mongoose.model('ReferenceMaterial', ReferenceSchema);
module.exports =reference;