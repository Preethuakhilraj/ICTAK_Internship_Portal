const express = require('express');
const router = express.Router();
router.use(express.json());
const auth = require('../Middleware/Auth');
const { MentorsList, AddMentors, updateMentor, deleteMentor } = require('../controllers/mentorslistAdmin');

// Get all mentors
router.get('/mentorslist',auth, MentorsList);

// Add new mentor
router.post('/addmentor',auth, AddMentors);

// Update a mentor
router.patch('/updatementor/:id',auth, updateMentor);

// Delete a mentor
router.delete('/deletementor/:id',auth, deleteMentor);

module.exports = router;