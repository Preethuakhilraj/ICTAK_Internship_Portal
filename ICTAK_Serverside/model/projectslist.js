const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
    topic: String,
    stack: String,
    duration: String,
})

const projectslist = mongoose.model('projectlist', projectSchema);
module.exports = projectslist;