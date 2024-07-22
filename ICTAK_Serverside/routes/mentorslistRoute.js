const express = require('express');
const router = express.Router();
router.use(express.json());
const { MentorsList, AddMentors, updateMentor, deleteMentor } = require('../controllers/mentorslistAdmin');

// Get all mentors
router.get('/mentorslist', MentorsList);

// Add new mentor
router.post('/addmentor', AddMentors);

// Update a mentor
router.patch('/updatementor/:id', updateMentor);

// Delete a mentor
router.delete('/deletementor/:id', deleteMentor);

module.exports = router;