const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ REGISTER CONTROLLER
exports.register = async (req, res) => {
  const { name, email, password, user_type } = req.body;
  console.log("📩 Register request received:", { name, email, user_type });

  try {
    const hash = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
      [name, email, hash, user_type],
      (err, result) => {
        if (err) {
          console.error("❌ MySQL Insert Error:", err);
          return res.status(500).json({ message: 'Registration failed' });
        }
        console.log("✅ User registered with ID:", result.insertId);
        res.json({ message: 'Registered successfully' });
      }
    );
  } catch (error) {
    console.error("❌ Bcrypt Hash Error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ LOGIN CONTROLLER


exports.login = (req, res) => {
  const { email, password, user_type } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ? AND user_type = ?',
    [email, user_type],
    async (err, results) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (results.length === 0) {
        console.log('No user found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, results[0].password);
      if (!match) {
        console.log('Password mismatch');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      console.log('Login success');
      res.json({ message: 'Login successful' });
    }
  );
};
