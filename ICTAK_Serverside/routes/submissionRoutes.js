const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../Middleware/Auth');

router.get('/:projectTopic',auth, submissionController.getSubmissions);
router.put('/:id', auth,submissionController.updateSubmission);
router.delete('/:id',auth, submissionController.deleteSubmission) 
router.post('/:id/evaluate', auth,submissionController.evaluateSubmission) 
router.get('/get/:id',auth,submissionController.getdata)

module.exports = router;
