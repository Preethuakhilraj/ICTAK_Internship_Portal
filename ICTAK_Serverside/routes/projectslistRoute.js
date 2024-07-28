const express = require('express');
const { ProjectsList, addProject, updateProject, deleteProject } = require('../controllers/ProjectsList');
const auth = require('../Middleware/Auth');
const router = express.Router()
router.use(express.json());

router.get('/projectslist',auth, ProjectsList)

router.post('/addproject',auth, addProject)

router.patch('/updateproject/:id', auth,updateProject )

router.delete('/deleteproject/:id',auth, deleteProject)


module.exports = router;