/*const db = require('../db');

exports.registerForEvent = (req, res) => {
  const { name, email, event_name } = req.body;
  const query = 'INSERT INTO event_registrations (name, email, event_name) VALUES (?, ?, ?)';
  db.query(query, [name, email, event_name], (err) => {
    if (err) return res.status(500).json({ message: 'Registration failed' });
    res.json({ message: 'Registered successfully for the event!' });
  });
};*/
const db = require('../db');

// GET all events
exports.getAllEvents = (req, res) => {
  db.query('SELECT * FROM events ORDER BY date ASC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to load events' });
    res.json(results);
  });
};
