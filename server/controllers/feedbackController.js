const db = require('../db');

exports.submitFeedback = (req, res) => {
  const { user_id, message } = req.body;
  if (!user_id || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    'INSERT INTO feedback (user_id, message) VALUES (?, ?)',
    [user_id, message],
    (err) => {
      if (err) {
        console.error('Error inserting feedback:', err);
        return res.status(500).json({ message: 'Failed to submit feedback' });
      }
      res.json({ message: 'Feedback submitted successfully' });
    }
  );
};

exports.getAllFeedback = (req, res) => {
  db.query(
    'SELECT f.message, f.created_at, u.name FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.created_at DESC',
    (err, results) => {
      if (err) {
        console.error('Error fetching feedback:', err);
        return res.status(500).json({ message: 'Failed to fetch feedback' });
      }
      res.json(results);
    }
  );
};
