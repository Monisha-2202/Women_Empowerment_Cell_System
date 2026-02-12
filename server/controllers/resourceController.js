const db = require('../db');

exports.getResources = (req, res) => {
  db.query('SELECT * FROM resources', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching resources' });
    res.json(results); // ✅ this MUST be an array
  });
};

