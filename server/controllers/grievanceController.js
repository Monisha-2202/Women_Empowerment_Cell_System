const db = require('../db');

exports.submitGrievance = (req, res) => {
  const { user_id, title, description } = req.body;
  db.query(
    'INSERT INTO grievances (user_id, title, description) VALUES (?, ?, ?)',
    [user_id, title, description],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error submitting grievance' });
      res.json({ message: 'Grievance submitted successfully' });
    }
  );
};

exports.getAllGrievances = (req, res) => {
  db.query('SELECT * FROM grievances ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error fetching grievances' });
    res.json(rows);
  });
};
