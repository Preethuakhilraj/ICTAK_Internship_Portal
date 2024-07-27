const mentorlist = require('../model/mentorslist')

const MentorsList = async (req, res) => {
  try {
    const mentors = await mentorlist.find();
    console.log(mentors)
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const AddMentors = async (req, res) => {
    try {
    //  console.log(req.body);  
        var newMentor = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            projectTopic: req.body.projectTopic,
        }
        var Mentor = new mentorlist(newMentor)
        await Mentor.save();
        res.status(201).json(Mentor);        
  } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
  }
}

 
const updateMentor = async (req, res) => {
  try {
    const updatedMentor = await mentorlist.findByIdAndUpdate(
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
}

const deleteMentor= async (req, res) => {
  try {
    const mentor = await mentorlist.findByIdAndDelete(req.params.id);
    if (!mentor)
        return res.status(404).json({ message: 'Mentor not found' });
    res.status(200).json({ message: 'Mentor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { MentorsList, AddMentors, updateMentor, deleteMentor };