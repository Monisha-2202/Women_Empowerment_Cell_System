const express = require('express');
const router = express.Router();
const { submitGrievance, getAllGrievances } = require('../controllers/grievanceController');
router.post('/submit', submitGrievance);
router.get('/all', getAllGrievances);
module.exports = router;