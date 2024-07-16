const express = require('express');
const { ProjectsList, addProject, updateProject, deleteProject } = require('../controllers/projectsList');

const router = express.Router()
router.use(express.json());

router.get('/projectslist', ProjectsList)

router.post('/addproject', addProject)

router.patch('/updateproject/:id', updateProject )

router.delete('/deleteproject/:id', deleteProject)


module.exports = router;