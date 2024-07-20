const Submission = require('../model/Submissions');
const Mentor = require('../model/mentor');

exports.getProjects =async (req, res) => {
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
    const projects = Array.isArray(mentor.projectTopic) ? mentor.projectTopic : [mentor.projectTopic];
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
exports.getSubmissions = async (req, res) => {
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
};