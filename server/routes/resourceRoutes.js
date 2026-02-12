const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// GET all resources
router.get('/', resourceController.getResources);

module.exports = router;
