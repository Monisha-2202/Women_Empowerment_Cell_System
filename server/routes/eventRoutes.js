/*const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all events
router.get('/', (req, res) => {
  db.query('SELECT * FROM events ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching events' });
    res.json(results);
  });
});

module.exports = router;*/
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all events
router.get('/', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch events' });
    res.json(results);
  });
});

module.exports = router;
