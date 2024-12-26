// const mentorlist = require('../model/mentor');
// const Project = require('../model/projects');

// const MentorsList = async (req, res) => {
//   try {
//     const mentors = await mentorlist.find().populate('projectTopics');
//     console.log(mentors)
//     res.status(200).json(mentors);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

// // const AddMentors = async (req, res) => {
// //     try {
// //     //  console.log(req.body);
// //         var newMentor = {
// //             name: req.body.name,
// //             email: req.body.email,
// //             phone: req.body.phone,
// //             password: req.body.password,
// //             projectTopics: req.body.projectTopics,
// //         }
// //         var Mentor = new mentorlist(newMentor)
// //         await Mentor.save();
// //         res.status(201).json(Mentor);
// //   } catch (err) {
// //       console.log(err);
// //       res.status(400).json({ message: err.message });
// //   }
// // }
// const AddMentors = async (req, res) => {
//  try {
//     // Get the project topics from the request body
//     const topics = req.body.projectTopics;

//     // Fetch projects with the given topics
//     const projects = await Project.find({ topic: { $in: topics } });

//     // Check if all topics are valid
//     if (topics.length !== projects.length) {
//       const invalidTopics = topics.filter(topic =>
//         !projects.some(project => project.topic === topic)
//       );
//       return res.status(400).json({ message: 'Invalid project topics', invalidTopics });
//     }

//     // Convert project topics to ObjectIds
//     const projectIds = projects.map(project => project._id);

//     // Prepare new mentor data
//     const newMentor = {
//       name: req.body.name,
//       email: req.body.email,
//       phone: req.body.phone,
//       password: req.body.password,
//       projectTopics: projectIds // Use the project IDs here
//     };

//     // Create and save the new mentor
//     const Mentor = new Mentor(newMentor);
//     await Mentor.save();
//     res.status(201).json(Mentor);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err.message });
//   }
// };

 
// const updateMentor = async (req, res) => {
//   try {
//     const updatedMentor = await mentorlist.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedMentor)
//         return res.status(404).json({ message: 'Mentor not found' });
//     res.status(200).json(updatedMentor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }

// const deleteMentor= async (req, res) => {
//   try {
//     const mentor = await mentorlist.findByIdAndDelete(req.params.id);
//     if (!mentor)
//         return res.status(404).json({ message: 'Mentor not found' });
//     res.status(200).json({ message: 'Mentor deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

// module.exports = { MentorsList, AddMentors, updateMentor, deleteMentor };

const Mentor = require('../model/mentor');
const Project = require('../model/projects');

// Get all mentors with their project topics
const MentorsList = async (req, res) => {
  try {
    const mentors = await Mentor.find(); // No need to populate since projectTopics are now strings
    console.log(mentors);
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add a new mentor
const AddMentors = async (req, res) => {
  try {
    // Get the project topics from the request body
    const topics = req.body.projectTopics;

    // Fetch projects with the given topics
    const projects = await Project.find({ topic: { $in: topics } });

    // Check if all topics are valid
    if (topics.length !== projects.length) {
      const invalidTopics = topics.filter(topic => 
        !projects.some(project => project.topic === topic)
      );
      return res.status(400).json({ message: 'Invalid project topics', invalidTopics });
    }

    // Prepare new mentor data
    const newMentor = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      projectTopics: topics // Store topics directly as strings
    };

    // Create and save the new mentor
    const mentor = new Mentor(newMentor);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Update an existing mentor
const updateMentor = async (req, res) => {
  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMentor)
        return res.status(404).json({ message: 'Mentor not found' });
    res.status(200).json(updatedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a mentor
const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor)
        return res.status(404).json({ message: 'Mentor not found' });
    res.status(200).json({ message: 'Mentor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { MentorsList, AddMentors, updateMentor, deleteMentor };
