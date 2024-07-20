const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth');
const { getReferences, addReference, deleteReference } = require('../controllers/referenceController');

router.get('/', getReferences);

router.post('/add', addReference);
router.delete('/:referenceId', deleteReference);

module.exports = router;
