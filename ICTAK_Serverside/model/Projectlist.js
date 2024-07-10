const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
    topic: String,
    duration: Date
})

const projectlist = mongoose.model('projectlist', projectSchema);
module.exports = projectlist;