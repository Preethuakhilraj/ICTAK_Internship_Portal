const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth');
const Mentor = require('../model/mentor');
const Submission = require('../model/Submissions');
// Get projects for a mentor
router.get('/projects', auth, async (req, res) => {
  try {
    console.log('Request user:', req.user);
    if (!req.user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const mentor = await Mentor.findById(req.user.userId);

    if (!mentor) {
      return res.status(404).json({ msg: 'Mentor not found' });
    }

    console.log('Mentor Object:', mentor);

    // Ensure projectTopic is returned as an array
    const projects = Array.isArray(mentor.projectTopics) ? mentor.projectTopics : [mentor.projectTopics];

    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get submissions for a project
router.get('/:projectTopic', auth, async (req, res) => {
  try {
    const { batch, topic } = req.query;
    const { projectTopic } = req.params;

    let filter = { projectTopic }; // Start with filtering by projectTopic
    if (batch) filter.batch = batch;
    if (topic) filter.topic = topic;

    const submissions = await Submission.find(filter); // Use the filter object here
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
