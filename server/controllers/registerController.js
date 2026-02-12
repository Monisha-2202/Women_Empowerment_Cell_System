const db = require('../db');

exports.registerForEvent = (req, res) => {
  const { name, email, event_name } = req.body;

  if (!name || !email || !event_name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    'INSERT INTO register (name, email, event_name) VALUES (?, ?, ?)',
    [name, email, event_name],
    (err) => {
      if (err) {
        console.error('❌ Error inserting into DB:', err); // See full backend error
        return res.status(500).json({ message: 'Registration failed' });
      }
      res.json({ message: 'Successfully registered for the event!' });
    }
  );
};
