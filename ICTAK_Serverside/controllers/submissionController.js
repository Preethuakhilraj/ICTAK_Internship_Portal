const Submission = require('../model/Submissions');

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
exports.getdata =  async (req, res) => {
  try {
      const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// exports.updateSubmission = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, category, batch, topic, evaluationStatus } = req.body;

//     const updatedSubmission = await Submission.findByIdAndUpdate(
//       id,
//       { title, description, category, batch, topic, evaluationStatus },
//       { new: true, runValidators: true }
//     );

//     if (!updatedSubmission) {
//       return res.status(404).json({ message: 'Submission not found' });
//     }

//     res.status(200).json(updatedSubmission);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    await Submission.findByIdAndDelete(id);
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting submission' });
  }
};

// Evaluate a submission
exports.evaluateSubmission = async (req, res) => {
  const { id } = req.params;
  try {
    const { marks, comments } = req.body;
    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.marks = marks;
    submission.comments = comments;
    submission.evaluationStatus = true;

    await submission.save();
    res.status(200).json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Update a submission
exports.updateSubmission = async (req, res) => {
  const { id } = req.params;
  try {
    const { marks, comments } = req.body;
    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.marks = marks;
    submission.comments = comments;

    await submission.save();
    res.status(200).json(submission);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
