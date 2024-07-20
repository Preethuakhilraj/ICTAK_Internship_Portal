const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.get('/:projectTopic', submissionController.getSubmissions);
router.put('/:id', submissionController.updateSubmission);
router.delete('/:id', submissionController.deleteSubmission) 
router.post('/:id/evaluate', submissionController.evaluateSubmission) 
router.get('/get/:id',submissionController.getdata)

module.exports = router;
